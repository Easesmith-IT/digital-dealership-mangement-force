import React from "react";
import { JobCardRecord } from "../../types/employee";
import { ProvenanceBadge } from "../common/Badge";

interface JobDetailModalProps {
  jobCard: JobCardRecord | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ jobCard, onClose }) => {
  if (!jobCard) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content job-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 className="modal-title">Job Card #{jobCard.jobCardNo}</h3>
              <ProvenanceBadge provenance={jobCard.provenance} />
            </div>
            <span className="modal-subtitle">
              Opening: {jobCard.openingDate} &bull; Closing: {jobCard.closingDate}
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Customer & Vehicle Info Grid */}
          <div className="detail-section-grid">
            <div className="detail-card">
              <span className="card-label">CUSTOMER DETAILS</span>
              <div className="info-row">
                <span className="lbl">Customer Name:</span>
                <strong className="val">{jobCard.customerName}</strong>
              </div>
              <div className="info-row">
                <span className="lbl">Contact Phone:</span>
                <span className="val">{jobCard.customerPhone || "--"}</span>
              </div>
              <div className="info-row">
                <span className="lbl">Category:</span>
                <span className="val">{jobCard.customerCategory}</span>
              </div>
            </div>

            <div className="detail-card">
              <span className="card-label">VEHICLE & SERVICE</span>
              <div className="info-row">
                <span className="lbl">Vehicle Number:</span>
                <strong className="val">{jobCard.vehicleNo}</strong>
              </div>
              <div className="info-row">
                <span className="lbl">Vehicle Model:</span>
                <span className="val">{jobCard.vehicleModel}</span>
              </div>
              <div className="info-row">
                <span className="lbl">Type Of Service:</span>
                <span className="val highlight">{jobCard.typeOfService}</span>
              </div>
            </div>

            <div className="detail-card">
              <span className="card-label">ATTRIBUTION & STATUS</span>
              <div className="info-row">
                <span className="lbl">Assigned Technician:</span>
                <span className="val">{jobCard.assignedTechnician || "Awaiting technician attribution"}</span>
              </div>
              <div className="info-row">
                <span className="lbl">Current Status:</span>
                <span className={`status-pill ${jobCard.status.toLowerCase().replace(/\s+/g, "_")}`}>
                  {jobCard.status}
                </span>
              </div>
              {jobCard.waitingReason && (
                <div className="info-row warning">
                  <span className="lbl">Waiting Reason:</span>
                  <span className="val">{jobCard.waitingReason}</span>
                </div>
              )}
            </div>
          </div>

          {/* Parts Section */}
          <div className="detail-table-section">
            <h4 className="section-heading">SPARE PARTS ISSUED</h4>
            {jobCard.parts && jobCard.parts.length > 0 ? (
              <table className="enterprise-table compact">
                <thead>
                  <tr>
                    <th>Part Code</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>MRP</th>
                    <th>Part Value</th>
                  </tr>
                </thead>
                <tbody>
                  {jobCard.parts.map((p, idx) => (
                    <tr key={idx}>
                      <td><code>{p.partCode}</code></td>
                      <td>{p.description}</td>
                      <td>{p.qty}</td>
                      <td>₹{p.mrp.toLocaleString()}</td>
                      <td><strong>₹{p.partValue.toLocaleString()}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data-note">No spare parts issued on this Job Card.</p>
            )}
          </div>

          {/* Labour & Invoice Grid */}
          <div className="detail-section-grid" style={{ marginTop: "16px" }}>
            <div className="detail-card">
              <span className="card-label">LABOUR BREAKDOWN</span>
              <div className="info-row">
                <span className="lbl">Labour Charges:</span>
                <span className="val">₹{jobCard.labour.labourCharges.toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span className="lbl">Electrical Labour:</span>
                <span className="val">₹{jobCard.labour.electricalLabour.toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span className="lbl">Outside Labour:</span>
                <span className="val">₹{jobCard.labour.outsideLabour.toLocaleString()}</span>
              </div>
              <div className="info-row total">
                <span className="lbl">Total Labour:</span>
                <strong className="val">₹{jobCard.labour.totalLabour.toLocaleString()}</strong>
              </div>
            </div>

            <div className="detail-card">
              <span className="card-label">INVOICE SUMMARY</span>
              <div className="info-row">
                <span className="lbl">Invoice Number:</span>
                <span className="val">{jobCard.invoiceNo}</span>
              </div>
              <div className="info-row total">
                <span className="lbl">Total Invoice Value:</span>
                <strong className="val large">
                  {jobCard.totalInvoiceValue > 0 ? `₹${jobCard.totalInvoiceValue.toLocaleString()}` : "₹0"}
                </strong>
              </div>
            </div>
          </div>

          {/* Work Timeline */}
          <div className="timeline-section" style={{ marginTop: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 className="section-heading" style={{ margin: 0 }}>WORK TIMELINE</h4>
              <ProvenanceBadge provenance={jobCard.provenance === "SOURCE" ? "SOURCE" : "PROPOSED"} size="sm" />
            </div>

            {jobCard.timeline && jobCard.timeline.length > 0 ? (
              <div className="timeline-steps">
                {jobCard.timeline.map((step, idx) => (
                  <div key={idx} className="timeline-step">
                    <div className="step-dot" />
                    <div className="step-content">
                      <span className="step-title">{step.stage}</span>
                      <span className="step-time">{step.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data-note" style={{ marginTop: "8px" }}>
                Operational timestamp logging will populate once technician-job assignment & live stage tracking is active.
              </p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
