import React, { useState } from "react";
import {
  EmployeeKraAssessment,
  EmployeeProfile,
  JobCardRecord,
  KraCriterionScore,
} from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";
import { KraRadarChart } from "../charts/KraRadarChart";
import { PerformanceLineChart } from "../charts/PerformanceLineChart";
import { WorkloadBarChart } from "../charts/WorkloadBarChart";

interface EmployeeOverviewTabProps {
  employee: EmployeeProfile;
  assessment: EmployeeKraAssessment;
  selectedWeek: string;
  onSelectWeek: (week: string) => void;
  onSelectJobCard: (jc: JobCardRecord) => void;
}

export const EmployeeOverviewTab: React.FC<EmployeeOverviewTabProps> = ({
  employee,
  assessment,
  selectedWeek,
  onSelectWeek,
}) => {
  const [selectedCriterionId, setSelectedCriterionId] = useState<string>(assessment.criteria[0].id);

  // Compute current display KRA score
  let currentKraScore = assessment.monthlyAverageScore;
  if (selectedWeek === "Week 1") currentKraScore = assessment.weeklyFinalScores.week1;
  if (selectedWeek === "Week 2") currentKraScore = assessment.weeklyFinalScores.week2;
  if (selectedWeek === "Week 3") currentKraScore = assessment.weeklyFinalScores.week3;
  if (selectedWeek === "Week 4") currentKraScore = assessment.weeklyFinalScores.week4;

  const weeklyTrendData = [
    { label: "Week 1", value: assessment.weeklyFinalScores.week1 },
    { label: "Week 2", value: assessment.weeklyFinalScores.week2 },
    { label: "Week 3", value: assessment.weeklyFinalScores.week3 },
    { label: "Week 4", value: assessment.weeklyFinalScores.week4 },
  ];

  const selectedCriterion = assessment.criteria.find((c) => c.id === selectedCriterionId) || assessment.criteria[0];

  const criterionTrendData = [
    { label: "Week 1", value: selectedCriterion.scores.week1 },
    { label: "Week 2", value: selectedCriterion.scores.week2 },
    { label: "Week 3", value: selectedCriterion.scores.week3 },
    { label: "Week 4", value: selectedCriterion.scores.week4 },
  ];

  const workloadItems = [
    { week: "Week 1", assigned: 4, completed: 4 },
    { week: "Week 2", assigned: 5, completed: 5 },
    { week: "Week 3", assigned: 3, completed: 2 },
    { week: "Week 4", assigned: 4, completed: 4 },
  ];

  return (
    <div className="overview-tab-container">
      {/* 8 Executive KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card highlight">
          <div className="kpi-header">
            <span className="kpi-label">KRA Score</span>
            <ProvenanceBadge provenance="DERIVED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value">{currentKraScore.toFixed(2)}</span>
            <span className="kpi-max">/ 5.0</span>
          </div>
          <div className="kpi-footer">
            <small>
              {selectedWeek === "All Weeks"
                ? `June Monthly Average = SUM(W1:W4)/4`
                : `${selectedWeek} score = SUM(6 KRAs)/6`}
            </small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Final Score</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value text-muted">Pending</span>
          </div>
          <div className="kpi-footer">
            <small className="muted">Objective KPI layer pending technician attribution</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Grade</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value grade-a">Grade A</span>
          </div>
          <div className="kpi-footer">
            <small>Proposed grading: 70–79.99% band</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Jobs Completed</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value text-muted">--</span>
          </div>
          <div className="kpi-footer">
            <small className="warning-text">Awaiting technician attribution</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Active Work</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value">3</span>
            <span className="kpi-unit">Jobs</span>
          </div>
          <div className="kpi-footer">
            <small>1 Assigned, 1 In Progress, 1 Waiting</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Average TAT</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value text-muted">--</span>
          </div>
          <div className="kpi-footer">
            <small className="warning-text">Awaiting technician attribution</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Quality Rate</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value green">100%</span>
          </div>
          <div className="kpi-footer">
            <small>0 repeat jobs reported</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Labour Generated</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value text-muted">--</span>
          </div>
          <div className="kpi-footer">
            <small className="warning-text">Awaiting technician attribution</small>
          </div>
        </div>
      </div>

      {/* Main Analytics Grid: Line Chart + Radar Chart */}
      <div className="analytics-two-col">
        <div className="panel-box">
          <div className="panel-head">
            <h3>Weekly KRA Performance Trend</h3>
            <ProvenanceBadge provenance="DERIVED" size="sm" />
          </div>
          <PerformanceLineChart
            title="June 2026 Weekly Scores (1–5 Scale)"
            data={weeklyTrendData}
            selectedLabel={selectedWeek === "All Weeks" ? undefined : selectedWeek}
            onPointClick={(week) => onSelectWeek(week)}
            averageValue={assessment.monthlyAverageScore}
          />
        </div>

        <div className="panel-box">
          <div className="panel-head">
            <h3>Mechanic 6 KRA Radar Profile</h3>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <div className="radar-wrapper" style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
            <KraRadarChart criteria={assessment.criteria} selectedWeek={selectedWeek} />
          </div>
        </div>
      </div>

      {/* Second Row: Individual KRA Trend & Workload */}
      <div className="analytics-two-col" style={{ marginTop: "20px" }}>
        <div className="panel-box">
          <div className="panel-head">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", justifyContent: "space-between" }}>
              <h3>Individual Criterion Trend</h3>
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
          <WorkloadBarChart items={workloadItems} />
        </div>
      </div>

      {/* Strengths & Focus Areas */}
      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <h3>Performance Observations & Focus Areas</h3>
          <ProvenanceBadge provenance="DERIVED" size="sm" />
        </div>

        <div className="observations-grid">
          <div className="obs-card strength">
            <div className="obs-title">💪 Top Strengths ({selectedWeek})</div>
            <ul>
              <li>
                <strong>Uniform Discipline:</strong> Scored 5/5 across Weeks 1, 2, and 4.
              </li>
              <li>
                <strong>Punctuality (Time par aana):</strong> Consistently maintains 4/5 score.
              </li>
              <li>
                <strong>Bay Cleanliness:</strong> Maintains clean working area across shifts.
              </li>
            </ul>
          </div>

          <div className="obs-card attention">
            <div className="obs-title">⚠️ Attention Required</div>
            <ul>
              <li>
                <strong>Week 3 Performance Dip (2.67 / 5):</strong> Score dropped due to low Kaam Sekhne ki koshish (2/5) & Uniform (2/5).
              </li>
              <li>
                <strong>Technical Knowledge:</strong> Constant 3/5 score indicates opportunity for diagnostic skills training.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
