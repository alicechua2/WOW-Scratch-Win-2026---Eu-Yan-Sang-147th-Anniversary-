import { useState } from 'react';
import { motion } from 'motion/react';
import { UserDetails } from '../types';

interface Props {
  onSubmit: (details: UserDetails) => void;
}

export default function DetailsForm({ onSubmit }: Props) {
  const [form, setForm] = useState({ fullName: '', email: '', ic: '' });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-[hsl(var(--primary))]">Enter Details to Participate</h2>
      <input className="border p-2 rounded" placeholder="Full Name" onChange={e => setForm({...form, fullName: e.target.value})} />
      <input className="border p-2 rounded" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input className="border p-2 rounded" placeholder="IC Number" onChange={e => setForm({...form, ic: e.target.value})} />
      <button className="bg-[hsl(var(--primary))] text-white p-2 rounded-full font-bold" onClick={() => onSubmit(form)}>Continue</button>
    </motion.div>
  );
}
