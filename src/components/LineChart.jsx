// Dependency-free smooth SVG line/area chart
export default function LineChart({ data, labels, unit = '', height = 240 }) {
  const W = 340, H = height, pl = 44, pr = 14, pt = 16, pb = 32;
  const min = Math.floor(Math.min(...data)) - 1;
  const max = Math.ceil(Math.max(...data)) + 1;
  const n = data.length;
  const x = (i) => pl + (i * (W - pl - pr)) / (n - 1);
  const y = (v) => pt + ((max - v) * (H - pt - pb)) / (max - min);
  const pts = data.map((v, i) => [x(i), y(v)]);

  // Catmull-Rom -> Bezier for smooth curve
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  const area = `${d} L${x(n - 1)},${y(min)} L${x(0)},${y(min)} Z`;
  const ticks = [0, 1, 2, 3, 4].map((k) => min + ((max - min) * k) / 4);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pl} x2={W - pr} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeDasharray="4 4" />
          <text x={pl - 8} y={y(t) + 4} textAnchor="end" className="chart-t">{Math.round(t)}{unit}</text>
        </g>
      ))}
      <path d={area} fill="var(--teal)" opacity=".13" />
      <path d={d} fill="none" stroke="var(--teal)" strokeWidth="3" opacity=".45" strokeLinecap="round" />
      {pts.map(([px, py], i) => (
        <g key={i}>
          <circle cx={px} cy={py} r="6" fill="var(--teal)" stroke="var(--card)" strokeWidth="2">
            <title>{labels[i]}: {data[i]}{unit}</title>
          </circle>
          <text x={px} y={H - 8} textAnchor="middle" className="chart-t">{labels[i]}</text>
        </g>
      ))}
    </svg>
  );
}
