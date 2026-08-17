"use client";

import { useMemo, useState } from "react";
import {
  claimRows,
  creDiptiPolicy,
  creSrishtiPolicy,
  evaluationCriteria,
  floorAdvisorPolicy,
  incentiveMultipliers,
  managementAttention,
  rankingRows,
  reportCards,
  type EmployeeTab,
  type ReportId,
  type ViewId,
  weeklyScores,
  workbookSources,
  workshopRows,
  breakdownRows,
  customerRows,
} from "./demo-data";

type BadgeTone = "source" | "derived" | "proposed" | "neutral" | "success";

type NavItem = {
  view: ViewId;
  label: string;
  section: string;
  icon: IconName;
};

type TableData = {
  title: string;
  description: string;
  source: string;
  headers: string[];
  rows: string[][];
  detailTitle: string;
  detailItems: Array<[string, string]>;
};

type IconName =
  | "dashboard"
  | "database"
  | "reports"
  | "employee"
  | "incentive"
  | "customer"
  | "alert"
  | "search"
  | "bell"
  | "chevron"
  | "file"
  | "arrow";

const navigation: NavItem[] = [
  { view: "dashboard", label: "Dashboard", section: "OVERVIEW", icon: "dashboard" },
  { view: "dataHub", label: "Data Hub", section: "DATA", icon: "database" },
  { view: "reports", label: "Data & Reports", section: "DATA", icon: "reports" },
  { view: "employee", label: "Employee Intelligence", section: "PEOPLE", icon: "employee" },
  { view: "incentive", label: "Incentive", section: "PEOPLE", icon: "incentive" },
  { view: "customer", label: "Customer Intelligence", section: "CUSTOMER", icon: "customer" },
  { view: "management", label: "Management Attention", section: "MANAGEMENT", icon: "alert" },
];

