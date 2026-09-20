# CLIMAX Refrigeração

Site institucional da CLIMAX Refrigeração para apresentar serviços, aparelhos e canais de contato.

## O que o site tem

- hero com vídeo em autoplay, sem áudio e em loop;
- aparelhos Samsung, LG e Philco em destaque;
- contato e pedidos de orçamento pelo WhatsApp;
- serviços de instalação, manutenção e climatização comercial;
- informações de atendimento e dúvidas frequentes;
- animações leves em CSS, com um pequeno controlador em JavaScript;
- suporte a `prefers-reduced-motion`.

## Estrutura

A landing é estática. O navegador recebe HTML, CSS, JavaScript leve e os arquivos de mídia, sem React, SSR ou hidratação.

Os arquivos de produção ficam em:

- `static/index.html`
- `static/styles.css`
- `static/motion.js`
- `public/`
- `video-parts/svg/climax-hero.mp4`

O script `scripts/build-static.mjs` monta a pasta `dist/` para publicação.

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Gere o site:

```bash
npm run build
```

Valide o orçamento de performance:

```bash
npm run check
```

Para visualizar com Wrangler:

```bash
npm run dev
```

## Deploy

O projeto usa Cloudflare Static Assets com Wrangler.

```bash
npm run deploy
```

O arquivo `wrangler.jsonc` publica a pasta `dist/`.

## Texto e conteúdo

O repositório inclui a skill Humanizer em `.agents/skills/humanizer/SKILL.md`.

Agentes que editarem texto público da CLIMAX devem seguir o `AGENTS.md`: preservar fatos e dados técnicos, manter o texto em português do Brasil e evitar frases genéricas, exageros e texto com aparência de resposta de chatbot.

A skill Humanizer é de `blader/humanizer` e mantém sua licença MIT em `.agents/skills/humanizer/LICENSE`.
