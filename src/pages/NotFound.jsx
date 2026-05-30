// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>404</h1>
      <p style={{ marginTop: "10px" }}>Page not found</p>

      <a href="/" style={{ marginTop: "20px", color: "#4f46e5" }}>
        Go to Home
      </a>
    </div>
  );
}