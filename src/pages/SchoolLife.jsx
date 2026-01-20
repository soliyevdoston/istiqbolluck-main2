import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import {
  Tv,
  Computer,
  Book,
  ArrowRight,
  Trophy,
  Camera,
  Compass,
  ShieldCheck,
  Zap,
  Lightbulb,
} from "lucide-react";

// Ma'lumotlar importi
import {
  missions,
  facilities,
  galleryRow1,
  galleryRow2,
} from "../data/schoolLifeData";

// Qo'shimcha klublar
const extraClubs = [
  {
    icon: <Trophy size={28} />,
    title: "Sport Klublari",
    desc: "Sog‘lom tana va g‘oliblik ruhi",
    color: "#F59E0B",
  },
  {
    icon: <Tv size={28} />,
    title: "Madaniy Hordiq",
    desc: "Filmlar va madaniy dam olish",
    color: "#8B5CF6",
  },
  {
    icon: <Computer size={28} />,
    title: "Kompyuter va IT",
    desc: "Dasturlash va IT loyihalar",
    color: "#0EA5E9",
  },
  {
    icon: <Book size={28} />,
    title: "Qo‘shimcha Darslar",
    desc: "Fanlar bo‘yicha chuqur tayyorgarlik",
    color: "#F97316",
  },
];

