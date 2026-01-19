import { Link, NavLink } from "react-router-dom";
import {
  Instagram,
  Send,
  Youtube,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import Logo from "/logo.svg";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { to: "/", label: "Biz haqimizda" },
    { to: "/dtm", label: "Dtm" },
    { to: "/life", label: "Maktab hayoti" },
    { to: "/team", label: "Jamoamiz" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      {/* --- FON RANGI --- */}
      <div className="absolute inset-0 bg-[#e3dede] dark:bg-gradient-to-br dark:from-[#0B0F1A] dark:via-[#1E2235] dark:to-[#0B0F1A] z-0"></div>

      {/* Yuqori dekorativ chiziq */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E43E1C] via-[#39B54A] to-[#2E3192]"></div>

      {/* Dekorativ blur effektlar */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-[#39B54A]/10 blur-[80px] sm:blur-[120px] rounded-full"></div>
      <div className="absolute top-1/2 -left-24 w-48 h-48 sm:w-72 sm:h-72 bg-[#E43E1C]/10 blur-[80px] sm:blur-[100px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 sm:py-12 px-5 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {/* 1. Logo va Ta'rif */}
          <div className="flex flex-col items-center sm:items-start space-y-6 text-center sm:text-left">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-3 p-2 w-fit transition-transform hover:scale-105"
            >
              <img
                src={Logo}
                alt="Logo"
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-contain"
              />
              <div className="text-xl sm:text-2xl font-black italic flex gap-2 leading-none">
                <span className="text-[#E43E1C]">ISTIQBOL</span>
                <span className="text-[#2E3192] dark:text-white">LUCK</span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
              Biz faqat ta'lim bermaymiz, biz muvaffaqiyatli kelajak poydevorini
              quramiz. Istiqbolingiz - bizning luckimiz!
            </p>
          </div>

          {/* 2. Navigatsiya */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="font-bold text-[10px] sm:text-[11px] uppercase tracking-[3px] text-slate-500 dark:text-white/40 mb-6 sm:mb-8">
              Bo'limlar
            </h4>
            <nav className="flex flex-col gap-3 sm:gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={scrollToTop}
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-[#39B54A] dark:hover:text-[#39B54A] transition-all flex items-center justify-center sm:justify-start group"
                >
                  <span className="hidden sm:block w-0 group-hover:w-3 h-[2px] bg-[#39B54A] mr-0 group-hover:mr-2 transition-all"></span>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* 3. Aloqa */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="font-bold text-[10px] sm:text-[11px] uppercase tracking-[3px] text-slate-500 dark:text-white/40 mb-6 sm:mb-8">
              Aloqa markazi
            </h4>
            <div className="space-y-4 w-full">
              <a
                href="tel:+998901234567"
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 flex items-center justify-center text-[#39B54A] group-hover:bg-[#39B54A] group-hover:text-white transition-all shadow-sm">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-wide text-black dark:text-white">
                    +998 90 123 45 67
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">
                    Qo'ng'iroq qiling
                  </span>
                </div>
              </a>
              <a
                href="mailto:info@istiqbol.uz"
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 flex items-center justify-center text-[#E43E1C] group-hover:bg-[#E43E1C] group-hover:text-white transition-all shadow-sm">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-wide text-black dark:text-white">
                    info@istiqbol.uz
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">
                    Email yuboring
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* 4. Ijtimoiy tarmoqlar */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
            <h4 className="font-bold text-[10px] sm:text-[11px] uppercase tracking-[3px] text-slate-500 dark:text-white/40 mb-6 sm:mb-8">
              Ijtimoiy Hayot
            </h4>
            <div className="flex gap-4">
              {[
                {
                  icon: <Instagram size={20} />,
                  color: "hover:bg-[#E4405F]",
                  href: "#",
                },
                {
                  icon: <Send size={20} />,
                  color: "hover:bg-[#24A1DE]",
                  href: "#",
                },
                {
                  icon: <Youtube size={20} />,
                  color: "hover:bg-[#FF0000]",
                  href: "#",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 transition-all hover:-translate-y-2 hover:shadow-xl ${social.color} hover:text-white text-slate-700 dark:text-white`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-8 sm:mt-10 group inline-flex items-center gap-3 text-[9px] sm:text-[11px] font-black uppercase tracking-[2px] sm:tracking-[3px] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-2xl bg-[#39B54A] hover:opacity-90 transition-all shadow-lg shadow-[#39B54A]/20"
            >
              Yuqoriga qaytish
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Footer Pastki qismi */}
        <div className="mt-12 sm:mt-20 pt-8 border-t border-black/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-[2px] sm:tracking-[3px] font-bold text-center md:text-left">
            © 2026 <span className="text-[#E43E1C]">ISTIQBOL</span>
            <span className="text-black dark:text-white">LUCK</span>.
            <br className="sm:hidden" /> BARCHA HUQUQLAR HIMOYALANGAN.
          </p>

          <a
            href="https://soliyev.uz"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 transition-all hover:bg-white/40 dark:hover:bg-white/10"
          >
            <span className="text-[8px] sm:text-[9px] text-slate-600 dark:text-slate-300  tracking-[2px] font-medium">
              Developed by{" "}
              <span className="font-black text-black dark:text-white">
                soliyev.uz
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
