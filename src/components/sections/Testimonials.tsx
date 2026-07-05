import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

const BENTO_LAYOUT = [
  'md:col-span-2 md:row-span-1', // 0 — wide
  'md:col-span-1 md:row-span-2', // 1 — tall
  'md:col-span-1 md:row-span-1', // 2
  'md:col-span-1 md:row-span-1', // 3
  'md:col-span-1 md:row-span-1', // 4
  'md:col-span-2 md:row-span-1 md:col-start-2', // 5
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-label">Client Testimonials</span>
          <h2 className="text-forest mt-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
            What Our{' '}
            <span className="text-brass" style={{ fontStyle: 'italic' }}>Clients</span> Say
          </h2>
          <div className="gold-rule mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl border p-7 flex flex-col gap-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-medium border-forest/[0.07] bg-sand hover:border-brass/25 ${BENTO_LAYOUT[i]}`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(181,133,42,0.07) 0%, transparent 70%)' }}
              />

              {/* Quote icon */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={13} className="text-brass fill-brass" />
                  ))}
                </div>
                <Quote size={20} className="text-brass/20 rotate-180" />
              </div>

              {/* Quote text */}
              <blockquote
                className="text-forest leading-relaxed flex-1 font-light"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: i === 0 || i === 1 ? '1.05rem' : '0.9rem', fontStyle: 'italic' }}
              >
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-4 pt-5 border-t border-forest/[0.06]">
                <div className="w-10 h-10 rounded-full bg-brass/10 border border-brass/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-brass font-bold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-forest text-sm truncate mb-0.5">{t.name}</div>
                  <div className="text-slate-brand text-xs truncate mb-0.5">{t.role}</div>
                  <div className="text-brass text-xs font-medium truncate mt-0.5">{t.company}</div>
                </div>
                <span className="text-2xs font-semibold tracking-wider border border-forest/[0.08] bg-forest/[0.04] text-slate-brand rounded-full px-2.5 py-1 flex-shrink-0 hidden sm:block">
                  {t.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
