import React from "react";
import { EmployeeProfile } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";
import {
  achievementPercent,
  objectiveKpiScore,
  reworkPerformancePercent,
  reworkRatePercent,
  tatPerformancePercent,
  vishwajeetJuneProposedPerformance,
} from "../../data/proposed-performance";

export const EmployeeProductivityTab: React.FC<{ employee: EmployeeProfile }> = ({ employee }) => {
  const period = vishwajeetJuneProposedPerformance.monthly;
  const jobsAchievement = achievementPercent(period.jobsCompleted, period.jobsTarget);
  const labourAchievement = achievementPercent(period.labourGenerated, period.labourTarget);
  const tatPerformance = tatPerformancePercent(period.tatActualHours, period.tatTargetHours);
  const reworkRate = reworkRatePercent(period);
  const reworkPerformance = reworkPerformancePercent(period);
  const objectiveScore = objectiveKpiScore(period);

  return (
    <div className="productivity-tab-container">
      <div className="info-banner-box">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <h4 style={{ margin: 0 }}>Proposed Objective KPI Framework</h4>
          <ProvenanceBadge provenance="PROPOSED" size="sm" />
        </div>
        <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: "1.5" }}>
          This demo uses synthetic June values to show the calculation engine. Objective KPIs contribute <strong>60%</strong> of final performance; KRA contributes <strong>40%</strong>.
        </p>
      </div>

      <div className="panel-box" style={{ marginTop: "16px" }}>
        <div className="panel-head">
          <div><h3>June 2026 Proposed KPI Snapshot</h3><span className="panel-subtext">Synthetic demo values · not historical Excel data</span></div>
          <ProvenanceBadge provenance="PROPOSED" />
        </div>
        <div className="kpi-grid">
          <div className="kpi-card"><div className="kpi-header"><span className="kpi-label">Jobs</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div><div className="kpi-main"><span className="kpi-value">{period.jobsCompleted}/{period.jobsTarget}</span></div><div className="kpi-footer"><small>{jobsAchievement.toFixed(1)}% achievement</small></div></div>
          <div className="kpi-card"><div className="kpi-header"><span className="kpi-label">Labour</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div><div className="kpi-main"><span className="kpi-value">₹{period.labourGenerated.toLocaleString("en-IN")}</span></div><div className="kpi-footer"><small>{labourAchievement.toFixed(1)}% of target</small></div></div>
          <div className="kpi-card"><div className="kpi-header"><span className="kpi-label">TAT</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div><div className="kpi-main"><span className="kpi-value">{period.tatActualHours.toFixed(2)}h</span></div><div className="kpi-footer"><small>{tatPerformance.toFixed(1)}% performance</small></div></div>
          <div className="kpi-card"><div className="kpi-header"><span className="kpi-label">Repeat / Rework</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div><div className="kpi-main"><span className="kpi-value">{reworkRate.toFixed(1)}%</span></div><div className="kpi-footer"><small>{period.repeatJobs}/{period.eligibleQualityJobs} jobs · {reworkPerformance.toFixed(1)}% KPI performance</small></div></div>
        </div>
      </div>

      <div className="panel-grid-two" style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div className="panel-box">
          <div className="panel-head"><h3>1. Job Cards Completed</h3><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row"><span className="lbl">Target per Month:</span><strong>{period.jobsTarget} Job Cards</strong></div>
            <div className="metric-preview-row"><span className="lbl">Demo Actual:</span><strong>{period.jobsCompleted}</strong></div>
            <div className="metric-preview-row"><span className="lbl">Achievement:</span><strong>{jobsAchievement.toFixed(1)}%</strong></div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}><code>Achievement = (Actual / Target) × 100</code></div>
          </div>
        </div>

        <div className="panel-box">
          <div className="panel-head"><h3>2. Labour Generated (without GST)</h3><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row"><span className="lbl">Target Labour:</span><strong>₹{period.labourTarget.toLocaleString("en-IN")}</strong></div>
            <div className="metric-preview-row"><span className="lbl">Demo Actual:</span><strong>₹{period.labourGenerated.toLocaleString("en-IN")}</strong></div>
            <div className="metric-preview-row"><span className="lbl">Achievement:</span><strong>{labourAchievement.toFixed(1)}%</strong></div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}><code>Achievement = (Actual Labour / Target Labour) × 100</code></div>
          </div>
        </div>

        <div className="panel-box">
          <div className="panel-head"><h3>3. Average Turnaround Time (TAT)</h3><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row"><span className="lbl">Target:</span><strong>{period.tatTargetHours.toFixed(1)} Hours / Job</strong></div>
            <div className="metric-preview-row"><span className="lbl">Demo Actual:</span><strong>{period.tatActualHours.toFixed(2)} Hours</strong></div>
            <div className="metric-preview-row"><span className="lbl">Performance:</span><strong>{tatPerformance.toFixed(1)}%</strong></div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}><code>If Actual ≤ Target: 100% | Else: Target / Actual × 100</code></div>
          </div>
        </div>

        <div className="panel-box">
          <div className="panel-head"><h3>4. Repeat / Rework Rate</h3><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row"><span className="lbl">Target Rework Rate:</span><strong>≤ 1.0%</strong></div>
            <div className="metric-preview-row"><span className="lbl">Demo Actual:</span><strong>{reworkRate.toFixed(1)}%</strong></div>
            <div className="metric-preview-row"><span className="lbl">KPI Performance:</span><strong>{reworkPerformance.toFixed(1)}%</strong></div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}><code>Rework Rate = Repeat Jobs / Eligible Jobs × 100; Performance = Target / Actual × 100 when above target</code></div>
          </div>
        </div>
      </div>

      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head"><h3>Objective KPI Calculation</h3><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
        <div className="metric-preview-row"><span className="lbl">Jobs Achievement</span><strong>{jobsAchievement.toFixed(1)}%</strong></div>
        <div className="metric-preview-row"><span className="lbl">Labour Achievement</span><strong>{labourAchievement.toFixed(1)}%</strong></div>
        <div className="metric-preview-row"><span className="lbl">TAT Performance</span><strong>{tatPerformance.toFixed(1)}%</strong></div>
        <div className="metric-preview-row"><span className="lbl">Rework Performance</span><strong>{reworkPerformance.toFixed(1)}%</strong></div>
        <div className="metric-preview-row" style={{ fontSize: "14px", borderTop: "1px solid #e2e8f0", marginTop: "8px", paddingTop: "10px" }}><span className="lbl"><strong>Objective KPI Score</strong></span><strong>{objectiveScore.toFixed(1)}%</strong></div>
        <div className="formula-box" style={{ marginTop: "10px", background: "#eff6ff", padding: "10px", borderRadius: "6px", fontSize: "11px" }}><code>Objective Score = Average of the 4 objective KPI performance scores</code></div>
      </div>

      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head"><h3>Job Card TAT vs Technician Work TAT</h3><ProvenanceBadge provenance="DERIVED" size="sm" /></div>
        <div style={{ fontSize: "12px", color: "#334155", lineHeight: "1.6" }}>
          <p>Job Card opening/closing dates can calculate overall Job Card duration, but that is not automatically Technician Work TAT because a job may wait for parts, approval or bay availability.</p>
          <p style={{ margin: 0, color: "#0369a1", fontWeight: "600" }}>The proposed 4.08h technician TAT is synthetic demo data and will become live when start/pause/end timestamps are captured on the shop floor.</p>
        </div>
      </div>
    </div>
  );
};
