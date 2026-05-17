import { useState, useRef, useCallback } from 'react';
import './App.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_PHOTOS = 6;
const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

const ROOM_TYPES = [
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'living', label: 'Living Room' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'office', label: 'Office' },
  { key: 'dining', label: 'Dining Room' }
];

const ELEMENT_ICONS = {
  Wood: '\u{1F332}',
  Fire: '\u{1F525}',
  Earth: '\u{26F0}',
  Metal: '\u{2699}',
  Water: '\u{1F4A7}'
};

const ELEMENT_COLORS = {
  Wood: '#4a6741',
  Fire: '#c44d2e',
  Earth: '#b8860b',
  Metal: '#8a8a8a',
  Water: '#2e6eb8'
};

function scoreColor(score) {
  if (score >= 80) return '#4a6741';
  if (score >= 60) return '#6b8f5e';
  if (score >= 40) return '#c4a34d';
  return '#a85432';
}

function extractColors(canvas, img) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const size = 200;
  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(img, 0, 0, size, size);

  const data = ctx.getImageData(0, 0, size, size).data;
  const step = 4;
  const colorCounts = {};

  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const i = (y * size + x) * 4;
      const r = Math.round(data[i] / 32) * 32;
      const g = Math.round(data[i + 1] / 32) * 32;
      const b = Math.round(data[i + 2] / 32) * 32;
      const hex = '#' +
        r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
  }

  return Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([hex]) => hex);
}

