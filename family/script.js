'use strict';

const SB_URL = 'https://tjsxsqlxjmanwvmywwvw.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqc3hzcWx4am1hbnd2bXl3d3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0OTc0MDEsImV4cCI6MjA4NjA3MzQwMX0.LphLfho3wdQC20MhtcnBpzQUNuBoTOobrugQbNGxc68';
const ALLOWED_EMAIL = 'jatrommel@gmail.com';
const LS_THEME   = 'brief-theme';
const LS_CL      = 'brief-family-cl';
const LS_JOURNAL = 'brief-family-journal';
const LS_LAWYERS = 'brief-family-lawyers';

const LAWYER_STATUSES = ['', 'voicemail', 'emailed', 'callback', 'retained'];
const LAWYER_LABELS   = {
  '': 'Not yet contacted', voicemail: 'Voicemail left',
  emailed: 'Email sent', callback: 'Callback scheduled', retained: 'Retained'
};

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];
const fmt = n => n > 0 ? '$' + (n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : Math.round(n / 1000) + 'k') : '—';

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

// Auth — Supabase magic link (same as brief/)
const _sb = supabase.createClient(SB_URL, SB_KEY);
let _userId = null;

function initAuth() {
  const overlay = el('div');
  overlay.id = 'auth-overlay';

  const card   = el('div', 'auth-card');
  const title  = el('div', 'auth-title', 'Brief');
  const sub    = el('div', 'auth-sub', 'Enter your email to continue.');
  const input  = el('input', 'auth-input');
  Object.assign(input, { type: 'email', placeholder: 'you@email.com', autocomplete: 'email' });
  const btn    = el('button', 'auth-btn', 'Send Link');
  const errEl  = el('div', 'auth-err');
  const sentEl = el('div', 'auth-sub');
  sentEl.textContent = 'Check your email for a magic link.';
  sentEl.style.display = 'none';
  const footer = el('div', 'auth-footer', 'CASE-0002 · Trommel v. Trommel · private');

  card.append(title, sub, input, btn, errEl, sentEl, footer);
  overlay.appendChild(card);
  document.body.insertBefore(overlay, document.body.firstChild);

  function attempt() {
    errEl.textContent = '';
    const email = input.value.trim().toLowerCase();
    if (email !== ALLOWED_EMAIL) { errEl.textContent = 'Access restricted.'; return; }
    _sb.auth.signInWithOtp({ email, options: { emailRedirectTo: 'https://heyitsmejosh.com/family/' } }).then(res => {
      if (res.error) { errEl.textContent = res.error.message; return; }
      sub.style.display = 'none';
      input.style.display = 'none';
      btn.style.display = 'none';
      sentEl.style.display = 'block';
    });
  }

  btn.addEventListener('click', attempt);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
  setTimeout(() => input.focus(), 50);
}

function loadAndShow() {
  const overlay = $('#auth-overlay');
  if (overlay) overlay.classList.add('hidden');
  _sb.from('family_config').select('*').then(res => {
    const cfg = {};
    (res.data || []).forEach(r => { cfg[r.key] = r.value; });
    initAll(cfg);
  });
}

_sb.auth.getSession().then(res => {
  if (res.data.session) { _userId = res.data.session.user.id; loadAndShow(); }
  else { initAuth(); }
});
_sb.auth.onAuthStateChange((_ev, session) => {
  if (session && !_userId) { _userId = session.user.id; loadAndShow(); }
});

function initAll(cfg) {
  const GROUNDS_CASE  = cfg.grounds_case  || [];
  const GROUNDS_MONEY = cfg.grounds_money || [];
  const DAMAGES       = cfg.damages       || [];
  const CALL_SCRIPT   = cfg.call_script   || '';

  initCountdown();
  initTabs();
  initGrounds(GROUNDS_CASE, GROUNDS_MONEY);
  initDamages(DAMAGES);
  initScenarioBars();
  initChecklist();
  initJournal();
  initCallScript(CALL_SCRIPT);
  initEmailCopy();
  initExport();
  initLawyerStatus();
}

// Countdown
function initCountdown() {
  const deadline    = new Date('2028-05-01T00:00:00');
  const windowStart = new Date('2026-05-01T00:00:00');
  const now         = new Date();
  const daysLeft    = Math.max(0, Math.ceil((deadline - now) / 86400000));
  const pct         = Math.min(100, Math.max(0, ((now - windowStart) / (deadline - windowStart)) * 100));

  const daysEl = $('#daysLeft');
  const fill   = $('#dlFill');
  const dot    = $('#dlNow');
  if (daysEl) daysEl.textContent = daysLeft.toLocaleString() + ' days';
  requestAnimationFrame(() => {
    if (fill) fill.style.width = pct + '%';
    if (dot)  dot.style.left  = pct + '%';
  });
}

