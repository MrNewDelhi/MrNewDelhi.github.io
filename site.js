/* =====================================================
   Site behavior · keyboard nav + easter eggs
   ===================================================== */

(function() {
  'use strict';

  // ============== TOAST SYSTEM ==============
  let toastZone = null;
  function getToastZone() {
    if (toastZone) return toastZone;
    toastZone = document.createElement('div');
    toastZone.className = 'toast-zone';
    document.body.appendChild(toastZone);
    return toastZone;
  }
  function toast(head, body) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<div class="head">${head}</div><div class="body">${body}</div>`;
    getToastZone().appendChild(t);
    setTimeout(() => {
      t.style.transition = 'opacity 300ms, transform 300ms';
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
      setTimeout(() => t.remove(), 320);
    }, 4200);
  }
  window.__toast = toast;

  // ============== CONSOLE BANNER ==============
  const css = (color, weight = '600') => `color: ${color}; font-weight: ${weight}; font-family: 'JetBrains Mono', monospace;`;
  console.log('%cQA Console %cv1.0.0', css('#5eead4'), css('#8b8e95', '400'));
  console.log('%c✓ %cTest suite loaded · %c41 specs · 132 assertions · all green',
    css('#5eead4'), css('#e8e6df', '400'), css('#8b8e95', '400'));
  console.log('%c⚡ %cType %chelp()%c for available commands. Try %ctest()%c, %cwhoami()%c, %ccoverage()%c.',
    css('#fbbf24'), css('#e8e6df', '400'),
    css('#5eead4'), css('#e8e6df', '400'),
    css('#5eead4'), css('#e8e6df', '400'),
    css('#5eead4'), css('#e8e6df', '400'),
    css('#5eead4'), css('#e8e6df', '400'));

  // ============== CONSOLE COMMANDS ==============
  window.help = function() {
    console.log('%cAvailable commands:', css('#5eead4'));
    const cmds = [
      ['help()',     'Show this list'],
      ['whoami()',   'Identity'],
      ['test()',     'Run the test suite'],
      ['coverage()', 'Project coverage report'],
      ['stack()',    'Tech stack'],
      ['secrets()',  '?'],
      ['hire()',     'Why?'],
    ];
    cmds.forEach(([c, d]) => console.log(`  %c${c.padEnd(14)} %c${d}`, css('#5eead4'), css('#8b8e95', '400')));
    return undefined;
  };

  window.whoami = function() {
    console.log('%cANMOL', css('#ffffff', '700') + 'font-size: 18px;');
    console.log('%cQA Engineer · 2.5y · Delhi, India', css('#8b8e95', '400'));
    console.log('%cShipping deterministic test systems for AI-era products.', css('#e8e6df', '400'));
    console.log('%c• linkedin.com/in/mrnewdelhi', css('#93c5fd', '400'));
    console.log('%c• github.com/mrnewdelhi', css('#93c5fd', '400'));
    console.log('%c• medium.com/@anmolsoin1', css('#93c5fd', '400'));
    return undefined;
  };

  window.test = function() {
    const specs = [
      ['regression.spec.ts', '500 tests', 'passed', 14],
      ['account-pool.spec.ts', '18 tests', 'passed', 8],
      ['outage-resilience.spec.ts', '6 tests', 'passed', 3],
      ['multimodal-triage.spec.ts', '12 tests', 'passed', 4],
      ['aio-intake.spec.ts', '24 tests', 'passed', 6],
      ['slack-rca-agent.spec.ts', '9 tests', 'passed', 2],
      ['llm-eval.spec.ts', '16 tests', 'passed', 7],
      ['visual-diff.spec.ts', '32 tests', 'passed', 11],
      ['bot-detection.spec.ts', '4 tests', 'passed', 2],
      ['team-leadership.spec.ts', '1 test', 'passed', 5],
    ];
    console.log('%c[runner] %cstarting...', css('#5eead4'), css('#8b8e95', '400'));
    let i = 0;
    const run = () => {
      if (i >= specs.length) {
        console.log('');
        console.log('%c  Tests:  %c622 passed%c, 622 total',
          css('#8b8e95', '400'), css('#5eead4'), css('#8b8e95', '400'));
        console.log('%c  Time:   %c2.5 years', css('#8b8e95', '400'), css('#e8e6df', '400'));
        console.log('%c  Coverage: %c98.4%', css('#8b8e95', '400'), css('#5eead4'));
        return;
      }
      const [file, n, status, t] = specs[i];
      const sym = status === 'passed' ? '✓' : status === 'flaky' ? '⚠' : '✗';
      const color = status === 'passed' ? '#5eead4' : status === 'flaky' ? '#fbbf24' : '#f87171';
      console.log(`%c  ${sym} %c${file.padEnd(28)} %c${n.padStart(9)}  %c${t}s`,
        css(color), css('#e8e6df', '400'), css('#8b8e95', '400'), css('#5a5d63', '400'));
      i++;
      setTimeout(run, 120);
    };
    run();
    return undefined;
  };

  window.coverage = function() {
    console.log('%cCoverage report', css('#5eead4'));
    console.table({
      'AI for QA':         { lines: '97%', branches: '94%', funcs: '99%' },
      'Test Automation':   { lines: '99%', branches: '98%', funcs: '100%' },
      'API & Reliability': { lines: '95%', branches: '92%', funcs: '97%' },
      'CI/CD & Infra':     { lines: '96%', branches: '93%', funcs: '98%' },
      'Leadership':        { lines: '88%', branches: '85%', funcs: '90%' },
    });
    return undefined;
  };

  window.stack = function() {
    const groups = {
      'AI / Agents':   ['MCP', 'Codex', 'ChatGPT Enterprise', 'Gemini 3', 'Browser Use', 'Computer Use'],
      'LLM Eval':      ['rubrics', 'cost hooks', 'token tracking', '8 model families (GPT-4o · Gemini · Claude · Llama · Mistral · Qwen · Phi · Grok)'],
      'AI Skills':     ['Markdown skills', 'system prompts', 'memory design', 'RAG vs skills trade-offs'],
      'Automation':    ['Playwright', 'Selenium', 'Appium (iOS+Android)', 'Reflect.run'],
      'Frameworks':    ['TestNG', 'Maven', 'POM', 'Page Object Model'],
      'Languages':     ['TypeScript', 'Java', 'Python', 'SQL'],
      'CI/CD':         ['GitHub Actions', 'Jenkins', 'BrowserStack', 'Docker', 'Tailscale'],
      'Infra':         ['PostgreSQL', 'test-data pool', 'MITM proxy hooks'],
      'Observability': ['Victoria Logs', 'Sentry', 'Lighthouse'],
      'Test Mgmt':     ['AIO', 'Jira', 'Xray', 'Zephyr', 'TestRail', 'Allure'],
    };
    for (const [k, v] of Object.entries(groups)) {
      console.log(`%c${k.padEnd(16)}%c ${v.join(' · ')}`, css('#5eead4'), css('#e8e6df', '400'));
    }
    return undefined;
  };

  window.secrets = function() {
    if (!window.__konamiUnlocked) {
      console.log('%cAccess denied.', css('#f87171'));
      console.log('');
      console.log('%cUnlock hint:', css('#5eead4'));
      console.log('%c  1. Click anywhere on the page (outside this console).', css('#e8e6df', '400'));
      console.log('%c  2. Press this key sequence on your keyboard:', css('#e8e6df', '400'));
      console.log('%c       ↑  ↑  ↓  ↓  ←  →  ←  →  B  A', css('#fbbf24', '700'));
      console.log('%c  3. Watch for the gold flash — then run %csecrets()%c again.', css('#e8e6df', '400'), css('#5eead4'), css('#e8e6df', '400'));
      return '⊥';
    }
    console.log('%c★ Access granted.', css('#fbbf24', '700'));
    console.log('%cDecrypting classified records...', css('#8b8e95', '400'));
    console.log('');
    console.log('%c  name:     %cAnmol Soin',      css('#8b8e95', '400'), css('#e8e6df', '400'));
    console.log('%c  alias:    %cmrnewdelhi',       css('#8b8e95', '400'), css('#e8e6df', '400'));
    console.log('%c  clearance:%c L4-QA-ENGINEER',  css('#8b8e95', '400'), css('#5eead4'));
    console.log('%c  status:   %c available for hire', css('#8b8e95', '400'), css('#5eead4'));
    console.log('');
    console.log('%c── field notes ────────────────────────────────', css('#8b8e95', '400'));
    console.log('%c  • Fixed a prod outage by reading a Victoria Logs query, not a test.', css('#e8e6df', '400'));
    console.log('%c  • The self-healing locator system runs in prod — nobody notices because nothing breaks.', css('#e8e6df', '400'));
    console.log('%c  • The bot-detection bypass works because I read the spec, not the workaround.', css('#e8e6df', '400'));
    console.log('%c  • Wrote the LLM eval rubric in a weekend; it\'s been catching regressions ever since.', css('#e8e6df', '400'));
    console.log('');
    console.log('%ccontact → %canmolsoin1@gmail.com', css('#8b8e95', '400'), css('#93c5fd', '400'));
    console.log('%cresume  → %cassets/resume/Anmol_Soin_QA_Engineer_Resume.pdf', css('#8b8e95', '400'), css('#93c5fd', '400'));
    return undefined;
  };

  window.hire = function() {
    console.log('%cBecause %cyou will save more than you spend.', css('#5eead4'), css('#e8e6df', '400'));
    console.log('%cReach out: %canmolsoin1@gmail.com', css('#8b8e95', '400'), css('#93c5fd', '400'));
    console.log('%cResume: %cassets/resume/Anmol_Soin_QA_Engineer_Resume.pdf', css('#8b8e95', '400'), css('#93c5fd', '400'));
    return undefined;
  };

  // ============== KONAMI CODE ==============
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let kIdx = 0;
  let konamiUnlocked = false;
  document.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === konami[kIdx]) {
      kIdx++;
      if (kIdx === konami.length) {
        kIdx = 0;
        if (!konamiUnlocked) {
          konamiUnlocked = true;
          window.__konamiUnlocked = true;
          toast('Easter egg unlocked', 'Konami sequence accepted · open the console and type <code>secrets()</code>');
          document.documentElement.style.setProperty('--pass', '#fbbf24');
          console.log('%c★ Easter egg #1: Konami sequence accepted.', css('#fbbf24', '700'));
        }
      }
    } else {
      kIdx = (k === konami[0]) ? 1 : 0;
    }
  });

  // ============== KEYBOARD NAVIGATION ==============
  let lastKey = '';
  let lastKeyTime = 0;
  const routes = {
    'h': 'index.html',
    'w': 'work.html',
    'v': 'visual-diff.html',
    'a': 'about.html',
    'r': 'writing.html',
    't': 'aio-tcc.html',
    'q': 'case-qa-agent-skill.html',
  };
  document.addEventListener('keydown', (e) => {
    // Don't intercept while typing in input fields
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const k = e.key.toLowerCase();

    // '?' opens shortcuts overlay
    if (e.key === '?') {
      e.preventDefault();
      toggleShortcuts();
      return;
    }
    // Esc closes overlay
    if (e.key === 'Escape') {
      closeShortcuts();
      return;
    }

    // 'g' then [route] navigates
    const now = Date.now();
    if (lastKey === 'g' && (now - lastKeyTime) < 1200 && routes[k]) {
      window.location.href = routes[k];
      lastKey = '';
      return;
    }
    if (k === 'g') {
      lastKey = 'g';
      lastKeyTime = now;
    } else {
      lastKey = '';
    }
  });

  // ============== SHORTCUTS OVERLAY ==============
  function buildShortcutsOverlay() {
    if (document.getElementById('shortcut-overlay')) return;
    const items = [
      ['?',          'Show / hide shortcuts'],
      ['g h',        'Go to Home'],
      ['g w',        'Go to Work'],
      ['g v',        'Go to Visual Diff Analyzer'],
      ['g t',        'Go to AIO Test Case Creator'],
      ['g q',        'Go to QA Agent Skill'],
      ['g r',        'Go to Writing'],
      ['g a',        'Go to About'],
      ['↑↑↓↓←→←→ba', '???'],
    ];
    const overlay = document.createElement('div');
    overlay.id = 'shortcut-overlay';
    overlay.className = 'shortcut-overlay';
    overlay.innerHTML = `
      <div class="shortcut-panel">
        <header>
          <span>Keyboard shortcuts</span>
          <span class="muted">esc to close</span>
        </header>
        ${items.map(([k, l]) => `
          <div class="item">
            <span class="lbl">${l}</span>
            <span>${k.split(' ').map(s => `<span class="kbd">${s}</span>`).join(' ')}</span>
          </div>
        `).join('')}
      </div>
    `;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeShortcuts();
    });
    document.body.appendChild(overlay);
  }
  function toggleShortcuts() {
    buildShortcutsOverlay();
    const overlay = document.getElementById('shortcut-overlay');
    overlay.classList.toggle('open');
  }
  function closeShortcuts() {
    const overlay = document.getElementById('shortcut-overlay');
    if (overlay) overlay.classList.remove('open');
  }
  window.__toggleShortcuts = toggleShortcuts;

  // ============== LOGO CLICKS EASTER EGG ==============
  let logoClicks = 0;
  let logoTimer = null;
  document.addEventListener('click', (e) => {
    const logo = e.target.closest('.nav-logo');
    if (!logo) return;
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => logoClicks = 0, 1500);
    if (logoClicks === 7) {
      logoClicks = 0;
      toast('Hidden command', '<code>coverage()</code> just got more detailed in the console');
      console.log('%c★ Easter egg #2: Logo tapped 7 times.', css('#fbbf24', '700'));
      window.coverage = function() {
        console.log('%cExtended coverage', css('#5eead4'));
        console.table({
          'Postgres test-data pool': { coverage: '100%', notes: 'production' },
          'Multi-model self-healing': { coverage: '99%',  notes: 'production · LTTS' },
          'Codex Slack RCA':         { coverage: '95%',  notes: 'production' },
          'Gemini 3 triage':         { coverage: '93%',  notes: 'rolling out' },
          'AIO intake skill':        { coverage: '100%', notes: 'shipped' },
          'Visual diff analyzer':    { coverage: '88%',  notes: 'pre-prod beta' },
          'Bot-detection bypass':    { coverage: '100%', notes: 'production' },
          'Reflect.run bake-off':    { coverage: '100%', notes: 'evaluation done' },
        });
      };
    }
  });

  // ============== DOMContentLoaded — set deploy timestamp ==============
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-deploy-ts]').forEach(el => {
      const d = new Date();
      el.textContent = d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
    });
  });

})();
