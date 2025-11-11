// 'use client'

// import { useState } from 'react'
// import { useForm, FormProvider } from 'react-hook-form'
// import CustomizeStay from './CustomizeStay'
// import UserInfo from './UserInfo'
// import Payment from './Payment'
// import BookingStepper from './BookingStepper'

// const Page = () => {
//   const [step, setStep] = useState(1)
//   const methods = useForm()

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return <CustomizeStay onNext={() => setStep(2)} />
//       case 2:
//         return <UserInfo onNext={() => setStep(3)} />
//       case 3:
//         return <Payment />
//       default:
//         return null
//     }
//   }

//   return (
//     <FormProvider {...methods}>
//       <div>
//         <BookingStepper currentStep={step} />
//         <main>{renderStepContent()}</main>
//       </div>
//     </FormProvider>
//   )
// }

// export default Page

// import { getMessages } from '@/lib/i18n';
import BookingFlowClient from './BookingFlowClient';
import { Locale } from '../../../../../../../i18n.config';

const Page = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params; 
  // const messages = getMessages(lang); 

  return <BookingFlowClient lang={lang}  />;
};

export default Page;