// --- Draggable Marquee Component ---
const DraggableMarquee = ({ items, reverse = false }) => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const speed = 40;

  const resumeAnimation = async () => {
    const currentX = x.get();
    const targetX = reverse ? 0 : -contentWidth;
    const remainingDistance = Math.abs(targetX - currentX);
    const duration = (remainingDistance / contentWidth) * speed;

    await controls.start({
      x: targetX,
      transition: { duration, ease: "linear" },
    });
    x.set(reverse ? -contentWidth : 0);
    resumeAnimation();
  };

  useEffect(() => {
    if (containerRef.current)
      setContentWidth(containerRef.current.scrollWidth / 3);
  }, [items]);

  useEffect(() => {
    if (contentWidth > 0) {
      x.set(reverse ? -contentWidth : 0);
      resumeAnimation();
    }
    return () => controls.stop();
  }, [contentWidth, reverse]);

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3 relative cursor-grab active:cursor-grabbing">
      <motion.div
        ref={containerRef}
        drag="x"
        style={{ x }}
        dragConstraints={{ left: -contentWidth * 2, right: 0 }}
        animate={controls}
        onDragStart={() => controls.stop()}
        onDragEnd={() => resumeAnimation()}
        className="flex gap-4 md:gap-8"
      >
        {[...items, ...items, ...items].map((img, i) => (
          <div
            key={i}
            className="w-[240px] md:w-[400px] h-[180px] md:h-[280px] flex-shrink-0 overflow-hidden rounded-[1.5rem] md:rounded-[3rem] shadow-xl border-2 md:border-4 border-white dark:border-zinc-900 select-none"
          >
            <img
              src={img}
              alt="Gallery"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Component ---
export default function SchoolLife() {
  const scrollTargetRef = useRef(null);
  const scrollToSection = () =>
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      <section className="relative min-h-screen w-full flex items-center justify-center px-6 py-20 lg:py-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-[#39B54A]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-20 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="flex items-center gap-3 mb-6 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-800">
              <Camera className="text-[#39B54A]" size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                Atmosferamiz
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter dark:text-white leading-[0.85] italic uppercase mb-8">
              MAKTAB <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px #39B54A" }}
              >
                HAYOTI
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-black text-zinc-500 uppercase italic max-w-lg mb-10 leading-snug">
              Har bir lahza —{" "}
              <span className="text-zinc-900 dark:text-white">
                muvaffaqiyat sari
              </span>{" "}
              qo'yilgan ulkan qadamdir.
            </p>
            <button
              onClick={scrollToSection}
              className="group flex items-center gap-5 text-xs font-black uppercase tracking-widest text-[#39B54A] bg-white dark:bg-zinc-900 px-8 py-4 rounded-full shadow-xl border border-[#39B54A]/20 hover:scale-105 transition-all"
            >
              GALEREYANI KO'RISH
              <div className="w-10 h-10 rounded-full bg-[#39B54A] text-white flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                <ArrowRight size={18} />
              </div>
            </button>
          </motion.div>

          {/* Hero Image - faqat 1100px+ da */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block ml-auto z-10"
            style={{ width: "min(450px, 30vw)" }}
          >
            <div className="absolute inset-0 bg-[#39B54A]/20 blur-[80px] rounded-full"></div>
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-[12px] border-white dark:border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="School Environment"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="font-black text-2xl italic uppercase leading-none">
                  Bizning <br /> Muhitimiz
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. GALLERY */}
      <section
        ref={scrollTargetRef}
        className="py-8 md:py-24 bg-white dark:bg-[#080808] border-y dark:border-zinc-900"
      >
        <DraggableMarquee items={galleryRow1} />
        <div className="mt-4">
          <DraggableMarquee items={galleryRow2} reverse />
        </div>
      </section>

      {/* 3. CLUBS */}
      <section className="py-16 md:py-32 bg-[#f4f4f4] dark:bg-zinc-950 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center lg:text-left mb-12 md:mb-20">
            <h2 className="text-4xl md:text-7xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              Darsdan <br /> <span className="text-[#39B54A]">Tashqari</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {extraClubs.map((club, idx) => (
              <div
                key={idx}
                className="bg-[#e1dede] dark:bg-zinc-900 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] hover:shadow-2xl hover:-translate-y-2 transition-all group border border-transparent dark:border-zinc-800"
              >
                <div
                  style={{ backgroundColor: club.color }}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform"
                >
                  {club.icon}
                </div>
                <h4 className="text-xl md:text-2xl font-black uppercase italic mb-2 text-zinc-900 dark:text-white">
                  {club.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-medium leading-relaxed">
                  {club.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSIONS / YO'NALISHLAR */}
      <section className="py-16 md:py-32 bg-white dark:bg-black transition-colors px-6 border-t dark:border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 lg:mb-24 gap-8">
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black dark:text-white uppercase italic leading-[0.9] tracking-tighter text-center lg:text-left">
              BIZNING <br /> <span className="text-[#39B54A]">YO‘NALISH</span>
            </h2>
            <div className="bg-[#39B54A]/10 p-4 lg:p-6 rounded-2xl border border-[#39B54A]/20 flex items-center gap-4">
              <Lightbulb className="text-[#39B54A] shrink-0" size={24} />
              <p className="text-[10px] md:text-xs font-black uppercase text-zinc-500 dark:text-zinc-400 italic leading-tight text-center lg:text-left">
                Muvaffaqiyat poydevori
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto">
            {missions.map((m) => (
              <div
                key={m.id}
                className="bg-[#e1dede] dark:bg-[#0c0c0c] p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] border-b-8 transition-all shadow-sm hover:scale-[1.03] duration-500 flex flex-col h-full"
                style={{ borderBottomColor: m.color }}
              >
                <Compass
                  style={{ color: m.color }}
                  size={40}
                  className="mb-6 lg:mb-10"
                />
                <h3 className="text-2xl lg:text-3xl font-black mb-4 dark:text-white uppercase italic leading-none">
                  {m.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm lg:text-lg leading-relaxed flex-1">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FACILITIES */}
      <section className="py-16 md:py-32 bg-[#080b16] text-white relative overflow-hidden px-4 md:px-6">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h2 className="text-4xl md:text-8xl font-black mb-12 leading-none italic uppercase tracking-tighter">
              KOMFORT <br /> <span className="text-[#39B54A]">HUDUDI</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facilities.map((f, i) => (
                <div
                  key={i}
                  className="p-6 md:p-8 bg-white/5 rounded-[1.5rem] border border-white/10 hover:bg-[#39B54A] hover:text-black transition-all group text-left"
                >
                  <ShieldCheck
                    className="text-[#39B54A] group-hover:text-black mb-3"
                    size={24}
                  />
                  <h4 className="font-black italic uppercase text-sm mb-2">
                    {f.title}
                  </h4>
                  <p className="text-xs opacity-60 group-hover:opacity-100">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative mt-12 lg:mt-0">
            <div className="aspect-square rounded-[3rem] md:rounded-[5rem] overflow-hidden border-[10px] md:border-[15px] border-white/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
                className="w-full h-full object-cover"
                alt="Comfort"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#E43E1C] p-8 md:p-12 rounded-full w-32 h-32 md:w-48 md:h-48 flex flex-col items-center justify-center text-center shadow-2xl">
              <Zap size={32} fill="white" className="mb-1" />
              <span className="font-black text-[10px] md:text-xs uppercase leading-tight">
                100% Xavfsiz
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. JARAYONLAR */}
      <section className="py-20 md:py-32 bg-white dark:bg-black px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-6xl md:text-9xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              JARAYONLAR
            </h2>
            <div className="w-24 md:w-32 h-2 bg-[#39B54A] mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 h-auto">
            <div className="lg:col-span-2 group relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-lg h-[300px] lg:h-[350px]">
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Process"
              />
            </div>
            <div className="lg:col-span-1 lg:row-span-2 group relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-lg min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Process"
              />
            </div>
            <div className="lg:col-span-1 bg-[#2E3192] p-8 rounded-[2rem] md:rounded-[3.5rem] text-white flex flex-col justify-end relative shadow-lg h-[250px]">
              <h3 className="text-3xl md:text-4xl font-black uppercase italic leading-none text-left">
                AMALIY <br /> TA'LIM
              </h3>
            </div>
            <div className="lg:col-span-2 group relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-lg h-[350px]">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Process"
              />
            </div>
            <div className="lg:col-span-1 bg-[#39B54A] p-8 rounded-[2rem] md:rounded-[3.5rem] text-white shadow-lg flex items-center justify-center h-[250px]">
              <h4 className="text-3xl font-black uppercase italic text-center leading-tight">
                Ijodiy <br /> Fokus
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
