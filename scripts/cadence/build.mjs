// Bakes jaybulb.com/cadence data from GitHub. Run with GITHUB_TOKEN set (deploy script does it).
import { writeFileSync } from 'node:fs';
import stats from './stats.js';
import heatmap from './heatmap.js';
import projects from './projects.js';

const run = h => new Promise((ok, fail) => {
  const res = { setHeader() {}, status() { return res; }, json: ok };
  h({}, res).catch(fail);
});
const [s, h, p] = await Promise.all([run(stats), run(heatmap), run(projects)]);
writeFileSync(new URL('../../cadence/data.json', import.meta.url), JSON.stringify({ stats: s, heatmap: h, projects: p }));
console.log('cadence: streak', s.streak, '· 30d', s.total30);
