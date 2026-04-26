import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "pb_lang";
const SUPPORTED = ["en", "es"];
const DEFAULT_LANG = "en";

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

function readStoredLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.title = lang === "es"
        ? "Planificador de Propuestas - Cancun Picnic"
        : "Proposal Builder - Cancun Picnic";
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore — non-critical
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export const SUPPORTED_LANGS = SUPPORTED;
