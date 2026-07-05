import { motion } from 'framer-motion';
import { User, Building2, Briefcase, UserCheck, ArrowRight } from 'lucide-react';
import type { EmployeeInfo } from '../../../types';

interface EmpInfoStepProps {
  empInfo: EmployeeInfo;
  setEmpInfo: (info: EmployeeInfo) => void;
  onStart: () => void;
  prefilled: boolean;
}

function InputField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-brand" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-field pl-10 text-sm"
        />
      </div>
    </div>
  );
}

export default function EmpInfoStep({ empInfo, setEmpInfo, onStart, prefilled }: EmpInfoStepProps) {
  const isReady = empInfo.name.trim() && empInfo.department.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center mb-8">
        <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass block mb-2">
          Step 1 of 7
        </span>
        <h2 className="text-2xl font-bold text-forest mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Employee Information
        </h2>
        <p className="text-slate-brand text-sm font-light">
          Who are you assessing today?
        </p>
      </div>

      <div className="card-base p-7 mb-4">
        <div className="flex flex-col gap-4">
          <InputField
            icon={User}
            label="Employee Full Name"
            value={empInfo.name}
            onChange={(v) => setEmpInfo({ ...empInfo, name: v })}
            placeholder="e.g. Ahmed Raza"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              icon={Building2}
              label="Department"
              value={empInfo.department}
              onChange={(v) => setEmpInfo({ ...empInfo, department: v })}
              placeholder="e.g. Sales"
              required
            />
            <InputField
              icon={Briefcase}
              label="Role / Job Title"
              value={empInfo.role}
              onChange={(v) => setEmpInfo({ ...empInfo, role: v })}
              placeholder="e.g. Account Manager"
            />
          </div>

          <InputField
            icon={UserCheck}
            label="Reporting Manager"
            value={empInfo.manager}
            onChange={(v) => setEmpInfo({ ...empInfo, manager: v })}
            placeholder="e.g. Usman Tariq"
          />

          {prefilled && (
            <p className="text-slate-brand text-xs flex items-center gap-1.5 bg-brass/5 border border-brass/15 rounded-lg px-3 py-2">
              <span className="text-brass">•</span>
              Department, role and manager pre-filled from your last assessment.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[['18', 'Questions'], ['6', 'Risk Factors'], ['~5', 'Minutes']].map(([n, l]) => (
          <div
            key={l}
            className="bg-sand border border-forest/[0.07] rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-forest" style={{ fontFamily: 'Poppins, sans-serif' }}>{n}</div>
            <div className="text-slate-brand text-xs mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        disabled={!isReady}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 ${
          isReady
            ? 'bg-brass text-white hover:bg-brass-light hover:-translate-y-0.5 hover:shadow-brass cursor-pointer'
            : 'bg-forest/5 text-forest/30 cursor-not-allowed'
        }`}
      >
        Begin Assessment
        <ArrowRight size={15} />
      </button>
    </motion.div>
  );
}
