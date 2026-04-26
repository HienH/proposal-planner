import { useCallback } from "react";
import { useLanguage } from "./LanguageContext";
import en from "../locales/en.json";
import es from "../locales/es.json";
import catalogEs from "../locales/catalog.es.json";

const DICTIONARIES = { en, es };
const CATALOG_OVERRIDES = { es: catalogEs };

function lookup(dict, key) {
  if (!dict) return undefined;
  if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
  const parts = key.split(".");
  let cur = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return undefined;
  }
  return typeof cur === "string" ? cur : undefined;
}

function interpolate(str, vars) {
  if (!vars || typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (m, name) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : m
  );
}

export default function useT() {
  const { lang, setLang } = useLanguage();

  const t = useCallback(
    (key, vars) => {
      const primary = lookup(DICTIONARIES[lang], key);
      if (primary !== undefined) return interpolate(primary, vars);
      const fallback = lookup(DICTIONARIES.en, key);
      if (fallback !== undefined) return interpolate(fallback, vars);
      return key;
    },
    [lang]
  );

  const tCatalog = useCallback(
    (collection, id, field, fallbackValue) => {
      if (lang === "en") return fallbackValue;
      const entry = CATALOG_OVERRIDES[lang]?.[collection]?.[id];
      if (entry == null) return fallbackValue;
      if (field == null) {
        return typeof entry === "string" ? entry : fallbackValue;
      }
      return entry?.[field] ?? fallbackValue;
    },
    [lang]
  );

  return { t, tCatalog, lang, setLang };
}
