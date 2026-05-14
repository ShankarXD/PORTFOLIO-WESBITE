import "./components/cyber-effects.css";
import { motion, useScroll, useSpring } from "motion/react";
import {
  Github,
  Mail,
  Send,
  MapPin,
  GraduationCap,
  ExternalLink,
  Star,
  GitFork,
  Instagram,
  Phone,
  Mountain,
  Code2,
  ShieldHalf,
  Palette,
  Home,
  User,
  Sparkles,
  Briefcase,
  MessageSquare,
  Menu,
  X,
  ArrowUpRight,
  Coffee,
  Clock,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Typewriter } from "./components/Typewriter";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { WelcomeIntro } from "./components/WelcomeIntro";

const PHOTO_URL =
  "https://images.unsplash.com/photo-1778691143575-72e7ac33750a?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "contact", label: "Contact", icon: MessageSquare },
];

const SKILLS = [
  { name: "Web Design", level: 78, note: "UI · UX · Tailwind" },
  {
    name: "Cyber Security Basics",
    level: 72,
    note: "Phishing · Recon",
  },
  {
    name: "Kali Linux Basics",
    level: 65,
    note: "Tooling · Recon",
  },
];

const HOBBIES = [
  { label: "Trekking", icon: Mountain },
  { label: "Coding", icon: Code2 },
  { label: "Hacking", icon: ShieldHalf },
  { label: "Designing", icon: Palette },
];

const CONTACTS = [
  {
    label: "Telegram",
    value: "t.me/adrianxd1",
    href: "https://t.me/adrianxd1",
    icon: Send,
  },
  {
    label: "WhatsApp",
    value: "+977 9805809318",
    href: "https://wa.me/9779805809318",
    icon: Phone,
  },
  {
    label: "Instagram",
    value: "@ShankarXD",
    href: "https://instagram.com/ShankarXD",
    icon: Instagram,
  },
  {
    label: "GitHub",
    value: "ShankarXD",
    href: "https://github.com/ShankarXD",
    icon: Github,
  },
];

const MARQUEE = [
  "Web Design",
  "Cyber Security",
  "Kali Linux",
  "OSINT",
  "UI / UX",
  "Phishing Analysis",
  "Recon",
  "Front-End",
];

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

function StatusDot() {
  return (
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kathmandu",
        }),
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return <span>{time} NPT</span>;
}

