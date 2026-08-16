# Sinal Fresco

Radar de jogos e airdrops cripto: separa o que é sinal novo do que já virou tutorial de YouTube.

- **Ao vivo** — busca em tempo real na API pública do DexScreener (sem chave necessária).
- **Novo / Subindo / Estável / Saturado** — curadoria manual em [`src/data/trends.json`](src/data/trends.json).

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Atualizar a curadoria

Edite [`src/data/trends.json`](src/data/trends.json) — cada zona (`novo`, `subindo`, `estavel`, `saturado`) tem uma
lista de `items` com `name`, `chain`, `metricValue`, `metricLabel`, `desc`, `todo` e `sourceUrl`. Não precisa mexer
em código para adicionar ou remover um achado.

## Deploy no Vercel

1. Suba esta pasta para um repositório Git (GitHub, GitLab, etc.).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Framework preset: **Next.js** (detectado automaticamente). Nenhuma variável de ambiente é necessária — a busca
   ao vivo usa a API pública do DexScreener direto do servidor.
4. Deploy.

Não há banco de dados nem chaves de API nesta versão — é 100% deployável sem configuração extra.
