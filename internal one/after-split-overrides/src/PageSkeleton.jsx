export default function PageSkeleton() {
  return (
    <div aria-busy="true">
      <div className="skeleton" style={{ height: 32, width: 220, marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 320 }} />
    </div>
  );
}