export default function App() {
  const [images, setImages] = useState([]);
  const [direction, setDirection] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);
  const fileRef = useRef(null);

  const allColors = images.reduce((acc, img) => {
    for (const c of img.colors) {
      if (!acc.includes(c)) acc.push(c);
    }
    return acc;
  }, []);

  const handleImage = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setResults(null);
    setError(null);

    setImages((prev) => {
      const remaining = MAX_PHOTOS - prev.length;
      const toAdd = files.slice(0, remaining);
      const newEntries = [];

      for (const file of toAdd) {
        if (file.size > MAX_FILE_SIZE) continue;
        const preview = URL.createObjectURL(file);
        newEntries.push({ file, preview, colors: [] });
      }

      const updated = [...prev, ...newEntries];

      // Extract colors for each new entry
      for (const entry of newEntries) {
        const img = new Image();
        img.onload = () => {
          const extracted = extractColors(canvasRef.current, img);
          setImages((cur) =>
            cur.map((item) =>
              item.preview === entry.preview ? { ...item, colors: extracted } : item
            )
          );
        };
        img.src = entry.preview;
      }

      return updated;
    });

    // Reset file input so same files can be re-selected
    e.target.value = '';
  }, []);

  const removeImage = useCallback((preview) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.preview !== preview);
      URL.revokeObjectURL(preview);
      return updated;
    });
    setResults(null);
  }, []);

  const analyze = useCallback(async () => {
    if (!allColors.length || !direction) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const flatColors = images.flatMap((img) => img.colors);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colors: flatColors, direction, roomType })
      });
      if (!res.ok) throw new Error('Analysis failed');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [allColors, direction, roomType, images]);

  const hasPhotos = images.length > 0;
  const hasColors = allColors.length > 0;

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Chi Scan</h1>
        <p className="subtitle">Feng Shui Analyzer</p>
      </header>

      <section className="card upload-card">
        <h2 className="card-title">Room Photos</h2>
        <p className="card-desc">Upload up to {MAX_PHOTOS} photos of your room</p>

        {hasPhotos && (
          <div className="photo-grid">
            {images.map((img) => (
              <div key={img.preview} className="photo-thumb-wrap">
                <img src={img.preview} alt="Room" className="photo-thumb" />
                <button
                  className="photo-remove"
                  onClick={() => removeImage(img.preview)}
                  aria-label="Remove photo"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length < MAX_PHOTOS && (
          <button className="upload-btn" onClick={() => fileRef.current?.click()}>
            {hasPhotos ? 'Add More Photos' : 'Select Photos'}
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImage}
          className="file-input"
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </section>

      {hasColors && (
        <section className="card colors-card">
          <h2 className="card-title">Detected Colors</h2>
          <div className="color-swatches">
            {allColors.map((c, i) => (
              <div key={i} className="swatch-item">
                <div className="swatch" style={{ backgroundColor: c }} />
                <span className="swatch-label">{c}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasColors && (
        <section className="card roomtype-card">
          <h2 className="card-title">Room Type</h2>
          <p className="card-desc">Select what kind of room this is</p>
          <div className="roomtype-row">
            {ROOM_TYPES.map((rt) => (
              <button
                key={rt.key}
                className={`roomtype-pill ${roomType === rt.key ? 'active' : ''}`}
                onClick={() => setRoomType(roomType === rt.key ? null : rt.key)}
              >
                {rt.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {hasColors && (
        <section className="card direction-card">
          <h2 className="card-title">Room Facing Direction</h2>
          <p className="card-desc">Select the compass direction the room faces</p>
          <div className="compass-grid">
            {DIRECTIONS.map((d) => (
              <button
                key={d}
                className={`compass-btn ${direction === d ? 'active' : ''}`}
                onClick={() => setDirection(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </section>
      )}

      {hasColors && direction && (
        <button
          className="analyze-btn"
          onClick={analyze}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Feng Shui'}
        </button>
      )}

      {error && (
        <div className="card error-card">
          <p>{error}</p>
        </div>
      )}

      {results && (
        <section className="card results-card">
          <h2 className="card-title">Analysis</h2>

          <div className="score-section">
            <div className="score-ring" style={{ '--score-color': scoreColor(results.score) }}>
              <svg viewBox="0 0 120 120" className="score-svg">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e0e6ec" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={scoreColor(results.score)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(results.score / 100) * 327} 327`}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="score-value">{results.score}</div>
            </div>
            <p className="score-label">Chi Score</p>
          </div>

          {results.subScores && (
            <div className="subscores">
              {[
                { key: 'balance', label: 'Balance' },
                { key: 'harmony', label: 'Harmony' },
                { key: 'direction', label: 'Direction' }
              ].map(({ key, label }) => (
                <div key={key} className="subscore-item">
                  <div className="subscore-header">
                    <span className="subscore-label">{label}</span>
                    <span className="subscore-value">{results.subScores[key]}</span>
                  </div>
                  <div className="subscore-bar-bg">
                    <div
                      className="subscore-bar-fill"
                      style={{
                        width: `${results.subScores[key]}%`,
                        backgroundColor: scoreColor(results.subScores[key])
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.dominant && (
            <div className="dominant-section">
              <span className="dominant-icon">{ELEMENT_ICONS[results.dominant]}</span>
              <span className="dominant-name">{results.dominant}</span>
              <span className="dominant-label">Dominant Element</span>
            </div>
          )}

          <div className="elements-section">
            <h3 className="section-title">Five Elements</h3>
            <div className="elements-grid">
              {Object.entries(results.elements).map(([name, pct]) => (
                <div key={name} className="element-item">
                  <span className="element-icon">{ELEMENT_ICONS[name]}</span>
                  <span className="element-name">{name}</span>
                  <div className="element-bar-bg">
                    <div
                      className="element-bar-fill"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: ELEMENT_COLORS[name]
                      }}
                    />
                  </div>
                  <span className="element-pct">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {results.cycles && (results.cycles.productive.length > 0 || results.cycles.destructive.length > 0) && (
            <div className="cycles-section">
              <h3 className="section-title">Element Cycles</h3>
              {results.cycles.productive.map(([a, b], i) => (
                <div key={`p-${i}`} className="cycle-item cycle-productive">
                  {a} &rarr; {b}
                </div>
              ))}
              {results.cycles.destructive.map(([a, b], i) => (
                <div key={`d-${i}`} className="cycle-item cycle-destructive">
                  {a} vs {b}
                </div>
              ))}
            </div>
          )}

          {results.analysis && (
            <div className="analysis-text">
              <p>{results.analysis}</p>
            </div>
          )}

          {results.recommendations?.length > 0 && (
            <div className="recs-section">
              <h3 className="section-title">Recommendations</h3>
              <ul className="recs-list">
                {results.recommendations.map((r, i) => {
                  const rec = typeof r === 'string' ? { text: r, priority: 'low' } : r;
                  return (
                    <li key={i} className={`rec-item rec-${rec.priority}`}>
                      <span className={`rec-badge badge-${rec.priority}`}>{rec.priority}</span>
                      {rec.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}

      <footer className="footer">
        <p>Based on traditional Five Element theory</p>
      </footer>
    </div>
  );
}
