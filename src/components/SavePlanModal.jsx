import { useState } from "react";

export default function SavePlanModal({ visible, onClose, onSave }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  if (!visible) return null;

  const handleSave = () => {
    if (!email.includes("@")) return;
    setSaved(true);
    onSave({ email, name });
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(30,15,5,0.7)", backdropFilter: "blur(4px)", padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FBF8F3", borderRadius: 20, padding: "32px 28px",
          maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none", fontSize: 20, color: "#B0A090", cursor: "pointer",
          }}
        >
          ✕
        </button>

        {!saved ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>💾</div>
              <h3 style={{ margin: 0, fontSize: 22, color: "#3B2412", fontFamily: "'Playfair Display',Georgia,serif" }}>
                Save Your Plan
              </h3>
              <p style={{ margin: "8px 0 0", fontSize: 14, color: "#8B7355", lineHeight: 1.5 }}>
                We'll email you a link to your custom proposal. Come back anytime to edit or book.
              </p>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Marcus"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 10,
                  border: "2px solid #EDE8E0", fontSize: 14, fontFamily: "inherit", background: "#fff",
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
                Email Address *
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 10,
                  border: "2px solid #EDE8E0", fontSize: 14, fontFamily: "inherit", background: "#fff",
                }}
              />
            </div>
            <button
              onClick={handleSave}
              style={{
                width: "100%", padding: "16px", borderRadius: 30, border: "none", cursor: "pointer",
                background: email.includes("@") ? "linear-gradient(135deg,#C4944A,#D4AF37)" : "#D4C5B0",
                color: "#fff", fontSize: 16, fontWeight: 700,
                opacity: email.includes("@") ? 1 : 0.5, transition: "all 0.3s",
              }}
            >
              Save & Email My Plan
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "#C4B8A8", marginTop: 12 }}>
              No spam. Just your saved proposal plan.
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 22, color: "#3B2412", fontFamily: "'Playfair Display',Georgia,serif" }}>
              Plan Saved!
            </h3>
            <p style={{ fontSize: 14, color: "#8B7355", lineHeight: 1.5, margin: "0 0 8px" }}>
              Check your inbox{name ? `, ${name}` : ""}. Your custom proposal plan is on its way.
            </p>
            <p style={{ fontSize: 13, color: "#C4944A", fontWeight: 600 }}>
              Jill usually responds within a few hours if you decide to book.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 20, padding: "14px 40px", borderRadius: 30,
                border: "2px solid #C4944A", background: "transparent",
                color: "#C4944A", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              Back to My Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
