import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, FileSearch, ArrowRight, Lock } from 'lucide-react';

const PRODUCTS = [
  { icon: Activity, title: 'Employee Attrition Predictor', description: '18-question weighted scoring engine across 6 risk dimensions. Instant risk score with action steps.', status: 'live', href: '/hr-tools/attrition-predictor', color: '#38bdf8' },
  { icon: FileSearch, title: 'Resume Analyzer', description: 'AI-powered ATS compatibility score and keyword gap analysis for any job description.', status: 'soon', href: '/hr-tools', color: '#34d399' },
];

export default function HRTechPlatform() {
  return (
    <section className="py-24 overflow-hidden relative" style={{ background: '#0E1F15' }}>
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />

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
            <h2 className="section-title text-white mt-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.02em' }}>
              Digital Tools That Make <span className="text-brass-light">HR Smarter</span>
            </h2>
            <div className="w-10 h-0.5 bg-brass rounded-full" />
          </div>
          <p className="text-slate-light font-light max-w-sm lg:text-right lg:pb-1 text-sm leading-relaxed">
            Our growing suite of HR technology products brings data, intelligence, and automation to your most critical people decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                  className={`group flex flex-col h-full p-6 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    isLive
                      ? 'bg-white/[0.04] border-brass/25 hover:bg-white/[0.07] hover:border-brass/45'
                      : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.14]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${product.color}18`, border: `1px solid ${product.color}30` }}>
                      <Icon size={18} style={{ color: product.color }} />
                    </div>
                    <span className={`text-2xs font-bold tracking-wider px-2.5 py-1 rounded-full ${isLive ? 'bg-brass/10 text-brass-light border border-brass/20' : 'bg-white/5 text-slate-light border border-white/10'}`}>
                      {isLive ? 'LIVE' : 'COMING SOON'}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.title}</h3>
                  <p className="text-slate-light text-sm font-light leading-relaxed flex-1">{product.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-light group-hover:text-brass-light transition-colors">
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
