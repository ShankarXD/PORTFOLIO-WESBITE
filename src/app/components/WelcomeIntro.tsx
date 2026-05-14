import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINES = [
  "> initializing secure shell…",
  "> bypassing firewall…",
  "> decrypting identity…",
  "> ACCESS GRANTED.",
];

export function WelcomeIntro() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), 350 + i * 420));
    });
    timers.push(window.setTimeout(() => setShow(false), 2700));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "#03050a" }}
        >
          {/* scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(106,255,176,0.08) 0px, rgba(106,255,176,0.08) 1px, transparent 1px, transparent 3px)",
              mixBlendMode: "overlay",
            }}
          />
          {/* noise */}
          <motion.div
            initial={{ opacity: 0.25 }}
            animate={{ opacity: [0.18, 0.32, 0.2, 0.4, 0.22] }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 1  0 0 0 0 0.7  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              mixBlendMode: "overlay",
            }}
          />
          {/* radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.95) 100%)",
            }}
          />

          {/* center stack */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* glitchy name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                x: [0, -2, 3, -1, 0, 2, 0],
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                filter: { duration: 0.5 },
                x: { duration: 1.6, times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1], delay: 0.5 },
              }}
              className="relative"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(2.5rem, 9vw, 6rem)",
                fontWeight: 900,
                letterSpacing: "0.08em",
                color: "#dcffe9",
                textShadow:
                  "0 0 14px rgba(106,255,176,0.55), 0 0 30px rgba(106,255,176,0.25)",
              }}
            >
              <motion.span
                aria-hidden
                className="absolute inset-0"
                style={{ color: "#ff2dd0", mixBlendMode: "screen" }}
                animate={{ x: [-3, 2, -2, 1, 0], opacity: [0.7, 0.4, 0.8, 0.3, 0] }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                SHANKARXD
              </motion.span>
              <motion.span
                aria-hidden
                className="absolute inset-0"
                style={{ color: "#00e1ff", mixBlendMode: "screen" }}
                animate={{ x: [3, -2, 2, -1, 0], opacity: [0.6, 0.35, 0.7, 0.25, 0] }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                SHANKARXD
              </motion.span>
              <span className="relative">SHANKARXD</span>
            </motion.div>

            {/* console */}
            <div
              className="mt-6 min-h-[6.5rem] text-left text-[12px] sm:text-sm leading-6"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#6affb0",
                width: "min(420px, 86vw)",
                textShadow: "0 0 8px rgba(106,255,176,0.35)",
              }}
            >
              {LINES.slice(0, step).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={i === LINES.length - 1 && step === LINES.length ? "text-emerald-200" : ""}
                >
                  {l}
                </motion.div>
              ))}
            </div>

            {/* progress */}
            <div className="mt-5 h-[2px] w-56 bg-emerald-300/15 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                className="h-full bg-emerald-400"
              />
            </div>
          </div>

          {/* sweeping scan line */}
          <motion.div
            initial={{ y: "-10%" }}
            animate={{ y: "110%" }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: 1 }}
            className="absolute left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(106,255,176,0.12), transparent)",
            }}
          />

          {/* final flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 0.9, 0] }}
            transition={{ duration: 2.6, times: [0, 0.7, 0.85, 0.88, 1], ease: "easeOut" }}
            className="absolute inset-0 bg-emerald-300 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
