import React, { useState } from "react";
import { EmployeeKraAssessment, EmployeeProfile, JobCardRecord } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";
import { KraRadarChart } from "../charts/KraRadarChart";
import { PerformanceLineChart } from "../charts/PerformanceLineChart";
import { WorkloadBarChart } from "../charts/WorkloadBarChart";
import {
  achievementPercent,
  finalPerformanceScore,
  getProposedPeriodData,
  objectiveKpiScore,
  performanceGrade,
  qualityRatePercent,
  reworkPerformancePercent,
  reworkRatePercent,
  tatPerformancePercent,
} from "../../data/proposed-performance";

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
  const period = getProposedPeriodData(selectedWeek as "All Weeks" | "Week 1" | "Week 2" | "Week 3" | "Week 4");

  let currentKraScore = assessment.monthlyAverageScore;
  if (selectedWeek === "Week 1") currentKraScore = assessment.weeklyFinalScores.week1;
  if (selectedWeek === "Week 2") currentKraScore = assessment.weeklyFinalScores.week2;
  if (selectedWeek === "Week 3") currentKraScore = assessment.weeklyFinalScores.week3;
  if (selectedWeek === "Week 4") currentKraScore = assessment.weeklyFinalScores.week4;

  const objectiveScore = objectiveKpiScore(period);
  const finalScore = finalPerformanceScore(currentKraScore, objectiveScore);
  const grade = performanceGrade(finalScore);
  const qualityRate = qualityRatePercent(period);
  const repeatRate = reworkRatePercent(period);
  const reworkPerformance = reworkPerformancePercent(period);
  const jobsAchievement = achievementPercent(period.jobsCompleted, period.jobsTarget);
  const labourAchievement = achievementPercent(period.labourGenerated, period.labourTarget);
  const tatPerformance = tatPerformancePercent(period.tatActualHours, period.tatTargetHours);

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
    { week: "Week 1", assigned: 6, completed: 6 },
    { week: "Week 2", assigned: 6, completed: 6 },
    { week: "Week 3", assigned: 5, completed: 4 },
    { week: "Week 4", assigned: 7, completed: 6 },
  ];

  return (
    <div className="overview-tab-container">
      <div className="data-integrity-note" style={{ marginBottom: "14px" }}>
        <strong>DEMO ESTIMATION DATA:</strong> Operational KPIs below are synthetic <strong>PROPOSED</strong> values used to demonstrate the future technician-attribution layer. They are not historical Excel values.
      </div>

      <div className="kpi-grid">
        <div className="kpi-card highlight">
          <div className="kpi-header"><span className="kpi-label">KRA Score</span><ProvenanceBadge provenance="DERIVED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{currentKraScore.toFixed(2)}</span><span className="kpi-max">/ 5.0</span></div>
          <div className="kpi-footer"><small>{selectedWeek === "All Weeks" ? "Monthly = AVERAGE(W1:W4)" : `${selectedWeek} = SUM(6 KRAs) / 6`}</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Final Score</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{finalScore.toFixed(1)}</span><span className="kpi-max">/ 100</span></div>
          <div className="kpi-footer"><small>40% KRA + 60% Objective KPI</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Grade</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value grade-a">Grade {grade}</span></div>
          <div className="kpi-footer"><small>{finalScore.toFixed(1)} / 100 performance band</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Jobs Completed</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{period.jobsCompleted}</span><span className="kpi-unit">/ {period.jobsTarget}</span></div>
          <div className="kpi-footer"><small>{jobsAchievement.toFixed(1)}% target achievement</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Active Work</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{period.activeJobs}</span><span className="kpi-unit">Jobs</span></div>
          <div className="kpi-footer"><small>{period.inProgressJobs} In Progress, {period.waitingJobs} Waiting</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Average TAT</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{period.tatActualHours.toFixed(2)}</span><span className="kpi-unit">hrs</span></div>
          <div className="kpi-footer"><small>{tatPerformance.toFixed(1)}% performance vs {period.tatTargetHours.toFixed(1)}h target</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Quality Rate</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value green">{qualityRate.toFixed(1)}%</span></div>
          <div className="kpi-footer"><small>{period.repeatJobs} repeat / rework out of {period.eligibleQualityJobs} eligible jobs ({repeatRate.toFixed(1)}%)</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Labour Generated</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">₹{period.labourGenerated.toLocaleString("en-IN")}</span></div>
          <div className="kpi-footer"><small>{labourAchievement.toFixed(1)}% of ₹{period.labourTarget.toLocaleString("en-IN")} target</small></div>
        </div>
      </div>

      <div className="analytics-two-col">
        <div className="panel-box">
          <div className="panel-head"><h3>Weekly KRA Performance Trend</h3><ProvenanceBadge provenance="DERIVED" size="sm" /></div>
          <PerformanceLineChart title="June 2026 Weekly Scores (1–5 Scale)" data={weeklyTrendData} selectedLabel={selectedWeek === "All Weeks" ? undefined : selectedWeek} onPointClick={(week) => onSelectWeek(week)} averageValue={assessment.monthlyAverageScore} />
        </div>
        <div className="panel-box">
          <div className="panel-head"><h3>Mechanic 6 KRA Radar Profile</h3><ProvenanceBadge provenance="SOURCE" size="sm" /></div>
          <div className="radar-wrapper" style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}><KraRadarChart criteria={assessment.criteria} selectedWeek={selectedWeek} /></div>
        </div>
      </div>

      <div className="analytics-two-col" style={{ marginTop: "20px" }}>
        <div className="panel-box">
          <div className="panel-head">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", justifyContent: "space-between" }}>
              <h3>Individual Criterion Trend</h3>
              <select className="criterion-dropdown" value={selectedCriterionId} onChange={(e) => setSelectedCriterionId(e.target.value)}>
                {assessment.criteria.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <PerformanceLineChart title={`Criterion: ${selectedCriterion.label}`} data={criterionTrendData} selectedLabel={selectedWeek === "All Weeks" ? undefined : selectedWeek} onPointClick={(week) => onSelectWeek(week)} averageValue={selectedCriterion.monthlyAverage} />
        </div>

        <div className="panel-box">
          <div className="panel-head">
            <div><h3>Proposed Objective KPI Mix</h3><small>Demo calculation for estimation</small></div>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="metric-preview-row"><span className="lbl">Jobs Achievement</span><strong>{jobsAchievement.toFixed(1)}%</strong></div>
          <div className="metric-preview-row"><span className="lbl">Labour Achievement</span><strong>{labourAchievement.toFixed(1)}%</strong></div>
          <div className="metric-preview-row"><span className="lbl">TAT Performance</span><strong>{tatPerformance.toFixed(1)}%</strong></div>
          <div className="metric-preview-row"><span className="lbl">Rework Performance</span><strong>{reworkPerformance.toFixed(1)}%</strong></div>
          <div className="metric-preview-row"><span className="lbl">Objective KPI Score</span><strong>{objectiveScore.toFixed(1)}%</strong></div>
          <div className="formula-box" style={{ marginTop: "12px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}><code>Objective = average(Jobs, Labour, TAT, Rework)</code></div>
        </div>
      </div>

      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head"><h3>Workload: Assigned vs Completed</h3><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
        <WorkloadBarChart items={workloadItems} />
      </div>

      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head"><h3>Performance Observations & Focus Areas</h3><ProvenanceBadge provenance="DERIVED" size="sm" /></div>
        <div className="observations-grid">
          <div className="obs-card strength">
            <div className="obs-title">Top Strengths ({selectedWeek})</div>
            <ul>
              <li><strong>Uniform Discipline:</strong> Strong source KRA scores in Weeks 1, 2 and 4.</li>
              <li><strong>Punctuality:</strong> Consistent 4/5 source score in Weeks 1, 2 and 4.</li>
              <li><strong>Work Output:</strong> Proposed completion is {period.jobsCompleted}/{period.jobsTarget} jobs.</li>
            </ul>
          </div>
          <div className="obs-card attention">
            <div className="obs-title">Attention Required</div>
            <ul>
              <li><strong>Week 3 KRA Dip:</strong> 2.67 / 5, the lowest source KRA week in June.</li>
              <li><strong>TAT:</strong> Proposed {period.tatActualHours.toFixed(2)}h vs {period.tatTargetHours.toFixed(1)}h target.</li>
              <li><strong>Repeat/Rework:</strong> Proposed rate is {repeatRate.toFixed(1)}%, above the 1% target used by the KPI model.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
