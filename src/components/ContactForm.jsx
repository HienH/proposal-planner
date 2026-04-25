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

function ProposalDatePicker({ value, onChange, placeholder = "Select your proposal date", minDate, maxDate }) {
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

  const disabledRules = [];
  disabledRules.push({ before: minDate || new Date() });
  if (maxDate) disabledRules.push({ after: maxDate });

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
        <span>{formatted || placeholder}</span>
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
            disabled={disabledRules}
            defaultMonth={value || minDate || undefined}
          />
        </div>
      )}
    </div>
  );
}

function TravelRangePicker({ start, end, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fmtDate = (d) =>
    d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  const label = start && end
    ? `${fmtDate(start)} → ${fmtDate(end)}`
    : start
    ? `${fmtDate(start)} → …`
    : "";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        id="travel-input"
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: "12px 16px", borderRadius: 10, border: "2px solid #EDE8E0",
          fontSize: 14, background: "#FDFBF7", cursor: "pointer",
          color: label ? "#3B2412" : "#B0A090",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
        }}
      >
        <span>{label || "Select your arrival → departure dates"}</span>
        <span style={{ fontSize: 16 }}>✈️</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50,
          background: "#FBF8F3", borderRadius: 16,
          boxShadow: "0 8px 40px rgba(59,36,18,0.18)",
          border: "1px solid #EDE8E0", padding: "8px",
        }}>
          <DayPicker
            mode="range"
            selected={{ from: start || undefined, to: end || undefined }}
            onSelect={(range) => {
              onChange(range?.from || null, range?.to || null);
              if (range?.from && range?.to) setOpen(false);
            }}
            disabled={{ before: new Date() }}
            numberOfMonths={1}
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
  travelStart, setTravelStart,
  travelEnd, setTravelEnd,
  proposalDate, setProposalDate,
  partnerName, setPartnerName,
  inquiryReady,
  buildMsg, buildEmailSubject,
  showSave, setShowSave,
  planSaved,
  goBack,
  startOver,
}) {
  const onTravelChange = (from, to) => {
    setTravelStart(from);
    setTravelEnd(to);
    if (proposalDate && from && to && (proposalDate < from || proposalDate > to)) {
      setProposalDate(null);
    }
  };
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
            Travel Dates *
          </label>
          <TravelRangePicker start={travelStart} end={travelEnd} onChange={onTravelChange} />
          <div style={{ fontSize: 11, color: "#B0A090", marginTop: 4, lineHeight: 1.4 }}>
            Your full trip range — we'll confirm sunset availability within these dates.
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            Preferred Proposal Date <span style={{ color: "#B0A090", fontWeight: 500 }}>(optional)</span>
          </label>
          <ProposalDatePicker
            value={proposalDate}
            onChange={setProposalDate}
            placeholder={travelStart && travelEnd ? "Pick a day within your trip" : "Set travel dates first"}
            minDate={travelStart || undefined}
            maxDate={travelEnd || undefined}
          />
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
        <style>{`
          .send-inquiry-desktop{display:none;}
          @media(min-width:768px){
            .send-inquiry-desktop{display:flex !important;}
          }
        `}</style>

        <div style={{
          padding: "14px 16px",
          background: "#FFF8EE", border: "1px solid #F0E6D0",
          borderRadius: 10, textAlign: "center",
          width: "100%", maxWidth: 380,
        }}>
          <div style={{ fontSize: 13, color: "#8B6914", fontWeight: 700, marginBottom: 4 }}>
            📅 Your package and date can only be reserved with a retainer fee
          </div>
          <div style={{ fontSize: 12, color: "#6B5744", lineHeight: 1.5 }}>
            Submitting an inquiry does not guarantee a booking. Jill's team will follow up to confirm availability.
          </div>
        </div>

        {!inquiryReady && (
          <div style={{ textAlign: "center", fontSize: 12, color: "#C4944A", lineHeight: 1.5, maxWidth: 340 }}>
            {contactPhone.length < 4
              ? "Please fill in your phone number above to send your inquiry"
              : (!travelStart || !travelEnd)
              ? "Please add your travel dates above so we can confirm availability"
              : "Please complete the required fields above"}
          </div>
        )}

        <a
          className="send-inquiry-desktop"
          href={inquiryReady ? `mailto:${BUSINESS_EMAIL}?subject=${buildEmailSubject()}&body=${buildMsg()}` : undefined}
          onClick={(e) => {
            if (!inquiryReady) {
              e.preventDefault();
              const targetId = contactPhone.length < 4
                ? "phone-input"
                : (!travelStart || !travelEnd)
                ? "travel-input"
                : "phone-input";
              const el = document.getElementById(targetId);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => { el.focus?.(); }, 400);
              }
            }
          }}
          style={{
            display: "none", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "16px 48px", borderRadius: 30, textDecoration: "none",
            background: inquiryReady ? "linear-gradient(135deg,#C4944A,#D4AF37)" : "rgba(196,148,74,0.4)",
            color: "#fff", fontSize: 15, fontWeight: 700,
            boxShadow: inquiryReady ? "0 4px 20px rgba(196,148,74,0.35)" : "none",
            width: "100%", maxWidth: 380, textAlign: "center",
            cursor: inquiryReady ? "pointer" : "not-allowed",
            opacity: inquiryReady ? 1 : 0.5, transition: "all 0.3s",
          }}
        >
          Send Inquiry →
        </a>

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
