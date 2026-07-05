import { useEffect, useState } from 'react';
import { getRisk } from '../../../lib/scoring';

interface GaugeProps {
  score: number;
  size?: number;
}

export default function Gauge({ score, size = 160 }: GaugeProps) {
  const [animated, setAnimated] = useState(0);
  const risk = getRisk(score);
  const r = size * 0.37;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;

  useEffect(() => {
    const id = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(id);
  }, [score]);

  const offset = circ * (1 - animated / 10);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(27,58,45,0.08)"
          strokeWidth={size * 0.09}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={risk.color}
          strokeWidth={size * 0.09}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1), stroke 0.4s',
            filter: `drop-shadow(0 0 6px ${risk.color}50)`,
          }}
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill={risk.color}
          fontSize={size * 0.18}
          fontWeight="900"
          fontFamily="'Courier New',monospace"
        >
          {score.toFixed(2)}
        </text>
        <text
          x={cx}
          y={cy + size * 0.11}
          textAnchor="middle"
          fill="rgba(27,58,45,0.35)"
          fontSize={size * 0.07}
          fontFamily="'Poppins',sans-serif"
        >
          / 10
        </text>
      </svg>

      <span
        className="text-2xs font-bold tracking-[0.18em] px-4 py-1.5 rounded-full"
        style={{
          background: risk.bg,
          border: `1px solid ${risk.border}`,
          color: risk.color,
          fontFamily: 'monospace',
        }}
      >
        {risk.label}
      </span>
    </div>
  );
}
