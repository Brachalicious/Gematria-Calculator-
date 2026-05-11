import * as React from "react";
import { KABBALISTIC_MEANINGS } from "./KabbalisticInterpretation";
import { getNamesCache, type CachedNameResult } from "@/lib/nameCache";

// ---------- Types ----------
interface Message {
  role: "user" | "assistant";
  content: string;
}

type Lang = "en" | "he";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  /** Still accepted so GematriaCalculator doesn't need changes, but we also
   *  read from the module-level cache for reliability. */
  nameResultsProp: CachedNameResult[];
}

// ---------- Sefer Yetzirah letter classification ----------
const MOTHER_LETTERS = new Set(["א", "מ", "ש"]);
const DOUBLE_LETTERS = new Set(["ב", "ג", "ד", "כ", "פ", "ר", "ת"]);

// ---------- Inline gematria (standard method) ----------
const HEB: Record<string, number> = {
  א: 1,
  ב: 2,
  ג: 3,
  ד: 4,
  ה: 5,
  ו: 6,
  ז: 7,
  ח: 8,
  ט: 9,
  י: 10,
  כ: 20,
  ל: 30,
  מ: 40,
  נ: 50,
  ס: 60,
  ע: 70,
  פ: 80,
  צ: 90,
  ק: 100,
  ר: 200,
  ש: 300,
  ת: 400,
  ך: 20,
  ם: 40,
  ן: 50,
  ף: 80,
  ץ: 90,
};

function calcGematria(name: string): CachedNameResult["result"] {
  const letters: CachedNameResult["result"]["letters"] = [];
  let total = 0;
  for (const ch of name) {
    const v = HEB[ch];
    if (v !== undefined) {
      letters.push({ letter: ch, value: v });
      total += v;
    }
  }
  return { total, letters };
}

/** Read names directly from the calculator's DOM inputs — ultimate fallback. */
function readNamesFromDOM(): CachedNameResult[] {
  try {
    const inputs = document.querySelectorAll<HTMLInputElement>(
      'input[id^="name-"], input.gematria-input',
    );
    return Array.from(inputs)
      .map((el) => el.value.trim())
      .filter((name) => name !== "")
      .map((name) => ({ name, result: calcGematria(name) }));
  } catch {
    return [];
  }
}

// ---------- UI strings ----------
const UI = {
  en: {
    title: "MysticMinded³³ ✨",
    subtitle: "Gematria & Kabbalah Guide",
    analyzing: "Analyzing",
    placeholder: (name: string | null) =>
      name ? `Ask about ${name}...` : "Ask a question...",
    send: "✨ Ask",
    thinking: "✨ Consulting the mystic scrolls...",
    you: "You",
    bot: "MysticMind",
  },
  he: {
    title: "מיסטיק מיינד³³ ✨",
    subtitle: "מדריך גמטריה וקבלה",
    analyzing: "מנתח",
    placeholder: (name: string | null) =>
      name ? `שאל על ${name}...` : "שאל שאלה...",
    send: "✨ שאל",
    thinking: "✨ מתייעץ עם ספרי הקבלה...",
    you: "אתה",
    bot: "מיסטיק מיינד",
  },
};

