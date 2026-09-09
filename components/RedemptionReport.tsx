import { useState } from 'react';
import { motion } from 'motion/react';
import { useFormCollection } from '@embeddable/sdk';
import { WidgetConfig, RedemptionRecord } from '../types';

interface RedemptionReportProps {
  content: NonNullable<WidgetConfig['content']>;
  styleOverrides?: WidgetConfig['styleOverrides'];
  requiresPassword: boolean;
  reportPassword: string;
  onBack: () => void;
}

export default function RedemptionReport({ content, styleOverrides, requiresPassword, reportPassword, onBack }: RedemptionReportProps) {
  const [password, setPassword] = useState('');
  const [passwordEntered, setPasswordEntered] = useState(!requiresPassword);
  const [error, setError] = useState('');

  const { data: records, loading, error: fetchError } = useFormCollection<RedemptionRecord>('eys-redemptions', {});

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password === reportPassword) {
      setPasswordEntered(true);
    } else {
      setError('Incorrect password');
    }
  };

  if (!passwordEntered) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-6 px-6 py-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center" style={{ color: 'hsl(var(--primary))' }}>Report Access</h2>
        <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter Password"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="w-full px-6 py-3 rounded-full bg-[hsl(var(--primary))] text-white font-bold">Submit</button>
        </form>
        <button onClick={onBack} className="text-sm underline">Back</button>
      </motion.div>
    );
  }

  if (loading) return <div className="p-8 text-center">Loading records...</div>;
  if (fetchError) return <div className="p-8 text-center text-red-500">Error: {fetchError.message}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4 text-center px-4 w-full max-w-2xl"
    >
      <h2 className="text-2xl font-bold">Redemption Report</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-50 text-xs font-bold">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">IC</th>
              <th className="px-4 py-2 border">Voucher</th>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {records?.map((r, i) => (
              <tr key={i} className="text-xs">
                <td className="px-4 py-2 border">{r.fullName}</td>
                <td className="px-4 py-2 border">{r.email}</td>
                <td className="px-4 py-2 border">{r.ic}</td>
                <td className="px-4 py-2 border">{r.voucherLabel}</td>
                <td className="px-4 py-2 border">{r.voucherCode}</td>
                <td className="px-4 py-2 border">{new Date(r.redemptionDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onBack} className="mt-4 text-sm underline">Back</button>
    </motion.div>
  );
}
