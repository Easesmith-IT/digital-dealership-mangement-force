import React from "react";
import { KraCriterionScore } from "../../types/employee";

interface KraRadarChartProps {
  criteria: KraCriterionScore[];
  selectedWeek: string;
  width?: number;
  height?: number;
}

export const KraRadarChart: React.FC<KraRadarChartProps> = ({
  criteria,
  selectedWeek,
  width = 340,
  height = 300,
}) => {
  const cx = width / 2;
  const cy = height / 2 - 10;
  const maxRadius = 90;
  const numAxes = criteria.length;

  const getScoreForWeek = (item: KraCriterionScore) => {
    switch (selectedWeek) {
      case "Week 1":
        return item.scores.week1;
      case "Week 2":
        return item.scores.week2;
      case "Week 3":
        return item.scores.week3;
      case "Week 4":
        return item.scores.week4;
      default:
        return item.monthlyAverage;
    }
  };

  const angleStep = (Math.PI * 2) / numAxes;

  // Grid rings (scores 1 to 5)
  const rings = [1, 2, 3, 4, 5];

  // Coordinates for data polygon
  const points = criteria.map((c, i) => {
    const score = getScoreForWeek(c);
    const angle = i * angleStep - Math.PI / 2;
    const r = (score / 5) * maxRadius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y, score, label: c.label };
  });

  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="radar-chart-container" style={{ position: "relative", textAlign: "center" }}>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        {/* Background Grid Rings */}
        {rings.map((ringVal) => {
          const r = (ringVal / 5) * maxRadius;
          const ringPoints = Array.from({ length: numAxes }).map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
          });
          return (
            <polygon
              key={`ring-${ringVal}`}
              points={ringPoints.join(" ")}
              fill="none"
              stroke="#e2e8f0"
              strokeDasharray={ringVal === 5 ? "none" : "2,2"}
              strokeWidth="1"
            />
          );
        })}

        {/* Axes lines */}
        {Array.from({ length: numAxes }).map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x2 = cx + maxRadius * Math.cos(angle);
          const y2 = cy + maxRadius * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPath}
          fill="rgba(37, 99, 235, 0.22)"
          stroke="#2563eb"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Data points & labels */}
        {points.map((p, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = maxRadius + 22;
          const lx = cx + labelDist * Math.cos(angle);
          const ly = cy + labelDist * Math.sin(angle);

          return (
            <g key={`pt-${i}`}>
              <circle cx={p.x} cy={p.y} r="4" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
              <text
                x={lx}
                y={ly}
                textAnchor={Math.abs(Math.cos(angle)) < 0.1 ? "middle" : Math.cos(angle) > 0 ? "start" : "end"}
                dominantBaseline="central"
                fill="#334155"
                fontSize="10"
                fontWeight="600"
              >
                {p.label.length > 18 ? p.label.substring(0, 16) + "…" : p.label} ({p.score})
              </text>
            </g>
          );
        })}

        {/* Center label */}
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#94a3b8" fontSize="10" fontWeight="700">
          5.0 Max
        </text>
      </svg>
    </div>
  );
};
