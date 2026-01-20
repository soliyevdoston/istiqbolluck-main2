import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, certificates } from "../data/blogData";
import {
  Award,
  Calendar,
  ArrowRight,
  X,
  Filter,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Blog() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  // Kategoriyalar
  const categories = useMemo(() => {
    return ["Barchasi", ...new Set(blogPosts.map((post) => post.category))];
  }, []);

  // Filtrlash
  const filteredPosts = useMemo(() => {
    return activeCategory === "Barchasi"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  // Modal ochilganda scrollni o'chirish
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = selectedCert ? "hidden" : originalStyle;
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [selectedCert]);

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] transition-colors min-h-screen font-sans pt-24 pb-20 overflow-x-hidden">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-end border-b border-zinc-100 dark:border-zinc-900 pb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-[2px] bg-[#39B54A]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#39B54A]">
                Ma'rifat olami
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black dark:text-white uppercase italic leading-[0.8] tracking-tighter"
            >
              BLOG <span className="text-[#39B54A]">&</span> <br />{" "}
              <span className="text-zinc-300 dark:text-zinc-800">XABARLAR</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:max-w-sm pl-[30px]"
          >
            <p className=" text-zinc-500 dark:text-zinc-400 text-lg italic font-medium leading-relaxed border-l-2 border-[#39B54A] pl-6">
              Maktabimiz hayotidagi eng so'nggi yangiliklar, muvaffaqiyatlar va
              foydali maqolalar toplami.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-400 shrink-0">
            <Filter size={18} />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#39B54A] border-[#39B54A] text-black shadow-lg shadow-green-500/20"
                  : "bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-100 dark:border-zinc-800 hover:border-[#39B54A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-col bg-white dark:bg-zinc-900/50 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-3xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="blog"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-md text-[9px] font-black uppercase rounded-xl dark:text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#39B54A]" />{" "}
                      {post.date}
                    </span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> 5 MIN
                    </span>
                  </div>
                  <h3 className="text-2xl font-black dark:text-white uppercase italic leading-tight mb-4 group-hover:text-[#39B54A] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.desc}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t dark:border-zinc-800">
                    <Link
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] text-[#39B54A]"
                    >
                      Batafsil <ArrowRight size={14} />
                    </Link>
                    <Sparkles
                      size={16}
                      className="text-zinc-200 dark:text-zinc-800"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CERTIFICATES */}
      <section className="bg-zinc-50 dark:bg-[#080808] py-20 md:py-32 border-y dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4 md:mb-6"
              >
                <span className="w-10 md:w-12 h-[2px] bg-[#E43E1C]"></span>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
                  Global Achievements
                </span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black dark:text-white tracking-tighter uppercase italic leading-[0.9] md:leading-[0.8]">
                XALQARO <br /> <span className="text-[#E43E1C]">YUTUQLAR</span>
              </h2>
            </div>
            <div className="p-5 md:p-8 bg-white dark:bg-zinc-900 rounded-full shadow-xl border border-zinc-100 dark:border-zinc-800 self-start md:self-auto">
              <Award size={32} className="text-[#E43E1C]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative aspect-[3/4] bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl border border-zinc-100 dark:border-zinc-800"
              >
                <img
                  src={cert.img}
                  className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  alt="Cert"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <p className="text-[#39B54A] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-2">
                    {cert.teacher}
                  </p>
                  <h4 className="text-white font-black text-lg md:text-xl leading-tight group-hover:text-[#39B54A] transition-colors uppercase italic">
                    {cert.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-950 w-full max-w-4xl rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 text-white rounded-full hover:bg-red-500 transition-colors"
              >
                <X />
              </button>
              <div className="md:w-1/2">
                <img
                  src={selectedCert.img}
                  className="w-full h-full object-cover"
                  alt="Cert"
                  loading="lazy"
                />
              </div>
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-[#39B54A]" size={20} />
                  <span className="text-[#39B54A] font-black uppercase text-[10px] tracking-[0.4em]">
                    Tasdiqlangan
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none mb-8 tracking-tighter">
                  {selectedCert.title}
                </h2>
                <p className="text-zinc-400 italic text-lg border-l-2 border-[#39B54A] pl-6 mb-10">
                  "{selectedCert.teacher} tomonidan qo'lga kiritilgan yuksak
                  e'tirof."
                </p>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-5 bg-[#39B54A] text-black font-black uppercase rounded-2xl tracking-widest text-[10px] hover:scale-105 transition-transform shadow-xl shadow-green-500/20"
                >
                  Yopish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
