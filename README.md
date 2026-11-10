# CIn no REC'n'Play 2026

Programação do CIn-UFPE no REC'n'Play 2026 — 11 a 14 de novembro, Recife.

- **Site:** https://recnplay.cin.ufpe.br/
- **Script:** https://recnplay.cin.ufpe.br/cin-recplay-2026.js

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

- `index.html` — página principal, com metadados OpenGraph. Carrega os
  scripts na ordem: `dados/dias.js`, `dados/atividades.js`,
  `dados/noticias.js`, `estilo.js` e `cin-recplay-2026.js`.
- `dados/dias.js` — dias do evento (`CIN26.DIAS`).
- `dados/atividades.js` — programação (`CIN26.A`): atividades e stand.
- `dados/noticias.js` — notícias (`CIN26.N`), com o HTML completo de cada uma.
- `estilo.js` — logo SVG, CSS e template HTML (`CIN26.L`, `CIN26.CSS`, `CIN26.T`).
- `cin-recplay-2026.js` — apenas o render: lê `window.CIN26` e monta o site.
  Carrega Space Grotesk e Barlow Condensed do Google Fonts (fallbacks
  sans/Impact); não usa bibliotecas externas.
- `og.png` — imagem de compartilhamento 1200×630 (WhatsApp, redes sociais).
- `favicon.svg` — círculo com o gradiente e o símbolo do CIn em branco.
- `favicon-32.png` e `apple-touch-icon.png` — fallbacks para navegadores e iOS.
- `mapa-como-chegar.png` — mapa exibido no botão “Mapa do Stand”.
- `noticias/` — subpáginas das notícias (ex.: `noticias/supertalentos/`).
- `.nojekyll` — evita o processamento do Jekyll no Pages.
- `README.md` — este documento.

## Notícias

A aba **Notícias** é alimentada pelo array `N`, em `dados/noticias.js`:

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
`<html data-news="<slug>">`, carregando os mesmos scripts com prefixo `../../`
(`dados/`, `estilo.js` e `cin-recplay-2026.js`). O exemplo
pronto é `noticias/supertalentos/`.

## Compartilhamento (OpenGraph)

O `index.html` aponta para `og.png` com título, descrição e dimensões. As URLs
absolutas de `og:url`, `og:image`, `og:image:secure_url` e `twitter:image` já
usam o domínio final `https://recnplay.cin.ufpe.br/`.

O WhatsApp guarda cache do preview. Se o link já foi compartilhado antes,
use uma URL com query string (por exemplo `?v=2`) ou o Facebook Sharing
Debugger para forçar nova leitura.

## Atualizar

Edite os arquivos deste repositório e faça commit na `main` — o GitHub Pages
republica automaticamente:

- programação e dias: `dados/atividades.js` e `dados/dias.js`;
- notícias: `dados/noticias.js` (e a subpágina correspondente em `noticias/`);
- visual (CSS, template, logo): `estilo.js`;
- lógica de exibição: `cin-recplay-2026.js`.

Ao mudar qualquer script, suba a versão do `?v=` nos HTMLs para evitar cache.
