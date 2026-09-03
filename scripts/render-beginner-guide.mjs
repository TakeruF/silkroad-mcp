export function renderBeginnerGuideContent({ guide, project, locale, sitePath, esc, repoUrl, embedded = false }) {
  const text = guide.i18n[locale];
  const label = (en, zh) => locale === 'zh' ? zh : en;
  const list = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const ordered = (items) => `<ol class="steps">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ol>`;
  const routeNav = text.routes.map((route) => `<a class="route-choice" href="#${esc(route.id)}"><span class="route-kicker">${route.id === 'local' ? label('Use on this computer', '在这台电脑上使用') : label('Use on a phone', '在手机上使用')}</span><strong>${esc(route.title)}</strong><span>${esc(route.summary)}</span></a>`).join('');
  const routes = text.routes.map((route) => {
    const promptId = `${embedded ? 'project-' : ''}prompt-${route.id}`;
    const commandsId = `${embedded ? 'project-' : ''}commands-${route.id}`;
    const copyLabel = label('Copy', '复制');
    const codeBox = ({ id, kind, content, className }) => `<div class="code-box">
      <div class="code-toolbar"><span class="code-kind">${kind}</span><button type="button" class="code-copy" data-copy-target="${id}" aria-label="${copyLabel}"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg><span class="copy-label">${copyLabel}</span></button></div>
      <pre id="${id}" class="${className}"><code>${esc(content)}</code></pre>
    </div>`;
    const heading = route.id === 'local'
      ? label('New to the command line? Let an AI set it up', '不熟悉命令行？交给 AI 完成')
      : label('Want to use it from a phone? Let an AI host a private server', '想在手机上使用？让 AI 部署私人服务器');
    return `<section id="${embedded ? 'setup-' : ''}${esc(route.id)}" class="setup-route">
      <h2>${heading}</h2>
      <p class="lead-small">${esc(route.summary)}</p>
      <div class="notice"><strong>${label('Best for:', '适合：')}</strong> ${esc(route.bestFor)}</div>
      <div class="two-column">
        <div><h3>${label('What you need', '需要准备')}</h3>${list(route.needs)}</div>
        <div><h3>${label('Possible cost', '可能的费用')}</h3><p>${esc(route.cost)}</p></div>
      </div>
      <h3>${label('What will happen', '操作步骤')}</h3>${ordered(route.steps)}
      <div class="prompt-heading"><div><h3>${label('Copy this entire request into a coding AI', '把下面整段请求复制给编程 AI')}</h3><p>${label('The AI should perform the setup and prove the result, not stop after giving you a tutorial.', 'AI 应直接执行配置并验证结果，而不是只给你一份教程。')}</p></div></div>
      ${codeBox({id:promptId,kind:label('Setup request','配置请求'),content:route.prompt,className:'prompt'})}
      <h3>${esc(route.manualTitle)}</h3><p>${esc(route.manualIntro)}</p>
      ${codeBox({id:commandsId,kind:label('Terminal','终端'),content:route.commands.join('\n'),className:'commands'})}
      <div class="two-column checklist-grid">
        <div><h3>${label('Do not call it complete until', '满足以下条件才算完成')}</h3>${list(route.success)}</div>
        <div><h3>${label('If something looks wrong', '出现问题时')}</h3>${list(route.troubleshooting)}</div>
      </div>
      <p><a href="${repoUrl(project.source.repository)}#readme">${label('Open the implementation README for exact project details', '打开实现仓库 README 查看准确项目细节')} →</a></p>
    </section>`;
  }).join('');
  const glossary = text.glossary.map((item) => `<div class="term"><dt>${esc(item.term)}</dt><dd>${esc(item.definition)}</dd></div>`).join('');
  const introduction = embedded
    ? `<section class="quick-start"><h2>${label('Quick start', '快速开始')}</h2><p>${label('You can let a coding AI install and configure China Rail MCP. Choose the computer or phone procedure below, copy the full request, and use a real MCP tool call as the completion test.', '你可以让编程 AI 安装并配置 China Rail MCP。根据电脑或手机使用方式选择下面的步骤，复制整段请求，并以一次真实 MCP 工具调用作为完成标准。')}</p></section>`
    : `<p class="eyebrow">${label('Setup guide', '配置指南')} · ${label('Updated', '更新日期')} ${esc(guide.updatedAt)} · <a href="${repoUrl(project.source.repository)}/blob/${esc(guide.sourceCommit)}/${locale === 'en' ? 'README.en.md' : 'README.md'}">${label('source revision', '来源版本')} ${esc(guide.sourceCommit.slice(0, 7))}</a></p>
      <h1>${esc(text.title)}</h1>
      <p class="lead">${esc(text.intro)}</p>
      <div class="notice important"><strong>${label('No 12306 login required.', '不需要登录 12306。')}</strong> ${label('This server only reads public journey-planning data and never books tickets.', '此服务器只读取公开的行程规划数据，绝不会购票。')}</div>
      <section><h2>${esc(text.glossaryTitle)}</h2><dl class="glossary">${glossary}</dl></section>
      <section><h2>${label('Choose the procedure you need', '选择需要的步骤')}</h2><div class="route-grid">${routeNav}</div></section>`;
  return `<${embedded ? 'div' : 'article'} class="guide${embedded ? ' embedded-guide' : ''}">
    ${introduction}
    ${routes}
    <section class="safety"><h2>${esc(text.safetyTitle)}</h2>${list(text.safety)}</section>
    <section><h2>${label('Check whether your AI client supports it', '确认 AI 客户端是否支持')}</h2><p>${label('Plans, regions, and supported connection types change. Check the dated compatibility table before paying or deploying.', '套餐、地区和支持的连接方式会变化。付费或部署前，请查看带核对日期的兼容性表。')}</p><p><a class="button-link" href="${sitePath(`/${locale}/clients/`)}">${label('Open the MCP client table', '查看 MCP 客户端兼容性表')}</a></p></section>
  </${embedded ? 'div' : 'article'}>
  <script>document.querySelectorAll('[data-copy-target]').forEach((button)=>button.addEventListener('click',async()=>{const target=document.getElementById(button.dataset.copyTarget);if(!target)return;const output=button.querySelector('.copy-label')||button;const original=output.textContent;try{await navigator.clipboard.writeText(target.textContent);output.textContent=${JSON.stringify(label('Copied', '已复制'))};}catch{const range=document.createRange();range.selectNodeContents(target);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);output.textContent=${JSON.stringify(label('Selected', '已选中'))};}setTimeout(()=>output.textContent=original,1800);}));</script>`;
}

export function renderBeginnerGuide({ guide, project, locale, sitePath, layout, esc, repoUrl }) {
  return layout(locale, guide.i18n[locale].title, renderBeginnerGuideContent({ guide, project, locale, sitePath, esc, repoUrl }), '', 3);
}
