"use client";

import { useState } from "react";

const mechanicKras = [
  ["Technical Knowledge", [3, 3, 3, 3]],
  ["Kaam Sekhne ki koshish", [4, 4, 2, 4]],
  ["Bay Cleanliness", [4, 4, 3, 3]],
  ["Uniform", [5, 5, 2, 5]],
  ["Punctuality - Time par aana", [4, 4, 3, 4]],
  ["Repeat job nahin aana", [3, 3, 3, 4]],
] as const;

const weeklyScores = [3.833333, 3.833333, 2.666667, 3.833333];
const monthlyAverage = weeklyScores.reduce((a, b) => a + b, 0) / weeklyScores.length;

const workshopRows = [
  ["91", "Lachchiram PG College Salikpur Gzp", "UP61AT2335", "T1", "Paid", "₹410", "₹200", "₹646"],
  ["92", "Samta Pb School", "UP61AT0416", "T1", "Paid", "₹160", "₹1,750", "₹2,225"],
];

const breakdownRows = [
  ["", "UP61CT3221", "M/s. ASHA MAHAVIDYALAYA", "FUEL METER IS NOT SHOWIN", "35", "Open"],
];

const claimRows = [
  ["WCI25C000102", "356", "27-Mar-2025", "₹2,765", "Warranty", "Accepted", "₹2,765"],
  ["WCI25C000103", "357", "27-Mar-2025", "₹2,588", "Warranty", "Accepted", "₹2,588"],
  ["WCI26C000001", "358", "30-Apr-2025", "₹1,465", "Warranty", "REJECTED", "₹0"],
  ["WCI26C000002", "359", "30-Apr-2025", "₹2,187", "Warranty", "Accepted", "₹2,186.85"],
];

const nav = [
  ["overview", "Overview"],
  ["employee", "Employee Intelligence"],
  ["incentive", "Incentive"],
  ["workshop", "Workshop Report"],
  ["breakdown", "Breakdown Report"],
  ["claims", "FML / Claims"],
  ["customer", "Customer / Vehicle"],
];

