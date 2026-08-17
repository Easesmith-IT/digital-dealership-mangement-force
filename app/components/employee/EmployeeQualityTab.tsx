import React from "react";
import { BreakdownRecord, EmployeeProfile } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";

interface EmployeeQualityTabProps {
  employee: EmployeeProfile;
  breakdownRecords: BreakdownRecord[];
}

export const EmployeeQualityTab: React.FC<EmployeeQualityTabProps> = ({
  employee,
  breakdownRecords,
}) => {
  return (
    <div className="quality-tab-container">
      {/* KPI Row */}
      <div className="kpi-grid">
        <div className="kpi-card highlight">
          <div className="kpi-header">
            <span className="kpi-label">Repeat / Rework Rate</span>
            <ProvenanceBadge provenance="DERIVED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value green">0.0%</span>
          </div>
          <div className="kpi-footer">
            <small>KRA Criterion #6 score: 3.25 / 5</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Breakdown Complaints</span>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value">1</span>
            <span className="kpi-unit">Record</span>
          </div>
          <div className="kpi-footer">
            <small>From Breakdown tracking.xlsx sheet</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">QC Pass Rate</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value green">100%</span>
          </div>
          <div className="kpi-footer">
            <small>Proposed final QC verification</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Customer Feedback Score</span>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="kpi-main">
            <span className="kpi-value">4.5</span>
            <span className="kpi-max">/ 5.0</span>
          </div>
          <div className="kpi-footer">
            <small>Post-service satisfaction index</small>
          </div>
        </div>
      </div>

      {/* Breakdown Complaint Tracking Table */}
      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <div>
            <h3>Breakdown Register & Complaint Tracking</h3>
            <span className="panel-subtext">Directly from Breakdown tracking.xlsx / Daily service Tracker</span>
          </div>
          <ProvenanceBadge provenance="SOURCE" />
        </div>

        <div className="table-responsive">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Complaint No</th>
                <th>Vehicle Reg No</th>
                <th>Customer Name</th>
                <th>Customer Complaint</th>
                <th>Days Open</th>
                <th>Status</th>
                <th>Supervisor</th>
                <th>Attending Supervisor</th>
                <th>Satisfaction Signed</th>
              </tr>
            </thead>
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
          <strong>📌 Distinction Note:</strong> Breakdown complaints indicate supervisor responsibility (&quot;VEHICLE ATTEND SUPERVISOR&quot;). They are preserved from source Excel records and not falsely re-attributed to mechanics without explicit assignment data.
        </div>
      </div>
    </div>
  );
};
