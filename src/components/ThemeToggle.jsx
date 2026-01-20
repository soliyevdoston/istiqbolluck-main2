import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Faqat browserda ishlashi uchun
  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemDark);

    setIsDark(shouldBeDark);
  }, []);

  // DOM bilan ishlash faqat shu joyda
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  if (!mounted) return null; // hydration crash oldini oladi

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark((prev) => !prev)}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-zinc-600 dark:text-yellow-400 border border-transparent dark:border-zinc-700 transition-all shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}
