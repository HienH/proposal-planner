import { useState, useRef, useEffect, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { COUNTRY_CODES, PHONE, BUSINESS_EMAIL } from "../data";
import { fmt } from "../utils";

function CountryCodePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = useMemo(() => COUNTRY_CODES.find((c) => c.code === value), [value]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: "12px 8px", borderRadius: 10, border: "2px solid #EDE8E0",
          fontSize: 14, fontFamily: "inherit", background: "#FDFBF7",
          minWidth: 80, cursor: "pointer", transition: "border 0.2s",
          display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {selected?.flag} {selected?.code} <span style={{ fontSize: 10, color: "#B0A090", marginLeft: 2 }}>▼</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 50,
          background: "#FBF8F3", borderRadius: 12, border: "1px solid #EDE8E0",
          boxShadow: "0 8px 40px rgba(59,36,18,0.18)",
          maxHeight: 240, overflowY: "auto", minWidth: 220,
        }}>
          {COUNTRY_CODES.map((c) => (
            <div
              key={c.country}
              onClick={() => { onChange(c.code); setOpen(false); }}
              style={{
                padding: "10px 14px", cursor: "pointer", fontSize: 14,
                display: "flex", alignItems: "center", gap: 8,
                background: c.code === value ? "rgba(196,148,74,0.08)" : "transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(196,148,74,0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.background = c.code === value ? "rgba(196,148,74,0.08)" : "transparent"}
            >
              <span>{c.flag}</span>
              <span style={{ color: "#3B2412", fontWeight: 500 }}>{c.code}</span>
              <span style={{ color: "#8B7355", fontSize: 13 }}>{c.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProposalDatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatted = value
    ? value.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: "12px 16px", borderRadius: 10, border: "2px solid #EDE8E0",
          fontSize: 14, background: "#FDFBF7", cursor: "pointer",
          color: value ? "#3B2412" : "#B0A090",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
        }}
      >
        <span>{formatted || "Select your proposal date"}</span>
        <span style={{ fontSize: 16 }}>📅</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50,
          background: "#FBF8F3", borderRadius: 16,
          boxShadow: "0 8px 40px rgba(59,36,18,0.18)",
          border: "1px solid #EDE8E0", padding: "8px",
        }}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => { onChange(date); setOpen(false); }}
            disabled={{ before: new Date() }}
          />
        </div>
      )}
    </div>
  );
}

export default function ContactForm({
  contactEmail, setContactEmail,
  contactPhone, setContactPhone,
  countryCode, setCountryCode,
  proposalDate, setProposalDate,
  partnerName, setPartnerName,
  inquiryReady,
  buildMsg, buildEmailSubject,
  showSave, setShowSave,
  planSaved,
  goBack,
  startOver,
}) {
  return (
    <>
      <div style={{ padding: "0 28px 0", borderTop: "2px solid #F5F0E8" }}>
        <h3 style={{
          fontSize: 16, color: "#3B2412", margin: "20px 0 16px",
          fontFamily: "'Playfair Display',Georgia,serif",
        }}>
          Your contact & trip details
        </h3>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            Email Address *
          </label>
          <input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10,
              border: "2px solid #EDE8E0", fontSize: 14, fontFamily: "inherit",
              background: "#FDFBF7", transition: "border 0.2s",
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            Phone Number *
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <CountryCodePicker value={countryCode} onChange={setCountryCode} />
            <input
              id="phone-input"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Phone number"
              type="tel"
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 10,
                border: "2px solid #EDE8E0", fontSize: 14, fontFamily: "inherit",
                background: "#FDFBF7", transition: "border 0.2s",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            Proposal Date
          </label>
          <ProposalDatePicker value={proposalDate} onChange={setProposalDate} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            Partner's First Name
          </label>
          <input
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="e.g., Sarah"
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10,
              border: "2px solid #EDE8E0", fontSize: 14, fontFamily: "inherit",
              background: "#FDFBF7", transition: "border 0.2s",
            }}
          />
        </div>
      </div>

      <div id="contact-cta" style={{
        padding: "16px 28px 28px", display: "flex", flexDirection: "column",
        gap: 12, alignItems: "center",
      }}>
        {contactPhone.length < 4 && (
          <div style={{ textAlign: "center", fontSize: 12, color: "#C4944A", lineHeight: 1.5, maxWidth: 340 }}>
            Please fill in your phone number above to send your inquiry
          </div>
        )}

        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          width: "100%", maxWidth: 380, margin: "4px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "#EDE8E0" }} />
          <span style={{ fontSize: 11, color: "#B0A090", fontWeight: 600, whiteSpace: "nowrap" }}>
            Want a faster response?
          </span>
          <div style={{ flex: 1, height: 1, background: "#EDE8E0" }} />
        </div>

        <a
          href={`https://api.whatsapp.com/send?phone=${PHONE}&text=${buildMsg()}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "16px 48px", borderRadius: 30, textDecoration: "none",
            background: "#25D366", color: "#fff", fontSize: 15, fontWeight: 700,
            boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
            width: "100%", maxWidth: 380, textAlign: "center",
          }}
        >
          Send via WhatsApp
        </a>

        <div style={{ textAlign: "center", fontSize: 12, color: "#6B5744", lineHeight: 1.5, maxWidth: 340, padding: "4px 0" }}>
          Jill typically responds within minutes on WhatsApp
        </div>

        <button
          onClick={() => setShowSave(true)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "14px 36px", borderRadius: 30, border: "2px solid #C4944A",
            cursor: "pointer", background: planSaved ? "rgba(196,148,74,0.08)" : "transparent",
            color: "#C4944A", fontSize: 14, fontWeight: 600, width: "100%", maxWidth: 380,
          }}
        >
          {planSaved ? "✓ Plan Saved — Check Your Email" : "Save My Plan for Later"}
        </button>

        <button
          onClick={startOver}
          style={{
            padding: "10px 24px", borderRadius: 30, border: "none",
            cursor: "pointer", background: "transparent",
            color: "#D4A09A", fontSize: 12, fontWeight: 600,
          }}
        >
          Start Over
        </button>
      </div>
    </>
  );
}
