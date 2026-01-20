import React, { useState, useEffect, memo } from "react";
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

// CSS-based BarChart - Recharts o'rniga (90% tezroq)
const SimpleBarChart = memo(({ data }) => {
  // Hamma testlar 30 ball maksimum bilan ko'rsatiladi
  const maxScore = 30;

  return (
    <div className="w-full h-full flex items-end justify-around gap-1 px-2">
      {data.map((item, idx) => {
        const percentage = (item.score / maxScore) * 100;
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

  useEffect(() => {
    let active = true;
    const fetchSheetsData = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/1maHii6PdtN3aHvDOS3jMvTbQX11_bnEWOWfjyIVfyGU/gviz/tq?tqx=out:json&sheet=dtms`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const formatted = { "0000": DEFAULT_STUDENT };
        json.table.rows.forEach((row) => {
          const c = row.c;
          const id = c[2]?.v ? String(c[2].v) : null;
          if (!id) return;
          if (!formatted[id]) {
            formatted[id] = {
              name: c[1]?.v || "Noma'lum",
              class: c[4]?.v || "N/A",
              direction: c[3]?.v || "N/A",
              rank: "Top 5%",
              percentile: 92,
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

  const handleSearch = () => {
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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] transition-all duration-500 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto w-full px-4 lg:px-8 pt-24 pb-10 flex flex-col gap-6">
        {/* HEADER / SEARCH */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 shrink-0">
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
              DTM natijalarini ko'rish endi juda oson. O'quvchi ID raqamini
              kiriting va imtihon natijasini bir zumda bilib oling.
              <span className="text-[#39B54A]/80 ml-1">
                Ota-onalar va o'quvchilar uchun qulay xizmat.
              </span>
            </p>
          </div>
          <div className="relative w-full lg:w-[350px]">
            <input
              type="text"
              placeholder="ID raqam..."
              className="w-full py-3 px-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl outline-none font-bold dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-[#39B54A]/50 transition-all"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#39B54A] text-black rounded-xl hover:scale-105 transition-all"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          {/* PROFILE CARD - MOBILE: 1, DESKTOP: RIGHT */}
          <div className="order-1 lg:order-3 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-[#39B54A]/20">
              <h2 className="text-2xl lg:text-3xl font-black uppercase italic leading-none mb-6 break-words">
                {student.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                  <School className="text-[#39B54A]" size={18} />{" "}
                  {student.class}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                  <Target className="text-[#39B54A]" size={18} />{" "}
                  {student.direction}
                </div>
              </div>
            </div>

            {/* AI PROGRESS - Mobile'da diagrammadan keyin, Desktopda Profil ostida */}
            <div className="hidden lg:flex flex-1 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-xl border border-white dark:border-zinc-800 flex-col">
              <div className="flex items-center gap-3 mb-6 shrink-0">
                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                  <Brain size={24} />
                </div>
                <h4 className="text-lg font-black italic uppercase dark:text-white leading-none">
                  AI Progress
                </h4>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border dark:border-zinc-700 mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Dinamika
                  </p>
                  <div className="flex items-center text-[#39B54A] font-black text-lg">
                    <ArrowUpRight size={20} /> +2.4
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium italic border-l-4 border-[#39B54A] pl-4 leading-relaxed line-clamp-4">
                  "Natijangizda barqaror o'sish bor. Matematika blokidagi
                  xatolarni kamaytirish tavsiya etiladi."
                </p>
              </div>
            </div>
          </div>

          {/* LEFT STATS - ORDER 2 */}
          <div className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-2 lg:flex lg:flex-col gap-3">
            <StatCard
              icon={<TrendingUp size={20} />}
              label="Reyting"
              value={student.rank}
              color="blue"
            />
            <StatCard
              icon={<Zap size={20} />}
              label="Percentile"
              value={student.percentile + "%"}
              color="yellow"
            />
            <StatCard
              icon={<Award size={20} />}
              label="Sertifikat"
              value={currentTest.cert}
              color="purple"
            />
            <StatCard
              icon={<CheckCircle2 size={20} />}
              label="Grant"
              value={currentTest.grantChance + "%"}
              color="green"
            />
            <div className="col-span-2 lg:flex-1 bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-xl border-2 border-white dark:border-zinc-800 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                Jami Ball
              </p>
              <p className="text-5xl font-black text-[#39B54A] italic leading-none">
                {currentTest.totalBall}
              </p>
            </div>
          </div>

          {/* CENTER DIAGRAMMA - ORDER 3 */}
          <div className="order-3 lg:order-2 lg:col-span-6 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-white dark:border-zinc-800 flex flex-col min-h-[450px] overflow-hidden">
            <h3 className="text-lg font-black uppercase italic dark:text-white flex items-center gap-2 mb-8 shrink-0">
              <Calendar className="text-[#39B54A]" size={20} />{" "}
              {currentTest.date} natijasi
            </h3>
            <div className="flex-1 w-full relative min-h-0">
              <SimpleBarChart data={currentTest.stats} />
            </div>
          </div>

          {/* AI PROGRESS - MOBILE ONLY ORDER 4 */}
          <div className="order-4 lg:hidden bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] shadow-xl border border-white dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                <Brain size={20} />
              </div>
              <h4 className="text-lg font-black italic uppercase dark:text-white leading-none">
                AI Progress
              </h4>
            </div>
            <p className="text-sm italic text-zinc-500 border-l-4 border-[#39B54A] pl-4">
              "Matematika blokidagi natijangiz o'suvchi."
            </p>
          </div>
        </div>

        {/* HISTORY */}
        <div className="h-16 flex items-center gap-3 px-6 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 overflow-x-auto no-scrollbar shadow-sm">
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
  );
}

const StatCard = memo(({ icon, label, value, color }) => {
  const themes = {
    blue: "border-blue-500/20 text-blue-500 bg-blue-500/5",
    yellow: "border-yellow-500/20 text-yellow-500 bg-yellow-500/5",
    green: "border-[#39B54A]/20 text-[#39B54A] bg-[#39B54A]/5",
    purple: "border-purple-500/20 text-purple-500 bg-purple-500/5",
  };
  return (
    <div
      className={`p-4 rounded-2xl border-2 ${themes[color]} bg-white dark:bg-zinc-900 flex flex-col items-center justify-center text-center shadow-md transition-all shrink-0`}
    >
      <div className="mb-1">{icon}</div>
      <p className="text-[8px] font-black uppercase text-zinc-400 mb-1 leading-none">
        {label}
      </p>
      <p className="text-lg font-black dark:text-white leading-none italic">
        {value}
      </p>
    </div>
  );
});
