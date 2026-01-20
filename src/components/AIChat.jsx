import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

/* 🔒 STATIC KNOWLEDGE BASE */
const KNOWLEDGE_BASE = [
  {
    keywords: [
      "salom",
      "assalom",
      "hello",
      "hi",
      "salomlar",
      "assalomu",
      "helo",
      "hallo",
    ],
    reply:
      "Assalomu alaykum! Istiqbol Luck o'quv markazining virtual yordamchisiman. Sizga kurslar, narxlar, manzil yoki boshqa ma’lumotlar bo‘yicha yordam bera olaman. Siz nimani bilmoqchisiz?",
  },
  {
    keywords: [
      "manzil",
      "joylashuv",
      "qayerda",
      "lokatsiya",
      "adres",
      "yer",
      "location",
      "joy",
    ],
    reply:
      "Bizning o'quv markazimiz Farg'ona viloyati, Rishton tumanida joylashgan. Xaritani saytimizning pastki qismida ko'rishingiz mumkin.",
  },
  {
    keywords: [
      "tel",
      "nomer",
      "telefon",
      "bog'lanish",
      "aloqa",
      "raqam",
      "call",
      "contact",
    ],
    reply: "Biz bilan bog'lanish uchun telefon raqamimiz: +998 90 123 45 67.",
  },
  {
    keywords: ["kurs", "fanlar", "nima o'tiladi", "oqish", "ta’lim", "darslar"],
    reply:
      "Bizda Matematika, Fizika, Ona tili, Tarix va xorijiy tillar bo‘yicha kurslar mavjud.",
  },
  {
    keywords: ["narx", "qancha", "tolov", "pul", "price"],
    reply:
      "Kurslar narxi yo‘nalishga bog‘liq. Aniq ma’lumot uchun biz bilan bog‘laning.",
  },
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Salom! Men Istiqbol Luck AI. Sizga qanday yordam bera olaman?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const timeoutRef = useRef(null);

  /* 🔒 AUTO SCROLL — FAQAT ZARUR PAYTDA */
  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages.length, isOpen]);

  /* 🔒 CLEANUP — TIMEOUT */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /* 🔒 OPTIMIZED SEARCH */
  const getAIResponse = useCallback((userInput) => {
    const text = userInput.toLowerCase();

    const found = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((key) => text.includes(key)),
    );

    return (
      found?.reply ||
      "Kechirasiz, bu savol bo‘yicha ma’lumot topilmadi. Iltimos, ma'muriyat bilan bog‘laning."
    );
  }, []);

  /* 🔒 SEND MESSAGE */
  const sendMessage = useCallback(() => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    timeoutRef.current = setTimeout(() => {
      const aiReply = getAIResponse(userText);
      setMessages((prev) => [...prev, { role: "ai", text: aiReply }]);
      setLoading(false);
    }, 800);
  }, [input, loading, getAIResponse]);

  const toggleChat = useCallback(() => {
    setIsOpen((p) => !p);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-zinc-900 shadow-2xl rounded-[2rem]
              w-[calc(100vw-2rem)] sm:w-[350px]
              h-[450px] sm:h-[500px] max-h-[70vh] sm:max-h-[80vh]
              flex flex-col border border-zinc-100 dark:border-zinc-800 mb-4 overflow-hidden"
          >
            {/* HEADER */}
            <div className="p-4 bg-zinc-900 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#39B54A] rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <span className="font-bold text-sm block">
                    Luck Assistant
                  </span>
                  <span className="text-[10px] text-green-400">Online</span>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="hover:bg-white/10 p-1.5 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* CHAT */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-[13px] max-w-[85%] shadow-sm ${
                      m.role === "user"
                        ? "bg-[#2E3192] text-white rounded-br-none"
                        : "bg-white dark:bg-zinc-800 dark:text-white rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-[10px] text-zinc-400 italic">
                  Luck AI yozmoqda...
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t dark:border-zinc-800 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Savol yo'llang..."
                className="flex-1 text-sm bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-[#39B54A] disabled:opacity-50 text-white p-3 rounded-2xl"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-14 h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-2xl flex items-center justify-center"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </motion.button>
    </div>
  );
}
