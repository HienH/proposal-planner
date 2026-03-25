import { fmt } from "../utils";

export default function RunningTotal({ total, visible, showBack, onBack, onNext, nextLabel = "Next", disabled = false, hideNext = false, hideTotal = false, disabledHint = "", onDisabledClick }) {
  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "linear-gradient(135deg,#3B2412,#5C3A1E)",
      padding: "12px 20px", display: "flex", justifyContent: "space-between",
      alignItems: "center", boxShadow: "0 -4px 24px rgba(0,0,0,0.3)", gap: 12,
    }}>
      {showBack ? (
        <button
          onClick={onBack}
          style={{
            padding: "10px 18px", borderRadius: 20,
            border: "1px solid rgba(245,230,200,0.3)", background: "transparent",
            color: "#F5E6C8", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
          }}
        >
          ← Back
        </button>
      ) : (
        <div style={{ width: 70 }} />
      )}

      {hideTotal ? (
        <div style={{ flex: 1 }} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 10, color: "rgba(245,230,200,0.5)",
            fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
          }}>
            Total
          </div>
          <div style={{
            fontSize: 24, fontWeight: 700, color: "#F5E6C8",
            fontFamily: "'Playfair Display',Georgia,serif",
          }}>
            {fmt(total)}
          </div>
        </div>
      )}

      {hideNext ? (
        <div style={{ width: 70 }} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {disabled && disabledHint && (
            <div style={{ fontSize: 9, color: "rgba(245,230,200,0.5)", fontWeight: 600, whiteSpace: "nowrap" }}>
              {disabledHint}
            </div>
          )}
          <button
            onClick={() => {
              if (!disabled) onNext();
              else if (onDisabledClick) onDisabledClick();
            }}
            style={{
              padding: "10px 22px", borderRadius: 20, border: "none",
              background: disabled ? "rgba(196,148,74,0.4)" : "linear-gradient(135deg,#C4944A,#D4AF37)",
              color: "#fff", fontSize: 13, fontWeight: 700,
              cursor: disabled ? "not-allowed" : "pointer", whiteSpace: "nowrap",
              opacity: disabled ? 0.5 : 1, transition: "all 0.3s",
            }}
          >
            {nextLabel} →
          </button>
        </div>
      )}
    </div>
  );
}
