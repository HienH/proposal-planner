import { PACKAGES, ADDONS, SOCIAL_PROOF } from "../data";
import { fmt, btnMain, btnBack } from "../utils";
import { SectionTitle, AddonSection } from "../components/ui";
import ReviewStep from "./ReviewStep";

export default function PremadeFlow({ state }) {
  const {
    step, anim, go, goToStep, setPlanMode, setPreview,
    selectedPackage, setSelectedPackage,
    pkgCarouselIdx, setPkgCarouselIdx,
    addons, toggleAddon,
    total,
    contactEmail, setContactEmail, contactPhone, setContactPhone,
    countryCode, setCountryCode, proposalDate, setProposalDate,
    partnerName, setPartnerName, inquiryReady,
    buildMsg, buildEmailSubject,
    showSave, setShowSave, planSaved,
  } = state;

  // Step 2: Package selection (list or detail)
  if (step === 2) {
    if (!selectedPackage) {
      return <PackageList state={state} />;
    }
    return <PackageDetail state={state} />;
  }

  // Step 3: Extras
  if (step === 3) {
    return (
      <div style={anim}>
        <SectionTitle title="Add Extras" subtitle="Enhance your package with photography, video, or live music. Everything here is optional." />
        {/* <SocialProofCard data={SOCIAL_PROOF.addons} /> */}
        <div className="addons-grid" style={{ maxWidth: 500, margin: "0 auto" }}>
          <AddonSection title="📸 Capture the Moment" items={ADDONS.capture} selected={addons} onToggle={toggleAddon} popularIds={["photo-30", "photo-60"]} />
          <AddonSection title="🎵 Music" items={ADDONS.music} selected={addons} onToggle={toggleAddon} />
        </div>
      </div>
    );
  }

  // Step 4: Review
  if (step === 4) {
    return <ReviewStep state={state} />;
  }

  return null;
}

// --- Package list ---

