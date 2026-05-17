const TOTAL = 17;

var MAX_K = 500;
function parseHighK(val) {
  var m = val.match(/(\d+)k?\s*$/i);
  return m ? parseInt(m[1]) : 0;
}

function renderGrounds(containerId, suffix, GROUNDS) {
  var container = document.getElementById(containerId);
  GROUNDS.forEach(function(g, i) {
    var wrap = document.createElement('div');
    wrap.className = 'ground' + (g.open ? ' open' : '');
    wrap.dataset.id = g.id + suffix;

    var hd = document.createElement('div'); hd.className = 'ground-hd';
    var n = document.createElement('div'); n.className = 'ground-n';
    n.textContent = String(i + 1).padStart(2, '0');
    var info = document.createElement('div'); info.className = 'ground-info';
    var t = document.createElement('div'); t.className = 'ground-title'; t.textContent = g.title;
    var s = document.createElement('div'); s.className = 'ground-sec'; s.textContent = g.sec;
    info.appendChild(t); info.appendChild(s);
    var v = document.createElement('div'); v.className = 'ground-val'; v.style.color = g.color; v.textContent = g.val;
    hd.appendChild(n); hd.appendChild(info); hd.appendChild(v);

    var mag = document.createElement('div'); mag.className = 'ground-mag';
    var magFill = document.createElement('div'); magFill.className = 'ground-mag-fill';
    var highK = parseHighK(g.val);
    magFill.dataset.w = ((highK / MAX_K) * 100).toFixed(1);
    magFill.style.background = g.color;
    if (g.open) { magFill.style.width = magFill.dataset.w + '%'; }
    mag.appendChild(magFill);

    var body = document.createElement('div'); body.className = 'ground-body';
    var inner = document.createElement('div'); inner.className = 'ground-inner';
    var desc = document.createElement('div'); desc.className = 'ground-desc'; desc.textContent = g.desc;
    var cite = document.createElement('div'); cite.className = 'ground-cite'; cite.textContent = g.cite;
    inner.appendChild(desc); inner.appendChild(cite);
    body.appendChild(inner);

    wrap.appendChild(hd);
    wrap.appendChild(mag);
    wrap.appendChild(body);
    container.appendChild(wrap);
  });

  document.getElementById(containerId).querySelectorAll('.ground').forEach(function(card) {
    card.addEventListener('click', function() {
      var isOpen = card.classList.contains('open');
      document.getElementById(containerId).querySelectorAll('.ground').forEach(function(c) { c.classList.remove('open'); });
      if (!isOpen) {
        card.classList.add('open');
        card.querySelectorAll('.ground-mag-fill').forEach(function(f) { f.style.width = f.dataset.w + '%'; });
      }
    });
  });
}

