import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FACTORS } from '../../../data/factors';

interface StepperProps {
  current: number;
}

export default function Stepper({ current }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-0 relative">
        {FACTORS.map((f, i) => (
          <div key={f.id} className="flex-1 flex flex-col items-center relative">
            {i < FACTORS.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5 z-0" style={{ background: 'rgba(27,58,45,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: f.color }}
                  initial={{ width: 0 }}
                  animate={{ width: i < current ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}

            <div className="relative z-10">
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 transition-all"
                animate={{
                  background: i < current ? f.color : i === current ? 'white' : 'rgba(27,58,45,0.04)',
                  borderColor: i < current ? f.color : i === current ? f.color : 'rgba(27,58,45,0.12)',
                  boxShadow: i === current ? `0 0 0 4px ${f.color}20` : 'none',
                }}
                transition={{ duration: 0.3 }}
              >
                {i < current ? (
                  <Check size={13} className="text-white" strokeWidth={3} />
                ) : i === current ? (
                  <span className="text-xs" style={{ color: f.color }}>{f.icon}</span>
                ) : (
                  <span style={{ color: 'rgba(27,58,45,0.25)', fontSize: 11 }}>{f.icon}</span>
                )}
              </motion.div>
            </div>

            <motion.span
              className="text-center mt-1.5 leading-tight"
              style={{
                fontSize: 8,
                maxWidth: 44,
                color: i === current ? f.color : i < current ? 'rgba(27,58,45,0.5)' : 'rgba(27,58,45,0.3)',
              }}
              animate={{ color: i === current ? f.color : i < current ? 'rgba(27,58,45,0.5)' : 'rgba(27,58,45,0.25)' }}
            >
              {f.label}
            </motion.span>
          </div>
        ))}
      </div>

      <div className="mt-3 h-1 bg-forest/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #B5852A, ${FACTORS[Math.min(current, FACTORS.length - 1)].color})`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(current / FACTORS.length) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
