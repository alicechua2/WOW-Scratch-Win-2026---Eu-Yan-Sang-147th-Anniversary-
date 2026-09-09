import { motion } from 'motion/react';

interface Props {
  voucherLabel: string;
  voucherCode: string;
}

export default function VoucherReveal({ voucherLabel, voucherCode }: Props) {
  return (
    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-center flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-red-700">Congratulations!</h2>
      <div className="bg-yellow-100 p-6 border-2 border-yellow-600 rounded-lg">
        <p className="text-xl">{voucherLabel}</p>
        <p className="text-2xl font-mono font-black mt-2">{voucherCode}</p>
      </div>
      <p className="text-sm text-gray-500">Valid until 31/10/2026. Use at eStore.</p>
      <a href="https://www.euyansang.com.my/en_MY/home" className="text-blue-600 underline">Shop Now</a>
    </motion.div>
  );
}
