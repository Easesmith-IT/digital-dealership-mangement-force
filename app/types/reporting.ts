import type { DataProvenance } from "./employee";

export type ReportingPreset =
  | "sourcePeriod"
  | "today"
  | "yesterday"
  | "thisWeek"
  | "thisMonth"
  | "lastMonth"
  | "custom";

export type ReportingViewMode = "Monthly" | "Weekly" | "Operational";
export type ReportingCompareMode = "None" | "Previous Period" | "Workshop Average";
export type ExceptionSeverity = "critical" | "high" | "medium";
export type DrilldownEntity = "jobCard" | "breakdown" | "claim" | "customer" | "action";

export interface ReportMetric {
  id: string;
  label: string;
  value: number | string;
  note: string;
  provenance: DataProvenance;
}

export interface ReportingJobCard {
  jobCardNo: string;
  openDate: string;
  closeDate: string;
  customerName: string;
  customerPhone: string;
  vehicleNumber: string;
  vehicleModel: string;
  customerCategory: string;
  serviceType: string;
  labourTotal: number;
  invoiceValue: number;
  partValue: number;
  parts: Array<{
    code: string;
    description: string;
    qty: number;
    value: number;
  }>;
  provenance: DataProvenance;
}

export interface ReportingBreakdown {
  complaintNo: string;
  complaintDate: string;
  vehicleNumber: string;
  vehicleModel: string;
  customerName: string;
  location: string;
  complaintText: string;
  daysOpen: number;
  status: "Open" | "Close";
  responseDate: string;
  manager: string;
  attendSupervisor: string;
  satisfactionSigned: "Y" | "N";
  spoOrderNo: string;
  orderDate: string;
  partsReceiveDate: string;
  remarks: string;
  provenance: DataProvenance;
}

export interface ReportingClaim {
  claimInvoiceNumber: string;
  internalClaimNo: string;
  invoiceDate: string;
  invoiceValue: number;
  claimType: string;
  claimStatus: string;
  passedAmount: number;
  rejectedAmount: number;
  paymentDate: string;
  claimMonth: string;
  claimYear: string;
  remarks: string;
  provenance: DataProvenance;
}

export interface OperationalJob {
  id: string;
  jobCardNo: string;
  vehicleNumber: string;
  customerName: string;
  serviceType: string;
  stage: "Received" | "Diagnosis" | "Repair" | "QC" | "Washing" | "Ready";
  status: "Active" | "Waiting" | "Overdue" | "QC Pending" | "Ready for Delivery";
  ageDays: number;
  waitingReason?: string;
  assignedOwner: string;
  provenance: DataProvenance;
}

export interface OperationalException {
  id: string;
  label: string;
  count: number;
  severity: ExceptionSeverity;
  provenance: DataProvenance;
  note: string;
}

export interface ReportingActionItem {
  id: string;
  issue: string;
  category: string;
  priority: "Critical" | "High" | "Medium";
  owner: string;
  dueDate: string;
  status: string;
  source: string;
  action: string;
  provenance: DataProvenance;
}
