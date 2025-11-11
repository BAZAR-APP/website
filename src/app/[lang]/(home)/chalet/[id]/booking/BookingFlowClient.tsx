'use client'; 

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import CustomizeStay from './CustomizeStay'; 
import UserInfo from './UserInfo'; 
import Payment from './Payment'; 
import BookingStepper from './BookingStepper';
import { Locale } from '../../../../../../../i18n.config';


interface BookingFlowClientProps {
  lang: Locale;
}

const BookingFlowClient: React.FC<BookingFlowClientProps> = ({ lang }) => {
  const [step, setStep] = useState(1);
  const methods = useForm();

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <CustomizeStay lang={lang} onNext={() => setStep(2)} />;
      case 2:
        return <UserInfo lang={lang} onNext={() => setStep(3)} />;
      case 3:
        return <Payment lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <BookingStepper currentStep={step} />
        <main>{renderStepContent()}</main>
      </div>
    </FormProvider>
  );
};

export default BookingFlowClient;