import {
  VENUES, CENTERPIECES, ACTIVITIES, FLOWERS, STRUCTURES,
  WOW, SPARKLER_PRICES, ADDONS, PACKAGES, SOLO_INSTRUMENTS,
  structureFlowerCost,
} from "../data";
import { fmt } from "../utils";
import { SectionTitle, SummaryItem } from "../components/ui";
import ContactForm from "../components/ContactForm";

export default function ReviewStep({ state }) {
  const {
    anim, go, planMode, total, addons, toggleAddon,
    contactEmail, setContactEmail, contactPhone, setContactPhone,
    countryCode, setCountryCode, proposalDate, setProposalDate,
    partnerName, setPartnerName, inquiryReady,
    buildMsg, buildEmailSubject,
    showSave, setShowSave, planSaved, startOver,
  } = state;

  return (
    <div style={anim}>
      <SectionTitle title="Your Perfect Proposal" />

      <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(59,36,18,0.08)" }}>
        {/* Total banner */}
        <div style={{ padding: "24px 28px", textAlign: "center", background: "linear-gradient(135deg,#3B2412,#5C3A1E)" }}>
          <div style={{ fontSize: 11, color: "rgba(245,230,200,0.6)", fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>ESTIMATED TOTAL</div>
          <div style={{ fontSize: 52, fontWeight: 700, color: "#F5E6C8", fontFamily: "'Playfair Display',Georgia,serif" }}>{fmt(total)}</div>
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
                Timed to golden hour
              </div>
              <div style={{ fontSize: 13, color: "#6B5744", lineHeight: 1.5 }}>
                After a decade of planning professional proposals in Cancún, we know the best time for an unforgettable moment is sunset. That's why we always reserve yours for this special hour.
              </div>
            </div>
          </div>
        )}

        {/* Photo upsell */}
        {!addons.some((a) => ["photo-30", "photo-60"].includes(a)) && (
          <div style={{ margin: "0 28px 16px", padding: "14px 16px", background: "#FFF8EE", border: "1px solid #F0E6D0", borderRadius: 10 }}>
            <div style={{ fontSize: 13, color: "#8B6914", fontWeight: 600 }}>
              📸 94% of our clients add photography. Want to add it?
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => toggleAddon("photo-30")} style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", background: "#C4944A", color: "#fff", fontSize: 12, fontWeight: 600 }}>
                + Add 30min ($295)
              </button>
              <button onClick={() => toggleAddon("photo-60")} style={{ padding: "8px 16px", borderRadius: 20, cursor: "pointer", background: "transparent", border: "1px solid #C4944A", color: "#C4944A", fontSize: 12, fontWeight: 600 }}>
                + Add 60min ($350)
              </button>
            </div>
          </div>
        )}

        {/* Contact form */}
        <ContactForm
          contactEmail={contactEmail} setContactEmail={setContactEmail}
          contactPhone={contactPhone} setContactPhone={setContactPhone}
          countryCode={countryCode} setCountryCode={setCountryCode}
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
      <div style={{ marginTop: 24, padding: "16px 20px", background: "#fff", borderRadius: 12, border: "1px solid #EDE8E0", textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#6B5744", fontWeight: 600, marginBottom: 4 }}>
          📅 Sunset slots book 2-3 weeks in advance during peak season (Dec - April)
        </div>
        <div style={{ fontSize: 12, color: "#B0A090" }}>
          Secure your date with a retainer — Jill's team will confirm everything.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
        {["No hidden fees", "1,500+ proposals since 2018", "Jill's team responds within hours"].map((t) => (
          <span key={t} style={{ fontSize: 12, color: "#B0A090", fontWeight: 500 }}>✓ {t}</span>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 11, color: "#C4B8A8", marginTop: 12, lineHeight: 1.5, maxWidth: 440, margin: "12px auto 0" }}>
        Prices are estimates. Final pricing confirmed with Jill and her team.
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

  const matches = frozenMatches;
  const fallbackImg = VENUES.find((v) => v.id === venue)?.img;
  const extras = matches[0] ? getExtras(matches[0]) : [];
  const idx = Math.min(carouselIdx, matches.length - 1);
  const current = matches[idx];
  const currentUpsells = current ? getUpsells(current) : [];

  return (
    <>
      {/* Carousel header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px 0" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#3B2412", letterSpacing: 0.5 }}>
          Similar Setups From Our Portfolio
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
            onClick={() => setPreview({ img: current.img, name: `Similar setup ${idx + 1}` })}
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
                    To make it similar, add:
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
                    A similar setup from our portfolio
                  </div>
                  <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, fontFamily: "'Playfair Display',Georgia,serif", marginTop: 4 }}>
                    {VENUES.find((v) => v.id === venue)?.name} · Sunset
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <div className="review-hero-img" style={{ height: 320, backgroundImage: `url(${fallbackImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "50px 16px 16px", background: "linear-gradient(transparent,rgba(0,0,0,0.8))" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Your Setup</div>
              <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, fontFamily: "'Playfair Display',Georgia,serif", marginTop: 4 }}>
                {VENUES.find((v) => v.id === venue)?.name} · Sunset
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
            Yours will also include:
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
  const pkg = PACKAGES.find((p) => p.id === selectedPackage);

  return (
    <div className="review-hero-img" style={{ position: "relative", height: 320, backgroundImage: `url(${pkg?.imgs[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%,rgba(0,0,0,0.8))" }}>
        <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{pkg?.badge}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#FFF8EE", fontFamily: "'Playfair Display',Georgia,serif", marginTop: 4 }}>{pkg?.name}</div>
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

  return (
    <div style={{ padding: "20px 28px" }}>
      <SummaryItem
        label={`${VENUES.find((v) => v.id === venue)?.name} Venue`}
        price={VENUES.find((v) => v.id === venue)?.price || 0}
        sub="Sunset · 1.5 hours · Sparkling wine included"
      />
      {centerpieces.map((id) => {
        const item = CENTERPIECES.find((x) => x.id === id) || ACTIVITIES.find((x) => x.id === id);
        if (!item || item.id === "none") return null;
        if (id === "giant-frame-neon") {
          const fq = structureFlowerQtys?.[id] || 0;
          const structName = STRUCTURES.find((s) => s.id === giantFrameStructure)?.name;
          const pickedOpt = item.structureOptions?.find((o) => o.id === giantFrameStructure);
          const displayPrice = item.price + (pickedOpt?.uplift || 0);
          const subParts = [];
          if (structName) subParts.push(`Structure: ${structName}`);
          if (giantFrameNeonMsg) subParts.push(`Message: "${giantFrameNeonMsg}"`);
          return (
            <div key={id}>
              <SummaryItem
                label={item.name}
                price={displayPrice}
                sub={subParts.length ? subParts.join(" · ") : null}
                onRemove={centerpieces.length > 1 ? () => toggleCenterpiece(id) : undefined}
              />
              {fq > 0 && (
                <SummaryItem
                  label={`↳ ${fq} Flower Arrangement${fq > 1 ? "s" : ""}`}
                  price={structureFlowerCost(fq)}
                  onRemove={() => adjustStructureFlowerQty(id, -fq)}
                />
              )}
            </div>
          );
        }
        return <SummaryItem key={id} label={item.name} price={item.price} onRemove={centerpieces.length > 1 ? () => toggleCenterpiece(id) : undefined} />;
      })}
      {flowers.map((id) => {
        const item = FLOWERS.find((x) => x.id === id);
        if (!item) return null;
        if (item.qty) {
          const q = flowerQtys[id] || item.unitMin;
          const lbl = item.perBundle
            ? `${item.name} (${q * item.perBundle} ${item.bundleUnit || "arrangements"})`
            : `${q} ${item.name}`;
          return <SummaryItem key={id} label={lbl} price={q * item.pricePerUnit} onRemove={() => toggleFlower(id)} />;
        }
        return <SummaryItem key={id} label={item.name} price={item.price} onRemove={() => toggleFlower(id)} />;
      })}
      {structures.map((id) => {
        const item = STRUCTURES.find((x) => x.id === id);
        if (!item) return null;
        const fq = structureFlowerQtys?.[id] || 0;
        return (
          <div key={id}>
            <SummaryItem label={item.name} price={item.price} sub={id === "structure-neon" ? `Message: "${structureNeonMsg}"` : null} onRemove={() => toggleStructure(id)} />
            {fq > 0 && (
              <SummaryItem
                label={`↳ ${fq} Flower Arrangement${fq > 1 ? "s" : ""}`}
                price={structureFlowerCost(fq)}
                onRemove={() => adjustStructureFlowerQty(id, -fq)}
              />
            )}
          </div>
        );
      })}
      {sparklerQty > 0 && <SummaryItem label={`Fountain Sparklers x${sparklerQty}`} price={SPARKLER_PRICES[sparklerQty]} onRemove={() => setSparklerQty(0)} />}
      {wow.map((id) => {
        const item = WOW.find((x) => x.id === id);
        return item ? <SummaryItem key={id} label={item.name} price={item.price} onRemove={() => toggleWow(id)} /> : null;
      })}
      {addons.map((id) => {
        const all = [...ADDONS.music, ...ADDONS.capture];
        const item = all.find((x) => x.id === id);
        if (!item) return null;
        const inst = id === "solo-musician" && soloInstrument
          ? SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument)
          : null;
        return (
          <SummaryItem
            key={id}
            label={inst ? `${item.name} — ${inst.name}` : item.name}
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
  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const all = [...ADDONS.music, ...ADDONS.capture];

  return (
    <div style={{ padding: "20px 28px" }}>
      <SummaryItem label={`${pkg?.name} Package`} price={pkg?.price || 0} sub={pkg?.desc} hidePrice />
      <div style={{ padding: "14px 0" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#8B7355", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
          Package includes:
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {pkg?.includes.map((item, i) => (
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
        const inst = id === "solo-musician" && soloInstrument
          ? SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument)
          : null;
        return (
          <SummaryItem
            key={id}
            label={inst ? `${item.name} — ${inst.name}` : item.name}
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
