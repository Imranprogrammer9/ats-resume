import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import { SERVICES } from '../../data/services';
import CTASection from '../../components/sections/CTASection';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-forest mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Service Not Found</h1>
          <Link to="/services" className="btn-primary">Back to Services</Link>
        </div>
      </div>
    );
  }

  const related = SERVICES.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 3);

  return (
    <>
      <section className="bg-forest pt-16 pb-20 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-slate-light text-xs mb-6">
            <Link to="/" className="hover:text-brass-light transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-brand" />
            <Link to="/services" className="hover:text-brass-light transition-colors">Services</Link>
            <ChevronRight size={12} className="text-slate-brand" />
            <span className="text-brass-light">{service.title}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-3">{service.category}</span>
            <h1 className="text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.08 }}>
              {service.title}
            </h1>
            <p className="text-brass-light font-semibold text-xl mb-4" style={{ fontStyle: 'italic' }}>{service.tagline}</p>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed">{service.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-forest/[0.07] p-8 mb-6"
              >
                <h2 className="text-2xl font-bold text-forest mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>What's Included</h2>
                <div className="gold-rule" />
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 p-3 bg-sand rounded-lg">
                      <CheckCircle size={15} className="text-brass flex-shrink-0 mt-0.5" />
                      <span className="text-forest text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-forest/[0.07] p-8"
              >
                <h2 className="text-2xl font-bold text-forest mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Why It Matters</h2>
                <div className="gold-rule" />
                <p className="text-slate-brand font-light leading-relaxed">
                  {service.description} Every engagement starts with a thorough diagnostic to understand your specific context before any recommendations are made. We don't use templates — we build solutions around your organisation, your people, and your strategic objectives.
                </p>
                <blockquote className="mt-6 border-l-4 border-brass pl-5 py-1">
                  <p className="text-lg text-forest leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic' }}>
                    "We don't hand over a report and disappear — we embed as a genuine partner until the results are measurable and sustained."
                  </p>
                </blockquote>
              </motion.div>
            </div>

            <div>
              <div className="bg-forest rounded-2xl p-7 mb-5 sticky top-24">
                <p className="text-brass-light text-2xs font-semibold tracking-wider uppercase mb-4">Get Started</p>
                <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Book a Free Consultation</h3>
                <p className="text-slate-light text-sm font-light mb-5">
                  No obligations. Just an honest 30-minute conversation about your challenge and how we can help.
                </p>
                <Link to="/contact" className="btn-primary w-full justify-center mb-3">
                  Book Free Call
                  <ArrowRight size={13} />
                </Link>
                <p className="text-slate-brand text-xs text-center">Responds within 24 hours</p>
              </div>

              {related.length > 0 && (
                <div>
                  <p className="text-slate-brand text-xs font-semibold tracking-wider uppercase mb-3">Related Services</p>
                  <div className="flex flex-col gap-2">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        to={`/services/${r.slug}`}
                        className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-forest/[0.07] hover:border-brass/20 hover:shadow-soft transition-all text-sm"
                      >
                        <span className="font-medium text-forest">{r.title}</span>
                        <ArrowRight size={13} className="text-slate-brand" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
