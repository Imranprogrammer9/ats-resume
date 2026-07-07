import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, FileSearch, ArrowRight, CheckCircle } from 'lucide-react';

const TOOLS = [
  {
    icon: Activity,
    title: 'Employee Attrition Predictor',
    tagline: 'Predict Flight Risk Before It\'s Too Late',
    description: 'A weighted scoring engine across 6 risk dimensions and 18 diagnostic questions. Produces an instant risk score (Low / Moderate / High / Critical) with specific recommended actions for each level.',
    features: ['18 diagnostic questions', '6 weighted risk dimensions', 'Instant risk classification', 'CSV export', 'Google Sheets integration', 'Completely free'],
    status: 'live',
    href: '/hr-tools/attrition-predictor',
    color: '#38bdf8',
  },
  {
    icon: FileSearch,
    title: 'Resume Analyzer',
    tagline: 'ATS Compatibility Score & Gap Analysis',
    description: 'Upload any CV and paste a job description — get an instant ATS compatibility score, keyword gap analysis, and prioritised improvement recommendations.',
    features: ['ATS compatibility score', 'Keyword gap analysis', 'Section-by-section review', 'Improvement priority list'],
    status: 'soon',
    href: '#',
    color: '#34d399',
  },
];

export default function HRToolsPage() {
  return (
    <>
      <section className="bg-forest pt-16 pb-20 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">
              HR Technology Platform
            </span>
            <h1
              className="text-white mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08 }}
            >
              Digital Tools That Make{' '}
              <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>HR Smarter</span>
            </h1>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed text-lg">
              A growing suite of HR technology products — bringing data, intelligence, and automation to your most critical people decisions. All tools are free to use.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              const isLive = tool.status === 'live';
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={`group flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isLive ? 'bg-white border-brass/20 hover:border-brass/40 hover:shadow-brass' : 'bg-white border-forest/[0.07] hover:border-forest/15'
                  } hover:-translate-y-1 hover:shadow-medium`}
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={{ background: `${tool.color}12`, borderColor: `${tool.color}25` }}
                      >
                        <Icon size={20} style={{ color: tool.color }} />
                      </div>
                      <span
                        className={`text-2xs font-bold tracking-wider px-3 py-1.5 rounded-full ${
                          isLive
                            ? 'bg-brass/10 text-brass border border-brass/20'
                            : 'bg-forest/5 text-slate-brand border border-forest/10'
                        }`}
                      >
                        {isLive ? 'AVAILABLE NOW' : 'COMING SOON'}
                      </span>
                    </div>

                    <p className="text-2xs font-semibold tracking-wider uppercase text-slate-brand mb-1.5">
                      {tool.tagline}
                    </p>
                    <h3 className="text-xl font-bold text-forest mb-3 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {tool.title}
                    </h3>
                    <p className="text-slate-brand text-sm font-light leading-relaxed mb-5 flex-1">
                      {tool.description}
                    </p>

                    <ul className="flex flex-col gap-2 mb-6">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-brand">
                          <CheckCircle size={12} className="text-brass flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {isLive ? (
                      <Link
                        to={tool.href}
                        className="btn-primary text-sm justify-center"
                      >
                        Launch Tool
                        <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <button
                        className="w-full py-3 rounded-lg border border-forest/15 text-slate-brand text-sm font-medium hover:border-forest/25 hover:text-forest transition-all cursor-not-allowed opacity-60"
                        disabled
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