const reportTableMap: Record<ReportId, TableData> = {
  workshop: {
    title: "Workshop Report",
    description:
      "Job card source fields from Gazipur workshop reporting Jul 26.xlsx.",
    source: "SOURCE · Gazipur workshop reporting Jul 26.xlsx / Job Card",
    headers: [
      "Job Card No",
      "Opening Date",
      "Closing Date",
      "Customer",
      "Vehicle",
      "Model",
      "Service",
      "Parts",
      "Labour",
      "Invoice",
    ],
    rows: workshopRows,
    detailTitle: "Selected Job Card",
    detailItems: [
      ["Customer", "Lachchiram PG College Salikpur Gzp"],
      ["Phone", "9454277263"],
      ["Vehicle", "UP61AT2335"],
      ["Service Type", "Paid"],
      ["Invoice", "₹646"],
    ],
  },
  daily: {
    title: "Daily Workshop Report",
    description:
      "Derived daily operating summary using the available job card source structure.",
    source: "DERIVED · From Job Card source data",
    headers: ["Metric", "Value", "Status"],
    rows: [
      ["Total Job Cards", "--", "Awaiting validated workbook aggregation"],
      ["Labour Sale", "--", "Awaiting validated workbook aggregation"],
      ["Spare Sale", "--", "Awaiting validated workbook aggregation"],
      ["Total Sale", "--", "Awaiting validated workbook aggregation"],
      ["Workshop Collection", "--", "Awaiting validated workbook aggregation"],
    ],
    detailTitle: "Derivation Rule",
    detailItems: [
      ["Source", "Job Card sheet"],
      ["Date Filter", "June 2026"],
      ["Method", "Aggregate only when workbook totals are validated"],
      ["Current State", "Preview"],
    ],
  },
  breakdown: {
    title: "Breakdown Report",
    description:
      "Complaint register from Breakdown tracking.xlsx / Daily service Tracker.",
    source: "SOURCE · Breakdown tracking.xlsx / Daily service Tracker",
    headers: [
      "Complaint No",
      "Vehicle",
      "Customer",
      "Complaint",
      "Days Open",
      "Status",
      "Supervisor",
      "Response",
      "Satisfaction",
    ],
    rows: breakdownRows,
    detailTitle: "Breakdown Detail",
    detailItems: [
      ["Vehicle", "UP61CT3221"],
      ["Customer", "M/s. ASHA MAHAVIDYALAYA"],
      ["Status", "Open"],
      ["Response Date", "--"],
      ["Remarks", "Not available in imported data"],
    ],
  },
  claims: {
    title: "FML / Claims Report",
    description:
      "Claim register from AMIT UPDATED FML Claim Sheet Feb 26.xlsx / Data Report.",
    source: "SOURCE · AMIT UPDATED FML Claim Sheet Feb 26.xlsx / Data Report",
    headers: [
      "Claim No",
      "Invoice",
      "Type",
      "Status",
      "Invoice Value",
      "Passed",
      "Rejected",
      "Payment Date",
    ],
    rows: claimRows,
    detailTitle: "Claim Detail",
    detailItems: [
      ["Claim Type", "Warranty"],
      ["Current Status", "Accepted / Rejected per source"],
      ["Passed Amount", "As listed in workbook"],
      ["Remarks", "Not available in imported data"],
      ["Payment Date", "05-Jun-2025 / 29-May-2025"],
    ],
  },
  employeeKpi: {
    title: "Employee KPI Report",
    description:
      "Mechanic KRA view preserving the exact six source fields and monthly derivation.",
    source: "SOURCE + DERIVED · June 26.xlsx",
    headers: ["Employee", "Role", "Week 1", "Week 2", "Week 3", "Week 4", "Monthly Average"],
    rows: [["VISHWAJEET", "Mechanic", "3.83", "3.83", "2.67", "3.83", "3.54"]],
    detailTitle: "KPI Basis",
    detailItems: [
      ["Score Scale", "1 to 5"],
      ["Criteria", "Six source KRA rows"],
      ["Weekly Score", "SUM of six scores / 6"],
      ["Monthly Average", "AVERAGE of weekly final scores"],
      ["Performance Layer", "PROPOSED only"],
    ],
  },
  incentive: {
    title: "Incentive Report",
    description:
      "Role-specific incentive policy extracted from the source workbook structure.",
    source: "SOURCE + PROPOSED UI · June 26.xlsx",
    headers: ["Policy Area", "Rule / Target", "Payout / Multiplier"],
    rows: [
      [
        "Mechanic / Electrician",
        "10% of (Total Labour without GST - (Salary + OT))",
        "Assessment based multiplier",
      ],
      ["Floor Advisor", "₹225,000 to ₹375,000 monthly labour target", "₹3,000 to ₹16,000"],
      ["CRE Srishti", "440 to 515 monthly reporting target", "₹3,000 to ₹12,000"],
      ["CRE Dipti", "50 to 80 monthly target", "Not available in imported data"],
    ],
    detailTitle: "Policy Note",
    detailItems: [
      ["Universal Formula", "Not used"],
      ["Role Logic", "Different by employee group"],
      ["Live Incentive Amount", "Pending required data"],
      ["Assessment Multipliers", "1 to 5 available"],
    ],
  },
  customer: {
    title: "Customer Report",
    description:
      "Customer and vehicle search view using the imported job card relationship fields.",
    source: "SOURCE · Gazipur workshop reporting Jul 26.xlsx / Job Card",
    headers: [
      "Customer",
      "Phone",
      "Vehicle",
      "Model",
      "Category",
      "Service",
      "Job Card",
      "Breakdowns",
    ],
    rows: customerRows,
    detailTitle: "Customer Profile",
    detailItems: [
      ["Customer", "Lachchiram PG College Salikpur Gzp"],
      ["Phone", "9454277263"],
      ["Vehicle", "UP61AT2335"],
      ["Service History", "Job Card 91"],
      ["Claims", "No imported record available"],
    ],
  },
};

