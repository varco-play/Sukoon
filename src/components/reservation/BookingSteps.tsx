import { Check } from 'lucide-react'

interface BookingStepsProps {
  currentStep: 1 | 2 | 3
}

const STEPS = [
  { num: 1, label: 'Дата' },
  { num: 2, label: 'Время' },
  { num: 3, label: 'Детали' },
]

export default function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map(({ num, label }, i) => {
        const done   = num < currentStep
        const active = num === currentStep

        return (
          <div key={num} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                  done
                    ? 'bg-brand-gold border-brand-gold text-brand-green-dark'
                    : active
                    ? 'border-brand-gold text-brand-gold bg-transparent'
                    : 'border-brand-gold/25 text-brand-cream-muted/50 bg-transparent'
                }`}
              >
                {done ? (
                  <Check size={16} strokeWidth={2.5} />
                ) : (
                  <span className="font-sans text-sm font-medium">{num}</span>
                )}
              </div>
              <span
                className={`font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${
                  active ? 'text-brand-gold' : done ? 'text-brand-gold/70' : 'text-brand-cream-muted/50'
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-px mx-3 -mt-5 transition-colors duration-300 ${
                  num < currentStep ? 'bg-brand-gold/60' : 'bg-brand-gold/15'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