function renderDamageScale(sections) {
  var card = document.getElementById('dmg-scale-card');
  if (!card) return;
  var MAX = 1000;
  function pct(k) { return (k / MAX * 100).toFixed(2) + '%'; }

  var label = document.createElement('div');
  label.style.cssText = 'font-size:10px;font-family:var(--mono);color:var(--muted);margin-bottom:14px;letter-spacing:0.08em;text-transform:uppercase;';
  label.textContent = 'Canadian scale (CAD) — global ceiling below';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:relative;height:24px;';
  var track = document.createElement('div');
  track.style.cssText = 'position:absolute;left:0;right:0;top:10px;height:4px;background:var(--border);border-radius:100px;';
  var range = document.createElement('div');
  range.style.cssText = 'position:absolute;top:10px;height:4px;background:var(--green);opacity:0.4;border-radius:100px;left:' + pct(500) + ';width:' + (800-500)/MAX*100 + '%;';
  [{k:55,color:'var(--muted)'},{k:130,color:'var(--muted)'},{k:317,color:'var(--warn)'},{k:350,color:'var(--warn)'},{k:650,color:'var(--green)'}].forEach(function(m) {
    var dot = document.createElement('div');
    dot.style.cssText = 'position:absolute;top:5px;left:' + pct(m.k) + ';transform:translateX(-50%);width:10px;height:10px;border-radius:50%;background:' + m.color + ';border:2px solid var(--bg);';
    wrap.appendChild(dot);
  });
  wrap.appendChild(track);
  wrap.appendChild(range);

  var ends = document.createElement('div');
  ends.style.cssText = 'display:flex;justify-content:space-between;font-size:9px;font-family:var(--mono);color:var(--muted);margin-top:6px;margin-bottom:14px;';
  var e0 = document.createElement('span'); e0.textContent = '$0';
  var e1 = document.createElement('span'); e1.textContent = '$1M CAD';
  ends.appendChild(e0); ends.appendChild(e1);

  var legend = document.createElement('div');
  legend.style.cssText = 'display:flex;flex-direction:column;gap:14px;';
  sections.forEach(function(section) {
    var sec = document.createElement('div');
    var hdr = document.createElement('div');
    hdr.style.cssText = 'font-size:9px;font-family:var(--mono);color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:7px;padding-bottom:4px;border-bottom:1px solid var(--border);';
    hdr.textContent = section.header;
    sec.appendChild(hdr);
    var rows = document.createElement('div');
    rows.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
    section.cases.forEach(function(c) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:baseline;gap:8px;';
      var left = document.createElement('div');
      left.style.cssText = 'min-width:0;flex:1;overflow:hidden;';
      var lbl = document.createElement('span');
      lbl.style.cssText = 'font-size:10px;font-family:var(--mono);color:' + c.color + ';white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:block;';
      lbl.textContent = c.label;
      left.appendChild(lbl);
      if (c.note) {
        var note = document.createElement('span');
        note.style.cssText = 'font-size:9px;font-family:var(--mono);color:var(--muted);opacity:0.6;display:block;';
        note.textContent = c.note;
        left.appendChild(note);
      }
      var val = document.createElement('span');
      val.style.cssText = 'font-size:10px;font-family:var(--mono);font-weight:700;color:' + c.color + ';flex-shrink:0;';
      val.textContent = c.val;
      row.appendChild(left);
      row.appendChild(val);
      rows.appendChild(row);
    });
    sec.appendChild(rows);
    legend.appendChild(sec);
  });

  card.appendChild(label);
  card.appendChild(wrap);
  card.appendChild(ends);
  card.appendChild(legend);
}

var dmgMode = localStorage.getItem('brief.dmgmode') || 'strong';

function fmtMoney(n) {
  return n >= 1000000 ? '$' + (n / 1000000).toFixed(2) + 'M' : '$' + (n / 1000).toFixed(0) + 'k';
}

function gradeRGB(g) {
  if (g.charAt(0) === 'A') return [34, 197, 94];
  if (g.charAt(0) === 'B') return [6, 182, 212];
  if (g.charAt(0) === 'C') return [234, 179, 8];
  return [239, 68, 68];
}

