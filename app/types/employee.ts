export type DataProvenance = "SOURCE" | "DERIVED" | "PROPOSED";

export type RoleType = "Mechanic" | "Service Advisor" | "CRE" | "Spare Parts";

export type EvaluationPeriodYear = "2026" | "2025";
export type EvaluationPeriodMonth = "June" | "May" | "July" | "August";
export type EvaluationPeriodWeek = "All Weeks" | "Week 1" | "Week 2" | "Week 3" | "Week 4";
export type ViewMode = "Monthly" | "Weekly" | "Daily" | "Job Card";
export type ComparisonPeriod = "Previous Period" | "Workshop Average" | "None";

export type MainTabId =
  | "overview"
  | "kra"
  | "work"
  | "quality"
  | "productivity"
  | "targets"
  | "history"
  | "incentive";

export type WorkSubTabId =
  | "assigned"
  | "in_progress"
  | "waiting"
  | "completed"
  | "history"
  | "mix"
  | "workload";

export interface EmployeeProfile {
  id: string;
  name: string;
  role: RoleType;
  department: string;
  workshop: string;
  reportingManager: string;
  currentGrade: string;
  avatarText: string;
}

export interface KraCriterionScore {
  id: string;
  label: string;
  provenance: DataProvenance;
  scores: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
  };
  monthlyAverage: number;
}

export interface EmployeeKraAssessment {
  employeeId: string;
  year: string;
  month: string;
  criteria: KraCriterionScore[];
  weeklyFinalScores: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
  };
  monthlyAverageScore: number;
}

export interface JobCardPart {
  partCode: string;
  description: string;
  qty: number;
  mrp: number;
  partValue: number;
}

export interface JobCardLabour {
  labourCharges: number;
  electricalLabour: number;
  outsideLabour: number;
  laptopCharges: number;
  deputation: number;
  otherCharges: number;
  totalLabour: number;
}

export interface WorkTimelineStage {
  stage: "Assigned" | "Diagnosis" | "Repair" | "Parts Waiting" | "QC" | "Completed";
  timestamp: string;
  provenance: DataProvenance;
}

export interface JobCardRecord {
  jobCardNo: string;
  openingDate: string;
  closingDate: string;
  customerName: string;
  customerPhone: string;
  vehicleNo: string;
  vehicleModel: string;
  customerCategory: string;
  typeOfService: string;
  parts: JobCardPart[];
  labour: JobCardLabour;
  invoiceNo: string;
  totalInvoiceValue: number;
  assignedTechnician?: string;
  status: "Completed" | "In Progress" | "Assigned" | "Waiting";
  waitingReason?: string;
  startedAt?: string;
  assignedAt?: string;
  timeline?: WorkTimelineStage[];
  provenance: DataProvenance;
}

export interface BreakdownRecord {
  complaintNo: string;
  vehicleRegNo: string;
  customerName: string;
  complaintText: string;
  daysOpen: number;
  status: "Open" | "Closed";
  supervisor: string;
  vehicleAttendSupervisor: string;
  responseDate: string;
  customerSatisfactionSigned: boolean;
  remarks: string;
  provenance: DataProvenance;
}

export interface EmployeeIncentivePolicy {
  role: RoleType;
  formulaDescription: string;
  assessmentMultipliers: Array<{ assessment: number; multiplier: number }>;
  baseLabourGenerated?: number;
  salaryPlusOt?: number;
  calculatedPayout?: number;
  provenance: DataProvenance;
}

export interface ManagerActionData {
  strengths: string[];
  attentionRequired: string[];
  improvementPlan: string;
  managerRemark: string;
  reviewDate: string;
  status: "Pending Review" | "Acknowledged" | "Action Required";
  provenance: DataProvenance;
}
