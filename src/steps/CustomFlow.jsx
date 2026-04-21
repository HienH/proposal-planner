import {
  VENUES, CENTERPIECES, ACTIVITIES, FLOWERS, STRUCTURES,
  STRUCTURE_NEON_MESSAGES, SPARKLER_PRICES, SPARKLER_MAX,
  ADDONS, SOCIAL_PROOF, IMG,
} from "../data";
import { fmt, btnMain, btnBack } from "../utils";
import {
  SectionTitle, SocialProofCard, VenueCard,
  AddonSection, InstrumentPicker, DroneAddon, renderDesc,
} from "../components/ui";
import ReviewStep from "./ReviewStep";

export default function CustomFlow({ state }) {
  const {
    step, anim, go, goToStep, setPlanMode, setPreview,
    venue, selectVenue,
    centerpieces, toggleCenterpiece,
    flowers, toggleFlower, flowerQtys, adjustFlowerQty,
    structures, toggleStructure, structureNeonMsg, setStructureNeonMsg,
    sparklerQty, setSparklerQty,
    addons, toggleAddon,
    soloInstrument, setSoloInstrument,
    wow, toggleWow,
    total, frozenMatches, carouselIdx, setCarouselIdx,
    getExtras, getUpsells, showToast,
    // Contact form props
    contactEmail, setContactEmail, contactPhone, setContactPhone,
    countryCode, setCountryCode, proposalDate, setProposalDate,
    partnerName, setPartnerName, inquiryReady,
    buildMsg, buildEmailSubject,
    showSave, setShowSave, planSaved,
  } = state;

  // Step 2: Venue
  if (step === 2) {
    return (
      <div style={anim}>
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
          <button
            onClick={() => goToStep(1, () => setPlanMode(null))}
            style={{
              background: "none", border: "none", color: "#B0A090",
              fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0,
            }}
          >
            ← Change path
          </button>
        </div>
        <SectionTitle
          title="Choose Your Setting"
          subtitle="Every location includes a cocktail table and sparkling wine. Each venue has its own unique inclusions — see details below."
        />
        <div className="venue-grid" style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {VENUES.map((v) => (
            <VenueCard
              key={v.id}
              venue={v}
              selected={venue}
              onSelect={selectVenue}
              onPreview={(img, name) => setPreview({ img, name })}
            />
          ))}
        </div>
        {/* <SocialProofCard data={SOCIAL_PROOF.venue} /> */}
      </div>
    );
  }

  // Step 3: Statement Props
  if (step === 3) {
    return (
      <div style={anim}>
        <SectionTitle
          title="Choose Your Statement Prop"
          subtitle="This is the moment they'll replay forever. At least one statement prop is required."
        />

        <div className="item-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
          <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: -2, marginTop: 4, textTransform: "uppercase", letterSpacing: 2, gridColumn: "1 / -1" }}>
            Decoratives
          </h3>
          {CENTERPIECES.map((item) => (
            <ToggleItem key={item.id} item={item} selected={centerpieces.includes(item.id)} onToggle={() => toggleCenterpiece(item.id)} />
          ))}

          <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: -2, marginTop: 16, textTransform: "uppercase", letterSpacing: 2, gridColumn: "1 / -1" }}>
            Activities
          </h3>
          {ACTIVITIES.map((item) => (
            <ToggleItem key={item.id} item={item} selected={centerpieces.includes(item.id)} onToggle={() => toggleCenterpiece(item.id)} />
          ))}
        </div>

        {/* <SocialProofCard data={SOCIAL_PROOF.centerpiece} /> */}
      </div>
    );
  }

  // Step 4: Flowers
  if (step === 4) {
    return (
      <div style={anim}>
        <SectionTitle title="Flowers & Roses" subtitle="Add romantic floral touches to your setup. Select as many as you like, or skip." />
        <div className="item-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
          {FLOWERS.map((item) => {
            const sel = flowers.includes(item.id);
            const isQty = !!item.qty;
            const qty = flowerQtys[item.id] || item.unitMin;
            const price = isQty ? (sel ? qty * item.pricePerUnit : item.unitMin * item.pricePerUnit) : item.price;

            return (
              <div
                key={item.id}
                onClick={() => { if (!isQty || !sel) toggleFlower(item.id); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                  borderRadius: 14, cursor: "pointer",
                  background: sel ? "rgba(196,148,74,0.08)" : "#fff",
                  border: sel ? "2px solid #C4944A" : "2px solid #EDE8E0",
                  transition: "all 0.25s ease", position: "relative",
                }}
              >
                {item.badge && !sel && (
                  <div style={{
                    position: "absolute", top: -8, right: 12,
                    background: "#C4944A", color: "#fff", padding: "2px 8px",
                    borderRadius: 8, fontSize: 9, fontWeight: 700,
                  }}>
                    {item.badge}
                  </div>
                )}
                <div style={{
                  width: 60, height: 60, borderRadius: 12, flexShrink: 0,
                  backgroundImage: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "center",
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#3B2412" }}>
                      {isQty && sel
                        ? (item.perBundle
                          ? `${qty} ${qty === 1 ? "bundle" : "bundles"} (${qty * item.perBundle} ${item.bundleUnit || "arrangements"})`
                          : `${qty} ${item.name}`)
                        : item.name}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
                      {fmt(price)}
                    </span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8B7355", lineHeight: 1.4 }}>{renderDesc(item.desc)}</p>
                  {isQty && sel && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          const next = qty - item.unitStep;
                          if (next < item.unitMin) toggleFlower(item.id);
                          else adjustFlowerQty(item.id, -item.unitStep);
                        }}
                        style={{
                          width: 32, height: 32, borderRadius: "50%", border: "2px solid #C4944A",
                          background: "transparent", color: "#C4944A", fontSize: 18, fontWeight: 700,
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#3B2412", minWidth: 36, textAlign: "center" }}>{qty}</span>
                      <button
                        onClick={() => adjustFlowerQty(item.id, item.unitStep)}
                        style={{
                          width: 32, height: 32, borderRadius: "50%", border: "none",
                          background: "#C4944A", color: "#fff", fontSize: 18, fontWeight: 700,
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
                {!isQty && <Checkbox checked={sel} />}
                {isQty && !sel && <Checkbox checked={false} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Step 5: Enhancements (sparklers + structures)
  if (step === 5) {
    return (
      <div style={anim}>
        <SectionTitle
          title="Setup Enhancements"
          subtitle="Add sparklers and structures to elevate your proposal. Select as many as you like, or skip."
        />

        <div className="enhancements-col">
        {/* Sparklers */}
        <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: 10, marginTop: 4, textTransform: "uppercase", letterSpacing: 2 }}>
          Sparklers
        </h3>
        <div
          onClick={() => { if (sparklerQty === 0) setSparklerQty(2); }}
          style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
            borderRadius: 14, cursor: "pointer",
            background: sparklerQty > 0 ? "rgba(196,148,74,0.08)" : "#fff",
            border: sparklerQty > 0 ? "2px solid #C4944A" : "2px solid #EDE8E0",
            transition: "all 0.25s ease",
          }}
        >
          <div style={{
            width: 60, height: 60, borderRadius: 12, flexShrink: 0,
            backgroundImage: `url(${IMG.sparklers2})`, backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#3B2412" }}>
                {sparklerQty > 0 ? `${sparklerQty} Fountain Sparklers` : "Fountain Sparklers"}
              </span>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
                {sparklerQty > 0 ? fmt(SPARKLER_PRICES[sparklerQty]) : fmt(SPARKLER_PRICES[2])}
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8B7355", lineHeight: 1.4 }}>
              Cold sparkler fountains — a dramatic WOW moment
            </p>
            {sparklerQty > 0 && sparklerQty < SPARKLER_MAX && (
              <p style={{ margin: "2px 0 0", fontSize: 10, color: "#B0A090", lineHeight: 1.4 }}>
                +2 more: +{fmt(SPARKLER_PRICES[sparklerQty + 2] - SPARKLER_PRICES[sparklerQty])}
              </p>
            )}
            {sparklerQty > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }} onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSparklerQty((q) => q - 2)}
                  style={{
                    width: 32, height: 32, borderRadius: "50%", border: "2px solid #C4944A",
                    background: "transparent", color: "#C4944A", fontSize: 18, fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#3B2412", minWidth: 36, textAlign: "center" }}>
                  {sparklerQty}
                </span>
                <button
                  onClick={() => setSparklerQty((q) => Math.min(SPARKLER_MAX, q + 2))}
                  disabled={sparklerQty === SPARKLER_MAX}
                  style={{
                    width: 32, height: 32, borderRadius: "50%", border: "none",
                    background: sparklerQty === SPARKLER_MAX ? "#EDE8E0" : "#C4944A",
                    color: sparklerQty === SPARKLER_MAX ? "#B0A090" : "#fff",
                    fontSize: 18, fontWeight: 700,
                    cursor: sparklerQty === SPARKLER_MAX ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
          {sparklerQty === 0 && <Checkbox checked={false} />}
        </div>

        {/* Structures */}
        <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: 10, marginTop: 24, textTransform: "uppercase", letterSpacing: 2 }}>
          Structures
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STRUCTURES.map((item) => (
            <div key={item.id}>
              <ToggleItem item={item} selected={structures.includes(item.id)} onToggle={() => toggleStructure(item.id)} />
              {item.id === "structure-neon" && structures.includes("structure-neon") && (
                <div style={{
                  marginTop: 8, padding: "16px 20px", background: "rgba(196,148,74,0.07)",
                  borderRadius: 14, marginLeft: 4, marginRight: 4,
                }}>
                  <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: "#3B2412" }}>Choose your message:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {STRUCTURE_NEON_MESSAGES.map((msg) => (
                      <button
                        key={msg}
                        onClick={() => setStructureNeonMsg(msg)}
                        style={{
                          padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                          background: structureNeonMsg === msg ? "#C4944A" : "#F5E6C8",
                          color: structureNeonMsg === msg ? "#fff" : "#3B2412",
                          fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                        }}
                      >
                        "{msg}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {structures.includes("structure-neon") && !structureNeonMsg && (
          <div style={{
            textAlign: "center", marginTop: 20, padding: "10px 16px",
            background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 10,
            fontSize: 13, color: "#8B6914", fontWeight: 600,
          }}>
            Please select a message for your Neon Sign above
          </div>
        )}
        </div>
      </div>
    );
  }

  // Step 6: Addons
  if (step === 6) {
    return (
      <div style={anim}>
        <SectionTitle title="Capture & Music" subtitle="Add photography, video, or live music. Everything here is optional." />
        {/* <SocialProofCard data={SOCIAL_PROOF.addons} /> */}
        <div className="addons-grid" style={{ maxWidth: 500, margin: "0 auto" }}>
          <AddonSection
            title="📸 Capture the Moment"
            items={ADDONS.capture.filter((a) => a.id !== "drone")}
            selected={addons}
            onToggle={toggleAddon}
            popularIds={["photo-30", "video-30"]}
            renderExtra={(item) => {
              const showUnder = addons.includes("video-30") ? "video-30" : "video-60";
              return item.id === showUnder
                ? <DroneAddon selected={addons.includes("drone")} onToggle={() => toggleAddon("drone")} />
                : null;
            }}
          />
          <AddonSection
            title="🎵 Live Music"
            items={ADDONS.music}
            selected={addons}
            onToggle={toggleAddon}
            popularIds={["solo-musician"]}
            renderExtra={(item) =>
              item.id === "solo-musician"
                ? <InstrumentPicker selected={soloInstrument} onSelect={setSoloInstrument} />
                : null
            }
          />
          {addons.includes("solo-musician") && !soloInstrument && (
            <div style={{
              textAlign: "center", marginTop: 4, padding: "10px 16px",
              background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 10,
              fontSize: 13, color: "#8B6914", fontWeight: 600,
            }}>
              Please pick an instrument for your Solo Musician above
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 7: Review
  if (step === 7) {
    return <ReviewStep state={state} />;
  }

  return null;
}

// --- Shared helper components ---

function ToggleItem({ item, selected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
        borderRadius: 14, cursor: "pointer",
        background: selected ? "rgba(196,148,74,0.08)" : "#fff",
        border: selected ? "2px solid #C4944A" : "2px solid #EDE8E0",
        transition: "all 0.25s ease", position: "relative",
      }}
    >
      {item.badge && !selected && (
        <div style={{
          position: "absolute", top: -8, right: 12,
          background: "#C4944A", color: "#fff", padding: "2px 8px",
          borderRadius: 8, fontSize: 9, fontWeight: 700,
        }}>
          {item.badge}
        </div>
      )}
      <div style={{
        width: 60, height: 60, borderRadius: 12, flexShrink: 0,
        backgroundImage: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#3B2412" }}>{item.name}</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: item.price === 0 ? "#2D5016" : "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
            {item.price === 0 ? "Free" : fmt(item.price)}
          </span>
        </div>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8B7355", lineHeight: 1.4 }}>{renderDesc(item.desc)}</p>
      </div>
      <Checkbox checked={selected} />
    </div>
  );
}

function Checkbox({ checked }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: 6, flexShrink: 0,
      border: checked ? "none" : "2px solid #D4C5B0",
      background: checked ? "#C4944A" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s", color: "#fff", fontSize: 14, fontWeight: 700,
    }}>
      {checked ? "✓" : ""}
    </div>
  );
}

