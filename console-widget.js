/* =====================================================
   Console Widget · in-page terminal
   Sits in the bottom-right of every page.
   Click pill or press backtick (`) to expand.
   ===================================================== */

(function() {
  'use strict';

  const HISTORY_KEY = '__console_history';
  const STATE_KEY = '__console_state';

  // Routes (mirror site.js keyboard map)
  const ROUTES = {
    home:        'index.html',
    work:        'work.html',
    visualdiff:  'visual-diff.html',
    'visual-diff': 'visual-diff.html',
    aiotcc:      'aio-tcc.html',
    'aio-tcc':   'aio-tcc.html',
    writing:     'writing.html',
    about:       'about.html',
    qa:          'case-qa-agent-skill.html',
    'qa-agent':  'case-qa-agent-skill.html',
    'qa-agent-skill': 'case-qa-agent-skill.html',
    'case-qa-agent-skill': 'case-qa-agent-skill.html',
    triage:      'case-multimodal-triage.html',
    multimodal:  'case-multimodal-triage.html',
    'multimodal-triage': 'case-multimodal-triage.html',
    'case-multimodal-triage': 'case-multimodal-triage.html',
    adb:         'case-adb-mcp.html',
    'adb-mcp':   'case-adb-mcp.html',
    'case-adb-mcp': 'case-adb-mcp.html',
    'self-healing': 'case-self-healing.html',
    selfhealing: 'case-self-healing.html',
    'case-self-healing': 'case-self-healing.html',
    codex:       'case-codex-browser.html',
    'codex-browser': 'case-codex-browser.html',
    'case-codex-browser': 'case-codex-browser.html',
    caffeinate:  'case-caffeinate.html',
    'case-caffeinate': 'case-caffeinate.html',
    mailosaur:   'case-mailosaur-mcp.html',
    'case-mailosaur-mcp': 'case-mailosaur-mcp.html',
    skeleton:    'case-skeleton-loader.html',
    'skeleton-loader': 'case-skeleton-loader.html',
    'case-skeleton-loader': 'case-skeleton-loader.html',
    'llm-eval':  'case-llm-eval.html',
    llmeval:     'case-llm-eval.html',
    'case-llm-eval': 'case-llm-eval.html',
    slack:       'case-slack-bots.html',
    'slack-bots': 'case-slack-bots.html',
    'case-slack-bots': 'case-slack-bots.html',
    'bot-detection': 'case-bot-detection.html',
    botdetection: 'case-bot-detection.html',
    'case-bot-detection': 'case-bot-detection.html',
    hitl:        'essay-ai-hitl.html',
    'ai-hitl':   'essay-ai-hitl.html',
    'essay-ai-hitl': 'essay-ai-hitl.html',
    'scalable-automation': 'essay-scalable-automation.html',
    'essay-scalable-automation': 'essay-scalable-automation.html',
    scalable:    'essay-scalable-automation.html',
  };

  const COMMANDS = {
    help: {
      desc: 'Show available commands',
      run: () => {
        const W = 30;
        const cat = (label) => {
          const dashes = '─'.repeat(Math.max(2, W - label.length - 4));
          return `\n<span class="c-dim">── ${label} ${dashes}</span>`;
        };
        const row = (name, args, desc) =>
          `  <span class="c-pass">${name.padEnd(10)}</span><span class="c-info">${args.padEnd(9)}</span><span class="c-dim">${desc}</span>`;
        return [
          cat('navigation'),
          row('ls',       '',        'list all case studies'),
          row('open',     '<page>',  'navigate to any page'),
          row('pwd',      '',        'current location'),
          cat('identity'),
          row('whoami',   '',        'who is anmol'),
          row('uname',    '',        'system information'),
          row('uptime',   '',        'time in production'),
          cat('portfolio'),
          row('test',     '',        'run the test suite'),
          row('coverage', '',        'skill coverage report'),
          row('stack',    '',        'full tech stack'),
          row('log',      '',        'career as git commits'),
          cat('career'),
          row('hire',     '',        'the roi case'),
          row('ping',     '',        'get in touch'),
          cat('misc'),
          row('ps',       '',        'active processes'),
          row('fortune',  '',        'wisdom from qa'),
          row('secrets',  '',        '???'),
          row('sudo',     '',        'try it'),
          row('history',  '',        'command history'),
          row('echo',     '<text>',  'echo arguments'),
          row('clear',    '',        'clear terminal'),
          row('exit',     '',        'close console'),
        ].join('\n');
      }
    },
    whoami: {
      desc: 'Who is anmol',
      run: () => [
        '<span class="c-strong">ANMOL SOIN</span>',
        '<span class="c-dim">── QA Engineer ─────────────────────────────</span>',
        '',
        '  <span class="c-dim">Currently</span>   Lotusflare · T-Mobile US MVNE (Smartless Mobile)',
        '  <span class="c-dim">Previously</span>  L&amp;T Technology Services · led a 6-engineer automation pod',
        '  <span class="c-dim">Experience</span>  2.5 years shipping to production',
        '',
        '  I build test infrastructure that doesn\'t need babysitting.',
        '  Self-healing frameworks, LLM eval pipelines, Slack RCA bots —',
        '  systems that catch problems before humans do.',
        '',
        '  <span class="c-dim">▸</span> <span class="c-info">linkedin.com/in/mrnewdelhi</span>',
        '  <span class="c-dim">▸</span> <span class="c-info">github.com/MrNewDelhi</span>',
        '  <span class="c-dim">▸</span> <span class="c-info">medium.com/@anmolsoin1</span>',
      ].join('\n')
    },
    uname: {
      desc: 'System information',
      run: () => [
        '  <span class="c-dim">System:</span>   QA Engineering Terminal v1.0.0',
        '  <span class="c-dim">Host:</span>     Anmol Soin @ Lotusflare · T-Mobile US MVNE',
        '  <span class="c-dim">Kernel:</span>   Playwright 18 · Appium · Gemini 3 · MCP',
        '  <span class="c-dim">Shell:</span>    TypeScript · Java · Python · SQL',
        '  <span class="c-dim">Memory:</span>   622 test specs · 12 shipped projects · 0 P0 incidents',
        '  <span class="c-dim">Load:</span>     <span class="c-pass">deterministic</span>',
      ].join('\n')
    },
    uptime: {
      desc: 'Time in production',
      run: () => [
        '  up <span class="c-pass">2 years, 5 months</span>  ·  continuously deployed',
        '  <span class="c-dim">0 rollbacks</span>  ·  <span class="c-dim">0 P0 incidents</span>  ·  <span class="c-pass">98.4% suite coverage</span>',
        '  load: high during releases — <span class="c-pass">always green by merge</span>',
      ].join('\n')
    },
    test: {
      desc: 'Run the test suite',
      run: (ctx) => {
        const specs = [
          ['regression.spec.ts',       '500 tests', 'pass', '14.2'],
          ['account-pool.spec.ts',       '18 tests', 'pass',  '8.0'],
          ['outage-resilience.spec.ts',   '6 tests', 'pass',  '3.1'],
          ['multimodal-triage.spec.ts',  '12 tests', 'pass',  '4.6'],
          ['aio-intake.spec.ts',         '24 tests', 'pass',  '6.4'],
          ['slack-rca-agent.spec.ts',     '9 tests', 'pass',  '2.2'],
          ['llm-eval.spec.ts',           '16 tests', 'pass',  '7.8'],
          ['visual-diff.spec.ts',        '32 tests', 'pass', '11.4'],
          ['bot-detection.spec.ts',       '4 tests', 'pass',  '2.0'],
          ['team-leadership.spec.ts',     '1 test',  'pass',  '5.5'],
        ];
        ctx.streamLines(specs.map(([f, n, status, t]) => {
          const sym = status === 'pass' ? '✓' : status === 'flaky' ? '⚠' : '✗';
          const cls = status === 'pass' ? 'c-pass' : status === 'flaky' ? 'c-warn' : 'c-fail';
          return `<span class="${cls}">${sym}</span>  ${f.padEnd(28)} <span class="c-dim">${n.padStart(9)}</span>  <span class="c-dim">${t}s</span>`;
        }), 70);
        ctx.streamLines([
          '',
          'Tests:  <span class="c-pass">622 passed</span>, 622 total',
          'Time:   2.5 years',
          'Coverage: <span class="c-pass">98.4%</span>',
        ], 70, specs.length * 70 + 60);
        return null;
      }
    },
    coverage: {
      desc: 'Skill coverage report',
      run: () => [
        '<span class="c-dim">── skill coverage ──────────────────────────</span>',
        '',
        '  AI for QA           <span class="c-pass">97%</span>  <span class="c-dim">███████████████████░  </span> production',
        '  Test Automation     <span class="c-pass">99%</span>  <span class="c-dim">████████████████████  </span> production',
        '  API &amp; Reliability   <span class="c-pass">95%</span>  <span class="c-dim">███████████████████░  </span> production',
        '  CI/CD &amp; Infra       <span class="c-pass">96%</span>  <span class="c-dim">███████████████████░  </span> production',
        '  Leadership          <span class="c-pass">88%</span>  <span class="c-dim">█████████████████░░░  </span> active',
        '',
        '  <span class="c-dim">type</span> <span class="c-pass">open work</span> <span class="c-dim">to see all 14 case studies</span>',
      ].join('\n')
    },
    stack: {
      desc: 'Full tech stack',
      run: () => {
        const g = (label, items) =>
          `<span class="c-pass">${label.padEnd(16)}</span><span class="c-dim">${items}</span>`;
        return [
          g('AI / Agents',   'MCP · Codex · ChatGPT Enterprise · Gemini 3 · Browser Use · Computer Use'),
          g('LLM Eval',      'rubrics · cost hooks · token tracking · 8 model families (GPT-4o · Gemini · Claude · Llama · Mistral · Qwen · Phi · Grok)'),
          g('AI Skills',     'Markdown skills · system prompts · memory design · RAG vs skills trade-offs'),
          g('Automation',    'Playwright · Selenium · Appium (iOS + Android) · Reflect.run'),
          g('Frameworks',    'TestNG · Maven · POM · Page Object Model'),
          g('Languages',     'TypeScript · Java · Python · SQL'),
          g('CI/CD',         'GitHub Actions · Jenkins · BrowserStack · Docker · Tailscale'),
          g('Infra',         'PostgreSQL · test-data pool · MITM proxy hooks'),
          g('Observability', 'Victoria Logs · Sentry · Lighthouse'),
          g('Test Mgmt',     'AIO · Jira · Xray · Zephyr · TestRail · Allure'),
        ].join('\n');
      }
    },
    ls: {
      desc: 'List all case studies and writing',
      run: () => [
        '<span class="c-dim">── case studies ─────────────────────────────</span>',
        '<span class="c-pass">qa-agent-skill</span>       <span class="c-dim">Playwright QA agent skill stack · 23 sub-skills</span>',
        '<span class="c-pass">visual-diff</span>          <span class="c-dim">Visual Diff Analyzer — semantic pixel diff</span>',
        '<span class="c-pass">aio-tcc</span>              <span class="c-dim">AIO Test Case Creator skill</span>',
        '<span class="c-pass">multimodal-triage</span>    <span class="c-dim">Gemini 3 ticket triage pipeline</span>',
        '<span class="c-pass">self-healing</span>         <span class="c-dim">Self-healing Appium framework</span>',
        '<span class="c-pass">adb-mcp</span>              <span class="c-dim">Open-source MCP server for ADB · 38 tools</span>',
        '<span class="c-pass">codex-browser</span>        <span class="c-dim">Codex in-browser with security</span>',
        '<span class="c-pass">slack-bots</span>           <span class="c-dim">ChatGPT Enterprise Slack bots</span>',
        '<span class="c-pass">mailosaur</span>            <span class="c-dim">Mailosaur MCP email-testing tool</span>',
        '<span class="c-pass">skeleton-loader</span>      <span class="c-dim">Stabilizing visual tests through skeletons</span>',
        '<span class="c-pass">llm-eval</span>             <span class="c-dim">LLM evaluation rubrics · 8 model families</span>',
        '<span class="c-pass">bot-detection</span>        <span class="c-dim">Bot-detection bypass for prod smoke</span>',
        '<span class="c-pass">caffeinate</span>           <span class="c-dim">CaffeinateBar macOS menu bar utility</span>',
        '',
        '<span class="c-dim">── writing ──────────────────────────────────</span>',
        '<span class="c-info">scalable-automation</span>  <span class="c-dim">Design patterns for unreliable interfaces · medium · linkedin</span>',
        '<span class="c-info">hitl</span>                 <span class="c-dim">AI accelerates. Humans still decide. · essay</span>',
        '',
        '<span class="c-dim">usage:</span> <span class="c-pass">open</span> &lt;name&gt;  or just  <span class="c-pass">open work</span>  /  <span class="c-pass">open writing</span>',
      ].join('\n')
    },
    open: {
      desc: 'Open a page',
      args: '<page>',
      run: (ctx, args) => {
        const target = (args[0] || '').toLowerCase();
        if (!target) return '<span class="c-fail">×</span> missing argument · try <span class="c-pass">open work</span>';
        if (ROUTES[target]) {
          ctx.print('<span class="c-pass">→</span> opening <span class="c-strong">' + target + '</span>...');
          setTimeout(() => window.location.href = ROUTES[target], 350);
          return null;
        }
        return '<span class="c-fail">×</span> unknown page: <span class="c-strong">' + target + '</span> · try <span class="c-pass">ls</span>';
      }
    },
    log: {
      desc: 'Career as git commits',
      run: () => [
        '<span class="c-pass">commit</span> f2a8c31  <span class="c-dim">(HEAD → main, origin/main)</span>',
        '<span class="c-dim">│</span>  feat: Gemini 3 multimodal triage pipeline · Lotusflare',
        '<span class="c-dim">│</span>  <span class="c-dim">100% classification accuracy · MCP-integrated · in production</span>',
        '<span class="c-dim">│</span>  <span class="c-dim">2024-06 – present</span>',
        '',
        '<span class="c-pass">commit</span> 9e4d1b7',
        '<span class="c-dim">│</span>  feat: open-source MCP servers — ADB MCP + Mailosaur MCP',
        '<span class="c-dim">│</span>  <span class="c-dim">38 ADB tools exposed to AI agents · published on GitHub · LTTS</span>',
        '<span class="c-dim">│</span>  <span class="c-dim">2024-03</span>',
        '',
        '<span class="c-pass">commit</span> 4d7b9e1',
        '<span class="c-dim">│</span>  feat: self-healing Appium locator framework',
        '<span class="c-dim">│</span>  <span class="c-dim">DOM heuristics → OCR → vision model · multi-model cascade · LTTS</span>',
        '<span class="c-dim">│</span>  <span class="c-dim">2024-01</span>',
        '',
        '<span class="c-pass">commit</span> 2f8a3c5',
        '<span class="c-dim">│</span>  feat: 6-engineer automation pod lead · LTTS',
        '<span class="c-dim">│</span>  <span class="c-dim">iOS + Android + web · two T-Mobile US MVNEs · promoted internally</span>',
        '<span class="c-dim">│</span>  <span class="c-dim">2023-06</span>',
        '',
        '<span class="c-pass">commit</span> a1e4b7d',
        '<span class="c-dim">│</span>  init: QA Engineer · first production Playwright suite',
        '<span class="c-dim">│</span>  <span class="c-dim">2022-06</span>',
      ].join('\n')
    },
    hire: {
      desc: 'The roi case',
      run: () => {
        const r = (label, impact) =>
          `  ${label.padEnd(22)}<span class="c-pass">→</span>  ${impact}`;
        return [
          '<span class="c-pass">Because</span> you will save more than you spend.',
          '',
          '<span class="c-dim">── what I bring ──────────────────────────────────────────</span>',
          '',
          r('Playwright suite',      'replaces 40h/sprint of manual regression'),
          r('Self-healing locators', 'eliminates flaky-test triage entirely'),
          r('LLM eval rubric',       'catches prompt regressions before they merge'),
          r('Slack RCA bot',         'cuts incident response from 45 min to 15 min'),
          r('MCP tooling',           'AI agents run QA workflows without shell glue'),
          '',
          '  <span class="c-dim">One engineer. Multiplied across your entire release cycle.</span>',
          '',
          '<span class="c-dim">ready to talk →</span> <span class="c-info">anmolsoin1@gmail.com</span>',
        ].join('\n');
      }
    },
    ping: {
      desc: 'Get in touch',
      run: () => [
        'PING <span class="c-info">anmolsoin1@gmail.com</span>',
        '  64 bytes: seq=1 latency=&lt;24h   <span class="c-info">anmolsoin1@gmail.com</span>',
        '  64 bytes: seq=2 latency=same   <span class="c-info">linkedin.com/in/mrnewdelhi</span>',
        '  64 bytes: seq=3 latency=&lt;1h    <span class="c-info">github.com/MrNewDelhi</span>',
        '<span class="c-dim">--- ping statistics ---</span>',
        '3 packets transmitted, 3 received, <span class="c-pass">0% packet loss</span>',
      ].join('\n')
    },
    ps: {
      desc: 'Active processes',
      run: () => [
        '  <span class="c-dim">PID  STAT  COMMAND</span>',
        '    1  <span class="c-pass">run</span>   playwright-automation @ Lotusflare',
        '    2  <span class="c-pass">run</span>   mcp-server-maintenance (adb-mcp · mailosaur-mcp)',
        '    3  <span class="c-pass">run</span>   llm-eval-rubric-v2',
        '    4  <span class="c-dim">slp</span>   job-search --target=ai-first',
        '    5  <span class="c-dim">bg</span>    open-source-contributions',
      ].join('\n')
    },
    secrets: {
      desc: '???',
      run: () => {
        if (!window.__konamiUnlocked) {
          return [
            '<span class="c-fail">access denied.</span>',
            '',
            '<span class="c-dim">unlock hint:</span>',
            '  1. click anywhere on the page (outside this console)',
            '  2. press this key sequence on your keyboard:',
            '     <span class="c-pass">↑ ↑ ↓ ↓ ← → ← → B A</span>',
            '  3. watch for the gold flash, then come back and type <span class="c-pass">secrets</span>',
          ].join('\n');
        }
        return [
          '<span class="c-pass">★ access granted.</span>',
          '<span class="c-dim">decrypting classified records...</span>',
          '',
          '  <span class="c-dim">name:</span>      Anmol Soin',
          '  <span class="c-dim">alias:</span>     mrnewdelhi',
          '  <span class="c-dim">clearance:</span> L4-QA-ENGINEER',
          '  <span class="c-dim">status:</span>    <span class="c-pass">available for hire</span>',
          '',
          '<span class="c-dim">── field notes ────────────────</span>',
          '  • fixed a prod outage by reading a Victoria Logs query, not a test',
          '  • the self-healing locator system runs in prod — nobody notices because nothing breaks',
          '  • the bot-detection bypass works because I read the spec, not the workaround',
          '  • wrote the LLM eval rubric in a weekend; it\'s been catching regressions ever since',
          '',
          '<span class="c-dim">contact →</span> <span class="c-info">anmolsoin1@gmail.com</span>',
          '<span class="c-dim">resume  →</span> <span class="c-info">assets/resume/Anmol_Soin_QA_Engineer_Resume.pdf</span>',
        ].join('\n');
      }
    },
    sudo: {
      desc: 'Try it',
      run: (ctx, args) => {
        if (args.includes('hire-me')) {
          return '<span class="c-pass">✓</span> request submitted. <span class="c-dim">expect a fast reply at anmolsoin1@gmail.com</span>';
        }
        return '<span class="c-fail">×</span> anmol is not in the sudoers file. <span class="c-dim">this incident will be reported.</span>';
      }
    },
    clear: {
      desc: 'Clear the terminal',
      run: (ctx) => { ctx.clear(); return null; }
    },
    history: {
      desc: 'Command history',
      run: (ctx) => ctx.history.slice(-20).map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`).join('\n')
    },
    pwd: {
      desc: 'Current location',
      run: () => '<span class="c-pass">/' + (location.pathname.split('/').pop().replace('.html', '') || 'index') + '</span>'
    },
    echo: {
      desc: 'Echo arguments',
      args: '<text>',
      run: (ctx, args) => args.join(' ')
    },
    fortune: {
      desc: 'Wisdom from a QA engineer',
      run: () => {
        const fortunes = [
          '"It works on staging" is not a release plan.',
          'Flaky tests are bugs in your tests. Fix them or delete them.',
          'The bot-detection is on for a reason. Find the token-shaped third option.',
          'If the same toil shows up twice, write the thing that kills it.',
          'A boring suite that runs the same way every time beats a magical one that fails on Tuesdays.',
          'Locator maintenance is the boring tax on mobile automation.',
          'Prompting alone is not a strategy. Eval is.',
          'AI is great at execution. Humans are still on the hook for judgment.',
          'Coverage that doesn\'t include production smoke is coverage theater.',
          'The best test is the one you don\'t have to maintain.',
          'An incident without an RCA is just the first chapter.',
          'Test data is infrastructure. Treat it like infrastructure.',
          'If your CI passes but prod breaks, your CI is lying to you.',
          'The second time you write the same test helper, extract it. The first time, don\'t.',
          'Scripts assume perfect preconditions. Production never provides them. Build for the mess.',
          'Anchor to a container before selecting children. Never query globally for something that lives in a list.',
          'Static waits are hope-based testing. Wait for state, not for time.',
        ];
        return '<span class="c-dim">' + fortunes[Math.floor(Math.random() * fortunes.length)] + '</span>';
      }
    },
    exit: {
      desc: 'Close the console',
      run: (ctx) => { ctx.close(); return null; }
    },
  };

  // ============== BUILD WIDGET ==============
  function buildWidget() {
    if (document.getElementById('console-widget')) return;

    const root = document.createElement('div');
    root.id = 'console-widget';
    root.className = 'console-widget collapsed';
    root.innerHTML = `
      <button class="cw-pill" data-action="open" aria-label="Open console">
        <span class="cw-pill-dot"></span>
        <span class="cw-pill-label">console</span>
        <span class="cw-pill-key">\`</span>
      </button>
      <div class="cw-window">
        <header class="cw-head">
          <div class="cw-lights"><span></span><span></span><span></span></div>
          <div class="cw-title">anmol@qa-console · ~</div>
          <div class="cw-actions">
            <button data-action="clear" title="Clear">clear</button>
            <button data-action="close" title="Close">×</button>
          </div>
        </header>
        <div class="cw-output" id="cw-output"></div>
        <form class="cw-input-row" autocomplete="off">
          <span class="cw-prompt">&gt;</span>
          <input class="cw-input" type="text" autocomplete="off" spellcheck="false" placeholder="type help" />
          <span class="cw-cursor"></span>
        </form>
      </div>
    `;
    document.body.appendChild(root);

    const win = root.querySelector('.cw-window');
    const output = root.querySelector('#cw-output');
    const input = root.querySelector('.cw-input');
    const form = root.querySelector('.cw-input-row');
    const pill = root.querySelector('.cw-pill');

    let history = [];
    try { history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch (e) {}
    let historyIdx = history.length;

    const ctx = {
      print(html) {
        const div = document.createElement('div');
        div.className = 'cw-line';
        div.innerHTML = html;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
      },
      streamLines(lines, msPerLine = 80, delay = 0) {
        lines.forEach((line, i) => {
          setTimeout(() => { ctx.print(line); }, delay + i * msPerLine);
        });
      },
      clear() {
        output.innerHTML = '';
        printWelcome();
      },
      close() {
        root.classList.add('collapsed');
        localStorage.setItem(STATE_KEY, 'closed');
      },
      open() {
        root.classList.remove('collapsed');
        localStorage.setItem(STATE_KEY, 'open');
        setTimeout(() => input.focus(), 60);
      },
      get history() { return history; }
    };

    function printWelcome() {
      ctx.streamLines([
        '<span class="c-dim">── qa-console · v1.0.0 ─────────────────────</span>',
        '  <span class="c-strong">Anmol Soin</span>  <span class="c-dim">·  QA Engineer  ·  Lotusflare</span>',
        '',
        '  <span class="c-pass">help</span>    <span class="c-dim">→  all commands</span>',
        '  <span class="c-pass">ls</span>      <span class="c-dim">→  browse 13 case studies + 2 essays</span>',
        '  <span class="c-pass">whoami</span>  <span class="c-dim">→  who is anmol</span>',
        '  <span class="c-pass">hire</span>    <span class="c-dim">→  the roi case</span>',
        '<span class="c-dim">────────────────────────────────────────────</span>',
      ], 35);
    }

    function runCommand(line) {
      if (!line.trim()) {
        ctx.print('<span class="cw-prompt">&gt;</span>');
        return;
      }
      history.push(line);
      if (history.length > 50) history = history.slice(-50);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (e) {}
      historyIdx = history.length;

      ctx.print('<span class="cw-prompt">&gt;</span> <span class="c-strong">' + line + '</span>');

      const parts = line.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      const handler = COMMANDS[cmd];
      if (!handler) {
        ctx.print('<span class="c-fail">×</span> command not found: <span class="c-strong">' + cmd + '</span> · try <span class="c-pass">help</span>');
        return;
      }
      try {
        const out = handler.run(ctx, args);
        if (out !== null && out !== undefined) ctx.print(out);
      } catch (e) {
        ctx.print('<span class="c-fail">×</span> error: ' + e.message);
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value;
      runCommand(v);
      input.value = '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIdx > 0) historyIdx--;
        input.value = history[historyIdx] || '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < history.length - 1) {
          historyIdx++;
          input.value = history[historyIdx] || '';
        } else {
          historyIdx = history.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.value.trim().toLowerCase();
        if (!partial) return;
        const match = Object.keys(COMMANDS).find(c => c.startsWith(partial));
        if (match) input.value = match;
      }
    });

    root.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.getAttribute('data-action');
      if (action === 'open') ctx.open();
      if (action === 'close') ctx.close();
      if (action === 'clear') ctx.clear();
    });

    // Global hotkeys
    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        // still allow Escape to close even while in our own input
        if (e.target === input && e.key === 'Escape') {
          ctx.close();
          input.blur();
        }
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '`') {
        e.preventDefault();
        if (root.classList.contains('collapsed')) ctx.open(); else ctx.close();
      }
    });

    printWelcome();

    // Restore open state
    if (localStorage.getItem(STATE_KEY) === 'open') {
      ctx.open();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
