const fs = require('fs');
const report = JSON.parse(fs.readFileSync(process.env.REPORT || 'preview/report.json', 'utf8'));
const t = report.totals;
const lines = [];
lines.push('## 🤖 Agente de teste de sites');
lines.push('');
lines.push(`- **Ref:** \`${report.ref ?? ''}\` · **sha:** \`${String(report.sha ?? '').slice(0, 10)}\``);
lines.push(`- **Páginas:** ${t.pages} · **erros de console:** ${t.consoleErrors} · **erros de página:** ${t.pageErrors} · **falhas/≥400:** ${t.badResponses}`);
lines.push('');
for (const p of report.pages) {
  lines.push(`### ${p.path}`);
  lines.push('');
  for (const s of p.shots) lines.push(`![${p.path} — ${s}](preview/${s})`);
  lines.push('');
}
const md = lines.join('\n') + '\n';
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
else fs.writeFileSync('summary.md', md);
