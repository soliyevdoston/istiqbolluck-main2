import { Link, NavLink } from "react-router-dom";
import {
  Instagram,
  Send,
  Youtube,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { useCallback } from "react";
import Logo from "/logo.svg";

export default function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navLinks = [
    { to: "/", label: "Biz haqimizda", end: true },
    { to: "/dtm", label: "Dtm" },
    { to: "/life", label: "Maktab hayoti" },
    { to: "/team", label: "Jamoamiz" },
    { to: "/blog", label: "Blog" },
  ];

  const socials = [
    {
      icon: <Instagram size={20} />,
      color: "hover:bg-[#E4405F]",
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Send size={20} />,
      color: "hover:bg-[#24A1DE]",
      href: "https://t.me",
      label: "Telegram",
    },
    {
      icon: <Youtube size={20} />,
      color: "hover:bg-[#FF0000]",
      href: "https://youtube.com",
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      <div className="absolute inset-0 bg-[#e3dede] dark:bg-gradient-to-br dark:from-[#0B0F1A] dark:via-[#1E2235] dark:to-[#0B0F1A] z-0" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E43E1C] via-[#39B54A] to-[#2E3192]" />

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-5 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {/* LOGO */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-3"
            >
              <img src={Logo} alt="Istiqbol Luck Logo" className="w-12 h-12" />
              <div className="text-xl font-black italic flex gap-2">
                <span className="text-[#E43E1C]">ISTIQBOL</span>
                <span className="text-[#2E3192] dark:text-white">LUCK</span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Biz faqat ta'lim bermaymiz, biz muvaffaqiyatli kelajak poydevorini
              quramiz.
            </p>
          </div>

          {/* NAV */}
          <nav className="flex flex-col items-center sm:items-start gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={scrollToTop}
                className="text-sm font-semibold hover:text-[#39B54A]"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CONTACT */}
          <div className="space-y-4 text-center sm:text-left">
            <a
              href="tel:+998901234567"
              className="flex items-center gap-3 justify-center sm:justify-start"
            >
              <Phone size={18} />
              <span className="font-bold">+998 90 123 45 67</span>
            </a>
            <a
              href="mailto:info@istiqbol.uz"
              className="flex items-center gap-3 justify-center sm:justify-start"
            >
              <Mail size={18} />
              <span className="font-bold">info@istiqbol.uz</span>
            </a>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="flex gap-4">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/30 transition-all ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 bg-[#39B54A] text-white px-6 py-3 rounded-xl"
            >
              Yuqoriga qaytish
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-[10px] text-slate-500">
          © 2026 ISTIQBOL LUCK. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}
