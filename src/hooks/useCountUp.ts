import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number, duration = 2000, startOnMount = false) {
  const [count, setCount] = useState(startOnMount ? 0 : target);
  const [started, setStarted] = useState(startOnMount);
  const rafRef = useRef<number>(0);

  const start = () => setStarted(true);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);

  return { count, start };
}
