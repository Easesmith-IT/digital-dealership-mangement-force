import React, { useState } from "react";

interface DataPoint {
  label: string;
  value: number;
  subText?: string;
  sourceNote?: string;
}

interface PerformanceLineChartProps {
  title: string;
  data: DataPoint[];
  selectedLabel?: string;
  onPointClick?: (label: string) => void;
  averageValue?: number;
  yMin?: number;
  yMax?: number;
  height?: number;
}

export const PerformanceLineChart: React.FC<PerformanceLineChartProps> = ({
  title,
  data,
  selectedLabel,
  onPointClick,
  averageValue,
  yMin = 0,
  yMax = 5,
  height = 220,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const paddingLeft = 40;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;
  const chartWidth = 500;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const getYPosition = (val: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, val));
    const pct = (clamped - yMin) / (yMax - yMin);
    return paddingTop + innerHeight * (1 - pct);
  };

  const getXPosition = (index: number) => {
    if (data.length <= 1) return paddingLeft + innerWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * innerWidth;
  };

  const pointsString = data
    .map((d, i) => `${getXPosition(i)},${getYPosition(d.value)}`)
    .join(" ");

  const yGridValues = [1, 2, 3, 4, 5];

  return (
    <div className="performance-chart-card">
      <div className="chart-header-area">
        <h4 className="chart-title">{title}</h4>
        {averageValue !== undefined && (
          <span className="chart-avg-badge">
            Monthly Average: <strong>{averageValue.toFixed(2)} / 5</strong>
          </span>
        )}
      </div>

      <div className="svg-responsive-wrapper" style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={`0 0 ${chartWidth} ${height}`} style={{ width: "100%", minWidth: "320px", display: "block" }}>
          {/* Horizontal Grid lines */}
          {yGridValues.map((val) => {
            const y = getYPosition(val);
            return (
              <g key={`ygrid-${val}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3,3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="central"
                  fontSize="10"
                  fill="#94a3b8"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Average Reference Line */}
          {averageValue !== undefined && (
            <g>
              <line
                x1={paddingLeft}
                y1={getYPosition(averageValue)}
                x2={chartWidth - paddingRight}
                y2={getYPosition(averageValue)}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              <text
                x={chartWidth - paddingRight + 4}
                y={getYPosition(averageValue)}
                dominantBaseline="central"
                fontSize="9"
                fontWeight="700"
                fill="#d97706"
              >
                Avg ({averageValue.toFixed(2)})
              </text>
            </g>
          )}

          {/* Line Path */}
          {data.length > 1 && (
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsString}
            />
          )}

          {/* Data Points & Interactive Targets */}
          {data.map((d, idx) => {
            const x = getXPosition(idx);
            const y = getYPosition(d.value);
            const isSelected = selectedLabel === d.label;
            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={`point-${idx}`}
                style={{ cursor: "pointer" }}
                onClick={() => onPointClick && onPointClick(d.label)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Active Outer Ring */}
                {(isSelected || isHovered) && (
                  <circle cx={x} cy={y} r="10" fill="rgba(37, 99, 235, 0.18)" />
                )}

                {/* Main Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "6" : "5"}
                  fill={isSelected ? "#1d4ed8" : "#2563eb"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* X-axis Label */}
                <text
                  x={x}
                  y={height - paddingBottom + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isSelected ? "700" : "500"}
                  fill={isSelected ? "#1d4ed8" : "#64748b"}
                >
                  {d.label}
                </text>

                {/* Value Label above point */}
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#1e293b"
                >
                  {d.value.toFixed(2)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="chart-footer-note">
        <small className="muted">
          💡 Click any week data point to filter the entire employee dashboard view to that period.
        </small>
      </div>
    </div>
  );
};
