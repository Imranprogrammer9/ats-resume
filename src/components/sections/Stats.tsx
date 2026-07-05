import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../../data/stats';

function StatCard({ value, suffix, label, description, index }: {
  value: string; suffix?: string; label: string; description: string; index: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = performance.now();
    const raf = requestAnimationFrame(function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericValue));
      if (progress < 1) requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [started, numericValue]);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center p-8"
    >
      <div
        className="font-bold text-forest mb-1"
        style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', lineHeight: 1, fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}
      >
        <span className="text-brass">{count}</span>
        {suffix && <span className="text-brass">{suffix}</span>}
      </div>
      <div className="font-semibold text-forest text-sm mb-1">{label}</div>
      <div className="text-slate-brand text-xs font-light">{description}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-forest/[0.07] border border-forest/[0.07] rounded-2xl overflow-hidden shadow-soft">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
