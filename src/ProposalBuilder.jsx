import useProposalState from "./hooks/useProposalState";
import PhotoPreviewModal from "./components/PhotoPreviewModal";
import SavePlanModal from "./components/SavePlanModal";
import RunningTotal from "./components/RunningTotal";
import { StepIndicator } from "./components/ui";
import Landing from "./steps/Landing";
import PlanMode from "./steps/PlanMode";
import CustomFlow from "./steps/CustomFlow";
import PremadeFlow from "./steps/PremadeFlow";

export default function ProposalBuilder() {
  const state = useProposalState();
  const {
    step, topRef, planMode, setPlanMode, goToStep, go,
    preview, setPreview, showSave, setShowSave, handleSavePlan,
    toast, total, labels, structures, structureNeonMsg,
    centerpieces, flowers, addons, sparklerQty,
    selectedPackage, setSelectedPackage, setPkgCarouselIdx,
    contactPhone,
  } = state;

  // RunningTotal computed props
  const neonNeedsMsg = structures.includes("structure-neon") && !structureNeonMsg;
  const stepHasSelection = {
    2: centerpieces.length > 0,
    3: flowers.length > 0,
    4: flowers.length > 0,
    5: structures.length > 0 || sparklerQty > 0,
    6: addons.length > 0,
  };
  const hasSelection = stepHasSelection[step] || false;
  const statementPropRequired = step === 3 && planMode === "custom" && centerpieces.length === 0;
  const premadeNeedsPackage = step === 2 && planMode === "premade" && !selectedPackage;
  const isDisabled = (step === 5 && neonNeedsMsg) || statementPropRequired || premadeNeedsPackage;
  const nextLabel = step === 6 ? "Review" : (planMode === "premade") ? "Next" : (step === 3 && planMode === "custom") ? "Next" : hasSelection ? "Next" : "Skip";

  const isReviewStep = (planMode === "custom" && step === 7) || (planMode === "premade" && step === 4);
  const showRunningTotal =
    (planMode === "custom" && step >= 2 && step <= 7) ||
    (planMode === "premade" && step >= 2 && step <= 4);

  const showSteps =
    step > 1 &&
    ((planMode === "custom" && step < 8) || (planMode === "premade" && step < 5));

  return (
    <div ref={topRef} style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", minHeight: "100vh", background: "#FBF8F3" }}>
      <style>{`
        *{box-sizing:border-box;}
        body{margin:0;}
        input:focus{border-color:#C4944A !important;outline:none;}
        .rdp-root{--rdp-accent-color:#C4944A;--rdp-accent-color-dark:#3B2412;--rdp-day-height:40px;--rdp-day-width:40px;font-family:'DM Sans','Segoe UI',sans-serif;}
        .rdp-day_button:hover:not([disabled]){background:rgba(196,148,74,0.12);border-radius:8px;}
        .rdp-selected .rdp-day_button{background:#C4944A;color:#fff;border-radius:8px;}
        .rdp-today:not(.rdp-selected) .rdp-day_button{color:#C4944A;font-weight:700;}
        .rdp-chevron{fill:#C4944A;}
        .rdp-month_caption{color:#3B2412;font-weight:700;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
        @media(min-width:768px){
          .review-hero-img{height:480px !important;}
          .desktop-two-col{display:flex !important;flex-direction:row !important;gap:32px !important;align-items:flex-start !important;}
          .desktop-two-col>div{flex:1 !important;min-width:0 !important;}
          .venue-grid{display:grid !important;grid-template-columns:repeat(3,1fr) !important;gap:20px !important;}
          .venue-grid .venue-card{max-width:none !important;flex:none !important;}
          .item-grid{grid-template-columns:repeat(2,1fr) !important;max-width:700px !important;margin-left:auto !important;margin-right:auto !important;}
          .addons-grid{max-width:700px !important;margin-left:auto !important;margin-right:auto !important;display:flex !important;gap:32px !important;align-items:flex-start !important;}
          .addons-grid>div{flex:1 !important;min-width:0 !important;}
          .enhancements-col{max-width:700px !important;margin-left:auto !important;margin-right:auto !important;}
          .steps-container{padding-bottom:24px !important;}
        }
      `}</style>

      {/* Modals */}
      <SavePlanModal visible={showSave} onClose={() => setShowSave(false)} onSave={handleSavePlan} />
      <PhotoPreviewModal img={preview?.img} name={preview?.name} onClose={() => setPreview(null)} />

      {/* Toast */}
      <div style={{
        position: "fixed", bottom: 90, left: "50%",
        transform: `translateX(-50%) translateY(${toast ? 0 : 12}px)`,
        zIndex: 999, background: "#3B2412", color: "#F5E6C8",
        padding: "12px 24px", borderRadius: 30, fontSize: 14, fontWeight: 600,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        opacity: toast ? 1 : 0, transition: "all 0.3s ease", pointerEvents: "none",
      }}>
        ✓ Added to your plan
      </div>

      {/* Steps */}
      {step === 0 && <Landing state={state} />}
      {step === 1 && <PlanMode state={state} />}

      {showSteps && (
        <div className="steps-container" style={{ maxWidth: 920, margin: "0 auto", padding: "12px 20px 110px" }}>
          <StepIndicator current={step - 2} total={labels.length} labels={labels} />
          {planMode === "custom" && <CustomFlow state={state} />}
          {planMode === "premade" && <PremadeFlow state={state} />}

          <RunningTotal
            total={total}
            visible={showRunningTotal}
            showBack={(planMode === "custom" && step >= 2) || (planMode === "premade" && step >= 2)}
            onBack={() => {
              if (step === 2 && planMode === "premade" && selectedPackage) {
                setSelectedPackage(null);
                setPkgCarouselIdx(0);
              } else if (step === 2) {
                goToStep(1, () => setPlanMode(null));
              } else {
                go(-1);
              }
            }}
            onNext={() => {
              if (isReviewStep) {
                document.getElementById("contact-cta")?.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                go(1);
              }
            }}
            nextLabel={isReviewStep ? "Send Inquiry" : nextLabel}
            disabled={isReviewStep ? contactPhone.length < 4 : isDisabled}
            disabledHint={isReviewStep && contactPhone.length < 4 ? "Enter phone number to send" : ""}
            onDisabledClick={() => {
              const el = document.getElementById("phone-input");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => {
                  el.focus();
                  el.style.borderColor = "#C4944A";
                  setTimeout(() => { el.style.borderColor = "#EDE8E0"; }, 1500);
                }, 400);
              }
            }}
            isReviewStep={isReviewStep}
            hideTotal={planMode === "premade" && step === 3}
          />
        </div>
      )}
    </div>
  );
}
