import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Heart, Cpu, ShoppingBag, Truck, Briefcase, Factory, GraduationCap } from 'lucide-react';
import { INDUSTRIES } from '../../data/industries';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  TrendingUp, Heart, Cpu, ShoppingBag, Truck, Briefcase, Factory, GraduationCap,
};

export default function IndustriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="section-label">Industries We Serve</span>
            <h2 className="section-title mt-2">
              Sector-Specific{' '}
              <span className="text-brass" style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic' }}>HR Expertise</span>
            </h2>
            <div className="gold-rule" />
            <p className="section-sub">
              Our frameworks adapt to the unique workforce dynamics, compliance requirements, and talent markets of each industry.
            </p>
          </div>
          <Link to="/industries" className="btn-outline whitespace-nowrap flex-shrink-0">
            View All Industries
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry, i) => {
            const Icon = ICON_MAP[industry.icon] || Briefcase;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group p-5 rounded-xl border border-forest/[0.07] bg-sand hover:bg-forest hover:border-forest cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-medium"
              >
                <div className="w-10 h-10 rounded-lg bg-forest/6 group-hover:bg-brass/15 flex items-center justify-center mb-3 transition-colors">
                  <Icon size={18} className="text-forest group-hover:text-brass-light transition-colors" />
                </div>
                <h3 className="font-semibold text-forest group-hover:text-white text-sm mb-1 transition-colors">
                  {industry.name}
                </h3>
                <p className="text-slate-brand group-hover:text-slate-light text-xs leading-relaxed transition-colors">
                  {industry.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
