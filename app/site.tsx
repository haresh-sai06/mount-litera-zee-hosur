"use client";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const EMAIL = "Mountliterazeeschoolhsr@gmail.com";
const spring = { type: "spring", stiffness: 120, damping: 14 } as const;
const mail = (s: string, b = "") => `mailto:${EMAIL}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`;

/* ---------- Peak motif primitives ---------- */
function PeakMark({ className = "" }) {
  return (<svg viewBox="0 0 48 40" className={className} aria-hidden>
    <path d="M2 38 L18 10 L26 22 L32 14 L46 38 Z" fill="#14213D" />
    <path d="M18 10 L22.5 18 L18 16 L14 18 Z" fill="#FBF7F0" />
    <circle cx="38" cy="8" r="5" fill="#FF6B2C" /></svg>);
}
function Peaky({ className = "" }) {
  return (<svg viewBox="0 0 80 72" className={className} aria-label="Peaky, the school's little mountain">
    <path d="M6 68 L40 6 L74 68 Z" fill="#1F4FD8" stroke="#14213D" strokeWidth="3" strokeLinejoin="round" />
    <path d="M40 6 L50 24 L40 20 L30 24 Z" fill="#FBF7F0" />
    <circle cx="32" cy="44" r="4" fill="#14213D" /><circle cx="48" cy="44" r="4" fill="#14213D" />
    <circle cx="33.5" cy="42.5" r="1.3" fill="#fff" /><circle cx="49.5" cy="42.5" r="1.3" fill="#fff" />
    <path d="M34 54 Q40 59 46 54" stroke="#14213D" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="25" cy="52" r="3.5" fill="#FF6B2C" opacity=".55" /><circle cx="55" cy="52" r="3.5" fill="#FF6B2C" opacity=".55" /></svg>);
}
type Shape = "peak" | "circle" | "pill" | "arch";
const clip: Record<Shape, string> = {
  peak: "polygon(50% 0, 100% 100%, 0 100%)", circle: "circle(50% at 50% 50%)",
  pill: "inset(0 round 999px)", arch: "inset(0 round 999px 999px 28px 28px)",
};
function Frame({ shape, label, className = "", tint = "", src, pos = "center" }: { shape: Shape; label: string; className?: string; tint?: string; src?: string; pos?: string }) {
  if (src) return (<div className={`relative ${className}`} style={{ clipPath: clip[shape] }}>
    <img src={src} alt={label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: pos }} /></div>);
  return (<div className={`relative ${className}`} style={{ clipPath: clip[shape] }}>
    <div className={`absolute inset-0 ph ${tint}`} />
    <div className={`absolute inset-0 grid place-items-center text-center px-6 ${shape === "peak" ? "pt-[38%]" : ""}`}>
      <span className="text-[11px] font-bold uppercase tracking-[.14em] text-inksoft/80">Photo<br />{label}<br /><span className="normal-case tracking-normal font-semibold opacity-70">(from school)</span></span>
    </div></div>);
}
function Sticker({ children, className = "", color = "bg-sunshine" }: any) {
  return <span className={`absolute font-kid text-sm px-3 py-1.5 rounded-full border-2 border-ink shadow-[3px_3px_0_#14213D] ${color} ${className}`}>{children}</span>;
}
function Fade({ children, delay = 0, className = "", y = 18 }: any) {
  return <motion.div className={className} initial={{ opacity: 0, y, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: .55, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
function Highlight({ children }: any) {
  return (<span className="relative inline-block whitespace-nowrap">
    <svg className="absolute -bottom-2 left-0 w-full h-4 md:h-5" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
      <motion.path d="M4 14 C 70 4, 160 4, 296 10" stroke="#FF6B2C" strokeWidth="7" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .9, duration: .8, ease: "easeOut" }} /></svg>
    <span className="relative">{children}</span></span>);
}

/* ---------- Nav ---------- */
const links = [["The Climb", "#climb"], ["A day here", "#day"], ["Principal", "#principal"], ["Admissions", "#admissions"], ["FAQ", "#faq"]];
function Nav() {
  const { scrollYProgress, scrollY } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [solid, setSolid] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => scrollY.on("change", v => setSolid(v > 24)), [scrollY]);
  return (<header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-paper/80 backdrop-blur-md border-b border-line" : ""}`}>
    <motion.div style={{ scaleX: w }} className="absolute bottom-0 left-0 right-0 h-[2px] bg-peak origin-left" />
    <div className="wrap flex h-16 md:h-20 items-center justify-between">
      <a href="#top" className="flex items-center gap-2.5"><img src="/images/logo-mlzs.png" alt="Mount Litera Zee School" className="w-10 h-10 md:w-11 md:h-11 object-contain" />
        <span className="leading-none"><span className="block font-display font-extrabold tracking-tight">Mount Litera Zee</span>
          <span className="block text-[11px] font-bold uppercase tracking-[.16em] text-inksoft">School · Hosur</span></span></a>
      <nav className="hidden lg:flex items-center gap-7 text-[15px] font-semibold">
        {links.map(([t, h]) => <a key={h} href={h} className="hover:text-peak transition-colors">{t}</a>)}</nav>
      <div className="flex items-center gap-2">
        <a href="#admissions" className="hidden sm:inline-flex rounded-full bg-sun text-white font-bold px-5 py-2.5 text-sm shadow-soft hover:-translate-y-0.5 transition-transform">Book a campus visit</a>
        <button onClick={() => setOpen(!open)} className="lg:hidden w-11 h-11 rounded-full border-2 border-ink grid place-items-center" aria-label="Menu" aria-expanded={open}>
          <span className="block w-4 h-0.5 bg-ink shadow-[0_5px_0_#14213D,0_-5px_0_#14213D]" /></button></div></div>
    <AnimatePresence>{open && <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      className="lg:hidden wrap pb-6 flex flex-col gap-1 bg-paper border-b border-line">
      {links.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 font-display text-2xl font-bold border-b border-line">{t}</a>)}
      <a href="#admissions" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-sun text-white font-bold px-5 py-3 text-center">Book a campus visit</a></motion.nav>}</AnimatePresence>
  </header>);
}

/* ---------- Hero ---------- */
function Hero() {
  const words = "Where little minds".split(" ");
  return (<section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
    <div className="absolute -top-40 right-[-10%] w-[900px] h-[900px] rounded-full" style={{ background: "radial-gradient(closest-side,#FFE3D3,transparent)" }} aria-hidden />
    <div className="wrap relative grid grid-cols-12 gap-y-14 md:gap-x-8 items-center">
      <div className="col-span-12 lg:col-span-7">
        <Fade><p className="eyebrow flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sun" />Nursery to Class 5 · Hosur</p></Fade>
        <h1 className="h1 mt-6">
          {words.map((w, i) => <motion.span key={i} className="inline-block mr-[.22em]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: .1 + i * .06 }}>{w}</motion.span>)}
          <br /><motion.span className="inline-block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: .32 }}>
            <Highlight><span className="text-peak">grow big.</span></Highlight></motion.span></h1>
        <Fade delay={.45}><p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-inksoft">
          A small, warm school for the first big climbs — reading the first word, counting the first hundred, making the first best friend. Right opposite Micro Labs, Hosur.</p></Fade>
        <Fade delay={.55}><div className="mt-9 flex flex-wrap gap-3">
          <a href="#admissions" className="rounded-full bg-sun text-white font-bold px-7 py-4 shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all">Book a campus visit →</a>
          <a href={mail("Enquiry — Mount Litera Zee School, Hosur", "Hello,\n\nI'd like to know more about admissions for my child.\n\nChild's age:\nClass:\n\nThank you.")}
            className="rounded-full border-2 border-ink font-bold px-7 py-[14px] hover:bg-ink hover:text-paper transition-colors">Enquire by email</a></div></Fade>
        <Fade delay={.65}><p className="mt-6 font-hand text-2xl text-inksoft -rotate-1">Nursery – Class 5 · campus visits welcome ✦</p></Fade>
      </div>
      <div className="col-span-12 lg:col-span-5 relative h-[420px] sm:h-[500px]">
        <motion.div initial={{ opacity: 0, scale: .8, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: -3 }} transition={{ ...spring, delay: .2 }}
          className="absolute left-0 top-6 w-[62%] aspect-[1/.9] drop-shadow-xl"><Frame shape="peak" label="Campus front" src="/images/hero-campus.jpg" className="w-full h-full" /></motion.div>
        <motion.div initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: .35 }}
          className="absolute right-0 top-0 w-[46%] aspect-square"><Frame shape="circle" label="Story time" src="/images/hero-story.jpg" className="w-full h-full" /></motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: .5 }}
          className="absolute right-[6%] bottom-0 w-[64%] h-[34%]"><Frame shape="pill" label="Art corner" src="/images/hero-art.jpg" className="w-full h-full" /></motion.div>
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...spring, delay: .9 }} className="absolute left-[4%] bottom-[18%] w-20"><Peaky /></motion.div>
        <Sticker className="right-[8%] top-[42%] rotate-6">Story time</Sticker>
        <Sticker className="left-[34%] bottom-[2%] -rotate-3" color="bg-sky">Art corner</Sticker>
      </div></div>
  </section>);
}

