import { useEffect, useState } from "react";

export function Typewriter({
  lines,
  speed = 28,
  startDelay = 0,
  className = "",
}: {
  lines: string[];
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const [output, setOutput] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    let buffer: string[] = [];

    const tick = () => {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const current = lines[lineIdx];
      charIdx++;
      const next = [...buffer, current.slice(0, charIdx)];
      setOutput(next);
      if (charIdx >= current.length) {
        buffer = [...buffer, current];
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 220);
      } else {
        setTimeout(tick, speed);
      }
    };

    const t = setTimeout(tick, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [lines, speed, startDelay]);

  return (
    <div className={className}>
      {output.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l}
          {i === output.length - 1 && !done && <span className="caret">▊</span>}
        </div>
      ))}
    </div>
  );
}
