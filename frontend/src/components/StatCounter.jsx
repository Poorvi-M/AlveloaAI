import { useState, useRef, useEffect } from "react";

export default function StatCounter({ target, suffix = "", duration = 2200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const p = Math.min((Date.now() - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(ease * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  const fmt = (v) =>
    v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + "M" :
    v >= 1_000     ? (v / 1_000).toFixed(0) + "K" : v;

  return <span ref={ref}>{fmt(val)}{suffix}</span>;
}
