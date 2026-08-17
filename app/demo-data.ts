export type ViewId =
  | "dashboard"
  | "dataHub"
  | "employee"
  | "incentive"
  | "reports"
  | "customer"
  | "management";

export type EmployeeTab = "evaluation" | "history" | "ranking" | "incentive";

export type ReportId =
  | "workshop"
  | "daily"
  | "breakdown"
  | "claims"
  | "employeeKpi"
  | "incentive"
  | "customer";

export const workbookSources = [
  {
    file: "Gazipur workshop reporting Jul 26.xlsx",
    status: "Imported",
    sheets: "Job Card, Daily Report, Spare Part, Inventory Check",
    records: "--",
    lastImported: "Not available in imported data",
    dataState: "Source workbook available in repository",
  },
  {
    file: "Breakdown tracking.xlsx",
    status: "Imported",
    sheets: "Daily service Tracker",
    records: "--",
    lastImported: "Not available in imported data",
    dataState: "Source workbook available in repository",
  },
  {
    file: "June 26.xlsx",
    status: "Imported",
    sheets: "Mechanic KRA, Incentive, Service Advisor, CRE",
    records: "--",
    lastImported: "Not available in imported data",
    dataState: "Employee evaluation and policy source",
  },
  {
    file: "AMIT UPDATED FML Claim Sheet Feb 26.xlsx",
    status: "Imported",
    sheets: "Data Report",
    records: "--",
    lastImported: "Not available in imported data",
    dataState: "Claim register source workbook",
  },
] as const;

export const evaluationCriteria = [
  { label: "Technical Knowledge", weeklyScores: [3, 3, 3, 3] },
  { label: "Kaam Sekhne ki koshish", weeklyScores: [4, 4, 2, 4] },
  { label: "Bay Cleanliness", weeklyScores: [4, 4, 3, 3] },
  { label: "Uniform", weeklyScores: [5, 5, 2, 5] },
  { label: "Punctuality - Time par aana", weeklyScores: [4, 4, 3, 4] },
  { label: "Repeat job nahin aana", weeklyScores: [3, 3, 3, 4] },
] as const;

export const weeklyScores = [3.833333, 3.833333, 2.666667, 3.833333] as const;

export const incentiveMultipliers = [
  { assessment: "1", multiplier: "0.50" },
  { assessment: "2", multiplier: "0.65" },
  { assessment: "3", multiplier: "0.80" },
  { assessment: "4", multiplier: "1.00" },
  { assessment: "5", multiplier: "1.20" },
] as const;

export const floorAdvisorPolicy = [
  ["T1", "₹225,000", "₹675,000", "₹3,000"],
  ["T2", "₹275,000", "₹825,000", "₹6,000"],
  ["T3", "₹325,000", "₹975,000", "₹9,000"],
  ["T4", "₹375,000", "₹1,125,000", "₹16,000"],
];

export const creSrishtiPolicy = [
  ["440", "1320", "₹3,000"],
  ["465", "1395", "₹6,000"],
  ["490", "1470", "₹9,000"],
  ["515", "1545", "₹12,000"],
];

export const creDiptiPolicy = [
  ["50", "150", "Not available in imported data"],
  ["60", "180", "Not available in imported data"],
  ["70", "210", "Not available in imported data"],
  ["80", "240", "Not available in imported data"],
];

export const reportCards = [
  {
    id: "workshop",
    title: "Workshop Report",
    category: "WORKSHOP",
    description:
      "Job card, customer, vehicle, parts, labour and invoice fields from the workshop workbook.",
    recordCount: "--",
  },
  {
    id: "daily",
    title: "Daily Workshop Report",
    category: "WORKSHOP",
    description:
      "Derived operating summary from job card source data where totals can be validated.",
    recordCount: "--",
  },
  {
    id: "breakdown",
    title: "Breakdown Report",
    category: "BREAKDOWN",
    description:
      "Complaint register with status, supervisor, response and satisfaction tracking.",
    recordCount: "--",
  },
  {
    id: "claims",
    title: "FML / Claims Report",
    category: "FML / CLAIMS",
    description:
      "Claim status, invoice value, passed amount, rejected amount and payment date.",
    recordCount: "--",
  },
  {
    id: "employeeKpi",
    title: "Employee KPI Report",
    category: "EMPLOYEE",
    description:
      "KRA-driven employee evaluation structure with source and derived views.",
    recordCount: "--",
  },
  {
    id: "incentive",
    title: "Incentive Report",
    category: "EMPLOYEE",
    description:
      "Role-specific incentive policy review with source-aligned formula presentation.",
    recordCount: "--",
  },
  {
    id: "customer",
    title: "Customer Report",
    category: "CUSTOMER",
    description:
      "Customer and vehicle search layer backed by imported job card information.",
    recordCount: "--",
  },
] as const satisfies ReadonlyArray<{
  id: ReportId;
  title: string;
  category: string;
  description: string;
  recordCount: string;
}>;

export const workshopRows = [
  [
    "91",
    "26-Jul-2026",
    "26-Jul-2026",
    "Lachchiram PG College Salikpur Gzp",
    "UP61AT2335",
    "T1",
    "Paid",
    "₹410",
    "₹200",
    "₹646",
  ],
  [
    "92",
    "26-Jul-2026",
    "26-Jul-2026",
    "Samta Pb School",
    "UP61AT0416",
    "T1",
    "Paid",
    "₹160",
    "₹1,750",
    "₹2,225",
  ],
];

export const breakdownRows = [
  [
    "--",
    "UP61CT3221",
    "M/s. ASHA MAHAVIDYALAYA",
    "FUEL METER IS NOT SHOWIN",
    "35",
    "Open",
    "--",
    "--",
    "No",
  ],
];

export const claimRows = [
  [
    "WCI25C000102",
    "356",
    "Warranty",
    "Accepted",
    "₹2,765",
    "₹2,765",
    "NOT FOUND",
    "05-Jun-2025",
  ],
  [
    "WCI25C000103",
    "357",
    "Warranty",
    "Accepted",
    "₹2,588",
    "₹2,588",
    "NOT FOUND",
    "05-Jun-2025",
  ],
  [
    "WCI26C000001",
    "358",
    "Warranty",
    "Rejected",
    "₹1,465",
    "₹0",
    "₹1,464.91",
    "29-May-2025",
  ],
  [
    "WCI26C000002",
    "359",
    "Warranty",
    "Accepted",
    "₹2,187",
    "₹2,186.85",
    "0",
    "29-May-2025",
  ],
];

export const customerRows = [
  [
    "Lachchiram PG College Salikpur Gzp",
    "9454277263",
    "UP61AT2335",
    "T1",
    "School",
    "Paid",
    "91",
    "--",
  ],
  [
    "Samta Pb School",
    "9454277363",
    "UP61AT0416",
    "T1",
    "School",
    "Paid",
    "92",
    "--",
  ],
];

export const rankingRows = [
  {
    rank: "1",
    employee: "VISHWAJEET",
    role: "Mechanic",
    average: "3.54 / 5",
    trend: "Stable",
    grade: "A",
  },
] as const;

export const managementAttention = [
  {
    title: "Breakdown requiring review",
    value: "--",
    note: "PROPOSED exception queue",
  },
  {
    title: "Employee KPI requiring review",
    value: "--",
    note: "PROPOSED manager workflow",
  },
  {
    title: "Claim requiring review",
    value: "--",
    note: "PROPOSED escalation layer",
  },
  {
    title: "Data quality exception",
    value: "Preview",
    note: "Awaiting field-level validation rules",
  },
] as const;

