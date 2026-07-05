import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Target, FileText, Linkedin, Heart, BarChart2, GraduationCap, BookOpen } from 'lucide-react';
import { SERVICES } from '../../data/services';

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Users, Briefcase, Target, FileText, Linkedin, Heart, BarChart2, GraduationCap, BookOpen,
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-forest pt-16 pb-20 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">Our Services</span>
            <h1 className="text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08 }}>
              HR Solutions Built for <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>Every Stage</span>
            </h1>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed text-lg">
              From strategic HR consulting to individual career services — each offering is designed around your specific challenge, not a generic package.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => {
              const Icon = ICON_MAP[svc.icon] || Briefcase;
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={`/services/${svc.slug}`}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-forest/[0.07] p-7 hover:border-brass/25 hover:-translate-y-1 hover:shadow-medium transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-0.5 h-0 bg-brass group-hover:h-full transition-all duration-350" />

                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-forest/5 group-hover:bg-brass/8 flex items-center justify-center transition-colors">
                        <Icon size={20} className="text-forest group-hover:text-brass transition-colors" />
                      </div>
                      <span className="text-2xs font-semibold tracking-wider bg-forest/5 text-slate-brand px-2.5 py-1 rounded-full">
                        {svc.category}
                      </span>
                    </div>

                    <p className="text-2xs font-semibold tracking-wider uppercase text-brass mb-1.5">{svc.tagline}</p>
                    <h3 className="text-xl font-bold text-forest mb-3 group-hover:text-brass transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>{svc.title}</h3>
                    <p className="text-slate-brand text-sm font-light leading-relaxed flex-1">{svc.description}</p>

                    <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-forest group-hover:text-brass transition-colors">
                      Learn More
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
