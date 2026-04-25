/**
 * Mock legal analysis engine.
 * Returns structured analysis data based on keyword detection.
 * Replace this module with a real AI backend later.
 */

const AREAS = {
  employment: {
    keywords: ['fired', 'terminated', 'boss', 'employer', 'workplace', 'job', 'salary', 'wage', 'overtime', 'harassment', 'discrimination', 'wrongful'],
    label: 'Employment Law',
    issues: ['Potential wrongful termination', 'Workplace rights violation', 'Employment standards breach'],
  },
  landlord: {
    keywords: ['landlord', 'tenant', 'rent', 'eviction', 'lease', 'apartment', 'deposit', 'housing', 'repair'],
    label: 'Landlord-Tenant Law',
    issues: ['Tenant rights dispute', 'Lease agreement violation', 'Security deposit claim'],
  },
  injury: {
    keywords: ['injury', 'injured', 'accident', 'hospital', 'medical', 'doctor', 'pain', 'hurt', 'slip', 'fall', 'car crash', 'negligence'],
    label: 'Personal Injury',
    issues: ['Negligence claim', 'Duty of care breach', 'Damages assessment'],
  },
  consumer: {
    keywords: ['refund', 'product', 'company', 'scam', 'charged', 'billing', 'warranty', 'defective', 'fraud', 'misleading'],
    label: 'Consumer Protection',
    issues: ['Unfair business practices', 'Consumer rights violation', 'Breach of warranty'],
  },
  family: {
    keywords: ['divorce', 'custody', 'child', 'spouse', 'marriage', 'alimony', 'separation', 'domestic'],
    label: 'Family Law',
    issues: ['Custody determination factors', 'Asset division considerations', 'Support obligation analysis'],
  },
};

function detectAreas(text) {
  const lower = text.toLowerCase();
  const matched = [];
  for (const [key, area] of Object.entries(AREAS)) {
    const hits = area.keywords.filter((k) => lower.includes(k)).length;
    if (hits > 0) matched.push({ ...area, key, hits });
  }
  matched.sort((a, b) => b.hits - a.hits);
  return matched.length > 0 ? matched : [{ ...AREAS.consumer, key: 'consumer', hits: 1 }];
}

function computeStrength(text, areas) {
  let score = 30;
  score += Math.min(text.length / 15, 25);
  score += areas.length * 8;
  score += areas.reduce((sum, a) => sum + a.hits * 3, 0);
  return Math.min(Math.round(score), 95);
}

function buildSteps(areas) {
  const base = [
    'Document all evidence including dates, communications, and receipts',
    'Consult with a licensed attorney specializing in ' + areas[0].label.toLowerCase(),
  ];
  if (areas.length > 1) {
    base.push('Your situation may involve multiple areas of law -- seek comprehensive counsel');
  }
  base.push('Check if your jurisdiction has a statute of limitations that applies');
  base.push('Consider filing a formal complaint with the relevant regulatory body');
  return base;
}

/**
 * Analyze a complaint and return structured results.
 * Simulates a 1.5s delay to mimic an API call.
 */
export function analyzeCase(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const areas = detectAreas(text);
      const strength = computeStrength(text, areas);
      const issues = areas.flatMap((a) => a.issues).slice(0, 5);
      const steps = buildSteps(areas);
      resolve({
        strength,
        strengthLabel: strength >= 70 ? 'Strong' : strength >= 45 ? 'Moderate' : 'Needs More Detail',
        issues,
        areas: areas.map((a) => a.label),
        steps,
      });
    }, 1500);
  });
}
