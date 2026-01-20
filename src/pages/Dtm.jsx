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
  LabelList,
} from "recharts";
import {
  Search,
  School,
  Target,
  Award,
  Hash,
  Calendar,
  History,
  TrendingUp,
  Zap,
  Brain,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { motion } from "framer-motion";

// 1. YORDAMCHI FUNKSIYALAR
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

export default function DtmPremium() {
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("0000");
  const [testIndex, setTestIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({ 1001: DEFAULT_STUDENT });
  const reportRef = useRef(null);

  const SHEET_ID = "1maHii6PdtN3aHvDOS3jMvTbQX11_bnEWOWfjyIVfyGU";
  const SHEET_NAME = "dtms";

  useEffect(() => {
    const fetchSheetsData = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;
        const formatted = {};

        rows.forEach((row) => {
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
        setStudentsData((prev) => ({ ...prev, ...formatted }));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchSheetsData();
  }, []);

  const student = useMemo(
    () => studentsData[currentId] || DEFAULT_STUDENT,
    [studentsData, currentId],
  );
  const currentTest = useMemo(
    () => student?.history[testIndex] || student?.history[0],
    [student, testIndex],
  );

  const aiProgress = useMemo(() => {
    if (!student || student.history.length < 2)
      return {
        feedback: "Sizning birinchi testingiz. Muvaffaqiyat tilaymiz!",
        diff: 0,
      };
    const now = currentTest;
    const prev = student.history[testIndex + 1];
    if (!prev)
      return { feedback: "Solishtirish uchun ma'lumot yetarli emas.", diff: 0 };
    const b1_diff = roundNum(now.stats[3].score - prev.stats[3].score);
    const b2_diff = roundNum(now.stats[4].score - prev.stats[4].score);
    return {
      feedback:
        b1_diff > 0 || b2_diff > 0
          ? "O'sish kuzatildi, ajoyib!"
          : "Natijangiz barqaror.",
      diff: roundNum(b1_diff + b2_diff),
    };
  }, [currentTest, student, testIndex]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (studentsData[searchId]) {
      setCurrentId(searchId);
      setTestIndex(0);
    } else alert("ID topilmadi!");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#050505] transition-colors duration-500">
        <img src="/logo.svg" alt="Logo" className="w-20 h-20 animate-spin-y" />
      </div>
    );

  return (
    <div className="min-h-screen lg:h-screen bg-[#f8fafc] dark:bg-[#050505] pt-20 pb-4 px-4 lg:px-8 font-sans flex flex-col transition-all lg:overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col gap-4 min-h-0">
        {/* SEARCH HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-xl border border-[#39B54A]/30 shadow-lg">
              <Zap className="text-[#39B54A]" size={24} />
            </div>
            <h1 className="text-xl md:text-3xl font-black italic uppercase dark:text-white tracking-tighter leading-none">
              DTM <span className="text-slate-400">CORE</span>
            </h1>
          </div>
          <form
            onSubmit={handleSearch}
            className="relative w-full lg:w-[350px]"
          >
            <input
              type="text"
              placeholder="ID raqam..."
              className="w-full py-3 px-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl outline-none font-bold text-md dark:text-white border border-zinc-200 dark:border-zinc-800"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#39B54A] text-black rounded-xl hover:scale-105 transition-all"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* DASHBOARD GRID */}
        <div
          ref={reportRef}
          className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0"
        >
          {/* LEFT: STATS */}
          <div className="lg:col-span-2 grid grid-cols-2 lg:flex lg:flex-col gap-3">
            <StatCardVertical
              icon={<TrendingUp size={22} />}
              label="Reyting"
              value={student.rank}
              color="blue"
            />
            <StatCardVertical
              icon={<Zap size={22} />}
              label="Percentile"
              value={student.percentile + "%"}
              color="yellow"
            />
            <StatCardVertical
              icon={<CheckCircle2 size={22} />}
              label="Grant"
              value={currentTest.grantChance + "%"}
              color="green"
            />
            <div className="col-span-1 lg:flex-1 bg-white dark:bg-zinc-900 p-4 rounded-[2rem] shadow-xl border-2 border-white dark:border-zinc-800 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">
                Jami Ball
              </p>
              <p className="text-5xl font-black text-[#39B54A] italic leading-none">
                {currentTest.totalBall}
              </p>
            </div>
          </div>

          {/* CENTER: DIAGRAMMA */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] shadow-2xl border border-white dark:border-zinc-800 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="text-lg font-black uppercase italic dark:text-white flex items-center gap-2 leading-none">
                <Calendar className="text-[#39B54A]" size={20} />{" "}
                {currentTest.date} natijasi
              </h3>
            </div>
            <div className="flex-1 min-h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart
                  data={currentTest.stats}
                  margin={{ top: 20, bottom: 0, left: -20, right: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888", fontSize: 11, fontWeight: "bold" }}
                  />
                  <YAxis hide domain={[0, 32]} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "15px", border: "none" }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={45}>
                    {currentTest.stats.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="score"
                      position="top"
                      content={(props) => {
                        const { x, y, width, value, index } = props;
                        const maxVal = currentTest.stats[index].max;
                        return (
                          <text
                            x={x + width / 2}
                            y={y - 10}
                            fill="#888"
                            fontSize={10}
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {value}/{maxVal}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4 shrink-0">
              {currentTest.stats.map((item, i) => (
                <div
                  key={i}
                  className="text-center p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40"
                >
                  <p className="text-[8px] font-black uppercase text-zinc-400 mb-1 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs font-black dark:text-white">
                    {item.score}/{item.max}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PROFILE & AI */}
          <div className="lg:col-span-4 flex flex-col gap-4 min-h-0">
            <div className="bg-[#0f172a] p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-[#39B54A]/20 shrink-0">
              <h2 className="text-2xl md:text-3xl font-black uppercase italic leading-none mb-6 break-words">
                {student.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-md font-bold text-slate-300">
                  <School className="text-[#39B54A]" size={18} />{" "}
                  {student.class}
                </div>
                <div className="flex items-center gap-2 text-md font-bold text-slate-300">
                  <Target className="text-[#39B54A]" size={18} />{" "}
                  {student.direction}
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] shadow-xl border border-white dark:border-zinc-800 flex flex-col min-h-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                  <Brain size={24} />
                </div>
                <h4 className="text-lg font-black italic uppercase dark:text-white leading-none">
                  AI Progress
                </h4>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-800 p-3 rounded-2xl border dark:border-zinc-700 mb-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    Dinamika (2 Blok)
                  </p>
                  {aiProgress.diff > 0 ? (
                    <div className="flex items-center text-[#39B54A] font-black text-lg">
                      <ArrowUpRight size={20} /> +{aiProgress.diff}
                    </div>
                  ) : aiProgress.diff < 0 ? (
                    <div className="flex items-center text-red-500 font-black text-lg">
                      <ArrowDownRight size={20} /> {aiProgress.diff}
                    </div>
                  ) : (
                    <Minus className="text-slate-400" />
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium italic border-l-4 border-[#39B54A] pl-4 leading-relaxed line-clamp-3">
                  "{aiProgress.feedback}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HISTORY Panorama */}
        <div className="shrink-0 h-14 flex items-center gap-3 px-6 bg-white dark:bg-zinc-900 rounded-xl border border-white dark:border-zinc-800 overflow-x-auto no-scrollbar">
          <History size={16} className="text-slate-400 shrink-0" />
          <div className="flex gap-2">
            {student.history.map((t, i) => (
              <button
                key={i}
                onClick={() => setTestIndex(i)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all border ${testIndex === i ? "bg-[#39B54A] text-black border-[#39B54A]" : "bg-white dark:bg-zinc-800 text-slate-400 border-transparent"}`}
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

function StatCardVertical({ icon, label, value, color }) {
  const themes = {
    blue: "border-blue-500/20 text-blue-500 bg-blue-500/5",
    yellow: "border-yellow-500/20 text-yellow-500 bg-yellow-500/5",
    green: "border-[#39B54A]/20 text-[#39B54A] bg-[#39B54A]/5",
  };
  return (
    <div
      className={`p-4 rounded-[1.5rem] border-2 ${themes[color]} bg-white dark:bg-zinc-900 flex flex-col lg:items-center justify-center lg:text-center shadow-md transition-all hover:translate-x-1 shrink-0`}
    >
      <div className="mb-1">{icon}</div>
      <p className="text-[8px] font-black uppercase text-zinc-400 tracking-[0.1em] mb-1 leading-none">
        {label}
      </p>
      <p className="text-lg lg:text-xl font-black dark:text-white leading-none italic">
        {value}
      </p>
    </div>
  );
}
