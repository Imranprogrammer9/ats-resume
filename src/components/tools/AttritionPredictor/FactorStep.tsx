import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FACTORS } from '../../../data/factors';
import Stepper from './Stepper';
import type { AssessmentAnswers } from '../../../types';

interface FactorStepProps {
  factorIdx: number;
  answers: AssessmentAnswers;
  onAnswer: (fId: string, qId: string, score: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function FactorStep({ factorIdx, answers, onAnswer, onNext, onBack }: FactorStepProps) {
  const factor = FACTORS[factorIdx];
  const curAns = answers[factor.id] || {};
  const answeredCount = Object.keys(curAns).length;
  const allDone = factor.questions.every((q) => curAns[q.id] !== undefined);
  const isLast = factorIdx === FACTORS.length - 1;

  return (
    <motion.div
      key={factorIdx}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Stepper current={factorIdx} />

      <div
        className="rounded-2xl p-6 mb-4 border"
        style={{
          background: `${factor.color}06`,
          borderColor: `${factor.color}20`,
        }}
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-forest/[0.07]">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
            style={{
              background: `${factor.color}15`,
              borderColor: `${factor.color}30`,
            }}
          >
            {factor.icon}
          </div>
          <div>
            <p className="text-2xs font-semibold tracking-wider uppercase text-slate-brand">
              Factor {factorIdx + 1} of {FACTORS.length} · Weight: {(factor.weight * 100).toFixed(0)}%
            </p>
            <h3
              className="font-bold text-lg"
              style={{ color: factor.color, fontFamily: 'Poppins, sans-serif' }}
            >
              {factor.label}
            </h3>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xs text-slate-brand">{answeredCount}/{factor.questions.length}</div>
            <div className="text-xs text-slate-brand">answered</div>
          </div>
        </div>

        <div className="flex flex-col gap-7">
          {factor.questions.map((q, qi) => (
            <div key={q.id}>
              <div className="flex gap-3 mb-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                  style={{ background: factor.color, color: 'white' }}
                >
                  {qi + 1}
                </div>
                <p className="text-forest text-sm font-medium leading-snug">{q.text}</p>
              </div>

              <div className="flex flex-col gap-2 pl-9">
                {q.options.map((opt) => {
                  const selected = curAns[q.id] === opt.score;
                  return (
                    <motion.button
                      key={opt.label}
                      onClick={() => onAnswer(factor.id, q.id, opt.score)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center justify-between p-3 rounded-lg border text-left text-sm transition-all duration-150 cursor-pointer"
                      style={{
                        background: selected ? `${factor.color}12` : 'white',
                        borderColor: selected ? factor.color : 'rgba(27,58,45,0.10)',
                        color: selected ? factor.color : '#5C7266',
                        fontWeight: selected ? 600 : 400,
                      }}
                    >
                      <span>{opt.label}</span>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-2xs font-bold tracking-wider px-2 py-0.5 rounded"
                          style={{ background: factor.color, color: 'white' }}
                        >
                          Score {opt.score}
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-forest/15 text-sm font-medium text-forest hover:border-forest/30 hover:bg-forest/3 transition-all"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <div className="flex items-center justify-center text-sm text-slate-brand">
          {answeredCount}/{factor.questions.length}
        </div>
        <button
          onClick={onNext}
          disabled={!allDone}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            allDone
              ? 'text-white hover:-translate-y-0.5 cursor-pointer'
              : 'bg-forest/5 text-forest/25 cursor-not-allowed'
          }`}
          style={allDone ? { background: factor.color } : undefined}
        >
          {isLast ? 'View Results' : 'Next'}
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
