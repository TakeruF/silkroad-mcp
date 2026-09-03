export function renderBeginnerGuide({ guide, project, locale, sitePath, layout, esc, repoUrl }) {
  const text = guide.i18n[locale];
  const label = (en, zh) => locale === 'zh' ? zh : en;
  const list = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const ordered = (items) => `<ol class="steps">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ol>`;
  const routeNav = text.routes.map((route) => `<a class="route-choice" href="#${esc(route.id)}"><span class="route-kicker">${route.id === 'local' ? label('Simplest first choice', '最简单的首选') : label('For phones', '适合手机')}</span><strong>${esc(route.title)}</strong><span>${esc(route.summary)}</span></a>`).join('');
  const routes = text.routes.map((route) => {
    const promptId = `prompt-${route.id}`;
    return `<section id="${esc(route.id)}" class="setup-route">
      <p class="eyebrow">${route.id === 'local' ? label('Route A · Local', '路线 A · 本地') : label('Route B · Remote', '路线 B · 远程')}</p>
      <h2>${esc(route.title)}</h2>
      <p class="lead-small">${esc(route.summary)}</p>
      <div class="notice"><strong>${label('Best for:', '适合：')}</strong> ${esc(route.bestFor)}</div>
      <div class="two-column">
        <div><h3>${label('What you need', '需要准备')}</h3>${list(route.needs)}</div>
        <div><h3>${label('Possible cost', '可能的费用')}</h3><p>${esc(route.cost)}</p></div>
      </div>
      <h3>${label('Follow these steps', '按这些步骤操作')}</h3>${ordered(route.steps)}
      <div class="prompt-heading"><div><h3>${label('Copy this request into a coding AI', '把这段请求复制给编程 AI')}</h3><p>${label('It asks the AI to do the setup and prove the result, while stopping before sensitive or costly actions.', '它会要求 AI 直接完成配置并验证结果，同时在敏感或付费操作前停下来确认。')}</p></div><button type="button" class="copy-button" data-copy-target="${promptId}">${label('Copy request', '复制请求')}</button></div>
      <pre id="${promptId}" class="prompt"><code>${esc(route.prompt)}</code></pre>
      <h3>${esc(route.manualTitle)}</h3><p>${esc(route.manualIntro)}</p>
      <pre class="commands"><code>${esc(route.commands.join('\n'))}</code></pre>
      <div class="two-column checklist-grid">
        <div><h3>${label('Done means all of these', '全部满足才算完成')}</h3>${list(route.success)}</div>
        <div><h3>${label('If something looks wrong', '出现问题时')}</h3>${list(route.troubleshooting)}</div>
      </div>
      <p><a href="${repoUrl(project.source.repository)}#readme">${label('Open the implementation README for exact project details', '打开实现仓库 README 查看准确项目细节')} →</a></p>
    </section>`;
  }).join('');
  const glossary = text.glossary.map((item) => `<div class="term"><dt>${esc(item.term)}</dt><dd>${esc(item.definition)}</dd></div>`).join('');
  const body = `<article class="guide">
    <p class="eyebrow">${label('Beginner guide', '新手指南')} · ${label('Updated', '更新日期')} ${esc(guide.updatedAt)} · <a href="${repoUrl(project.source.repository)}/blob/${esc(guide.sourceCommit)}/${locale === 'en' ? 'README.en.md' : 'README.md'}">${label('source revision', '来源版本')} ${esc(guide.sourceCommit.slice(0, 7))}</a></p>
    <h1>${esc(text.title)}</h1>
    <p class="lead">${esc(text.intro)}</p>
    <div class="notice important"><strong>${label('No 12306 login required.', '不需要登录 12306。')}</strong> ${label('This server only reads public journey-planning data and never books tickets.', '此服务器只读取公开的行程规划数据，绝不会购票。')}</div>
    <section><h2>${esc(text.glossaryTitle)}</h2><dl class="glossary">${glossary}</dl></section>
    <section><h2>${esc(text.startTitle)}</h2><p>${esc(text.startIntro)}</p><div class="route-grid">${routeNav}</div></section>
    ${routes}
    <section class="safety"><h2>${esc(text.safetyTitle)}</h2>${list(text.safety)}</section>
    <section><h2>${label('Choose or recheck your AI client', '选择或重新核对 AI 客户端')}</h2><p>${label('Plans, regions, and supported connection types change. Use the dated compatibility guide before paying or deploying.', '套餐、地区和支持的连接方式会变化。付费或部署前，请查看带核对日期的兼容性指南。')}</p><p><a class="button-link" href="${sitePath(`/${locale}/clients/`)}">${label('Open the MCP client guide', '打开 MCP 客户端指南')}</a></p></section>
  </article>
  <script>document.querySelectorAll('[data-copy-target]').forEach((button)=>button.addEventListener('click',async()=>{const target=document.getElementById(button.dataset.copyTarget);if(!target)return;const original=button.textContent;try{await navigator.clipboard.writeText(target.textContent);button.textContent=${JSON.stringify(label('Copied', '已复制'))};}catch{const range=document.createRange();range.selectNodeContents(target);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);button.textContent=${JSON.stringify(label('Selected — copy manually', '已选中，请手动复制'))};}setTimeout(()=>button.textContent=original,2200);}));</script>`;
  return layout(locale, text.title, body, '', 3);
}