function Badge({ children, tone = "source" }: { children: React.ReactNode; tone?: "source" | "derived" | "proposed" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("overview");
  const [week, setWeek] = useState(1);

  const renderPage = () => {
    if (active === "employee") return <EmployeePage week={week} setWeek={setWeek} />;
    if (active === "incentive") return <IncentivePage />;
    if (active === "workshop") return <WorkshopPage />;
    if (active === "breakdown") return <BreakdownPage />;
    if (active === "claims") return <ClaimsPage />;
    if (active === "customer") return <CustomerPage />;
    return <OverviewPage setActive={setActive} />;
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DI</div>
          <div><b>Dealer Intelligence</b><span>Ghazipur Workshop</span></div>
        </div>
        <div className="source-note"><Badge>DEMO</Badge><span>Source-aligned prototype</span></div>
        <nav>
          <p className="nav-label">WORKSPACE</p>
          {nav.map(([id, label]) => (
            <button key={id} className={active === id ? "nav-item active" : "nav-item"} onClick={() => setActive(id)}>
              <span className="nav-dot" />{label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span>Data source</span>
          <b>Supplied Excel workbooks</b>
          <small>Source / Derived / Proposed are intentionally separated.</small>
        </div>
      </aside>
      <section className="content">
        <header className="topbar">
          <div><span className="crumb">DEALER INTELLIGENCE</span><h1>{nav.find(([id]) => id === active)?.[1] ?? "Overview"}</h1></div>
          <div className="top-actions"><button>June 2026 ▾</button><button className="outline">Export Preview</button></div>
        </header>
        {renderPage()}
      </section>
    </main>
  );
}

function OverviewPage({ setActive }: { setActive: (s: string) => void }) {
  return <div className="page">
    <div className="intro"><div><Badge>DEMO OVERVIEW</Badge><h2>From scattered reports to one management view.</h2><p>The prototype preserves the dealership&apos;s existing Excel terminology and separates source data from proposed intelligence.</p></div></div>
    <div className="stats-grid">
      <Stat label="Employee KRA" value="6 criteria" note="Mechanic • source" />
      <Stat label="KRA Scale" value="1–5" note="Very Bad → Excellent" />
      <Stat label="Workshop Data" value="Job Cards" note="Source report" />
      <Stat label="Claims" value="10 fields" note="Source report" />
    </div>
    <div className="two-col">
      <section className="panel"><div className="panel-head"><div><h3>Employee Intelligence</h3><p>Existing KRA → weekly score → monthly average</p></div><Badge>SOURCE + DERIVED</Badge></div>
        <div className="employee-card"><div className="avatar">V</div><div><b>VISHWAJEET</b><span>Mechanic • June 2026</span></div><strong>{monthlyAverage.toFixed(2)} <small>/ 5</small></strong></div>
        <button className="primary wide" onClick={() => setActive("employee")}>Open Employee Evaluation</button>
      </section>
      <section className="panel"><div className="panel-head"><div><h3>Data & Reports</h3><p>One visual layer over existing dealership reports</p></div><Badge>PROPOSED</Badge></div>
        <div className="report-list"><button onClick={() => setActive("workshop")}>Workshop / Job Card <span>→</span></button><button onClick={() => setActive("breakdown")}>Breakdown Tracking <span>→</span></button><button onClick={() => setActive("claims")}>FML / Claims <span>→</span></button></div>
      </section>
    </div>
  </div>;
}

function EmployeePage({ week, setWeek }: { week: number; setWeek: (n: number) => void }) {
  return <div className="page">
    <div className="page-intro"><div><Badge>EMPLOYEE EVALUATION</Badge><h2>VISHWAJEET</h2><p>Mechanic • June 2026 • KRA Assessment Mechanic</p></div><div className="score-hero"><span>Average for month</span><strong>{monthlyAverage.toFixed(2)}</strong><small>/ 5 · <Badge tone="derived">DERIVED</Badge></small></div></div>
    <div className="filter-row"><label>Week<select value={week} onChange={e => setWeek(Number(e.target.value))}>{[1,2,3,4].map(w => <option key={w} value={w}>Week {w}</option>)}</select></label><label>Department<select><option>Mechanic</option><option>Service Advisor</option><option>CRE</option></select></label><span className="source-legend"><Badge>SOURCE</Badge> Exact KRA fields from workbook</span></div>
    <section className="panel">
      <div className="panel-head"><div><h3>Weekly KRA Assessment</h3><p>Existing six-criterion mechanic assessment • equal-weight average</p></div><Badge>1–5 SCALE</Badge></div>
      <div className="kpi-table"><div className="table-head"><span>KRA / Criteria</span><span>Score</span><span>Meaning</span></div>
      {mechanicKras.map(([name, scores]) => <div className="table-row" key={name}><span>{name}</span><strong>{scores[week - 1]}</strong><span className="rating">{["Very Bad","Poor","Pass","Good","Excellent"][scores[week - 1]-1]}</span></div>)}
      <div className="table-row total"><span>Final Score</span><strong>{weeklyScores[week-1].toFixed(6)}</strong><span><Badge tone="derived">SUM ÷ 6</Badge></span></div></div>
    </section>
    <section className="panel">
      <div className="panel-head"><div><h3>Monthly History</h3><p>Weekly final scores from the source assessment</p></div><Badge tone="derived">DERIVED</Badge></div>
      <div className="week-grid">{weeklyScores.map((score, i) => <button key={i} className={week === i+1 ? "week-card selected" : "week-card"} onClick={() => setWeek(i+1)}><span>Week {i+1}</span><strong>{score.toFixed(2)}</strong><small>{mechanicKras.map(k => k[1][i]).reduce((a,b)=>a+b,0)} / 30 points</small></button>)}</div>
    </section>
    <section className="proposed-card"><div><Badge tone="proposed">PROPOSED</Badge><h3>Objective performance layer</h3><p>Future system can combine the existing KRA with measurable workshop KPIs once technician attribution is available. No fabricated values are shown in this demo.</p></div><div className="proposed-metrics"><span>Productivity <b>—</b></span><span>Average TAT <b>—</b></span><span>Repeat / Rework <b>—</b></span><span>Labour Generated <b>—</b></span></div></section>
  </div>;
}

function IncentivePage() {
  return <div className="page">
    <div className="page-intro"><div><Badge>INCENTIVE</Badge><h2>Existing incentive policy, presented digitally.</h2><p>Rules below are reproduced from the supplied incentive workbook.</p></div></div>
    <section className="panel"><div className="panel-head"><div><h3>Mechanic / Electrician</h3><p>Existing incentive basis</p></div><Badge>SOURCE</Badge></div><div className="formula">10% of <b>(Total Labour generated without GST − (Salary + OT))</b></div><div className="multiplier-grid">{[[1,"0.50"],[2,"0.65"],[3,"0.80"],[4,"1.00"],[5,"1.20"]].map(([score,mult]) => <div key={score}><span>Assessment {score}</span><strong>{mult}</strong><small>Multiplier</small></div>)}</div></section>
    <div className="two-col"><section className="panel"><div className="panel-head"><div><h3>Floor Advisors</h3><p>Monthly labour target</p></div><Badge>SOURCE</Badge></div><table><thead><tr><th>Target</th><th>Monthly Labour</th><th>Quarterly Labour</th><th>Quarterly Incentive</th></tr></thead><tbody>{[["T1","₹225,000","₹675,000","₹3,000"],["T2","₹275,000","₹825,000","₹6,000"],["T3","₹325,000","₹975,000","₹9,000"],["T4","₹375,000","₹1,125,000","₹16,000"]].map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{x}</td>)}</tr>)}</tbody></table></section>
    <section className="panel"><div className="panel-head"><div><h3>CRE — Srishti</h3><p>Vehicle reporting target</p></div><Badge>SOURCE</Badge></div><table><thead><tr><th>Monthly</th><th>Quarterly</th><th>Quarterly Incentive</th></tr></thead><tbody>{[["440","1320","₹3,000"],["465","1395","₹6,000"],["490","1470","₹9,000"],["515","1545","₹12,000"]].map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{x}</td>)}</tr>)}</tbody></table></section></div>
    <section className="panel"><div className="panel-head"><div><h3>Calculation Preview</h3><p>Visual only • no payroll calculation in this demo</p></div><Badge tone="proposed">PROPOSED UI</Badge></div><div className="calc-grid"><div><span>Employee</span><strong>VISHWAJEET</strong></div><div><span>Average Points</span><strong>3.83 / 5</strong></div><div><span>Assessment</span><strong>4</strong></div><div><span>Multiplier</span><strong>1.00</strong></div><div><span>Labour Generated</span><strong>—</strong><small>employee attribution required</small></div><div><span>Incentive</span><strong>Pending data</strong></div></div></section>
  </div>;
}

