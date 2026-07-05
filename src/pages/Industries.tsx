import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, Cpu, ShoppingBag, Truck, Briefcase, Factory, GraduationCap } from 'lucide-react';
import { INDUSTRIES } from '../data/industries';
import CTASection from '../components/sections/CTASection';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  TrendingUp, Heart, Cpu, ShoppingBag, Truck, Briefcase, Factory, GraduationCap,
};

const CHALLENGES: Record<string, string[]> = {
  finance: ['Regulatory compliance (FCA, SEC)', 'High-performer retention', 'DEI in leadership', 'Remote work policy'],
  healthcare: ['Clinical staff attrition', 'Burnout prevention', 'Shift scheduling complexity', 'Credentialing workflows'],
  technology: ['Hyper-competitive talent market', 'Fast-scaling culture', 'Engineer retention', 'Remote-first HR design'],
  retail: ['High-volume seasonal hiring', 'Front-line engagement', 'Manager development', 'Turnover cost reduction'],
  logistics: ['Safety compliance', 'Workforce scheduling', 'Driver retention', 'Multi-site HR management'],
  'professional-services': ['Partner-track progression', 'Billable utilisation vs. development', 'Graduate programme design', 'Knowledge retention'],
  manufacturing: ['Skills gap in automation era', 'Safety culture', 'Union relations', 'Succession planning'],
  education: ['Academic talent attraction', 'Contract staff management', 'Staff wellbeing', 'Leadership pipeline'],
};

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-forest pt-16 pb-20 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">Industries We Serve</span>
            <h1 className="text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08 }}>
              Sector-Specific{' '}
              <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>HR Expertise</span>
            </h1>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed">
              Each industry has unique workforce dynamics, compliance requirements, and talent market conditions. Our frameworks adapt to meet them.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INDUSTRIES.map((industry, i) => {
              const Icon = ICON_MAP[industry.icon] || Briefcase;
              const challenges = CHALLENGES[industry.id] ?? [];
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-2xl border border-forest/[0.07] p-7 hover:border-brass/20 hover:shadow-medium hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-forest/5 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-forest" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-forest" style={{ fontFamily: 'Poppins, sans-serif' }}>{industry.name}</h3>
                      <p className="text-slate-brand text-sm">{industry.description}</p>
                    </div>
                  </div>

                  {challenges.length > 0 && (
                    <div>
                      <p className="text-2xs font-semibold tracking-wider uppercase text-slate-brand mb-2">Key HR Challenges</p>
                      <div className="flex flex-wrap gap-2">
                        {challenges.map((c) => (
                          <span key={c} className="text-2xs bg-sand border border-forest/10 text-slate-brand px-2.5 py-1 rounded-full">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">Don't See Your Industry?</h2>
          <p className="section-sub mx-auto mb-8">We work with organisations across many sectors. If you don't see your industry listed, get in touch — our frameworks adapt to any workforce context.</p>
          <Link to="/contact" className="btn-primary">Talk to Us</Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
