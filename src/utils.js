export const fmt = (n) => "$" + n.toLocaleString("en-US");

export function getBudgetLabel(t) {
  if (t < 800) return { label: "Intimate & Simple", color: "#8B7355", icon: "💛" };
  if (t < 1495) return { label: "Popular Range", color: "#B8860B", icon: "🧡" };
  if (t < 2500) return { label: "Premium Experience", color: "#C4944A", icon: "❤️" };
  return { label: "Ultimate Proposal", color: "#D4AF37", icon: "💎" };
}

export const btnMain = (ok) => ({
  padding: "16px 48px",
  borderRadius: 30,
  border: "none",
  cursor: ok ? "pointer" : "default",
  background: ok ? "linear-gradient(135deg,#C4944A,#D4AF37)" : "#D4C5B0",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  boxShadow: ok ? "0 4px 20px rgba(196,148,74,0.4)" : "none",
  opacity: ok ? 1 : 0.4,
  transition: "all 0.3s",
});

export const btnBack = {
  padding: "16px 28px",
  borderRadius: 30,
  border: "2px solid #C4944A",
  cursor: "pointer",
  background: "transparent",
  color: "#C4944A",
  fontSize: 14,
  fontWeight: 600,
};
