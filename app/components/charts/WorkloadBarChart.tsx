import React from "react";

interface WorkloadItem {
  week: string;
  assigned: number;
  completed: number;
}

interface ServiceMixItem {
  typeOfService: string;
  count: number;
  percentage: number;
}

export const WorkloadBarChart: React.FC<{ items: WorkloadItem[] }> = ({ items }) => {
  const chartHeight = 180;
  const chartWidth = 440;
  const padLeft = 35;
  const padBottom = 35;
  const padTop = 20;

  const maxVal = Math.max(5, ...items.flatMap((i) => [i.assigned, i.completed]));
  const innerHeight = chartHeight - padTop - padBottom;
  const innerWidth = chartWidth - padLeft - 20;

  const groupWidth = innerWidth / items.length;
  const barWidth = Math.min(22, groupWidth * 0.35);

  return (
    <div className="workload-chart-card">
      <div className="chart-header-area">
        <h4 className="chart-title">Assigned vs Completed Workload</h4>
        <span className="chart-tag proposed">PROPOSED OPERATIONAL CAPTURE</span>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: "100%", minWidth: "300px" }}>
          {/* Y Grid */}
          {[0, 2, 4, 6].map((v) => {
            const y = padTop + innerHeight * (1 - v / maxVal);
            return (
              <g key={`y-${v}`}>
                <line x1={padLeft} y1={y} x2={chartWidth - 20} y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
                <text x={padLeft - 6} y={y} dominantBaseline="central" textAnchor="end" fontSize="10" fill="#94a3b8">
                  {v}
                </text>
              </g>
            );
          })}

          {/* Grouped Bars */}
          {items.map((item, idx) => {
            const groupCx = padLeft + idx * groupWidth + groupWidth / 2;
            const assignedH = (item.assigned / maxVal) * innerHeight;
            const completedH = (item.completed / maxVal) * innerHeight;

            const assignedX = groupCx - barWidth - 2;
            const completedX = groupCx + 2;

            const assignedY = padTop + innerHeight - assignedH;
            const completedY = padTop + innerHeight - completedH;

            return (
              <g key={`group-${idx}`}>
                {/* Assigned Bar */}
                <rect x={assignedX} y={assignedY} width={barWidth} height={assignedH} fill="#93c5fd" rx="3" />
                <text x={assignedX + barWidth / 2} y={assignedY - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">
                  {item.assigned}
                </text>

                {/* Completed Bar */}
                <rect x={completedX} y={completedY} width={barWidth} height={completedH} fill="#2563eb" rx="3" />
                <text x={completedX + barWidth / 2} y={completedY - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">
                  {item.completed}
                </text>

                {/* X Axis Label */}
                <text x={groupCx} y={chartHeight - padBottom + 16} textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">
                  {item.week}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="chart-legend" style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "8px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#475569" }}>
          <span style={{ width: "10px", height: "10px", backgroundColor: "#93c5fd", borderRadius: "2px" }} /> Assigned
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#475569" }}>
          <span style={{ width: "10px", height: "10px", backgroundColor: "#2563eb", borderRadius: "2px" }} /> Completed
        </span>
      </div>
    </div>
  );
};

export const WorkMixChart: React.FC<{ items: ServiceMixItem[] }> = ({ items }) => {
  const colors = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="workmix-chart-card">
      <div className="chart-header-area">
        <h4 className="chart-title">Work Performed by Service Type</h4>
        <span className="chart-tag source">SOURCE · Job Card Data</span>
      </div>

      <div className="workmix-body" style={{ display: "flex", gap: "20px", alignItems: "center", marginTop: "12px" }}>
        <div className="workmix-bars" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item, idx) => {
            const color = colors[idx % colors.length];
            return (
              <div key={item.typeOfService} className="mix-row">
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, color: "#334155" }}>{item.typeOfService}</span>
                  <span style={{ color: "#64748b", fontWeight: 700 }}>
                    {item.count} jobs ({item.percentage}%)
                  </span>
                </div>
                <div style={{ height: "8px", width: "100%", backgroundColor: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${item.percentage}%`,
                      backgroundColor: color,
                      borderRadius: "4px",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
