"use client";

import { useEffect, useState } from "react";
import type { LiveToken } from "@/app/api/trending-tokens/route";

export function LiveTokens() {
  const [tokens, setTokens] = useState<LiveToken[] | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/trending-tokens")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setTokens(data.tokens ?? []);
        setFetchedAt(data.fetchedAt ?? null);
        setError(Boolean(data.error));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="live-section">
      <div className="zone-head">
        <h2>Ao vivo</h2>
        <span className="count">tokens de jogos por volume — DexScreener</span>
        <div className="rule" />
      </div>
      <p className="zone-note">
        Isso aqui busca de verdade a cada carregamento da página — sem curadoria, direto da API pública do
        DexScreener. Ruído de memecoin é esperado; é sinal bruto, não recomendação.
      </p>
      <div className="live-table-wrap">
        {error && <div className="live-status">Não consegui buscar agora — tenta recarregar a página.</div>}
        {!error && tokens === null && <div className="live-status">Buscando…</div>}
        {!error && tokens && tokens.length === 0 && (
          <div className="live-status">Nenhum par com volume relevante nas buscas atuais.</div>
        )}
        {!error && tokens && tokens.length > 0 && (
          <>
            <table className="live-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Chain</th>
                  <th>Preço</th>
                  <th>24h</th>
                  <th>Volume 24h</th>
                  <th>Idade</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((t) => (
                  <tr key={t.url}>
                    <td className="name">
                      <a href={t.url} target="_blank" rel="noopener noreferrer">
                        {t.symbol}
                      </a>
                    </td>
                    <td>{t.chain}</td>
                    <td>${Number(t.priceUsd).toPrecision(4)}</td>
                    <td className={t.change24h >= 0 ? "up" : "down"}>
                      {t.change24h >= 0 ? "+" : ""}
                      {t.change24h.toFixed(1)}%
                    </td>
                    <td>${Math.round(t.volume24h).toLocaleString("pt-BR")}</td>
                    <td>{t.ageDays === null ? "—" : `${t.ageDays}d`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {fetchedAt && (
              <div className="live-status" style={{ marginTop: "0.7rem", marginBottom: 0 }}>
                Buscado agora — {new Date(fetchedAt).toLocaleTimeString("pt-BR")}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