function renderDamagesStack(STACK_HEADS) {
  var wrap = document.getElementById('dmg-stack-card');
  if (!wrap) return;
  while (wrap.firstChild) wrap.removeChild(wrap.firstChild);

  var STACK_CONSERVATIVE = STACK_HEADS.reduce(function(s, h) { return s + h.low; }, 0);
  var STACK_STRONG = STACK_HEADS.reduce(function(s, h) { return s + h.high; }, 0);
  var total = dmgMode === 'conservative' ? STACK_CONSERVATIVE : STACK_STRONG;
  var isDark = document.body.dataset.theme !== 'paper';

  var toggleWrap = document.createElement('div');
  toggleWrap.className = 'ds-toggle';
  ['conservative', 'strong'].forEach(function(m) {
    var btn = document.createElement('button');
    btn.className = 'ds-toggle-btn' + (dmgMode === m ? ' active' : '');
    btn.textContent = m;
    btn.addEventListener('click', function() {
      dmgMode = m;
      localStorage.setItem('brief.dmgmode', m);
      renderDamagesStack(STACK_HEADS);
    });
    toggleWrap.appendChild(btn);
  });
  wrap.appendChild(toggleWrap);

  var totCard = document.createElement('div');
  totCard.className = 'card ds-total-card';
  var totLeft = document.createElement('div');
  var totLbl = document.createElement('div'); totLbl.className = 'ds-total-lbl'; totLbl.textContent = 'Stacked Total';
  var totAmt = document.createElement('div'); totAmt.className = 'ds-total-amt'; totAmt.textContent = fmtMoney(total);
  totLeft.appendChild(totLbl); totLeft.appendChild(totAmt);
  var totRight = document.createElement('div'); totRight.style.cssText = 'text-align:right;';
  var medLbl = document.createElement('div'); medLbl.className = 'ds-total-sub-lbl'; medLbl.textContent = 'Settlement Median';
  var medVal = document.createElement('div'); medVal.className = 'ds-total-sub-val'; medVal.textContent = '$800k – $1.2M';
  var ceilVal = document.createElement('div'); ceilVal.className = 'ds-total-ceil'; ceilVal.textContent = 'trial ceiling $2–$3M';
  totRight.appendChild(medLbl); totRight.appendChild(medVal); totRight.appendChild(ceilVal);
  totCard.appendChild(totLeft); totCard.appendChild(totRight);
  wrap.appendChild(totCard);

  var rowsCard = document.createElement('div');
  rowsCard.className = 'card ds-rows-card';
  STACK_HEADS.forEach(function(h) {
    var val = dmgMode === 'conservative' ? h.low : h.high;
    var pct = (val / STACK_STRONG) * 100;
    var r = h.rgb[0], g = h.rgb[1], b = h.rgb[2];
    var gr = gradeRGB(h.grade);
    var grStr = 'rgb(' + gr[0] + ',' + gr[1] + ',' + gr[2] + ')';
    var grBg = 'rgba(' + gr[0] + ',' + gr[1] + ',' + gr[2] + ',' + (isDark ? '0.18' : '0.12') + ')';
    var grBdr = 'rgba(' + gr[0] + ',' + gr[1] + ',' + gr[2] + ',' + (isDark ? '0.28' : '0.20') + ')';
    var hoverBg = 'rgba(' + r + ',' + g + ',' + b + ',' + (isDark ? '0.11' : '0.07') + ')';

    var row = document.createElement('div');
    row.className = 'ds-row';
    row.addEventListener('mouseenter', function() { row.style.background = hoverBg; });
    row.addEventListener('mouseleave', function() { row.style.background = 'transparent'; });

    var topRow = document.createElement('div'); topRow.className = 'ds-row-top';
    var badge = document.createElement('span'); badge.className = 'ds-badge';
    badge.textContent = h.grade;
    badge.style.cssText = 'color:' + grStr + ';background:' + grBg + ';border-color:' + grBdr + ';';
    var meta = document.createElement('div'); meta.className = 'ds-row-meta';
    var lbl = document.createElement('span'); lbl.className = 'ds-row-label'; lbl.textContent = h.label;
    var sub = document.createElement('span'); sub.className = 'ds-row-sub'; sub.textContent = h.sub;
    meta.appendChild(badge); meta.appendChild(lbl); meta.appendChild(sub);
    var amt = document.createElement('span'); amt.className = 'ds-row-amt';
    amt.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
    amt.textContent = fmtMoney(val);
    topRow.appendChild(meta); topRow.appendChild(amt);

    var barTrack = document.createElement('div'); barTrack.className = 'ds-bar-track';
    var barFill = document.createElement('div'); barFill.className = 'ds-bar-fill';
    barFill.dataset.w = pct.toFixed(2);
    barFill.style.cssText = 'background:rgb(' + r + ',' + g + ',' + b + ');width:0;';
    barTrack.appendChild(barFill);

    row.appendChild(topRow); row.appendChild(barTrack);
    rowsCard.appendChild(row);
  });
  wrap.appendChild(rowsCard);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      rowsCard.querySelectorAll('.ds-bar-fill').forEach(function(b) {
        b.style.width = b.dataset.w + '%';
      });
    });
  });
}

