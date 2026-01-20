import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import {
  Play,
  MessageSquare,
  Crown,
  ShieldCheck,
  Quote,
  Camera,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Search,
  X,
  Filter,
  Clock,
} from "lucide-react";

// --- 1. DATA (O'ZGARMASLAR) ---
const advantages = [
  {
    id: "01",
    title: "Har bir o‘quvchiga alohida e’tibor",
    desc: "O‘quvchi qaysi darajada bo‘lishidan qat’i nazar, unga mos yondashuv qo‘llaniladi.",
    color: "#39B54A",
  },
  {
    id: "02",
    title: "Kuchli ta’lim tizimi",
    desc: "Eng samarali xorijiy ta’lim tajribalari asosida tuzilgan dasturlar.",
    color: "#2E3192",
  },
  {
    id: "03",
    title: "Hayotiy ko‘nikmalar",
    desc: "Liderlik va jamoada ishlash ko‘nikmalari rivojlanadi.",
    color: "#E43E1C",
  },
];

const stats = [
  {
    label: "O'quvchilar soni",
    value: "1200+",
    desc: "Bilimga chanqoq yoshlar.",
  },
  {
    label: "Bitiruvchilar soni",
    value: "850+",
    desc: "Nufuzli oliygoh talabalari.",
  },
  { label: "Tajriba yili", value: "15+", desc: "Sifatli ta'lim tizimi." },
  { label: "Ustozlarimiz", value: "60+", desc: "Xalqaro mutaxassislar." },
  { label: "O'qishga kirish", value: "98%", desc: "Muvaffaqiyatli natijalar." },
];

const studentFeedbacks = [
  {
    id: 1,
    name: "Lola Abdullayeva",
    major: "Filologiya yo'nalishi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    message:
      "Bu maktab menga nafaqat bilim, balki haqiqiy do'stlar va liderlik qobiliyatini berdi. Har bir dars o'ziga xos kreativlik bilan o'tiladi.",
  },
  {
    id: 2,
    name: "Asadbek Orifov",
    major: "Aniq fanlar",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
    message:
      "Mentorlar bilan ishlash tizimi juda yoqadi. Har bir savolimga istalgan vaqtda javob olaman. Muhit juda kreativ va do'stona.",
  },
  {
    id: 3,
    name: "Jasur Mirzayev",
    major: "Tabiiy fanlar",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
    message:
      "Xalqaro olimpiadalarga tayyorgarlik ko'rish uchun bu yerdagidan yaxshoreq joy yo'q. Ustozlarimiz biz bilan individual shug'ullanishadi.",
  },
];

const universities = [
  "WIUT",
  "INHA",
  "TTPU",
  "AMITY",
  "MDIST",
  "AKFA",
  "WEBSTER",
  "HARVARD",
  "STANFORD",
  "MIT",
];

const branches = {
  tashkent: {
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.912659295463!2d71.22956197613638!3d40.43293285465283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb01b0ac926783%3A0xa103cff84e3dbd4b!2sIstiqbol%20luck%20xususiy%20maktabi!5e0!3m2!1sru!2s!4v1768546214781!5m2!1sru!2s",
  },
};

// --- 2. YORDAMCHI KOMPONENTLAR ---

const SectionTitle = ({ subtitle, title, color = "#39B54A" }) => (
  <div className="mb-16 md:mb-24 text-left">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="w-10 h-[2px]" style={{ backgroundColor: color }}></div>
      <span
        className="font-black uppercase tracking-[0.4em] text-[10px] md:text-xs"
        style={{ color }}
      >
        {subtitle}
      </span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl lg:text-8xl font-black dark:text-white uppercase italic leading-[0.85] tracking-tighter"
    >
      {title}
    </motion.h2>
  </div>
);

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
      const suffix = value.replace(/[0-9]/g, "");
      animate(0, num, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(Math.floor(v) + suffix),
      });
    }
  }, [isInView, value]);
  return <span ref={ref}>{displayValue}</span>;
};

