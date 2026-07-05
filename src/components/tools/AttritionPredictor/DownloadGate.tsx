import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Mail, Linkedin, Lock } from 'lucide-react';
import type { AssessorInfo } from '../../../types';

interface DownloadGateProps {
  onDone: (info: AssessorInfo) => void;
  onClose: () => void;
}

export default function DownloadGate({ onDone, onClose }: DownloadGateProps) {
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState<'email' | 'linkedin'>('email');
  const [contact, setContact] = useState('');

  const valid = name.trim() && contact.trim();

  return (
    <div className="fixed inset-0 bg-forest/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl shadow-strong border border-forest/[0.08] p-8 max-w-md w-full"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-2xs font-semibold tracking-[0.14em] uppercase text-brass block mb-1">
              Almost There
            </span>
            <h3 className="text-xl font-bold text-forest" style={{ fontFamily: 'Poppins, sans-serif' }}>Download Your Report</h3>
            <p className="text-slate-brand text-sm font-light mt-1">
              One-time only — we remember you for next time.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-forest/5 flex items-center justify-center text-slate-brand hover:bg-forest/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">
            Your Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Amina Tariq"
            className="input-field text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">
            Contact <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2 mb-2.5">
            {[
              { type: 'email' as const, icon: Mail, label: 'Email' },
              { type: 'linkedin' as const, icon: Linkedin, label: 'LinkedIn' },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => { setContactType(type); setContact(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg border transition-all ${
                  contactType === type
                    ? 'bg-forest text-white border-forest'
                    : 'bg-forest/4 text-slate-brand border-forest/12 hover:border-forest/25'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
          <input
            type={contactType === 'email' ? 'email' : 'text'}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={contactType === 'email' ? 'you@company.com' : 'linkedin.com/in/yourname'}
            className="input-field text-sm"
          />
        </div>

        <p className="text-slate-brand text-xs flex items-center gap-1.5 mb-5">
          <Lock size={11} className="text-slate-brand flex-shrink-0" />
          Stored privately. Never shared or sold.
        </p>

        <button
          onClick={() => valid && onDone({ name, contact, contactType })}
          disabled={!valid}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            valid
              ? 'bg-brass text-white hover:bg-brass-light hover:-translate-y-0.5 hover:shadow-brass cursor-pointer'
              : 'bg-forest/5 text-forest/25 cursor-not-allowed'
          }`}
        >
          <Download size={15} />
          Download Report
        </button>
      </motion.div>
    </div>
  );
}
