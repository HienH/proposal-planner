import { Fragment } from "react";
import {
  VENUES, CENTERPIECES, ACTIVITIES, FLOWERS, STRUCTURES,
  SPARKLER_PRICES, SPARKLER_MAX,
  ADDONS, SOCIAL_PROOF, IMG,
} from "../data";
import { fmt, btnMain, btnBack } from "../utils";
import {
  SectionTitle, SocialProofCard, VenueCard,
  AddonSection, InstrumentPicker, DroneAddon, NeonSignAddon, NeonMessagePicker, StructureFlowerPicker, GiantFrameStructurePicker, renderDesc,
} from "../components/ui";
import ReviewStep from "./ReviewStep";
import useT from "../i18n/useT";

export default function CustomFlow({ state }) {
  const { t, tCatalog } = useT();
  const {
    step, anim, go, goToStep, setPlanMode, setPreview,
    venue, selectVenue,
    centerpieces, toggleCenterpiece,
    flowers, toggleFlower, flowerQtys, adjustFlowerQty,
    structures, toggleStructure, structureNeonMsg, setStructureNeonMsg,
    giantFrameNeonMsg, setGiantFrameNeonMsg,
    giantFrameStructure, setGiantFrameStructure,
    structureFlowerQtys, adjustStructureFlowerQty,
    showPicnicEnhancements, setShowPicnicEnhancements,
    showDinnerEnhancements, setShowDinnerEnhancements,
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
            ← {t("custom.changePath")}
          </button>
        </div>
        <SectionTitle
          title={t("custom.venue.title")}
          subtitle={t("custom.venue.subtitle")}
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
          title={t("custom.centerpiece.title")}
          subtitle={t("custom.centerpiece.subtitle")}
        />

        <div className="item-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
          <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: -2, marginTop: 4, textTransform: "uppercase", letterSpacing: 2, gridColumn: "1 / -1" }}>
            {t("custom.centerpiece.decoratives")}
          </h3>
          {CENTERPIECES.map((item) => {
            if (item.id === "giant-frame-neon") {
              const sel = centerpieces.includes(item.id);
              const pickedOpt = item.structureOptions?.find((o) => o.id === giantFrameStructure);
              const displayItem = pickedOpt
                ? { ...item, price: item.price + (pickedOpt.uplift || 0), priceFrom: false }
                : item;
              return (
                <Fragment key={item.id}>
                  <ToggleItem item={displayItem} selected={sel} onToggle={() => toggleCenterpiece(item.id)} />
                  {sel && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <GiantFrameStructurePicker
                        options={item.structureOptions}
                        selected={giantFrameStructure}
                        onSelect={setGiantFrameStructure}
                      />
                      <NeonMessagePicker selected={giantFrameNeonMsg} onSelect={setGiantFrameNeonMsg} />
                    </div>
                  )}
                </Fragment>
              );
            }
            return (
              <ToggleItem key={item.id} item={item} selected={centerpieces.includes(item.id)} onToggle={() => toggleCenterpiece(item.id)} />
            );
          })}

          <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: -2, marginTop: 16, textTransform: "uppercase", letterSpacing: 2, gridColumn: "1 / -1" }}>
            {t("custom.centerpiece.activities")}
          </h3>
          {ACTIVITIES.map((item) => {
            if (item.id === "dinner") {
              const sel = centerpieces.includes(item.id);
              return (
                <Fragment key={item.id}>
                  <ToggleItem item={item} selected={sel} onToggle={() => toggleCenterpiece(item.id)} />
                  {sel && !showDinnerEnhancements && (
                    <div style={{
                      gridColumn: "1 / -1",
                      padding: "16px 18px",
                      background: "linear-gradient(135deg,rgba(212,175,55,0.08),rgba(196,148,74,0.12))",
                      borderRadius: 12, borderLeft: "3px solid #D4AF37",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      flexWrap: "wrap", gap: 12,
                    }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#3B2412", fontFamily: "'Playfair Display',Georgia,serif" }}>
                          {t("custom.enhancements.dinnerPrompt")}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B5744", marginTop: 2 }}>
                          {t("custom.enhancements.body")}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => setShowDinnerEnhancements(true)}
                          style={{
                            padding: "8px 18px", borderRadius: 20, border: "none",
                            cursor: "pointer", background: "#C4944A", color: "#fff",
                            fontSize: 13, fontWeight: 600,
                          }}
                        >
                          {t("common.yes")}
                        </button>
                        <button
                          onClick={() => setShowDinnerEnhancements(false)}
                          style={{
                            padding: "8px 18px", borderRadius: 20,
                            cursor: "pointer", background: "transparent",
                            border: "1px solid #C4944A", color: "#C4944A",
                            fontSize: 13, fontWeight: 600,
                          }}
                        >
                          {t("common.no")}
                        </button>
                      </div>
                    </div>
                  )}
                  {sel && showDinnerEnhancements && (
                    <div style={{
                      gridColumn: "1 / -1",
                      padding: "12px 14px",
                      background: "rgba(196,148,74,0.05)",
                      borderRadius: 12, borderLeft: "3px solid #D4AF37",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <h3 style={{ fontSize: 11, color: "#C4944A", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: 1.5 }}>
                          {t("custom.enhancements.dinnerHeading")}
                        </h3>
                        <button
                          onClick={() => setShowDinnerEnhancements(false)}
                          style={{
                            background: "none", border: "none", color: "#B0A090",
                            fontSize: 11, fontWeight: 600, cursor: "pointer", padding: 0,
                          }}
                        >
                          {t("common.hide")}
                        </button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {STRUCTURES.filter((s) => s.id === "wooden-frame" || s.id === "gazebo-structure").map((s) => {
                          const isSelected = structures.includes(s.id);
                          const neonSelected = structures.includes("structure-neon");
                          return (
                            <div key={s.id}>
                              <div
                                onClick={() => toggleStructure(s.id)}
                                style={{
                                  display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                                  borderRadius: 10, cursor: "pointer",
                                  background: isSelected ? "rgba(196,148,74,0.12)" : "#fff",
                                  border: isSelected ? "1.5px solid #C4944A" : "1.5px solid #EDE8E0",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <div style={{
                                  width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                                  backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center",
                                }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontWeight: 600, fontSize: 13, color: "#3B2412" }}>{tCatalog("structures", s.id, "name", s.name)}</span>
                                    <span style={{ fontWeight: 700, fontSize: 13, color: "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
                                      {fmt(s.price)}
                                    </span>
                                  </div>
                                </div>
                                <div style={{
                                  width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                                  border: isSelected ? "none" : "1.5px solid #D4C5B0",
                                  background: isSelected ? "#C4944A" : "transparent",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  color: "#fff", fontSize: 11, fontWeight: 700,
                                }}>
                                  {isSelected ? "✓" : ""}
                                </div>
                              </div>
                              {isSelected && (
                                <>
                                  <NeonSignAddon
                                    selected={neonSelected}
                                    onToggle={() => toggleStructure("structure-neon")}
                                  />
                                  {neonSelected && (
                                    <NeonMessagePicker selected={structureNeonMsg} onSelect={setStructureNeonMsg} />
                                  )}
                                  <StructureFlowerPicker
                                    qty={structureFlowerQtys[s.id] || 0}
                                    onAdjust={(delta) => adjustStructureFlowerQty(s.id, delta)}
                                  />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {structures.includes("structure-neon") && !structureNeonMsg && (
                        <div style={{
                          textAlign: "center", marginTop: 10, padding: "8px 12px",
                          background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 8,
                          fontSize: 12, color: "#8B6914", fontWeight: 600,
                        }}>
                          {t("custom.hints.pickNeonMsg")}
                        </div>
                      )}
                    </div>
                  )}
                </Fragment>
              );
            }
            if (item.id === "picnic") {
              const sel = centerpieces.includes(item.id);
              return (
                <Fragment key={item.id}>
                  <ToggleItem item={item} selected={sel} onToggle={() => toggleCenterpiece(item.id)} />
                  {sel && !showPicnicEnhancements && (
                    <div style={{
                      gridColumn: "1 / -1",
                      padding: "16px 18px",
                      background: "linear-gradient(135deg,rgba(212,175,55,0.08),rgba(196,148,74,0.12))",
                      borderRadius: 12, borderLeft: "3px solid #D4AF37",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      flexWrap: "wrap", gap: 12,
                    }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#3B2412", fontFamily: "'Playfair Display',Georgia,serif" }}>
                          {t("custom.enhancements.picnicPrompt")}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B5744", marginTop: 2 }}>
                          {t("custom.enhancements.body")}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => setShowPicnicEnhancements(true)}
                          style={{
                            padding: "8px 18px", borderRadius: 20, border: "none",
                            cursor: "pointer", background: "#C4944A", color: "#fff",
                            fontSize: 13, fontWeight: 600,
                          }}
                        >
                          {t("common.yes")}
                        </button>
                        <button
                          onClick={() => setShowPicnicEnhancements(false)}
                          style={{
                            padding: "8px 18px", borderRadius: 20,
                            cursor: "pointer", background: "transparent",
                            border: "1px solid #C4944A", color: "#C4944A",
                            fontSize: 13, fontWeight: 600,
                          }}
                        >
                          {t("common.no")}
                        </button>
                      </div>
                    </div>
                  )}
                  {sel && showPicnicEnhancements && (
                    <div style={{
                      gridColumn: "1 / -1",
                      padding: "12px 14px",
                      background: "rgba(196,148,74,0.05)",
                      borderRadius: 12, borderLeft: "3px solid #D4AF37",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <h3 style={{ fontSize: 11, color: "#C4944A", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: 1.5 }}>
                          {t("custom.enhancements.picnicHeading")}
                        </h3>
                        <button
                          onClick={() => setShowPicnicEnhancements(false)}
                          style={{
                            background: "none", border: "none", color: "#B0A090",
                            fontSize: 11, fontWeight: 600, cursor: "pointer", padding: 0,
                          }}
                        >
                          {t("common.hide")}
                        </button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {STRUCTURES.filter((s) => s.id === "gazebo-structure" || s.id === "metal-structure").map((s) => {
                          const isSelected = structures.includes(s.id);
                          const neonSelected = structures.includes("structure-neon");
                          return (
                            <div key={s.id}>
                              <div
                                onClick={() => toggleStructure(s.id)}
                                style={{
                                  display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                                  borderRadius: 10, cursor: "pointer",
                                  background: isSelected ? "rgba(196,148,74,0.12)" : "#fff",
                                  border: isSelected ? "1.5px solid #C4944A" : "1.5px solid #EDE8E0",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <div style={{
                                  width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                                  backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center",
                                }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontWeight: 600, fontSize: 13, color: "#3B2412" }}>{tCatalog("structures", s.id, "name", s.name)}</span>
                                    <span style={{ fontWeight: 700, fontSize: 13, color: "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
                                      {fmt(s.price)}
                                    </span>
                                  </div>
                                </div>
                                <div style={{
                                  width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                                  border: isSelected ? "none" : "1.5px solid #D4C5B0",
                                  background: isSelected ? "#C4944A" : "transparent",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  color: "#fff", fontSize: 11, fontWeight: 700,
                                }}>
                                  {isSelected ? "✓" : ""}
                                </div>
                              </div>
                              {isSelected && (
                                <>
                                  <NeonSignAddon
                                    selected={neonSelected}
                                    onToggle={() => toggleStructure("structure-neon")}
                                  />
                                  {neonSelected && (
                                    <NeonMessagePicker selected={structureNeonMsg} onSelect={setStructureNeonMsg} />
                                  )}
                                  <StructureFlowerPicker
                                    qty={structureFlowerQtys[s.id] || 0}
                                    onAdjust={(delta) => adjustStructureFlowerQty(s.id, delta)}
                                  />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {structures.includes("structure-neon") && !structureNeonMsg && (
                        <div style={{
                          textAlign: "center", marginTop: 10, padding: "8px 12px",
                          background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 8,
                          fontSize: 12, color: "#8B6914", fontWeight: 600,
                        }}>
                          {t("custom.hints.pickNeonMsg")}
                        </div>
                      )}
                    </div>
                  )}
                </Fragment>
              );
            }
            return (
              <ToggleItem key={item.id} item={item} selected={centerpieces.includes(item.id)} onToggle={() => toggleCenterpiece(item.id)} />
            );
          })}
        </div>

        {centerpieces.includes("giant-frame-neon") && !giantFrameStructure && (
          <div style={{
            textAlign: "center", marginTop: 20, padding: "10px 16px",
            background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 10,
            fontSize: 13, color: "#8B6914", fontWeight: 600,
          }}>
            {t("custom.hints.pickStructureStyle")}
          </div>
        )}
        {centerpieces.includes("giant-frame-neon") && !giantFrameNeonMsg && (
          <div style={{
            textAlign: "center", marginTop: 12, padding: "10px 16px",
            background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 10,
            fontSize: 13, color: "#8B6914", fontWeight: 600,
          }}>
            {t("custom.hints.pickGiantFrameMsg")}
          </div>
        )}

        {/* <SocialProofCard data={SOCIAL_PROOF.centerpiece} /> */}
      </div>
    );
  }

  // Step 4: Flowers & Enhancements
  if (step === 4) {
    return (
      <div style={anim}>
        <SectionTitle title={t("custom.flowers.title")} subtitle={t("custom.flowers.subtitle")} />

        <div className="enhancements-col">
          {/* Sparklers — first */}
          <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: 10, marginTop: 4, textTransform: "uppercase", letterSpacing: 2 }}>
            {t("custom.flowers.sparklersHeading")}
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
                  {sparklerQty > 0 ? `${sparklerQty} ${t("custom.flowers.sparklersName")}` : t("custom.flowers.sparklersName")}
                </span>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
                  {sparklerQty > 0 ? fmt(SPARKLER_PRICES[sparklerQty]) : fmt(SPARKLER_PRICES[2])}
                </span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8B7355", lineHeight: 1.4 }}>
                {t("custom.flowers.sparklersDesc")}
              </p>
              {sparklerQty > 0 && sparklerQty < SPARKLER_MAX && (
                <p style={{ margin: "2px 0 0", fontSize: 10, color: "#B0A090", lineHeight: 1.4 }}>
                  {t("custom.flowers.sparklers2More", { price: fmt(SPARKLER_PRICES[sparklerQty + 2] - SPARKLER_PRICES[sparklerQty]) })}
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

          {/* Flowers */}
          <h3 style={{ fontSize: 12, color: "#C4944A", fontWeight: 700, marginBottom: 10, marginTop: 24, textTransform: "uppercase", letterSpacing: 2 }}>
            {t("custom.flowers.flowersHeading")}
          </h3>
        </div>
        <div className="item-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
          {FLOWERS.map((item) => {
            const sel = flowers.includes(item.id);
            const isQty = !!item.qty;
            const qty = flowerQtys[item.id] || item.unitMin;
            const price = isQty ? (sel ? qty * item.pricePerUnit : item.unitMin * item.pricePerUnit) : item.price;
            const displayName = tCatalog("flowers", item.id, "name", item.name);
            const displayDesc = tCatalog("flowers", item.id, "desc", item.desc);
            const displayBadge = item.badge ? tCatalog("badges", item.badge, null, item.badge) : null;
            const displayUnit = tCatalog("flowers", item.id, "bundleUnit", item.bundleUnit || t("custom.flowers.fallbackUnit"));

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
                    background: item.badge === "FIRST GIFT" ? "#C0392B" : "#C4944A", color: "#fff", padding: "2px 8px",
                    borderRadius: 8, fontSize: 9, fontWeight: 700,
                  }}>
                    {displayBadge}
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
                          ? `${displayName} (${qty * item.perBundle} ${displayUnit})`
                          : `${qty} ${displayName}`)
                        : displayName}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
                      {fmt(price)}
                    </span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8B7355", lineHeight: 1.4 }}>{renderDesc(displayDesc)}</p>
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

  // Step 5: Addons
  if (step === 5) {
    return (
      <div style={anim}>
        <SectionTitle title={t("custom.addons.title")} subtitle={t("custom.addons.subtitle")} />
        {/* <SocialProofCard data={SOCIAL_PROOF.addons} /> */}
        <div className="addons-grid" style={{ maxWidth: 500, margin: "0 auto" }}>
          <AddonSection
            title={`📸 ${t("custom.addons.captureHeading")}`}
            items={ADDONS.capture.filter((a) => a.id !== "drone")}
            selected={addons}
            onToggle={toggleAddon}
            popularIds={["photo-30", "video-30"]}
            collection="addons"
            renderExtra={(item) => {
              const showUnder = addons.includes("video-30") ? "video-30" : "video-60";
              return item.id === showUnder
                ? <DroneAddon selected={addons.includes("drone")} onToggle={() => toggleAddon("drone")} />
                : null;
            }}
          />
          <AddonSection
            title={`🎵 ${t("custom.addons.musicHeading")}`}
            items={ADDONS.music}
            selected={addons}
            onToggle={toggleAddon}
            popularIds={["solo-musician"]}
            collection="addons"
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
              {t("custom.hints.pickInstrument")}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 6: Review
  if (step === 6) {
    return <ReviewStep state={state} />;
  }

  return null;
}

// --- Shared helper components ---

function ToggleItem({ item, selected, onToggle }) {
  const { t, tCatalog } = useT();
  // try centerpieces first, then activities — same lookup pattern, cheap
  const displayName = tCatalog("centerpieces", item.id, "name", null) ?? tCatalog("activities", item.id, "name", item.name);
  const displayDesc = tCatalog("centerpieces", item.id, "desc", null) ?? tCatalog("activities", item.id, "desc", item.desc);
  const displayBadge = item.badge ? tCatalog("badges", item.badge, null, item.badge) : null;
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
          {displayBadge}
        </div>
      )}
      <div style={{
        width: 60, height: 60, borderRadius: 12, flexShrink: 0,
        backgroundImage: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#3B2412" }}>{displayName}</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: item.price === 0 ? "#2D5016" : "#C4944A", whiteSpace: "nowrap", marginLeft: 8 }}>
            {item.price === 0 ? t("common.free") : item.priceFrom ? `${t("common.from")} ${fmt(item.price)}` : fmt(item.price)}
          </span>
        </div>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8B7355", lineHeight: 1.4 }}>{renderDesc(displayDesc)}</p>
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