// Tabs
function initTabs() {
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      $$('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = $('#panel-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });
}

// Theme
function initTheme() {
  const btn = $('#themeBtn');
  if (!btn) return;
  const saved = localStorage.getItem(LS_THEME) || 'dark';
  document.body.dataset.theme = saved;
  btn.textContent = saved === 'dark' ? 'Light' : 'Dark';
  btn.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'dark' ? 'paper' : 'dark';
    document.body.dataset.theme = next;
    btn.textContent = next === 'dark' ? 'Light' : 'Dark';
    localStorage.setItem(LS_THEME, next);
  });
}

// Grounds accordion
const COLOR_VARS = { danger: 'var(--danger)', warn: 'var(--warn)', muted: 'var(--muted)', mid: 'var(--mid)' };

function buildGround(g) {
  const c = COLOR_VARS[g.color] || 'var(--mid)';
  const ground = el('div', 'ground');
  const hd = el('div', 'ground-hd');
  const nEl = el('div', 'ground-n', g.n);
  const info = el('div', 'ground-info');
  const title = el('div', 'ground-title', g.title);
  const sec = el('div', 'ground-sec', g.sec);
  const val = el('div', 'ground-val', g.val);
  val.style.color = c;
  info.append(title, sec);
  hd.append(nEl, info, val);

  const mag = el('div', 'ground-mag');
  const magFill = el('div', 'ground-mag-fill');
  magFill.style.background = c;
  mag.appendChild(magFill);

  const body = el('div', 'ground-body');
  const inner = el('div', 'ground-inner');
  const desc = el('div', 'ground-desc', g.desc);
  const cite = el('div', 'ground-cite', g.cite);
  inner.append(desc, cite);
  body.appendChild(inner);
  ground.append(hd, mag, body);

  ground.addEventListener('click', () => {
    const open = ground.classList.toggle('open');
    magFill.style.width = open ? g.pct + '%' : '0';
  });
  return ground;
}

function initGrounds(GROUNDS_CASE, GROUNDS_MONEY) {
  const caseEl  = $('#grounds-case');
  const moneyEl = $('#grounds-money');
  if (caseEl)  GROUNDS_CASE.forEach(g  => caseEl.appendChild(buildGround(g)));
  if (moneyEl) GROUNDS_MONEY.forEach(g => moneyEl.appendChild(buildGround(g)));
}

// Damages stack
function initDamages(DAMAGES) {
  const container = $('#dmg-stack-card');
  if (!container) return;

  let mode = 'c';
  const maxAmt = Math.max(...DAMAGES.map(d => Math.max(d.c, d.s)));

  function render() {
    container.textContent = '';
    const card = el('div', 'card ds-rows-card');
    const total = DAMAGES.reduce((s, d) => s + d[mode], 0);
    const high  = mode === 'c' ? Math.round(total * 1.5) : Math.round(total * 1.2);

    const toggle = el('div', 'ds-toggle');
    ['c', 's'].forEach(m => {
      const b = el('button', 'ds-toggle-btn' + (mode === m ? ' active' : ''), m === 'c' ? 'Conservative' : 'Strong');
      b.dataset.m = m;
      b.addEventListener('click', () => { mode = m; render(); });
      toggle.appendChild(b);
    });
    card.appendChild(toggle);

    const totals = el('div', 'ds-total-card');
    const left = el('div');
    left.appendChild(el('div', 'ds-total-lbl', 'Total floor'));
    left.appendChild(el('div', 'ds-total-amt', fmt(total)));
    const right = el('div'); right.style.textAlign = 'right';
    right.appendChild(el('div', 'ds-total-sub-lbl', 'Range ceiling'));
    right.appendChild(el('div', 'ds-total-sub-val', fmt(high)));
    totals.append(left, right);
    card.appendChild(totals);

    const fills = [];
    DAMAGES.forEach(d => {
      const a = d[mode];
      const pct = maxAmt > 0 ? (a / maxAmt) * 100 : 0;
      const c = COLOR_VARS[d.col] || 'var(--mid)';

      const row = el('div', 'ds-row');
      const top = el('div', 'ds-row-top');
      const meta = el('div', 'ds-row-meta');
      const badge = el('span', 'ds-badge', d.col === 'danger' ? 'HIGH' : d.col === 'warn' ? 'MED' : 'LOW');
      badge.style.cssText = `color:${c};border-color:${c};background:${c}22`;
      meta.append(badge, el('span', 'ds-row-label', d.label));
      const amtEl = el('span', 'ds-row-amt', fmt(a));
      amtEl.style.color = a > 0 ? c : 'var(--muted)';
      top.append(meta, amtEl);
      const sub = el('div', 'ds-row-sub', d.sub);
      const track = el('div', 'ds-bar-track'); track.style.marginTop = '6px';
      const fill = el('div', 'ds-bar-fill');
      fill.style.background = c;
      track.appendChild(fill);
      row.append(top, sub, track);
      card.appendChild(row);
      fills.push({ fill, pct });
    });

    container.appendChild(card);
    requestAnimationFrame(() => { fills.forEach(({ fill, pct }) => { fill.style.width = pct.toFixed(1) + '%'; }); });
  }

  render();
}