// --- SEAMLESS DRAGGABLE MARQUEE ---
const DraggableMarquee = ({ items, type = "text", reverse = false }) => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);

  const resumeAnimation = async () => {
    const currentX = x.get();
    const targetX = reverse ? 0 : -contentWidth;
    const distance = Math.abs(targetX - currentX);
    const duration = (distance / contentWidth) * 35;
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
    if (contentWidth > 0) resumeAnimation();
    return () => controls.stop();
  }, [contentWidth, reverse]);

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-4 cursor-grab active:cursor-grabbing">
      <motion.div
        ref={containerRef}
        drag="x"
        style={{ x }}
        dragConstraints={{ left: -contentWidth * 2, right: 0 }}
        animate={controls}
        onDragStart={() => controls.stop()}
        onDragEnd={() => resumeAnimation()}
        className="flex gap-16 items-center"
      >
        {[...items, ...items, ...items].map((item, i) =>
          type === "text" ? (
            <span
              key={i}
              className="text-3xl md:text-5xl font-black italic uppercase text-zinc-300 dark:text-zinc-800 hover:text-[#39B54A] transition-colors select-none"
            >
              {item}
            </span>
          ) : (
            <div
              key={i}
              className="w-[260px] md:w-[450px] h-[180px] md:h-[300px] shrink-0 overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white dark:border-zinc-900 select-none"
            >
              <img
                src={item}
                className="w-full h-full object-cover pointer-events-none"
                alt="Gallery"
              />
            </div>
          ),
        )}
      </motion.div>
    </div>
  );
};

