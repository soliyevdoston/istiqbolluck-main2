import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  director,
  administration,
  teachers,
  categories,
} from "../data/teamData.js";
import {
  X,
  Award,
  GraduationCap,
  Briefcase,
  Plus,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  BookOpen,
  UserCheck,
  Quote,
  Sparkles,
  ShieldCheck,
  Crown,
  MoreHorizontal,
} from "lucide-react";

const CompactStat = ({ icon, label, value, color }) => (
  <div className="p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800 flex items-center gap-4 transition-all overflow-hidden shrink-0">
    <div style={{ color: color }} className="shrink-0">
      {icon}
    </div>
    <div className="overflow-hidden text-left">
      <h5 className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">
        {label}
      </h5>
      <p className="text-[10px] font-black dark:text-white uppercase italic truncate">
        {value}
      </p>
    </div>
  </div>
);

export default function Team() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFullAdmin, setShowFullAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [adminIdx, setAdminIdx] = useState(0);
  const [teacherIdx, setTeacherIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const dropdownRef = useRef(null);
  const CARD_WIDTH = 280;
  const GAP = 24;
  const STEP = CARD_WIDTH + GAP;

  const filteredTeachers =
    activeTab === "all"
      ? teachers
      : teachers.filter((t) => t.category === activeTab);

  // --- 🔵 AVTOMATIK AYLANISH (3 SONIYA) ---
  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        if (!showFullAdmin) {
          setAdminIdx((prev) =>
            prev >= administration.length - 1 ? 0 : prev + 1,
          );
        }
        setTeacherIdx((prev) =>
          prev >= filteredTeachers.length - 1 ? 0 : prev + 1,
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, showFullAdmin, filteredTeachers.length]);

  const handleManualMove = (type, dir) => {
    setIsAutoPlay(false);
    if (type === "admin") {
      const max = administration.length - 1;
      if (dir === "next") setAdminIdx((prev) => (prev >= max ? 0 : prev + 1));
      else setAdminIdx((prev) => (prev <= 0 ? max : prev - 1));
    } else {
      const max = filteredTeachers.length - 1;
      if (dir === "next") setTeacherIdx((prev) => (prev >= max ? 0 : prev + 1));
      else setTeacherIdx((prev) => (prev <= 0 ? max : prev - 1));
    }
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden pt-24 pb-20">
      {/* --- 1. HERO & DIRECTOR SECTION --- */}
      <section className="relative min-h-[calc(100vh-96px)] flex flex-col justify-center px-4 lg:px-10 mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-[100px] font-black dark:text-white tracking-tighter uppercase italic leading-[0.8] mb-6"
            >
              BIZNING <span className="text-[#39B54A] pl-4">JAMOA</span>
            </motion.h1>
            <p className="max-w-2xl mx-auto text-zinc-500 italic text-sm md:text-lg">
              Professional pedagoglar va kelajak yetakchilarini tarbiyalovchi
              fidoyi jamoa.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col lg:grid lg:grid-cols-12 items-stretch bg-[#0a0a0a] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl max-w-6xl mx-auto w-full"
          >
            {/* DIRECTOR IMAGE - Responsive object-contain fix */}
            <div className="lg:col-span-5 relative h-[50vh] lg:h-[550px] bg-zinc-900 flex justify-center items-center overflow-hidden shrink-0">
              <img
                src={director.img}
                className="h-full w-full object-contain lg:object-cover object-top"
                alt="Director"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-6 left-6 bg-[#39B54A] p-3 rounded-2xl text-black shadow-2xl animate-bounce">
                <Crown size={24} />
              </div>
            </div>
            <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center relative text-white">
              <Quote
                className="absolute top-10 right-10 text-[#39B54A] opacity-10 hidden md:block"
                size={60}
              />
              <h2 className="text-3xl lg:text-7xl font-black dark:text-white leading-[0.9] mb-6 italic uppercase tracking-tighter">
                {director.name}
              </h2>
              <p className="text-lg lg:text-2xl text-zinc-400 font-medium italic mb-8 border-l-4 border-[#39B54A] pl-6 italic">
                "{director.quote}"
              </p>
              <button
                onClick={() => setSelected(director)}
                className="w-fit px-10 py-4 bg-[#39B54A] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl"
              >
                BATAFSIL
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. RAHBARIYAT --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t dark:border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <h2 className="text-4xl md:text-7xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
            Rahbariyat
          </h2>
          <button
            onClick={() => {
              setShowFullAdmin(!showFullAdmin);
              setIsAutoPlay(false);
            }}
            className={`px-10 py-4 rounded-full text-xs font-black uppercase transition-all border ${showFullAdmin ? "bg-[#E43E1C] text-white border-[#E43E1C]" : "bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"}`}
          >
            {showFullAdmin ? "Yopish" : "Barchasi"}
          </button>
        </div>

        <div className="relative overflow-hidden flex justify-center">
          {/* SLIDER WIDTH RESTRICTION - Yarimta card chiqmasligi uchun */}
          <div className="w-full max-w-[304px] sm:max-w-[608px] lg:max-w-none overflow-hidden">
            <motion.div
              animate={
                !showFullAdmin ? { x: `-${adminIdx * STEP}px` } : { x: 0 }
              }
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
              className={`flex gap-6 ${showFullAdmin ? "flex-wrap justify-center" : "flex-nowrap"}`}
            >
              {administration.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="w-[280px] shrink-0 cursor-pointer group bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] p-4 border dark:border-zinc-800 hover:border-[#E43E1C] transition-all flex flex-col h-full"
                >
                  <div className="h-64 rounded-[1.8rem] overflow-hidden mb-4 bg-zinc-200 dark:bg-zinc-800 shrink-0">
                    <img
                      src={p.img}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      alt={p.name}
                    />
                  </div>
                  <div className="text-center flex-1 flex flex-col justify-center min-h-[4rem]">
                    <h4 className="text-xl font-black dark:text-white leading-tight uppercase italic break-words line-clamp-2 mb-1">
                      {p.name}
                    </h4>
                    <p className="text-[#E43E1C] font-bold text-[9px] uppercase tracking-widest">
                      {p.role}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {!showFullAdmin && (
          <div className="flex gap-4 mt-10 justify-center">
            <button
              onClick={() => handleManualMove("admin", "prev")}
              className="p-3 rounded-full border dark:border-zinc-800 dark:text-white hover:bg-[#E43E1C] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleManualMove("admin", "next")}
              className="p-3 rounded-full border dark:border-zinc-800 dark:text-white hover:bg-[#E43E1C] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* --- 3. USTOZLAR (3 NUQTA FILTER + SLAYDER) --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t dark:border-zinc-900 text-center">
        <h2 className="text-5xl md:text-[100px] font-black dark:text-white uppercase italic tracking-tighter mb-12 leading-none text-center">
          Ustozlar
        </h2>

        <div
          className="flex justify-center items-center gap-3 relative mb-16"
          ref={dropdownRef}
        >
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setTeacherIdx(0);
                }}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase transition-all border ${activeTab === cat.id ? "bg-[#39B54A] text-black border-[#39B54A]" : "bg-transparent dark:text-white border-zinc-200 dark:border-zinc-800"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab("all");
                setTeacherIdx(0);
              }}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase border ${activeTab === "all" ? "bg-[#39B54A] text-black border-[#39B54A]" : "bg-transparent dark:text-white border-zinc-200"}`}
            >
              Barchasi
            </button>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`p-3 rounded-full border transition-all ${showDropdown ? "bg-black text-white" : "dark:text-white border-zinc-200"}`}
              >
                <MoreHorizontal size={20} />
              </button>
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-4 w-52 bg-white dark:bg-zinc-950 shadow-2xl rounded-[2rem] p-3 z-[100] border dark:border-zinc-800 text-left"
                  >
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveTab(cat.id);
                            setTeacherIdx(0);
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-5 py-3 rounded-2xl text-[10px] font-black uppercase transition-all mb-1 ${activeTab === cat.id ? "bg-[#39B54A] text-black" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden flex justify-center">
          <div className="w-full max-w-[304px] sm:max-w-[608px] lg:max-w-none overflow-hidden">
            <motion.div
              animate={{ x: `-${teacherIdx * STEP}px` }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
              className="flex gap-6"
            >
              {filteredTeachers.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="w-[280px] shrink-0 cursor-pointer group bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] p-4 border dark:border-zinc-800 hover:border-[#39B54A] transition-all flex flex-col h-full"
                >
                  <div className="h-64 rounded-[1.8rem] overflow-hidden mb-4 bg-zinc-200 dark:bg-zinc-800 shrink-0 relative">
                    <img
                      src={t.img}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      alt={t.name}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Plus className="text-white bg-[#39B54A] rounded-full p-2 shadow-xl" />
                    </div>
                  </div>
                  <div className="text-center flex-1 flex flex-col justify-center min-h-[4rem]">
                    <h4 className="text-xl font-black dark:text-white leading-tight uppercase italic break-words line-clamp-2 mb-1">
                      {t.name}
                    </h4>
                    <p className="text-[#39B54A] font-bold text-[9px] uppercase tracking-widest">
                      {t.subject}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex gap-4 mt-12 justify-center">
          <button
            onClick={() => handleManualMove("teacher", "prev")}
            className="p-3 border-2 rounded-full dark:border-zinc-800 dark:text-white hover:bg-[#39B54A] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => handleNext("teacher", "next")}
            className="p-3 border-2 rounded-full dark:border-zinc-800 dark:text-white hover:bg-[#39B54A] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* --- 4. POSTER MODAL (LIGHT / DARK) --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
        fixed inset-0 z-[2000]
        flex items-center justify-center
        bg-black/90 dark:bg-black/95
        light:bg-zinc-100/80
        backdrop-blur-2xl
        p-4 lg:p-10
      "
          >
            <motion.div
              initial={{ y: 80, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 80, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              className="
          relative w-full max-w-5xl h-[90vh]
          rounded-[3.5rem] overflow-hidden
          flex flex-col

          /* DARK */
          dark:bg-white/5 dark:backdrop-blur-2xl
          dark:border dark:border-white/20
          dark:shadow-[0_80px_200px_rgba(0,0,0,0.9)]

          /* LIGHT */
          bg-white
          border border-zinc-200
          shadow-[0_40px_120px_rgba(0,0,0,0.15)]
        "
            >
              {/* ❌ CLOSE */}
              <button
                onClick={() => setSelected(null)}
                className="
            absolute top-6 right-6 z-30
            p-4 rounded-full
            transition-all duration-300

            /* DARK */
            dark:bg-white/20 dark:text-white
            dark:hover:rotate-90 dark:hover:scale-110

            /* LIGHT */
            bg-zinc-100 text-zinc-800
            hover:bg-zinc-200
          "
              >
                <X />
              </button>

              {/* 🖼 IMAGE */}
              <div
                className="
          relative h-[45%] shrink-0
          flex items-center justify-center

          /* DARK */
          dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_70%)]

          /* LIGHT */
          bg-gradient-to-br from-zinc-100 to-zinc-200
          border-b border-zinc-200 dark:border-white/10
        "
              >
                <img
                  src={selected.img}
                  alt={selected.name}
                  className="
              h-full object-contain relative z-10

              /* DARK */
              dark:drop-shadow-[0_50px_120px_rgba(0,0,0,0.85)]

              /* LIGHT */
              drop-shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
                />
              </div>

              {/* 📄 CONTENT */}
              <div className="flex-1 px-8 lg:px-14 py-6 flex flex-col gap-6 overflow-hidden">
                {/* NAME */}
                <h2
                  className="
            text-center text-4xl md:text-6xl
            font-black uppercase italic tracking-tighter

            dark:text-white
            text-zinc-900
          "
                >
                  {selected.name}
                </h2>

                {/* STATS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="modal-stat">
                    <BookOpen size={18} />
                    <span>{selected.subject || "Rahbar"}</span>
                  </div>
                  <div className="modal-stat">
                    <UserCheck size={18} />
                    <span>{selected.studentCount || "500+"}</span>
                  </div>
                  <div className="modal-stat">
                    <Briefcase size={18} />
                    <span>{selected.experience}</span>
                  </div>
                  <div className="modal-stat">
                    <Award size={18} />
                    <span>{selected.achievements}</span>
                  </div>
                </div>

                {/* BIO */}
                <div
                  className="
            flex-1 min-h-0
            grid grid-cols-1 lg:grid-cols-12 gap-8
            items-center pt-6
            border-t border-zinc-200 dark:border-white/10
          "
                >
                  <div className="lg:col-span-4">
                    <h5
                      className="
                text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2
                text-zinc-500 dark:text-white/50
              "
                    >
                      <GraduationCap size={14} /> Tahsil
                    </h5>
                    <p
                      className="
                text-sm font-bold line-clamp-3
                text-zinc-800 dark:text-white/90
              "
                    >
                      {selected.education}
                    </p>
                  </div>

                  <div className="lg:col-span-8 relative pl-0 lg:pl-8 lg:border-l border-zinc-200 dark:border-white/10">
                    <Quote
                      size={46}
                      className="absolute -top-4 left-4
                text-zinc-200 dark:text-white/10 hidden lg:block"
                    />
                    <p
                      className=" pl-10
                italic leading-relaxed line-clamp-4
                text-zinc-600 dark:text-white/70
              "
                    >
                      “{selected.bio}”
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
