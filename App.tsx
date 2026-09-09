import { useState, useMemo } from 'react';
import { useEmbeddableData, useEventTracking, useFormSubmission } from '@embeddable/sdk';
import { WidgetConfig, UserDetails } from './types';
import DetailsForm from './components/DetailsForm';
import QuestionScreen from './components/QuestionScreen';
import ScratchCard from './components/ScratchCard';
import VoucherReveal from './components/VoucherReveal';
import RedemptionReport from './components/RedemptionReport';

type Step = 'details' | 'question' | 'scratch' | 'voucher' | 'report';

export default function App() {
  const { data: config } = useEmbeddableData<WidgetConfig>();
  const { trackClick } = useEventTracking();
  const { submit } = useFormSubmission();

  const [step, setStep] = useState<Step>('details');
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const chosenVoucher = useMemo(() => {
    const options = config?.voucherOptions || [
      { label: 'RM5 OFF', code: 'EYS-DUMMY-5' }
    ];
    return options[Math.floor(Math.random() * options.length)];
  }, [config]);

  const handleDetails = (details: UserDetails) => {
    setUser(details);
    setStep('question');
  };

  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    setStep('scratch');
  };

  const handleRevealed = async () => {
    if (user) {
      await submit({
        ...user,
        voucherLabel: chosenVoucher.label,
        voucherCode: chosenVoucher.code,
        redemptionDate: new Date().toISOString()
      }, { collectionId: 'eys-redemptions' });
    }
    setStep('voucher');
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center p-4 bg-gray-50">
      {step === 'details' && <DetailsForm onSubmit={handleDetails} />}
      {step === 'question' && <QuestionScreen onAnswer={handleAnswer} />}
      {step === 'scratch' && <ScratchCard onRevealed={handleRevealed} />}
      {step === 'voucher' && (
        <div className="flex flex-col items-center">
           <VoucherReveal voucherLabel={chosenVoucher.label} voucherCode={chosenVoucher.code} />
           <button onClick={() => setStep('report')} className="mt-8 text-xs text-gray-400">View Admin Report</button>
        </div>
      )}
      {step === 'report' && (
        <RedemptionReport 
          requiresPassword={true} 
          reportPassword="admin123" 
          onBack={() => setStep('details')} 
          content={{}} 
        />
      )}
    </div>
  );
}