/* ---------- Trust ---------- */
function Trust() {
  const chips = ["Nursery to Class 5", "Opposite Micro Labs, Hosur", "Principal: Mrs. Usha", "Part of the Mount Litera Zee family", "Small-school attention", "Campus visits welcome"];
  const row = [...chips, ...chips];
  return (<section aria-label="School facts" className="border-y-2 border-ink bg-ink text-paper py-5 overflow-hidden">
    <div className="marq">{row.map((c, i) => <span key={i} className="flex items-center gap-3 whitespace-nowrap font-display text-xl md:text-2xl font-bold">
      {c}<svg viewBox="0 0 20 18" className="w-5 mx-4 shrink-0"><path d="M10 0 L20 18 L0 18 Z" fill={i % 2 ? "#FF6B2C" : "#FFC83D"} /></svg></span>)}</div>
  </section>);
}

/* ---------- The Climb ---------- */
const stops = [
  { g: "Nursery", age: "Age ~2.5–3.5", t: "Feeling at home", d: "Songs, sand, sorting colours — and learning that school is a safe, happy place.", tint: "bg-peach" },
  { g: "LKG", age: "Age ~3.5–4.5", t: "Finding words", d: "Phonics sounds, tracing, number play and lots of talking in circle time.", tint: "bg-sky" },
  { g: "UKG", age: "Age ~4.5–5.5", t: "Ready to read", d: "Blending words, simple sums, first stories read aloud — getting Class 1 ready.", tint: "bg-[#FFF1C9]" },
  { g: "Class 1–2", age: "Age ~6–7", t: "Building basics", d: "Reading fluently, place value, handwriting, curiosity about the world around.", tint: "bg-[#D8F2E6]" },
  { g: "Class 3–5", age: "Age ~8–11", t: "Thinking for themselves", d: "Projects, presentations, science you can touch — confident and ready for middle school.", tint: "bg-peach" },
];
function Climb() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const draw = useTransform(scrollYProgress, [0, .95], [0, 1]);
  return (<section id="climb" className="relative bg-paper2">
    {/* desktop: pinned horizontal climb */}
    <div ref={ref} className="hidden lg:block h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="wrap w-full flex items-end justify-between mb-6">
          <div><p className="eyebrow">The Climb</p><h2 className="h2 mt-3 max-w-xl">Nursery to Class 5, one gentle step at a time.</h2></div>
          <p className="font-hand text-2xl text-inksoft rotate-2 mb-2">keep scrolling to climb ↗</p></div>
        <motion.div style={{ x }} className="relative pl-[max(20px,calc((100vw-1200px)/2))] w-[220vw]">
          <svg viewBox="0 0 2200 420" className="absolute inset-x-0 top-0 w-[2200px] h-[420px]" preserveAspectRatio="none" aria-hidden>
            <path d="M0 170 C 220 170, 260 138, 442 138 S 700 106, 874 106 S 1130 74, 1306 74 S 1560 42, 1738 42 S 2000 12, 2200 12" stroke="#E6DCCB" strokeWidth="6" fill="none" strokeDasharray="2 14" strokeLinecap="round" />
            <motion.path style={{ pathLength: draw }} d="M0 170 C 220 170, 260 138, 442 138 S 700 106, 874 106 S 1130 74, 1306 74 S 1560 42, 1738 42 S 2000 12, 2200 12" stroke="#1F4FD8" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
          <div className="relative flex gap-8 h-[440px]">
            {stops.map((s, i) => <div key={s.g} className="w-[400px] shrink-0" style={{ marginTop: `${160 - i * 32}px` }}>
              <div className="flex items-center gap-3 mb-4"><span className="w-5 h-5 rounded-full bg-peak ring-[6px] ring-paper2" /><span className="font-kid text-lg">{s.g}</span></div>
              <article className="rounded-card bg-paper shadow-soft p-6 flex gap-5 items-start border border-line">
                <Frame shape={(["circle", "peak", "arch", "circle", "peak"] as Shape[])[i]} label={s.g} src={["/images/climb-nursery.jpg","/images/climb-lkg.jpg","/images/climb-ukg.jpg","/images/climb-12.jpg","/images/climb-35.jpg"][i]} className="w-24 h-24 shrink-0" />
                <div><p className="eyebrow !text-[11px]">{s.age}</p><h3 className="font-display text-2xl font-extrabold mt-1">{s.t}</h3>
                  <p className="text-inksoft mt-2 leading-relaxed">{s.d}</p></div></article></div>)}
            <div className="w-[300px] shrink-0 flex flex-col items-center justify-start -mt-6"><Peaky className="w-28" />
              <p className="font-hand text-3xl mt-2 text-center">Peak reached!<br />Ready for Class 6.</p></div>
          </div></motion.div></div></div>
    {/* mobile: vertical stepper */}
    <div className="lg:hidden sec wrap">
      <p className="eyebrow">The Climb</p><h2 className="h2 mt-3">Nursery to Class 5, one gentle step at a time.</h2>
      <ol className="mt-12 relative border-l-[3px] border-dashed border-line ml-3">
        {[...stops].map((s, i) => <li key={s.g} className="pl-8 pb-10 relative">
          <span className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-peak ring-4 ring-paper2" />
          <Fade delay={i * .05}><span className="font-kid text-lg">{s.g}</span><span className="eyebrow !text-[11px] ml-3">{s.age}</span>
            <h3 className="font-display text-2xl font-extrabold mt-1">{s.t}</h3><p className="text-inksoft mt-1">{s.d}</p></Fade></li>)}</ol></div>
    <p className="wrap pb-10 -mt-4 lg:mt-0 text-xs text-inksoft" data-placeholder>Age bands are indicative — to be confirmed with the school office.</p>
  </section>);
}

