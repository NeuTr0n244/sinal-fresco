import { Zone } from "@/components/Zone";
import { LiveTokens } from "@/components/LiveTokens";
import trends from "@/data/trends.json";

const SWATCH_VARS: Record<string, string> = {
  new: "--new",
  rising: "--rising",
  steady: "--steady",
  saturated: "--saturated",
};

export default function Home() {
  return (
    <div className="wrap">
      <header className="console">
        <div className="title-block">
          <h1>
            SINAL
            <br />
            <span>FRESCO</span>
          </h1>
          <div className="sub">Radar de jogos e airdrops cripto — sinal novo, não hype requentado</div>
        </div>
        <div className="scan-meta">
          <div>
            <span className="dot" />
            <strong>Última curadoria</strong> — {trends.scan.date}
          </div>
          <div>{trends.scan.sources.length} fontes cruzadas · {trends.scan.sources.join(", ")}</div>
        </div>
      </header>

      <div className="legend">
        <div className="chip">
          <span className="swatch" style={{ background: `var(${SWATCH_VARS.new})` }} />
          Novo — acabou de aparecer
        </div>
        <div className="chip">
          <span className="swatch" style={{ background: `var(${SWATCH_VARS.rising})` }} />
          Subindo rápido — tração real essa semana
        </div>
        <div className="chip">
          <span className="swatch" style={{ background: `var(${SWATCH_VARS.steady})` }} />
          Estável — já estabelecido, ainda vale
        </div>
        <div className="chip">
          <span className="swatch" style={{ background: `var(${SWATCH_VARS.saturated})` }} />
          Saturado — todo mundo já sabe, evitar
        </div>
      </div>

      <LiveTokens />

      {trends.zones.map((zone) => (
        <Zone key={zone.key} label={zone.label} status={zone.status} note={zone.note} items={zone.items} />
      ))}

      <footer className="note">
        <strong>Como isso é montado:</strong> a seção &quot;Ao vivo&quot; busca de verdade a cada carregamento,
        direto da API pública do DexScreener. As outras seções (Novo, Subindo, Estável, Saturado) são curadoria —
        cruzamento de rankings públicos (DappRadar, agregadores de airdrop) com o que a comunidade está comentando,
        atualizada manualmente em <code>src/data/trends.json</code>. Sempre confira a fonte oficial antes de
        conectar carteira ou investir tempo/dinheiro — muita coisa nesse espaço é especulativo e pode não pagar
        nada no final.
      </footer>
    </div>
  );
}
