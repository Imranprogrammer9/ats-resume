import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin, Linkedin, Twitter, Shield, CalendarCheck } from 'lucide-react';

const SERVICES_LIST = [
  'Recruitment',
  'HR Consulting',
  'Talent Acquisition',
  'ATS Resume Writing',
  'LinkedIn Optimisation',
  'Employee Retention Strategy',
  'Workforce Analytics',
  'Training & Development',
  'HR Policy Development',
  'Attrition Predictor (Tool Support)',
  'General HR Inquiry',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', role: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <>
      <section className="bg-forest pt-16 pb-20 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-xl">
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">Get In Touch</span>
            <h1 className="text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
              Book Your Free{' '}
              <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>Consultation</span>
            </h1>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed">
              Fill out the form and we'll respond within 24 business hours. All submissions are completely confidential.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-5 mb-6">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@hrvanguard.com' },
                  { icon: Clock, label: 'Response Time', value: 'Within 24 business hours' },
                  { icon: MapPin, label: 'Location', value: 'Global · Remote-First' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-brass/8 border border-brass/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-brass" />
                    </div>
                    <div>
                      <p className="text-forest text-sm font-semibold mb-0.5">{label}</p>
                      <p className="text-slate-brand text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <p className="text-slate-brand text-xs font-semibold tracking-wider uppercase mb-3">Connect</p>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Twitter, label: 'Twitter' },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      className="w-10 h-10 rounded-xl bg-white border border-forest/[0.07] flex items-center justify-center text-slate-brand hover:text-brass hover:border-brass/25 transition-all"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-forest rounded-xl p-5">
                <p className="text-brass-light text-2xs font-semibold tracking-wider uppercase mb-2">
                  <CalendarCheck size={12} className="inline mr-1" />
                  Book a Meeting
                </p>
                <p className="text-slate-light text-xs font-light mb-3">
                  Prefer to pick a time directly? Use Calendly to book a 30-minute slot.
                </p>
                <button className="w-full btn-primary text-sm justify-center">
                  Open Calendar
                </button>
              </div>

              <div className="mt-4 flex items-start gap-3 bg-white border border-forest/[0.07] rounded-xl p-4">
                <Shield size={16} className="text-brass flex-shrink-0 mt-0.5" />
                <p className="text-slate-brand text-xs font-light leading-relaxed">
                  All submissions are SSL-encrypted and completely confidential. Your data is never shared or sold to third parties.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="bg-white rounded-2xl border border-forest/[0.07] p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-brass/10 border border-brass/20 flex items-center justify-center mx-auto mb-5">
                    <CalendarCheck size={28} className="text-brass" />
                  </div>
                  <h2 className="text-2xl font-bold text-forest mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Message Received</h2>
                  <p className="text-slate-brand font-light mb-6">
                    Thank you for reaching out. We'll respond within 24 business hours with next steps.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-forest/[0.07] p-8 flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" required className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required className="input-field text-sm" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">Company</label>
                      <input type="text" value={form.company} onChange={set('company')} placeholder="Your company" className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">Your Role</label>
                      <input type="text" value={form.role} onChange={set('role')} placeholder="e.g. HR Director" className="input-field text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">
                      Service Required <span className="text-red-400">*</span>
                    </label>
                    <select value={form.service} onChange={set('service')} required className="input-field text-sm">
                      <option value="" disabled>Select a service…</option>
                      {SERVICES_LIST.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-forest/60 tracking-wider uppercase mb-2">
                      Your Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us about your situation — what's the challenge, what have you tried, and what does success look like for you?"
                      required
                      rows={5}
                      className="input-field text-sm resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary justify-center py-3.5 text-sm">
                    Send Message
                    <CalendarCheck size={15} />
                  </button>

                  <p className="text-slate-brand text-xs text-center">
                    We respond within 24 hours · No commitment required
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