/* ---------- Day bento ---------- */
const Icon = ({ k }: { k: string }) => {
  const p: Record<string, React.ReactNode> = {
    sun: <><circle cx="32" cy="32" r="12" fill="#FFC83D" stroke="#14213D" strokeWidth="3" />{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <line key={a} x1="32" y1="8" x2="32" y2="14" stroke="#14213D" strokeWidth="3" strokeLinecap="round" transform={`rotate(${a} 32 32)`} />)}</>,
    abc: <><rect x="8" y="22" width="16" height="16" rx="3" fill="#FF6B2C" stroke="#14213D" strokeWidth="3" /><rect x="24" y="30" width="16" height="16" rx="3" fill="#1F4FD8" stroke="#14213D" strokeWidth="3" /><rect x="40" y="18" width="16" height="16" rx="3" fill="#FFC83D" stroke="#14213D" strokeWidth="3" /></>,
    blocks: <><path d="M10 50 L22 28 L34 50 Z" fill="#1F4FD8" stroke="#14213D" strokeWidth="3" strokeLinejoin="round" /><circle cx="46" cy="40" r="10" fill="#FF6B2C" stroke="#14213D" strokeWidth="3" /><rect x="18" y="10" width="28" height="12" rx="6" fill="#2FB67C" stroke="#14213D" strokeWidth="3" /></>,
    brush: <><path d="M14 50 C 20 36, 32 30, 50 12" stroke="#14213D" strokeWidth="5" strokeLinecap="round" fill="none" /><circle cx="16" cy="48" r="8" fill="#FF6B2C" stroke="#14213D" strokeWidth="3" /></>,
    ball: <><circle cx="32" cy="32" r="18" fill="#2FB67C" stroke="#14213D" strokeWidth="3" /><path d="M14 32 H50 M32 14 C 22 24, 22 40, 32 50" stroke="#14213D" strokeWidth="3" fill="none" /></>,
    book: <><path d="M8 16 Q20 10 32 18 Q44 10 56 16 V48 Q44 42 32 50 Q20 42 8 48 Z" fill="#DCE8FF" stroke="#14213D" strokeWidth="3" strokeLinejoin="round" /><line x1="32" y1="18" x2="32" y2="50" stroke="#14213D" strokeWidth="3" /></>,
    bowl: <><path d="M10 30 H54 Q52 50 32 50 Q12 50 10 30 Z" fill="#FFC83D" stroke="#14213D" strokeWidth="3" strokeLinejoin="round" /><path d="M24 22 q3 -5 0 -10 M34 22 q3 -5 0 -10" stroke="#14213D" strokeWidth="3" fill="none" strokeLinecap="round" /></>,
    wave: <><path d="M22 52 V24 a5 5 0 0 1 10 0 V20 a5 5 0 0 1 10 0 V36" stroke="#14213D" strokeWidth="3" fill="#FFE3D3" strokeLinecap="round" /><path d="M48 12 q6 4 6 12" stroke="#FF6B2C" strokeWidth="3" fill="none" strokeLinecap="round" /></>,
  };
  return <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden>{p[k]}</svg>;
};
const tiles = [
  { t: "8:30 · Arrival & circle time", d: "Hellos at the gate, a song, and how-is-everyone-feeling.", k: "sun", c: "md:col-span-7 md:row-span-2 bg-ink text-paper", big: true },
  { t: "Phonics", d: "Sounds first, then words.", k: "abc", c: "md:col-span-5 bg-sky" },
  { t: "Maths with blocks", d: "Counting you can hold.", k: "blocks", c: "md:col-span-5 bg-paper border border-line" },
  { t: "Art", d: "Messy, on purpose.", k: "brush", c: "md:col-span-4 bg-peach" },
  { t: "Outdoor play", d: "Run, climb, share the ball.", k: "ball", c: "md:col-span-4 bg-[#D8F2E6]" },
  { t: "Story hour", d: "One book, many voices.", k: "book", c: "md:col-span-4 bg-paper border border-line" },
  { t: "Lunch together", d: "Table manners and good chats.", k: "bowl", c: "md:col-span-6 bg-[#FFF1C9]" },
  { t: "Pick-up", d: "Handed over safely, with a story to tell you.", k: "wave", c: "md:col-span-6 bg-paper border border-line" },
];
function Day() {
  return (<section id="day" className="sec"><div className="wrap">
    <div className="grid grid-cols-12 gap-6 items-end mb-12">
      <div className="col-span-12 md:col-span-7"><p className="eyebrow">A day at school</p><h2 className="h2 mt-3">Busy little days, <span className="text-peak">calm</span> little routines.</h2></div>
      <p className="col-span-12 md:col-span-4 md:col-start-9 text-inksoft text-lg">What your child might tell you at dinner. Photos straight from our Hosur classrooms.</p></div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[190px]">
      {tiles.map((x, i) => <motion.article key={x.t} initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }} transition={{ duration: .5, delay: i * .06 }} whileHover={{ y: -4 }}
        className={`rounded-card p-6 md:p-7 shadow-soft hover:shadow-lift transition-shadow flex flex-col justify-between relative overflow-hidden ${x.c}`}>
        <span className={x.big ? "w-16 h-16 rounded-full bg-paper grid place-items-center" : ""}><Icon k={x.k} /></span>
        {x.big && <div className="absolute right-6 top-6 w-[42%] aspect-square hidden md:block"><Frame shape="circle" label="Life on campus" src="/images/day-circle.jpg" tint="opacity-90" className="w-full h-full" /></div>}
        <div><h3 className={`font-display font-extrabold ${x.big ? "text-3xl md:text-4xl" : "text-xl"}`}>{x.t}</h3>
          <p className={`mt-1 ${x.big ? "text-paper/75 text-lg" : "text-inksoft"}`}>{x.d}</p></div></motion.article>)}
    </div>
    <p className="mt-4 text-xs text-inksoft" data-placeholder>Timings illustrative — school to confirm daily schedule.</p>
  </div></section>);
}

