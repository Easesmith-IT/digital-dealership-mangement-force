import React from "react";
import { EmployeeProfile } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";

export const EmployeeProductivityTab: React.FC<{ employee: EmployeeProfile }> = ({ employee }) => {
  return (
    <div className="productivity-tab-container">
      {/* Banner */}
      <div className="info-banner-box">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <h4 style={{ margin: 0 }}>Proposed Objective KPI Framework</h4>
          <ProvenanceBadge provenance="PROPOSED" size="sm" />
        </div>
        <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: "1.5" }}>
          The objective performance score accounts for <strong>60% of final performance evaluation</strong> (KRA accounts for 40%). Operational KPIs require verified technician-to-job card attribution before score calculation is finalized.
        </p>
      </div>

      {/* KPI Framework Grid */}
      <div className="panel-grid-two" style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div className="panel-box">
          <div className="panel-head">
            <h3>1. Job Cards Completed</h3>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row">
              <span className="lbl">Target per Month:</span>
              <strong>15 Job Cards</strong>
            </div>
            <div className="metric-preview-row">
              <span className="lbl">Actual Completed:</span>
              <span className="val-muted">-- (Awaiting technician attribution)</span>
            </div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}>
              <code>Achievement % = (Actual Completed / Target) × 100</code>
            </div>
          </div>
        </div>

        <div className="panel-box">
          <div className="panel-head">
            <h3>2. Labour Generated (without GST)</h3>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row">
              <span className="lbl">Target Labour:</span>
              <strong>₹25,000 / Month</strong>
            </div>
            <div className="metric-preview-row">
              <span className="lbl">Actual Labour Generated:</span>
              <span className="val-muted">-- (Awaiting technician attribution)</span>
            </div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}>
              <code>Achievement % = (Actual Labour / Target Labour) × 100</code>
            </div>
          </div>
        </div>

        <div className="panel-box">
          <div className="panel-head">
            <h3>3. Average Turnaround Time (TAT)</h3>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row">
              <span className="lbl">Target Service TAT:</span>
              <strong>3.5 Hours / Job Card</strong>
            </div>
            <div className="metric-preview-row">
              <span className="lbl">Actual Technician TAT:</span>
              <span className="val-muted">-- (Awaiting technician attribution)</span>
            </div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}>
              <code>If Actual ≤ Target: Performance = 100% | Else: (Target / Actual) × 100</code>
            </div>
          </div>
        </div>

        <div className="panel-box">
          <div className="panel-head">
            <h3>4. Repeat / Rework Rate</h3>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-detail-body">
            <div className="metric-preview-row">
              <span className="lbl">Target Rework Rate:</span>
              <strong>≤ 1.0%</strong>
            </div>
            <div className="metric-preview-row">
              <span className="lbl">Actual Rework Rate:</span>
              <strong className="green">0.0% (KRA Criterion #6: 3.25 / 5)</strong>
            </div>
            <div className="formula-box" style={{ marginTop: "10px", background: "#f8fafc", padding: "10px", borderRadius: "6px", fontSize: "11px" }}>
              <code>If Actual ≤ Target: Performance = 100% | Else: (Target / Actual) × 100</code>
            </div>
          </div>
        </div>
      </div>

      {/* Critical TAT Distinction Card */}
      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <h3>Critical Architectural Rule: Job Card TAT vs Technician Work TAT</h3>
          <ProvenanceBadge provenance="DERIVED" size="sm" />
        </div>
        <div style={{ fontSize: "12px", color: "#334155", lineHeight: "1.6" }}>
          <p>
            Where Job Card opening and closing dates exist (e.g. Opening Date: 26-Jul-2026, Closing Date: 26-Jul-2026), overall Job Card duration can be calculated. However, <strong>Job Card duration is NOT automatically Technician Work TAT</strong> because a job card may wait for parts, customer approval, or bay availability.
          </p>
          <p style={{ margin: 0, color: "#0369a1", fontWeight: "600" }}>
            Technician Work TAT requires explicit start/pause/end work timestamps captured on the shop floor.
          </p>
        </div>
      </div>
    </div>
  );
};