function renderWitnesses(WITNESSES) {
  var list = document.getElementById('witnesses-list');
  if (!list) return;
  WITNESSES.forEach(function(w) {
    var card = document.createElement('div');
    card.className = 'card';

    var hdr = document.createElement('div');
    hdr.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:10px;';
    var av = document.createElement('div');
    av.style.cssText = 'width:36px;height:36px;border-radius:50%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:var(--accent);flex-shrink:0;font-family:var(--mono);';
    av.textContent = w.name[0];
    var info = document.createElement('div');
    var nm = document.createElement('div');
    nm.style.cssText = 'font-size:13px;font-weight:600;color:var(--text);';
    nm.textContent = w.name;
    var role = document.createElement('div');
    role.style.cssText = 'font-size:11px;color:var(--muted);font-family:var(--mono);';
    role.textContent = w.role + ' · ' + w.date;
    info.appendChild(nm); info.appendChild(role);
    hdr.appendChild(av); hdr.appendChild(info);
    card.appendChild(hdr);

    var tags = document.createElement('div');
    tags.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px;';
    w.tags.forEach(function(t) {
      var tag = document.createElement('span');
      tag.style.cssText = 'font-size:9px;font-family:var(--mono);background:var(--surface-2);color:var(--green);padding:2px 7px;border-radius:100px;border:1px solid var(--border);';
      tag.textContent = t;
      tags.appendChild(tag);
    });
    card.appendChild(tags);

    var stmtHd = document.createElement('div');
    stmtHd.style.cssText = 'font-size:9px;font-family:var(--mono);color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;';
    stmtHd.textContent = 'Statement — verbatim';
    card.appendChild(stmtHd);

    var stmt = document.createElement('div');
    stmt.style.cssText = 'font-size:12px;color:var(--text);line-height:1.75;white-space:pre-wrap;background:var(--surface-2);border-radius:8px;padding:12px;margin-bottom:14px;border-left:2px solid var(--border);';
    stmt.textContent = w.statement;
    card.appendChild(stmt);

    var annHd = document.createElement('div');
    annHd.style.cssText = 'font-size:9px;font-family:var(--mono);color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;';
    annHd.textContent = 'Legal annotations';
    card.appendChild(annHd);

    var annList = document.createElement('div');
    annList.style.cssText = 'display:flex;flex-direction:column;gap:7px;';
    w.annotations.forEach(function(a) {
      var row = document.createElement('div');
      row.style.cssText = 'border-radius:6px;background:var(--surface-2);padding:8px 10px;border-left:2px solid var(--warn);';
      var q = document.createElement('div');
      q.style.cssText = 'font-size:11px;font-family:var(--mono);color:var(--warn);margin-bottom:3px;';
      q.textContent = '"' + a.quote + '"';
      var n = document.createElement('div');
      n.style.cssText = 'font-size:11px;color:var(--muted);line-height:1.5;';
      n.textContent = a.note;
      row.appendChild(q); row.appendChild(n);
      annList.appendChild(row);
    });
    card.appendChild(annList);
    list.appendChild(card);
  });
}

// Auth — Supabase magic link
var SB_URL = 'https://tjsxsqlxjmanwvmywwvw.supabase.co';
var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqc3hzcWx4am1hbnd2bXl3d3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0OTc0MDEsImV4cCI6MjA4NjA3MzQwMX0.LphLfho3wdQC20MhtcnBpzQUNuBoTOobrugQbNGxc68';
var ALLOWED_EMAIL = 'jatrommel@gmail.com';
var _sb = supabase.createClient(SB_URL, SB_KEY);
var _userId = null;

_sb.auth.getSession().then(function(res) {
  if (res.data.session) { _userId = res.data.session.user.id; loadAndShow(); }
});
_sb.auth.onAuthStateChange(function(_ev, session) {
  if (session && !_userId) { _userId = session.user.id; loadAndShow(); }
});

function loadAndShow() {
  var overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.classList.add('hidden');
  _sb.from('brief_config').select('*').then(function(res) {
    var cfg = {};
    (res.data || []).forEach(function(r) { cfg[r.key] = r.value; });
    initAll(cfg);
  });
}