/* ---------- Approach ---------- */
function Approach() {
  const a = [["Play is the work", "Little ones learn by touching, building and talking — so our classrooms are built for doing, not just sitting."],
  ["Every child is seen", "A small school means teachers know your child's name, their best friend, and what makes them light up."],
  ["Parents in the loop", "You'll always know what your child is learning and how they're growing — and you're welcome to ask."]];
  return (<section className="sec bg-paper2"><div className="wrap grid grid-cols-12 gap-8">
    <div className="col-span-12 lg:col-span-4"><p className="eyebrow">How we teach</p><h2 className="h2 mt-3">Three small promises.</h2>
      <p className="font-hand text-2xl text-sun mt-6 -rotate-2">big ones, really ✦</p></div>
    <div className="col-span-12 lg:col-span-8 grid md:grid-cols-3 gap-8">
      {a.map(([t, d], i) => <Fade key={t} delay={i * .08}><div className="border-t-2 border-ink pt-6">
        <span className="font-display font-extrabold text-7xl outline-num">0{i + 1}</span>
        <h3 className="font-display text-2xl font-extrabold mt-4">{t}</h3><p className="text-inksoft mt-2 leading-relaxed">{d}</p></div></Fade>)}</div>
    {/* Network framing — adapted from mountlitera.com (about-us / curriculum). Facts only, no Hosur-specific claims. */}
    <div className="col-span-12 mt-8 rounded-card bg-paper border border-line p-6 md:p-10 grid md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-5"><p className="eyebrow">Part of the Mount Litera Zee network</p>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold mt-2">“Shaping global minds on Indian soil.”</h3>
        <p className="text-inksoft mt-2 text-sm">The vision of the Mount Litera Zee School network, by Zee Learn.</p></div>
      <ul className="md:col-span-7 grid sm:grid-cols-2 gap-5">
        <li><h4 className="font-kid text-lg">Every child is unique</h4><p className="text-inksoft mt-1">The network’s Unique Learner Profile (ULP) idea: notice how each child learns best, and teach to that.</p></li>
        <li><h4 className="font-kid text-lg">Whole-child growth</h4><p className="text-inksoft mt-1">In the spirit of Litera Nova — thinking, feeling, moving and making, not just marks.</p></li></ul></div>
  </div></section>);
}

