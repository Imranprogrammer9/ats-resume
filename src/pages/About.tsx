import { motion } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const VALUES = [
  { icon: Shield, title: 'Integrity First', description: 'We say what we mean and do what we say. Every recommendation is honest, evidence-based, and in your best interest.' },
  { icon: TrendingUp, title: 'Outcome-Oriented', description: 'We measure success in your results — not hours billed, reports delivered, or frameworks deployed.' },
  { icon: Users, title: 'Human-Centred', description: 'Every tool and framework we build keeps real people at the centre — their dignity, growth, and wellbeing.' },
  { icon: BookOpen, title: 'Evidence-Based', description: 'Our methodology is grounded in SHRM research, peer-reviewed studies, and proven best practices — not trends.' },
  { icon: Award, title: 'Excellence Standard', description: 'We hold our work to the standard of world-class HR practice — because that\'s what your people deserve.' },
  { icon: Heart, title: 'Genuine Partnership', description: 'We embed as true partners. Your success is our success — we stay until the outcomes are real.' },
];

const TIMELINE = [
  { year: '2019', event: 'HR Vanguard founded as a boutique HR consulting practice' },
  { year: '2020', event: 'Launched Employee Attrition Predictor — first version for internal use' },
  { year: '2021', event: 'Expanded to serve 50+ organisations across 6 industries' },
  { year: '2022', event: 'Achieved SHRM alignment across all consulting frameworks' },
  { year: '2023', event: 'Released HR Technology Platform — tools available free to the market' },
  { year: '2024', event: '340+ clients served, 98% CSAT score, 12K+ assessments completed' },
];

export default function About() {
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
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">About HR Vanguard</span>
            <h1 className="text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08 }}>
              Built by HR Professionals,{' '}
              <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>for People Leaders</span>
            </h1>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed text-lg">
              HR Vanguard was founded on a simple belief: that great HR isn't a support function — it's a competitive advantage. We combine consulting expertise with proprietary technology to help organisations realise that advantage.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {[
              {
                label: 'Our Mission',
                title: 'Make World-Class HR Accessible',
                body: 'To make world-class HR consulting and HR technology accessible to every organisation — regardless of size, budget, or sector. We believe every team deserves the tools and expertise to hire better, retain top talent, and build a culture where people thrive.',
              },
              {
                label: 'Our Vision',
                title: 'The Future of People Strategy',
                body: 'A world where HR decisions are data-driven, human-centred, and genuinely predictive. Where attrition is anticipated, talent is developed proactively, and people leaders have the same quality of intelligence as any other business function.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl p-8 border border-forest/[0.07] shadow-soft"
              >
                <span className="section-label">{item.label}</span>
                <h2 className="text-2xl font-bold text-forest mt-2 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.title}</h2>
                <div className="gold-rule" />
                <p className="text-slate-brand font-light leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <span className="section-label">Our Values</span>
            <h2 className="section-title mt-2">What We Stand For</h2>
            <div className="gold-rule mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 bg-sand rounded-xl border border-forest/[0.07] hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-brass/8 border border-brass/15 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-brass" />
                  </div>
                  <h3 className="font-semibold text-forest mb-2">{v.title}</h3>
                  <p className="text-slate-brand text-sm font-light leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-forest relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-3">Our Journey</span>
            <h2 className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Company Timeline</h2>
            <div className="w-10 h-0.5 bg-brass mx-auto mt-4" />
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 mb-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brass/15 border-2 border-brass/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-brass-light font-bold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.year}</span>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="flex-1 w-0.5 bg-brass/15 my-2 min-h-[1.5rem]" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-slate-light text-sm leading-relaxed pt-3">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">Ready to Work Together?</h2>
          <p className="section-sub mx-auto mb-8">Book a free consultation and discover how HR Vanguard can transform your people strategy.</p>
          <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
