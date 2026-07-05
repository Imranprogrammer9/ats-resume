import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQS } from '../data/faqs';

const CATEGORIES = ['All', 'Services', 'Tools', 'Career Services', 'Process'];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>('1');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = FAQS.filter((f) => activeCategory === 'All' || f.category === activeCategory);

  return (
    <>
      <section className="bg-forest pt-16 pb-20 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-xl">
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">FAQ</span>
            <h1 className="text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08 }}>
              Frequently Asked{' '}
              <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>Questions</span>
            </h1>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed">
              Answers to the most common questions about HR Vanguard's services, tools, and how we work.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-sand">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-brass text-white'
                    : 'bg-white border border-forest/12 text-slate-brand hover:border-brass/25 hover:text-brass'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-xl border overflow-hidden ${openId === faq.id ? 'border-brass/25 shadow-soft' : 'border-forest/[0.07] bg-white'}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <div>
                    <span className="text-2xs font-semibold text-brass tracking-wider uppercase block mb-1">{faq.category}</span>
                    <span className="font-semibold text-forest text-sm leading-snug">{faq.question}</span>
                  </div>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openId === faq.id ? 'bg-brass text-white' : 'bg-forest/5 text-forest'}`}>
                    {openId === faq.id ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-5 pb-5 text-slate-brand text-sm font-light leading-relaxed border-t border-forest/[0.05] pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-forest rounded-2xl p-8 text-center">
            <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Still Have Questions?</h3>
            <p className="text-slate-light text-sm font-light mb-5">Book a free 30-minute consultation — no obligations, just honest answers.</p>
            <Link to="/contact" className="btn-primary">Book Free Call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
