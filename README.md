# CIn no REC'n'Play 2026

Programação do CIn-UFPE no REC'n'Play 2026 — 11 a 14 de novembro, Recife.

- **Site:** https://recnplay.cin.ufpe.br/
- **Script:** https://recnplay.cin.ufpe.br/cin-recplay-2026.js

## Usar no Google Sites

Inserir → Embed → Código de incorporação:

```html
<script src="https://recnplay.cin.ufpe.br/cin-recplay-2026.js"></script>
```

O bloco de embed do Google Sites tem altura fixa; para a programação completa,
o ideal é abrir o site em uma aba própria (link/botão) em vez de embutir.

## Domínio próprio (`cin.ufpe.br`)

O GitHub Pages só exige um **CNAME no subdomínio**, sem TXT no apex `ufpe.br`.

| Tipo | Nome/Host | Valor |
|---|---|---|
| CNAME | `recnplay` (exemplo) | `vinicius-jose-cin.github.io` |

> Não use o apex `cin.ufpe.br`: CNAME no apex é inválido e derrubaria o domínio
> inteiro. Use um subdomínio, como `recnplay.cin.ufpe.br`.

Depois do CNAME criado e propagado:

1. **Settings → Pages → Custom domain**.
2. Informe o subdomínio e salve.
3. Aguarde o DNS check e ative **Enforce HTTPS**.

Com isso, o site e o script passam a responder em:

```text
https://recnplay.cin.ufpe.br/
https://recnplay.cin.ufpe.br/cin-recplay-2026.js
```

## Arquivos publicados

- `index.html` — prévia do site no GitHub Pages, com metadados OpenGraph.
- `cin-recplay-2026.js` — site completo. Carrega Space Grotesk e Barlow
  Condensed do Google Fonts (fallbacks sans/Impact); não usa bibliotecas
  externas.
- `og.png` — imagem de compartilhamento 1200×630 (WhatsApp, redes sociais).
- `favicon.svg` — favicon vetorial com o símbolo do CIn no gradiente.
- `favicon-32.png` e `apple-touch-icon.png` — fallbacks para navegadores e iOS.
- `mapa-como-chegar.png` — mapa exibido no botão “Mapa do Stand”.
- `noticias/` — subpáginas das notícias (ex.: `noticias/supertalentos/`).
- `.nojekyll` — evita o processamento do Jekyll no Pages.
- `README.md` — este documento.

## Notícias

A aba **Notícias** é alimentada pelo array `N`, no topo de
`cin-recplay-2026.js`:

```js
{ slug:"supertalentos",
  t:"Título", s:"Subtítulo", dt:"DD/MM/AAAA, HH:MM",
  img:"", // opcional; ex.: "/noticias/supertalentos/imagem.jpg"
  url:"/noticias/supertalentos/",
  x:"Resumo exibido no card",
  html:`<p>Texto completo da notícia.</p>` }
```

- `slug`: identificador da notícia e da subpágina.
- `t`: título.
- `s`: subtítulo.
- `dt`: data e hora.
- `img`: imagem opcional; se ficar vazia, o card e a notícia não exibem imagem.
- `url`: endereço da subpágina.
- `x`: resumo exibido no card.
- `html`: conteúdo completo em HTML.

Cada notícia tem uma subpágina em `noticias/<slug>/index.html`, com
`<html data-news="<slug>">`, carregando `../../cin-recplay-2026.js`. O exemplo
pronto é `noticias/supertalentos/`.

## Compartilhamento (OpenGraph)

O `index.html` aponta para `og.png` com título, descrição e dimensões. As URLs
absolutas de `og:url`, `og:image`, `og:image:secure_url` e `twitter:image` já
usam o domínio final `https://recnplay.cin.ufpe.br/`.

O WhatsApp guarda cache do preview. Se o link já foi compartilhado antes,
use uma URL com query string (por exemplo `?v=2`) ou o Facebook Sharing
Debugger para forçar nova leitura.

## Atualizar

Edite `cin-recplay-2026.js` neste repositório e faça commit. O GitHub Pages
republica automaticamente na branch `main`.
