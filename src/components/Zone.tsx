import { Card, type TrendItem } from "./Card";

export function Zone({
  label,
  status,
  note,
  items,
}: {
  label: string;
  status: string;
  note: string;
  items: TrendItem[];
}) {
  return (
    <section className={`zone${status === "saturated" ? " saturated" : ""}`}>
      <div className="zone-head">
        <h2>{label}</h2>
        <span className="count">
          {items.length} {items.length === 1 ? "achado" : "achados"}
        </span>
        <div className="rule" />
      </div>
      <p className="zone-note">{note}</p>
      <div className="grid">
        {items.map((item) => (
          <Card key={item.name} item={item} status={status} />
        ))}
      </div>
    </section>
  );
}