function WorkshopPage() { return <ReportPage title="Workshop / Job Card Report" subtitle="Gazipur workshop reporting Jul 26.xlsx • Job Card" badge="SOURCE"><table><thead><tr>{["Job Card No","Customer Name","Vehicle No.","Model","Service","Part Value","Labour","Total Invoice"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{workshopRows.map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{x}</td>)}</tr>)}</tbody></table><div className="field-note"><Badge>FIELDS</Badge> Job Card Opening Date · Job Card Closing Date · Customer Phone Number · Customer Category · Part Code Issued · Part Description · Part Qty · Part MRP · Total Labour · Invoice No · Total Invoice Value</div></ReportPage>; }
function BreakdownPage() { return <ReportPage title="Breakdown Report" subtitle="Breakdown tracking.xlsx • Daily service Tracker" badge="SOURCE"><table><thead><tr>{["Complain No","Vehicle Reg.","Customer Name","Customer Complaint","Days Open","Closer/OPEN"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{breakdownRows.map((r,i)=><tr key={i}>{r.map((x,j)=><td key={j}>{x}</td>)}</tr>)}</tbody></table><div className="field-note"><Badge>FIELDS</Badge> ChassisNo · CustomerContactnumber · Customer location · Complain date · Response Date · Supervisor Name/Manager · VEHICLE ATTEND SUPERVISOR · Customer satisfaction form signed Y/N · Remarks · SPO Order No · Order Date · parts receive date</div></ReportPage>; }
function ClaimsPage() { return <ReportPage title="FML / Claim Report" subtitle="AMIT UPDATED FML Claim Sheet Feb 26.xlsx • Data Report" badge="SOURCE"><table><thead><tr>{["Claim Invoice","Internal No","Invoice Date","Invoice Value","Type","Status","Passed Amount"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{claimRows.map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{x}</td>)}</tr>)}</tbody></table><div className="field-note"><Badge>FIELDS</Badge> Rejected Amount · Payment Date · Remarks · Claim Month · Claim Year</div></ReportPage>; }
function CustomerPage() { return <div className="page"><div className="page-intro"><div><Badge>CUSTOMER / VEHICLE</Badge><h2>Lachchiram PG College Salikpur Gzp</h2><p>Source record example from Job Card data</p></div></div><div className="customer-grid"><div className="customer-main"><section className="panel"><div className="customer-title"><div className="avatar">L</div><div><h3>Lachchiram PG College Salikpur Gzp</h3><span>Customer category: School</span></div></div><div className="detail-grid"><div><span>Customer Phone Number</span><strong>9454277263</strong></div><div><span>Vehicle Number</span><strong>UP61AT2335</strong></div><div><span>Vehicle Model</span><strong>T1</strong></div><div><span>Type Of Service</span><strong>Paid</strong></div></div></section><section className="panel"><div className="panel-head"><div><h3>Available history</h3><p>Only imported relationships are shown.</p></div><Badge>SOURCE</Badge></div><div className="empty-history"><b>Job Card history</b><span>Available in imported workshop data.</span><b>Breakdowns / Claims / Feedback</b><span>No linked imported record shown for this customer in this demo.</span></div></section></div></div></div> }
function ReportPage({ title, subtitle, badge, children }: { title: string; subtitle: string; badge: "SOURCE" | "DERIVED" | "PROPOSED"; children: React.ReactNode }) { return <div className="page"><div className="page-intro"><div><Badge>{badge}</Badge><h2>{title}</h2><p>{subtitle}</p></div></div><section className="panel table-panel"><div className="table-toolbar"><input placeholder="Search records..."/><select><option>All</option></select><button className="outline">Export Preview</button></div>{children}</section></div>; }
