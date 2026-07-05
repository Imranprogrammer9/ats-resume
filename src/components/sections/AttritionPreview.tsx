import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const MOCK_FACTORS = [
  { label: 'Employee Engagement', score: 6.5, color: '#38bdf8', weight: '25%' },
  { label: 'Salary Competitiveness', score: 7.8, color: '#34d399', weight: '20%' },
  { label: 'Career Growth', score: 5.2, color: '#fbbf24', weight: '15%' },
  { label: 'Attendance', score: 3.1, color: '#a78bfa', weight: '15%' },
  { label: 'Manager Relationship', score: 8.4, color: '#f472b6', weight: '15%' },
  { label: 'Learning & Dev', score: 4.6, color: '#fb923c', weight: '10%' },
];

export default function AttritionPreview() {
  return (
    <section className="py-24 bg-forest-dark relative overflow-hidden" style={{ background: '#0E1F15' }}>
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">
              Flagship HR Tool
            </span>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, lineHeight: 1.1 }}
            >
              Predict Employee{' '}
              <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>Attrition</span>{' '}
              Before It's Too Late
            </h2>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed mb-6">
              Our Employee Attrition Predictor uses a weighted scoring engine across 6 risk dimensions and 18 calibrated questions to produce an instant, actionable risk score — with specific recommended interventions.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: CheckCircle, text: '18 diagnostic questions across 6 risk factors' },
                { icon: CheckCircle, text: 'Weighted scoring engine with instant risk classification' },
                { icon: CheckCircle, text: 'Specific action steps for each risk level' },
                { icon: CheckCircle, text: 'CSV export and Google Sheets integration' },
                { icon: AlertTriangle, text: 'Completely free to use — unlimited assessments' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-slate-light">
                  <Icon size={15} className="text-brass flex-shrink-0 mt-0.5" />
                  {text}
                </div>
              ))}
            </div>

            <Link to="/hr-tools/attrition-predictor" className="btn-primary">
              <Activity size={15} />
              Launch Attrition Predictor
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-brass-light text-2xs font-semibold tracking-wider uppercase">Risk Score Report</p>
                  <p className="text-white font-semibold text-sm mt-0.5">Sample Employee · Sales Dept</p>
                </div>
                <div className="text-center">
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                    <circle
                      cx="36"
                      cy="36"
                      r="26"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="7"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * (1 - 6.48 / 10)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 36 36)"
                    />
                    <text x="36" y="33" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="900" fontFamily="monospace">6.48</text>
                    <text x="36" y="44" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="sans-serif">/ 10</text>
                  </svg>
                  <div className="text-2xs font-bold text-orange-400 tracking-wider mt-1">HIGH RISK</div>
                </div>
              </div>

              <div className="space-y-3">
                {MOCK_FACTORS.map((f) => (
                  <div key={f.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-light text-xs">{f.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-brand text-2xs">{f.weight}</span>
                        <span className="font-mono text-xs font-bold" style={{ color: f.color }}>
                          {(f.score * parseFloat(f.weight) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: f.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(f.score / 10) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-orange-400 text-2xs font-bold tracking-wider uppercase mb-2">Recommended Actions</p>
                <p className="text-slate-light text-xs">Immediate manager intervention · Conduct stay interview within 7 days · Escalate compensation review...</p>
              </div>

              <p className="text-slate-brand text-2xs text-center mt-4">
                Demo data for illustration · Your results will reflect real assessment answers
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
