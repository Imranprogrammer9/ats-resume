const ROW_ONE = [
  'ATS Resume', 'Recruitment', 'LinkedIn Optimization',
  'Attrition Predictor', 'Employee Attrition Predictor', 'Resume Analyzer',
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-4 items-center"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} 28s linear infinite`,
          width: 'max-content',
        }}
      >
        {[...items, ...items, ...items, ...items].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-lg border transition-all duration-300 hover:border-brass/40 hover:bg-white/[0.08]"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.09)' }}
          >
            <div className="w-2 h-2 rounded-full bg-brass flex-shrink-0" />
            <span className="text-white/60 text-sm font-medium whitespace-nowrap tracking-wide">{name}</span>
          </div>
        ))}
      </div>
      <div
        className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, #0E1F15, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, #0E1F15, transparent)' }}
      />
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      className="py-12 border-y border-white/[0.07] overflow-hidden"
      style={{ background: '#0E1F15' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
        <p className="section-label">Our Expertise</p>
        <p className="text-slate-light text-sm font-light">Tailored tools and professional HR services to empower your workforce</p>
      </div>
      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW_ONE} />
      </div>
    </section>
  );
}
