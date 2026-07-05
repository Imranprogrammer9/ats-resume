import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, FileSearch, DollarSign, ClipboardList, Smile, Star, ArrowRight, Lock } from 'lucide-react';

const PRODUCTS = [
  { icon: Activity, title: 'Employee Attrition Predictor', description: '18-question weighted scoring engine across 6 risk dimensions. Instant risk score with action steps.', status: 'live', href: '/hr-tools/attrition-predictor', color: '#38bdf8' },
  { icon: FileSearch, title: 'Resume Analyzer', description: 'AI-powered ATS compatibility score and keyword gap analysis for any job description.', status: 'soon', href: '/hr-tools', color: '#34d399' },
  { icon: DollarSign, title: 'Salary Benchmark Tool', description: 'Real-time compensation data for any role, industry, and location — powered by live market data.', status: 'soon', href: '/hr-tools', color: '#fbbf24' },
  { icon: ClipboardList, title: 'Interview Scorecard', description: 'Structured interview templates with weighted scoring to ensure consistent, bias-reduced hiring decisions.', status: 'soon', href: '/hr-tools', color: '#a78bfa' },
  { icon: Smile, title: 'Employee Satisfaction Survey', description: 'Pulse survey tool with benchmark comparisons and sentiment trend analysis across departments.', status: 'soon', href: '/hr-tools', color: '#f472b6' },
  { icon: Star, title: 'Performance Review Generator', description: 'Data-driven performance review templates aligned to competency frameworks and business goals.', status: 'soon', href: '/hr-tools', color: '#fb923c' },
];

export default function HRTechPlatform() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
        >
          <div>
            <span className="section-label block">HR Technology Platform</span>
            <h2 className="section-title" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.02em' }}>
              Digital Tools That Make <span className="text-brass">HR Smarter</span>
            </h2>
            <div className="w-10 h-0.5 bg-brass rounded-full" />
          </div>
          <p className="section-sub lg:text-right max-w-sm lg:pb-1">
            Our growing suite of HR technology products brings data, intelligence, and automation to your most critical people decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            const isLive = product.status === 'live';
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={product.href}
                  className={`group flex flex-col h-full p-6 rounded-xl border transition-all duration-300 ${
                    isLive
                      ? 'bg-brass/[0.04] border-brass/25 hover:bg-brass/[0.07] hover:border-brass/40'
                      : 'bg-forest/[0.03] border-forest/[0.08] hover:bg-forest/[0.05] hover:border-forest/[0.14]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${product.color}18`, border: `1px solid ${product.color}30` }}>
                      <Icon size={18} style={{ color: product.color }} />
                    </div>
                    <span className={`text-2xs font-bold tracking-wider px-2.5 py-1 rounded-full ${isLive ? 'bg-brass/12 text-brass border border-brass/25' : 'bg-forest/[0.06] text-slate-brand border border-forest/[0.10]'}`}>
                      {isLive ? 'LIVE' : 'COMING SOON'}
                    </span>
                  </div>
                  <h3 className="font-bold text-forest text-base mb-2 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.title}</h3>
                  <p className="text-slate-brand text-sm font-light leading-relaxed flex-1">{product.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-brand group-hover:text-brass transition-colors">
                    {isLive ? (
                      <>Launch Tool <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" /></>
                    ) : (
                      <><Lock size={12} /> Notify Me</>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-10">
          <Link to="/hr-tools" className="btn-primary">
            Explore All Tools <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
