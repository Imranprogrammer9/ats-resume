import { motion } from 'framer-motion';
import { CheckCircle, Database, Users, TrendingUp, Shield, Award } from 'lucide-react';

const REASONS = [
  {
    icon: Database,
    title: 'Data-Driven Methodology',
    description: 'Every recommendation we make is backed by workforce analytics, market benchmarks, and our proprietary scoring engine — not intuition alone.',
  },
  {
    icon: CheckCircle,
    title: 'SHRM-Aligned Practices',
    description: 'All methodologies, content, and frameworks are grounded in SHRM best practices and current peer-reviewed research.',
  },
  {
    icon: Users,
    title: 'Embedded HR Partnership',
    description: "We don't just hand over a report and leave. We embed as a genuine HR partner, working alongside your team until results are achieved.",
  },
  {
    icon: TrendingUp,
    title: 'Measurable ROI',
    description: 'We define success in numbers — reduction in attrition, improvement in time-to-fill, increase in offer acceptance rates, and cost savings.',
  },
  {
    icon: Shield,
    title: 'Confidential & Secure',
    description: 'All client data and employee assessments are handled with complete confidentiality. Your people data is never shared, sold, or retained.',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: 'Over 340 engagements across 8 industries with a 98% client satisfaction score — built on real results, not promises.',
  },
];


export default function WhyChooseUs() {
  return (
    <section className="py-24 overflow-hidden relative" style={{ background: '#0E1F15' }}>
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(181,133,42,0.07) 0%, transparent 65%)' }}
      />
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
        >
          <div>
            <span className="block text-2xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#D4A84B' }}>
              Why HR Vanguard
            </span>
            <h2
              className="text-white mb-3"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1 }}
            >
              The Difference Between Good<br className="hidden sm:block" /> and{' '}
              <span style={{ color: '#D4A84B' }}>Great</span> HR
            </h2>
            <div className="w-10 h-0.5" style={{ background: '#D4A84B' }} />
          </div>
          <p className="text-slate-light font-light max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            Most HR consultants give you frameworks. We give you frameworks that are proven, data-backed, and delivered by specialists who stay until the work is done.
          </p>
        </motion.div>

        {/* 3×2 card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col p-7 rounded-2xl border border-white/[0.07] hover:border-brass/25 transition-all duration-300 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle at top left, rgba(181,133,42,0.06) 0%, transparent 60%)' }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative"
                  style={{ background: 'rgba(181,133,42,0.10)', border: '1px solid rgba(181,133,42,0.20)' }}
                >
                  <Icon size={20} className="text-brass-light" />
                </div>

                <h3
                  className="text-white font-bold text-lg mb-3 leading-snug"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {reason.title}
                </h3>
                <p className="text-slate-light text-sm font-light leading-relaxed flex-1">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
