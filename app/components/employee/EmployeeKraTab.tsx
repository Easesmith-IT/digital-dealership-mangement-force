import React, { useState } from "react";
import { EmployeeKraAssessment, EmployeeProfile } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";
import { KraRadarChart } from "../charts/KraRadarChart";
import { PerformanceLineChart } from "../charts/PerformanceLineChart";

interface EmployeeKraTabProps {
  employee: EmployeeProfile;
  assessment: EmployeeKraAssessment;
  selectedWeek: string;
  onSelectWeek: (week: string) => void;
}

export const EmployeeKraTab: React.FC<EmployeeKraTabProps> = ({
  employee,
  assessment,
  selectedWeek,
  onSelectWeek,
}) => {
  const [selectedCriterionId, setSelectedCriterionId] = useState<string>(assessment.criteria[0].id);

  const selectedCriterion = assessment.criteria.find((c) => c.id === selectedCriterionId) || assessment.criteria[0];

  const criterionTrendData = [
    { label: "Week 1", value: selectedCriterion.scores.week1 },
    { label: "Week 2", value: selectedCriterion.scores.week2 },
    { label: "Week 3", value: selectedCriterion.scores.week3 },
    { label: "Week 4", value: selectedCriterion.scores.week4 },
  ];

  return (
    <div className="kra-tab-container">
      {/* Formula & Rule Header Banner */}
      <div className="info-banner-box">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <h4 style={{ margin: 0 }}>Mechanic KRA Evaluation Logic</h4>
          <ProvenanceBadge provenance="SOURCE" size="sm" />
          <ProvenanceBadge provenance="DERIVED" size="sm" />
        </div>
        <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.5" }}>
          Evaluation uses <strong>exactly six source criteria</strong> on a <strong>1 to 5 scale</strong> (1 = Very Bad, 2 = Poor, 3 = Pass, 4 = Good, 5 = Excellent).<br />
          &bull; <strong>Weekly Score Formula:</strong> <code>SUM(6 KRA scores) / 6</code><br />
          &bull; <strong>Monthly Score Formula:</strong> <code>AVERAGE(W1, W2, W3, W4)</code> = <code>(3.833 + 3.833 + 2.667 + 3.833) / 4 = 3.54 / 5</code>
        </div>
      </div>

      {/* Main 6 KRA Table Grid */}
      <div className="panel-box" style={{ marginTop: "16px" }}>
        <div className="panel-head">
          <h3>June 2026 KRA Evaluation Matrix — {employee.name}</h3>
          <ProvenanceBadge provenance="SOURCE" size="sm" />
        </div>

        <div className="table-responsive">
          <table className="enterprise-table kra-matrix-table">
            <thead>
              <tr>
                <th>#</th>
                <th>KRA Evaluation Criterion</th>
                <th>Provenance</th>
                <th className={selectedWeek === "Week 1" ? "active-col" : ""}>Week 1</th>
                <th className={selectedWeek === "Week 2" ? "active-col" : ""}>Week 2</th>
                <th className={selectedWeek === "Week 3" ? "active-col" : ""}>Week 3</th>
                <th className={selectedWeek === "Week 4" ? "active-col" : ""}>Week 4</th>
                <th>Monthly Average</th>
              </tr>
            </thead>
            <tbody>
              {assessment.criteria.map((item, idx) => (
                <tr
                  key={item.id}
                  className={selectedCriterionId === item.id ? "selected-row" : ""}
                  onClick={() => setSelectedCriterionId(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <strong>{item.label}</strong>
                  </td>
                  <td>
                    <ProvenanceBadge provenance={item.provenance} size="sm" />
                  </td>
                  <td className={selectedWeek === "Week 1" ? "active-col score-cell" : "score-cell"}>
                    {item.scores.week1}
                  </td>
                  <td className={selectedWeek === "Week 2" ? "active-col score-cell" : "score-cell"}>
                    {item.scores.week2}
                  </td>
                  <td className={selectedWeek === "Week 3" ? "active-col score-cell" : "score-cell"}>
                    {item.scores.week3}
                  </td>
                  <td className={selectedWeek === "Week 4" ? "active-col score-cell" : "score-cell"}>
                    {item.scores.week4}
                  </td>
                  <td className="score-cell highlight">
                    <strong>{item.monthlyAverage.toFixed(2)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="formula-summary-row">
                <td colSpan={3}>
                  <strong>Weekly Final Score (SUM / 6)</strong>
                </td>
                <td
                  className={selectedWeek === "Week 1" ? "active-col score-cell bold" : "score-cell bold"}
                  onClick={() => onSelectWeek("Week 1")}
                  style={{ cursor: "pointer" }}
                >
                  {assessment.weeklyFinalScores.week1.toFixed(2)}
                </td>
                <td
                  className={selectedWeek === "Week 2" ? "active-col score-cell bold" : "score-cell bold"}
                  onClick={() => onSelectWeek("Week 2")}
                  style={{ cursor: "pointer" }}
                >
                  {assessment.weeklyFinalScores.week2.toFixed(2)}
                </td>
                <td
                  className={selectedWeek === "Week 3" ? "active-col score-cell bold" : "score-cell bold"}
                  onClick={() => onSelectWeek("Week 3")}
                  style={{ cursor: "pointer" }}
                >
                  {assessment.weeklyFinalScores.week3.toFixed(2)}
                </td>
                <td
                  className={selectedWeek === "Week 4" ? "active-col score-cell bold" : "score-cell bold"}
                  onClick={() => onSelectWeek("Week 4")}
                  style={{ cursor: "pointer" }}
                >
                  {assessment.weeklyFinalScores.week4.toFixed(2)}
                </td>
                <td className="score-cell monthly-final-cell">
                  <span className="monthly-val">{assessment.monthlyAverageScore.toFixed(2)}</span>
                  <span className="monthly-max">/ 5.0</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Charts Column */}
      <div className="analytics-two-col" style={{ marginTop: "20px" }}>
        <div className="panel-box">
          <div className="panel-head">
            <h3>Individual Criterion Trend Analysis</h3>
            <select
              className="criterion-dropdown"
              value={selectedCriterionId}
              onChange={(e) => setSelectedCriterionId(e.target.value)}
            >
              {assessment.criteria.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <PerformanceLineChart
            title={`Criterion: ${selectedCriterion.label}`}
            data={criterionTrendData}
            selectedLabel={selectedWeek === "All Weeks" ? undefined : selectedWeek}
            onPointClick={(week) => onSelectWeek(week)}
            averageValue={selectedCriterion.monthlyAverage}
          />
        </div>

        <div className="panel-box">
          <div className="panel-head">
            <h3>KRA Profile Radar — {selectedWeek}</h3>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
            <KraRadarChart criteria={assessment.criteria} selectedWeek={selectedWeek} />
          </div>
        </div>
      </div>
    </div>
  );
};
