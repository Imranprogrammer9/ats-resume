import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-forest relative overflow-hidden">
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(181,133,42,0.06) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">
            Ready to Begin?
          </span>

          <h2
            className="text-white mb-5"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}
          >
            Start Building a{' '}
            <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>High-Performing</span>{' '}
            Team Today
          </h2>

          <div className="w-10 h-0.5 bg-brass mx-auto mb-5" />

          <p className="text-slate-light font-light leading-relaxed max-w-lg mx-auto mb-10">
            Book a free 30-minute consultation. No obligations, no hard sells — just an honest conversation about your people challenges and how we can help.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-sm px-8 py-3.5">
              <CalendarCheck size={15} />
              Book Free Consultation
            </Link>
            <Link to="/hr-tools/attrition-predictor" className="btn-secondary text-sm px-8 py-3.5">
              Try Attrition Predictor Free
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-slate-brand text-xs mt-6">
            Responds within 24 hours · No commitment required · SHRM-aligned methodology
          </p>
        </motion.div>
      </div>
    </section>
  );
}
