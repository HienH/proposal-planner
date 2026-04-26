import useT from "../i18n/useT";

export default function LanguageToggle({ variant = "light" }) {
  const { lang, setLang } = useT();
  const isDark = variant === "dark";

  const trackBg = isDark ? "rgba(255,248,238,0.12)" : "rgba(59,36,18,0.08)";
  const trackBorder = isDark ? "rgba(255,248,238,0.25)" : "rgba(59,36,18,0.15)";
  const inactiveColor = isDark ? "rgba(255,248,238,0.65)" : "#6B5744";
  const activeBg = "#C4944A";
  const activeColor = "#FFF8EE";

  const baseBtn = {
    padding: "6px 14px",
    border: "none",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    cursor: "pointer",
    background: "transparent",
    color: inactiveColor,
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  };
  const activeBtn = { ...baseBtn, background: activeBg, color: activeColor };

  return (
    <div
      role="group"
      aria-label={lang === "es" ? "Selector de idioma" : "Language selector"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: 3,
        background: trackBg,
        border: `1px solid ${trackBorder}`,
        borderRadius: 999,
      }}
    >
      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        style={lang === "en" ? activeBtn : baseBtn}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
        style={lang === "es" ? activeBtn : baseBtn}
      >
        ES
      </button>
    </div>
  );
}