// ---------- Response generators ----------
function buildEnglishResponse(results: CachedNameResult[]): string {
  const primary = results[0];
  const primaryName = primary.name;
  const gematria = primary.result.total;
  const letters = primary.result.letters.map((l) => l.letter);
  const uniqueLetters = [...new Set(letters)];

  const mothers = uniqueLetters.filter((l) => MOTHER_LETTERS.has(l));
  const doubles = uniqueLetters.filter((l) => DOUBLE_LETTERS.has(l));
  const simples = uniqueLetters.filter(
    (l) => !MOTHER_LETTERS.has(l) && !DOUBLE_LETTERS.has(l),
  );

  const qualities = uniqueLetters
    .map((l) => {
      const d = KABBALISTIC_MEANINGS[l as keyof typeof KABBALISTIC_MEANINGS];
      return `${l} — ${d ? d.meaning.split(",")[0].trim() : "divine spark"}`;
    })
    .join("\n   • ");

  const paths = uniqueLetters
    .map((l) => {
      const d = KABBALISTIC_MEANINGS[l as keyof typeof KABBALISTIC_MEANINGS];
      return d?.sefirah ? `${l}: ${d.sefirah}` : "";
    })
    .filter(Boolean)
    .join("\n   • ");

  const sefirahLink =
    gematria % 10 === 4
      ? "Gevurah (strength and judgment)"
      : gematria % 10 === 0
        ? "Malchut (kingdom and manifestation)"
        : "Tiferet (beauty and harmony)";

  const allNames = results.map((r) => r.name).join(" + ");
  const combined =
    results.length > 1
      ? ` (also analyzing: ${results
          .slice(1)
          .map((r) => `${r.name} = ${r.result.total}`)
          .join(", ")})`
      : "";

  return (
    `✨ Mystical Analysis of "${allNames}"${combined}\n\n` +
    `1. Hebrew Letter Analysis (Sefer Yetzirah 2:1, 4:1–5:2)\n` +
    `   • Mothers (elements): ${mothers.length ? mothers.join(", ") : "none"}\n` +
    `   • Doubles (planets/directions): ${doubles.length ? doubles.join(", ") : "none"}\n` +
    `   • Simples (zodiac/boundaries): ${simples.length ? simples.join(", ") : "none"}\n` +
    `   • Gematria total: ${gematria}\n\n` +
    `2. Letter Meanings\n   • ${qualities}\n\n` +
    `3. Sefirot Connection (Bahir §§17–23)\n` +
    `   "${primaryName}" (${gematria}) resonates with ${sefirahLink}.\n` +
    `   • ${paths || "Channels of divine light on the Tree of Life"}\n\n` +
    `4. Personal Reflection\n` +
    `   The letters of "${primaryName}" are a divine blueprint for your soul. ` +
    `They invite you to embody ${sefirahLink} in everyday life — ` +
    `balancing kindness (Chesed), strength (Gevurah), and harmony (Tiferet).\n\n` +
    `📚 Sources: sefaria.org/Sefer_Yetzirah | sefaria.org/Sefer_HaBahir | ` +
    `chabad.org/library/article_cdo/aid/508007\n\n` +
    `What would you like to explore further?`
  );
}

function buildHebrewResponse(results: CachedNameResult[]): string {
  const primary = results[0];
  const primaryName = primary.name;
  const gematria = primary.result.total;
  const letters = primary.result.letters.map((l) => l.letter);
  const uniqueLetters = [...new Set(letters)];

  const mothers = uniqueLetters.filter((l) => MOTHER_LETTERS.has(l));
  const doubles = uniqueLetters.filter((l) => DOUBLE_LETTERS.has(l));
  const simples = uniqueLetters.filter(
    (l) => !MOTHER_LETTERS.has(l) && !DOUBLE_LETTERS.has(l),
  );

  const qualities = uniqueLetters
    .map((l) => {
      const d = KABBALISTIC_MEANINGS[l as keyof typeof KABBALISTIC_MEANINGS];
      return `${l} — ${d ? d.meaning.split(",")[0].trim() : "ניצוץ אלוקי"}`;
    })
    .join("\n   • ");

  const sefirahLink =
    gematria % 10 === 4
      ? "גבורה (כוח ודין)"
      : gematria % 10 === 0
        ? "מלכות (מלכות והתגלות)"
        : "תפארת (יופי והרמוניה)";

  const allNames = results.map((r) => r.name).join(" + ");

  return (
    `✨ ניתוח מיסטי של "${allNames}"\n\n` +
    `1. ניתוח אותיות עברי (ספר יצירה ב:א, ד:א–ה:ב)\n` +
    `   • אותיות אמות (יסודות): ${mothers.length ? mothers.join(", ") : "אין"}\n` +
    `   • אותיות כפולות (כוכבים/כיוונים): ${doubles.length ? doubles.join(", ") : "אין"}\n` +
    `   • אותיות פשוטות (מזלות/גבולות): ${simples.length ? simples.join(", ") : "אין"}\n` +
    `   • סכום גמטריה: ${gematria}\n\n` +
    `2. משמעות האותיות\n   • ${qualities}\n\n` +
    `3. קשר לספירות (ספר הבהיר §§17–23)\n` +
    `   "${primaryName}" (${gematria}) מהדהד עם ספירת ${sefirahLink}.\n\n` +
    `4. התבוננות אישית\n` +
    `   האותיות של "${primaryName}" הן תוכנית אלוקית לנשמתך. ` +
    `הן מזמינות אותך לגלם את ${sefirahLink} בחיי היומיום — ` +
    `לאזן בין חסד, גבורה ותפארת.\n\n` +
    `📚 מקורות: sefaria.org/Sefer_Yetzirah | sefaria.org/Sefer_HaBahir\n\n` +
    `מה תרצה לחקור עוד?`
  );
}