// Video Card (Faqat Video)
const FeedbackVideoCard = ({ feedback }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="w-full sm:w-[350px] md:w-[400px] shrink-0 snap-center">
      <div
        className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl bg-black cursor-pointer group"
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying ? (
          <>
            <img
              src={feedback.thumbnail}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-all">
                <Play className="text-white fill-white ml-1" size={30} />
              </div>
            </div>
          </>
        ) : (
          <video
            src={feedback.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

// Message Card (Faqat Matn)
const StudentMessageCard = ({ feedback }) => (
  <div className="w-full sm:w-[350px] md:w-[400px] shrink-0 snap-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-zinc-50 dark:bg-[#0c0c0c] p-8 md:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 relative h-full flex flex-col shadow-sm"
    >
      <MessageSquare className="text-[#39B54A] mb-6 opacity-30" size={32} />
      <p className="text-zinc-600 dark:text-zinc-400 font-medium italic mb-10 leading-relaxed text-left">
        "{feedback.message}"
      </p>
      <div className="mt-auto flex items-center gap-4 border-t border-zinc-300 dark:border-zinc-800 pt-6 text-left">
        <div>
          <p className="font-black text-xl uppercase italic text-zinc-800 dark:text-white leading-none">
            {feedback.name}
          </p>
          <p className="text-[#39B54A] text-[10px] font-bold uppercase tracking-widest mt-2">
            {feedback.major}
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

// --- 3. ASOSIY HOME KOMPONENTI ---

export default function Home() {
  const consultRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", phone: "+998" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 17) return;
    setStatus("loading");
    const BOT_TOKEN = "7893849239:AAEalenahp_ar51YDUBYu5Fr6SazLgGu7dI";
    const CHAT_ID = "8389397224";
    const message = `🚀 ARIZA!\n👤 Ism: ${formData.name}\n📞 Tel: ${formData.phone}`;
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
      setStatus("success");
      setFormData({ name: "", phone: "+998" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#050505] transition-colors duration-500 font-sans overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.gazeta.uz/media/img/2022/09/HE29hc16640465414375_l.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-center gap-3 tracking-[0.3em] font-black text-[10px] md:text-xs uppercase opacity-70 text-white/80"
          >
            <span className="w-6 h-[2px] bg-[#39B54A]"></span> KELAJAK
            YETAKCHILARI AKADEMIYASI{" "}
            <span className="w-6 h-[2px] bg-[#39B54A]"></span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-[110px] font-black leading-none tracking-tighter uppercase italic"
          >
            <span className="text-[#E43E1C]">ISTIQBOL</span> <br />{" "}
            <span>LUCK</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl md:text-3xl font-black italic uppercase text-white/90 px-4"
          >
            Istiqbol Luck —{" "}
            <span className="text-[#39B54A]">kelajak yetakchilari</span> shu
            yerda kamol topadi.
          </motion.p>
          <div className="mt-12">
            <button
              onClick={() =>
                consultRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-12 py-5 bg-[#39B54A] text-white rounded-full font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/20"
            >
              Bog'lanish
            </button>
          </div>
        </div>
      </section>

      {/* 2. ADVANTAGES */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <SectionTitle
          subtitle="Nega biz?"
          title={
            <>
              Bizning <br />
              <span className="text-[#39B54A]">Afzalliklarimiz</span>
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {advantages.map((adv) => (
            <div
              key={adv.id}
              className="p-10 rounded-[3rem] bg-[#d9d4d4e6] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 relative text-left"
            >
              <span
                className="text-6xl font-black italic opacity-30"
                style={{ color: adv.color }}
              >
                {adv.id}
              </span>
              <h3 className="text-2xl font-black mt-8 mb-4 dark:text-white leading-tight italic uppercase">
                {adv.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. NATIJALAR (COMPACT) */}
      <section className="py-16 bg-zinc-50 dark:bg-[#080808] border-y dark:border-zinc-900 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase mb-12 italic">
            ISHONCH RAQAMLARDA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 justify-items-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-2">
                  {s.label}
                </h4>
                <div className="text-5xl md:text-6xl font-black text-[#2E3192] dark:text-white mb-2 tracking-tighter">
                  <Counter value={s.value} />
                </div>
                <div className="w-10 h-1 bg-[#E43E1C]"></div>
                <p className="text-[10px] text-zinc-500 italic mt-3 max-w-[180px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI (DRAGGABLE) */}
      <section className="py-24 md:py-40 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            subtitle="Atmosfera"
            title={
              <>
                Maktab <span className="text-[#39B54A]">Hayoti</span>
              </>
            }
          />
        </div>
        <DraggableMarquee
          type="image"
          items={[
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
          ]}
        />
        <div className="mt-4">
          <DraggableMarquee
            reverse
            type="image"
            items={[
              "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
              "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
            ]}
          />
        </div>
      </section>

      {/* 5. FEEDBACKS (OLD VERSION - SEPARATED) */}
      <section className="py-24 md:py-40 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionTitle
            subtitle="Samimiy fikrlar"
            title={
              <>
                O'quvchilar <span className="text-[#E43E1C]">Ovozi</span>
              </>
            }
            color="#E43E1C"
          />

          {/* Row 1: Videos (No half cards logic) */}
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 pb-16 px-4 cursor-grab active:cursor-grabbing justify-start md:justify-center">
            {studentFeedbacks.map((f) => (
              <FeedbackVideoCard key={f.id} feedback={f} />
            ))}
          </div>

          {/* Row 2: Message Texts */}
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 px-4 cursor-grab active:cursor-grabbing justify-start md:justify-center">
            {studentFeedbacks.map((f) => (
              <StudentMessageCard key={`msg-${f.id}`} feedback={f} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITIES */}
      <section className="py-0 md:py-0 border-y border-zinc-100 dark:border-zinc-900 bg-[#fbfcfc] dark:bg-[#080808] overflow-hidden text-center transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
          {/* Subtitle (Kichik sarlavha) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[2px] bg-[#2E3192] dark:bg-[#39B54A]"></div>
            <span className="font-black uppercase tracking-[0.4em] text-[10px] md:text-xs text-[#2E3192] dark:text-zinc-400">
              Katta Kelajak Sari
            </span>
            <div className="w-8 h-[2px] bg-[#2E3192] dark:bg-[#39B54A]"></div>
          </motion.div>

          {/* Main Title (Asosiy sarlavha) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl lg:text-8xl font-black dark:text-white uppercase italic leading-[0.85] tracking-tighter"
          >
            BITIRUVCHILARIMIZ <br className="hidden md:block" />
            <span className="text-[#39B54A]">QABUL QILINGAN</span>{" "}
            <span className="text-zinc-300 dark:text-zinc-800">OTMlar</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-8 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium italic text-sm md:text-base"
          >
            O'quvchilarimiz dunyoning eng nufuzli universitetlariga muddatidan
            oldin grant asosida qabul qilinmoqda.
          </motion.p>
        </div>

        {/* Marquee Konteyneri */}
        <div className="relative space-y-4 md:space-y-8">
          {/* 1-Qator: O'ngga harakat (Normal) */}
          <div className="relative group">
            <DraggableMarquee type="text" items={universities} />
            {/* Yon tomondan yumshoq yo'qolish effekti */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#fbfcfc] dark:from-[#080808] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#fbfcfc] dark:from-[#080808] to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* 2-Qator: Chapga harakat (Reverse) + Xiralashtirilgan (Depth effect) */}
          <div className="relative  opacity-100 transition-opacity duration-700 group">
            <DraggableMarquee type="text" items={universities} reverse={true} />
            {/* Yon tomondan yumshoq yo'qolish effekti */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#fbfcfc] dark:from-[#080808] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#fbfcfc] dark:from-[#080808] to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* 7. KONSULTATSIYA */}
      <section
        ref={consultRef}
        className="py-24 md:py-40 bg-white dark:bg-[#050505] px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 bg-[#d9d4d4e6] dark:bg-[#0c0c0c] p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden border dark:border-zinc-800 min-h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <CheckCircle2
                    size={100}
                    className="text-[#39B54A] mx-auto mb-6"
                  />
                  <h3 className="text-3xl font-black italic text-zinc-800 dark:text-white uppercase leading-none">
                    Rahmat! Arizangiz qabul qilindi.
                  </h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full grid gap-5">
                  <h2 className="text-4xl md:text-7xl font-black mb-10 dark:text-white uppercase leading-tight italic">
                    QO'SHILISH VAQTI{" "}
                    <span className="text-[#E43E1C]">KELDI.</span>
                  </h2>
                  <input
                    required
                    type="text"
                    placeholder="F.I.SH"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-6 bg-white dark:bg-black rounded-3xl outline-none border-2 border-transparent focus:border-[#39B54A] dark:text-white font-bold"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (!val.startsWith("+998")) val = "+998";
                      const digits = val.replace(/\D/g, "").substring(3, 12);
                      let formatted = "+998";
                      if (digits.length > 0)
                        formatted += " " + digits.substring(0, 2);
                      if (digits.length > 2)
                        formatted += " " + digits.substring(2, 5);
                      if (digits.length > 5)
                        formatted += " " + digits.substring(5, 7);
                      if (digits.length > 7)
                        formatted += " " + digits.substring(7, 9);
                      setFormData({ ...formData, phone: formatted });
                    }}
                    className="w-full p-6 bg-white dark:bg-black rounded-3xl outline-none border-2 border-transparent focus:border-[#39B54A] dark:text-white font-bold tracking-widest"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-fit px-12 py-5 bg-[#39B54A] text-white rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    {status === "loading"
                      ? "Yuborilmoqda..."
                      : "Ariza topshirish"}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
          <div className="w-full lg:w-1/2 h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white dark:border-zinc-900">
            <iframe
              title="Map"
              src={branches.tashkent.map}
              className="w-full h-full grayscale-0 dark:invert dark:opacity-70"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`,
        }}
      />
    </div>
  );
}