function Sidebar({
  active,
  onNavigate,
  mobileOpen,
  onClose,
}: {
  active: string;
  onNavigate: (id: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop on mobile */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity ${
          mobileOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 z-50 md:z-30 border-r border-emerald-300/10 bg-[#07090c]/90 backdrop-blur-xl flex flex-col transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <a
            href="#home"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
          >
            <span className="display text-emerald-50 text-sm tracking-[0.25em]">
              SHANKARXD
            </span>
            <span className="accent">.</span>
          </a>
          <button
            onClick={onClose}
            className="md:hidden text-emerald-200/70 hover:text-emerald-50"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 mb-6">
          <div className="flex items-center gap-3 hairline rounded-md p-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden hairline">
                <ImageWithFallback
                  src={PHOTO_URL}
                  alt="Shankar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07090c] dot-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-emerald-50 text-sm truncate">
                Shankar Acharya
              </div>
              <div className="text-[11px] accent-soft truncate">
                Junior Cybersec · Designer
              </div>
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-1 flex-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => onNavigate(n.id)}
                data-active={isActive}
                className={`nav-pill flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-md text-sm transition ${
                  isActive
                    ? "bg-emerald-300/[0.06] text-emerald-50"
                    : "text-emerald-100/60 hover:text-emerald-50 hover:bg-emerald-300/[0.04]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "accent" : ""}`}
                />
                <span>{n.label}</span>
                <span className="ml-auto text-[10px] accent-soft mono">
                  0{NAV.indexOf(n) + 1}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="px-6 py-5 border-t border-emerald-300/10 space-y-3">
          <div className="flex items-center justify-between text-[11px] accent-soft">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> <LiveClock />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <StatusDot /> online
            </span>
          </div>
          <div className="flex gap-2">
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={c.label}
                  className="flex-1 hairline rounded-md p-2 flex items-center justify-center text-emerald-100/70 hover:text-emerald-50 hover:border-emerald-300/30 transition"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

function Section({
  id,
  index,
  title,
  subtitle,
  children,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="px-6 md:px-12 py-20 md:py-24 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-baseline gap-3">
          <span className="mono accent-soft text-xs">
            {index}
          </span>
          <h2 className="display text-emerald-50 text-2xl md:text-3xl">
            {title}
          </h2>
          <div className="flex-1 h-px bg-emerald-300/10" />
        </div>
        {subtitle && (
          <div className="mt-2 ml-8 text-sm accent-soft">
            {subtitle}
          </div>
        )}
      </motion.div>
      {children}
    </section>
  );
}

export default function App() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [reposError, setReposError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));
  const photoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  });

  useEffect(() => {
    fetch(
      "https://api.github.com/users/ShankarXD/repos?per_page=100&sort=updated",
    )
      .then((r) => {
        if (!r.ok) throw new Error("gh");
        return r.json();
      })
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at).getTime() -
                new Date(a.pushed_at).getTime(),
          )
          .slice(0, 6);
        setRepos(filtered);
      })
      .catch(() => setReposError(true));
  }, []);

  const handlePhotoMove = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const el = photoRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
  };
  const resetPhoto = () => {
    if (photoRef.current) photoRef.current.style.transform = "";
  };

  const navigate = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el)
      el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen w-full text-emerald-50 mono"
      style={{ background: "#07090c" }}
    >
      <WelcomeIntro />
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-emerald-400/80 z-[60]"
      />

      {/* Background layers */}
      <div className="fixed inset-0 subtle-grid opacity-60 pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(800px 500px at 80% 0%, rgba(106,255,176,0.07), transparent 60%), radial-gradient(700px 500px at 0% 60%, rgba(106,255,176,0.04), transparent 60%)",
        }}
      />

      <div className="flex">
        <Sidebar
          active={active}
          onNavigate={navigate}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <main className="flex-1 min-w-0">
          {/* Mobile top bar */}
          <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-5 py-3 bg-[#07090c]/85 backdrop-blur-md border-b border-emerald-300/10">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-emerald-100 hover:accent transition"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="display tracking-[0.25em] text-sm">
              SHANKARXD<span className="accent">.</span>
            </span>
            <a
              href="https://github.com/ShankarXD"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-100 hover:accent transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* HERO */}
          <section
            id="home"
            className="relative px-6 md:px-12 pt-12 md:pt-20 pb-16 md:pb-24 max-w-5xl mx-auto"
          >
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full hairline text-[11px] accent-soft"
                >
                  <StatusDot />
                  open to collaborations
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="display mt-5 leading-[1.04]"
                  style={{
                    fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)",
                  }}
                >
                  <span className="gradient-text">Shankar</span>
                  <br />
                  <span className="text-emerald-50">
                    Acharya
                  </span>
                  <span className="accent">.</span>
                </motion.h1>

                <div className="mt-5 text-sm md:text-base text-emerald-100/70">
                  <Typewriter
                    lines={[
                      "$ whoami",
                      "→ junior cybersec analyst · web designer · student",
                    ]}
                    speed={26}
                  />
                </div>

                <p className="mt-6 max-w-lg text-emerald-100/70 leading-relaxed text-sm md:text-base">
                  <span className="accent">“</span>The phish
                  never get caught when the mouth is closed.
                  <span className="accent">”</span>
                </p>

                <div className="mt-7 flex flex-wrap gap-2 text-[11px] accent-soft">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 hairline rounded-full">
                    <MapPin className="w-3 h-3" /> Bharatpur,
                    Chitwan
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 hairline rounded-full">
                    <GraduationCap className="w-3 h-3" /> 4th
                    Sem · IT Eng.
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 hairline rounded-full">
                    <Coffee className="w-3 h-3" /> based in
                    Nepal
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("work")}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-400 hover:bg-emerald-300 text-black text-sm transition"
                  >
                    See my work
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </button>
                  <button
                    onClick={() => navigate("contact")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md hairline-strong hover:border-emerald-300/40 text-emerald-50 text-sm transition shine"
                  >
                    <Mail className="w-4 h-4" /> Get in touch
                  </button>
                </div>
              </div>

              {/* Photo */}
              <div className="justify-self-center lg:justify-self-end">
                <div
                  className="relative"
                  onMouseMove={handlePhotoMove}
                  onMouseLeave={resetPhoto}
                >
                  <div className="absolute -inset-6 rounded-full bg-emerald-400/10 blur-3xl float" />
                  <div className="absolute -inset-2 rounded-full border border-dashed border-emerald-300/15 spin-slow" />
                  <div
                    ref={photoRef}
                    className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden hairline-strong tilt-card"
                    style={{
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <ImageWithFallback
                      src={PHOTO_URL}
                      alt="Shankar Acharya"
                      className="w-full h-full object-cover"
                      style={{
                        filter: "contrast(1.05) saturate(0.95)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090c]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] accent-soft mono">
                      <span className="inline-flex items-center gap-1.5">
                        <StatusDot /> live
                      </span>
                      <span>@ShankarXD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini stats */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { k: "Focus", v: "Cybersec" },
                { k: "Semester", v: "4 / 8" },
                { k: "Stack", v: "React · TW" },
                { k: "Coffee", v: "∞" },
              ].map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                  }}
                  className="hairline rounded-md px-4 py-3 tilt-card"
                >
                  <div className="text-[10px] uppercase tracking-wider accent-soft">
                    {s.k}
                  </div>
                  <div className="mt-1 text-emerald-50 text-sm">
                    {s.v}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Marquee */}
            <div className="mt-14 overflow-hidden border-y border-emerald-300/10 py-4">
              <div className="marquee gap-12 text-emerald-100/40 text-sm">
                {[...MARQUEE, ...MARQUEE].map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-12 whitespace-nowrap"
                  >
                    <span>{t}</span>
                    <span className="accent">✦</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <Section
            id="about"
            index="01"
            title="About"
            subtitle="who's behind the keyboard"
          >
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div className="md:col-span-2 text-emerald-100/75 leading-7">
                I'm an IT Engineering student at{" "}
                <span className="accent">
                  United Technical College, Bharatpur
                </span>
                , currently in my 4th semester. I focus on the
                quiet side of the web — phishing analysis,
                network basics and clean front-end design. I
                read packets for fun, treat every inbox like a
                crime scene, and build interfaces that don't
                shout.
              </div>
              <div className="space-y-2 text-xs">
                {[
                  ["location", "Bharatpur, Chitwan"],
                  ["college", "United Technical College"],
                  ["semester", "4 / IT Eng."],
                  ["cert", "Cisco Cybersecurity"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between hairline rounded-md px-3 py-2 tilt-card"
                  >
                    <span className="accent-soft">{k}</span>
                    <span className="text-right text-emerald-50">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="text-xs accent-soft mb-3">
                // hobbies & interests
              </div>
              <div className="flex flex-wrap gap-2">
                {HOBBIES.map((h) => {
                  const Icon = h.icon;
                  return (
                    <span
                      key={h.label}
                      className="group inline-flex items-center gap-2 text-xs hairline rounded-full px-3 py-1.5 text-emerald-100/80 hover:text-emerald-50 hover:border-emerald-300/30 hover:bg-emerald-300/[0.04] transition"
                    >
                      <Icon className="w-3.5 h-3.5 accent group-hover:scale-110 transition" />
                      {h.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </Section>

          {/* SKILLS */}
          <Section
            id="skills"
            index="02"
            title="Skills"
            subtitle="what i bring to the table"
          >
            <div className="grid sm:grid-cols-3 gap-4">
              {SKILLS.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.07,
                  }}
                  className="hairline rounded-lg p-5 tilt-card shine"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] accent-soft mono">
                      0{i + 1}
                    </span>
                    <span className="text-[11px] accent-soft">
                      {s.level}%
                    </span>
                  </div>
                  <div className="mt-3 text-emerald-50">
                    {s.name}
                  </div>
                  <div className="mt-1 text-[11px] accent-soft">
                    {s.note}
                  </div>
                  <div className="mt-4 h-1 rounded-full bg-emerald-300/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: 0.15 + i * 0.08,
                        ease: "easeOut",
                      }}
                      className="h-full bg-gradient-to-r from-emerald-400/80 to-emerald-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* WORK */}
          <Section
            id="work"
            index="03"
            title="Work"
            subtitle="live from github.com/ShankarXD"
          >
            <div className="flex items-center justify-between mb-6 text-xs accent-soft">
              <div className="inline-flex items-center gap-2">
                <Github className="w-3.5 h-3.5" /> auto-fetched
                · top by stars / recency
              </div>
              <a
                href="https://github.com/ShankarXD?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="link-underline hover:text-emerald-100 inline-flex items-center gap-1"
              >
                view all <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {!repos && !reposError && (
              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="hairline rounded-lg p-5 h-32 animate-pulse bg-emerald-300/[0.02]"
                  />
                ))}
              </div>
            )}

            {reposError && (
              <div className="hairline rounded-lg p-5 text-sm text-emerald-100/70">
                Couldn't reach GitHub right now — visit{" "}
                <a
                  className="accent link-underline"
                  href="https://github.com/ShankarXD"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/ShankarXD
                </a>{" "}
                directly.
              </div>
            )}

            {repos && repos.length === 0 && (
              <div className="hairline rounded-lg p-5 text-sm text-emerald-100/70">
                No public repositories yet — check back soon.
              </div>
            )}

            {repos && repos.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {repos.map((r, i) => (
                  <motion.a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                    }}
                    className="group block hairline rounded-lg p-5 tilt-card shine"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-emerald-50 group-hover:accent transition truncate">
                        {r.name}
                      </div>
                      <ArrowUpRight className="w-4 h-4 accent-soft shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                    <div className="mt-2 text-xs text-emerald-100/60 line-clamp-2 min-h-[2.5rem]">
                      {r.description || "—"}
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-[11px] accent-soft">
                      {r.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {r.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3 h-3" />{" "}
                        {r.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="w-3 h-3" />{" "}
                        {r.forks_count}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </Section>

          {/* CONTACT */}
          <Section
            id="contact"
            index="04"
            title="Contact"
            subtitle="encrypted-ish messages welcome"
          >
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="text-emerald-100/75 text-sm leading-7">
                  Open to collabs, freelance design work, and
                  security-curious conversations. Pick whichever
                  channel feels right — I usually reply within a
                  day.
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs accent-soft">
                  <StatusDot /> channel: open
                </div>
              </div>

              <div className="md:col-span-3 grid sm:grid-cols-2 gap-3">
                {CONTACTS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group hairline rounded-lg p-4 tilt-card shine flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-md hairline flex items-center justify-center group-hover:border-emerald-300/30 group-hover:bg-emerald-300/[0.05] transition">
                        <Icon className="w-4 h-4 accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] accent-soft uppercase tracking-wider">
                          {c.label}
                        </div>
                        <div className="text-sm text-emerald-50 truncate">
                          {c.value}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 accent-soft ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </a>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const subject = encodeURIComponent(
                  `Portfolio msg from ${data.get("name")}`,
                );
                const body = encodeURIComponent(
                  `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`,
                );
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
              }}
              className="mt-10 hairline rounded-lg p-5 grid sm:grid-cols-2 gap-3"
            >
              <input
                name="name"
                required
                placeholder="your name"
                className="bg-transparent hairline rounded-md px-3 py-2.5 text-sm focus:border-emerald-300/40 outline-none placeholder:text-emerald-300/30"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="your email"
                className="bg-transparent hairline rounded-md px-3 py-2.5 text-sm focus:border-emerald-300/40 outline-none placeholder:text-emerald-300/30"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="message…"
                className="sm:col-span-2 bg-transparent hairline rounded-md px-3 py-2.5 text-sm resize-none focus:border-emerald-300/40 outline-none placeholder:text-emerald-300/30"
              />
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400/90 hover:bg-emerald-300 text-black px-4 py-2.5 text-sm transition"
              >
                <Mail className="w-4 h-4" /> send message
              </button>
            </form>
          </Section>

          <footer className="border-t border-emerald-300/10 mt-10">
            <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs accent-soft">
              <div>
                © {new Date().getFullYear()} Shankar Acharya ·
                Bharatpur, Nepal
              </div>
              <div>built with care · react · tailwind</div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}