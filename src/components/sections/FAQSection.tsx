import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../data/faqs';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('1');
  const preview = FAQS.slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <span className="section-label">FAQ</span>
            <h2 className="section-title mt-2">
              Frequently Asked{' '}
              <span className="text-brass" style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic' }}>Questions</span>
            </h2>
            <div className="gold-rule" />
            <p className="section-sub mb-8">
              Answers to the most common questions about our services, tools, and approach.
            </p>

            <div className="bg-forest rounded-2xl p-7">
              <p className="text-brass-light text-2xs font-semibold tracking-wider uppercase mb-3">Still have questions?</p>
              <p className="text-slate-light text-sm font-light leading-relaxed mb-5">
                Book a free 30-minute consultation and we'll answer everything — with zero obligation.
              </p>
              <a href="/contact" className="btn-primary text-sm">
                Book Free Call
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            {preview.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                  openId === faq.id
                    ? 'border-brass/25 shadow-soft'
                    : 'border-forest/[0.07]'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <span className="font-semibold text-forest text-sm leading-snug">{faq.question}</span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openId === faq.id ? 'bg-brass text-white' : 'bg-forest/5 text-forest'}`}>
                    {openId === faq.id ? <Minus size={13} /> : <Plus size={13} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
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
        </div>
      </div>
    </section>
  );
}
