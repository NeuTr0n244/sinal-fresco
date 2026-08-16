export type TrendItem = {
  name: string;
  chain: string;
  metricValue: string;
  metricLabel: string;
  desc: string;
  todo: string | null;
  sourceUrl: string | null;
  sourceLabel: string | null;
};

const STATUS_LABEL: Record<string, string> = {
  new: "Novo",
  rising: "Subindo",
  steady: "Estável",
  saturated: "Saturado",
};

export function Card({ item, status }: { item: TrendItem; status: string }) {
  return (
    <div className="card" style={{ ["--stripe" as string]: `var(--${status})` }}>
      <div className="card-top">
        <div>
          <div className="card-name">{item.name}</div>
          <div className="card-chain">{item.chain}</div>
        </div>
        <span className="status-badge">{STATUS_LABEL[status] ?? status}</span>
      </div>
      <div className="metric">
        {item.metricValue}
        <small>{item.metricLabel}</small>
      </div>
      <div className="card-desc">{item.desc}</div>
      {item.todo && (
        <div className="todo">
          <span className="lbl">Fazer</span>
          <span>{item.todo}</span>
        </div>
      )}
      {item.sourceUrl && (
        <a className="src" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
          {item.sourceLabel} →
        </a>
      )}
    </div>
  );
}
