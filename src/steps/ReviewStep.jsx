import {
  VENUES, CENTERPIECES, ACTIVITIES, FLOWERS, STRUCTURES,
  WOW, SPARKLER_PRICES, ADDONS, PACKAGES, SOLO_INSTRUMENTS,
  structureFlowerCost,
} from "../data";
import { fmt } from "../utils";
import { SectionTitle, SummaryItem } from "../components/ui";
import ContactForm from "../components/ContactForm";
import useT from "../i18n/useT";

export default function ReviewStep({ state }) {
  const { t } = useT();
  const {
    anim, go, planMode, total, addons, toggleAddon,
    contactEmail, setContactEmail, contactPhone, setContactPhone,
    countryCode, setCountryCode,
    travelStart, setTravelStart, travelEnd, setTravelEnd,
    proposalDate, setProposalDate,
    partnerName, setPartnerName, inquiryReady,
    buildMsg, buildEmailSubject,
    showSave, setShowSave, planSaved, startOver,
  } = state;

  return (
    <div style={anim}>
      <style>{`
        .review-back-btn{display:none;}
        @media(min-width:768px){
          .review-back-btn{
            display:inline-flex;align-items:center;gap:6px;
            padding:8px 16px;border-radius:20px;
            border:1px solid #D4C5B0;background:transparent;
            color:#8B7355;font-size:13px;font-weight:600;
            cursor:pointer;font-family:inherit;
            margin-bottom:12px;transition:all 0.2s;
          }
          .review-back-btn:hover{background:rgba(196,148,74,0.06);border-color:#C4944A;color:#C4944A;}
        }
      `}</style>
      <button className="review-back-btn" onClick={() => go(-1)}>← {t("common.back")}</button>
      <SectionTitle title={t("review.title")} />

      <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(59,36,18,0.08)" }}>
        {/* Total banner */}
        <div style={{ padding: "24px 28px 36px", textAlign: "center", background: "linear-gradient(135deg,#3B2412,#5C3A1E)" }}>
          <div style={{ fontSize: 11, color: "rgba(245,230,200,0.6)", fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>{t("review.estimatedTotal")}</div>
          <div style={{ fontSize: 52, fontWeight: 700, color: "#F5E6C8", fontFamily: "'Playfair Display',Georgia,serif" }}>{fmt(total)}</div>
        </div>

        {/* Floating retainer pill */}
        <div style={{
          margin: "-17px 57px 0px", padding: "8px 14px",
          background: "#fff", borderRadius: 37,
          boxShadow: "0 2px 10px rgba(59,36,18,0.08)",
          border: "1px solid #F0E6D0",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#3B2412", marginBottom: 6 }}>
            {t("review.reserveFrom")}{" "}
            <span style={{ color: "#C4944A", fontSize: 16, fontFamily: "'Playfair Display',Georgia,serif" }}>
              {fmt(total * 0.2)}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#6B5744", fontWeight: 600 }}>
            Zelle <span style={{ color: "#B0A090", margin: "0 4px" }}>·</span>
            Venmo <span style={{ color: "#B0A090", margin: "0 4px" }}>·</span>
            Wise <span style={{ color: "#B0A090", margin: "0 4px" }}>·</span>
            PayPal
          </div>
        </div>

        {/* Flow-specific line items */}
        {planMode === "custom" ? <CustomLineItems state={state} /> : <PremadeLineItems state={state} />}

        {/* Golden hour tip (custom only) */}
        {planMode === "custom" && (
          <div style={{
            margin: "0 28px 16px", padding: "16px 18px",
            background: "linear-gradient(135deg,rgba(212,175,55,0.08),rgba(196,148,74,0.12))",
            borderRadius: 12, borderLeft: "3px solid #D4AF37",
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <div style={{ fontSize: 20, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>🌅</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#3B2412", marginBottom: 4, fontFamily: "'Playfair Display',Georgia,serif" }}>
                {t("review.goldenHourTitle")}
              </div>
              <div style={{ fontSize: 13, color: "#6B5744", lineHeight: 1.5 }}>
                {t("review.goldenHourBody")}
              </div>
            </div>
          </div>
        )}

        {/* Photo upsell */}
        {!addons.some((a) => ["photo-30", "photo-60"].includes(a)) && (
          <div style={{ margin: "0 28px 16px", padding: "14px 16px", background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 10 }}>
            <div style={{ fontSize: 13, color: "#8B6914", fontWeight: 600 }}>
              {t("review.photoUpsell.headline")}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => toggleAddon("photo-30")} style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", background: "#C4944A", color: "#fff", fontSize: 12, fontWeight: 600 }}>
                + {t("review.photoUpsell.add30")}
              </button>
              <button onClick={() => toggleAddon("photo-60")} style={{ padding: "8px 16px", borderRadius: 20, cursor: "pointer", background: "transparent", border: "1px solid #C4944A", color: "#C4944A", fontSize: 12, fontWeight: 600 }}>
                + {t("review.photoUpsell.add60")}
              </button>
            </div>
          </div>
        )}

        {/* Contact form */}
        <ContactForm
          contactEmail={contactEmail} setContactEmail={setContactEmail}
          contactPhone={contactPhone} setContactPhone={setContactPhone}
          countryCode={countryCode} setCountryCode={setCountryCode}
          travelStart={travelStart} setTravelStart={setTravelStart}
          travelEnd={travelEnd} setTravelEnd={setTravelEnd}
          proposalDate={proposalDate} setProposalDate={setProposalDate}
          partnerName={partnerName} setPartnerName={setPartnerName}
          inquiryReady={inquiryReady}
          buildMsg={buildMsg} buildEmailSubject={buildEmailSubject}
          showSave={showSave} setShowSave={setShowSave}
          planSaved={planSaved}
          goBack={() => go(-1)}
          startOver={startOver}
        />
      </div>

      {/* Flow-specific top section — its own card, tight gap above */}
      <div style={{ marginTop: 8, background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(59,36,18,0.08)" }}>
        {planMode === "custom" ? <CustomTop state={state} /> : <PremadeTop state={state} />}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 24, padding: "16px 20px", background: "#FFF8EE", borderRadius: 12, border: "1px solid #F0E6D0", textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#8B6914", fontWeight: 700, marginBottom: 6 }}>
          {t("review.footer.retainerHeadline")}
        </div>
        <div style={{ fontSize: 12, color: "#6B5744", lineHeight: 1.5 }}>
          {t("review.footer.retainerBody")}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
        {[
          t("review.footer.trust.noFees"),
          t("review.footer.trust.experience"),
          t("review.footer.trust.responsive"),
        ].map((label) => (
          <span key={label} style={{ fontSize: 12, color: "#B0A090", fontWeight: 500 }}>✓ {label}</span>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 11, color: "#C4B8A8", marginTop: 12, lineHeight: 1.5, maxWidth: 440, margin: "12px auto 0" }}>
        {t("review.footer.disclaimer")}
      </p>
    </div>
  );
}

// --- Custom: portfolio carousel + upsells ---

function CustomTop({ state }) {
  const {
    venue, frozenMatches, carouselIdx, setCarouselIdx,
    getExtras, getUpsells, setPreview, showToast,
    centerpieces, toggleCenterpiece, flowers, toggleFlower,
    wow, toggleWow, sparklerQty, setSparklerQty,
  } = state;
  const { t, tCatalog } = useT();

  const matches = frozenMatches;
  const fallbackImg = VENUES.find((v) => v.id === venue)?.img;
  const extras = matches[0] ? getExtras(matches[0]) : [];
  const idx = Math.min(carouselIdx, matches.length - 1);
  const current = matches[idx];
  const currentUpsells = current ? getUpsells(current) : [];
  const venueObj = VENUES.find((v) => v.id === venue);
  const venueName = venueObj ? tCatalog("venues", venueObj.id, "name", venueObj.name) : "";

  return (
    <>
      {/* Carousel header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px 0" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#3B2412", letterSpacing: 0.5 }}>
          {t("review.similarSetups")}
        </div>
        {matches.length > 1 && (
          <div style={{ fontSize: 12, color: "#B0A090", fontWeight: 600 }}>{idx + 1}/{matches.length}</div>
        )}
      </div>

      {/* Carousel slide */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {matches.length > 0 ? (
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setPreview({ img: current.img, name: t("review.similarSetupAlt", { n: idx + 1 }) })}
          >
            <div className="review-hero-img" style={{
              height: 320, backgroundImage: `url(${current.img})`,
              backgroundSize: "cover", backgroundPosition: "center",
              transition: "background-image 0.3s ease",
            }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.85))" }}>
              {currentUpsells.length > 0 ? (
                <div style={{ padding: "60px 16px 16px" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
                    {t("review.toMakeSimilar")}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {currentUpsells.map((item) => (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.type === "centerpiece") toggleCenterpiece(item.id);
                          else if (item.type === "flower") toggleFlower(item.id);
                          else if (item.type === "wow") toggleWow(item.id);
                          else if (item.type === "sparkler") {
                            const qty = parseInt(item.id.split("-")[1]);
                            setSparklerQty(qty);
                          }
                          showToast();
                        }}
                        style={{
                          padding: "8px 16px", borderRadius: 20,
                          border: "1.5px solid rgba(255,255,255,0.4)",
                          cursor: "pointer", background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(8px)", color: "#fff",
                          fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                        }}
                      >
                        + {item.name} {fmt(item.price)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ padding: "50px 16px 16px" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
                    {t("review.similarFromPortfolio")}
                  </div>
                  <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, fontFamily: "'Playfair Display',Georgia,serif", marginTop: 4 }}>
                    {venueName} · {t("review.sunset")}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <div className="review-hero-img" style={{ height: 320, backgroundImage: `url(${fallbackImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "50px 16px 16px", background: "linear-gradient(transparent,rgba(0,0,0,0.8))" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{t("review.yourSetup")}</div>
              <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, fontFamily: "'Playfair Display',Georgia,serif", marginTop: 4 }}>
                {venueName} · {t("review.sunset")}
              </div>
            </div>
          </div>
        )}

        {/* Arrows */}
        {matches.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setCarouselIdx((i) => (i - 1 + matches.length) % matches.length); }} style={arrowBtn("left")}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); setCarouselIdx((i) => (i + 1) % matches.length); }} style={arrowBtn("right")}>›</button>
          </>
        )}
      </div>

      {/* Dots */}
      {matches.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "12px 0" }}>
          {matches.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIdx(i)}
              style={{
                width: i === idx ? 24 : 8, height: 8, borderRadius: 4, border: "none",
                cursor: "pointer", background: i === idx ? "#C4944A" : "#E8E0D4",
                transition: "all 0.3s ease", padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Extras badges */}
      {extras.length > 0 && (
        <div style={{ padding: "14px 20px", background: "rgba(196,148,74,0.06)", borderBottom: "1px solid #F0EBE3" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#8B7355", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            {t("review.alsoInclude")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {extras.map((item) => (
              <span key={item.id} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(196,148,74,0.15)", color: "#6B5744",
                padding: "5px 12px", borderRadius: 14, fontSize: 12, fontWeight: 600,
              }}>
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// --- Premade: package hero ---

function PremadeTop({ state }) {
  const { selectedPackage } = state;
  const { tCatalog } = useT();
  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const displayName = pkg ? tCatalog("packages", pkg.id, "name", pkg.name) : "";
  const displayBadge = pkg?.badge ? tCatalog("badges", pkg.badge, null, pkg.badge) : "";

  return (
    <div className="review-hero-img" style={{ position: "relative", height: 320, backgroundImage: `url(${pkg?.imgs[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%,rgba(0,0,0,0.8))" }}>
        <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{displayBadge}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#FFF8EE", fontFamily: "'Playfair Display',Georgia,serif", marginTop: 4 }}>{displayName}</div>
        </div>
      </div>
    </div>
  );
}

// --- Custom: line items ---

function CustomLineItems({ state }) {
  const {
    venue, centerpieces, toggleCenterpiece,
    flowers, toggleFlower, flowerQtys,
    structures, toggleStructure, structureNeonMsg,
    giantFrameNeonMsg, giantFrameStructure,
    structureFlowerQtys, adjustStructureFlowerQty,
    wow, toggleWow, sparklerQty, setSparklerQty,
    addons, toggleAddon, soloInstrument,
  } = state;
  const { t, tCatalog } = useT();
  const venueObj = VENUES.find((v) => v.id === venue);
  const venueName = venueObj ? tCatalog("venues", venueObj.id, "name", venueObj.name) : "";

  return (
    <div style={{ padding: "20px 28px" }}>
      <SummaryItem
        label={t("review.summary.venue", { name: venueName })}
        price={venueObj?.price || 0}
        sub={t("review.summary.venueSub")}
      />
      {centerpieces.map((id) => {
        const item = CENTERPIECES.find((x) => x.id === id) || ACTIVITIES.find((x) => x.id === id);
        if (!item || item.id === "none") return null;
        const collection = CENTERPIECES.some((x) => x.id === id) ? "centerpieces" : "activities";
        const itemName = tCatalog(collection, item.id, "name", item.name);
        if (id === "giant-frame-neon") {
          const fq = structureFlowerQtys?.[id] || 0;
          const structObj = STRUCTURES.find((s) => s.id === giantFrameStructure);
          const structName = structObj ? tCatalog("structures", structObj.id, "name", structObj.name) : null;
          const neonMsgDisplay = giantFrameNeonMsg ? tCatalog("structureNeonMessages", giantFrameNeonMsg, null, giantFrameNeonMsg) : null;
          const pickedOpt = item.structureOptions?.find((o) => o.id === giantFrameStructure);
          const displayPrice = item.price + (pickedOpt?.uplift || 0);
          const subParts = [];
          if (structName) subParts.push(t("review.summary.structureLabel", { name: structName }));
          if (neonMsgDisplay) subParts.push(t("review.summary.messageLabel", { msg: neonMsgDisplay }));
          return (
            <div key={id}>
              <SummaryItem
                label={itemName}
                price={displayPrice}
                sub={subParts.length ? subParts.join(" · ") : null}
                onRemove={centerpieces.length > 1 ? () => toggleCenterpiece(id) : undefined}
              />
              {fq > 0 && (
                <SummaryItem
                  label={`↳ ${fq} ${fq > 1 ? t("review.summary.flowerArrPlural") : t("review.summary.flowerArrSingular")}`}
                  price={structureFlowerCost(fq)}
                  onRemove={() => adjustStructureFlowerQty(id, -fq)}
                />
              )}
            </div>
          );
        }
        return <SummaryItem key={id} label={itemName} price={item.price} onRemove={centerpieces.length > 1 ? () => toggleCenterpiece(id) : undefined} />;
      })}
      {flowers.map((id) => {
        const item = FLOWERS.find((x) => x.id === id);
        if (!item) return null;
        const itemName = tCatalog("flowers", item.id, "name", item.name);
        const itemUnit = tCatalog("flowers", item.id, "bundleUnit", item.bundleUnit || t("custom.flowers.fallbackUnit"));
        if (item.qty) {
          const q = flowerQtys[id] || item.unitMin;
          const lbl = item.perBundle
            ? `${itemName} (${q * item.perBundle} ${itemUnit})`
            : `${q} ${itemName}`;
          return <SummaryItem key={id} label={lbl} price={q * item.pricePerUnit} onRemove={() => toggleFlower(id)} />;
        }
        return <SummaryItem key={id} label={itemName} price={item.price} onRemove={() => toggleFlower(id)} />;
      })}
      {structures.map((id) => {
        const item = STRUCTURES.find((x) => x.id === id);
        if (!item) return null;
        const itemName = tCatalog("structures", item.id, "name", item.name);
        const fq = structureFlowerQtys?.[id] || 0;
        const neonMsgDisplay = structureNeonMsg ? tCatalog("structureNeonMessages", structureNeonMsg, null, structureNeonMsg) : null;
        return (
          <div key={id}>
            <SummaryItem label={itemName} price={item.price} sub={id === "structure-neon" && neonMsgDisplay ? t("review.summary.messageLabel", { msg: neonMsgDisplay }) : null} onRemove={() => toggleStructure(id)} />
            {fq > 0 && (
              <SummaryItem
                label={`↳ ${fq} ${fq > 1 ? t("review.summary.flowerArrPlural") : t("review.summary.flowerArrSingular")}`}
                price={structureFlowerCost(fq)}
                onRemove={() => adjustStructureFlowerQty(id, -fq)}
              />
            )}
          </div>
        );
      })}
      {sparklerQty > 0 && <SummaryItem label={`${t("custom.flowers.sparklersName")} x${sparklerQty}`} price={SPARKLER_PRICES[sparklerQty]} onRemove={() => setSparklerQty(0)} />}
      {wow.map((id) => {
        const item = WOW.find((x) => x.id === id);
        return item ? <SummaryItem key={id} label={item.name} price={item.price} onRemove={() => toggleWow(id)} /> : null;
      })}
      {addons.map((id) => {
        const all = [...ADDONS.music, ...ADDONS.capture];
        const item = all.find((x) => x.id === id);
        if (!item) return null;
        const itemName = tCatalog("addons", item.id, "name", item.name);
        const inst = id === "solo-musician" && soloInstrument
          ? SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument)
          : null;
        const instName = inst ? tCatalog("soloInstruments", inst.id, "name", inst.name) : null;
        return (
          <SummaryItem
            key={id}
            label={instName ? `${itemName} — ${instName}` : itemName}
            price={item.price}
            onRemove={() => toggleAddon(id)}
          />
        );
      })}
    </div>
  );
}

// --- Premade: line items ---

function PremadeLineItems({ state }) {
  const { selectedPackage, addons, toggleAddon, soloInstrument } = state;
  const { t, tCatalog } = useT();
  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const all = [...ADDONS.music, ...ADDONS.capture];
  const pkgName = pkg ? tCatalog("packages", pkg.id, "name", pkg.name) : "";
  const pkgDesc = pkg ? tCatalog("packages", pkg.id, "desc", pkg.desc) : "";
  const includesEs = pkg ? tCatalog("packages", pkg.id, "includes", null) : null;
  const displayIncludes = Array.isArray(includesEs) ? includesEs : (pkg?.includes || []);

  return (
    <div style={{ padding: "20px 28px" }}>
      <SummaryItem label={t("review.summary.packageLabel", { name: pkgName })} price={pkg?.price || 0} sub={pkgDesc} hidePrice />
      <div style={{ padding: "14px 0" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#8B7355", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
          {t("review.summary.packageIncludes")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {displayIncludes.map((item, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(196,148,74,0.1)", color: "#6B5744",
              padding: "5px 12px", borderRadius: 14, fontSize: 12, fontWeight: 600,
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      {addons.map((id) => {
        const item = all.find((x) => x.id === id);
        if (!item) return null;
        const itemName = tCatalog("addons", item.id, "name", item.name);
        const inst = id === "solo-musician" && soloInstrument
          ? SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument)
          : null;
        const instName = inst ? tCatalog("soloInstruments", inst.id, "name", inst.name) : null;
        return (
          <SummaryItem
            key={id}
            label={instName ? `${itemName} — ${instName}` : itemName}
            price={item.price}
            onRemove={() => toggleAddon(id)}
          />
        );
      })}
    </div>
  );
}

// --- Style helper ---

function arrowBtn(side) {
  return {
    position: "absolute", top: "50%",
    [side === "left" ? "left" : "right"]: 10,
    transform: "translateY(-50%)",
    width: 36, height: 36, borderRadius: "50%", border: "none",
    background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 18,
    cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", backdropFilter: "blur(4px)",
  };
}
