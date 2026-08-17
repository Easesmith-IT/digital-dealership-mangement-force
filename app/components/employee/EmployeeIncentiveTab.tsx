import React, { useState } from "react";
import { EmployeeProfile } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";

export const EmployeeIncentiveTab: React.FC<{ employee: EmployeeProfile }> = ({ employee }) => {
  const [testLabour, setTestLabour] = useState<number>(35000);
  const [testSalary, setTestSalary] = useState<number>(18000);
  const [testOt, setTestOt] = useState<number>(2000);
  const [testKraScore, setTestKraScore] = useState<number>(3.54);

  // Multiplier lookup
  const getMultiplier = (score: number) => {
    if (score >= 4.5) return 1.2;
    if (score >= 3.5) return 1.0;
    if (score >= 2.5) return 0.8;
    if (score >= 1.5) return 0.65;
    return 0.5;
  };

  const multiplier = getMultiplier(testKraScore);
  const netLabourMargin = Math.max(0, testLabour - (testSalary + testOt));
  const calculatedPayout = netLabourMargin * 0.1 * multiplier;

  return (
    <div className="incentive-tab-container">
      {/* Policy Card Header */}
      <div className="panel-box">
        <div className="panel-head">
          <div>
            <h3>Mechanic / Electrician Incentive Policy</h3>
            <span className="panel-subtext">Directly from June 26.xlsx / Incentive sheet</span>
          </div>
          <ProvenanceBadge provenance="SOURCE" />
        </div>

        <div className="policy-formula-box" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "14px", borderRadius: "8px", marginTop: "8px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#1d4ed8", letterSpacing: "0.04em" }}>OFFICIAL POLICY FORMULA</span>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e3a8a", marginTop: "4px" }}>
            Incentive Payout = 10% &times; (Total Labour without GST &minus; (Salary + OT)) &times; Assessment Multiplier
          </div>
        </div>

        <h4 style={{ marginTop: "18px", marginBottom: "8px", fontSize: "13px", color: "#334155" }}>
          KRA Assessment Multipliers Table
        </h4>
        <div className="table-responsive">
          <table className="enterprise-table compact">
            <thead>
              <tr>
                <th>Assessment Band / Score</th>
                <th>1 (Bad)</th>
                <th>2 (Poor)</th>
                <th>3 (Pass)</th>
                <th>4 (Good / 3.5–4.49)</th>
                <th>5 (Excellent / 4.5+)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Multiplier Factor</strong></td>
                <td><span className="badge-red">0.50 &times;</span></td>
                <td><span className="badge-orange">0.65 &times;</span></td>
                <td><span className="badge-yellow">0.80 &times;</span></td>
                <td><span className="badge-blue"><strong>1.00 &times;</strong></span></td>
                <td><span className="badge-green"><strong>1.20 &times;</strong></span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Incentive Simulator */}
      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <div>
            <h3>Interactive Incentive Preview Simulator</h3>
            <span className="panel-subtext">Calculates payout preview using Vishwajeet&apos;s June score ({testKraScore.toFixed(2)})</span>
          </div>
          <ProvenanceBadge provenance="DERIVED" />
        </div>

        <div className="simulator-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "12px" }}>
          <div className="simulator-inputs" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="sim-field">
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Monthly Attributed Labour (₹):</label>
              <input
                type="number"
                value={testLabour}
                onChange={(e) => setTestLabour(Number(e.target.value))}
                style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
            <div className="sim-field">
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Monthly Base Salary (₹):</label>
              <input
                type="number"
                value={testSalary}
                onChange={(e) => setTestSalary(Number(e.target.value))}
                style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
            <div className="sim-field">
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Overtime Pay (₹):</label>
              <input
                type="number"
                value={testOt}
                onChange={(e) => setTestOt(Number(e.target.value))}
                style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
          </div>

          <div className="simulator-results" style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b" }}>CALCULATED RESULT</span>
            <div style={{ marginTop: "8px", fontSize: "12px", color: "#334155" }}>
              <div>KRA Monthly Average: <strong>{testKraScore.toFixed(2)} / 5</strong></div>
              <div>Assessment Multiplier: <strong style={{ color: "#2563eb" }}>{multiplier.toFixed(2)}&times;</strong></div>
              <div>Net Margin over Cost: <strong>₹{netLabourMargin.toLocaleString()}</strong></div>
            </div>
            <hr style={{ margin: "12px 0", borderColor: "#cbd5e1" }} />
            <div style={{ fontSize: "13px", color: "#475569" }}>Estimated Incentive Payout:</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#166534", marginTop: "4px" }}>
              ₹{calculatedPayout.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <small className="muted" style={{ display: "block", marginTop: "6px" }}>
              Note: Actual payout will calculate automatically upon salary file import.
            </small>
          </div>
        </div>
      </div>

      {/* Role Variants Table (Floor Advisor & CRE) */}
      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <div>
            <h3>Other Role Incentive Policies (Preserved from Source)</h3>
            <span className="panel-subtext">Floor Advisor and CRE incentive tier structures</span>
          </div>
          <ProvenanceBadge provenance="SOURCE" />
        </div>

        <div className="panel-grid-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "12px" }}>
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>Floor Advisor Labour Target Tiers</h4>
            <table className="enterprise-table compact">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Monthly Target</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>T1</td><td>₹225,000</td><td>₹3,000</td></tr>
                <tr><td>T2</td><td>₹275,000</td><td>₹6,000</td></tr>
                <tr><td>T3</td><td>₹325,000</td><td>₹9,000</td></tr>
                <tr><td>T4</td><td>₹375,000</td><td><strong>₹16,000</strong></td></tr>
              </tbody>
            </table>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>CRE Reporting Targets (Srishti)</h4>
            <table className="enterprise-table compact">
              <thead>
                <tr>
                  <th>Target</th>
                  <th>Quarterly Target</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>440</td><td>1,320</td><td>₹3,000</td></tr>
                <tr><td>465</td><td>1,395</td><td>₹6,000</td></tr>
                <tr><td>490</td><td>1,470</td><td>₹9,000</td></tr>
                <tr><td>515</td><td>1,545</td><td><strong>₹12,000</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
