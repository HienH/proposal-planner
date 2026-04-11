import { useState, useRef, useEffect, useCallback } from "react";
import {
  VENUES, CENTERPIECES, ACTIVITIES, FLOWERS, STRUCTURES, WOW,
  SPARKLER_PRICES, SPARKLER_MAX, PORTFOLIO, ADDONS, NEON_MESSAGES,
  PACKAGES, BUSINESS_EMAIL, PHONE, COUNTRY_CODES, SOLO_INSTRUMENTS,
} from "../data";
import { fmt } from "../utils";

export default function useProposalState() {
  // Navigation
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);
  const topRef = useRef(null);
  const [planMode, setPlanMode] = useState(null);

  // Custom flow selections
  const [venue, setVenue] = useState(null);
  const [centerpieces, setCenterpieces] = useState([]);
  const [neonMsg, setNeonMsg] = useState(NEON_MESSAGES[0]);
  const [flowers, setFlowers] = useState([]);
  const [flowerQtys, setFlowerQtys] = useState({});
  const [structures, setStructures] = useState([]);
  const [structureNeonMsg, setStructureNeonMsg] = useState(null);
  const [wow, setWow] = useState([]);
  const [sparklerQty, setSparklerQty] = useState(0);
  const [addons, setAddons] = useState([]);
  const [soloInstrument, setSoloInstrument] = useState(null);

  // Premade flow
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pkgCarouselIdx, setPkgCarouselIdx] = useState(0);

  // Contact info
  const [proposalDate, setProposalDate] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  // UI state
  const [showSave, setShowSave] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);
  const [preview, setPreview] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [toast, setToast] = useState(false);
  const [frozenMatches, setFrozenMatches] = useState([]);

  // --- Navigation ---

  const go = useCallback((dir) => {
    setFade(false);
    setTimeout(() => {
      setStep((s) => s + dir);
      setFade(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }, []);

  const goToStep = useCallback((target, callback) => {
    setFade(false);
    setTimeout(() => {
      setStep(target);
      if (callback) callback();
      setFade(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }, []);

  const selectVenue = useCallback((id) => {
    setVenue(id);
    setTimeout(() => go(1), 400);
  }, [go]);

  const selectPlanMode = useCallback((mode) => {
    setPlanMode(mode);
    go(1);
  }, [go]);

  // --- Toggles ---

  const showToast = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }, []);

  const toggleAddon = useCallback((id) => {
    setAddons((p) => {
      const next = p.includes(id) ? p.filter((a) => a !== id) : [...p, id];
      if (id === "solo-musician" && p.includes(id) && !next.includes(id)) {
        setSoloInstrument(null);
      }
      return next;
    });
  }, []);

  const toggleFlower = useCallback((id) => {
    const item = FLOWERS.find((x) => x.id === id);
    if (item?.qty) {
      if (flowers.includes(id)) {
        setFlowers((p) => p.filter((a) => a !== id));
        setFlowerQtys((q) => { const n = { ...q }; delete n[id]; return n; });
      } else {
        setFlowers((p) => [...p, id]);
        setFlowerQtys((q) => ({ ...q, [id]: item.unitMin }));
      }
    } else {
      setFlowers((p) => p.includes(id) ? p.filter((a) => a !== id) : [...p, id]);
    }
  }, [flowers]);

  const adjustFlowerQty = useCallback((id, delta) => {
    const item = FLOWERS.find((x) => x.id === id);
    if (!item) return;
    setFlowerQtys((q) => {
      const cur = q[id] || item.unitMin;
      const next = cur + delta;
      if (next < item.unitMin) return q;
      return { ...q, [id]: next };
    });
  }, []);

  const toggleStructure = useCallback((id) => {
    setStructures((p) => p.includes(id) ? p.filter((a) => a !== id) : [...p, id]);
    if (id === "structure-neon") setStructureNeonMsg(null);
  }, []);

  const toggleWow = useCallback((id) => {
    setWow((p) => p.includes(id) ? p.filter((a) => a !== id) : [...p, id]);
  }, []);

  const toggleCenterpiece = useCallback((id) => {
    setCenterpieces((p) => p.includes(id) ? p.filter((a) => a !== id) : [...p, id]);
  }, []);

  // --- Portfolio matching ---

  const findBestMatches = useCallback(() => {
    const sameVenue = PORTFOLIO.filter((p) => p.venue === venue);
    const rawPool = sameVenue.length > 0 ? sameVenue : PORTFOLIO;

    // Dedupe by tag signature: photos with identical centerpiece/time/flowers/wow
    // are functional duplicates (same score, same upsells) — usually variants of
    // the same shoot (e.g. -1, -2 filename suffixes).
    const seen = new Set();
    const pool = rawPool.filter((p) => {
      const sig = `${p.centerpiece}|${p.time}|${[...p.flowers].sort().join(",")}|${[...p.wow].sort().join(",")}`;
      if (seen.has(sig)) return false;
      seen.add(sig);
      return true;
    });

    return pool
      .map((photo) => {
        let score = 0;
        if (centerpieces.includes(photo.centerpiece)) score += 3;
        if (photo.time === "sunset") score += 2;
        flowers.forEach((f) => { if (photo.flowers.includes(f)) score += 1; });
        wow.forEach((w) => { if (photo.wow.includes(w)) score += 1; });
        if (sparklerQty > 0 && photo.wow.some((w) => w.startsWith("sparklers"))) score += 1;
        return { ...photo, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [venue, centerpieces, flowers, wow, sparklerQty]);

  useEffect(() => {
    if (step === 7 && planMode === "custom") setFrozenMatches(findBestMatches());
  }, [step, planMode, findBestMatches]);

  const getExtras = useCallback((photo) => {
    const extras = [];
    centerpieces.forEach((id) => {
      if (id !== photo.centerpiece && id !== "none") {
        const item = CENTERPIECES.find((c) => c.id === id) || ACTIVITIES.find((c) => c.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "centerpiece" });
      }
    });
    flowers.forEach((id) => {
      if (!photo.flowers.includes(id)) {
        const item = FLOWERS.find((f) => f.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "flower" });
      }
    });
    if (sparklerQty > 0 && !photo.wow.some((w) => w.startsWith("sparklers"))) {
      extras.push({ id: "sparklers", name: `Fountain Sparklers x${sparklerQty}`, type: "wow" });
    }
    wow.forEach((id) => {
      if (!photo.wow.includes(id)) {
        const item = WOW.find((w) => w.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "wow" });
      }
    });
    addons.forEach((id) => {
      const all = [...ADDONS.music, ...ADDONS.capture];
      const item = all.find((a) => a.id === id);
      if (item) extras.push({ id: item.id, name: item.name, type: "addon" });
    });
    return extras;
  }, [centerpieces, flowers, sparklerQty, wow, addons]);

  const getUpsells = useCallback((photo) => {
    const upsells = [];
    if (photo.centerpiece && photo.centerpiece !== "none" && !centerpieces.includes(photo.centerpiece)) {
      const item = CENTERPIECES.find((c) => c.id === photo.centerpiece);
      if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "centerpiece" });
    }
    photo.flowers.forEach((id) => {
      if (!flowers.includes(id)) {
        const item = FLOWERS.find((f) => f.id === id);
        if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "flower" });
      }
    });
    photo.wow.forEach((id) => {
      if (id.startsWith("sparklers")) {
        if (sparklerQty === 0) {
          const qty = parseInt(id.split("-")[1]);
          upsells.push({ id, name: `Fountain Sparklers x${qty}`, price: SPARKLER_PRICES[qty], type: "sparkler" });
        }
      } else if (!wow.includes(id)) {
        const item = WOW.find((w) => w.id === id);
        if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "wow" });
      }
    });
    return upsells;
  }, [centerpieces, flowers, sparklerQty, wow]);

  // --- Pricing ---

  const getTotal = () => {
    if (planMode === "premade") {
      let t = 0;
      const pkg = PACKAGES.find((p) => p.id === selectedPackage);
      if (pkg) t += pkg.price;
      const all = [...ADDONS.music, ...ADDONS.capture];
      addons.forEach((id) => { const a = all.find((x) => x.id === id); if (a) t += a.price; });
      return t;
    }
    let t = 0;
    if (venue) t += VENUES.find((v) => v.id === venue)?.price || 0;
    centerpieces.forEach((id) => {
      const c = CENTERPIECES.find((x) => x.id === id) || ACTIVITIES.find((x) => x.id === id);
      if (c) t += c.price;
    });
    flowers.forEach((id) => {
      const f = FLOWERS.find((x) => x.id === id);
      if (f) {
        if (f.qty) t += (flowerQtys[id] || f.unitMin) * f.pricePerUnit;
        else t += f.price;
      }
    });
    structures.forEach((id) => {
      const s = STRUCTURES.find((x) => x.id === id);
      if (s) t += s.price;
    });
    wow.forEach((id) => {
      const w = WOW.find((x) => x.id === id);
      if (w) t += w.price;
    });
    t += SPARKLER_PRICES[sparklerQty] || 0;
    const all = [...ADDONS.music, ...ADDONS.capture];
    addons.forEach((id) => { const a = all.find((x) => x.id === id); if (a) t += a.price; });
    return t;
  };

  const total = getTotal();

  // --- Message building ---

  const buildMsg = () => {
    if (planMode === "premade") {
      const pkg = PACKAGES.find((p) => p.id === selectedPackage);
      const all = [...ADDONS.music, ...ADDONS.capture];
      const sel = addons.map((id) => all.find((x) => x.id === id)).filter(Boolean);

      let m = `Hey Jill! I just chose a proposal package and I'm ready to make it happen 💍\n\n📦 Package: ${pkg?.name} (${fmt(pkg?.price || 0)})\n`;
      if (pkg) {
        m += `\nIncludes:\n`;
        pkg.includes.forEach((item) => { m += `- ${item}\n`; });
      }
      if (sel.length) {
        m += `\n🎶 Add-ons:\n`;
        sel.forEach((a) => {
          m += `- ${a.name} (${fmt(a.price)})`;
          if (a.id === "solo-musician" && soloInstrument) {
            const inst = SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument);
            if (inst) m += ` — ${inst.name}`;
          }
          m += `\n`;
        });
      }
      m += `\n💰 Est. Total: ${fmt(total)}\n`;
      if (proposalDate) m += `\n📅 Proposal Date: ${proposalDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n`;
      if (partnerName) m += `💕 Partner's name: ${partnerName}\n`;
      if (contactEmail) m += `\n📧 Email: ${contactEmail}\n`;
      if (contactPhone) m += `📱 Phone: ${countryCode} ${contactPhone}\n`;
      m += `\nLooking forward to hearing from you!`;
      return encodeURIComponent(m);
    }

    const v = VENUES.find((x) => x.id === venue);
    const selCenterpieces = centerpieces.map((id) => CENTERPIECES.find((x) => x.id === id) || ACTIVITIES.find((x) => x.id === id)).filter(Boolean);
    const selFlowers = flowers.map((id) => FLOWERS.find((x) => x.id === id)).filter(Boolean);
    const selWow = wow.map((id) => WOW.find((x) => x.id === id)).filter(Boolean);
    const all = [...ADDONS.music, ...ADDONS.capture];
    const sel = addons.map((id) => all.find((x) => x.id === id)).filter(Boolean);

    let m = `Hey Jill! I just built my proposal plan and I'm ready to make it happen 💍\n\n📍 Venue: ${v?.name} (${fmt(v?.price || 0)})\n`;

    if (selCenterpieces.length) {
      m += `\n✨ Statement Prop:\n`;
      selCenterpieces.forEach((c) => { m += `- ${c.name} (${fmt(c.price)})\n`; });
    }
    if (selFlowers.length) {
      m += `\n🌹 Flowers:\n`;
      selFlowers.forEach((f) => {
        if (f.qty) {
          const q = flowerQtys[f.id] || f.unitMin;
          if (f.perBundle) m += `- ${f.name} — ${q} ${q === 1 ? "bundle" : "bundles"} (${q * f.perBundle} ${f.bundleUnit || "arrangements"}) (${fmt(q * f.pricePerUnit)})\n`;
          else m += `- ${q} ${f.name} (${fmt(q * f.pricePerUnit)})\n`;
        } else {
          m += `- ${f.name} (${fmt(f.price)})\n`;
        }
      });
    }
    const selStructures = structures.map((id) => STRUCTURES.find((x) => x.id === id)).filter(Boolean);
    if (selStructures.length) {
      m += `\n🏛️ Structures:\n`;
      selStructures.forEach((s) => {
        m += `- ${s.name} (${fmt(s.price)})`;
        if (s.id === "structure-neon") m += ` — "${structureNeonMsg}"`;
        m += `\n`;
      });
    }
    if (selWow.length || sparklerQty > 0) {
      m += `\n🎆 WOW Factor:\n`;
      if (sparklerQty > 0) m += `- Fountain Sparklers x${sparklerQty} (${fmt(SPARKLER_PRICES[sparklerQty])})\n`;
      selWow.forEach((w) => m += `- ${w.name} (${fmt(w.price)})\n`);
    }
    if (sel.length) {
      m += `\n🎶 Add-ons:\n`;
      sel.forEach((a) => {
        m += `- ${a.name} (${fmt(a.price)})`;
        if (a.id === "solo-musician" && soloInstrument) {
          const inst = SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument);
          if (inst) m += ` — ${inst.name}`;
        }
        m += `\n`;
      });
    }
    m += `\n💰 Est. Total: ${fmt(total)}\n`;
    if (proposalDate) m += `\n📅 Proposal Date: ${proposalDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n`;
    if (partnerName) m += `💕 Partner's name: ${partnerName}\n`;
    if (contactEmail) m += `\n📧 Email: ${contactEmail}\n`;
    if (contactPhone) m += `📱 Phone: ${countryCode} ${contactPhone}\n`;
    m += `\nLooking forward to hearing from you!`;
    return encodeURIComponent(m);
  };

  const buildEmailSubject = () =>
    encodeURIComponent(`Proposal Inquiry${partnerName ? ` — for ${partnerName}` : ""} — ${fmt(total)}`);

  const inquiryReady = contactEmail.includes("@") && contactPhone.length >= 4;

  const canProceed = () => {
    if (planMode === "custom") {
      if (step === 2) return !!venue;
      if (step === 3) return centerpieces.length > 0;
      return true;
    }
    if (planMode === "premade") {
      if (step === 2) return !!selectedPackage;
      return true;
    }
    return true;
  };

  const startOver = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setStep(0);
      setPlanMode(null);
      setVenue(null);
      setCenterpieces([]);
      setNeonMsg(NEON_MESSAGES[0]);
      setFlowers([]);
      setFlowerQtys({});
      setStructures([]);
      setStructureNeonMsg(null);
      setWow([]);
      setSparklerQty(0);
      setAddons([]);
      setSoloInstrument(null);
      setSelectedPackage(null);
      setPkgCarouselIdx(0);
      setProposalDate(null);
      setHotelName("");
      setPartnerName("");
      setContactEmail("");
      setContactPhone("");
      setCountryCode("+1");
      setPlanSaved(false);
      setCarouselIdx(0);
      setFrozenMatches([]);
      setFade(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }, []);

  const handleSavePlan = ({ email, name }) => {
    console.log("LEAD CAPTURED:", {
      email, name, venue, centerpieces, neonMsg, flowers,
      structures, structureNeonMsg, wow, addons, total,
    });
    setPlanSaved(true);
  };

  // --- Computed values ---

  const anim = {
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.35s ease",
  };

  const customLabels = ["Location", "Statement Prop", "Flowers", "Setup Enhancements", "Add-ons", "Review & Book"];
  const premadeLabels = ["Package", "Extras", "Review & Book"];
  const labels = planMode === "premade" ? premadeLabels : customLabels;

  return {
    // Navigation
    step, setStep, go, goToStep, fade, setFade, topRef, anim,
    planMode, setPlanMode, selectPlanMode,
    labels,

    // Custom flow
    venue, setVenue, selectVenue,
    centerpieces, toggleCenterpiece,
    neonMsg, setNeonMsg,
    flowers, toggleFlower, flowerQtys, adjustFlowerQty,
    structures, toggleStructure, structureNeonMsg, setStructureNeonMsg,
    wow, toggleWow,
    sparklerQty, setSparklerQty,
    addons, toggleAddon,
    soloInstrument, setSoloInstrument,

    // Premade flow
    selectedPackage, setSelectedPackage,
    pkgCarouselIdx, setPkgCarouselIdx,

    // Contact
    proposalDate, setProposalDate,
    hotelName, setHotelName,
    partnerName, setPartnerName,
    contactEmail, setContactEmail,
    contactPhone, setContactPhone,
    countryCode, setCountryCode,

    // UI state
    showSave, setShowSave,
    planSaved, setPlanSaved,
    preview, setPreview,
    carouselIdx, setCarouselIdx,
    toast, showToast,
    frozenMatches,

    // Computed / functions
    total, inquiryReady, canProceed,
    buildMsg, buildEmailSubject,
    getExtras, getUpsells,
    handleSavePlan, startOver,
  };
}
