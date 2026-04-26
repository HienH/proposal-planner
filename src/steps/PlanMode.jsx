import { IMG } from "../data";
import { fmt } from "../utils";
import { SectionTitle } from "../components/ui";
import useT from "../i18n/useT";
import LanguageToggle from "../components/LanguageToggle";

export default function PlanMode({ state }) {
  const { anim, goToStep, setPlanMode, selectPlanMode, topRef } = state;
  const { t } = useT();

  return (
    <div style={{ ...anim, maxWidth: 920, margin: "0 auto", padding: "40px 20px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button
          onClick={() => goToStep(0, () => setPlanMode(null))}
          style={{
            background: "none", border: "none", color: "#B0A090",
            fontSize: 14, fontWeight: 600, cursor: "pointer", padding: 0,
          }}
        >
          ← {t("common.back")}
        </button>
        <LanguageToggle />
      </div>

      <SectionTitle
        title={t("planMode.title")}
        subtitle={t("planMode.subtitle")}
      />

      {/* TODOCHANGE PHOTO */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {/* Premade Packages */}
        <div
          onClick={() => selectPlanMode("premade")}
          style={{
            position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "all 0.3s ease",
            flex: "1 1 320px", maxWidth: 420, background: "#fff",
            display: "flex", flexDirection: "column",
          }}
        >
          <div style={{
            position: "relative", height: 260,
            backgroundImage: `url(${IMG.premadeCard})`, backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 30%,rgba(0,0,0,0.75))" }}>
              <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                <div style={{
                  fontSize: 24, fontWeight: 700, color: "#FFF8EE",
                  fontFamily: "'Playfair Display',Georgia,serif",
                }}>
                  {t("planMode.premade.title")}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,248,238,0.8)", marginTop: 4 }}>
                  {t("planMode.premade.tagline")}
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
            <p style={{ margin: "0 0 12px", fontSize: 14, color: "#6B5744", lineHeight: 1.6 }}>
              {t("planMode.premade.body")}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <span style={{ fontSize: 13, color: "#B0A090" }}>
                {t("planMode.startingFrom")} <strong style={{ color: "#C4944A", fontSize: 16 }}>{fmt(995)}</strong>
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#C4944A" }}>{t("planMode.premade.cta")} →</span>
            </div>
          </div>
        </div>

        {/* Build Your Own */}
        <div
          onClick={() => selectPlanMode("custom")}
          style={{
            position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "all 0.3s ease",
            flex: "1 1 320px", maxWidth: 420, background: "#fff",
            display: "flex", flexDirection: "column",
          }}
        >
          <div style={{
            position: "relative", height: 260,
            backgroundImage: `url(${IMG.customCard})`, backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 30%,rgba(0,0,0,0.75))" }}>
              <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                <div style={{
                  fontSize: 24, fontWeight: 700, color: "#FFF8EE",
                  fontFamily: "'Playfair Display',Georgia,serif",
                }}>
                  {t("planMode.custom.title")}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,248,238,0.8)", marginTop: 4 }}>
                  {t("planMode.custom.tagline")}
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
            <p style={{ margin: "0 0 12px", fontSize: 14, color: "#6B5744", lineHeight: 1.6 }}>
              {t("planMode.custom.body")}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <span style={{ fontSize: 13, color: "#B0A090" }}>
                {t("planMode.startingFrom")} <strong style={{ color: "#C4944A", fontSize: 16 }}>{fmt(625)}</strong>
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#C4944A" }}>{t("planMode.custom.cta")} →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
