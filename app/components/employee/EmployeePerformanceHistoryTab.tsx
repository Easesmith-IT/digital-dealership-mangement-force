import React from "react";
import { EmployeeKraAssessment, EmployeeProfile } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";

export const EmployeePerformanceHistoryTab: React.FC<{
  employee: EmployeeProfile;
  assessment: EmployeeKraAssessment;
}> = ({ employee, assessment }) => {
  const historicalMonths = [
    {
      month: "June 2026",
      kraScore: assessment.monthlyAverageScore.toFixed(2),
      grade: "Grade A",
      status: "Verified Source",
      provenance: "SOURCE" as const,
    },
    {
      month: "May 2026",
      kraScore: "--",
      grade: "--",
      status: "No source data available",
      provenance: "SOURCE" as const,
    },
    {
      month: "April 2026",
      kraScore: "--",
      grade: "--",
      status: "No source data available",
      provenance: "SOURCE" as const,
    },
  ];

  return (
    <div className="history-tab-container">
      <div className="panel-box">
        <div className="panel-head">
          <div>
            <h3>Monthly Historical Performance Register</h3>
            <span className="panel-subtext">Verified evaluation history by evaluation period</span>
          </div>
          <ProvenanceBadge provenance="SOURCE" />
        </div>

        <div className="table-responsive">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Evaluation Month</th>
                <th>Role</th>
                <th>KRA Score</th>
                <th>Grade Band</th>
                <th>Data Status</th>
                <th>Provenance</th>
              </tr>
            </thead>
            <tbody>
              {historicalMonths.map((row) => (
                <tr key={row.month}>
                  <td><strong>{row.month}</strong></td>
                  <td>{employee.role}</td>
                  <td>
                    {row.kraScore !== "--" ? (
                      <strong style={{ color: "#2563eb" }}>{row.kraScore} / 5.0</strong>
                    ) : (
                      <span className="text-muted">--</span>
                    )}
                  </td>
                  <td>{row.grade}</td>
                  <td>
                    <span className={row.kraScore !== "--" ? "status-pill completed" : "status-pill unavailable"}>
                      {row.status}
                    </span>
                  </td>
                  <td><ProvenanceBadge provenance={row.provenance} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workshop Comparison Card */}
      <div className="panel-box" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <div>
            <h3>Employee vs Workshop Benchmark Comparison</h3>
            <span className="panel-subtext">Comparison against Ghazipur Workshop mechanic group</span>
          </div>
          <ProvenanceBadge provenance="DERIVED" />
        </div>

        <div className="table-responsive">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>VISHWAJEET (Mechanic)</th>
                <th>Ghazipur Workshop Mechanic Avg</th>
                <th>Variance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>KRA Monthly Score</strong></td>
                <td><strong className="blue-text">3.54 / 5.0</strong></td>
                <td>3.40 / 5.0</td>
                <td><span className="badge-green">+0.14 (+4.1%)</span></td>
              </tr>
              <tr>
                <td><strong>Uniform & Discipline Score</strong></td>
                <td><strong className="green-text">4.25 / 5.0</strong></td>
                <td>3.80 / 5.0</td>
                <td><span className="badge-green">+0.45 (+11.8%)</span></td>
              </tr>
              <tr>
                <td><strong>Jobs Completed</strong></td>
                <td>--</td>
                <td>--</td>
                <td><span className="text-muted">Awaiting technician attribution</span></td>
              </tr>
              <tr>
                <td><strong>Labour Generated</strong></td>
                <td>--</td>
                <td>--</td>
                <td><span className="text-muted">Awaiting technician attribution</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
