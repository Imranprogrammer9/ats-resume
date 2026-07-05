import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Target, FileText, Heart, BarChart2 } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Users, Briefcase, Target, FileText, Heart, BarChart2,
};

const FEATURED = [
  { icon: 'Users', title: 'Recruitment', tagline: 'Precision Hiring at Scale', description: 'End-to-end recruitment solutions combining structured interviewing, skills-based assessment, and market intelligence to eliminate hiring guesswork.', href: '/services/recruitment', highlight: false },
  { icon: 'FileText', title: 'ATS Resume Writing', tagline: 'Diagnostic-First CV Transformation', description: 'The only diagnostic-first ATS CV service. Gap analysis before writing — not a template, a real consultation.', href: '/services/ats-resume-writing', highlight: true },
  { icon: 'BarChart2', title: 'Workforce Analytics', tagline: 'Turn People Data Into Strategy', description: 'Transform raw HR data into actionable workforce intelligence with custom dashboards and executive people reporting.', href: '/services/workforce-analytics', highlight: false },
];

export default function FeaturedServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="section-label">Our Services</span>
            <h2 className="section-title mt-2">
              HR Solutions Built for <span className="text-brass">Impact</span>
            </h2>
            <div className="gold-rule" />
            <p className="section-sub">
              From strategic consulting to career services — each offering is designed around your specific people challenge, not a generic package.
            </p>
          </div>
          <Link to="/services" className="btn-outline whitespace-nowrap flex-shrink-0">
            View All Services <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] || Users;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={svc.href}
                  className={`group relative flex flex-col h-full p-7 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    svc.highlight
                      ? 'bg-forest border-forest text-white hover:border-brass/30'
                      : 'bg-sand border-forest/[0.07] hover:border-brass/25 hover:-translate-y-1 hover:shadow-medium'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-0.5 h-0 bg-brass group-hover:h-full transition-all duration-350" />

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                    svc.highlight
                      ? 'bg-brass/15 text-brass-light'
                      : 'bg-forest/6 text-forest group-hover:bg-brass/10 group-hover:text-brass transition-colors'
                  }`}>
                    <Icon size={20} />
                  </div>

                  <p className={`text-2xs font-semibold tracking-[0.12em] uppercase mb-1.5 ${svc.highlight ? 'text-brass-light' : 'text-brass'}`}>
                    {svc.tagline}
                  </p>

                  <h3 className={`text-xl font-bold mb-3 leading-snug ${svc.highlight ? 'text-white' : 'text-forest'}`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {svc.title}
                  </h3>

                  <p className={`text-sm font-light leading-relaxed flex-1 ${svc.highlight ? 'text-slate-light' : 'text-slate-brand'}`}>
                    {svc.description}
                  </p>

                  <div className={`mt-5 flex items-center gap-2 text-xs font-semibold ${
                    svc.highlight ? 'text-brass-light' : 'text-forest group-hover:text-brass'
                  } transition-colors`}>
                    Learn More
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
