import 'animate.css';
import './style.css';
import './hero.css';
import './results.css';
import './layout.css';
import { analyzeCase } from './analysis.js';
import { renderResults, renderLoading } from './ui.js';

const textarea = document.getElementById('complaint');
const charCount = document.getElementById('char-count');
const analyzeBtn = document.getElementById('analyze-btn');
const inputSection = document.getElementById('input-section');
const resultsSection = document.getElementById('results-section');

const MIN_CHARS = 20;

textarea.addEventListener('input', () => {
  const len = textarea.value.length;
  charCount.textContent = `${len} character${len !== 1 ? 's' : ''}`;
  analyzeBtn.disabled = len < MIN_CHARS;
});

analyzeBtn.addEventListener('click', async () => {
  const text = textarea.value.trim();
  if (text.length < MIN_CHARS) return;

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyzing...';
  resultsSection.classList.remove('hidden');
  resultsSection.innerHTML = renderLoading();

  inputSection.classList.add(
    'animate__animated',
    'animate__fadeOutUp'
  );

  try {
    const data = await analyzeCase(text);

    inputSection.classList.add('hidden');
    resultsSection.innerHTML = renderResults(data);

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', reset);
    }
  } catch (err) {
    resultsSection.innerHTML = `<div class="glass-card" style="text-align:center;color:var(--orange);">
      <p>Analysis failed. Please try again.</p>
      <button class="btn-secondary" id="reset-btn">Start Over</button>
    </div>`;
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', reset);
  }
});

function reset() {
  resultsSection.classList.add('hidden');
  resultsSection.innerHTML = '';
  inputSection.classList.remove(
    'hidden',
    'animate__animated',
    'animate__fadeOutUp'
  );
  inputSection.classList.add('animate__animated', 'animate__fadeInDown');
  textarea.value = '';
  charCount.textContent = '0 characters';
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyze My Case';

  setTimeout(() => {
    inputSection.classList.remove('animate__animated', 'animate__fadeInDown');
  }, 1000);
}
