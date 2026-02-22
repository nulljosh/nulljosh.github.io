# WTF Happened in 1971?

A data visualization project exploring the economic and social shift that began in 1971, when the US abandoned the gold standard.

**Live Site:** https://nulljosh.github.io/1971

![Preview](preview.png)

## The Premise

Around 1971, nearly every chart about American prosperity broke. Wages flatlined. Inequality soared. Housing became unaffordable. Productivity gains no longer translated to worker pay.

**This project visualizes the data.**

## Key Charts

### Economics
- **Wage stagnation** - Productivity vs compensation (decoupled in 1971)
- **Income inequality** - Top 1% share skyrocketed
- **Housing costs** - Median home price vs median income
- **Dollar purchasing power** - 85% decline since 1971
- **National debt** - Exponential growth begins

### Social
- **Incarceration rate** - Prison population explosion
- **Labor force participation** - Women entered workforce (necessity, not choice)
- **Marriage rates** - Decline in marriage/family formation
- **Cost of living** - Healthcare, education, childcare unaffordable

### Book Integration: "A Generation of Sociopaths"

Bruce Cannon Gibney's thesis: The Baby Boomer generation's policies created these trends.

**Key arguments:**
1. **Gold standard abandonment** (1971) - Enabled endless money printing
2. **Tax cuts for wealthy** - Shifted burden to working class
3. **Deregulation** - Allowed corporate greed unchecked
4. **Student debt** - Made education unaffordable
5. **Environmental neglect** - Kicked costs to future generations

## Data Sources

- Federal Reserve Economic Data (FRED)
- US Census Bureau
- Bureau of Labor Statistics
- Tax Policy Center
- "WTF Happened in 1971?" website
- "A Generation of Sociopaths" by Bruce Cannon Gibney

## Technology

- Static HTML/CSS/JS (GitHub Pages)
- Chart.js for visualizations
- Responsive design
- No backend needed

## Usage

```bash
# Local development
open index.html

# Deploy to GitHub Pages
git push origin main
# Enable Pages in repo settings
```

## Ideas for Expansion

### Interactive Features
- **Timeline slider** - Scrub through years, watch charts change
- **Annotations** - Click data points for historical context
- **Compare countries** - US vs Europe vs Asia (similar patterns?)
- **Inflation calculator** - "What would $X in 1971 be worth today?"

### Additional Charts
- **College tuition** - 300%+ increase adjusted for inflation
- **CEO pay ratio** - CEO:worker pay exploded from 20:1 to 300:1
- **Healthcare costs** - US vs other developed nations
- **Life expectancy** - Recent decline (unique to US)
- **Social mobility** - Harder to move up economically

### Book Insights
- **Quote cards** - Key excerpts from "Generation of Sociopaths"
- **Policy timeline** - Map Boomer policies to chart inflection points
- **Generational comparison** - Boomers vs Gen X/Millennials/Gen Z outcomes
- **Solutions section** - What could reverse these trends?

### Community Features
- **Share your story** - User submissions about economic hardship
- **Debate forum** - Discuss causes and solutions
- **Data contributions** - Crowdsource additional charts

### Marketing
- **Viral graphics** - Shareable infographics for social media
- **Video explainer** - Animated 3-minute summary
- **Podcast episode** - Deep dive with economists
- **Product Hunt launch** - Get visibility

## Why This Matters

Understanding what happened in 1971 helps explain:
- Why millennials/Gen Z can't afford homes
- Why wages feel stagnant despite "economic growth"
- Why college is unaffordable
- Why retirement seems impossible
- Why political polarization increased

**The data doesn't lie. Something fundamental changed in 1971.**

## Contributing

PRs welcome for:
- New charts/data sources
- Design improvements
- Interactive features
- Historical context
- Solutions/policy ideas

## License

MIT - Data is public domain, visualizations are open source

## Project Map