function initAll(cfg) {
  var SCRIPT = cfg.script || '';
  var GROUNDS = cfg.grounds || [];
  var WITNESSES = cfg.witnesses || [];
  var JOURNAL_SEED = cfg.journal_seed || [];
  var STACK_HEADS = cfg.stack_heads || [];
  var DAMAGE_SCALE = cfg.damage_scale || [];

  renderGrounds('grounds-case', '', GROUNDS);
  renderGrounds('grounds-money', '2', GROUNDS);
  renderDamageScale(DAMAGE_SCALE);
  renderDamagesStack(STACK_HEADS);
  renderWitnesses(WITNESSES);

  document.getElementById('scriptText').textContent = SCRIPT;
  document.getElementById('copyBtn').addEventListener('click', function() {
    var btn = this;
    navigator.clipboard.writeText(SCRIPT).then(function() {
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  });

  initData(JOURNAL_SEED);
}

document.getElementById('auth-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('auth-email').value.trim().toLowerCase();
  var errEl = document.getElementById('auth-err');
  if (email !== ALLOWED_EMAIL) { errEl.textContent = 'Access restricted.'; return; }
  _sb.auth.signInWithOtp({ email: email, options: { emailRedirectTo: 'https://heyitsmejosh.com/brief/' } }).then(function(res) {
    if (res.error) { errEl.textContent = res.error.message; return; }
    document.getElementById('auth-step-email').style.display = 'none';
    document.getElementById('auth-step-sent').style.display = 'block';
  });
});

// Theme persistence
(function() {
  var saved = localStorage.getItem('brief.theme') || 'dark';
  document.body.dataset.theme = saved;
  document.getElementById('themeBtn').textContent = saved === 'dark' ? 'Light' : 'Dark';
})();

// Limitation countdown
(function() {
  var incident = new Date('2023-08-01');
  var deadline = new Date('2025-08-01');
  var now = new Date(); now.setHours(0,0,0,0);
  var d = Math.ceil((deadline - now) / 86400000);
  var expired = d < 0;
  var pct = Math.min(100, ((now - incident) / (deadline - incident)) * 100);
  var daysEl = document.getElementById('daysLeft');
  var fillEl = document.getElementById('dlFill');
  var nowEl = document.getElementById('dlNow');
  if (expired) {
    daysEl.textContent = 'Basic expired · Claim live';
    daysEl.style.color = 'var(--warn)';
    fillEl.style.width = '100%';
    fillEl.style.background = 'var(--warn)';
    nowEl.style.left = '100%';
    var lbl = document.querySelector('.dl-label');
    if (lbl) { lbl.textContent = 'Limitation — Discoverability + s.18 Active'; lbl.style.color = 'var(--warn)'; }
    var naNotes = document.querySelectorAll('.na-note');
    naNotes.forEach(function(el) {
      el.textContent = 'Discoverability + s.18 — claim live';
      el.style.color = 'var(--warn)';
    });
  } else {
    daysEl.textContent = d + ' days';
    fillEl.style.width = pct + '%';
    nowEl.style.left = pct + '%';
    var naNotes = document.querySelectorAll('.na-note');
    naNotes.forEach(function(el) { el.textContent = 'Limitation in ' + d + ' days'; });
  }
})();

// Bars (Money tab)
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(function(b) { b.style.width = b.dataset.w + '%'; });
}

// Tabs
document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'money') { setTimeout(animateBars, 80); }
  });
});

// Journal
function loadJournalFromDB(JOURNAL_SEED) {
  _sb.from('brief_journal').select('*').order('date', { ascending: false }).then(function(res) {
    var dbEntries = res.data || [];
    var map = {};
    JOURNAL_SEED.forEach(function(e) { map[e.date] = e; });
    dbEntries.forEach(function(e) { map[e.date] = e; });
    var entries = Object.values(map).sort(function(a, b) { return b.date < a.date ? -1 : 1; });
    renderJournalEntries(entries);
  });
}

function saveJournalEntry(date, text, JOURNAL_SEED) {
  _sb.from('brief_journal').upsert({ user_id: _userId, date: date, text: text }).then(function() { loadJournalFromDB(JOURNAL_SEED); });
}

