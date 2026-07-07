import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// @ts-ignore — filename contains spaces, resolved at build time
const heroIllustration = new URL('../../assets/images/image copy copy copy copy.png', import.meta.url).href;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Page background ───────────────────────────────────────────── */
function Background() {
  return (
    <>
      <div className="dot-grid-light absolute inset-0 pointer-events-none opacity-25" />
      <div className="absolute pointer-events-none" style={{
        right: 0, top: 0, width: '55%', height: '100%',
        background: 'radial-gradient(ellipse 80% 80% at 100% 40%, rgba(46,92,66,0.28) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 45% 60% at 0% 60%, rgba(46,92,66,0.18) 0%, transparent 65%)',
      }} />
    </>
  );
}

/* ─── HR Dashboard illustration ──────────────────────────────────── */
function HRDashboardPanel() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative' }}
      >
        <img
          src={heroIllustration}
          alt="HR dashboard showing employment status, employee satisfaction and ratings"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maskImage: [
              'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            ].join(', '),
            WebkitMaskImage: [
              'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            ].join(', '),
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '5rem', background: '#0e1f15' }}
    >
      <Background />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 flex items-center"
        style={{ minHeight: 'calc(100vh - 5rem)' }}
      >
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-16">

          {/* Left: copy */}
          <div className="flex-1 lg:max-w-[46%] flex flex-col items-start text-left">

            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2.5 mb-7"
              style={{
                border: '1px solid rgba(181,133,42,0.3)',
                background: 'rgba(181,133,42,0.07)',
                borderRadius: 999, padding: '5px 14px',
              }}>
              <span className="w-2 h-2 rounded-full bg-brass"
                style={{ animation: 'pulseBrass 2s ease-in-out infinite' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', color: '#D4A84B', textTransform: 'uppercase' }}>
                SHRM-Aligned · Premium HR Consulting
              </span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="text-white mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
              Build Stronger Teams.{' '}
              <span className="text-brass-light">Hire Smarter.</span>{' '}
              Retain Top Talent.
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="leading-relaxed mb-9"
              style={{ fontSize: '1.05rem', color: '#8FA89A', maxWidth: 430 }}>
              Premium HR consulting and proprietary technology — combining live attrition intelligence, precision hiring, and workforce analytics into one powerful platform.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-4 mb-9">
              <Link to="/contact" className="btn-primary text-sm px-7 py-3.5">
                Book Free Consultation
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/hr-tools/attrition-predictor"
                className="text-sm px-7 py-3.5 font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
                style={{
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: 'rgba(255,255,255,0.05)',
                }}>
                Try Attrition Predictor
              </Link>
            </motion.div>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {(['#2E5C42','#B5852A','#3D7357','#5C7266'] as const).map((bg, i) => (
                    <div key={i} style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: bg, border: '2px solid #060d09',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, fontWeight: 700, color: 'white',
                    }}>
                      {(['SA','MK','JP','LR'] as const)[i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', color: '#8FA89A' }}>
                  Trusted by{' '}
                  <span style={{ color: '#D4A84B', fontWeight: 600 }}>340+ organisations</span>{' '}
                  across 12 industries
                </span>
              </div>
              <div className="flex flex-wrap gap-6 pt-1">
                {[
                  { value: '98%', label: 'Client Satisfaction' },
                  { value: '34%', label: 'Avg Retention Lift' },
                  { value: '12K+', label: 'Assessments Run' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#D4A84B' }}>{value}</span>
                    <span style={{ fontSize: '0.75rem', color: '#5C7266' }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right: illustration */}
          <motion.div
            className="flex-1 w-full lg:max-w-[54%]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <HRDashboardPanel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
