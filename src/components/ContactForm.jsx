import { useState, useRef, useEffect, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import emailjs from "@emailjs/browser";
import { COUNTRY_CODES, PHONE } from "../data";
import { fmt } from "../utils";
import useT from "../i18n/useT";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const DATE_LOCALE = { en: "en-US", es: "es-MX" };

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

function ProposalDatePicker({ value, onChange, placeholder, minDate, maxDate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { lang } = useT();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatted = value
    ? value.toLocaleDateString(DATE_LOCALE[lang] || "en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
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
  const { t, lang } = useT();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fmtDate = (d) =>
    d ? d.toLocaleDateString(DATE_LOCALE[lang] || "en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

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
        <span>{label || t("contact.travelPlaceholder")}</span>
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
  clientFullName, setClientFullName,
  hotelName, setHotelName,
  inquiryReady,
  buildMsg, buildEmailSubject,
  showSave, setShowSave,
  planSaved,
  goBack,
  startOver,
}) {
  const { t } = useT();
  const [sendStatus, setSendStatus] = useState("idle");
  const onTravelChange = (from, to) => {
    setTravelStart(from);
    setTravelEnd(to);
    if (proposalDate && from && to && (proposalDate < from || proposalDate > to)) {
      setProposalDate(null);
    }
  };

  const handleSendEmail = async () => {
    if (!inquiryReady || sendStatus === "sending" || sendStatus === "sent") return;
    setSendStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          subject: buildEmailSubject(),
          message: buildMsg(),
          reply_to: contactEmail,
          from_phone: `${countryCode} ${contactPhone}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSendStatus("sent");
      setTimeout(() => setSendStatus("idle"), 6000);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 5000);
    }
  };
  return (
    <>
      <div style={{ padding: "0 28px 0", borderTop: "2px solid #F5F0E8" }}>
        <h3 style={{
          fontSize: 16, color: "#3B2412", margin: "20px 0 16px",
          fontFamily: "'Playfair Display',Georgia,serif",
        }}>
          {t("contact.heading")}
        </h3>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            {t("contact.fullNameLabel")} *
          </label>
          <input
            id="fullname-input"
            value={clientFullName}
            onChange={(e) => setClientFullName(e.target.value)}
            placeholder={t("contact.fullNamePlaceholder")}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10,
              border: "2px solid #EDE8E0", fontSize: 14, fontFamily: "inherit",
              background: "#FDFBF7", transition: "border 0.2s",
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            {t("contact.hotelNameLabel")} <span style={{ color: "#B0A090", fontWeight: 500 }}>{t("contact.optional")}</span>
          </label>
          <input
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            placeholder={t("contact.hotelNamePlaceholder")}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10,
              border: "2px solid #EDE8E0", fontSize: 14, fontFamily: "inherit",
              background: "#FDFBF7", transition: "border 0.2s",
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            {t("contact.emailLabel")} *
          </label>
          <input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder={t("contact.emailPlaceholder")}
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
            {t("contact.phoneLabel")} *
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <CountryCodePicker value={countryCode} onChange={setCountryCode} />
            <input
              id="phone-input"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder={t("contact.phonePlaceholder")}
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
            {t("contact.travelLabel")} <span style={{ color: "#B0A090", fontWeight: 500 }}>{t("contact.optional")}</span>
          </label>
          <TravelRangePicker start={travelStart} end={travelEnd} onChange={onTravelChange} />
          <div style={{ fontSize: 11, color: "#B0A090", marginTop: 4, lineHeight: 1.4 }}>
            {t("contact.travelHint")}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8B7355", marginBottom: 4 }}>
            {t("contact.proposalDateLabel")} <span style={{ color: "#B0A090", fontWeight: 500 }}>{t("contact.optional")}</span>
          </label>
          <ProposalDatePicker
            value={proposalDate}
            onChange={setProposalDate}
            placeholder={travelStart && travelEnd ? t("contact.proposalDatePlaceholderReady") : t("contact.proposalDatePlaceholderEmpty")}
            minDate={travelStart || undefined}
            maxDate={travelEnd || undefined}
          />
        </div>
      </div>

      <div id="contact-cta" style={{
        padding: "16px 28px 28px", display: "flex", flexDirection: "column",
        gap: 12, alignItems: "center",
      }}>
        <div style={{
          padding: "14px 16px",
          background: "#FFF8EE", border: "1px solid #F0E6D0",
          borderRadius: 10, textAlign: "center",
          width: "100%", maxWidth: 380,
        }}>
          <div style={{ fontSize: 13, color: "#8B6914", fontWeight: 700, marginBottom: 4 }}>
            {t("review.footer.retainerHeadline")}
          </div>
          <div style={{ fontSize: 12, color: "#6B5744", lineHeight: 1.5 }}>
            {t("review.footer.retainerBody")}
          </div>
        </div>

        {!inquiryReady && (
          <div style={{ textAlign: "center", fontSize: 12, color: "#C4944A", lineHeight: 1.5, maxWidth: 340 }}>
            {!clientFullName.trim()
              ? t("contact.fillFullName")
              : contactPhone.length < 4
              ? t("contact.fillPhone")
              : t("contact.fillRequired")}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (!inquiryReady) {
              const targetId = !clientFullName.trim()
                ? "fullname-input"
                : contactPhone.length < 4
                ? "phone-input"
                : "fullname-input";
              const el = document.getElementById(targetId);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => { el.focus?.(); }, 400);
              }
              return;
            }
            handleSendEmail();
          }}
          disabled={sendStatus === "sending" || sendStatus === "sent"}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "16px 48px", borderRadius: 30, border: "none",
            background:
              sendStatus === "sent" ? "linear-gradient(135deg,#5BA67A,#3F8B5C)"
              : sendStatus === "error" ? "linear-gradient(135deg,#D4736A,#B85A50)"
              : inquiryReady ? "linear-gradient(135deg,#C4944A,#D4AF37)"
              : "rgba(196,148,74,0.4)",
            color: "#fff", fontSize: 15, fontWeight: 700,
            boxShadow: inquiryReady ? "0 4px 20px rgba(196,148,74,0.35)" : "none",
            width: "100%", maxWidth: 380, textAlign: "center",
            cursor: sendStatus === "sending" || sendStatus === "sent" ? "default" : (inquiryReady ? "pointer" : "not-allowed"),
            opacity: inquiryReady || sendStatus !== "idle" ? 1 : 0.5,
            transition: "all 0.3s", fontFamily: "inherit",
          }}
        >
          {sendStatus === "sending" ? t("contact.sending")
            : sendStatus === "sent" ? t("contact.sent")
            : sendStatus === "error" ? t("contact.sendError")
            : `${t("common.sendInquiry")} →`}
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          width: "100%", maxWidth: 380, margin: "4px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "#EDE8E0" }} />
          <span style={{ fontSize: 11, color: "#B0A090", fontWeight: 600, whiteSpace: "nowrap" }}>
            {t("contact.fasterResponse")}
          </span>
          <div style={{ flex: 1, height: 1, background: "#EDE8E0" }} />
        </div>

        <a
          href={`https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(buildMsg())}`}
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
          {t("contact.sendViaWhatsapp")}
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
          {planSaved ? t("contact.planSaved") : t("contact.savePlan")}
        </button>

        <button
          onClick={startOver}
          style={{
            padding: "10px 24px", borderRadius: 30, border: "none",
            cursor: "pointer", background: "transparent",
            color: "#D4A09A", fontSize: 12, fontWeight: 600,
          }}
        >
          {t("contact.startOver")}
        </button>
      </div>
    </>
  );
}
