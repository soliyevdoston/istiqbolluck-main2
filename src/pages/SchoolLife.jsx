import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Tv,
  Computer,
  Book,
  ArrowRight,
  Target,
  ShieldCheck,
  Star,
  Palette,
  Trophy,
  Music,
  Zap,
  Compass,
  Lightbulb,
  Camera,
} from "lucide-react";

// Ma'lumotlar
import {
  missions,
  facilities,
  galleryRow1,
  galleryRow2,
} from "../data/schoolLifeData";

const extraClubs = [
  {
    icon: <Trophy size={32} />,
    title: "Sport Klublari",
    desc: "Sog‘lom tana, jismoniy chidamlilik va g‘oliblik ruhi",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: <Tv size={32} />,
    title: "Madaniy Hordiq",
    desc: "Filmlar, ko‘rsatuvlar va madaniy tadbirlar orqali dam olish",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: <Computer size={32} />,
    title: "Kompyuter va IT",
    desc: "Dasturlash, veb dizayn va texnologik loyihalar bilan shug‘ullanish",
    color: "#0EA5E9",
    bg: "#EFF6FF",
  },
  {
    icon: <Book size={32} />,
    title: "Qo‘shimcha Darslar",
    desc: "Fanlar bo‘yicha qo‘shimcha mashg‘ulotlar va tayyorgarlik",
    color: "#F97316",
    bg: "#FFF7ED",
  },
];

