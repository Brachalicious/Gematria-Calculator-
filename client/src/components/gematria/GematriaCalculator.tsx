import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGematria } from "@/hooks/useGematria";
import { GematriaResult } from "./GematriaResult";
import { LetterBreakdown } from "./LetterBreakdown";
import { NameMeaning } from "./NameMeaning";
import { BiblicalMatches } from "./BiblicalMatches";
import { BiblicalVerses } from "./BiblicalVerses";
import { PrayerVerses } from "./PrayerVerses";
import { KabbalisticInterpretation } from "./KabbalisticInterpretation";
import { FullNamesList } from "./FullNamesList";
import { HebrewKeyboard } from "./HebrewKeyboard";
import { EnhancedNameMeaning } from "./EnhancedNameMeaning";
import { BiblicalNotes } from "./BiblicalNotes";
import { MeaningfulNotes } from "./MeaningfulNotes";
import { TikkunOlam } from "./TikkunOlam";
import { ChatBot } from "./ChatBot";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { ShareResults } from "./ShareResults";
import { SaveChart } from "./SaveChart";
import { setNamesCache } from "@/lib/nameCache";
import { useAppLang } from "@/lib/langStore";

interface GematriaCalculatorProps {
  onNamesChange?: (names: string[], values: number[]) => void;
}

