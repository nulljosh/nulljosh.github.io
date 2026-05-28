const TOTAL = 12;
const SCRIPT = "Hi, I am looking to speak with a civil litigator regarding a case against the RCMP.\n\nIn August 2023, at approximately 11am, RCMP responded to a wellness call at my home in Langley. I was experiencing a mental health crisis and posed no threat. BC crisis response protocol requires de-escalation in these circumstances.\n\nI was fully cooperative at the door — discussed approximately 20 tattoos with officers, was lucid and amicable throughout. When asked about my family, I wouldn't discuss them. I told officers I lived there with my father — that was the extent of it. The 911 call was placed by my father following a verbal disagreement between us — not a crime, not a medical emergency. I then tried to walk away — my legal right. Two officers, whose names are pending ATIP disclosure, pursued me inside without consent. I ran toward my father in the kitchen. Officers followed, restrained me, and knelt on my back. I was unable to breathe — consistent with aggravated assault causing bodily harm. My father witnessed the entire incident.\n\nI was arrested, taken to a psychiatric facility overnight, forcibly medicated, placed in solitary confinement, and released the next morning with no aftercare. I walked home alone.\n\nI have suffered significant PTSD since, with formal therapy beginning August 2, 2025 — the discoverability anchor for s.18 incapacity. I have an active RCMP complaint on file (2023-XCAP). I also believe the initial questioning was pretextual.\n\nThis constitutes unlawful entry, excessive force, battery, positional asphyxia, forced medication, negligent crisis response, abandonment of duty of care, and Charter violations under sections 7, 8, 9, 10(b), and 12. I also want to raise a potential denial of my right to counsel at the time of detention. The defendant would be the Attorney General of Canada given RCMP involvement.\n\nThe basic 2-year limitation passed August 2025, but PTSD incapacity under s.18 discoverability extends the period — formal therapy began August 2, 2025, making the operative limitation expiry August 2027. The 15-year ultimate cap under s.21 is August 2038. Are you able to help?";

const GROUNDS = [
  { id: 'force',    title: 'Excessive Force',     sec: 's.7',     val: '$100–200k', color: 'var(--danger)', open: true,
    desc: "Officers knelt on subject's back while prone, causing respiratory distress consistent with positional asphyxia — a documented cause of in-custody death. No crime committed. Officers had post-2020 training and knew this technique is prohibited in low-risk situations. Father witnessed. Aggravated assault causing bodily harm. Subject was cooperative at the door: discussed approximately 20 tattoos with officers, was amicable, lucid, and coherent throughout. The only thing he declined was discussing his family — when asked about his mother, brother, and sister, he simply didn't engage. He told officers he lived there with his father. That is all. The 911 call was placed by the father after a verbal disagreement, not a crime or medical emergency. A cooperative, lucid person declining to answer personal family questions cannot ground a Feeney warrant exception or MHA s.28 apprehension.",
    cite: 'Elmardy v. TPSB, 2019 ONSC 2931 ($130k) · Degen v. Min. Public Safety, 2023 BCSC ($317k — Surrey RCMP, PTSD, positional force)' },
  { id: 'punitive', title: 'Punitive Conduct',    sec: '—',       val: '$50–150k', color: 'var(--warn)',
    desc: 'Sustained 7-step cascade of misconduct: unlawful entry, physical assault, arrest without grounds, forced medication, solitary confinement, overnight hold, discharge with no aftercare. Each step a choice. A helping role weaponized into the worst night of the subject\'s life.',
    cite: 'High-handed, bad-faith state action — Ward v. Vancouver [2010] SCC 27' },
  { id: 'ptsd',    title: 'PTSD General',         sec: '—',       val: '$75–150k', color: 'var(--warn)',
    desc: 'Every day affected since August 2023 — 33+ months of documented daily impact. No good days. Formal PTSD assessment underway May 2026. Clinical paper trail building. Causation to incident expected to be confirmed in writing by treating therapist. Separate from future earning capacity (age 26, 35+ working years — argued independently).',
    cite: 'Non-pecuniary damages, ongoing — pain, suffering, loss of dignity' },
  { id: 'meds',    title: 'Forced Medication',    sec: 's.7',     val: '$30–75k',  color: 'var(--accent)',
    desc: 'Involuntary antipsychotics administered without consent. Absolute right to refuse treatment is one of the most fundamental rights in Canadian law. Dual liability: s.7 Charter breach (security of the person) + battery tort.',
    cite: 'Fleming v. Ontario [2019] SCC 45' },
  { id: 'entry',   title: 'Unlawful Entry',       sec: 's.8',     val: '$25–60k',  color: 'var(--accent)',
    desc: 'No Feeney warrant. No genuine exigent circumstances — subject answered door, spoke coherently, exercised right to walk away. Entry into a dwelling is the highest-tier s.8 breach. This is the root violation that enabled the entire chain of events that followed.',
    cite: 'R. v. Feeney [1997] 2 SCR 13' },
  { id: 'detain',  title: 'Arbitrary Detention',  sec: 's.9',     val: '$20–50k',  color: 'var(--mid)',
    desc: 'Walking away during a non-arrest wellness call is not flight — it is a legal right. Detention began at physical restraint with no lawful authority. Overnight hold with no charge. Mental Health Act apprehension criteria need scrutiny: did the observed behavior legally justify s.28 apprehension? The answer is no. Subject was cogent and cooperative — answered questions freely for several minutes including discussing ~20 tattoos. His sole refusal: he wouldn't discuss his family when asked. He told officers he lived there with his father and left it at that. The 911 call came from his father after a verbal argument between them, not a threat or crisis. Declining to answer personal questions is constitutionally protected conduct. It cannot meet MHA s.28\'s threshold.',
    cite: 'R. v. Grant [2009] 2 SCR 353' },
  { id: 'solitary',title: 'Solitary Confinement', sec: 'ss.7,12', val: '$15–40k',  color: 'var(--mid)',
    desc: 'Overnight solitary confinement with no charge and no crime committed. Subject was in mental health crisis — placing a distressed person in isolation is the clinical opposite of appropriate care. Cruel and unusual treatment under s.12 in context.',
    cite: 'Ward v. Vancouver [2010] SCC 27' },
  { id: 'counsel', title: 'Denial of Counsel',    sec: 's.10(b)', val: '$15–35k',  color: 'var(--mid)',
    desc: 'Upon detention, Charter s.10(b) requires immediate notification of the right to retain and instruct counsel, and a reasonable opportunity to exercise it. If subject was not informed of this right at the time of restraint or arrest, this is an automatic and separate Charter breach.',
    cite: 'R. v. Bartle [1994] 3 SCR 173' }
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
  var d = Math.ceil((new Date('2027-08-31') - new Date().setHours(0,0,0,0)) / 86400000);
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
