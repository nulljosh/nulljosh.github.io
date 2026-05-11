const TOTAL = 12;
const SCRIPT = "Hi, I am looking to speak with a civil litigator regarding a case against the RCMP.\n\nIn August 2024, at approximately 11am, RCMP responded to a wellness call at my home in Langley. I was experiencing a mental health crisis and posed no threat. BC crisis response protocol requires de-escalation in these circumstances.\n\nI answered questions at the door, then tried to walk away — my legal right. Two officers, one named Daryl and one with the initial D. (last name Ryl or similar), pursued me inside without consent. I ran toward my father in the kitchen. Officers followed, restrained me, and knelt on my back. I was unable to breathe — consistent with aggravated assault causing bodily harm. My father witnessed the entire incident.\n\nI was arrested, taken to a psychiatric facility overnight, forcibly medicated, placed in solitary confinement, and released the next morning with no aftercare. I walked home alone.\n\nI have suffered significant PTSD since, documented and currently in formal assessment with a therapist as of May 2026. I also believe the initial questioning was pretextual.\n\nThis constitutes unlawful entry, excessive force, battery, negligent crisis response, abandonment of duty of care, and Charter violations under sections 7, 8, 9, and 12. The defendant would be the Attorney General of Canada given RCMP involvement.\n\nThe 2-year limitation period expires August 2026. Are you able to help?";

const GROUNDS = [
  { id: 'force',    title: 'Excessive Force',     sec: 's.7',     val: '$30–75k', color: 'var(--danger)', open: true,
    desc: "Officers knelt on subject's back. Winded, unable to breathe. No crime committed. Aggravated assault causing bodily harm.",
    cite: 'Elmardy v. TPSB, 2019 ONSC 2931' },
  { id: 'punitive', title: 'Punitive Conduct',    sec: '—',  val: '$25–75k', color: 'var(--warn)',
    desc: 'Wellness call escalated to forced entry, restraint, forced medication, solitary. A helping role weaponized.',
    cite: 'Egregious, bad-faith state action' },
  { id: 'ptsd',    title: 'PTSD General',         sec: '—',  val: '$25–75k', color: 'var(--warn)',
    desc: 'Every day affected since August 2024. Formal PTSD assessment underway as of May 2026. Clinical documentation building. Diagnosis expected to confirm causation to incident.',
    cite: 'Pain & suffering, loss of dignity' },
  { id: 'meds',    title: 'Forced Medication',    sec: 's.7',     val: '$20–40k', color: 'var(--accent)',
    desc: 'Involuntary antipsychotics. Absolute right to refuse treatment. Charter breach + battery tort.',
    cite: 'Fleming v. Ontario [2019] SCC' },
  { id: 'entry',   title: 'Unlawful Entry',        sec: 's.8',     val: '$15–35k', color: 'var(--accent)',
    desc: 'No Feeney warrant. No exigent circumstances. Highest-tier s.8 breach: entry into a dwelling.',
    cite: 'R. v. Feeney [1997] 2 SCR 13' },
  { id: 'detain',  title: 'Arbitrary Detention',  sec: 's.9',     val: '$15–30k', color: 'var(--mid)',
    desc: 'No grounds. Walking away during wellness call is not flight. Held overnight without charge.',
    cite: 'R. v. Grant [2009] 2 SCR 353' },
  { id: 'solitary',title: 'Solitary Confinement', sec: 'ss.7,12', val: '$10–25k', color: 'var(--mid)',
    desc: 'Overnight, no charge, no counsel. Cruel and unusual treatment under s.12.',
    cite: 'Ward v. Vancouver [2010]' }
];

function renderGrounds(containerId, suffix) {
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

    var body = document.createElement('div'); body.className = 'ground-body';
    var inner = document.createElement('div'); inner.className = 'ground-inner';
    var desc = document.createElement('div'); desc.className = 'ground-desc'; desc.textContent = g.desc;
    var cite = document.createElement('div'); cite.className = 'ground-cite'; cite.textContent = g.cite;
    inner.appendChild(desc); inner.appendChild(cite);
    body.appendChild(inner);

    wrap.appendChild(hd); wrap.appendChild(body);
    container.appendChild(wrap);
  });
}

renderGrounds('grounds-case', '');
renderGrounds('grounds-money', '2');

// Theme persistence
(function() {
  var saved = localStorage.getItem('brief.theme') || 'dark';
  document.body.dataset.theme = saved;
  document.getElementById('themeBtn').textContent = saved === 'dark' ? 'Light' : 'Dark';
})();

// Days remaining
(function() {
  var d = Math.ceil((new Date('2026-08-31') - new Date().setHours(0,0,0,0)) / 86400000);
  document.getElementById('daysLeft').textContent = d + ' days remaining';
})();

// Bars (Money tab)
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(function(b) { b.style.width = b.dataset.w + '%'; });
}

// Accordion
document.querySelectorAll('.grounds').forEach(function(container) {
  container.querySelectorAll('.ground').forEach(function(card) {
    card.addEventListener('click', function() {
      var isOpen = card.classList.contains('open');
      container.querySelectorAll('.ground').forEach(function(c) { c.classList.remove('open'); });
      if (!isOpen) card.classList.add('open');
    });
  });
});

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

// Checklist
var done = {};
try { done = JSON.parse(localStorage.getItem('brief.checklist') || '{}'); } catch(e) {}

function updateProgress() {
  var count = Object.values(done).filter(Boolean).length;
  document.getElementById('clCount').textContent = count + '/' + TOTAL;
  document.getElementById('clBar').style.width = ((count / TOTAL) * 100) + '%';
}

document.querySelectorAll('.cl-item').forEach(function(row) {
  var i = row.dataset.i;
  var box = row.querySelector('.cl-box');
  var lbl = row.querySelector('.cl-label');
  function render() {
    if (done[i]) {
      box.classList.add('done');
      lbl.classList.add('done');
    } else {
      box.classList.remove('done');
      lbl.classList.remove('done');
    }
  }
  render();
  row.addEventListener('click', function() {
    done[i] = !done[i];
    localStorage.setItem('brief.checklist', JSON.stringify(done));
    render();
    updateProgress();
  });
});
updateProgress();

// Theme
document.getElementById('themeBtn').addEventListener('click', function() {
  var body = document.body;
  var isDark = body.dataset.theme === 'dark';
  body.dataset.theme = isDark ? 'paper' : 'dark';
  this.textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('brief.theme', body.dataset.theme);
});

// Script
document.getElementById('scriptText').textContent = SCRIPT;
document.getElementById('copyBtn').addEventListener('click', function() {
  var btn = this;
  navigator.clipboard.writeText(SCRIPT).then(function() {
    btn.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
});

// PDF export
document.getElementById('exportBtn').addEventListener('click', function() {
  window.print();
});
