import React, { useState } from "react";
import { JobCardRecord, WorkSubTabId } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";
import { WorkloadBarChart, WorkMixChart } from "../charts/WorkloadBarChart";

interface EmployeeWorkManagementTabProps {
  completedJobs: JobCardRecord[];
  activeProposedWork: JobCardRecord[];
  onSelectJobCard: (jc: JobCardRecord) => void;
}

export const EmployeeWorkManagementTab: React.FC<EmployeeWorkManagementTabProps> = ({
  completedJobs,
  activeProposedWork,
  onSelectJobCard,
}) => {
  const [subTab, setSubTab] = useState<WorkSubTabId>("assigned");
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");

  const assignedWork = activeProposedWork.filter((j) => j.status === "Assigned");
  const inProgressWork = activeProposedWork.filter((j) => j.status === "In Progress");
  const waitingWork = activeProposedWork.filter((j) => j.status === "Waiting");

  // All jobs combined for search & filter in Work History
  const allJobs = [...activeProposedWork, ...completedJobs];

  const filteredHistory = allJobs.filter((job) => {
    const matchesSearch =
      job.jobCardNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = serviceFilter === "All" || job.typeOfService === serviceFilter;
    return matchesSearch && matchesService;
  });

  // Work mix distribution
  const serviceCounts: Record<string, number> = {};
  completedJobs.forEach((j) => {
    serviceCounts[j.typeOfService] = (serviceCounts[j.typeOfService] || 0) + 1;
  });

  const totalCompleted = completedJobs.length || 1;
  const mixItems = Object.entries(serviceCounts).map(([typeOfService, count]) => ({
    typeOfService,
    count,
    percentage: Math.round((count / totalCompleted) * 100),
  }));

  const workloadItems = [
    { week: "Week 1", assigned: 4, completed: 4 },
    { week: "Week 2", assigned: 5, completed: 5 },
    { week: "Week 3", assigned: 3, completed: 2 },
    { week: "Week 4", assigned: 4, completed: 4 },
  ];

  return (
    <div className="work-management-container">
      {/* Sub-navigation Chips */}
      <div className="work-subnav-bar">
        <button
          className={`subnav-chip ${subTab === "assigned" ? "active" : ""}`}
          onClick={() => setSubTab("assigned")}
        >
          Currently Assigned ({assignedWork.length})
        </button>
        <button
          className={`subnav-chip ${subTab === "in_progress" ? "active" : ""}`}
          onClick={() => setSubTab("in_progress")}
        >
          In Progress ({inProgressWork.length})
        </button>
        <button
          className={`subnav-chip ${subTab === "waiting" ? "active" : ""}`}
          onClick={() => setSubTab("waiting")}
        >
          Waiting Work ({waitingWork.length})
        </button>
        <button
          className={`subnav-chip ${subTab === "completed" ? "active" : ""}`}
          onClick={() => setSubTab("completed")}
        >
          Completed Work ({completedJobs.length})
        </button>
        <button
          className={`subnav-chip ${subTab === "history" ? "active" : ""}`}
          onClick={() => setSubTab("history")}
        >
          Work History ({allJobs.length})
        </button>
        <button
          className={`subnav-chip ${subTab === "mix" ? "active" : ""}`}
          onClick={() => setSubTab("mix")}
        >
          Work Mix
        </button>
        <button
          className={`subnav-chip ${subTab === "workload" ? "active" : ""}`}
          onClick={() => setSubTab("workload")}
        >
          Workload Analytics
        </button>
      </div>

      {/* 1. CURRENTLY ASSIGNED */}
      {subTab === "assigned" && (
        <div className="panel-box" style={{ marginTop: "16px" }}>
          <div className="panel-head">
            <div>
              <h3>Currently Assigned Work</h3>
              <span className="panel-subtext">Jobs dispatched & awaiting technician work start</span>
            </div>
            <ProvenanceBadge provenance="PROPOSED" />
          </div>

          <div className="table-responsive">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Job Card</th>
                  <th>Vehicle</th>
                  <th>Model</th>
                  <th>Customer</th>
                  <th>Service Type</th>
                  <th>Assigned At</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assignedWork.map((job) => (
                  <tr key={job.jobCardNo} onClick={() => onSelectJobCard(job)} style={{ cursor: "pointer" }}>
                    <td><strong>#{job.jobCardNo}</strong></td>
                    <td>{job.vehicleNo}</td>
                    <td>{job.vehicleModel}</td>
                    <td>{job.customerName}</td>
                    <td><span className="badge-blue">{job.typeOfService}</span></td>
                    <td>{job.assignedAt || "--"}</td>
                    <td><span className="status-pill assigned">{job.status}</span></td>
                    <td><button className="btn-table-view">View Job</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="data-integrity-note" style={{ marginTop: "16px" }}>
            <strong>📌 Data Integrity Note:</strong> The Excel source does not contain real-time operational technician dispatch logs. Active assignment tracking is presented as a <strong>PROPOSED</strong> platform capability.
          </div>
        </div>
      )}

      {/* 2. IN PROGRESS */}
      {subTab === "in_progress" && (
        <div className="panel-box" style={{ marginTop: "16px" }}>
          <div className="panel-head">
            <div>
              <h3>Work In Progress</h3>
              <span className="panel-subtext">Active repair & diagnostic jobs currently on bay</span>
            </div>
            <ProvenanceBadge provenance="PROPOSED" />
          </div>

          <div className="table-responsive">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Job Card</th>
                  <th>Vehicle</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Started At</th>
                  <th>Current Stage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inProgressWork.map((job) => (
                  <tr key={job.jobCardNo} onClick={() => onSelectJobCard(job)} style={{ cursor: "pointer" }}>
                    <td><strong>#{job.jobCardNo}</strong></td>
                    <td>{job.vehicleNo}</td>
                    <td>{job.customerName}</td>
                    <td><span className="badge-blue">{job.typeOfService}</span></td>
                    <td>{job.startedAt || "--"}</td>
                    <td><span className="status-pill in_progress">Repair Stage</span></td>
                    <td><button className="btn-table-view">View Job</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. WAITING */}
      {subTab === "waiting" && (
        <div className="panel-box" style={{ marginTop: "16px" }}>
          <div className="panel-head">
            <div>
              <h3>Waiting Work</h3>
              <span className="panel-subtext">Jobs paused due to parts, approval, or resource bottleneck</span>
            </div>
            <ProvenanceBadge provenance="PROPOSED" />
          </div>

          <div className="table-responsive">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Job Card</th>
                  <th>Vehicle</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Waiting Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {waitingWork.map((job) => (
                  <tr key={job.jobCardNo} onClick={() => onSelectJobCard(job)} style={{ cursor: "pointer" }}>
                    <td><strong>#{job.jobCardNo}</strong></td>
                    <td>{job.vehicleNo}</td>
                    <td>{job.customerName}</td>
                    <td>{job.typeOfService}</td>
                    <td className="warning-text"><strong>{job.waitingReason}</strong></td>
                    <td><span className="status-pill waiting">{job.status}</span></td>
                    <td><button className="btn-table-view">View Job</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. COMPLETED WORK */}
      {subTab === "completed" && (
        <div className="panel-box" style={{ marginTop: "16px" }}>
          <div className="panel-head">
            <div>
              <h3>Completed Historical Job Cards</h3>
              <span className="panel-subtext">Verified Job Cards from Gazipur workshop source workbook</span>
            </div>
            <ProvenanceBadge provenance="SOURCE" />
          </div>

          <div className="table-responsive">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Job Card</th>
                  <th>Open Date</th>
                  <th>Close Date</th>
                  <th>Customer Name</th>
                  <th>Vehicle No</th>
                  <th>Model</th>
                  <th>Service Type</th>
                  <th>Labour</th>
                  <th>Invoice</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {completedJobs.map((job) => (
                  <tr key={job.jobCardNo} onClick={() => onSelectJobCard(job)} style={{ cursor: "pointer" }}>
                    <td><strong>#{job.jobCardNo}</strong></td>
                    <td>{job.openingDate}</td>
                    <td>{job.closingDate}</td>
                    <td>{job.customerName}</td>
                    <td>{job.vehicleNo}</td>
                    <td>{job.vehicleModel}</td>
                    <td><span className="badge-blue">{job.typeOfService}</span></td>
                    <td>₹{job.labour.totalLabour.toLocaleString()}</td>
                    <td><strong>₹{job.totalInvoiceValue.toLocaleString()}</strong></td>
                    <td><button className="btn-table-view">View Detail</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. WORK HISTORY (Search & Filter) */}
      {subTab === "history" && (
        <div className="panel-box" style={{ marginTop: "16px" }}>
          <div className="panel-head" style={{ flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <h3>Searchable Employee Work History</h3>
              <ProvenanceBadge provenance="SOURCE" />
            </div>

            <div className="filter-toolbar" style={{ display: "flex", gap: "12px", width: "100%" }}>
              <input
                type="text"
                placeholder="Search Job Card, Customer, Vehicle..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
              <select
                className="filter-select"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              >
                <option value="All">All Service Types</option>
                <option value="Paid">Paid Service</option>
                <option value="Service Coupon">Service Coupon</option>
                <option value="Warranty">Warranty</option>
                <option value="Free">Free Service</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Job Card</th>
                  <th>Opening Date</th>
                  <th>Customer Name</th>
                  <th>Vehicle No</th>
                  <th>Model</th>
                  <th>Service Type</th>
                  <th>Status</th>
                  <th>Labour</th>
                  <th>Invoice Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((job) => (
                  <tr key={job.jobCardNo} onClick={() => onSelectJobCard(job)} style={{ cursor: "pointer" }}>
                    <td><strong>#{job.jobCardNo}</strong></td>
                    <td>{job.openingDate}</td>
                    <td>{job.customerName}</td>
                    <td>{job.vehicleNo}</td>
                    <td>{job.vehicleModel}</td>
                    <td><span className="badge-blue">{job.typeOfService}</span></td>
                    <td>
                      <span className={`status-pill ${job.status.toLowerCase().replace(/\s+/g, "_")}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>₹{job.labour.totalLabour.toLocaleString()}</td>
                    <td><strong>₹{job.totalInvoiceValue.toLocaleString()}</strong></td>
                    <td><button className="btn-table-view">Open Job Card</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. WORK MIX */}
      {subTab === "mix" && (
        <div style={{ marginTop: "16px" }}>
          <WorkMixChart items={mixItems} />
        </div>
      )}

      {/* 7. WORKLOAD ANALYTICS */}
      {subTab === "workload" && (
        <div style={{ marginTop: "16px" }}>
          <WorkloadBarChart items={workloadItems} />
        </div>
      )}
    </div>
  );
};