export function GematriaCalculator({ onNamesChange }: GematriaCalculatorProps = {}) {
  const [names, setNames] = React.useState<string[]>(["", "", "", "", ""]);
  const [method, setMethod] = React.useState("standard");
  const [logoError, setLogoError] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const [appLang, setAppLang] = useAppLang();
  const [showFullList, setShowFullList] = React.useState(false);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [activeInput, setActiveInput] = React.useState<number>(0);
  const { calculateGematria, isHebrewText } = useGematria();
  const [parentName, setParentName] = React.useState('');
  const [relation, setRelation] = React.useState<'ben' | 'bat'>('ben');
  const [parentType, setParentType] = React.useState<'father' | 'mother'>('father');
  const [hebrewBirthdayDay, setHebrewBirthdayDay] = React.useState<number>(0);
  const [hebrewBirthdayMonth, setHebrewBirthdayMonth] = React.useState<number>(0);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleMethodChange = (value: string) => {
    setMethod(value);
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  const toggleFullList = () => {
    setShowFullList(!showFullList);
  };

  const openKeyboard = (inputIndex: number) => {
    setActiveInput(inputIndex);
    setKeyboardOpen(true);
  };

  const handleKeyPress = (key: string) => {
    const newNames = [...names];
    newNames[activeInput] = newNames[activeInput] + key;
    setNames(newNames);
  };

  const handleBackspace = () => {
    const newNames = [...names];
    newNames[activeInput] = newNames[activeInput].slice(0, -1);
    setNames(newNames);
  };

  const handleClear = () => {
    const newNames = [...names];
    newNames[activeInput] = "";
    setNames(newNames);
  };

  const getActiveNames = () => names.filter((name) => name.trim() !== "");
  const activeNames = getActiveNames();

  const nameResults = activeNames.map((name) => ({
    name,
    result: calculateGematria(name, method),
  }));

  // Keep module-level cache current so ChatBot always has the latest names
  setNamesCache(nameResults);

  // Report names up to App for Numerology comparison
  React.useEffect(() => {
    if (onNamesChange) {
      onNamesChange(
        nameResults.map(r => r.name),
        nameResults.map(r => r.result.total)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameResults.map(r => r.name + r.result.total).join(',')]);

  const combinedResult =
    activeNames.length > 1
      ? calculateGematria(activeNames.join(" "), method)
      : null;

  return (
    <div className="gematria-container" dir={appLang === "he" ? "rtl" : "ltr"}>
      {/* ── Auth bar ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          padding: "6px 0",
        }}
      >
        {user ? (
          <>
            <div
              style={{ fontSize: "13px", color: "#4b0082", fontWeight: "bold" }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#a07cc5" }}>
                👤 {user.email}
              </span>
              <button
                onClick={logout}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid rgba(201,168,76,0.4)",
                  background: "none",
                  color: "#c9a84c",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{ fontSize: "13px", color: "#2d0a5a", fontWeight: "bold" }}
            >
              ✨ Create an account if you wish to save Gematria charts
            </div>
            <button
              onClick={() => setAuthOpen(true)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: "none",
                background: "linear-gradient(135deg, #c9a84c, #a07020)",
                color: "#1a0a2e",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              🔐 Login / Create Account
            </button>
          </>
        )}
      </div>

      <div className="text-center mb-6">
        {!logoError ? (
          <>
            {/* Logo + floating "click to discuss" label */}
            <div style={{ position: "relative", display: "inline-block", margin: "0 auto 8px auto" }}>
              <img
                src="/mysticminded-logo.svg"
                alt="Mystic Minded Logo"
                className="gematria-logo"
                onError={handleLogoError}
                onClick={() => setChatOpen(true)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s, filter 0.2s",
                  display: "block",
                  height: "180px",
                  width: "auto",
                  maxWidth: "280px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLImageElement).style.filter = "drop-shadow(0 0 12px #c9a84c)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLImageElement).style.filter = "none";
                }}
              />
              {/* Floating label — top-right of logo circle */}
              <div
                onClick={() => setChatOpen(true)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "-80px",
                  background: "linear-gradient(135deg,#4b0082,#2d0a5a)",
                  border: "1.5px solid #c9a84c",
                  borderRadius: "12px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#c9a84c",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  animation: "pulse 1.5s infinite",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  zIndex: 10,
                }}
              >
                💬 Click MysticMinded³³ bot to discuss
              </div>
            </div>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }`}</style>
          </>
        ) : (
          <div className="gematria-logo flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary/30 rounded-lg">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-2">🔮</div>
              <div className="text-sm text-primary font-semibold">
                Mystic Minded
              </div>
              <div className="text-xs text-muted-foreground">
                Logo placeholder
              </div>
            </div>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Calculate Gematria and Meaning of Your Name
        </h1>
        <p className="text-sm sm:text-base text-primary px-2">
          Discover the spiritual significance and numerical value of your name
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
          <Button
            onClick={toggleFullList}
            variant={showFullList ? "secondary" : "outline"}
            className="gematria-button w-full sm:w-auto"
          >
            {showFullList ? (appLang === "he" ? "הסתר רשימה" : "Hide Names Database") : (appLang === "he" ? "צפה בכל השמות העבריים" : "View All Hebrew Names")}
          </Button>
          <Button
            onClick={() => {
              const sampleNames = ["דוד", "שרה", "אברהם", "רחל", "משה"];
              const newNames = [...names];
              sampleNames.forEach((name, index) => {
                if (index < 5) newNames[index] = name;
              });
              setNames(newNames);
            }}
            variant="outline"
            className="gematria-button w-full sm:w-auto"
          >
            {appLang === "he" ? "🌟 נסה שמות לדוגמה" : "🌟 Try Sample Names"}
          </Button>
        </div>
      </div>

      {showFullList ? (
        <FullNamesList />
      ) : (
        <>
          <Card className="gematria-card mb-6">
            <CardHeader>
              <CardTitle>{appLang === "he" ? "קלט" : "Input"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="space-y-2">
                  <Label
                    htmlFor={`name-${index}`}
                    className="font-bold text-lg"
                  >
                    {index === 0
                      ? "First"
                      : index === 1
                        ? "Second"
                        : index === 2
                          ? "Third"
                          : index === 3
                            ? "Fourth"
                            : "Fifth"}{" "}
                    Hebrew Name {index > 0 ? "(Optional)" : ""}
                  </Label>
                  <div className="name-input-container">
                    <Input
                      id={`name-${index}`}
                      value={names[index]}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder={`Enter ${index === 0 ? "first" : index === 1 ? "second" : index === 2 ? "third" : index === 3 ? "fourth" : "fifth"} Hebrew name...`}
                      className="gematria-input text-right text-lg"
                      dir="rtl"
                    />
                    <Button
                      onClick={() => openKeyboard(index)}
                      className="keyboard-toggle-button"
                      type="button"
                    >
                      ⌨️ Hebrew
                    </Button>
                    {names[index] && (
                      <Button
                        onClick={() => handleNameChange(index, "")}
                        className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        type="button"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="method" className="font-bold text-lg">
                  Calculation Method
                </Label>
                <Select value={method} onValueChange={handleMethodChange}>
                  <SelectTrigger className="gematria-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">{appLang === "he" ? "סטנדרטי (ראשון)" : "Standard (Rishon)"}</SelectItem>
                    <SelectItem value="ordinal">{appLang === "he" ? "סדרי (סדר)" : "Ordinal (Seder)"}</SelectItem>
                    <SelectItem value="reduced">{appLang === "he" ? "מצומצם (קטן)" : "Reduced (Katan)"}</SelectItem>
                    <SelectItem value="integral">{appLang === "he" ? "מצומצם אינטגרלי" : "Integral Reduced"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeNames.length > 0 && (
                <div className="text-center mt-4">
                  <Button
                    onClick={() => setNames(["", "", "", "", ""])}
                    variant="outline"
                    className="bg-red-500 text-white hover:bg-red-600 border-red-500"
                  >
                    {appLang === "he" ? "🗑️ נקה את כל השמות" : "🗑️ Clear All Names"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Parent Name Card ── */}
          <Card className="gematria-card mb-6">
            <CardHeader>
              <CardTitle>👨‍👩‍👧 Parent's Name — Spiritual Name Formula</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p style={{ fontSize: '12px', color: '#a07cc5' }}>
                In Jewish tradition, your full spiritual name is <em>Name ben/bat Parent's Name</em>. This formula is used in prayers (Misheberach), Torah aliyot, and Kabbalistic teachings. The Ari taught it reveals your <strong>Shoresh HaNeshama</strong> — Root of the Soul.
              </p>
              {/* Ben / Bat toggle */}
              <div className="space-y-1">
                <Label className="font-bold">You are a:</Label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['ben', 'bat'] as const).map(r => (
                    <button key={r} onClick={() => setRelation(r)} style={{
                      padding: '6px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px',
                      background: relation === r ? 'linear-gradient(135deg,#c9a84c,#a07020)' : 'transparent',
                      color: relation === r ? '#1a0a2e' : '#c9a84c',
                      border: '1px solid rgba(201,168,76,0.5)',
                    }}>
                      {r === 'ben' ? 'בן Ben (Son)' : 'בת Bat (Daughter)'}
                    </button>
                  ))}
                </div>
              </div>
              {/* Father / Mother toggle */}
              <div className="space-y-1">
                <Label className="font-bold">Whose name to use:</Label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['father', 'mother'] as const).map(p => (
                    <button key={p} onClick={() => setParentType(p)} style={{
                      padding: '6px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px',
                      background: parentType === p ? 'linear-gradient(135deg,#c9a84c,#a07020)' : 'transparent',
                      color: parentType === p ? '#1a0a2e' : '#c9a84c',
                      border: '1px solid rgba(201,168,76,0.5)',
                    }}>
                      {p === 'father' ? "Father's Name (אב)" : "Mother's Name (אם)"}
                    </button>
                  ))}
                </div>
              </div>
              {/* Parent name input */}
              <div className="space-y-1">
                <Label className="font-bold text-lg">
                  {parentType === 'father' ? "Father's Hebrew Name" : "Mother's Hebrew Name"}
                </Label>
                <div className="name-input-container">
                  <Input
                    value={parentName}
                    onChange={e => setParentName(e.target.value)}
                    placeholder="Enter Hebrew name..."
                    className="gematria-input text-right text-lg"
                    dir="rtl"
                  />
                  {parentName && (
                    <Button onClick={() => setParentName('')} className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" type="button">✕</Button>
                  )}
                </div>
              </div>
              {/* Full spiritual name display */}
              {names[0] && parentName && (
                <div style={{ textAlign: 'center', padding: '14px', background: 'rgba(201,168,76,0.1)', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <div style={{ fontSize: '11px', color: '#a07cc5', marginBottom: '6px' }}>✨ Your Full Spiritual Name:</div>
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#c9a84c', direction: 'rtl', letterSpacing: '2px' }}>
                    {names[0]} {relation === 'ben' ? 'בן' : 'בת'} {parentName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#a07cc5', marginTop: '6px' }}>
                    Gematria: {calculateGematria(names[0], method).total} + {relation === 'ben' ? '52 (בן)' : '402 (בת)'} + {calculateGematria(parentName, method).total} = <strong style={{ color: '#c9a84c' }}>{calculateGematria(names[0], method).total + (relation === 'ben' ? 52 : 402) + calculateGematria(parentName, method).total}</strong>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Hebrew Birthday Card ── */}
          <Card className="gematria-card mb-6">
            <CardHeader>
              <CardTitle>🎂 Hebrew Birthday</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p style={{ fontSize: '12px', color: '#a07cc5' }}>
                The Lubavitcher Rebbe taught that your Hebrew birthday is your personal <strong>Rosh Hashana</strong> — a day of special spiritual power when your mazal shines brightest. (
                <a href="https://www.chabad.org/calendar/birthday" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c' }}>Find your Hebrew birthday ↗</a>)
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div className="space-y-1" style={{ flex: '0 0 90px' }}>
                  <Label className="font-bold">Day (1–30)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    value={hebrewBirthdayDay || ''}
                    onChange={e => setHebrewBirthdayDay(Math.min(30, Math.max(0, Number(e.target.value))))}
                    placeholder="e.g. 18"
                    className="gematria-input"
                  />
                </div>
                <div className="space-y-1" style={{ flex: '1 1 180px' }}>
                  <Label className="font-bold">Month</Label>
                  <Select value={hebrewBirthdayMonth ? String(hebrewBirthdayMonth) : ''} onValueChange={v => setHebrewBirthdayMonth(Number(v))}>
                    <SelectTrigger className="gematria-input"><SelectValue placeholder="Select Hebrew month..." /></SelectTrigger>
                    <SelectContent>
                      {[
                        {v:1,l:'Nisan (ניסן) — Aries · ה'},{v:2,l:'Iyar (אייר) — Taurus · ו'},
                        {v:3,l:'Sivan (סיון) — Gemini · ז'},{v:4,l:'Tammuz (תמוז) — Cancer · ח'},
                        {v:5,l:'Av (אב) — Leo · ט'},{v:6,l:'Elul (אלול) — Virgo · י'},
                        {v:7,l:'Tishrei (תשרי) — Libra · ל'},{v:8,l:'Cheshvan (חשון) — Scorpio · נ'},
                        {v:9,l:'Kislev (כסלו) — Sagittarius · ס'},{v:10,l:'Tevet (טבת) — Capricorn · ע'},
                        {v:11,l:'Shevat (שבט) — Aquarius · צ'},{v:12,l:'Adar (אדר) — Pisces · ק'},
                      ].map(m => <SelectItem key={m.v} value={String(m.v)}>{m.l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Birthday summary */}
              {hebrewBirthdayDay > 0 && hebrewBirthdayMonth > 0 && (() => {
                const monthData = [
                  {name:'Nisan',heb:'ניסן',letter:'ה',mazal:'Aries (טלה)',tribe:'Yehuda',sense:'Speech',quality:'Month of miracles, redemption & new beginnings'},
                  {name:'Iyar',heb:'אייר',letter:'ו',mazal:'Taurus (שור)',tribe:'Yissachar',sense:'Thought',quality:'Month of healing — Ani Hashem Rofecha'},
                  {name:'Sivan',heb:'סיון',letter:'ז',mazal:'Gemini (תאומים)',tribe:'Zevulun',sense:'Walking',quality:'Month of Torah — revelation at Sinai'},
                  {name:'Tammuz',heb:'תמוז',letter:'ח',mazal:'Cancer (סרטן)',tribe:'Reuven',sense:'Sight',quality:'Month of vision — rectifying how we see'},
                  {name:'Av',heb:'אב',letter:'ט',mazal:'Leo (אריה)',tribe:'Shimon',sense:'Hearing',quality:'Strength through mourning — light from darkness'},
                  {name:'Elul',heb:'אלול',letter:'י',mazal:'Virgo (בתולה)',tribe:'Gad',sense:'Action',quality:"Month of return — Ani L'Dodi V'Dodi Li"},
                  {name:'Tishrei',heb:'תשרי',letter:'ל',mazal:'Libra (מאזניים)',tribe:'Ephraim',sense:'Coition',quality:'Judgment & joy — Rosh Hashana, Yom Kippur, Sukkot'},
                  {name:'Cheshvan',heb:'חשון',letter:'נ',mazal:'Scorpio (עקרב)',tribe:'Menashe',sense:'Smell',quality:'Pure month of internalization & depth'},
                  {name:'Kislev',heb:'כסלו',letter:'ס',mazal:'Sagittarius (קשת)',tribe:'Benjamin',sense:'Sleep',quality:'Light in darkness — Chanukah'},
                  {name:'Tevet',heb:'טבת',letter:'ע',mazal:'Capricorn (גדי)',tribe:'Dan',sense:'Anger',quality:'Rectifying anger — seeing challenges clearly'},
                  {name:'Shevat',heb:'שבט',letter:'צ',mazal:'Aquarius (דלי)',tribe:'Asher',sense:'Taste',quality:"Nourishment — Tu B'Shevat, New Year of Trees"},
                  {name:'Adar',heb:'אדר',letter:'ק',mazal:'Pisces (דגים)',tribe:'Naftali',sense:'Laughter',quality:'Joy increases — Purim, hidden miracles'},
                ][hebrewBirthdayMonth - 1];
                return (
                  <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontWeight: 800, color: '#c9a84c', fontSize: '15px', marginBottom: '8px' }}>
                      🌟 {hebrewBirthdayDay} {monthData.heb} — Spiritual Profile
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', fontSize: '12px' }}>
                      {[
                        { label: 'Letter', value: `${monthData.letter} (${monthData.name})` },
                        { label: 'Mazal', value: monthData.mazal },
                        { label: 'Tribe', value: monthData.tribe },
                        { label: 'Sense', value: monthData.sense },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                          <div style={{ color: '#a07cc5', fontSize: '10px', marginBottom: '2px' }}>{label}</div>
                          <div style={{ color: '#e8d5ff', fontWeight: 700 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ color: '#d4b8f0', fontSize: '12px', marginTop: '10px', fontStyle: 'italic' }}>
                      ✨ {monthData.quality}
                    </div>
                    <div style={{ color: '#a07cc5', fontSize: '11px', marginTop: '6px' }}>
                      Source: Sefer Yetzirah 3:1-7 (Ari's tradition) — the 12 simple Hebrew letters govern the 12 months, mazalot, tribes & senses.
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {activeNames.length > 0 && (
            <div className="names-summary">
              <h3 className="text-xl font-bold">{appLang === "he" ? "סיכום ניתוח שמות" : "Names Analysis Summary"}</h3>
              <div className="names-list">
                {activeNames.map((name, index) => (
                  <div key={index} className="name-chip">
                    {name}
                  </div>
                ))}
              </div>
              <p className="text-sm text-purple-700 font-semibold">
                {activeNames.length === 1
                  ? "Analyzing one Hebrew name"
                  : `Analyzing ${activeNames.length} Hebrew names individually and combined`}
              </p>
            </div>
          )}

          {nameResults.map((nameResult, index) => (
            <div key={index} className="name-section">
              <h2 className="text-2xl font-bold text-center">
                {index === 0
                  ? "First"
                  : index === 1
                    ? "Second"
                    : index === 2
                      ? "Third"
                      : index === 3
                        ? "Fourth"
                        : "Fifth"}{" "}
                Name: {nameResult.name}
              </h2>
              <div className="space-y-4">
                <GematriaResult result={nameResult.result} method={method} />
                <LetterBreakdown letters={nameResult.result.letters} />
                <NameMeaning text={nameResult.name} />
                <BiblicalNotes text={nameResult.name} />
                <MeaningfulNotes text={nameResult.name} />
                <TikkunOlam
                  text={nameResult.name}
                  gematriaValue={nameResult.result.total}
                />
                <EnhancedNameMeaning text={nameResult.name} />
                <PrayerVerses text={nameResult.name} />
                <BiblicalVerses
                  text={nameResult.name}
                  gematriaValue={nameResult.result.total}
                />
                <BiblicalMatches gematriaValue={nameResult.result.total} />
                <KabbalisticInterpretation
                  letters={nameResult.result.letters}
                />
                <ShareResults
                  name={nameResult.name}
                  total={nameResult.result.total}
                  method={method}
                />
                <SaveChart
                  name={nameResult.name}
                  total={nameResult.result.total}
                  method={method}
                  letters={nameResult.result.letters}
                />
              </div>
            </div>
          ))}

          {combinedResult && (
            <div className="combined-section">
              <h2 className="text-2xl font-bold text-center">
                🌟 Combined Names: {activeNames.join(" ")} 🌟
              </h2>
              <div className="space-y-4">
                <Card className="combined-result-card">
                  <CardHeader>
                    <CardTitle className="text-center">
                      ✨ Combined Gematria Result ✨
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GematriaResult result={combinedResult} method={method} />
                  </CardContent>
                </Card>
                <LetterBreakdown letters={combinedResult.letters} />
                <NameMeaning text={activeNames.join(" ")} />
                <BiblicalNotes text={activeNames.join(" ")} />
                <MeaningfulNotes text={activeNames.join(" ")} />
                <TikkunOlam
                  text={activeNames.join(" ")}
                  gematriaValue={combinedResult.total}
                />
                <EnhancedNameMeaning text={activeNames.join(" ")} />
                <PrayerVerses text={activeNames.join(" ")} />
                <BiblicalVerses
                  text={activeNames.join(" ")}
                  gematriaValue={combinedResult.total}
                />
                <BiblicalMatches gematriaValue={combinedResult.total} />
                <KabbalisticInterpretation letters={combinedResult.letters} />
                <ShareResults
                  name={activeNames.join(" ")}
                  total={combinedResult.total}
                  method={method}
                />
                <SaveChart
                  name={activeNames.join(" ")}
                  total={combinedResult.total}
                  method={method}
                  letters={combinedResult.letters}
                />
              </div>
            </div>
          )}

          {names.some((name) => name && !isHebrewText(name)) && (
            <Card className="gematria-card border-yellow-500 bg-yellow-50 mt-6">
              <CardContent className="pt-6">
                <p className="text-yellow-800">
                  ⚠️ Some names contain non-Hebrew characters. Only Hebrew
                  letters will be calculated.
                </p>
              </CardContent>
            </Card>
          )}

          <HebrewKeyboard
            isOpen={keyboardOpen}
            onClose={() => setKeyboardOpen(false)}
            onKeyPress={handleKeyPress}
            onBackspace={handleBackspace}
            onClear={handleClear}
          />
        </>
      )}

      <ChatBot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        nameResultsProp={nameResults}
      />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
