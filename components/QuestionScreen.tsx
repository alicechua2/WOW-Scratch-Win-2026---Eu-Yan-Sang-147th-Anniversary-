import { motion } from 'motion/react';

interface Props {
  onAnswer: (correct: boolean) => void;
}

export default function QuestionScreen({ onAnswer }: Props) {
  return (
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Is this year Eu Yan Sang's 147th Anniversary?</h1>
      <div className="flex gap-4 justify-center">
        <button className="px-8 py-2 bg-green-600 text-white rounded-full" onClick={() => onAnswer(true)}>Yes</button>
        <button className="px-8 py-2 bg-red-600 text-white rounded-full" onClick={() => onAnswer(false)}>No</button>
      </div>
    </motion.div>
  );
}
