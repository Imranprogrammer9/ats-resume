import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Printer, RotateCcw } from 'lucide-react';
import Gauge from './Gauge';
import DownloadGate from './DownloadGate';
import { calcScores, getRisk } from '../../../lib/scoring';
import { generateCSV, downloadCSV } from '../../../utils/csv';
import { pushToSheets } from '../../../lib/sheets';
import { LS } from '../../../lib/storage';
import type { AssessmentAnswers, EmployeeInfo, AssessorInfo } from '../../../types';

interface ResultDashboardProps {
  answers: AssessmentAnswers;
  empInfo: EmployeeInfo;
  user: AssessorInfo | null;
  onNewAssessment: () => void;
  onSetUser: (u: AssessorInfo) => void;
}

export default function ResultDashboard({ answers, empInfo, user, onNewAssessment, onSetUser }: ResultDashboardProps) {
  const [showGate, setShowGate] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const factorScores = calcScores(answers);
  const total = factorScores.reduce((s, f) => s + f.weighted, 0);
  const risk = getRisk(total);

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const doDownload = async (u: AssessorInfo) => {
    setDownloading(true);

    const payload: Record<string, string> = {
      timestamp: new Date().toISOString(),
      assessorName: u.name,
      contact: u.contact,
      contactType: u.contactType,
      employeeName: empInfo.name,
      department: empInfo.department,
      role: empInfo.role,
      manager: empInfo.manager,
      totalScore: total.toFixed(2),
      riskLevel: risk.label,
      ...Object.fromEntries(factorScores.map((f) => [`${f.id}_score`, f.weighted.toFixed(2)])),
    };

    await pushToSheets(payload);

    const csv = generateCSV(empInfo, u, factorScores, total, risk, answers);
    downloadCSV(csv, `attrition-${empInfo.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.csv`);

    setDownloading(false);
    setShowGate(false);
  };

  const handleDownload = () => {
    if (user) doDownload(user);
    else setShowGate(true);
  };

  const handleGateDone = (form: AssessorInfo) => {
    LS.set('hr_user', form);
    onSetUser(form);
    doDownload(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {showGate && (
          <DownloadGate onDone={handleGateDone} onClose={() => setShowGate(false)} />
        )}
      </AnimatePresence>

      <div className="text-center mb-6">
        <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-emerald-600 block mb-1">
          Assessment Complete
        </span>
        <h2 className="text-2xl font-bold text-forest mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Risk Score Report</h2>
        <span className="text-slate-brand text-xs">{today}</span>
      </div>

      <div className="card-base p-5 mb-4 grid grid-cols-2 gap-4">
        {[
          ['Employee', empInfo.name],
          ['Department', empInfo.department],
          ['Role', empInfo.role],
          ['Manager', empInfo.manager],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-2xs font-semibold tracking-wider uppercase text-slate-brand mb-0.5">{k}</p>
            <p className="text-forest font-semibold text-sm">{v || '—'}</p>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl border p-6 mb-4"
        style={{ borderColor: risk.border, background: risk.bg }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <Gauge score={total} size={156} />

          <div className="flex-1 w-full">
            <p className="text-2xs font-semibold tracking-wider uppercase text-slate-brand mb-4">
              Factor Breakdown
            </p>
            <div className="flex flex-col gap-3">
              {factorScores.map((f) => (
                <div key={f.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-forest text-xs">{f.icon} {f.label}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: f.color }}>
                      {f.weighted.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-forest/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: f.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(f.raw / 10) * 100}%` }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl border-l-4 p-5 mb-4"
        style={{
          borderLeftColor: risk.color,
          borderTop: `1px solid ${risk.border}`,
          borderRight: `1px solid ${risk.border}`,
          borderBottom: `1px solid ${risk.border}`,
          background: risk.bg,
        }}
      >
        <p
          className="text-2xs font-bold tracking-[0.16em] uppercase mb-2"
          style={{ color: risk.color }}
        >
          {risk.label} — Summary
        </p>
        <p className="text-forest text-sm leading-relaxed">{risk.summary}</p>
      </div>

      <div className="card-base p-5 mb-4">
        <p className="text-2xs font-semibold tracking-wider uppercase text-slate-brand mb-4">
          Recommended Actions
        </p>
        <div className="flex flex-col gap-2.5">
          {risk.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-start gap-3 p-3.5 bg-sand rounded-lg"
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: risk.bg, border: `1px solid ${risk.border}`, color: risk.color }}
              >
                {i + 1}
              </span>
              <span className="text-forest text-sm leading-relaxed">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center bg-sand rounded-xl p-4 mb-4 text-xs text-slate-brand">
        {[['0–3', '#22c55e', 'Low'], ['3.1–6', '#fbbf24', 'Moderate'], ['6.1–8', '#f97316', 'High'], ['8.1–10', '#ef4444', 'Critical']].map(([range, color, label]) => (
          <div key={range} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            {range} — {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 no-print">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`col-span-2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
            downloading
              ? 'bg-forest/5 text-forest/30 cursor-not-allowed'
              : 'bg-brass text-white hover:bg-brass-light hover:-translate-y-0.5 hover:shadow-brass cursor-pointer'
          }`}
        >
          <Download size={15} />
          {downloading ? 'Preparing…' : user ? 'Download CSV Report' : 'Download Report'}
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-forest/15 text-sm font-medium text-forest hover:border-forest/25 hover:bg-forest/3 transition-all cursor-pointer"
        >
          <Printer size={14} />
          Print
        </button>
      </div>

      <button
        onClick={onNewAssessment}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-forest/12 text-sm font-medium text-slate-brand hover:text-forest hover:border-forest/25 transition-all"
      >
        <RotateCcw size={14} />
        Assess Another Employee
      </button>
    </motion.div>
  );
}
