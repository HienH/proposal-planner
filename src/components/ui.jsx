import { useState } from "react";
import { fmt } from "../utils";

export function ProofBar({ pct, label }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B5744", marginBottom: 3 }}>
        <span>{pct}% {label}</span>
      </div>
      <div style={{ height: 6, background: "#EDE8E0", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: 3,
          background: "linear-gradient(90deg,#C4944A,#D4AF37)",
          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

export function SocialProofCard({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ maxWidth: 500, margin: "28px auto 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          width: "100%", padding: "12px 20px", borderRadius: 10,
          border: "1px dashed #D4C5B0",
          background: open ? "rgba(196,148,74,0.04)" : "transparent",
          cursor: "pointer", transition: "all 0.2s",
        }}
      >
        <span style={{ fontSize: 13, color: "#8B7355", fontWeight: 500 }}>
          {open ? "Hide" : "See"} what others choose
        </span>
        <span style={{
          fontSize: 12, color: "#C4944A", transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0)",
        }}>
          ▼
        </span>
      </button>

      {open && (
        <div style={{
          marginTop: 12, background: "#fff", border: "1px solid #EDE8E0",
          borderRadius: 14, padding: "18px 22px",
          boxShadow: "0 2px 12px rgba(59,36,18,0.04)", animation: "fadeIn 0.3s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg,#C4944A,#D4AF37)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: "#fff",
            }}>
              📊
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#3B2412" }}>{data.headline}</span>
          </div>

          {data.stats.map((s, i) => <ProofBar key={i} pct={s.pct} label={s.label} />)}

          {data.combo && (
            <div style={{
              marginTop: 14, padding: "12px 14px", background: "rgba(196,148,74,0.06)",
              borderRadius: 10, borderLeft: "3px solid #C4944A",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#C4944A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                {data.combo.label}
              </div>
              <div style={{ fontSize: 13, color: "#3B2412", fontWeight: 600 }}>{data.combo.items}</div>
              <div style={{ fontSize: 12, color: "#8B7355", marginTop: 2 }}>Average total spend: {data.combo.avgSpend}</div>
            </div>
          )}

          <div style={{
            marginTop: 12, fontSize: 12, color: "#8B7355", fontStyle: "italic",
            lineHeight: 1.4, paddingLeft: 10, borderLeft: "2px solid #E8E0D4",
          }}>
            💡 {data.tip}
          </div>
        </div>
      )}
    </div>
  );
}

export function StepIndicator({ current, total, labels }) {
  return (
    <div style={{ padding: "24px 0 8px" }}>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? 36 : 10, height: 6, borderRadius: 3,
              background: i <= current ? "#C4944A" : "#E8E0D4",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 12, color: "#B0A090", fontWeight: 500 }}>
        Step {current + 1} of {total} — {labels[current]}
      </div>
    </div>
  );
}

export function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <h2 style={{
        fontSize: "clamp(26px,5vw,36px)", fontWeight: 700, color: "#3B2412",
        margin: 0, fontFamily: "'Playfair Display',Georgia,serif", lineHeight: 1.2,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 15, color: "#8B7355", margin: "10px auto 0", lineHeight: 1.6, maxWidth: 520 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function EyeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute", bottom: 12, right: 12,
        background: "rgba(0,0,0,0.6)", border: "none", color: "#fff",
        width: 32, height: 32, borderRadius: "50%", fontSize: 14,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", zIndex: 10,
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(196,148,74,0.9)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
    >
      👁
    </button>
  );
}