function PackageList({ state }) {
  const { anim, goToStep, setPlanMode, setSelectedPackage, setPkgCarouselIdx, topRef } = state;

  return (
    <div style={anim}>
      <SectionTitle title="Choose Your Package" subtitle="Each package is designed by Jill with years of experience — everything you need for a perfect proposal." />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => { setSelectedPackage(pkg.id); setPkgCarouselIdx(0); topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            style={{
              borderRadius: 16, overflow: "hidden", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "all 0.3s ease",
              background: "#fff", display: "flex", flexDirection: "row", flexWrap: "wrap",
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 32px rgba(196,148,74,0.25)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
          >
            <div style={{
              position: "relative", flex: "1 1 240px", minHeight: 200,
              backgroundImage: `url(${pkg.imgs[0]})`, backgroundSize: "cover", backgroundPosition: "center",
            }}>
              <div style={{
                position: "absolute", top: 12, left: 12,
                background: pkg.badge === "MOST POPULAR" ? "#C4944A" : pkg.badge === "PREMIUM" ? "#3B2412" : "#8B7355",
                color: "#fff", padding: "5px 14px", borderRadius: 20,
                fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
              }}>
                {pkg.badge}
              </div>
            </div>
            <div style={{ flex: "1 1 300px", padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <h3 style={{ margin: 0, fontSize: 24, color: "#3B2412", fontFamily: "'Playfair Display',Georgia,serif" }}>{pkg.name}</h3>
                <span style={{ fontSize: 24, fontWeight: 700, color: "#C4944A", fontFamily: "'Playfair Display',Georgia,serif", whiteSpace: "nowrap" }}>{fmt(pkg.price)}</span>
              </div>
              <p style={{ margin: "10px 0 14px", fontSize: 13, color: "#6B5744", lineHeight: 1.6 }}>{pkg.desc}</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#C4944A" }}>View Details →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Package detail ---

function PackageDetail({ state }) {
  const { anim, go, setPreview, selectedPackage, setSelectedPackage, pkgCarouselIdx, setPkgCarouselIdx } = state;
  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const imgIdx = pkgCarouselIdx % pkg.imgs.length;

  return (
    <div style={anim}>
      {/* Hero carousel */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(59,36,18,0.12)", marginBottom: 28 }}>
        <div
          style={{
            height: 360, backgroundImage: `url(${pkg.imgs[imgIdx]})`,
            backgroundSize: "cover", backgroundPosition: "center",
            transition: "background-image 0.3s ease", cursor: "pointer",
          }}
          onClick={() => setPreview({ img: pkg.imgs[imgIdx], name: pkg.name })}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 24px 20px", background: "linear-gradient(transparent,rgba(0,0,0,0.85))" }}>
          <div style={{
            display: "inline-block",
            background: pkg.badge === "MOST POPULAR" ? "#C4944A" : pkg.badge === "PREMIUM" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.15)",
            color: "#fff", padding: "4px 14px", borderRadius: 20,
            fontSize: 10, fontWeight: 700, letterSpacing: 1.2, marginBottom: 10, backdropFilter: "blur(4px)",
          }}>
            {pkg.badge}
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px,6vw,40px)", color: "#fff", fontFamily: "'Playfair Display',Georgia,serif" }}>{pkg.name}</h2>
        </div>
        {pkg.imgs.length > 1 && (
          <>
            <button onClick={() => setPkgCarouselIdx((i) => (i - 1 + pkg.imgs.length) % pkg.imgs.length)} style={carouselBtn("left")}>‹</button>
            <button onClick={() => setPkgCarouselIdx((i) => (i + 1) % pkg.imgs.length)} style={carouselBtn("right")}>›</button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {pkg.imgs.map((img, i) => (
          <div
            key={i}
            onClick={() => setPkgCarouselIdx(i)}
            style={{
              flex: 1, height: 80, borderRadius: 12,
              backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center",
              cursor: "pointer", border: i === imgIdx ? "3px solid #C4944A" : "3px solid transparent",
              transition: "all 0.2s", opacity: i === imgIdx ? 1 : 0.6,
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => { if (i !== imgIdx) e.currentTarget.style.opacity = "0.6"; }}
          />
        ))}
      </div>

      {/* Description */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", boxShadow: "0 2px 16px rgba(59,36,18,0.06)", marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#3B2412", lineHeight: 1.7 }}>{pkg.desc}</p>
      </div>

      {/* What's Included */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", boxShadow: "0 2px 16px rgba(59,36,18,0.06)", marginBottom: 16 }}>
        <h3 style={{ margin: "0 0 18px", fontSize: 18, color: "#3B2412", fontFamily: "'Playfair Display',Georgia,serif" }}>What's Included</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pkg.includes.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "linear-gradient(135deg,rgba(196,148,74,0.15),rgba(212,175,55,0.1))",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ color: "#C4944A", fontSize: 14, fontWeight: 700 }}>✓</span>
              </div>
              <span style={{ fontSize: 14, color: "#3B2412", fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Experience */}
      <div style={{ background: "linear-gradient(135deg,#3B2412,#5C3A1E)", borderRadius: 16, padding: "24px 28px", marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 18, color: "#F5E6C8", fontFamily: "'Playfair Display',Georgia,serif" }}>The Experience</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["📍", "Choose any of our stunning venues — Beach, Lagoon, or Rooftop"],
            ["📋", "Full event coordination from start to finish"],
            ["🕐", "1.5 hours private setup"],
            ["🥂", "Complimentary celebratory drinks"],
            ["🌅", "Timed to golden hour for the most magical lighting"],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontSize: 13, color: "rgba(245,230,200,0.85)", lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function carouselBtn(side) {
  return {
    position: "absolute", top: "50%",
    [side === "left" ? "left" : "right"]: 12,
    transform: "translateY(-50%)",
    width: 40, height: 40, borderRadius: "50%", border: "none",
    background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 20,
    cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", backdropFilter: "blur(4px)",
  };
}
