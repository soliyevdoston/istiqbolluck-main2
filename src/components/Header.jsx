import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, Instagram, Send, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "/logo.svg";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Biz haqimizda" },
    { to: "/dtm", label: "Dtm" },
    { to: "/life", label: "Maktab hayoti" },
    { to: "/team", label: "Jamoamiz" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] h-20 flex items-center justify-between px-6 md:px-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-zinc-900 transition-colors">
        {/* LOGO */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="font-black text-xl md:text-2xl flex gap-2 md:gap-[10px] items-center italic tracking-tighter shrink-0"
        >
          <img
            className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] object-contain"
            src={Logo}
            alt="Logo"
          />
          <div className="leading-none">
            <span className="text-[#E43E1C]">ISTIQBOL</span>{" "}
            <span className="text-[#2E3192] dark:text-white">LUCK</span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex gap-10 font-bold text-[11px] uppercase tracking-widest">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={scrollToTop}
              className={({ isActive }) => `
                relative pb-2 transition-colors hover:text-[#39B54A]
                ${isActive ? "text-[#39B54A]" : "text-gray-600 dark:text-gray-300"}
                group
              `}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#39B54A] transition-all duration-300 
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* DARK MODE TUGMASI - Har doim ko'rinib turadi */}
          <ThemeToggle />

          <a
            href="tel:+998901234567"
            className="font-black text-sm text-[#2E3192] dark:text-white hidden xl:block hover:text-[#E43E1C] transition-colors"
          >
            +998 90 123 45 67
          </a>

          <a
            href="tel:+998901234567"
            className="bg-[#39B54A] text-white p-2.5 md:p-3 rounded-full hover:scale-110 transition-transform flex items-center justify-center shadow-lg"
          >
            <Phone size={18} fill="currentColor" />
          </a>

          {/* BURGER BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-[400px] bg-white dark:bg-[#0a0a0a] z-[120] shadow-2xl lg:hidden p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-black italic text-zinc-400 uppercase tracking-widest text-xs">
                  Menu
                </span>
                <div className="flex items-center gap-4">
                  {/* Mobil menyu ichida qo'shimcha qulaylik uchun ThemeToggle */}
                  <ThemeToggle />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={scrollToTop}
                    className={({ isActive }) => `
                      text-3xl font-black italic uppercase tracking-tighter transition-all
                      ${isActive ? "text-[#39B54A] translate-x-4" : "text-zinc-800 dark:text-white hover:text-[#39B54A] hover:translate-x-2"}
                    `}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Bottom Mobile Info */}
              <div className="mt-auto space-y-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Bog'lanish
                  </p>
                  <a
                    href="tel:+998901234567"
                    className="text-xl font-black block dark:text-white"
                  >
                    +998 90 123 45 67
                  </a>
                  <p className="text-sm text-zinc-500 font-medium italic">
                    info@istiqbol.uz
                  </p>
                </div>

                <div className="flex gap-4">
                  {[Instagram, Send, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-[#39B54A] hover:text-white transition-all dark:text-white"
                    >
                      <Icon size={20} />
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