// Scenario bars
function initScenarioBars() {
  requestAnimationFrame(() => {
    $$('.bar-fill[data-w]').forEach(e => { e.style.width = e.dataset.w + '%'; });
  });
}

// Checklist
function initChecklist() {
  const items = $$('.cl-item');
  const count = $('#clCount');
  const bar   = $('#clBar');
  if (!items.length) return;

  let checked = JSON.parse(localStorage.getItem(LS_CL) || '[]');

  function update() {
    const n = checked.length;
    if (count) count.textContent = n + '/' + items.length;
    if (bar)   bar.style.width   = (n / items.length * 100) + '%';
    localStorage.setItem(LS_CL, JSON.stringify(checked));
  }

  items.forEach(item => {
    const i   = item.dataset.i;
    const box = item.querySelector('.cl-box');
    const lbl = item.querySelector('.cl-label');
    if (checked.includes(i)) { box.classList.add('done'); lbl.classList.add('done'); }
    item.addEventListener('click', () => {
      const idx = checked.indexOf(i);
      if (idx === -1) { checked.push(i); box.classList.add('done'); lbl.classList.add('done'); }
      else { checked.splice(idx, 1); box.classList.remove('done'); lbl.classList.remove('done'); }
      update();
    });
  });

  update();
}

// Pain journal
function initJournal() {
  const addBtn    = $('#jAddBtn');
  const form      = $('#jForm');
  const dateIn    = $('#jDateInput');
  const textIn    = $('#jTextarea');
  const saveBtn   = $('#jSaveBtn');
  const cancelBtn = $('#jCancelBtn');
  const list      = $('#journal-list');
  if (!addBtn || !list) return;

  let entries = JSON.parse(localStorage.getItem(LS_JOURNAL) || '[]');

  function render() {
    list.textContent = '';
    if (!entries.length) {
      const p = el('div'); p.style.cssText = 'font-size:12px;color:var(--muted);padding:8px 0;';
      p.textContent = 'No entries yet.';
      list.appendChild(p);
      return;
    }
    [...entries].reverse().forEach(e => {
      const div  = el('div', 'j-entry');
      div.append(el('div', 'j-date', e.date), el('div', 'j-text', e.text));
      list.appendChild(div);
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  if (dateIn) dateIn.value = today;

  addBtn.addEventListener('click', () => { form.style.display = 'block'; addBtn.style.display = 'none'; });
  if (cancelBtn) cancelBtn.addEventListener('click', () => {
    form.style.display = 'none'; addBtn.style.display = ''; textIn.value = '';
  });
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const text = textIn.value.trim();
    if (!text) return;
    entries.push({ date: dateIn.value || today, text });
    localStorage.setItem(LS_JOURNAL, JSON.stringify(entries));
    render();
    form.style.display = 'none'; addBtn.style.display = ''; textIn.value = '';
    if (dateIn) dateIn.value = today;
  });

  render();
}

// Call script
function initCallScript(CALL_SCRIPT) {
  const scriptEl = $('#scriptText');
  if (scriptEl) scriptEl.textContent = CALL_SCRIPT;

  const copyBtn = $('#copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(CALL_SCRIPT).then(() => {
        copyBtn.textContent = 'Copied'; copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1800);
      });
    });
  }
}

// Email copy
function initEmailCopy() {
  const btn = $('#emailCopyBtn');
  const src = $('#emailTemplateText');
  if (!btn || !src) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(src.textContent).then(() => {
      btn.textContent = 'Copied'; btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
    });
  });
}

// Export
function initExport() {
  const btn = $('#exportBtn');
  if (btn) btn.addEventListener('click', () => window.print());
}

// Lawyer status
function initLawyerStatus() {
  const stored = JSON.parse(localStorage.getItem(LS_LAWYERS) || '{}');

  $$('.lawyer[data-lawyer-id]').forEach(lawyer => {
    const id  = lawyer.dataset.lawyerId;
    const tagsContainer = lawyer.querySelector('.lawyer-tags');
    if (!tagsContainer) return;

    let statusTag = [...tagsContainer.querySelectorAll('.ltag')].find(
      t => t.classList.contains('status')
    );
    if (!statusTag) {
      statusTag = el('span', 'ltag status');
      tagsContainer.appendChild(statusTag);
    }

    const current = stored[id] || '';
    statusTag.className = 'ltag status' + (current ? ' ' + current : '');
    statusTag.textContent = LAWYER_LABELS[current] || 'Not yet contacted';

    statusTag.addEventListener('click', e => {
      e.stopPropagation();
      const next = LAWYER_STATUSES[(LAWYER_STATUSES.indexOf(stored[id] || '') + 1) % LAWYER_STATUSES.length];
      stored[id] = next;
      localStorage.setItem(LS_LAWYERS, JSON.stringify(stored));
      statusTag.className = 'ltag status' + (next ? ' ' + next : '');
      statusTag.textContent = LAWYER_LABELS[next] || 'Not yet contacted';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});
