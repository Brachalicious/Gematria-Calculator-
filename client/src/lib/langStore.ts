import * as React from "react";

export type AppLang = "en" | "he";

let _lang: AppLang = "en";
const _listeners: Array<() => void> = [];

try {
  const saved = localStorage.getItem("gematria_lang") as AppLang;
  if (saved === "en" || saved === "he") _lang = saved;
} catch {}

export function getAppLang(): AppLang { return _lang; }

export function setAppLang(lang: AppLang): void {
  _lang = lang;
  try { localStorage.setItem("gematria_lang", lang); } catch {}
  _listeners.forEach(fn => fn());
}

export function useAppLang(): [AppLang, (l: AppLang) => void] {
  const [lang, setLangState] = React.useState<AppLang>(_lang);
  React.useEffect(() => {
    const handler = () => setLangState(_lang);
    _listeners.push(handler);
    return () => { const i = _listeners.indexOf(handler); if (i > -1) _listeners.splice(i, 1); };
  }, []);
  return [lang, setAppLang];
}
