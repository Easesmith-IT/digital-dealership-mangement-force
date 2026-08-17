import React from "react";
import { BreakdownRecord, EmployeeProfile } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";
import {
  qcPassRatePercent,
  qualityRatePercent,
  reworkRatePercent,
  vishwajeetJuneProposedPerformance,
} from "../../data/proposed-performance";

interface EmployeeQualityTabProps {
  employee: EmployeeProfile;
  breakdownRecords: BreakdownRecord[];
}

export const EmployeeQualityTab: React.FC<EmployeeQualityTabProps> = ({ breakdownRecords }) => {
  const period = vishwajeetJuneProposedPerformance.monthly;
  const qualityRate = qualityRatePercent(period);
  const repeatRate = reworkRatePercent(period);
  const qcPassRate = qcPassRatePercent(period);

  return (
    <div className="quality-tab-container">
      <div className="data-integrity-note" style={{ marginBottom: "14px" }}>
        <strong>DEMO ESTIMATION DATA:</strong> Quality metrics are synthetic PROPOSED values for demonstrating the future technician attribution and QC workflow. Breakdown records below remain SOURCE data and are not re-attributed to the mechanic.
      </div>

      <div className="kpi-grid">
        <div className="kpi-card highlight">
          <div className="kpi-header"><span className="kpi-label">Quality Rate</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value green">{qualityRate.toFixed(1)}%</span></div>
          <div className="kpi-footer"><small>{period.eligibleQualityJobs - period.repeatJobs} clean jobs / {period.eligibleQualityJobs} eligible</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Repeat / Rework Rate</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{repeatRate.toFixed(1)}%</span></div>
          <div className="kpi-footer"><small>{period.repeatJobs} repeat job out of {period.eligibleQualityJobs} eligible jobs</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">QC Pass Rate</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{qcPassRate.toFixed(1)}%</span></div>
          <div className="kpi-footer"><small>{period.qcPassedJobs}/{period.qcEligibleJobs} proposed QC checks passed</small></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Customer Feedback</span><ProvenanceBadge provenance="PROPOSED" size="sm" /></div>
          <div className="kpi-main"><span className="kpi-value">{period.feedbackScore.toFixed(1)}</span><span className="kpi-max">/ 5.0</span></div>
          <div className="kpi-footer"><small>{period.feedbackResponses} proposed feedback responses</small></div>
        </div>
      </div>

      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <div><h3>Quality Calculation</h3><span className="panel-subtext">Transparent formulas for the proposed layer</span></div>
          <ProvenanceBadge provenance="PROPOSED" />
        </div>
        <div className="metric-preview-row"><span className="lbl">Quality Rate</span><strong>({period.eligibleQualityJobs} − {period.repeatJobs}) / {period.eligibleQualityJobs} × 100 = {qualityRate.toFixed(1)}%</strong></div>
        <div className="metric-preview-row"><span className="lbl">Repeat / Rework Rate</span><strong>{period.repeatJobs} / {period.eligibleQualityJobs} × 100 = {repeatRate.toFixed(1)}%</strong></div>
        <div className="metric-preview-row"><span className="lbl">QC Pass Rate</span><strong>{period.qcPassedJobs} / {period.qcEligibleJobs} × 100 = {qcPassRate.toFixed(1)}%</strong></div>
      </div>

      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <div><h3>Breakdown Register & Complaint Tracking</h3><span className="panel-subtext">Directly from Breakdown tracking.xlsx / Daily service Tracker</span></div>
          <ProvenanceBadge provenance="SOURCE" />
        </div>
        <div className="table-responsive">
          <table className="enterprise-table">
            <thead><tr><th>Complaint No</th><th>Vehicle Reg No</th><th>Customer Name</th><th>Customer Complaint</th><th>Days Open</th><th>Status</th><th>Supervisor</th><th>Attending Supervisor</th><th>Satisfaction Signed</th></tr></thead>
            <tbody>
              {breakdownRecords.map((b) => (
                <tr key={b.complaintNo}>
                  <td><code>{b.complaintNo}</code></td>
                  <td><strong>{b.vehicleRegNo}</strong></td>
                  <td>{b.customerName}</td>
                  <td>{b.complaintText}</td>
                  <td><span className="badge-orange">{b.daysOpen} days</span></td>
                  <td><span className="status-pill waiting">{b.status}</span></td>
                  <td>{b.supervisor}</td>
                  <td>{b.vehicleAttendSupervisor}</td>
                  <td>{b.customerSatisfactionSigned ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="data-integrity-note" style={{ marginTop: "14px" }}>
          <strong>Distinction:</strong> Breakdown complaints indicate supervisor responsibility. They are preserved from source Excel records and are not falsely re-attributed to mechanics without explicit assignment data.
        </div>
      </div>
    </div>
  );
};
