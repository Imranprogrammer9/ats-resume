import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'A focused 30-minute consultation to understand your people challenge, business context, and what success looks like for your organisation.',
  },
  {
    number: '02',
    title: 'Diagnostic Assessment',
    description: 'We run a thorough diagnostic — mapping your current state against best practice benchmarks to identify the exact gaps and priorities.',
  },
  {
    number: '03',
    title: 'Strategy & Roadmap',
    description: 'A tailored action plan with clear timelines, responsibilities, and measurable milestones — built specifically around your situation.',
  },
  {
    number: '04',
    title: 'Implementation',
    description: 'We work alongside your team to implement agreed solutions — whether that\'s a new process, a training programme, or a technology deployment.',
  },
  {
    number: '05',
    title: 'Measure & Optimise',
    description: 'We track results against the defined metrics, report back regularly, and optimise the approach until the outcomes are confirmed.',
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-label">How We Work</span>
          <h2 className="section-title mt-2">
            A Process Built Around{' '}
            <span className="text-brass" style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic' }}>Your</span> Outcomes
          </h2>
          <div className="gold-rule mx-auto" />
          <p className="section-sub mx-auto text-center">
            Every engagement follows a proven five-step methodology — diagnostic first, outcome-focused throughout.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-forest/[0.08]" />
          <div
            className="absolute top-8 left-[10%] h-0.5 bg-gradient-to-r from-brass to-brass/20"
            style={{ width: '60%' }}
          />

          <div className="grid grid-cols-5 gap-4 relative">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-forest border-2 border-brass/40 flex items-center justify-center shadow-brass">
                    <span className="text-brass-light font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.number}</span>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-brass/15" />
                </div>

                <h3 className="font-semibold text-forest text-base mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.title}</h3>
                <p className="text-slate-brand text-xs font-light leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-forest border-2 border-brass/40 flex items-center justify-center flex-shrink-0 shadow-brass">
                  <span className="text-brass-light font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.number}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 w-0.5 bg-brass/20 my-2 min-h-[2rem]" />
                )}
              </div>

              <div className={`pb-8 ${i === STEPS.length - 1 ? 'pb-0' : ''}`}>
                <h3 className="font-semibold text-forest text-lg mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.title}</h3>
                <p className="text-slate-brand text-sm font-light leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
