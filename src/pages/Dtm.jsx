import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Search,
  School,
  Target,
  Award,
  Hash,
  Calendar,
  History,
  Download,
  TrendingUp,
  Zap,
  Brain,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// 1. DEFAULT NAMUNAVIY MA'LUMOT (189 BALL)
const DEFAULT_STUDENT = {
  name: "Solijonov Dostonbek",
  class: "11-sinf",
  direction: "Aniq",
  rank: "Top 1",
  percentile: 99.9,
  history: [
    {
      date: "31.10.2025",
      cert: 4,
      totalBall: 189.0,
      grantChance: 100,
      stats: [
        { name: "Ona tili", score: 10, max: 10, color: "#39B54A" },
        { name: "Matematika", score: 10, max: 10, color: "#39B54A" },
        { name: "Tarix", score: 10, max: 10, color: "#39B54A" },
        { name: "1-Blok", score: 30, max: 30, color: "#2563eb" },
        { name: "2-Blok", score: 30, max: 30, color: "#2563eb" },
      ],
    },
  ],
};

export default function DtmPremium() {
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("0000"); // Boshlang'ich ID
  const [testIndex, setTestIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({ 7015: DEFAULT_STUDENT });
  const reportRef = useRef(null);

  // GOOGLE SHEETS SETTINGS
  const SHEET_ID = "1maHii6PdtN3aHvDOS3jMvTbQX11_bnEWOWfjyIVfyGU";
  const SHEET_NAME = "dtms";

  // ... (kodning boshlanishi bir xil)

  useEffect(() => {
    const fetchSheetsData = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const formatted = {};

        // Raqamlarni 1 ta xonagacha yaxlitlash uchun yordamchi funksiya
        const roundNum = (num) => Math.round(parseFloat(num || 0) * 10) / 10;

        rows.forEach((row) => {
          const c = row.c;
          const id = c[2]?.v ? String(c[2].v) : null;
          if (!id) return;

          if (!formatted[id]) {
            formatted[id] = {
              name: c[1]?.v || "Noma'lum",
              class: c[4]?.v || "N/A",
              direction: c[3]?.v || "Noma'lum",
              rank: "Top 5%",
              percentile: 92,
              history: [],
            };
          }

          formatted[id].history.push({
            date: c[0]?.f || c[0]?.v || "Noma'lum",
            cert: c[16]?.v || 0,
            // JAMI BALLNI YAXLITLASH
            totalBall: roundNum(c[10]?.v),
            grantChance: Math.round((c[10]?.v / 189) * 100),
            stats: [
              {
                name: "Ona tili",
                score: roundNum(c[11]?.v), // FAN BALLARINI YAXLITLASH
                max: 10,
                color: "#39B54A",
              },
              {
                name: "Matematika",
                score: roundNum(c[12]?.v),
                max: 10,
                color: "#39B54A",
              },
              {
                name: "Tarix",
                score: roundNum(c[13]?.v),
                max: 10,
                color: "#39B54A",
              },
              {
                name: "1-Blok",
                score: roundNum(c[14]?.v),
                max: 30,
                color: "#2563eb",
              },
              {
                name: "2-Blok",
                score: roundNum(c[15]?.v),
                max: 30,
                color: "#2563eb",
              },
            ],
          });
        });

        setStudentsData((prev) => ({ ...prev, ...formatted }));
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchSheetsData();
  }, []);

  // ... (JSX qismi va StatCard lar o'sha holaticha qoladi)

  const student = useMemo(
    () => studentsData[currentId] || DEFAULT_STUDENT,
    [studentsData, currentId],
  );
  const currentTest = useMemo(
    () => student?.history[testIndex] || student?.history[0],
    [student, testIndex],
  );

  // IJOBIY AI TAHLIL
  const aiAnalysis = useMemo(() => {
    if (!currentTest) return null;
    const sortedStats = [...currentTest.stats].sort(
      (a, b) => b.score / b.max - a.score / a.max,
    );
    const bestSub = sortedStats[0];
    const total = currentTest.totalBall;

    let feedback = "";
    if (total >= 170)
      feedback =
        "Siz mutloq rekordchisiz! Bilimingiz darajasi maksimal cho'qqida. Siz bilan faxrlanamiz!";
    else if (total >= 120)
      feedback =
        "Ajoyib natija! Grant uchun imkoniyatingiz juda yuqori. Shu ruxda davom eting!";
    else
      feedback =
        "Sizda ulkan salohiyat bor. Har bir test sizni orzungizga yaqinlashtirmoqda. Olga!";

    return { bestSub, feedback };
  }, [currentTest]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (studentsData[searchId]) {
      setCurrentId(searchId);
      setTestIndex(0);
    } else {
      alert("ID topilmadi! (Masalan: 7015, 1362)");
    }
  };

  // PDF YUKLASH FUNKSIYASI
  const downloadPDF = async () => {
    if (!reportRef.current) return;

    setIsDownloading(true);

    try {
      // 1. html2canvas orqali dashboardni rasmga aylantiramiz
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Sifatni oshirish
        useCORS: true, // Tashqi rasmlar bo'lsa ruxsat berish
        logging: false, // Konsolda ortiqcha yozuvlarni o'chirish
        backgroundColor: "#f0f2f5", // PDF orqa foni (sayt rangi bilan bir xil)
        windowWidth: reportRef.current.scrollWidth,
        windowHeight: reportRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. PDF yaratamiz (A4 o'lchamida)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Rasmni A4 o'lchamiga moslashtirish
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      // Rasmni PDF-ga markazlashtirib joylash
      const xMargin = (pdfWidth - finalWidth) / 2;

      pdf.addImage(imgData, "PNG", xMargin, 0, finalWidth, finalHeight);

      // 3. Faylni yuklab olish
      pdf.save(`DTM_Natija_${student.name.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF yuklashda xatolik:", error);
      alert(
        "PDF yaratishda xatolik yuz berdi. Iltimos, qaytadan urunib ko'ring.",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#080808] pt-24 sm:pt-24 px-3 sm:px-6 max-w-7xl mx-auto pb-20 font-sans dark:text-white transition-all">
      {/* HEADER & SEARCH */}
      <div
        className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6"
        data-html2canvas-ignore="true"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl shadow-xl border border-[#39B54A]/40">
            <Zap className="text-[#39B54A] w-8 h-8" fill="#39B54A" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic">
              DTM <span className="text-slate-400">CORE</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-2">
              DTM natijalari endi yanada oson. O‘quvchi ID raqamini kiriting va
              imtihon natijalarini darhol ko‘ring. Ota-onalar va o‘quvchilar
              uchun qulay yechim.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative w-full lg:w-96 shadow-2xl rounded-3xl overflow-hidden border border-white dark:border-zinc-800"
        >
          <input
            type="text"
            placeholder="Abituriyent ID..."
            className="w-full py-5 px-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border-none outline-none font-bold text-lg"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#39B54A] text-black rounded-2xl hover:scale-105 transition-transform"
          >
            <Search size={22} />
          </button>
        </form>
      </div>

      <div ref={reportRef} className="p-2 space-y-6">
        {/* 2. STAT CARDS */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatCard
            className="p-2"
            icon={<TrendingUp className="text-blue-500" />}
            label="Reyting"
            value={student.rank}
            sub="Bazadagi o'rni"
            color="blue"
          />
          <StatCard
            icon={<Zap className="text-yellow-500" />}
            label="Percentile"
            value={`${student.percentile}%`}
            sub="O'sish darajasi"
            color="yellow"
          />
          <StatCard
            icon={<Brain className="text-purple-500" />}
            label="Progress"
            value="Ijobiy"
            sub="Tahlil natijasi"
            color="purple"
          />
          <StatCard
            icon={<CheckCircle2 className="text-[#39B54A]" />}
            label="Grant"
            value={`${currentTest.grantChance}%`}
            sub="Ehtimollik darajasi"
            color="green"
          />
        </div>

        {/* 3. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl border border-white dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black italic flex items-center gap-2 uppercase">
                    <Calendar className="text-[#39B54A]" /> {currentTest.date}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Imtihon natijalari
                  </p>
                </div>
                <div className="text-left sm:text-right bg-[#39B54A]/10 p-5 rounded-[2rem] border border-[#39B54A]/20">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Jami Ball
                  </p>
                  <p className="text-5xl sm:text-6xl font-black text-black dark:text-[#39B54A] leading-none">
                    {currentTest.totalBall}
                  </p>
                </div>
              </div>

              <div className="h-[300px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentTest.stats}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#64748b"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
                    />
                    <YAxis hide domain={[0, 32]} />
                    <Tooltip
                      cursor={{ fill: "rgba(57, 181, 74, 0.05)" }}
                      contentStyle={{
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: "#000",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="score" radius={[12, 12, 4, 4]} barSize={50}>
                      {currentTest.stats.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
                {currentTest.stats.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-3xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40"
                  >
                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1 tracking-widest">
                      {item.name}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-black dark:text-white">
                        {item.score}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 mb-1">
                        /{item.max}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* PROFILE CARD */}
            <div className="bg-[#0f172a] dark:bg-zinc-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-[#39B54A]/20 transition-transform hover:scale-[1.01]">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-[#39B54A] rounded-2xl shadow-lg shadow-[#39B54A]/30">
                    <Hash size={24} color="black" />
                  </div>
                  <p className="text-2xl font-black opacity-40 italic">
                    #ID{currentId}
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase italic leading-[1.1] mb-2 break-words line-clamp-2">
                  {student.name}
                </h2>
                <div className="inline-block px-4 py-1 bg-[#39B54A]/20 border border-[#39B54A]/30 rounded-full mb-8">
                  <p className="text-[#39B54A] font-black text-[10px] uppercase tracking-widest">
                    {student.direction}
                  </p>
                </div>
                <div className="space-y-4 border-t border-white/10 pt-8">
                  <InfoRow icon={<School size={20} />} text={student.class} />
                  <InfoRow
                    icon={<Award size={20} />}
                    text={currentTest.cert + " ta sertifikat"}
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/5 pointer-events-none italic">
                DTM
              </div>
            </div>

            {/* AI ANALYSIS CARD */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl border border-white dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                  <Brain size={24} />
                </div>
                <h4 className="text-xl font-black italic uppercase dark:text-white">
                  AI Tavsiya
                </h4>
              </div>
              <div className="space-y-5">
                <p className="text-sm text-slate-600 dark:text-zinc-400 font-medium leading-relaxed italic">
                  "{aiAnalysis?.feedback}"
                </p>
                <div className="p-5 bg-blue-500/5 rounded-3xl border border-blue-500/10">
                  <p className="text-[10px] font-black uppercase text-blue-500 mb-1 tracking-widest">
                    Kuchli tomoningiz:
                  </p>
                  <p className="text-base font-black dark:text-white leading-tight">
                    {aiAnalysis?.bestSub.name} ({aiAnalysis?.bestSub.score}{" "}
                    ball)
                  </p>
                </div>
                <button
                  onClick={downloadPDF}
                  disabled={isDownloading}
                  className="w-full py-5 bg-black dark:bg-[#39B54A] text-white dark:text-black rounded-3xl font-black flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#39B54A]/20"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Download size={20} /> PDF YUKLASH
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HISTORY FOOTER */}
      {student.history.length > 1 && (
        <div
          className="mt-8 p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-zinc-800"
          data-html2canvas-ignore="true"
        >
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 font-mono">
            <History size={16} /> Imtihonlar tarixi
          </p>
          <div className="flex flex-wrap gap-4">
            {student.history.map((t, i) => (
              <button
                key={i}
                onClick={() => setTestIndex(i)}
                className={`px-8 py-4 rounded-2xl font-black transition-all border-2 ${
                  testIndex === i
                    ? "bg-[#39B54A] border-[#39B54A] text-black shadow-lg shadow-[#39B54A]/40"
                    : "bg-white dark:bg-zinc-800 border-transparent text-slate-400"
                }`}
              >
                {t.date}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// PREMIUM COMPONENTS
function StatCard({ icon, label, value, sub, color }) {
  const themes = {
    blue: "border-blue-500/20 bg-blue-500/5",
    yellow: "border-yellow-500/20 bg-yellow-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
    green: "border-[#39B54A]/20 bg-[#39B54A]/5",
  };

  return (
    <div
      className={`bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] shadow-2xl border-2 ${themes[color]} flex items-center gap-5 transition-transform hover:scale-105`}
    >
      <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-inner border border-slate-100 dark:border-zinc-700">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1 truncate">
          {value}
        </p>
        <p className="text-[9px] font-bold text-slate-400 italic">{sub}</p>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/10 dark:bg-zinc-800 rounded-2xl border border-white/5">
        {icon}
      </div>
      <span className="font-black text-lg tracking-tight text-slate-200">
        {text}
      </span>
    </div>
  );
}
