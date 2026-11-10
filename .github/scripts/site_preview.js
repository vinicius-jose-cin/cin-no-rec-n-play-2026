const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function parseArgs(argv) {
  const args = { 'max-pages': '30', 'base-url': 'http://127.0.0.1:8123', 'out-dir': 'preview' };
  for (let i = 2; i < argv.length; i += 2) {
    args[argv[i].replace(/^--/, '')] = argv[i + 1];
  }
  return args;
}

function normalizePath(p) {
  let out = p || '/';
  if (out.endsWith('/index.html')) out = out.slice(0, -'index.html'.length);
  if (out === '') out = '/';
  return out;
}

function slugFor(p) {
  if (p === '/') return 'home';
  const s = normalizePath(p).replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');
  return s || 'page';
}

async function collectLinks(page, origin) {
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
  const out = new Set();
  for (const href of hrefs) {
    if (!href) continue;
    let url;
    try {
      url = new URL(href, origin);
    } catch {
      continue;
    }
    if (url.origin !== origin) continue;
    if (/\.(png|jpe?g|gif|svg|css|js|mjs|ico|webp|avif|woff2?|ttf|otf|map|json|xml|pdf|zip|mp4|webm)$/i.test(url.pathname)) continue;
    url.hash = '';
    out.add(normalizePath(url.pathname) + (url.search || ''));
  }
  return [...out];
}

async function main() {
  const args = parseArgs(process.argv);
  const baseUrl = args['base-url'].replace(/\/$/, '');
  const origin = new URL(baseUrl).origin;
  const maxPages = parseInt(args['max-pages'], 10);
  const outDir = args['out-dir'];
  fs.mkdirSync(path.join(outDir, 'shots'), { recursive: true });

  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: process.env.CHROME_PATH ? ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] : undefined,
  });
  const queue = ['/'];
  const seen = new Set(['/']);
  const report = {
    baseUrl,
    generatedAt: new Date().toISOString(),
    sha: process.env.GITHUB_SHA || null,
    ref: process.env.GITHUB_REF || null,
    pages: [],
  };

  for (let i = 0; i < queue.length; i++) {
    if (queue.length > maxPages) break;
    const p = queue[i];
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const consoleErrors = [];
    const pageErrors = [];
    const badResponses = [];
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text());
    });
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    page.on('response', (r) => {
      if (r.status() >= 400) badResponses.push({ url: r.url(), status: r.status() });
    });
    page.on('requestfailed', (r) => badResponses.push({ url: r.url(), error: r.failure() ? r.failure().errorText : 'failed' }));

    let status = null;
    try {
      const resp = await page.goto(baseUrl + p, { waitUntil: 'load', timeout: 30000 });
      status = resp ? resp.status() : null;
      await page.waitForTimeout(800);
    } catch (e) {
      pageErrors.push('goto: ' + String(e));
    }

    const slug = slugFor(p);
    const shots = [];
    const desktop = path.join(outDir, 'shots', `${slug}-desktop.png`);
    await page.screenshot({ path: desktop, fullPage: true });
    shots.push(`shots/${slug}-desktop.png`);
    if (p === '/') {
      const clickTab = async (id) => {
        try {
          await page.click(`#${id}`, { timeout: 2000 });
          await page.waitForTimeout(400);
        } catch {}
      };
      await clickTab('tab-news');
      const newsDesktop = path.join(outDir, 'shots', `${slug}-noticias-desktop.png`);
      await page.screenshot({ path: newsDesktop, fullPage: true });
      shots.push(`shots/${slug}-noticias-desktop.png`);
      await clickTab('tab-prog');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(400);
      const mobile = path.join(outDir, 'shots', `${slug}-mobile.png`);
      await page.screenshot({ path: mobile, fullPage: true });
      shots.push(`shots/${slug}-mobile.png`);
      await clickTab('tab-news');
      const newsMobile = path.join(outDir, 'shots', `${slug}-noticias-mobile.png`);
      await page.screenshot({ path: newsMobile, fullPage: true });
      shots.push(`shots/${slug}-noticias-mobile.png`);
      await clickTab('tab-prog');
      await page.setViewportSize({ width: 1440, height: 900 });
    }

    report.pages.push({ path: p, status, shots, consoleErrors, pageErrors, badResponses });

    if (status === 200 || status === null) {
      try {
        const tabs = await page.$$('button[aria-pressed], .vtab');
        for (const t of tabs) {
          try { await t.click({ timeout: 2000 }); await page.waitForTimeout(300); } catch {}
        }
        for (const link of await collectLinks(page, origin)) {
          if (!seen.has(link)) {
            seen.add(link);
            if (queue.length < maxPages) queue.push(link);
          }
        }
      } catch {
        pageErrors.push('crawl: falha ao coletar links');
      }
    }
    await page.close();
  }

  report.totals = {
    pages: report.pages.length,
    consoleErrors: report.pages.reduce((n, x) => n + x.consoleErrors.length, 0),
    pageErrors: report.pages.reduce((n, x) => n + x.pageErrors.length, 0),
    badResponses: report.pages.reduce((n, x) => n + x.badResponses.length, 0),
  };
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report.totals));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