export default function Home() {
  const [activeView, setActiveView] = useState<ViewId>("dashboard");
  const [employeeTab, setEmployeeTab] = useState<EmployeeTab>("evaluation");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedReport, setSelectedReport] = useState<ReportId>("workshop");
  const monthlyAverage = useMemo(
    () => weeklyScores.reduce((sum, score) => sum + score, 0) / weeklyScores.length,
    [],
  );

  const currentNav = navigation.find((item) => item.view === activeView) ?? navigation[0];
  const breadcrumb =
    activeView === "employee"
      ? `Employee Intelligence > ${capitalize(employeeTab)}`
      : currentNav.label;

  return (
    <main className="app-shell">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="shell-content">
        <header className="top-header">
          <div>
            <p className="breadcrumb">Dealer Intelligence &gt; {breadcrumb}</p>
            <h1 className="page-title">{currentNav.label}</h1>
          </div>
          <div className="header-tools">
            <div className="header-chip">Ghazipur Workshop</div>
            <div className="header-chip">June 2026</div>
            <button className="icon-button" type="button" aria-label="Search">
              <Icon name="search" />
            </button>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Icon name="bell" />
            </button>
            <div className="user-pill">
              <div className="user-avatar">KM</div>
              <div>
                <strong>Kunal</strong>
                <span>Management demo</span>
              </div>
            </div>
          </div>
        </header>

        <section className="content-frame">
          {activeView === "dashboard" && <Dashboard monthlyAverage={monthlyAverage} onNavigate={setActiveView} />}
          {activeView === "dataHub" && <DataHub />}
          {activeView === "employee" && (
            <EmployeeIntelligence
              monthlyAverage={monthlyAverage}
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
              employeeTab={employeeTab}
              setEmployeeTab={setEmployeeTab}
            />
          )}
          {activeView === "incentive" && <IncentivePage />}
          {activeView === "reports" && (
            <ReportsPage selectedReport={selectedReport} setSelectedReport={setSelectedReport} />
          )}
          {activeView === "customer" && <CustomerPage />}
          {activeView === "management" && <ManagementPage />}
        </section>
      </div>
    </main>
  );
}

