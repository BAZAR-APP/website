import { Check } from 'lucide-react'

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
    <div className="flex justify-center items-center py-10">
      <ol className="flex w-full max-w-4xl justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1
          const isActive = currentStep === index + 1
          const isLast = index === steps.length - 1

          return (
            <li key={index} className="flex-1 text-center relative z-10">
              {/* Line connector */}
              {!isLast && (
                <div
                  className={`absolute top-4 left-1/2 h-1 w-full -translate-x-1/2 ${
                    isCompleted || isActive ? 'bg-[#1C2E70]' : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Circle */}
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center z-10 relative border-2 ${
                  isCompleted || isActive
                    ? 'bg-[#1C2E70] border-[#1C2E70]'
                    : 'bg-white border-gray-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div
                    className={`w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-gray-300'}`}
                  />
                )}
              </div>

              {/* Labels */}
              <div className="mt-2 text-sm">
                <div
                  className={`font-semibold ${
                    isCompleted || isActive ? 'text-[#1C2E70]' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs ${
                    isCompleted || isActive ? 'text-[#1C2E70]' : 'text-gray-400'
                  }`}
                >
                  {step.subtitle}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
