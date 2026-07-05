import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LS } from '../../../lib/storage';
import { FACTORS } from '../../../data/factors';
import EmpInfoStep from './EmpInfoStep';
import FactorStep from './FactorStep';
import ResultDashboard from './ResultDashboard';
import type { AssessmentStep, AssessmentAnswers, EmployeeInfo, AssessorInfo } from '../../../types';

export default function AttritionPredictor() {
  // Persistent state
  const [user, setUser] = useState<AssessorInfo | null>(() => LS.get<AssessorInfo>('hr_user'));
  const [lastEmp] = useState<Partial<EmployeeInfo>>(() => LS.get<Partial<EmployeeInfo>>('hr_last_emp') ?? {});

  // Session state
  const [step, setStep] = useState<AssessmentStep>('emp-info');
  const [factorIdx, setFactorIdx] = useState(0);
  const [empInfo, setEmpInfo] = useState<EmployeeInfo>({
    name: '',
    department: lastEmp.department ?? '',
    role: lastEmp.role ?? '',
    manager: lastEmp.manager ?? '',
  });
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  const handleAnswer = useCallback((fId: string, qId: string, score: number) => {
    setAnswers((p) => ({ ...p, [fId]: { ...(p[fId] ?? {}), [qId]: score } }));
  }, []);

  const startAssessment = () => {
    LS.set('hr_last_emp', {
      department: empInfo.department,
      role: empInfo.role,
      manager: empInfo.manager,
    });
    setStep('factor');
    setFactorIdx(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => {
    if (factorIdx < FACTORS.length - 1) {
      setFactorIdx((i) => i + 1);
    } else {
      setStep('result');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (factorIdx > 0) setFactorIdx((i) => i - 1);
    else setStep('emp-info');
  };

  const newAssessment = () => {
    setEmpInfo({ name: '', department: lastEmp.department ?? '', role: lastEmp.role ?? '', manager: lastEmp.manager ?? '' });
    setAnswers({});
    setFactorIdx(0);
    setStep('emp-info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPrefilled = !!(lastEmp.department || lastEmp.role || lastEmp.manager);

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'emp-info' && (
          <EmpInfoStep
            empInfo={empInfo}
            setEmpInfo={setEmpInfo}
            onStart={startAssessment}
            prefilled={isPrefilled}
          />
        )}

        {step === 'factor' && (
          <FactorStep
            factorIdx={factorIdx}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 'result' && (
          <ResultDashboard
            answers={answers}
            empInfo={empInfo}
            user={user}
            onNewAssessment={newAssessment}
            onSetUser={(u) => setUser(u)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
