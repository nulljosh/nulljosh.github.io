export function calculateRoom(lengthFt, widthFt) {
  const sqft = lengthFt * widthFt;
  const sqm = sqft * 0.0929;

  const zones = [];
  if (sqft < 100) zones.push('Compact space -- focus on one commanding element');
  else if (sqft < 250) zones.push('Standard room -- balance five elements evenly');
  else if (sqft < 500) zones.push('Large room -- create distinct bagua zones');
  else zones.push('Open plan -- use furniture groupings to define energy sectors');

  if (Math.abs(lengthFt - widthFt) / Math.max(lengthFt, widthFt) < 0.2) {
    zones.push('Near-square ratio -- excellent for balanced chi flow');
  } else {
    zones.push('Rectangular -- place mirrors on short wall to expand energy');
  }

  return { sqft, sqm: Math.round(sqm * 10) / 10, zones };
}
