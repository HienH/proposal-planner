export default function PhotoPreviewModal({ img, name, onClose }) {
  if (!img) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        padding: 20, cursor: "pointer",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 20,
          background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
          width: 40, height: 40, borderRadius: "50%", fontSize: 20, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        ✕
      </button>
      <div style={{ maxWidth: 800, maxHeight: "80vh", width: "100%" }}>
        <img
          src={img}
          alt={name}
          style={{ width: "100%", height: "auto", maxHeight: "75vh", objectFit: "contain", borderRadius: 12 }}
        />
        {name && (
          <div style={{
            textAlign: "center", marginTop: 16, color: "#fff", fontSize: 18,
            fontWeight: 600, fontFamily: "'Playfair Display',Georgia,serif",
          }}>
            {name}
          </div>
        )}
      </div>
    </div>
  );
}
