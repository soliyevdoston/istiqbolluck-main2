import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, Instagram, Send, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "/logo.svg";
import ThemeToggle from "./ThemeToggle";

/* 🔒 STATIC NAV LINKS (har renderda qayta yaratilmaydi) */
const NAV_LINKS = [
  { to: "/", label: "Biz haqimizda" },
  { to: "/dtm", label: "Dtm" },
  { to: "/life", label: "Maktab hayoti" },
  { to: "/team", label: "Jamoamiz" },
  { to: "/blog", label: "Blog" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  /* 🔒 Route change bo‘lsa menu yopiladi */
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /* 🔒 BODY SCROLL LOCK — XAVFSIZ (cleanup bilan) */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* 🔒 STABLE HANDLER */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-[100] h-16 md:h-20 flex items-center justify-between px-4 md:px-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-zinc-900 transition-all">
        {/* LOGO */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="flex gap-2 items-center italic tracking-tighter shrink-0"
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            src={Logo}
            alt="Logo"
          />
          <div className="font-black text-lg md:text-xl leading-none">
            <span className="text-[#E43E1C]">ISTIQBOL</span>{" "}
            <span className="text-[#2E3192] dark:text-white">LUCK</span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex gap-8 xl:gap-10 font-bold text-[10px] xl:text-[11px] uppercase tracking-widest">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={scrollToTop}
              className={({ isActive }) => `
                relative pb-1 transition-colors hover:text-[#39B54A]
                ${isActive ? "text-[#39B54A]" : "text-gray-600 dark:text-gray-300"}
                group
              `}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-[2px] bg-[#39B54A] transition-all duration-300 w-0 group-hover:w-full"></span>
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          <a
            href="tel:+998901234567"
            className="font-black text-sm text-[#2E3192] dark:text-white hidden xl:block hover:text-[#E43E1C] transition-colors"
          >
            +998 90 123 45 67
          </a>

          <a
            href="tel:+998901234567"
            className="bg-[#39B54A] text-white p-2 md:p-3 rounded-full hover:scale-105 transition-transform flex items-center justify-center shadow-md"
          >
            <Phone size={16} fill="currentColor" />
          </a>

          {/* BURGER BUTTON */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-zinc-900 dark:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[70%] max-w-[280px] bg-white dark:bg-[#0a0a0a] z-[120] shadow-2xl lg:hidden p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-black italic text-zinc-400 uppercase tracking-widest text-[10px]">
                  Menu
                </span>
                <button
                  onClick={closeMenu}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full dark:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 flex-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={scrollToTop}
                    className={({ isActive }) => `
                      text-lg font-bold italic uppercase tracking-tight transition-all py-2
                      ${
                        isActive
                          ? "text-[#39B54A] border-l-4 border-[#39B54A] pl-3"
                          : "text-zinc-800 dark:text-white"
                      }
                    `}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto space-y-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Aloqa
                  </p>
                  <a
                    href="tel:+998901234567"
                    className="text-sm font-black block dark:text-white"
                  >
                    +998 90 123 45 67
                  </a>
                </div>

                <div className="flex gap-3">
                  {[Instagram, Send, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-[#39B54A] hover:text-white transition-all dark:text-white"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
