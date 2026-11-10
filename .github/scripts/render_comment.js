const fs = require('fs');
const report = JSON.parse(fs.readFileSync(process.env.REPORT || 'preview/report.json', 'utf8'));
const e = (k, d = '') => process.env[k] ?? d;
const raw = `https://raw.githubusercontent.com/${e('GITHUB_REPOSITORY')}/${e('PREVIEW_BRANCH', 'site-preview')}/pr-${e('PR_NUMBER')}`;
const t = report.totals;
const ok = t.consoleErrors === 0 && t.pageErrors === 0 && t.badResponses === 0;
const lines = [];
lines.push('<!-- site-preview-agent -->');
lines.push(`## 🤖 Agente de teste de sites — PR #${e('PR_NUMBER')}`);
lines.push('');
lines.push(`- **Branch:** \`${e('BRANCH')}\``);
lines.push(`- **Commit:** \`${String(e('SHA')).slice(0, 10)}\``);
lines.push(`- **Páginas visitadas:** ${t.pages} · **erros de console:** ${t.consoleErrors} · **erros de página:** ${t.pageErrors} · **requisições com falha/≥400:** ${t.badResponses}`);
lines.push('');
lines.push('### Telas capturadas');
lines.push('');
for (const p of report.pages) {
  for (const s of p.shots) {
    const mobile = s.includes('mobile');
    lines.push(`<details><summary>${mobile ? '📱 mobile' : '🖥️ desktop'} — <code>${p.path}</code></summary>`);
    lines.push('');
    lines.push(`<img src="${raw}/${s}" width="${mobile ? 300 : 640}">`);
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }
}
lines.push('### Resultado dos testes');
lines.push('');
if (ok) {
  lines.push('- ✅ Nenhum erro de console, exceção de página ou requisição com falha.');
} else {
  lines.push('- ⚠️ Problemas encontrados:');
  for (const p of report.pages) {
    for (const err of p.consoleErrors) lines.push(`- \`${p.path}\` console: ${err}`);
    for (const err of p.pageErrors) lines.push(`- \`${p.path}\` página: ${err}`);
    for (const r of p.badResponses) lines.push(`- \`${p.path}\` requisição: ${r.status ?? r.error} — ${r.url}`);
  }
}
lines.push('');
lines.push('### 🗳️ Aprovação remota');
lines.push('');
lines.push(`Comente neste PR com **\`/aprovar\`** para aprovar (o check \`site-preview/approval\` fica verde) ou **\`/reprovar\`** para reprovar (fica vermelho). Apenas colaboradores com permissão de escrita no repositório podem aprovar.`);
lines.push('');
lines.push(`[Ver todos os screenshots no artifact deste run](${e('GITHUB_SERVER_URL')}/${e('GITHUB_REPOSITORY')}/actions/runs/${e('GITHUB_RUN_ID')})`);
fs.writeFileSync(process.env.OUT || 'comment.md', lines.join('\n') + '\n');
