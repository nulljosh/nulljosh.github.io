function hexToRgb(hex) {
  const match = hex.match(/^#?([0-9a-fA-F]{6})$/);
  if (!match) return { r: 0, g: 0, b: 0 };
  const digits = match[1];
  return {
    r: parseInt(digits.substring(0, 2), 16),
    g: parseInt(digits.substring(2, 4), 16),
    b: parseInt(digits.substring(4, 6), 16)
  };
}

function colorToElement(hex) {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const brightness = (r + g + b) / 3;

  if (brightness < 40) return 'Water';
  if (brightness > 200 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20) return 'Metal';
  if (Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && brightness > 100 && brightness < 200) return 'Metal';
  if (r > 150 && r > g * 1.4 && r > b * 1.3) return 'Fire';
  if (r > 180 && g > 80 && g < 160 && b < 80) return 'Fire';
  if (r > 180 && b > 100 && g < 100) return 'Fire';
  if (b > 120 && r > 60 && r < 140 && g < 80) return 'Water';
  if (b > r && b > g && b > 80) return 'Water';
  if (g > r && g > b && g > 80) return 'Wood';
  if (r > 130 && g > 100 && b < g * 0.8) return 'Earth';
  if (r > 80 && g > 50 && g < r && b < g) return 'Earth';
  if (max === r) return 'Fire';
  if (max === g) return 'Wood';
  if (max === b) return 'Water';
  return 'Earth';
}

const DIRECTION_ELEMENTS = {
  N: 'Water', S: 'Fire', E: 'Wood', W: 'Metal',
  NE: 'Earth', NW: 'Metal', SE: 'Wood', SW: 'Earth'
};

const PRODUCTIVE = {
  Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood'
};

const DESTRUCTIVE = {
  Water: 'Fire', Fire: 'Metal', Metal: 'Wood', Wood: 'Earth', Earth: 'Water'
};

const ELEMENT_ADDITIONS = {
  Wood: 'Add green plants, wooden furniture, or vertical shapes',
  Fire: 'Add candles, warm lighting, red or orange accents, or triangular shapes',
  Earth: 'Add ceramics, stone, earthy tones, or low flat surfaces',
  Metal: 'Add metallic frames, white or gray decor, or round shapes',
  Water: 'Add a small fountain, mirrors, dark blue or black accents, or wavy shapes'
};

const ROOM_IDEALS = {
  bedroom: { Wood: 15, Fire: 10, Earth: 30, Metal: 20, Water: 25 },
  living:  { Wood: 25, Fire: 20, Earth: 20, Metal: 15, Water: 20 },
  kitchen: { Wood: 15, Fire: 30, Earth: 25, Metal: 20, Water: 10 },
  bathroom:{ Wood: 20, Fire: 5,  Earth: 15, Metal: 20, Water: 40 },
  office:  { Wood: 30, Fire: 15, Earth: 15, Metal: 25, Water: 15 },
  dining:  { Wood: 20, Fire: 25, Earth: 25, Metal: 15, Water: 15 }
};

const ROOM_LABELS = {
  bedroom: 'bedroom', living: 'living room', kitchen: 'kitchen',
  bathroom: 'bathroom', office: 'office', dining: 'dining room'
};

const ALL_ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { colors, direction, roomType } = req.body || {};

  if (!colors || !Array.isArray(colors) || !direction) {
    return res.status(400).json({ error: 'Missing colors array or direction' });
  }
  if (!DIRECTION_ELEMENTS[direction]) {
    return res.status(400).json({ error: 'Invalid direction' });
  }

  const colorElements = colors.map((c) => colorToElement(c));

  const counts = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  for (const el of colorElements) {
    counts[el]++;
  }

  const total = colors.length || 1;
  const elements = {};
  for (const [el, count] of Object.entries(counts)) {
    elements[el] = Math.round((count / total) * 100);
  }

  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const directionElement = DIRECTION_ELEMENTS[direction];
  const presentElements = Object.entries(counts).filter(([, c]) => c > 0).map(([el]) => el);

  // Find all cycle pairs
  const productivePairs = [];
  const destructivePairs = [];
  for (const el of presentElements) {
    if (presentElements.includes(PRODUCTIVE[el])) {
      productivePairs.push([el, PRODUCTIVE[el]]);
    }
    if (presentElements.includes(DESTRUCTIVE[el])) {
      destructivePairs.push([el, DESTRUCTIVE[el]]);
    }
  }

  // Sub-scores
  const ideal = (roomType && ROOM_IDEALS[roomType]) || { Wood: 20, Fire: 20, Earth: 20, Metal: 20, Water: 20 };

  let diffSum = 0;
  for (const el of ALL_ELEMENTS) {
    diffSum += Math.abs((elements[el] || 0) - ideal[el]);
  }
  const balanceScore = Math.max(0, Math.min(100, Math.round(100 - diffSum / 2)));

  let harmonyScore = 50;
  if (productivePairs.length > 0) harmonyScore += 25;
  if (presentElements.length >= 5) harmonyScore += 25;
  harmonyScore -= destructivePairs.length * 20;
  harmonyScore = Math.max(0, Math.min(100, harmonyScore));

  let directionScore = 20;
  if (dominant === directionElement) {
    directionScore = 100;
  } else if (PRODUCTIVE[dominant] === directionElement) {
    directionScore = 70;
  } else if (presentElements.includes(directionElement)) {
    directionScore = 40;
  }

  const score = Math.round(balanceScore * 0.4 + harmonyScore * 0.35 + directionScore * 0.25);

  // Recommendations
  const recommendations = [];
  const roomLabel = roomType ? ROOM_LABELS[roomType] || roomType : 'room';

  if (dominant !== directionElement) {
    recommendations.push({
      text: `This ${roomLabel} faces ${direction} (${directionElement} energy) but is dominated by ${dominant}. ${ELEMENT_ADDITIONS[directionElement]} to align with directional energy.`,
      priority: 'high'
    });
  }

  if (roomType && ROOM_IDEALS[roomType]) {
    const idealDist = ROOM_IDEALS[roomType];
    let worstEl = null;
    let worstDiff = 0;
    for (const el of ALL_ELEMENTS) {
      const diff = (elements[el] || 0) - idealDist[el];
      if (Math.abs(diff) > worstDiff) {
        worstDiff = Math.abs(diff);
        worstEl = el;
      }
    }
    if (worstEl && worstDiff > 15) {
      const actual = elements[worstEl] || 0;
      const target = idealDist[worstEl];
      if (actual > target) {
        recommendations.push({
          text: `For a ${roomLabel}, ${worstEl} is ${actual}% (ideal ${target}%). Reduce ${worstEl} elements to improve balance.`,
          priority: 'high'
        });
      } else {
        recommendations.push({
          text: `For a ${roomLabel}, ${worstEl} is only ${actual}% (ideal ${target}%). ${ELEMENT_ADDITIONS[worstEl]}.`,
          priority: 'high'
        });
      }
    }
  }

  for (const [src, tgt] of destructivePairs) {
    recommendations.push({
      text: `${src} clashes with ${tgt} (destructive cycle). Consider reducing one or adding ${PRODUCTIVE[src]} as a bridge element.`,
      priority: 'medium'
    });
  }

  const missingElements = ALL_ELEMENTS.filter((el) => counts[el] === 0);
  for (const el of missingElements) {
    recommendations.push({
      text: `${el} is absent from this ${roomLabel}. ${ELEMENT_ADDITIONS[el]}.`,
      priority: 'low'
    });
  }

  if (productivePairs.length > 0 && recommendations.length < 5) {
    for (const [src, tgt] of productivePairs.slice(0, 1)) {
      recommendations.push({
        text: `${src} feeds ${tgt} in this space -- a productive cycle supporting natural flow.`,
        priority: 'low'
      });
    }
  }

  if (recommendations.length === 0) {
    recommendations.push({
      text: `This ${roomLabel} has excellent Feng Shui balance. No major changes needed.`,
      priority: 'low'
    });
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const finalRecs = recommendations.slice(0, 5);

  // Analysis summary
  let analysis = `The ${roomLabel} is dominated by ${dominant} energy (${elements[dominant]}%). `;
  analysis += `Facing ${direction}, this space channels ${directionElement} energy. `;

  if (dominant === directionElement) {
    analysis += 'The dominant element aligns with the directional energy, creating natural harmony. ';
  } else {
    analysis += `Introducing more ${directionElement} elements would harmonize with the orientation. `;
  }

  if (presentElements.length >= 4) {
    analysis += `${presentElements.length} of 5 elements are present, showing good diversity.`;
  } else {
    analysis += `Only ${presentElements.length} of 5 elements detected -- adding variety would strengthen the space.`;
  }

  return res.status(200).json({
    score,
    elements,
    recommendations: finalRecs,
    analysis,
    subScores: { balance: balanceScore, harmony: harmonyScore, direction: directionScore },
    dominant,
    cycles: { productive: productivePairs, destructive: destructivePairs },
    roomType: roomType || null
  });
}
