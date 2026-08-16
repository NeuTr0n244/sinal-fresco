import { NextResponse } from "next/server";

type DexPair = {
  chainId: string;
  url: string;
  baseToken: { name: string; symbol: string };
  priceUsd: string;
  priceChange: { h24?: number };
  volume: { h24?: number };
  pairCreatedAt?: number;
};

export type LiveToken = {
  name: string;
  symbol: string;
  chain: string;
  priceUsd: string;
  change24h: number;
  volume24h: number;
  ageDays: number | null;
  url: string;
};

// DexScreener's free public search API — no key required.
const QUERIES = ["game", "gaming", "play to earn"];

export async function GET() {
  try {
    const results = await Promise.all(
      QUERIES.map((q) =>
        fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(q)}`, {
          next: { revalidate: 300 },
        }).then((r) => (r.ok ? r.json() : { pairs: [] as DexPair[] })),
      ),
    );

    const seen = new Set<string>();
    const pairs: DexPair[] = [];
    for (const result of results) {
      for (const pair of (result.pairs ?? []) as DexPair[]) {
        if (seen.has(pair.url)) continue;
        seen.add(pair.url);
        pairs.push(pair);
      }
    }

    const tokens: LiveToken[] = pairs
      .filter((p) => (p.volume?.h24 ?? 0) > 5000)
      .sort((a, b) => (b.volume?.h24 ?? 0) - (a.volume?.h24 ?? 0))
      .slice(0, 8)
      .map((p) => ({
        name: p.baseToken.name,
        symbol: p.baseToken.symbol,
        chain: p.chainId,
        priceUsd: p.priceUsd,
        change24h: p.priceChange?.h24 ?? 0,
        volume24h: p.volume?.h24 ?? 0,
        ageDays: p.pairCreatedAt ? Math.floor((Date.now() - p.pairCreatedAt) / 86_400_000) : null,
        url: p.url,
      }));

    return NextResponse.json({ tokens, fetchedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ tokens: [], fetchedAt: new Date().toISOString(), error: "dexscreener_unavailable" }, { status: 200 });
  }
}
