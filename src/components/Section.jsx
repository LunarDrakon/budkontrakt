export default function Section({ title, children }) {
  return (
    <section className="content-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}