function fmtDate(iso) {
  var d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

function renderJournalEntries(entries) {
  var list = document.getElementById('journal-list');
  if (!list) return;
  while (list.firstChild) { list.removeChild(list.firstChild); }
  entries.forEach(function(e, i) {
    var div = document.createElement('div');
    div.className = 'j-entry';
    if (i === entries.length - 1) { div.style.borderBottom = 'none'; div.style.marginBottom = '0'; div.style.paddingBottom = '0'; }
    var dt = document.createElement('div'); dt.className = 'j-date'; dt.textContent = fmtDate(e.date);
    var tx = document.createElement('div'); tx.className = 'j-text'; tx.textContent = e.text;
    div.appendChild(dt); div.appendChild(tx);
    list.appendChild(div);
  });
}

// Checklist
var SEEDED = { '1': true, '8': true, '9': true, '10': true, '13': true };

function applyChecklistState(done) {
  document.querySelectorAll('.cl-item').forEach(function(row) {
    var i = row.dataset.i;
    var box = row.querySelector('.cl-box');
    var lbl = row.querySelector('.cl-label');
    if (done[i]) { box.classList.add('done'); lbl.classList.add('done'); }
    else { box.classList.remove('done'); lbl.classList.remove('done'); }
  });
}

function updateProgress(done) {
  var count = Object.values(done || SEEDED).filter(Boolean).length;
  document.getElementById('clCount').textContent = count + '/' + TOTAL;
  document.getElementById('clBar').style.width = ((count / TOTAL) * 100) + '%';
}

function loadChecklistFromDB() {
  _sb.from('brief_checklist').select('*').then(function(res) {
    var done = Object.assign({}, SEEDED);
    (res.data || []).forEach(function(r) { done[r.item_index] = r.completed; });
    window._briefChecklist = done;
    applyChecklistState(done);
    updateProgress(done);
  });
}

function toggleChecklistItem(index) {
  if (!_userId) return;
  var done = window._briefChecklist || Object.assign({}, SEEDED);
  done[index] = !done[index];
  window._briefChecklist = done;
  _sb.from('brief_checklist').upsert({ user_id: _userId, item_index: parseInt(index), completed: done[index] });
  applyChecklistState(done);
  updateProgress(done);
}

document.querySelectorAll('.cl-item').forEach(function(row) {
  row.addEventListener('click', function() { toggleChecklistItem(row.dataset.i); });
});
updateProgress(SEEDED);

// Lawyer status
var _lawyerStatuses = {};
var STATUS_CYCLE = ['none', 'voicemail', 'emailed', 'callback', 'retained'];
var STATUS_LABEL = { none: 'Not contacted', voicemail: 'Voicemail left', emailed: 'Email sent', callback: 'Callback received', retained: 'Retained' };

function loadLawyerStatusFromDB() {
  _sb.from('brief_lawyer_status').select('*').then(function(res) {
    (res.data || []).forEach(function(r) { _lawyerStatuses[r.lawyer_id] = r.status; });
    refreshLawyerStatusTags();
  });
}

function setLawyerStatus(lawyerId, status) {
  _lawyerStatuses[lawyerId] = status;
  _sb.from('brief_lawyer_status').upsert({ user_id: _userId, lawyer_id: lawyerId, status: status });
  refreshLawyerStatusTags();
}

function refreshLawyerStatusTags() {
  document.querySelectorAll('.lawyer[data-lawyer-id]').forEach(function(card) {
    var id = card.dataset.lawyerId;
    var status = _lawyerStatuses[id] || 'none';
    var tags = card.querySelector('.lawyer-tags');
    if (!tags) return;
    var chip = tags.querySelector('.ltag.status');
    if (!chip) {
      chip = document.createElement('span');
      chip.className = 'ltag status';
      chip.addEventListener('click', function(e) {
        e.stopPropagation();
        var cur = _lawyerStatuses[id] || 'none';
        var next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(cur) + 1) % STATUS_CYCLE.length];
        setLawyerStatus(id, next);
      });
      tags.appendChild(chip);
    }
    chip.textContent = STATUS_LABEL[status] || status;
    chip.className = 'ltag status' + (status !== 'none' ? ' ' + status : '');
  });
}

function initData(JOURNAL_SEED) {
  loadJournalFromDB(JOURNAL_SEED);
  loadChecklistFromDB();
  loadLawyerStatusFromDB();

  var btn = document.getElementById('jAddBtn');
  var form = document.getElementById('jForm');
  var dateInput = document.getElementById('jDateInput');
  var textarea = document.getElementById('jTextarea');
  var saveBtn = document.getElementById('jSaveBtn');
  var cancelBtn = document.getElementById('jCancelBtn');
  if (!btn) return;

  var today = new Date().toISOString().slice(0, 10);
  dateInput.value = today;
  dateInput.max = today;

  btn.addEventListener('click', function() {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display !== 'none') { textarea.focus(); }
  });
  cancelBtn.addEventListener('click', function() {
    form.style.display = 'none';
    textarea.value = '';
    dateInput.value = today;
  });
  saveBtn.addEventListener('click', function() {
    var text = textarea.value.trim();
    if (!text) return;
    saveJournalEntry(dateInput.value, text, JOURNAL_SEED);
    textarea.value = '';
    dateInput.value = today;
    form.style.display = 'none';
  });
}

// Theme toggle
document.getElementById('themeBtn').addEventListener('click', function() {
  var body = document.body;
  var isDark = body.dataset.theme === 'dark';
  body.dataset.theme = isDark ? 'paper' : 'dark';
  this.textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('brief.theme', body.dataset.theme);
});

// PDF export
document.getElementById('exportBtn').addEventListener('click', function() {
  window.print();
});

// Email outreach copy
(function() {
  var btn = document.getElementById('emailCopyBtn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var text = document.getElementById('emailTemplateText').textContent;
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  });
})();
