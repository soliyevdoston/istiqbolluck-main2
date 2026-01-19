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
  ArrowRight,
  Play,
  MapPin,
  CheckCircle,
  MessageSquare,
  Camera,
  Quote,
  Crown,
  ShieldCheck,
  Star,
  Loader2,
  MoreHorizontal,
} from "lucide-react";

// --- 1. DATA ---
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
    desc: "O‘z fikrini erkin ifodalash va jamoada ishlash ko‘nikmalari rivojlanadi.",
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
  {
    label: "O'qishga kirish",
    value: "98%",
    desc: "Muvaffaqiyatli bitiruvchilar.",
  },
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
      "Bu maktab menga nafaqat bilim, balki haqiqiy do'stlar va liderlik qobiliyatini berdi.",
  },
  {
    id: 2,
    name: "Asadbek Orifov",
    major: "Aniq fanlar",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
    message:
      "Mentorlar bilan ishlash tizimi juda yoqadi. Har bir savolimga istalgan vaqtda javob olaman.",
  },
  {
    id: 3,
    name: "Jasur Mirzayev",
    major: "Tabiiy fanlar",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
    message:
      "Xalqaro olimpiadalarga tayyorgarlik ko'rish uchun bu yerdagidan yaxshiroq joy yo'q.",
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

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  useEffect(() => {
    if (isInView) {
      const numericPart = value.replace(/[^0-9]/g, "");
      const suffix = value.replace(/[0-9]/g, "");
      const controls = animate(0, parseInt(numericPart, 10), {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.floor(latest) + suffix),
      });
      return () => controls.stop();
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
        className="flex gap-12 items-center"
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
              className="w-[280px] md:w-[450px] h-[200px] md:h-[300px] shrink-0 overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white dark:border-zinc-900"
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

// Video Card - Klik qilganda video pleyerga aylanadi
const ClickableVideoCard = ({ f }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="w-[100%] sm:w-[350px] md:w-[380px] flex-shrink-0 snap-center cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      <div className="relative h-[450px] rounded-[3.5rem] overflow-hidden bg-black shadow-2xl group border-4 border-white/5">
        {!isPlaying ? (
          <>
            <img
              src={f.thumbnail}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-all">
                <Play className="text-white fill-white" size={32} />
              </div>
            </div>
          </>
        ) : (
          <video
            src={f.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

// --- 3. ASOSIY HOME KOMPONENTI ---
export default function Home() {
  const consultRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", phone: "+998" });
  const [status, setStatus] = useState("idle");

  const scrollToConsult = () =>
    consultRef.current?.scrollIntoView({ behavior: "smooth" });

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) val = "+998";
    const digits = val.replace(/\D/g, "").substring(3, 12);
    let formatted = "+998";
    if (digits.length > 0) formatted += " " + digits.substring(0, 2);
    if (digits.length > 2) formatted += " " + digits.substring(2, 5);
    if (digits.length > 5) formatted += " " + digits.substring(5, 7);
    if (digits.length > 7) formatted += " " + digits.substring(7, 9);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length < 17) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", phone: "+998" });
    }, 1500);
  };

  return (
    <div className="w-full bg-white dark:bg-[#050505] transition-colors duration-500 font-sans overflow-x-hidden text-left">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.gazeta.uz/media/img/2022/09/HE29hc16640465414375_l.jpg"
            alt="School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/80"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-center gap-3 tracking-[0.3em] font-black text-[10px] md:text-xs"
          >
            <span className="w-6 h-[2px] bg-[#39B54A]"></span> KELAJAK
            YETAKCHILARI AKADEMIYASI{" "}
            <span className="w-6 h-[2px] bg-[#39B54A]"></span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[110px] font-black leading-none tracking-tighter uppercase italic"
          >
            <span className="text-[#E43E1C]">ISTIQBOL</span> <br />{" "}
            <span>LUCK</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-xl md:text-3xl font-black italic uppercase text-white/90"
          >
            Istiqbol Luck —{" "}
            <span className="text-[#39B54A]">kelajak yetakchilari</span> shu
            yerda kamol topadi.
          </motion.p>
          <div className="mt-12">
            <button
              onClick={scrollToConsult}
              className="px-12 py-5 bg-[#39B54A] text-white rounded-full font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Bog'lanish
            </button>
          </div>
        </div>
      </section>

      {/* 2. ADVANTAGES SECTION (Sarlavha qo'shilgan) */}
      <section className="w-full py-20 md:py-32 bg-white dark:bg-[#050505] px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
              Nega aynan biz?
            </h4>
            <h2 className="text-4xl md:text-6xl font-black dark:text-white uppercase leading-none tracking-tighter mb-6">
              Afzalliklarimiz
            </h2>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 font-medium text-lg italic border-l-2 border-[#E43E1C] pl-6 leading-relaxed">
              Har bir bolaning yashirin qobiliyatlarini yuzaga chiqaramiz va
              ularni zamonaviy dunyo yetakchilariga aylantiramiz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv) => (
              <div
                key={adv.id}
                className="p-10 rounded-[3rem] bg-[#dcdbdb] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 text-left"
              >
                <span
                  className="text-6xl font-black italic opacity-30"
                  style={{ color: adv.color }}
                >
                  {adv.id}
                </span>
                <h3 className="text-2xl font-black mt-8 mb-4 dark:text-white leading-tight">
                  {adv.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NATIJALAR (Kichraytirilgan) */}
      <section className="w-full py-12 bg-zinc-50 dark:bg-[#080808] border-y dark:border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase mb-12 italic">
            ISHONCH RAQAMLARDA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 justify-items-center text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-2 tracking-[0.2em]">
                  {s.label}
                </h4>
                <div className="text-5xl md:text-6xl font-black text-[#2E3192] dark:text-white mb-2 tracking-tighter">
                  <Counter value={s.value} />
                </div>
                <div className="w-10 h-1 bg-[#E43E1C]"></div>
                <p className="text-[10px] md:text-xs text-zinc-500 italic mt-3 max-w-[180px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI (Gallery) */}
      <section className="w-full py-20 md:py-32 bg-white dark:bg-[#050505]">
        <div className="w-full text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-20 dark:text-white italic uppercase tracking-tighter px-4">
            MAKTAB <span className="text-[#39B54A]">HAYOTI</span>
          </h2>
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
        </div>
      </section>

      {/* 5. O'QUVCHILAR OVOZI (Video Click-to-Play) */}
      <section className="py-24 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl md:text-7xl font-black dark:text-white uppercase italic tracking-tighter">
              O'QUVCHILAR OVOZI
            </h2>
          </div>

          {/* Videos */}
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 pb-16 px-4 cursor-grab active:cursor-grabbing justify-start md:justify-center">
            {studentFeedbacks.map((f) => (
              <ClickableVideoCard key={f.id} f={f} />
            ))}
          </div>

          {/* Messages */}
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 px-4 cursor-grab active:cursor-grabbing justify-start md:justify-center">
            {studentFeedbacks.map((f) => (
              <div
                key={`msg-${f.id}`}
                className="w-[100%] sm:w-[350px] md:w-[380px] flex-shrink-0 snap-center"
              >
                <div className="bg-[#f3f3f3] dark:bg-[#0c0c0c] p-10 rounded-[3.5rem] h-[380px] flex flex-col border dark:border-zinc-800 shadow-lg text-left">
                  <MessageSquare
                    className="text-[#39B54A] mb-8 opacity-30"
                    size={40}
                  />
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium italic mb-10 leading-relaxed text-sm md:text-base">
                    "{f.message}"
                  </p>
                  <div className="mt-auto pt-8 border-t dark:border-zinc-800">
                    <p className="font-black text-xl uppercase italic dark:text-white leading-none">
                      {f.name}
                    </p>
                    <p className="text-[#39B54A] text-[10px] font-bold uppercase tracking-widest mt-2">
                      {f.major}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITIES */}
      <section className="py-20 md:py-32 border-y dark:border-zinc-900 bg-white dark:bg-[#050505] overflow-hidden text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4"
        >
          {/* Subtitr: Yashil, kichik, keng tracking bilan */}
          <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
            Muvaffaqiyatli bitiruvchilar
          </h4>

          {/* Asosiy Sarlavha: Katta, qalin, responsiv o'lchamda */}
          <h2 className="text-3xl md:text-6xl font-black dark:text-white tracking-tighter italic uppercase mb-16 leading-tight">
            BITIRUVCHILARIMIZ QABUL QILINGAN <br className="hidden md:block" />
            <span className="text-[#2E3192] dark:text-[#39B54A]">
              NUFUZLI
            </span>{" "}
            OTMlar
          </h2>
        </motion.div>

        {/* Marquee qismi */}
        <DraggableMarquee items={universities} />
        <div className="mt-4 ">
          <DraggableMarquee items={universities} reverse={true} />
        </div>
      </section>

      {/* 7. KONSULTATSIYA */}
      <section
        ref={consultRef}
        className="py-24 bg-white dark:bg-[#050505] px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 bg-[#dcdbdb] dark:bg-[#0c0c0c] p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden border dark:border-zinc-800">
            <h2 className="text-4xl md:text-7xl font-black mb-10 dark:text-white uppercase leading-tight">
              QO'SHILISH VAQTI <span className="text-[#E43E1C]">KELDI.</span>
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-5">
              <input
                required
                type="text"
                placeholder="F.I.SH"
                className="w-full p-6 bg-white dark:bg-black rounded-2xl outline-none border-2 border-transparent focus:border-[#39B54A] dark:text-white font-bold"
              />
              <input
                required
                type="text"
                placeholder="Telefon raqam"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full p-6 bg-white dark:bg-black rounded-2xl outline-none border-2 border-transparent focus:border-[#39B54A] dark:text-white font-bold tracking-widest"
              />
              <button
                type="submit"
                className="w-fit px-12 py-5 bg-[#39B54A] text-white font-black rounded-2xl uppercase text-xs md:text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/10"
              >
                Ariza topshirish
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 h-[450px] md:h-[600px] rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white dark:border-zinc-800">
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
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
}