/* ---------- Principal ---------- */
function Principal() {
  return (<section id="principal" className="sec"><div className="wrap grid grid-cols-12 gap-10 items-center">
    <div className="col-span-12 md:col-span-5 relative max-w-sm mx-auto md:mx-0 w-full">
      <Frame shape="circle" label="Mrs. Usha, Principal" src="/images/principal-usha.jpg" pos="center 30%" className="w-full aspect-square" />
      <svg viewBox="0 0 100 100" className="absolute -right-4 -top-4 w-24 animate-[spin_30s_linear_infinite]" aria-hidden>
        <defs><path id="c" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
        <text fontSize="11" fontWeight="700" letterSpacing="3" fill="#14213D"><textPath href="#c">PRINCIPAL · MOUNT LITERA ZEE · HOSUR ·</textPath></text></svg>
      <PeakMark className="absolute -bottom-2 -left-2 w-16" /></div>
    <div className="col-span-12 md:col-span-7">
      <p className="eyebrow">A note from our Principal</p>
      <div data-placeholder className="mt-6 rounded-[20px] p-1">
        <span className="inline-block mb-4 font-kid text-xs bg-sunshine border-2 border-ink rounded-full px-3 py-1">Message from Mrs. Usha · draft</span>
        <blockquote className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] font-bold tracking-tight">
          {/* PLACEHOLDER: user will supply Mrs. Usha's photo + approved quote */}
          “The early years are the foundation of a whole life. Here, every child is known by name, encouraged to ask questions, and helped to grow with confidence and kindness.”</blockquote></div>
      <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4"><div><p className="font-hand text-4xl">Mrs. Usha</p><p className="text-inksoft font-semibold">Principal, Mount Litera Zee School, Hosur</p></div>
        <a href="#admissions" className="rounded-full border-2 border-ink px-5 py-2.5 font-bold hover:bg-ink hover:text-paper transition-colors">Meet us on a campus visit →</a></div>
      <p className="mt-4 text-xs text-inksoft" data-placeholder>Final message to be confirmed by the school.</p></div>
  </div></section>);
}

