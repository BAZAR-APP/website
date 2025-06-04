import Image from 'next/image'
interface Step {
  title: string
  subtitle: string
}

interface BookingStepperProps {
  currentStep: number
}

const steps: Step[] = [
  { title: 'Customize Your Stay', subtitle: 'Add optional services (Add-ons)' },
  { title: 'Your Details', subtitle: 'Fill in name, phone, email' },
  { title: 'Secure Your Booking', subtitle: 'Payment' },
]

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="flex justify-center items-center py-10 sm:px-0 px-2">
      <ol className="flex w-full justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1
          const isActive = currentStep === index + 1
          const isLast = index === steps.length - 1

          return (
            <li key={index} className="flex-1 text-center relative z-10">
              {!isLast && (
                <div
                  className={`absolute top-2.5 left-full h-[3px] w-full -translate-x-1/2 ${
                    isCompleted || isActive ? 'bg-[#1C2E70]' : 'bg-[#EAECF0]'
                  }`}
                />
              )}

              <div className="relative w-6 h-6 mx-auto">
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: '#E1F3FF',
                      boxShadow: '0px 0px 0px 4px rgba(41, 57, 126, 0.24)',
                    }}
                  />
                )}
                <div
                  className={`relative w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${
                    isCompleted || isActive
                      ? 'bg-[#1C2E70] border-[#1C2E70]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <Image src={'/images/Tick.svg'} width={12} height={12} alt="Tick icon" />
                  ) : (
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-[#1C2E70]'}`}
                    />
                  )}
                </div>
              </div>

              <div className="mt-2 sm:text-sm text-[12px]">
                <h3 className="sm:font-semibold font-medium text-[#29397E]">{step.title}</h3>
                <p className="text-xs text-[#29397E]">{step.subtitle}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
