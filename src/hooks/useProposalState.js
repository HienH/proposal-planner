import { useState, useRef, useEffect, useCallback } from "react";
import {
  VENUES, CENTERPIECES, ACTIVITIES, FLOWERS, STRUCTURES, WOW,
  SPARKLER_PRICES, SPARKLER_MAX, PORTFOLIO, ADDONS, NEON_MESSAGES,
  PACKAGES, BUSINESS_EMAIL, PHONE, COUNTRY_CODES, SOLO_INSTRUMENTS,
  structureFlowerCost,
} from "../data";
import { fmt } from "../utils";
import { useLanguage } from "../i18n/LanguageContext";
import catalogEs from "../locales/catalog.es.json";

const CATALOG_BY_LANG = { es: catalogEs };

function loc(lang, collection, id, field, fallback) {
  if (lang === "en") return fallback;
  const entry = CATALOG_BY_LANG[lang]?.[collection]?.[id];
  if (entry == null) return fallback;
  if (field == null) return typeof entry === "string" ? entry : fallback;
  return entry?.[field] ?? fallback;
}

export default function useProposalState() {
  const { lang } = useLanguage();

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
  const [giantFrameNeonMsg, setGiantFrameNeonMsg] = useState(null);
  const [giantFrameStructure, setGiantFrameStructure] = useState(null);
  const [structureFlowerQtys, setStructureFlowerQtys] = useState({});
  const [showPicnicEnhancements, setShowPicnicEnhancements] = useState(false);
  const [showDinnerEnhancements, setShowDinnerEnhancements] = useState(false);
  const [wow, setWow] = useState([]);
  const [sparklerQty, setSparklerQty] = useState(0);
  const [addons, setAddons] = useState([]);
  const [soloInstrument, setSoloInstrument] = useState(null);

  // Premade flow
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pkgCarouselIdx, setPkgCarouselIdx] = useState(0);

  // Contact info
  const [travelStart, setTravelStart] = useState(null);
  const [travelEnd, setTravelEnd] = useState(null);
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
      let next = p.includes(id) ? p.filter((a) => a !== id) : [...p, id];
      if (id === "solo-musician" && p.includes(id) && !next.includes(id)) {
        setSoloInstrument(null);
      }
      if ((id === "video-30" || id === "video-60") && p.includes(id) && !next.includes(id)) {
        if (!next.includes("video-30") && !next.includes("video-60")) {
          next = next.filter((a) => a !== "drone");
        }
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
    const MAIN_IDS = ["wooden-frame", "gazebo-structure", "metal-structure"];
    setStructures((p) => {
      let next = p.includes(id) ? p.filter((a) => a !== id) : [...p, id];
      if (MAIN_IDS.includes(id) && p.includes(id) && !next.includes(id)) {
        const anyMainLeft = MAIN_IDS.some((m) => next.includes(m));
        if (!anyMainLeft && next.includes("structure-neon")) {
          next = next.filter((a) => a !== "structure-neon");
          setStructureNeonMsg(null);
        }
      }
      return next;
    });
    if (id === "structure-neon") setStructureNeonMsg(null);
    if (id !== "structure-neon") {
      setStructureFlowerQtys((q) => {
        if (!(id in q)) return q;
        const n = { ...q };
        delete n[id];
        return n;
      });
    }
  }, []);

  const adjustStructureFlowerQty = useCallback((id, delta) => {
    setStructureFlowerQtys((q) => {
      const cur = q[id] || 0;
      const next = cur + delta;
      if (next < 0 || next > 10) return q;
      if (next === 0) {
        const n = { ...q };
        delete n[id];
        return n;
      }
      return { ...q, [id]: next };
    });
  }, []);

  const toggleWow = useCallback((id) => {
    setWow((p) => p.includes(id) ? p.filter((a) => a !== id) : [...p, id]);
  }, []);

  const toggleCenterpiece = useCallback((id) => {
    const wasOn = centerpieces.includes(id);
    setCenterpieces((p) => p.includes(id) ? p.filter((a) => a !== id) : [...p, id]);
    if (id === "giant-frame-neon") {
      setGiantFrameNeonMsg(null);
      setGiantFrameStructure(null);
      if (wasOn) {
        setStructureFlowerQtys((q) => {
          if (!(id in q)) return q;
          const n = { ...q };
          delete n[id];
          return n;
        });
      }
    }
  }, [centerpieces]);

  // --- Portfolio matching ---

  const findBestMatches = useCallback(() => {
    const sameVenue = PORTFOLIO.filter((p) => p.venue === venue);
    const rawPool = sameVenue.length > 0 ? sameVenue : PORTFOLIO;

    // Dedupe by tag signature: photos with identical centerpiece/time/flowers/wow
    // are functional duplicates (same score, same upsells) — usually variants of
    // the same shoot (e.g. -1, -2 filename suffixes).
    const seen = new Set();
    const pool = rawPool.filter((p) => {
      const sig = `${p.centerpiece}|${p.activity || ""}|${p.time}|${[...p.flowers].sort().join(",")}|${[...p.wow].sort().join(",")}`;
      if (seen.has(sig)) return false;
      seen.add(sig);
      return true;
    });

    return pool
      .map((photo) => {
        let score = 0;
        if (photo.activity && centerpieces.includes(photo.activity)) score += 6;
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
    if (step === 6 && planMode === "custom") setFrozenMatches(findBestMatches());
  }, [step, planMode, findBestMatches]);

  const getExtras = useCallback((photo) => {
    const extras = [];
    centerpieces.forEach((id) => {
      if (id !== photo.centerpiece && id !== photo.activity && id !== "none") {
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
    if (photo.activity && !centerpieces.includes(photo.activity)) {
      const item = ACTIVITIES.find((a) => a.id === photo.activity);
      if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "centerpiece" });
    }
    photo.flowers.forEach((id) => {
      if (!flowers.includes(id)) {
        const item = FLOWERS.find((f) => f.id === id);
        if (item) {
          const price = item.qty ? (item.unitMin || 1) * item.pricePerUnit : item.price;
          upsells.push({ id: item.id, name: item.name, price, type: "flower" });
        }
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
      if (c) {
        t += c.price;
        if (c.id === "giant-frame-neon" && giantFrameStructure) {
          const opt = c.structureOptions?.find((o) => o.id === giantFrameStructure);
          t += opt?.uplift || 0;
        }
      }
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
    Object.entries(structureFlowerQtys).forEach(([id, qty]) => {
      const active = structures.includes(id) || (id === "giant-frame-neon" && centerpieces.includes(id));
      if (active) t += structureFlowerCost(qty);
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

  const M = lang === "es" ? {
    greetingPremade: "¡Hola Jill! Acabo de elegir un paquete de propuesta y estoy listo/a para hacerlo realidad 💍",
    greetingCustom: "¡Hola Jill! Acabo de armar mi plan de propuesta y estoy listo/a para hacerlo realidad 💍",
    package: "Paquete",
    includes: "Incluye:",
    addons: "🎶 Extras:",
    estTotal: "💰 Total Est.:",
    travelDates: "✈️ Fechas de Viaje:",
    preferredDate: "📅 Fecha Preferida de Propuesta:",
    partnerName: "💕 Nombre de la pareja:",
    email: "📧 Email:",
    phone: "📱 Teléfono:",
    closing: "¡Espero tu respuesta!",
    venue: "📍 Locación:",
    statementProp: "✨ Pieza Decorativa:",
    flowers: "🌹 Flores:",
    structures: "🏛️ Estructuras:",
    wowFactor: "🎆 Factor WOW:",
    flowerArrSingular: "Arreglo Floral",
    flowerArrPlural: "Arreglos Florales",
    fallbackUnit: "arreglos",
    sparklersName: "Bengalas Fuente",
    subjectLead: "Solicitud de Propuesta",
    subjectFor: "para",
  } : {
    greetingPremade: "Hey Jill! I just chose a proposal package and I'm ready to make it happen 💍",
    greetingCustom: "Hey Jill! I just built my proposal plan and I'm ready to make it happen 💍",
    package: "Package",
    includes: "Includes:",
    addons: "🎶 Add-ons:",
    estTotal: "💰 Est. Total:",
    travelDates: "✈️ Travel Dates:",
    preferredDate: "📅 Preferred Proposal Date:",
    partnerName: "💕 Partner's name:",
    email: "📧 Email:",
    phone: "📱 Phone:",
    closing: "Looking forward to hearing from you!",
    venue: "📍 Venue:",
    statementProp: "✨ Statement Prop:",
    flowers: "🌹 Flowers:",
    structures: "🏛️ Structures:",
    wowFactor: "🎆 WOW Factor:",
    flowerArrSingular: "Flower Arrangement",
    flowerArrPlural: "Flower Arrangements",
    fallbackUnit: "arrangements",
    sparklersName: "Fountain Sparklers",
    subjectLead: "Proposal Inquiry",
    subjectFor: "for",
  };

  const dateLocale = lang === "es" ? "es-MX" : "en-US";

  const buildMsg = () => {
    if (planMode === "premade") {
      const pkg = PACKAGES.find((p) => p.id === selectedPackage);
      const all = [...ADDONS.music, ...ADDONS.capture];
      const sel = addons.map((id) => all.find((x) => x.id === id)).filter(Boolean);
      const pkgName = pkg ? loc(lang, "packages", pkg.id, "name", pkg.name) : "";
      const pkgIncludes = pkg ? (loc(lang, "packages", pkg.id, "includes", null) || pkg.includes) : [];

      let m = `${M.greetingPremade}\n\n📦 ${M.package}: ${pkgName} (${fmt(pkg?.price || 0)})\n`;
      if (pkg) {
        m += `\n${M.includes}\n`;
        pkgIncludes.forEach((item) => { m += `- ${item}\n`; });
      }
      if (sel.length) {
        m += `\n${M.addons}\n`;
        sel.forEach((a) => {
          const aName = loc(lang, "addons", a.id, "name", a.name);
          m += `- ${aName} (${fmt(a.price)})`;
          if (a.id === "solo-musician" && soloInstrument) {
            const inst = SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument);
            if (inst) m += ` — ${loc(lang, "soloInstruments", inst.id, "name", inst.name)}`;
          }
          m += `\n`;
        });
      }
      m += `\n${M.estTotal} ${fmt(total)}\n`;
      if (travelStart && travelEnd) m += `\n${M.travelDates} ${travelStart.toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" })} – ${travelEnd.toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" })}\n`;
      if (proposalDate) m += `${M.preferredDate} ${proposalDate.toLocaleDateString(dateLocale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n`;
      if (partnerName) m += `${M.partnerName} ${partnerName}\n`;
      if (contactEmail) m += `\n${M.email} ${contactEmail}\n`;
      if (contactPhone) m += `${M.phone} ${countryCode} ${contactPhone}\n`;
      m += `\n${M.closing}`;
      return encodeURIComponent(m);
    }

    const v = VENUES.find((x) => x.id === venue);
    const vName = v ? loc(lang, "venues", v.id, "name", v.name) : "";
    const selCenterpieces = centerpieces.map((id) => {
      const item = CENTERPIECES.find((x) => x.id === id) || ACTIVITIES.find((x) => x.id === id);
      if (!item) return null;
      const collection = CENTERPIECES.some((x) => x.id === id) ? "centerpieces" : "activities";
      return { ...item, _collection: collection };
    }).filter(Boolean);
    const selFlowers = flowers.map((id) => FLOWERS.find((x) => x.id === id)).filter(Boolean);
    const selWow = wow.map((id) => WOW.find((x) => x.id === id)).filter(Boolean);
    const all = [...ADDONS.music, ...ADDONS.capture];
    const sel = addons.map((id) => all.find((x) => x.id === id)).filter(Boolean);

    let m = `${M.greetingCustom}\n\n${M.venue} ${vName} (${fmt(v?.price || 0)})\n`;

    if (selCenterpieces.length) {
      m += `\n${M.statementProp}\n`;
      selCenterpieces.forEach((c) => {
        let displayPrice = c.price;
        if (c.id === "giant-frame-neon" && giantFrameStructure) {
          const opt = c.structureOptions?.find((o) => o.id === giantFrameStructure);
          displayPrice = c.price + (opt?.uplift || 0);
        }
        const cName = loc(lang, c._collection, c.id, "name", c.name);
        m += `- ${cName} (${fmt(displayPrice)})`;
        if (c.id === "giant-frame-neon") {
          const structObj = STRUCTURES.find((s) => s.id === giantFrameStructure);
          const structName = structObj ? loc(lang, "structures", structObj.id, "name", structObj.name) : null;
          if (structName) m += ` — ${structName}`;
          if (giantFrameNeonMsg) {
            const msgDisplay = loc(lang, "structureNeonMessages", giantFrameNeonMsg, null, giantFrameNeonMsg);
            m += ` — "${msgDisplay}"`;
          }
        }
        m += `\n`;
        const fq = structureFlowerQtys[c.id];
        if (c.id === "giant-frame-neon" && fq > 0) {
          m += `  + ${fq} ${fq > 1 ? M.flowerArrPlural : M.flowerArrSingular} (${fmt(structureFlowerCost(fq))})\n`;
        }
      });
    }
    if (selFlowers.length) {
      m += `\n${M.flowers}\n`;
      selFlowers.forEach((f) => {
        const fName = loc(lang, "flowers", f.id, "name", f.name);
        const fUnit = loc(lang, "flowers", f.id, "bundleUnit", f.bundleUnit || M.fallbackUnit);
        if (f.qty) {
          const q = flowerQtys[f.id] || f.unitMin;
          if (f.perBundle) m += `- ${fName} (${q * f.perBundle} ${fUnit}) (${fmt(q * f.pricePerUnit)})\n`;
          else m += `- ${q} ${fName} (${fmt(q * f.pricePerUnit)})\n`;
        } else {
          m += `- ${fName} (${fmt(f.price)})\n`;
        }
      });
    }
    const selStructures = structures.map((id) => STRUCTURES.find((x) => x.id === id)).filter(Boolean);
    if (selStructures.length) {
      m += `\n${M.structures}\n`;
      selStructures.forEach((s) => {
        const sName = loc(lang, "structures", s.id, "name", s.name);
        m += `- ${sName} (${fmt(s.price)})`;
        if (s.id === "structure-neon" && structureNeonMsg) {
          const msgDisplay = loc(lang, "structureNeonMessages", structureNeonMsg, null, structureNeonMsg);
          m += ` — "${msgDisplay}"`;
        }
        m += `\n`;
        const fq = structureFlowerQtys[s.id];
        if (fq > 0) {
          m += `  + ${fq} ${fq > 1 ? M.flowerArrPlural : M.flowerArrSingular} (${fmt(structureFlowerCost(fq))})\n`;
        }
      });
    }
    if (selWow.length || sparklerQty > 0) {
      m += `\n${M.wowFactor}\n`;
      if (sparklerQty > 0) m += `- ${M.sparklersName} x${sparklerQty} (${fmt(SPARKLER_PRICES[sparklerQty])})\n`;
      selWow.forEach((w) => m += `- ${w.name} (${fmt(w.price)})\n`);
    }
    if (sel.length) {
      m += `\n${M.addons}\n`;
      sel.forEach((a) => {
        const aName = loc(lang, "addons", a.id, "name", a.name);
        m += `- ${aName} (${fmt(a.price)})`;
        if (a.id === "solo-musician" && soloInstrument) {
          const inst = SOLO_INSTRUMENTS.find((i) => i.id === soloInstrument);
          if (inst) m += ` — ${loc(lang, "soloInstruments", inst.id, "name", inst.name)}`;
        }
        m += `\n`;
      });
    }
    m += `\n${M.estTotal} ${fmt(total)}\n`;
    if (travelStart && travelEnd) m += `\n${M.travelDates} ${travelStart.toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" })} – ${travelEnd.toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" })}\n`;
    if (proposalDate) m += `${M.preferredDate} ${proposalDate.toLocaleDateString(dateLocale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n`;
    if (partnerName) m += `${M.partnerName} ${partnerName}\n`;
    if (contactEmail) m += `\n${M.email} ${contactEmail}\n`;
    if (contactPhone) m += `${M.phone} ${countryCode} ${contactPhone}\n`;
    m += `\n${M.closing}`;
    return encodeURIComponent(m);
  };

  const buildEmailSubject = () =>
    encodeURIComponent(`${M.subjectLead}${partnerName ? ` — ${M.subjectFor} ${partnerName}` : ""} — ${fmt(total)}`);

  const inquiryReady = contactEmail.includes("@") && contactPhone.length >= 4 && !!travelStart && !!travelEnd;

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
      setGiantFrameNeonMsg(null);
      setGiantFrameStructure(null);
      setStructureFlowerQtys({});
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
      structures, structureNeonMsg, giantFrameNeonMsg, wow, addons, total,
    });
    setPlanSaved(true);
  };

  // --- Computed values ---

  const anim = {
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.35s ease",
  };

  return {
    // Navigation
    step, setStep, go, goToStep, fade, setFade, topRef, anim,
    planMode, setPlanMode, selectPlanMode,

    // Custom flow
    venue, setVenue, selectVenue,
    centerpieces, toggleCenterpiece,
    neonMsg, setNeonMsg,
    flowers, toggleFlower, flowerQtys, adjustFlowerQty,
    structures, toggleStructure, structureNeonMsg, setStructureNeonMsg,
    giantFrameNeonMsg, setGiantFrameNeonMsg,
    giantFrameStructure, setGiantFrameStructure,
    structureFlowerQtys, adjustStructureFlowerQty,
    showPicnicEnhancements, setShowPicnicEnhancements,
    showDinnerEnhancements, setShowDinnerEnhancements,
    wow, toggleWow,
    sparklerQty, setSparklerQty,
    addons, toggleAddon,
    soloInstrument, setSoloInstrument,

    // Premade flow
    selectedPackage, setSelectedPackage,
    pkgCarouselIdx, setPkgCarouselIdx,

    // Contact
    travelStart, setTravelStart,
    travelEnd, setTravelEnd,
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
