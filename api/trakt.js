export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://heyitsmejosh.com');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');

  const key = process.env.TRAKT_API_KEY;
  if (!key) return res.status(503).json({ error: 'not configured' });

  try {
    const r = await fetch('https://api.trakt.tv/users/nljs/stats', {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': key,
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!r.ok) return res.status(r.status).json({ error: 'upstream error' });
    const d = await r.json();
    return res.status(200).json({ episodes: d.episodes?.watched ?? 0 });
  } catch {
    return res.status(502).json({ error: 'fetch failed' });
  }
}
