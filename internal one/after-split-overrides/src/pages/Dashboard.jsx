export default function Dashboard() {
  const stats = [["Users", 1280], ["Orders", 342], ["Revenue", "$48.2k"]];
  return (
    <>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: 16 }}>
        {stats.map(([k, v]) => (
          <div key={k} style={{ flex: 1, padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <div style={{ color: "#6b7280" }}>{k}</div>
            <strong style={{ fontSize: 24 }}>{v}</strong>
          </div>
        ))}
      </div>
    </>
  );
}