function Sidebar({
  activeView,
  onNavigate,
}: {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}) {
  const sections = Array.from(new Set(navigation.map((item) => item.section)));

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">DI</div>
        <div>
          <strong>Dealer Intelligence</strong>
          <span>Force Motors</span>
        </div>
      </div>

      <button className="workspace-card" type="button">
        <div>
          <small>Workspace</small>
          <strong>GHAZIPUR WORKSHOP</strong>
        </div>
        <Icon name="chevron" />
      </button>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <div key={section} className="nav-group">
            <p className="nav-group-label">{section}</p>
            {navigation
              .filter((item) => item.section === section)
              .map((item) => (
                <button
                  key={item.view}
                  className={`nav-link ${activeView === item.view ? "active" : ""}`}
                  type="button"
                  onClick={() => onNavigate(item.view)}
                >
                  <span className="nav-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-profile">
        <div className="user-avatar small">FM</div>
        <div>
          <strong>Force Demo Owner</strong>
          <span>Static enterprise presentation</span>
        </div>
      </div>
    </aside>
  );
}

function Dashboard({
  monthlyAverage,
  onNavigate,
}: {
  monthlyAverage: number;
  onNavigate: (view: ViewId) => void;
}) {
  return (
    <>
      <Hero
        eyebrow="Dealer Intelligence"
        title="One management layer over your existing dealership data."
        description="Bring workshop reports, employee evaluation, incentives, breakdowns, claims and customer records into one searchable management system."
        asideLabel="Data sources"
        asideValue="4 Workbooks"
        asideNote="Structured data foundation"
      />

      <div className="metric-grid six">
        <MetricCard label="Job Cards" value="--" note="Awaiting validated workbook totals" />
        <MetricCard label="Labour" value="--" note="Source total not validated in UI demo" />
        <MetricCard label="Parts" value="--" note="Source total not validated in UI demo" />
        <MetricCard label="Breakdowns" value="--" note="Register exists, count not aggregated" />
        <MetricCard label="Claims" value="--" note="Register exists, count not aggregated" />
        <MetricCard label="Employee Score" value={`${monthlyAverage.toFixed(2)} / 5`} note="DERIVED monthly average" />
      </div>

      <div className="two-column">
        <Panel>
          <PanelHeader title="Data Sources" description="The product proposition starts with preserving the current reporting inputs." />
          <div className="source-summary-grid">
            <StoryStep title="4 Workbooks" copy="Current Excel processes remain visible as the source layer." />
            <StoryStep title="Structured Data" copy="Fields stay traceable to the imported workbook and sheet." />
            <StoryStep title="Historical Records" copy="Management can review past employee, workshop and claims data." />
            <StoryStep title="Reporting Layer" copy="Search, filters, dense tables and exception views sit on top." />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Management Story" description="The demo should move like a real dealership system, not a slide." />
          <div className="stack-list">
            <ActionRow
              title="Employee Intelligence"
              text="Preserve source KRA scoring and show derived monthly view."
              badge="SOURCE + DERIVED"
              onClick={() => onNavigate("employee")}
            />
            <ActionRow
              title="Data Hub"
              text="Make workbook intake, sheet mapping and traceability visible."
              badge="SOURCE"
              onClick={() => onNavigate("dataHub")}
            />
            <ActionRow
              title="Reporting Centre"
              text="Workshop, breakdown, claim and customer reporting in one shell."
              badge="SOURCE"
              onClick={() => onNavigate("reports")}
            />
          </div>
        </Panel>
      </div>
    </>
  );
}

function DataHub() {
  return (
    <>
      <SectionHeader
        eyebrow="Data Hub"
        title="Workbook intake and traceability"
        description="The interface shows the source workbooks first, then explains how they become structured reporting and management intelligence."
      />

      <div className="metric-grid four">
        <MetricCard label="Source Files" value="4" note="Repository workbooks available" />
        <MetricCard label="Mapped Fields" value="Preview" note="Field-level mapping view proposed" />
        <MetricCard label="Records Requiring Review" value="--" note="No validated count in imported data" />
        <MetricCard label="Duplicate Detection" value="Preview" note="Proposed quality layer" />
      </div>

      <Panel>
        <PanelHeader title="Source Workbooks" description="Every card represents a real imported file." />
        <div className="source-cards">
          {workbookSources.map((source) => (
            <article key={source.file} className="source-card">
              <div className="source-card-top">
                <div className="source-icon">
                  <Icon name="file" />
                </div>
                <Badge tone="source">SOURCE</Badge>
              </div>
              <h3>{source.file}</h3>
              <dl className="source-meta">
                <div>
                  <dt>Status</dt>
                  <dd>{source.status}</dd>
                </div>
                <div>
                  <dt>Sheets</dt>
                  <dd>{source.sheets}</dd>
                </div>
                <div>
                  <dt>Records</dt>
                  <dd>{source.records}</dd>
                </div>
                <div>
                  <dt>Last imported</dt>
                  <dd>{source.lastImported}</dd>
                </div>
                <div>
                  <dt>Data state</dt>
                  <dd>{source.dataState}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Core Product Story" description="This is the sequence the dealership owner should understand immediately." />
        <div className="pipeline">
          <PipelineStep label="SOURCE" title="Workbook files" copy="June 26, Workshop, Breakdown, Claim sheet" />
          <Icon name="arrow" />
          <PipelineStep label="STRUCTURED DATA" title="Mapped fields" copy="Employee, customer, vehicle, claim and job card records" />
          <Icon name="arrow" />
          <PipelineStep label="REPORTS" title="Management reporting" copy="Dense searchable tables and filtered views" />
          <Icon name="arrow" />
          <PipelineStep label="INTELLIGENCE" title="Decision layer" copy="Evaluation, incentives and management attention" />
        </div>
      </Panel>
    </>
  );
}

function EmployeeIntelligence({
  monthlyAverage,
  selectedWeek,
  setSelectedWeek,
  employeeTab,
  setEmployeeTab,
}: {
  monthlyAverage: number;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  employeeTab: EmployeeTab;
  setEmployeeTab: (tab: EmployeeTab) => void;
}) {
  const selectedWeeklyScore = weeklyScores[selectedWeek - 1];

  return (
    <>
      <SectionHeader
        eyebrow="Employee Intelligence"
        title="VISHWAJEET"
        description="Mechanic · June 2026 · source-backed employee evaluation and derived monthly view"
      />

      <div className="employee-toolbar">
        <div className="toolbar-field">
          <span>Employee</span>
          <strong>VISHWAJEET</strong>
        </div>
        <div className="toolbar-field">
          <span>Role</span>
          <strong>Mechanic</strong>
        </div>
        <div className="toolbar-field">
          <span>Month</span>
          <strong>June 2026</strong>
        </div>
        <div className="toolbar-field">
          <span>Week</span>
          <strong>Week {selectedWeek}</strong>
        </div>
      </div>

      <div className="tab-row">
        {(["evaluation", "history", "ranking", "incentive"] as EmployeeTab[]).map((tab) => (
          <button
            key={tab}
            className={`tab-chip ${employeeTab === tab ? "active" : ""}`}
            type="button"
            onClick={() => setEmployeeTab(tab)}
          >
            {capitalize(tab)}
          </button>
        ))}
      </div>

      {employeeTab === "evaluation" && (
        <div className="content-grid">
          <Panel>
            <PanelHeader
              title="Employee Evaluation"
              description="Exact source KRA terminology with 1 to 5 scoring."
            />
            <div className="week-switcher">
              {[1, 2, 3, 4].map((week) => (
                <button
                  key={week}
                  className={`week-chip ${selectedWeek === week ? "active" : ""}`}
                  type="button"
                  onClick={() => setSelectedWeek(week)}
                >
                  Week {week}
                </button>
              ))}
            </div>
            <DataTable
              headers={["KRA", "Score", "Badge"]}
              rows={evaluationCriteria.map((item) => [
                item.label,
                String(item.weeklyScores[selectedWeek - 1]),
                "SOURCE",
              ])}
              compact
            />
          </Panel>

          <Panel>
            <PanelHeader title="Score Summary" description="Weekly score is source-based; monthly average is derived." />
            <div className="score-stack">
              <ScoreCard
                label="Weekly Final Score"
                value={`${selectedWeeklyScore.toFixed(2)} / 5`}
                note="SUM of six KRA scores / 6"
                tone="source"
              />
              <ScoreCard
                label="Average for Month"
                value={`${monthlyAverage.toFixed(2)} / 5`}
                note="AVERAGE of weekly final scores"
                tone="derived"
              />
            </div>
          </Panel>
        </div>
      )}

      {employeeTab === "history" && (
        <div className="content-grid">
          <Panel>
            <PanelHeader title="Employee History" description="Weekly matrix for June 2026." />
            <DataTable
              headers={["Employee", "Week 1", "Week 2", "Week 3", "Week 4", "Monthly Average"]}
              rows={[[
                "VISHWAJEET",
                "3.83",
                "3.83",
                "2.67",
                "3.83",
                monthlyAverage.toFixed(2),
              ]]}
            />
          </Panel>

          <Panel>
            <PanelHeader title="Trend View" description="Compact visualization, not an oversized chart." />
            <div className="trend-list">
              {weeklyScores.map((score, index) => (
                <div key={index} className="trend-row">
                  <div>
                    <strong>Week {index + 1}</strong>
                    <span>{score.toFixed(2)} / 5</span>
                  </div>
                  <div className="trend-bar">
                    <div style={{ width: `${(score / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {employeeTab === "ranking" && (
        <div className="content-grid">
          <Panel>
            <PanelHeader title="Employee Ranking" description="Source score with proposed grade clearly separated." />
            <DataTable
              headers={["Rank", "Employee", "Role", "Monthly Average", "Trend", "Grade"]}
              rows={rankingRows.map((row) => [
                row.rank,
                row.employee,
                row.role,
                row.average,
                row.trend,
                row.grade,
              ])}
            />
          </Panel>

          <Panel>
            <PanelHeader title="Grade Handling" description="Ranking beyond raw source score is proposed logic." />
            <div className="annotation-list">
              <Annotation label="Source Score" value={`${monthlyAverage.toFixed(2)} / 5`} tone="source" />
              <Annotation label="Proposed Grade" value="A" tone="proposed" />
              <Annotation label="Method" value="Rank order by monthly average" tone="derived" />
            </div>
          </Panel>
        </div>
      )}

      {employeeTab === "incentive" && (
        <div className="content-grid">
          <Panel>
            <PanelHeader title="Incentive Preview" description="This tab mirrors the incentive module for employee-level review." />
            <div className="formula-panel">
              <Badge tone="source">SOURCE</Badge>
              <p>10% of (Total Labour generated without GST - (Salary + OT))</p>
            </div>
            <DataTable
              headers={["Assessment", "Multiplier"]}
              rows={incentiveMultipliers.map((item) => [item.assessment, item.multiplier])}
              compact
            />
          </Panel>

          <Panel>
            <PanelHeader title="Calculation Status" description="No incentive amount is shown without linked labour and salary data." />
            <div className="annotation-list">
              <Annotation label="Assessment" value="4" tone="source" />
              <Annotation label="Multiplier" value="1.00" tone="source" />
              <Annotation label="Labour Generated" value="--" tone="neutral" />
              <Annotation label="Eligible Incentive" value="Pending required data" tone="proposed" />
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}

function IncentivePage() {
  return (
    <>
      <SectionHeader
        eyebrow="Incentive"
        title="Policy-led incentive interface"
        description="Role-specific policy values are preserved from the source workbook; fabricated payouts are avoided."
      />

      <div className="content-grid">
        <Panel>
          <PanelHeader title="Mechanic / Electrician" description="Existing incentive basis and multiplier structure." />
          <div className="formula-panel">
            <Badge tone="source">SOURCE</Badge>
            <p>10% of (Total Labour generated without GST - (Salary + OT))</p>
          </div>
          <DataTable
            headers={["Assessment", "Multiplier"]}
            rows={incentiveMultipliers.map((item) => [item.assessment, item.multiplier])}
          />
        </Panel>

        <Panel>
          <PanelHeader title="Calculation Preview" description="Attractive presentation without inventing the final amount." />
          <div className="annotation-list">
            <Annotation label="Employee" value="VISHWAJEET" tone="source" />
            <Annotation label="Monthly Average Points" value="3.54 / 5" tone="derived" />
            <Annotation label="Assessment" value="4" tone="source" />
            <Annotation label="Multiplier" value="1.00" tone="source" />
            <Annotation label="Labour Generated" value="--" tone="neutral" />
            <Annotation label="Salary + OT" value="--" tone="neutral" />
            <Annotation label="Incentive" value="Pending required data" tone="proposed" />
          </div>
        </Panel>
      </div>

      <div className="two-column">
        <Panel>
          <PanelHeader title="Floor Advisor" description="Actual target bands from source workbook." />
          <DataTable
            headers={["Band", "Monthly Labour", "Quarterly Labour", "Quarterly Incentive"]}
            rows={floorAdvisorPolicy}
          />
        </Panel>

        <Panel>
          <PanelHeader title="CRE Srishti" description="Source target and incentive structure." />
          <DataTable
            headers={["Monthly", "Quarterly", "Quarterly Incentive"]}
            rows={creSrishtiPolicy}
          />
        </Panel>
      </div>

      <Panel>
        <PanelHeader title="CRE Dipti" description="Targets are available; incentive values are not confirmed in accessible imported data." />
        <DataTable headers={["Monthly", "Quarterly", "Quarterly Incentive"]} rows={creDiptiPolicy} />
      </Panel>
    </>
  );
}

function ReportsPage({
  selectedReport,
  setSelectedReport,
}: {
  selectedReport: ReportId;
  setSelectedReport: (report: ReportId) => void;
}) {
  const tableData = reportTableMap[selectedReport];

  return (
    <>
      <SectionHeader
        eyebrow="Data & Reports"
        title="Reporting centre"
        description="Professional reporting cards, dense tables, and source-aware detail panels."
      />

      <div className="report-card-grid">
        {reportCards.map((report) => (
          <article key={report.id} className={`report-card ${selectedReport === report.id ? "selected" : ""}`}>
            <div className="report-card-top">
              <span className="report-card-icon">
                <Icon name={report.id === "customer" ? "customer" : report.id === "claims" ? "file" : "reports"} />
              </span>
              <Badge tone="neutral">{report.category}</Badge>
            </div>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <div className="report-card-footer">
              <span>Records {report.recordCount}</span>
              <button className="secondary-button" type="button" onClick={() => setSelectedReport(report.id)}>
                Open Report
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="content-grid">
        <Panel>
          <PanelHeader title={tableData.title} description={tableData.description} />
          <div className="table-toolbar">
            <div className="table-search">
              <Icon name="search" />
              <input type="text" value="Search source records" readOnly />
            </div>
            <div className="toolbar-actions">
              <button className="secondary-button" type="button">
                June 2026
              </button>
              <button className="secondary-button" type="button">
                Filters
              </button>
              <button className="secondary-button" type="button">
                Page 1 of 1
              </button>
            </div>
          </div>
          <DataTable headers={tableData.headers} rows={tableData.rows} sticky />
          <div className="table-footer-note">
            <Badge tone={selectedReport === "daily" ? "derived" : "source"}>
              {selectedReport === "daily" ? "DERIVED" : "SOURCE"}
            </Badge>
            <span>{tableData.source}</span>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title={tableData.detailTitle} description="Detail view / drawer equivalent for the selected report context." />
          <div className="annotation-list">
            {tableData.detailItems.map(([label, value]) => (
              <Annotation key={label} label={label} value={value} tone="neutral" />
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function CustomerPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Customer Intelligence"
        title="Customer / vehicle search"
        description="Only imported relationships are shown; unsupported links remain explicitly unavailable."
      />

      <Panel>
        <div className="table-search customer-search">
          <Icon name="search" />
          <input type="text" value="Search by customer, phone, vehicle, or model" readOnly />
        </div>
      </Panel>

      <div className="content-grid">
        <Panel>
          <PanelHeader title="Customer Register" description="Imported job card customer and vehicle fields." />
          <DataTable
            headers={["Customer", "Phone", "Vehicle", "Model", "Category", "Service", "Job Card", "Breakdowns"]}
            rows={customerRows}
          />
        </Panel>

        <Panel>
          <PanelHeader title="Customer Profile" description="Tabs are rendered as structured sections for the static demo." />
          <div className="customer-profile">
            <div className="customer-avatar">LP</div>
            <div>
              <h3>Lachchiram PG College Salikpur Gzp</h3>
              <p>Customer category: School</p>
            </div>
          </div>
          <div className="annotation-list">
            <Annotation label="Phone" value="9454277263" tone="source" />
            <Annotation label="Vehicle" value="UP61AT2335" tone="source" />
            <Annotation label="Model" value="T1" tone="source" />
            <Annotation label="Service History" value="Job Card 91" tone="source" />
            <Annotation label="Invoices" value="No imported record available" tone="neutral" />
            <Annotation label="Breakdowns" value="No imported record available" tone="neutral" />
            <Annotation label="Claims" value="No imported record available" tone="neutral" />
          </div>
        </Panel>
      </div>
    </>
  );
}

function ManagementPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Management Attention"
        title="Exception-oriented management layer"
        description="These views are proposed operational overlays and are labelled accordingly."
      />

      <div className="metric-grid four">
        {managementAttention.map((item) => (
          <MetricCard key={item.title} label={item.title} value={item.value} note={item.note} />
        ))}
      </div>

      <div className="two-column">
        <Panel>
          <PanelHeader title="Data Quality" description="Proposed monitoring panel for import hygiene." />
          <div className="annotation-list">
            <Annotation label="Records Imported" value="Preview" tone="proposed" />
            <Annotation label="Fields Mapped" value="Preview" tone="proposed" />
            <Annotation label="Records Requiring Review" value="--" tone="neutral" />
            <Annotation label="Missing Required Data" value="--" tone="neutral" />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Management Attention Queue" description="Cards for items requiring review without claiming live automation." />
          <div className="attention-list">
            <AttentionCard title="Breakdown requiring review" text="Awaiting rule definition and source aggregation." />
            <AttentionCard title="Claim requiring review" text="Available as a future escalation queue." />
            <AttentionCard title="Customer follow-up requiring review" text="Relationship logic is not yet validated from source." />
          </div>
        </Panel>
      </div>
    </>
  );
}

function Hero({
  eyebrow,
  title,
  description,
  asideLabel,
  asideValue,
  asideNote,
}: {
  eyebrow: string;
  title: string;
  description: string;
  asideLabel: string;
  asideValue: string;
  asideNote: string;
}) {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="hero-aside">
        <span>{asideLabel}</span>
        <strong>{asideValue}</strong>
        <small>{asideNote}</small>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <section className="panel">{children}</section>;
}

function PanelHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="panel-header">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function DataTable({
  headers,
  rows,
  sticky = false,
  compact = false,
}: {
  headers: string[];
  rows: string[][];
  sticky?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`table-shell ${sticky ? "sticky" : ""} ${compact ? "compact" : ""}`}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>
                  {cell === "SOURCE" ? (
                    <Badge tone="source">SOURCE</Badge>
                  ) : cell === "DERIVED" ? (
                    <Badge tone="derived">DERIVED</Badge>
                  ) : cell === "PROPOSED" ? (
                    <Badge tone="proposed">PROPOSED</Badge>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: BadgeTone;
  children: React.ReactNode;
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Annotation({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: BadgeTone;
}) {
  return (
    <div className="annotation">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <Badge tone={tone}>
        {tone === "neutral" ? "INFO" : tone.toUpperCase()}
      </Badge>
    </div>
  );
}

function ScoreCard({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: BadgeTone;
}) {
  return (
    <div className="score-card">
      <div className="score-card-top">
        <span>{label}</span>
        <Badge tone={tone}>{tone.toUpperCase()}</Badge>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function ActionRow({
  title,
  text,
  badge,
  onClick,
}: {
  title: string;
  text: string;
  badge: string;
  onClick: () => void;
}) {
  return (
    <button className="action-row" type="button" onClick={onClick}>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <div className="action-row-right">
        <Badge tone="neutral">{badge}</Badge>
        <Icon name="arrow" />
      </div>
    </button>
  );
}

function StoryStep({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="story-step">
      <strong>{title}</strong>
      <p>{copy}</p>
    </div>
  );
}

function PipelineStep({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="pipeline-step">
      <span>{label}</span>
      <strong>{title}</strong>
      <p>{copy}</p>
    </div>
  );
}

function AttentionCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="attention-card">
      <div className="attention-icon">
        <Icon name="alert" />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Icon({ name }: { name: IconName }) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="7" height="8" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="11" width="7" height="10" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "database":
      return (
        <svg {...commonProps}>
          <ellipse cx="12" cy="5" rx="7" ry="3" />
          <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
          <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "reports":
      return (
        <svg {...commonProps}>
          <path d="M4 20V8" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20V11" />
        </svg>
      );
    case "employee":
      return (
        <svg {...commonProps}>
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );
    case "incentive":
      return (
        <svg {...commonProps}>
          <path d="M12 2v20" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "customer":
      return (
        <svg {...commonProps}>
          <circle cx="8" cy="8" r="3" />
          <path d="M2 19a6 6 0 0 1 12 0" />
          <circle cx="18" cy="9" r="2.5" />
          <path d="M15 19a5 5 0 0 1 7 0" />
        </svg>
      );
    case "alert":
      return (
        <svg {...commonProps}>
          <path d="m12 4 8 14H4Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "search":
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "bell":
      return (
        <svg {...commonProps}>
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...commonProps}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case "file":
      return (
        <svg {...commonProps}>
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v5h5" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