// ---------- Component ----------
export function ChatBot({ isOpen, onClose, nameResultsProp }: ChatBotProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [lang, setLang] = React.useState<Lang>("en");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [showHebKeyboard, setShowHebKeyboard] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const recognitionRef = React.useRef<any>(null);

  // Track whether the chat was previously open so we can detect open transitions
  const wasOpenRef = React.useRef(false);
  // Track which names we've already greeted for, to detect name changes
  const greetedNamesRef = React.useRef<string>("");

  const ui = UI[lang];

  // Get the best available name results — try every possible source in order
  const getNames = (): CachedNameResult[] => {
    // 1. Module-level cache (set by GematriaCalculator on every render)
    const cached = getNamesCache();
    if (cached.length > 0) return cached;
    // 2. Prop passed directly from parent
    if (nameResultsProp && nameResultsProp.length > 0) return nameResultsProp;
    // 3. Read straight from the DOM inputs — works even if React state failed
    const fromDOM = readNamesFromDOM();
    if (fromDOM.length > 0) return fromDOM;
    return [];
  };

  // Auto-scroll
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle chat open / name changes
  React.useEffect(() => {
    const justOpened = isOpen && !wasOpenRef.current;
    wasOpenRef.current = isOpen;

    const results = getNames();
    const namesKey = results.map((r) => r.name).join(",");

    if (justOpened) {
      // Chat just opened — always set a fresh welcome
      greetedNamesRef.current = namesKey;
      if (results.length > 0) {
        const primary = results[0];
        const allNames = results.map((r) => r.name).join(", ");
        setMessages([
          {
            role: "assistant",
            content:
              lang === "he"
                ? `✨ שלום! אני המיסטיק מיינד³³ שלך — המדריך לגמטריה, קבלה ומיסטיקה עברית. ` +
                  `אני רואה שהזנת "${allNames}" במחשבון ` +
                  `(גמטריה של "${primary.name}": ${primary.result.total}). ` +
                  `שאל אותי על המשמעות הרוחנית, אותיות הקבלה, או קשרים לעץ החיים!`
                : `✨ Shalom! I am your MysticMinded³³ bot — your guide to Gematria, Kabbalah, and Hebrew mysticism. ` +
                  `I can see you've entered "${allNames}" in the calculator ` +
                  `(Gematria of "${primary.name}": ${primary.result.total}). ` +
                  `Ask me about its spiritual meaning, Kabbalistic letters, or Tree of Life connections!`,
          },
        ]);
      } else {
        setMessages([
          {
            role: "assistant",
            content:
              lang === "he"
                ? "✨ שלום! אני המיסטיק מיינד³³ שלך — המדריך לגמטריה, קבלה ומיסטיקה עברית. " +
                  "הזן שם עברי במחשבון למעלה ואני אמשוך אותו אוטומטית לניתוח רוחני אישי!"
                : "✨ Shalom! I am your MysticMinded³³ bot — your guide to Gematria, Kabbalah, and Hebrew mysticism. " +
                  "Enter a Hebrew name in the calculator above and I'll automatically pull it for personalized spiritual insights!",
          },
        ]);
      }
      return;
    }

    // Chat already open — notify if name changed
    if (isOpen && namesKey !== greetedNamesRef.current && results.length > 0) {
      greetedNamesRef.current = namesKey;
      const primary = results[0];
      const allNames = results.map((r) => r.name).join(", ");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "he"
              ? `✨ עדכנתי את הניתוח! קלטתי "${allNames}" מהמחשבון ` +
                `(גמטריה של "${primary.name}": ${primary.result.total}). שאל אותי כל דבר!`
              : `✨ I've updated my analysis! I picked up "${allNames}" from the calculator ` +
                `(Gematria of "${primary.name}": ${primary.result.total}). Ask me anything!`,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, nameResultsProp, lang]);

  // Send a message
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const results = getNames();

    if (results.length > 0) {
      const response =
        lang === "he"
          ? buildHebrewResponse(results)
          : buildEnglishResponse(results);
      setMessages([...newMessages, { role: "assistant", content: response }]);
      setLoading(false);
      return;
    }

    // No name in calculator — fall back to API
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            (lang === "he"
              ? "הזן שם עברי במחשבון למעלה ואני אתן לך ניתוח אישי!"
              : "Enter a Hebrew name in the calculator above for a personalized analysis!"),
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            lang === "he"
              ? "הזן שם עברי במחשבון למעלה — אני אמשוך אותו אוטומטית!"
              : "Enter a Hebrew name in the calculator above — I'll pull it automatically!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const HEBREW_ROWS = [
    ['א','ב','ג','ד','ה','ו','ז'],
    ['ח','ט','י','כ','ל','מ','נ'],
    ['ס','ע','פ','צ','ק','ר','ש'],
    ['ת','ך','ם','ן','ף','ץ'],
  ];

  const startVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input is not supported in this browser. Please use Chrome."); return; }
    if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return; }
    const r = new SR();
    r.lang = lang === 'he' ? 'he-IL' : 'en-US';
    r.interimResults = false;
    r.onstart = () => setIsRecording(true);
    r.onend = () => setIsRecording(false);
    r.onerror = () => setIsRecording(false);
    r.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    };
    recognitionRef.current = r;
    r.start();
  };

  if (!isOpen) return null;

  const displayedName = getNames()[0]?.name ?? null;
  const isHe = lang === "he";

  return (
    <div
      dir={isHe ? "rtl" : "ltr"}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "370px",
        height: "540px",
        background: "linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 100%)",
        borderRadius: "16px",
        border: "1.5px solid #c9a84c",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(201,168,76,0.2)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div style={{
            width: "46px", height: "46px", borderRadius: "50%",
            border: "2px solid #c9a84c", flexShrink: 0,
            overflow: "hidden", display: "flex",
            alignItems: "center", justifyContent: "center",
            background: "#fff",
          }}>
          <img
            src="/mysticminded-logo.svg"
            alt="MysticMind"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{ color: "#c9a84c", fontWeight: "bold", fontSize: "14px" }}
          >
            {ui.title}
          </div>
          <div style={{ color: "#a07cc5", fontSize: "11px" }}>
            {ui.subtitle}
            {displayedName && (
              <span
                style={{
                  color: "#c9a84c",
                  marginRight: isHe ? 0 : 4,
                  marginLeft: isHe ? 4 : 0,
                }}
              >
                {" · "}
                {ui.analyzing}: {displayedName}
              </span>
            )}
          </div>
        </div>

        {/* Language toggle */}
        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          {(["en", "he"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "3px 8px",
                borderRadius: "8px",
                border: "1px solid #c9a84c",
                background: lang === l ? "#c9a84c" : "transparent",
                color: lang === l ? "#1a0a2e" : "#c9a84c",
                fontSize: "11px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {l === "en" ? "EN" : "עב"}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#c9a84c",
            fontSize: "20px",
            cursor: "pointer",
            padding: "0 2px",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      </div>

      {/* ── Messages ── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#a07cc5",
                marginBottom: "3px",
                paddingLeft: msg.role === "user" ? 0 : "4px",
                paddingRight: msg.role === "user" ? "4px" : 0,
              }}
            >
              {msg.role === "user" ? ui.you : ui.bot}
            </div>
            <div
              style={{
                maxWidth: "87%",
                padding: "8px 12px",
                borderRadius:
                  msg.role === "user"
                    ? "14px 14px 2px 14px"
                    : "14px 14px 14px 2px",
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #c9a84c, #a07020)"
                    : "rgba(255,255,255,0.07)",
                color: msg.role === "user" ? "#1a0a2e" : "#e8d5ff",
                fontSize: "13px",
                lineHeight: "1.6",
                border:
                  msg.role === "assistant"
                    ? "1px solid rgba(201,168,76,0.2)"
                    : "none",
                whiteSpace: "pre-wrap",
                textAlign: isHe ? "right" : "left",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#a07cc5",
                marginBottom: "3px",
                paddingLeft: "4px",
              }}
            >
              {ui.bot}
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "14px 14px 14px 2px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#a07cc5",
                fontSize: "13px",
              }}
            >
              {ui.thinking}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Hebrew keyboard panel ── */}
      {showHebKeyboard && (
        <div style={{ padding: "8px 10px", borderTop: "1px solid rgba(201,168,76,0.2)", background: "rgba(0,0,0,0.2)" }}>
          {HEBREW_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "4px", flexWrap: "wrap" }}>
              {row.map(letter => (
                <button
                  key={letter}
                  onPointerDown={(e) => { e.preventDefault(); setInput(p => p + letter); }}
                  style={{
                    width: "34px", height: "34px",
                    background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)",
                    borderRadius: "6px", color: "#c9a84c", fontSize: "16px", fontWeight: "bold",
                    cursor: "pointer", touchAction: "manipulation",
                  }}
                >{letter}</button>
              ))}
            </div>
          ))}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "4px" }}>
            <button onPointerDown={(e) => { e.preventDefault(); setInput(p => p.slice(0, -1)); }}
              style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(255,80,80,0.2)", border: "1px solid rgba(255,80,80,0.4)", color: "#ff8080", fontSize: "13px", cursor: "pointer" }}>⌫ Delete</button>
            <button onPointerDown={(e) => { e.preventDefault(); setInput(""); }}
              style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.3)", color: "#ff8080", fontSize: "13px", cursor: "pointer" }}>✕ Clear</button>
          </div>
        </div>
      )}

      {/* ── Input row ── */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(201,168,76,0.3)", background: "rgba(0,0,0,0.15)", display: "flex", gap: "6px", alignItems: "flex-end" }}>
        {/* א Hebrew keyboard toggle */}
        <button
          onPointerDown={(e) => { e.preventDefault(); setShowHebKeyboard(p => !p); }}
          title="Hebrew keyboard"
          style={{
            width: "34px", height: "34px",
            background: showHebKeyboard ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(201,168,76,0.4)", borderRadius: "8px",
            color: "#c9a84c", fontSize: "15px", fontWeight: "bold", cursor: "pointer", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >א</button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ui.placeholder(displayedName)}
          dir={isHe ? "rtl" : "ltr"}
          rows={2}
          style={{
            flex: 1, background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(201,168,76,0.3)", borderRadius: "10px",
            padding: "8px 10px", color: "#e8d5ff", fontSize: "13px",
            resize: "none", outline: "none", fontFamily: "sans-serif",
          }}
        />

        {/* 🎤 Mic button */}
        <button
          onClick={startVoice}
          title={isRecording ? "Stop recording" : "Voice input"}
          style={{
            width: "34px", height: "34px",
            background: isRecording ? "rgba(255,60,60,0.4)" : "rgba(255,255,255,0.07)",
            border: `1px solid ${isRecording ? "rgba(255,60,60,0.7)" : "rgba(201,168,76,0.4)"}`,
            borderRadius: "8px", color: isRecording ? "#ff6060" : "#c9a84c",
            fontSize: "16px", cursor: "pointer", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: isRecording ? "pulse 1s infinite" : "none",
          }}
        >🎤</button>

        {/* Send */}
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? "rgba(201,168,76,0.3)" : "linear-gradient(135deg, #c9a84c, #a07020)",
            border: "none", borderRadius: "10px",
            color: loading || !input.trim() ? "#888" : "#1a0a2e",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontWeight: "bold", fontSize: "13px", padding: "8px 14px",
            transition: "all 0.2s", flexShrink: 0,
          }}
        >{ui.send}</button>
      </div>
    </div>
  );
}
