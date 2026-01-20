import React, { useState, useMemo, useEffect, memo } from "react";
import {
  Search,
  School,
  Target,
  Award,
  Calendar,
  History,
  TrendingUp,
  Zap,
  Brain,
  CheckCircle2,
  ArrowUpRight,
  Hash,
  BookOpen,
  Lightbulb,
  Trophy,
} from "lucide-react";

const roundNum = (num) => Math.round(parseFloat(num || 0) * 10) / 10;

const DEFAULT_STUDENT = {
  name: "Solijonov Dostonbek",
  class: "11-sinf",
  direction: "Aniq fanlar",
  rank: "Top 1",
  percentile: 99.9,
  history: [
    {
      date: "31.10.2025",
      cert: 4,
      totalBall: 189.0,
      grantChance: 100,
      stats: [
        { name: "Ona tili", score: 10, max: 10, color: "#cbd5e1" },
        { name: "Matem (M)", score: 10, max: 10, color: "#cbd5e1" },
        { name: "Tarix", score: 10, max: 10, color: "#cbd5e1" },
        { name: "Matematika", score: 30, max: 30, color: "#39B54A" },
        { name: "Fizika", score: 30, max: 30, color: "#2563eb" },
      ],
    },
  ],
};

// Simple CSS-based chart (Recharts o'rniga - mobilda tezroq)
const SimpleBarChart = memo(({ data }) => {
  return (
    <div className="w-full h-full flex items-end justify-around gap-1 px-2">
      {data.map((item, idx) => {
        const percentage = (item.score / item.max) * 100;
        return (
          <div key={idx} className="flex flex-col items-center flex-1">
            <div
              className="text-[11px] font-black italic mb-2"
              style={{ color: item.color }}
            >
              {item.score}/{item.max}
            </div>
            <div
              className="w-full bg-gray-100 dark:bg-zinc-800 rounded-t-lg overflow-hidden relative"
              style={{ height: "300px" }}
            >
              <div
                className="w-full absolute bottom-0 rounded-t-lg"
                style={{
                  height: `${percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <div className="text-[11px] font-bold text-gray-600 dark:text-gray-400 mt-2 text-center">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default function DtmPremium() {
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("0000");
  const [testIndex, setTestIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({ "0000": DEFAULT_STUDENT });

  const SHEET_ID = "1maHii6PdtN3aHvDOS3jMvTbQX11_bnEWOWfjyIVfyGU";
  const SHEET_NAME = "dtms";

  useEffect(() => {
    let active = true;
    const fetchSheetsData = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const formatted = { "0000": DEFAULT_STUDENT };
        rows.forEach((row) => {
          const c = row.c;
          const id = c[2]?.v ? String(c[2].v) : null;
          if (!id) return;
          if (!formatted[id]) {
            formatted[id] = {
              name: c[1]?.v || "Noma'lum",
              class: c[4]?.v || "N/A",
              direction: c[3]?.v || "N/A",
              rank: "Top Natija",
              percentile: 94,
              history: [],
            };
          }
          formatted[id].history.push({
            date: c[0]?.f || c[0]?.v || "N/A",
            cert: c[16]?.v || 0,
            totalBall: roundNum(c[10]?.v),
            grantChance: Math.round((c[10]?.v / 189) * 100),
            stats: [
              {
                name: "Ona tili",
                score: roundNum(c[11]?.v),
                max: 10,
                color: "#cbd5e1",
              },
              {
                name: "Matem (M)",
                score: roundNum(c[12]?.v),
                max: 10,
                color: "#cbd5e1",
              },
              {
                name: "Tarix",
                score: roundNum(c[13]?.v),
                max: 10,
                color: "#cbd5e1",
              },
              {
                name: "Blok 1",
                score: roundNum(c[14]?.v),
                max: 30,
                color: "#39B54A",
              },
              {
                name: "Blok 2",
                score: roundNum(c[15]?.v),
                max: 30,
                color: "#2563eb",
              },
            ],
          });
        });

        if (active) {
          setStudentsData(formatted);
          setLoading(false);
        }
      } catch (error) {
        if (active) setLoading(false);
      }
    };
    fetchSheetsData();
    return () => {
      active = false;
    };
  }, []);

  const student = studentsData[currentId] || DEFAULT_STUDENT;
  const currentTest = student.history[testIndex] || student.history[0];

  // AI TAHLIL
  const aiAnalysis = useMemo(() => {
    if (!currentTest) return [];

    const analyses = [];
    const weakSubjects = currentTest.stats.filter((s) => s.score / s.max < 0.7);

    if (weakSubjects.length > 0) {
      analyses.push({
        icon: <BookOpen size={18} />,
        title: "Ustida Ishlash Kerak",
        text: `${weakSubjects.map((s) => s.name).join(", ")} fanlariga ko'proq e'tibor bering. Bu fanlar sizning umumiy ballingizni oshirishi mumkin.`,
        color: "text-orange-500",
      });
    }

    analyses.push({
      icon: <Lightbulb size={18} />,
      title: "Tavsiya",
      text: "Har kuni kamida 3 soat tayyorgarlik ko'ring. Test yechishdan oldin mavzularni takrorlang. O'z xatolaringizni tahlil qiling.",
      color: "text-indigo-500",
    });

    analyses.push({
      icon: <Brain size={18} />,
      title: "Strategiya",
      text: "Avval oson savollarni yeching, keyin qiyinroqlariga o'ting. Vaqtni to'g'ri taqsimlang va har bir savol uchun 2-3 daqiqa ajrating.",
      color: "text-purple-500",
    });

    return analyses;
  }, [currentTest]);

  const handleSearch = (e) => {
    e.preventDefault();
    const sid = searchId.trim();
    if (studentsData[sid]) {
      setCurrentId(sid);
      setTestIndex(0);
    } else alert("ID topilmadi!");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <style>{`@keyframes spin-y { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } } .animate-spin-y { animation: spin-y 2s linear infinite; }`}</style>
        <img src="/logo.svg" alt="Logo" className="w-20 h-20 animate-spin-y" />
      </div>
    );

  return (
    <div className="h-screen bg-[#f8fafc] dark:bg-[#050505] flex flex-col overflow-hidden font-sans">
      <div className="shrink-0 px-4 lg:px-8 pt-20 pb-4">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* HEADER / SEARCH */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-black p-2 rounded-xl border border-[#39B54A]/30 shadow-lg">
                <Zap className="text-[#39B54A]" size={24} />
              </div>
              <h1 className="text-xl md:text-3xl font-black italic uppercase dark:text-white tracking-tighter">
                DTM <span className="text-slate-400">CORE</span>
              </h1>
            </div>
            <div className="hidden md:block flex-1 max-w-[500px] text-center px-4">
              <p className="text-[11px] lg:text-[13px] font-bold leading-relaxed text-slate-500 dark:text-zinc-400 italic">
                DTM natijalarini ko'rish endi juda oson. ID raqamni kiriting va
                natijani bir zumda bilib oling.
              </p>
            </div>
            <div className="relative w-full lg:w-[350px]">
              <input
                type="text"
                placeholder="ID raqam..."
                className="w-full py-3 px-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl outline-none font-bold dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-[#39B54A]/50 transition-all"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              />
              <button
                onClick={handleSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#39B54A] text-black rounded-xl hover:scale-105 transition-all"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 lg:px-8 pb-4 overflow-auto">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-4 h-full">
          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
            {/* PROFILE CARD - MOBILE: 1, DESKTOP: RIGHT */}
            <div className="order-1 lg:order-3 lg:col-span-4 flex flex-col gap-3">
              <div className="bg-[#0f172a] p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-[#39B54A]/20 transition-transform hover:scale-[1.01]">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#39B54A] rounded-2xl shadow-lg shadow-[#39B54A]/30">
                    <Hash size={24} color="black" />
                  </div>
                  <p className="text-xl font-black opacity-30 italic">
                    #ID{currentId}
                  </p>
                </div>
                <h2 className="text-xl lg:text-2xl font-black uppercase italic leading-none mb-4 break-words">
                  {student.name}
                </h2>
                <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <School className="text-[#39B54A]" size={18} />{" "}
                    {student.class}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <Target className="text-[#39B54A]" size={18} />{" "}
                    {student.direction}
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 text-7xl font-black text-white/5 italic pointer-events-none uppercase">
                  DTM
                </div>
              </div>

              {/* AI ANALYSIS CARD */}
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-[2.5rem] shadow-xl border border-white dark:border-zinc-800 flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-3 mb-3 shrink-0">
                  <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                    <Brain size={24} />
                  </div>
                  <h4 className="text-xl font-black italic uppercase dark:text-white">
                    AI Tavsiya
                  </h4>
                </div>
                <div className="space-y-3 flex-1 min-h-0 overflow-auto">
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-800 p-3 rounded-2xl border dark:border-zinc-700 shrink-0">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Dinamika
                    </p>
                    <div className="flex items-center text-[#39B54A] font-black text-lg">
                      <ArrowUpRight size={20} /> +2.4
                    </div>
                  </div>

                  {aiAnalysis.map((analysis, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 pl-3"
                      style={{
                        borderColor: analysis.color.replace("text-", "#"),
                      }}
                    >
                      <div
                        className={`flex items-center gap-2 mb-2 ${analysis.color} font-black`}
                      >
                        {analysis.icon}
                        <h5 className="text-sm">{analysis.title}</h5>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium italic leading-relaxed">
                        {analysis.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STATS LEFT - ORDER 2 */}
            <div className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-2 lg:flex lg:flex-col gap-3">
              <StatCard
                icon={<TrendingUp size={20} />}
                label="Reyting"
                value={student.rank}
                sub="Bazadagi o'rni"
                color="blue"
              />
              <StatCard
                icon={<Zap size={20} />}
                label="Percentile"
                value={student.percentile + "%"}
                sub="O'sish darajasi"
                color="yellow"
              />
              <StatCard
                icon={<Award size={20} />}
                label="Sertifikat"
                value={currentTest.cert}
                sub="Hujjatlar soni"
                color="purple"
              />
              <StatCard
                icon={<CheckCircle2 size={20} />}
                label="Grant"
                value={currentTest.grantChance + "%"}
                sub="Ehtimollik"
                color="green"
              />

              <div className="col-span-2 lg:flex-1 bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-xl border-2 border-white dark:border-zinc-800 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">
                  Jami Ball
                </p>
                <p className="text-5xl font-black text-[#39B54A] italic leading-none">
                  {currentTest.totalBall}
                </p>
              </div>
            </div>

            {/* CENTER CHART - ORDER 3 */}
            <div className="order-3 lg:order-2 lg:col-span-6 bg-white dark:bg-zinc-900 p-5 md:p-6 rounded-[2.5rem] shadow-2xl border border-white dark:border-zinc-800 flex flex-col min-h-0">
              <h3 className="text-lg font-black uppercase italic dark:text-white flex items-center gap-2 mb-3 shrink-0">
                <Calendar className="text-[#39B54A]" size={20} />{" "}
                {currentTest.date}
              </h3>
              <div className="flex-1 w-full relative min-h-0">
                <SimpleBarChart data={currentTest.stats} />
              </div>
            </div>
          </div>

          {/* HISTORY */}
          <div className="h-12 flex items-center gap-3 px-4 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 overflow-x-auto shrink-0">
            <History size={16} className="text-slate-400 shrink-0" />
            <div className="flex gap-2">
              {student.history.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTestIndex(i)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all border whitespace-nowrap ${testIndex === i ? "bg-[#39B54A] text-black border-[#39B54A]" : "bg-white dark:bg-zinc-800 text-slate-400 border-zinc-100 dark:border-zinc-700"}`}
                >
                  {t.date}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = memo(({ icon, label, value, sub, color }) => {
  const themes = {
    blue: "border-blue-500/20 text-blue-500 bg-blue-500/5",
    yellow: "border-yellow-500/20 text-yellow-500 bg-yellow-500/5",
    green: "border-[#39B54A]/20 text-[#39B54A] bg-[#39B54A]/5",
    purple: "border-purple-500/20 text-purple-500 bg-purple-500/5",
  };
  return (
    <div
      className={`p-4 rounded-2xl border-2 ${themes[color]} bg-white dark:bg-zinc-900 flex flex-col items-center justify-center text-center shadow-md transition-all hover:scale-[1.02] shrink-0`}
    >
      <div className="mb-1">{icon}</div>
      <p className="text-[8px] font-black uppercase text-zinc-400 tracking-[0.1em] mb-1 leading-none">
        {label}
      </p>
      <p className="text-lg font-black dark:text-white leading-none italic">
        {value}
      </p>
      <p className="text-[8px] font-bold text-zinc-400 italic mt-1">{sub}</p>
    </div>
  );
});