/* ---------- Admissions ---------- */
const classes = ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
function Admissions() {
  const [cls, setCls] = useState<string | null>(null);
  const [f, setF] = useState({ parent: "", phone: "", age: "", msg: "" });
  const [sent, setSent] = useState(false);
  const steps = [["Enquire", "Email us or use the form."], ["Campus visit", "Walk around, meet the teachers."], ["Interaction", "A relaxed chat with you and your child."], ["Confirm", "Paperwork done, first-day smiles."]];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hello,\n\nI'd like to enquire about admission.\n\nParent name: ${f.parent}\nPhone: ${f.phone}\nChild's age: ${f.age}\nClass: ${cls}\n\n${f.msg}\n\nThank you.`;
    window.location.href = mail(`Admission enquiry — ${cls}`, body); setSent(true);
  };
  const inp = "w-full rounded-2xl bg-paper border-2 border-line focus:border-peak outline-none px-4 py-3.5 font-semibold transition-colors";
  return (<section id="admissions" className="sec bg-ink text-paper relative overflow-hidden">
    <svg className="absolute bottom-0 left-0 w-full opacity-[.07]" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden><path d="M0 200 L200 60 L320 140 L520 10 L720 150 L860 70 L1040 160 L1200 40 V200Z" fill="#FBF7F0" /></svg>
    <div className="wrap relative grid grid-cols-12 gap-y-12 lg:gap-x-12">
      <div className="col-span-12 lg:col-span-5">
        <p className="eyebrow !text-paper/60">Admissions</p><h2 className="h2 mt-3">Four steps to the first day.</h2>
        <ol className="mt-10 space-y-6">{steps.map(([t, d], i) => <Fade key={t} delay={i * .07}><li className="flex gap-5 items-start">
          <span className="w-12 h-12 shrink-0 rounded-full bg-sun grid place-items-center font-display font-extrabold text-xl">{i + 1}</span>
          <div><h3 className="font-display text-xl font-extrabold">{t}</h3><p className="text-paper/70">{d}</p></div></li></Fade>)}</ol>
        <p className="mt-10 text-paper/70 border-l-2 border-sunshine pl-4">Fee details are shared in person during your campus visit.</p></div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <div className="rounded-card bg-paper text-ink p-6 md:p-10 shadow-lift">
          <p className="font-kid text-sm text-peak">Step 1 of 2</p><h3 className="font-display text-2xl md:text-3xl font-extrabold mt-1">Which class are you looking at?</h3>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">{classes.map(c => <button key={c} type="button" onClick={() => setCls(c)} aria-pressed={cls === c}
            className={`rounded-2xl border-2 py-3.5 font-kid text-base transition-all ${cls === c ? "bg-peak text-white border-peak shadow-soft -translate-y-0.5" : "border-line hover:border-ink"}`}>{c}</button>)}</div>
          <AnimatePresence>{cls && <motion.form onSubmit={submit} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
            <p className="font-kid text-sm text-peak mt-8">Step 2 of 2</p><h3 className="font-display text-2xl font-extrabold mt-1">A few details for {cls}</h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <input required className={inp} placeholder="Parent's name" value={f.parent} onChange={e => setF({ ...f, parent: e.target.value })} aria-label="Parent's name" />
              <input required type="tel" className={inp} placeholder="Phone number" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} aria-label="Phone" />
              <input className={inp} placeholder="Child's age" value={f.age} onChange={e => setF({ ...f, age: e.target.value })} aria-label="Child's age" />
              <input className={inp} placeholder="Anything to ask? (optional)" value={f.msg} onChange={e => setF({ ...f, msg: e.target.value })} aria-label="Message" /></div>
            <button className="mt-5 w-full rounded-full bg-sun text-white font-bold py-4 text-lg hover:shadow-lift transition-shadow">Send enquiry by email →</button>
            {sent && <p className="mt-3 text-leaf font-bold text-center">Your email app should open with everything filled in. 🎉</p>}
            <p className="mt-3 text-xs text-inksoft text-center">Opens your email app addressed to {EMAIL}. Nothing is stored on this site.</p></motion.form>}</AnimatePresence>
        </div></div></div>
  </section>);
}

/* ---------- FAQ ---------- */
const faqs = [
  ["Which classes does the school have?", "Nursery to Class 5. We're a primary school focused entirely on the early years."],
  ["Is this part of Mount Litera Zee School?", "Yes — our campus is part of the Mount Litera Zee School network by Zee Learn. Early-years learning here stays gentle and play-based, shaped for little ones."],
  ["Where exactly is the school?", "Opposite Micro Labs, Hosur. Email us and we'll share a map pin and the best way to reach the gate."],
  ["How do we start admission?", "Send an enquiry, then book a campus visit. We'll walk you through age criteria and documents in person."],
  ["Are fees listed online?", "No — fee details are shared during your campus visit, so we can answer every question properly."],
  ["What are the school timings and is transport available?", "Please email us — we'll share current timings and transport details for your area."],
];
function FAQ() {
  const [o, setO] = useState<number | null>(0);
  return (<section id="faq" className="sec"><div className="wrap grid grid-cols-12 gap-8">
    <div className="col-span-12 lg:col-span-4"><p className="eyebrow">Questions</p><h2 className="h2 mt-3">Parents usually ask…</h2>
      <Peaky className="w-20 mt-8 hidden lg:block" /></div>
    <div className="col-span-12 lg:col-span-8 border-t-2 border-ink">
      {faqs.map(([q, a], i) => <div key={q} className="border-b border-line">
        <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i} className="w-full flex justify-between items-center gap-6 py-6 text-left">
          <span className="font-display text-xl md:text-2xl font-bold">{q}</span>
          <motion.span animate={{ rotate: o === i ? 45 : 0 }} className="w-10 h-10 shrink-0 rounded-full border-2 border-ink grid place-items-center text-2xl leading-none">+</motion.span></button>
        <AnimatePresence initial={false}>{o === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <p className="pb-6 pr-16 text-inksoft text-lg leading-relaxed">{a}</p></motion.div>}</AnimatePresence></div>)}</div>
  </div></section>);
}

/* ---------- Footer ---------- */
function Footer() {
  const nav = [["The Climb", "#climb"], ["A day here", "#day"], ["Principal", "#principal"], ["Admissions", "#admissions"], ["FAQ", "#faq"]];
  const h = "eyebrow !text-paper/50";
  return (<footer className="bg-ink text-paper">
    <div className="bg-sun"><div className="wrap py-16 md:py-20 grid grid-cols-12 gap-6 items-center">
      <h2 className="h2 col-span-12 md:col-span-8 text-white">Come see where the climb begins.</h2>
      <div className="col-span-12 md:col-span-4 md:text-right"><a href={mail("Campus visit request — Mount Litera Zee School, Hosur", "Hello,\n\nWe'd like to visit the campus.\n\nChild's age / class:\nPreferred day:\n\nThank you.")}
        className="inline-block rounded-full bg-ink text-paper font-bold px-7 py-4 hover:-translate-y-0.5 transition-transform">Book a campus visit →</a></div></div></div>
    <div className="wrap pt-16 pb-12 md:pt-20 md:pb-16 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
      <div className="col-span-2 md:col-span-4">
        {/* Logo slot: SVG peak until the real logo is supplied */}
        <div className="flex items-center gap-3"><img src="/images/logo-mlzs-badge.png" alt="Mount Litera Zee School" className="w-11 h-11 shrink-0 object-contain" />
          <span className="font-display text-xl font-extrabold leading-tight">Mount Litera Zee School<br />Hosur</span></div>
        <p className="mt-5 text-paper/70 max-w-xs leading-relaxed">Nursery to Class 5. Where little minds grow big.</p>
        <p className="mt-5 text-sm text-paper/50 max-w-xs leading-relaxed">A campus of the <a href="https://www.mountlitera.com" target="_blank" rel="noopener" className="underline decoration-paper/30 underline-offset-4 hover:text-paper">Mount Litera Zee School</a> network by Zee Learn.</p></div>
      <nav className="col-span-1 md:col-span-2" aria-label="Footer"><p className={h}>Explore</p>
        <ul className="mt-4 space-y-3">{nav.map(([t, u]) => <li key={u}><a href={u} className="text-paper/80 hover:text-sun transition-colors">{t}</a></li>)}</ul></nav>
      <div className="col-span-1 md:col-span-3"><p className={h}>Find us</p><p className="mt-4 leading-relaxed text-paper/80">Opposite Micro Labs<br />Hosur, Tamil Nadu</p></div>
      <div className="col-span-2 md:col-span-3"><p className={h}>Write to us</p>
        <a href={`mailto:${EMAIL}`} className="mt-4 block break-all underline decoration-sun underline-offset-4">{EMAIL}</a>
        <a href="tel:+919092312121" className="mt-3 block underline decoration-sun underline-offset-4">+91 90923 12121</a>
        <a href="https://wa.me/919092312121" target="_blank" rel="noopener" className="mt-1 block text-paper/70 text-sm underline underline-offset-4">WhatsApp us</a></div></div>
    <div className="border-t border-paper/15"><div className="wrap py-6 text-sm text-paper/50 flex flex-col sm:flex-row sm:justify-between gap-2">
      <span>© {new Date().getFullYear()} Mount Litera Zee School, Hosur</span><span>Part of the Mount Litera Zee School network</span></div></div>
  </footer>);
}

export default function Site() {
  return (<><Nav /><main><Hero /><Trust /><Climb /><Day /><Approach /><Principal /><Admissions /><FAQ /></main><Footer /></>);
}
