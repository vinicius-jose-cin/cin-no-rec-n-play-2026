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
- `cin-recplay-2026.js` — site completo. Carrega a fonte Proxima Nova via CDN
  (fallback sans); não usa bibliotecas externas.
- `og.png` — imagem de compartilhamento 1200×630 (WhatsApp, redes sociais).
- `.nojekyll` — evita o processamento do Jekyll no Pages.
- `README.md` — este documento.

## Compartilhamento (OpenGraph)

O `index.html` já aponta para `og.png` com título, descrição e dimensões.
Depois de configurar o domínio próprio, troque as URLs absolutas de
`og:url`, `og:image` e `twitter:image` para o domínio final.

O WhatsApp guarda cache do preview. Se o link já foi compartilhado antes,
use uma URL com query string (por exemplo `?v=2`) ou o Facebook Sharing
Debugger para forçar nova leitura.

## Atualizar

Edite `cin-recplay-2026.js` neste repositório e faça commit. O GitHub Pages
republica automaticamente na branch `main`.