export default function SchoolLife() {
  const scrollTargetRef = useRef(null);

  const scrollToSection = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const MarqueeRow = ({ items, reverse = false }) => (
    <div className="flex overflow-hidden whitespace-nowrap py-6 relative">
      {/* Chekkalardagi yarimta rasmlarni "yashirish" uchun gradient maska */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fcfcfc] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fcfcfc] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>

      <motion.div
        animate={{ x: reverse ? [-2000, 0] : [0, -2000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 pr-8"
      >
        {[...items, ...items, ...items].map((img, i) => (
          <div
            key={i}
            className="w-[450px] h-[320px] flex-shrink-0 overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white dark:border-zinc-900"
          >
            <img
              src={img}
              alt="Gallery"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] transition-colors min-h-screen font-sans">
      {/* --- 1. HERO SECTION (Vizual boyitilgan) --- */}
      <section className="pt-44 pb-32 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-[#39B54A]">
                <Camera size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                Life in focus
              </span>
            </div>

            <h1 className="text-7xl md:text-[130px] font-black tracking-tighter dark:text-white leading-[0.8] italic uppercase mb-10">
              MAKTAB <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px #39B54A" }}
              >
                HAYOTI
              </span>
            </h1>

            <p className="text-2xl md:text-3xl font-black text-zinc-500 leading-tight mb-12 uppercase italic">
              Har bir lahza — bu{" "}
              <span className="text-zinc-900 dark:text-white">
                muvaffaqiyatga
              </span>{" "}
              qo'yilgan qadamdir.
            </p>

            <button
              onClick={scrollToSection}
              className="group flex items-center gap-6 text-xs font-black uppercase tracking-[0.3em] text-[#39B54A] outline-none"
            >
              GALEREYANI KO'RISH
              <div className="w-14 h-14 rounded-full border-2 border-[#39B54A] flex items-center justify-center group-hover:bg-[#39B54A] group-hover:text-white transition-all duration-500 group-hover:rotate-90">
                <ArrowRight size={20} />
              </div>
            </button>
          </motion.div>

          {/* Heroda bo'shliqni to'ldiruvchi vizual blok */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square bg-[#39B54A] rounded-[4rem] rotate-6 absolute inset-0 opacity-10 blur-3xl"></div>
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-[12px] border-white dark:border-zinc-900 shadow-3xl rotate-3">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
                alt="School Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                <p className="text-white font-black text-3xl italic uppercase leading-none">
                  Bizning <br /> Muhit
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. GALEREYA (Yarimta rasmlar maskalandi) --- */}
      <section
        ref={scrollTargetRef}
        className="py-24 overflow-hidden bg-white dark:bg-[#080808]"
      >
        <MarqueeRow items={galleryRow1} />
        <MarqueeRow items={galleryRow2} reverse={true} />
      </section>

      {/* --- 4. CLUBS (Rangli kartochkalar) --- */}
      <section className="py-32 bg-[#f4f4f4] dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-6xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              Darsdan <br /> <span className="text-[#39B54A]">Tashqari</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraClubs.map((club, idx) => (
              <div
                key={idx}
                className="bg-[#e1dede] p-12 rounded-[3.5rem] border border-transparent hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
              >
                <div
                  style={{ backgroundColor: club.color }}
                  className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform"
                >
                  {club.icon}
                </div>
                <h4 className="text-2xl font-black uppercase italic mb-4 text-zinc-900">
                  {club.title}
                </h4>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  {club.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. MISSION --- */}
      <section className="py-16 md:py-32 bg-white dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Sarlavha qismi */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black dark:text-white uppercase italic leading-[0.9] md:leading-[0.8] tracking-tighter">
              BIZNING <br />
              <span className="text-[#39B54A]">YO‘NALISHIMIZ</span>
            </h2>

            {/* Kichik info box */}
            <div className="bg-[#39B54A]/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-[#39B54A]/20 flex items-center gap-4 self-start md:self-auto">
              <Lightbulb className="text-[#39B54A] shrink-0" size={28} />
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-500 italic">
                Muvaffaqiyat poydevori
              </p>
            </div>
          </div>

          {/* Grid qismi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {missions.map((m) => (
              <div
                key={m.id}
                className="bg-[#e1dede] dark:bg-[#0c0c0c] p-8 sm:p-10 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border-b-8 transition-all hover:scale-[1.02] md:hover:scale-105 duration-500 shadow-sm"
                style={{ borderBottomColor: m.color }}
              >
                <Compass
                  style={{ color: m.color }}
                  size={40}
                  className="mb-6 md:mb-8 md:size-12"
                />
                <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 dark:text-white uppercase italic tracking-tight leading-none">
                  {m.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-base md:text-lg">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. FACILITIES (To'q ko'k alohida blok) --- */}
      <section className="py-32 bg-[#080b16] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-6xl md:text-8xl font-black mb-16 leading-[0.8] italic uppercase tracking-tighter">
                KOMFORT <br /> <span className="text-[#39B54A]">HUDUDI</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {facilities.map((f, i) => (
                  <div
                    key={i}
                    className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-[#39B54A] hover:text-black transition-all duration-500 group"
                  >
                    <ShieldCheck
                      className="text-[#39B54A] group-hover:text-black mb-4 transition-colors"
                      size={28}
                    />
                    <h4 className="font-black italic uppercase text-sm mb-3">
                      {f.title}
                    </h4>
                    <p className="text-xs opacity-60 group-hover:opacity-100 font-medium">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square rounded-[5rem] overflow-hidden border-[15px] border-white/5 shadow-3xl">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
                  className="w-full h-full object-cover"
                  alt="School"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 bg-[#E43E1C] p-12 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-2xl"
              >
                <Zap size={32} fill="white" className="mb-2" />
                <span className="font-black text-xs uppercase leading-tight">
                  100% Xavfsiz
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. JARAYONLAR (Sizga yoqqan grid) --- */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-7xl md:text-9xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              JARAYONLAR
            </h2>
            <div className="w-32 h-2 bg-[#39B54A] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-8 h-auto lg:h-[850px]">
            <div className="lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-[3.5rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="P1"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-black text-3xl italic uppercase tracking-tighter">
                  Nazariya
                </p>
              </div>
            </div>

            <div className="lg:col-span-1 lg:row-span-2 group relative overflow-hidden rounded-[3.5rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="P3"
              />
            </div>

            <div className="lg:col-span-1 lg:row-span-1 bg-[#2E3192] p-12 rounded-[3.5rem] text-white flex flex-col justify-end relative overflow-hidden group shadow-2xl transition-all hover:-rotate-2">
              <Star
                size={120}
                className="absolute -right-8 -top-8 opacity-20 rotate-12 group-hover:rotate-180 transition-transform duration-1000"
              />
              <h3 className="text-4xl font-black uppercase leading-[0.8] italic">
                AMALIY <br /> TA'LIM
              </h3>
            </div>

            <div className="lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-[3.5rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="P4"
              />
            </div>

            <div className="lg:col-span-1 lg:row-span-1 bg-[#39B54A] p-12 rounded-[3.5rem] text-white shadow-2xl flex items-center justify-center text-center hover:scale-105 transition-transform cursor-default">
              <h4 className="text-3xl font-black uppercase italic leading-none tracking-tighter">
                Ijodiy <br /> Fokus
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