export function VenueCard({ venue, selected, onSelect, onPreview }) {
  const sel = selected === venue.id;

  return (
    <div
      onClick={() => onSelect(venue.id)}
      style={{
        position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer",
        border: sel ? "3px solid #C4944A" : "3px solid transparent",
        boxShadow: sel ? "0 8px 32px rgba(196,148,74,0.35)" : "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease", transform: sel ? "scale(1.02)" : "scale(1)",
        flex: "1 1 260px", maxWidth: 360, background: "#fff",
      }}
    >
      <div style={{
        position: "relative", height: 200,
        backgroundImage: `url(${venue.img})`, backgroundSize: "cover", backgroundPosition: "center",
      }}>
      </div>

      {venue.badge && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: venue.badge === "BEST VALUE" ? "#2D5016" : "#C4944A",
          color: "#fff", padding: "5px 14px", borderRadius: 20,
          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
        }}>
          {venue.badge}
        </div>
      )}

      {venue.priv && (
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: "rgba(0,0,0,0.65)", color: "#fff",
          padding: "5px 12px", borderRadius: 20, fontSize: 10, fontWeight: 600,
        }}>
          PRIVATE
        </div>
      )}

      {sel && (
        <div style={{
          position: "absolute", top: 85, left: "50%", transform: "translateX(-50%)",
          background: "#C4944A", color: "#fff", width: 44, height: 44, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}>
          ✓
        </div>
      )}

      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 style={{ margin: 0, fontSize: 22, color: "#3B2412", fontFamily: "'Playfair Display',Georgia,serif" }}>
            {venue.name}
          </h3>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#C4944A", fontFamily: "'Playfair Display',Georgia,serif" }}>
            {fmt(venue.price)}
          </span>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "#6B5744", lineHeight: 1.5 }}>{venue.desc}</p>
        <div style={{ marginTop: 8, fontSize: 11, color: "#B0A090", lineHeight: 1.5 }}>
          Includes: Coordination · 1.5 hrs · Cocktail table · Sparkling wine · Server · Speaker
        </div>
      </div>
    </div>
  );
}

export function AddonToggle({ item, active, onToggle, popular }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
        borderRadius: 12, cursor: "pointer",
        background: active ? "rgba(196,148,74,0.08)" : "#fff",
        border: active ? "2px solid #C4944A" : "2px solid #EDE8E0",
        transition: "all 0.25s ease", position: "relative",
      }}
    >
      {popular && !active && (
        <div style={{
          position: "absolute", top: -8, right: 12,
          background: "#C4944A", color: "#fff", padding: "2px 8px",
          borderRadius: 8, fontSize: 9, fontWeight: 700,
        }}>
          POPULAR
        </div>
      )}
      <div style={{
        width: 52, height: 52, borderRadius: 10, flexShrink: 0,
        backgroundImage: `url(${item.img})`, backgroundSize: "cover",
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "#3B2412" }}>{item.name}</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
            {fmt(item.price)}
          </span>
        </div>
        <p style={{ margin: "3px 0 0", fontSize: 11, color: "#8B7355", lineHeight: 1.3 }}>{item.desc}</p>
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        border: active ? "none" : "2px solid #D4C5B0",
        background: active ? "#C4944A" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", color: "#fff", fontSize: 13, fontWeight: 700,
      }}>
        {active ? "✓" : ""}
      </div>
    </div>
  );
}

export function AddonSection({ title, items, selected, onToggle, popularIds = [] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{
        fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: 10,
        textTransform: "uppercase", letterSpacing: 2,
      }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => (
          <AddonToggle
            key={item.id}
            item={item}
            active={selected.includes(item.id)}
            onToggle={() => onToggle(item.id)}
            popular={popularIds.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function SummaryItem({ label, price, sub, onRemove, hidePrice }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 0", borderBottom: "1px solid #F0EBE3",
    }}>
      <div style={{ flex: 1, minWidth: 0, marginRight: 12 }}>
        <div style={{ fontWeight: 600, color: "#3B2412", fontSize: 14 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: "#8B7355", marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        {!hidePrice && <div style={{ fontWeight: 700, color: "#C4944A", fontSize: 13 }}>{fmt(price)}</div>}
        {onRemove && (
          <button
            onClick={onRemove}
            style={{
              background: "none", border: "none", color: "#D4C5B0",
              cursor: "pointer", fontSize: 16, fontWeight: 700, padding: 0,
              lineHeight: 1, transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#C4944A"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#D4C5B0"}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
