import { btnMain } from "../utils";
import useT from "../i18n/useT";
import LanguageToggle from "../components/LanguageToggle";

export default function Landing({ state }) {
  const { anim, go } = state;
  const { t } = useT();

  return (
    <div style={{
      ...anim,
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      background: "linear-gradient(160deg,#1A0E06,#3B2412 40%,#5C3A1E)",
      padding: 28, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 16, right: 16, zIndex: 5,
      }}>
        <LanguageToggle variant="dark" />
      </div>

      <div style={{
        position: "absolute", top: -80, right: -80, width: 300, height: 300,
        borderRadius: "50%", background: "radial-gradient(circle,rgba(196,148,74,0.15),transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: -60, width: 250, height: 250,
        borderRadius: "50%", background: "radial-gradient(circle,rgba(196,148,74,0.1),transparent 70%)",
      }} />

      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt={t("landing.logoAlt")}
        style={{
          width: "clamp(180px, 38vw, 260px)",
          height: "auto",
          marginBottom: 20,
          display: "block",
          filter: "invert(1) hue-rotate(180deg)",
        }}
      />

      <div style={{
        fontSize: 12, color: "#C4944A", fontWeight: 700,
        letterSpacing: 4, marginBottom: 24, textTransform: "uppercase",
      }}>
        {t("landing.eyebrow")}
      </div>

      <h1 style={{
        fontSize: "clamp(44px,10vw,80px)", color: "#FFF8EE", margin: "0 0 20px",
        fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700,
        lineHeight: 1.05, maxWidth: 550,
      }}>
        {t("landing.headlinePrefix")}{" "}
        <em style={{ color: "#D4AF37", fontStyle: "italic" }}>{t("landing.headlineEm")}</em>
      </h1>

      <p style={{
        fontSize: 17, color: "rgba(255,248,238,0.75)", margin: "0 0 44px",
        maxWidth: 420, lineHeight: 1.7,
      }}>
        {t("landing.subhead")}
      </p>

      <button onClick={() => go(1)} style={{ ...btnMain(true), padding: "20px 64px", fontSize: 18 }}>
        {t("landing.cta")}
      </button>

      <div style={{ marginTop: 56, display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          ["1,500+", t("landing.stats.proposals")],
          [t("landing.stats.sinceValue"), t("landing.stats.sinceLabel")],
          ["5.0 ★", t("landing.stats.rating")],
        ].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 24, fontWeight: 700, color: "#D4AF37",
              fontFamily: "'Playfair Display',Georgia,serif",
            }}>
              {n}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,248,238,0.5)", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
