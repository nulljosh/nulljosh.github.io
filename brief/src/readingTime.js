const LEGAL_WPM = 200;

export function estimateReadingTime(text) {
  if (!text) return { words: 0, minutes: 0, display: '0 min read' };

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / LEGAL_WPM);

  return {
    words,
    minutes,
    display: minutes === 1 ? '1 min read' : `${minutes} min read`,
  };
}