```svg
<svg viewBox="0 0 680 420" width="680" height="420" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;background:#f8fafc;border-radius:12px">
  <text x="340" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">1971 — Economic Shift Data Visualization</text>

  <!-- Root node -->
  <rect x="265" y="48" width="150" height="36" rx="8" fill="#0071e3"/>
  <text x="340" y="70" text-anchor="middle" font-size="11" fill="white" font-weight="bold">1971/</text>

  <!-- Dashed lines from root -->
  <line x1="310" y1="84" x2="130" y2="150" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="330" y1="84" x2="290" y2="150" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="350" y1="84" x2="390" y2="150" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="370" y1="84" x2="550" y2="150" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>

  <!-- index.html -->
  <rect x="40" y="150" width="180" height="36" rx="8" fill="#fbbf24"/>
  <text x="130" y="168" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="bold">index.html</text>
  <text x="130" y="180" text-anchor="middle" font-size="9" fill="#64748b">main visualization page</text>

  <!-- images/ -->
  <rect x="230" y="150" width="120" height="36" rx="8" fill="#6366f1"/>
  <text x="290" y="168" text-anchor="middle" font-size="11" fill="white" font-weight="bold">images/</text>
  <text x="290" y="180" text-anchor="middle" font-size="9" fill="#e0e7ff">chart assets</text>

  <!-- README + LICENSE -->
  <rect x="360" y="150" width="120" height="36" rx="8" fill="#86efac"/>
  <text x="420" y="168" text-anchor="middle" font-size="11" fill="#14532d">README.md</text>
  <text x="420" y="180" text-anchor="middle" font-size="9" fill="#64748b">LICENSE</text>

  <!-- architecture.svg -->
  <rect x="490" y="150" width="130" height="36" rx="8" fill="#86efac"/>
  <text x="555" y="168" text-anchor="middle" font-size="11" fill="#14532d">architecture.svg</text>
  <text x="555" y="180" text-anchor="middle" font-size="9" fill="#64748b">project diagram</text>

  <!-- Charts section -->
  <text x="130" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Chart Categories</text>
  <line x1="130" y1="186" x2="130" y2="255" stroke="#fbbf24" stroke-width="1.5"/>

  <rect x="20" y="255" width="220" height="38" rx="6" fill="#fef3c7"/>
  <text x="130" y="272" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">Economics</text>
  <text x="130" y="286" text-anchor="middle" font-size="9" fill="#64748b">Wage stagnation / income inequality</text>

  <line x1="130" y1="293" x2="130" y2="310" stroke="#fbbf24" stroke-width="1.5"/>
  <rect x="20" y="310" width="220" height="38" rx="6" fill="#fef3c7"/>
  <text x="130" y="327" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">Housing</text>
  <text x="130" y="341" text-anchor="middle" font-size="9" fill="#64748b">Median home price vs income</text>

  <line x1="130" y1="348" x2="130" y2="365" stroke="#fbbf24" stroke-width="1.5"/>
  <rect x="20" y="365" width="220" height="38" rx="6" fill="#fef3c7"/>
  <text x="130" y="382" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">Monetary</text>
  <text x="130" y="396" text-anchor="middle" font-size="9" fill="#64748b">Gold standard abandonment 1971</text>

  <!-- Right: live site info -->
  <rect x="290" y="255" width="370" height="155" rx="8" fill="#f1f5f9"/>
  <text x="475" y="278" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Deployment</text>
  <text x="475" y="300" text-anchor="middle" font-size="10" fill="#475569">Live: nulljosh.github.io/1971</text>
  <text x="475" y="320" text-anchor="middle" font-size="10" fill="#475569">GitHub Pages static hosting</text>
  <text x="475" y="348" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Stack</text>
  <text x="475" y="368" text-anchor="middle" font-size="10" fill="#475569">Pure HTML / CSS / JavaScript</text>
  <text x="475" y="388" text-anchor="middle" font-size="10" fill="#475569">Chart.js data visualizations</text>
  <text x="475" y="406" text-anchor="middle" font-size="10" fill="#475569">No build step — single file</text>
</svg>
```
