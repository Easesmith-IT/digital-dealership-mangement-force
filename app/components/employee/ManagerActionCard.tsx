import React, { useState } from "react";
import { ManagerActionData } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";

export const ManagerActionCard: React.FC<{ data: ManagerActionData }> = ({ data }) => {
  const [improvementPlan, setImprovementPlan] = useState(data.improvementPlan);
  const [remark, setRemark] = useState(data.managerRemark);
  const [reviewDate, setReviewDate] = useState(data.reviewDate);
  const [status, setStatus] = useState(data.status);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="panel-box manager-action-panel" style={{ marginTop: "24px" }}>
      <div className="panel-head">
        <div>
          <h3>MANAGEMENT ACTION & REVIEW COCKPIT</h3>
          <span className="panel-subtext">Manager performance evaluation, action plan, and review sign-off</span>
        </div>
        <ProvenanceBadge provenance="PROPOSED" />
      </div>

      <div className="manager-action-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "14px" }}>
        {/* Left Column: Strengths & Attention */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="obs-card strength">
            <div className="obs-title">💪 Employee Strengths</div>
            <ul>
              {data.strengths.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="obs-card attention">
            <div className="obs-title">⚠️ Priority Attention Needed</div>
            <ul>
              {data.attentionRequired.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Manager Input Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>Target Improvement Plan:</label>
            <span className="status-pill completed">{status}</span>
          </div>

          <textarea
            className="action-textarea"
            rows={2}
            value={improvementPlan}
            onChange={(e) => setImprovementPlan(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
          />

          <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", marginTop: "4px" }}>Manager Review Remarks:</label>
          <textarea
            className="action-textarea"
            rows={2}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
          />

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "4px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>Next Review Date:</label>
              <input
                type="text"
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
                style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>Action Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px" }}
              >
                <option value="Acknowledged">Acknowledged</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Action Required">Action Required</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", marginTop: "8px" }}>
            {saved && <span style={{ fontSize: "11px", color: "#166534", fontWeight: 700 }}>✓ Review Saved Successfully</span>}
            <button className="btn-primary" onClick={handleSave}>
              Save Manager Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
