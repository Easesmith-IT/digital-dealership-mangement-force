"use client";

import { useState } from "react";

type View = "dashboard" | "employee" | "incentive" | "reports" | "workshop" | "breakdown" | "claims" | "customer";

const kras = [
  ["Technical Knowledge", [3, 3, 3, 3]],
  ["Kaam Sekhne ki koshish", [4, 4, 2, 4]],
  ["Bay Cleanliness", [4, 4, 3, 3]],
  ["Uniform", [5, 5, 2, 5]],
  ["Punctuality - Time par aana", [4, 4, 3, 4]],
  ["Repeat job nahin aana", [3, 3, 3, 4]],
] as const;
const weekly = [3.833333, 3.833333, 2.666667, 3.833333];
const monthly = weekly.reduce((a, b) => a + b, 0) / weekly.length;

const workshop = [
  ["91", "Lachchiram PG College Salikpur Gzp", "UP61AT2335", "T1", "Paid", "₹410", "₹200", "₹646"],
  ["92", "Samta Pb School", "UP61AT0416", "T1", "Paid", "₹160", "₹1,750", "₹2,225"],
];
const breakdown = [["—", "UP61CT3221", "M/s. ASHA MAHAVIDYALAYA", "FUEL METER IS NOT SHOWIN", "35", "Open", "—"]];
const claims = [
  ["WCI25C000102", "356", "27-Mar-2025", "₹2,765", "Warranty", "Accepted", "₹2,765"],
  ["WCI25C000103", "357", "27-Mar-2025", "₹2,588", "Warranty", "Accepted", "₹2,588"],
  ["WCI26C000001", "358", "30-Apr-2025", "₹1,465", "Warranty", "REJECTED", "₹0"],
  ["WCI26C000002", "359", "30-Apr-2025", "₹2,187", "Warranty", "Accepted", "₹2,186.85"],
];

const nav: [View, string, string][] = [
  ["dashboard", "Dashboard", "⌂"],
  ["employee", "Employee Intelligence", "◉"],
  ["incentive", "Incentive", "₹"],
  ["reports", "Data & Reports", "▤"],
  ["workshop", "Workshop Report", "▦"],
  ["breakdown", "Breakdown Tracking", "◌"],
  ["claims", "FML / Claims", "✓"],
  ["customer", "Customer / Vehicle", "♙"],
];

function Badge({ children, tone = "source" }: { children: React.ReactNode; tone?: "source" | "derived" | "proposed" | "neutral" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}
function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="page-header"><div><div className="eyebrow">DEALER INTELLIGENCE / GHAZIPUR</div><h1>{title}</h1><p>{subtitle}</p></div><div className="header-actions"><button className="filter">June 2026 <span>⌄</span></button><button className="secondary">Export preview</button></div></div>;
}
function Score({ value }: { value: number }) { return <span className="score-pill">{value}</span>; }

export default function Home() {
  const [view, setView] = useState<View>("dashboard");
  const [week, setWeek] = useState(1);
  const [employeeTab, setEmployeeTab] = useState<"evaluation" | "history" | "performance">("evaluation");

  const go = (v: View) => setView(v);
  return <main className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brand-logo">D</div><div><strong>Dealer Intelligence</strong><small>Management platform</small></div></div>
      <div className="dealer-switch"><span className="dealer-avatar">G</span><div><b>Ghazipur Workshop</b><small>Force Motors</small></div><span className="chevron">⌄</span></div>
      <div className="nav-section">WORKSPACE</div>
      <nav>{nav.map(([id, label, icon]) => <button key={id} className={view === id ? "nav-link active" : "nav-link"} onClick={() => go(id)}><span className="nav-icon">{icon}</span><span>{label}</span>{id === "reports" && <i>6</i>}</button>)}</nav>
      <div className="sidebar-footer"><Badge tone="neutral">DEMO</Badge><p>Source-aligned prototype</p><small>Source · Derived · Proposed</small></div>
    </aside>

    <section className="main">
      <header className="topbar"><div className="breadcrumbs">Dealer Intelligence <span>/</span> {nav.find(n => n[0] === view)?.[1]}</div><div className="top-user"><span className="online" /> Demo workspace <span className="user-avatar">K</span></div></header>
      <div className="content">
        {view === "dashboard" && <Dashboard go={go} />}
        {view === "employee" && <Employee week={week} setWeek={setWeek} tab={employeeTab} setTab={setEmployeeTab} />}
        {view === "incentive" && <Incentive />}
        {view === "reports" && <Reports go={go} />}
        {view === "workshop" && <Workshop />}
        {view === "breakdown" && <Breakdown />}
        {view === "claims" && <Claims />}
        {view === "customer" && <Customer />}
      </div>
    </section>
  </main>;
}

function Dashboard({ go }: { go: (v: View) => void }) {
  return <><Header title="Good morning" subtitle="A consolidated view of the dealership data currently available in the supplied reports." />
    <div className="hero-row"><div className="hero-copy"><Badge>DEMO WORKSPACE</Badge><h2>One place to understand what your reports are saying.</h2><p>Existing Excel processes remain the source. This interface turns them into searchable employee, workshop, breakdown and claim views.</p></div><div className="hero-meta"><span>Data sources</span><strong>4 workbooks</strong><small>Workshop · KPI · Breakdown · FML</small></div></div>
    <div className="section-label">AT A GLANCE <span>Source-aligned indicators</span></div>
    <div className="stats"><Metric label="Mechanic KRA" value="6" note="criteria per weekly assessment" /><Metric label="Assessment scale" value="1–5" note="Very Bad → Excellent" /><Metric label="Monthly KRA" value={monthly.toFixed(2)} note="VISHWAJEET · June 2026" /><Metric label="Report groups" value="6" note="workshop, breakdown, FML & more" /></div>
    <div className="dashboard-grid">
      <Card><CardHead title="Employee intelligence" tag="SOURCE + DERIVED" /><div className="employee-highlight"><div className="person"><span className="avatar large">V</span><div><strong>VISHWAJEET</strong><span>Mechanic · June 2026</span></div></div><div className="big-score"><strong>{monthly.toFixed(2)}</strong><small>/ 5 average for month</small></div></div><div className="mini-weeks">{weekly.map((x,i)=><div key={i}><span>Week {i+1}</span><b>{x.toFixed(2)}</b></div>)}</div><button className="primary" onClick={() => go("employee")}>Open employee evaluation <span>→</span></button></Card>
      <Card><CardHead title="Data & reports" tag="6 REPORT GROUPS" /><div className="report-links"><ReportLink title="Workshop / Job Card" desc="Job card, customer, vehicle, parts & labour" onClick={() => go("workshop")} /><ReportLink title="Breakdown tracking" desc="Open cases, response, supervisor & parts" onClick={() => go("breakdown")} /><ReportLink title="FML / Claims" desc="Status, passed amount & payment" onClick={() => go("claims")} /><ReportLink title="Customer / Vehicle" desc="Searchable customer and vehicle view" onClick={() => go("customer")} /></div></Card>
    </div>
  </>;
}
function Metric({ label, value, note }: { label:string; value:string; note:string }) { return <div className="metric"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>; }
function CardHead({ title, tag }: { title:string; tag:string }) { return <div className="card-head"><div><h3>{title}</h3></div><Badge tone="neutral">{tag}</Badge></div>; }
function ReportLink({ title, desc, onClick }: { title:string; desc:string; onClick:()=>void }) { return <button className="report-link" onClick={onClick}><span className="report-icon">▤</span><span><b>{title}</b><small>{desc}</small></span><em>→</em></button>; }

function Employee({ week, setWeek, tab, setTab }: { week:number; setWeek:(n:number)=>void; tab:string; setTab:(t:"evaluation"|"history"|"performance")=>void }) {
  const score = weekly[week-1];
  return <><Header title="Employee Intelligence" subtitle="Mechanic evaluation and incentive intelligence built around the existing Excel process." />
    <div className="employee-toolbar"><div className="person"><span className="avatar">V</span><div><strong>VISHWAJEET</strong><span>Mechanic · June 2026</span></div></div><div className="toolbar-selects"><select><option>Mechanic</option><option>Service Advisor</option><option>CRE</option></select><select><option>June 2026</option></select></div></div>
    <div className="tabs"><button className={tab === "evaluation" ? "active" : ""} onClick={() => setTab("evaluation")}>KRA Assessment</button><button className={tab === "history" ? "active" : ""} onClick={() => setTab("history")}>Monthly History</button><button className={tab === "performance" ? "active" : ""} onClick={() => setTab("performance")}>Performance <Badge tone="proposed">PROPOSED</Badge></button></div>
    {tab === "evaluation" && <Card><CardHead title="Weekly KRA Assessment" tag="SOURCE" /><div className="subline">Exact Mechanic KRA fields from the supplied workbook · equal-weight average</div><div className="week-selector">{[1,2,3,4].map(w=><button className={week === w ? "selected" : ""} key={w} onClick={() => setWeek(w)}>Week {w}</button>)}</div><div className="table-wrap"><table><thead><tr><th>KRA / Criteria</th><th>Score</th><th>Rating</th></tr></thead><tbody>{kras.map(([name, values]) => <tr key={name}><td><b>{name}</b></td><td><Score value={values[week-1]} /></td><td>{["Very Bad","Poor","Pass","Good","Excellent"][values[week-1]-1]}</td></tr>)}<tr className="total"><td>Final Score</td><td><strong>{score.toFixed(6)}</strong></td><td><Badge tone="derived">SUM ÷ 6</Badge></td></tr></tbody></table></div><div className="score-footer"><div><span>Week {week} final score</span><strong>{score.toFixed(2)} <small>/ 5</small></strong></div><div><span>Average for month</span><strong>{monthly.toFixed(2)} <small>/ 5</small></strong></div></div></Card>}
    {tab === "history" && <Card><CardHead title="June 2026 · Weekly history" tag="DERIVED" /><div className="history-grid">{weekly.map((s,i)=><div className={week === i+1 ? "history-card selected" : "history-card"} key={i} onClick={() => setWeek(i+1)}><span>Week {i+1}</span><strong>{s.toFixed(2)}</strong><small>{kras.reduce((sum,k)=>sum+k[1][i],0)} / 30 points</small><div className="bar"><i style={{width:`${s/5*100}%`}} /></div></div>)}</div><div className="monthly-summary"><span>Average for month</span><strong>{monthly.toFixed(6)}</strong><small>AVERAGE of weekly Final Scores</small></div></Card>}
    {tab === "performance" && <><div className="notice"><Badge tone="proposed">PROPOSED</Badge><div><strong>Objective performance layer</strong><p>These fields become useful after reliable technician-to-job attribution is available. This demo intentionally does not fabricate values.</p></div></div><div className="stats"><Metric label="Productivity" value="—" note="awaiting attribution" /><Metric label="Average TAT" value="—" note="awaiting attribution" /><Metric label="Repeat / Rework" value="—" note="awaiting attribution" /><Metric label="Labour generated" value="—" note="awaiting attribution" /></div></>}
  </>;
}

function Incentive() { return <><Header title="Incentive" subtitle="Existing incentive rules presented as a clean, reviewable policy layer." /><Card><CardHead title="Mechanic / Electrician" tag="SOURCE" /><div className="formula-box"><span>Existing incentive basis</span><strong>10% of (Total Labour generated without GST − (Salary + OT))</strong></div><div className="multiplier-grid">{[[1,"0.50"],[2,"0.65"],[3,"0.80"],[4,"1.00"],[5,"1.20"]].map(([a,m])=><div key={a}><span>Assessment {a}</span><strong>{m}</strong><small>Multiplier</small></div>)}</div></Card><div className="two-cards"><Card><CardHead title="Floor Advisors" tag="SOURCE" /><SimpleTable headers={["Target","Monthly Labour","Quarterly Labour","Quarterly Incentive"]} rows={[["T1","₹225,000","₹675,000","₹3,000"],["T2","₹275,000","₹825,000","₹6,000"],["T3","₹325,000","₹975,000","₹9,000"],["T4","₹375,000","₹1,125,000","₹16,000"]]} /></Card><Card><CardHead title="CRE — Srishti" tag="SOURCE" /><SimpleTable headers={["Monthly","Quarterly","Quarterly Incentive"]} rows={[["440","1320","₹3,000"],["465","1395","₹6,000"],["490","1470","₹9,000"],["515","1545","₹12,000"]]} /></Card></div><Card><CardHead title="Calculation preview" tag="PROPOSED UI" /><div className="calc-grid">{[["Employee","VISHWAJEET"],["Average Points","3.83 / 5"],["Assessment","4"],["Multiplier","1.00"],["Labour Generated","—"],["Incentive","Pending data"]].map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></Card></>; }

function Reports({ go }: { go:(v:View)=>void }) { return <><Header title="Data & Reports" subtitle="The reporting layer that replaces manual hunting across separate Excel sheets." /><div className="report-catalog"><ReportTile title="Employee KPI" count="KRA Assessment Mechanic" desc="Weekly scores, final score and monthly average" onClick={() => go("employee")} /><ReportTile title="Incentive" count="Incentive" desc="Department-specific targets and multipliers" onClick={() => go("incentive")} /><ReportTile title="Workshop / Job Card" count="Job Card" desc="Customer, vehicle, parts, labour and invoice" onClick={() => go("workshop")} /><ReportTile title="Breakdown" count="Daily service Tracker" desc="Complaint, response, days open, supervisor and parts" onClick={() => go("breakdown")} /><ReportTile title="FML / Claims" count="Data Report" desc="Claim status, passed/rejected amount and payment" onClick={() => go("claims")} /><ReportTile title="Customer / Vehicle" count="Job Card" desc="Search customer and vehicle information" onClick={() => go("customer")} /></div><div className="data-flow"><div><span>01</span><b>Excel workbooks</b><small>Existing dealership reports</small></div><i>→</i><div><span>02</span><b>Structured data</b><small>Mapped fields and history</small></div><i>→</i><div><span>03</span><b>Reports</b><small>Searchable management views</small></div><i>→</i><div><span>04</span><b>Management view</b><small>One place to review</small></div></div></>; }
function ReportTile({ title, count, desc, onClick }: {title:string;count:string;desc:string;onClick:()=>void}) { return <button className="report-tile" onClick={onClick}><div className="tile-icon">▤</div><span className="tile-tag">{count}</span><h3>{title}</h3><p>{desc}</p><em>Open report →</em></button>; }

function Workshop() { return <><Header title="Workshop / Job Card Report" subtitle="Gazipur workshop reporting Jul 26.xlsx · Job Card sheet" /><Card><div className="report-toolbar"><div><Badge>SOURCE</Badge><span>Job Card register</span></div><div><button className="filter">All services ⌄</button><button className="secondary">Export</button></div></div><SimpleTable headers={["Job Card No","Customer Name","Vehicle No.","Model","Service","Part Value","Labour","Total Invoice"]} rows={workshop} /><div className="field-strip"><b>Available source fields</b><span>Job Card Opening Date</span><span>Job Card Closing Date</span><span>Customer Phone Number</span><span>Customer category</span><span>Part Code Issued</span><span>Total Labour</span><span>Invoice No</span></div></Card></>; }
function Breakdown() { return <><Header title="Breakdown Tracking" subtitle="Breakdown tracking.xlsx · Daily service Tracker" /><div className="stats"><Metric label="Open cases" value="1" note="source sample shown" /><Metric label="Highest days open" value="35" note="source record" /><Metric label="Satisfaction" value="N" note="source field" /><Metric label="SPO Order" value="—" note="source field" /></div><Card><CardHead title="Daily service tracker" tag="SOURCE" /><SimpleTable headers={["Complain No","Vehicle Reg.","Customer Name","Customer Complaint","Days Open","Status","Supervisor"]} rows={breakdown} /><div className="field-strip"><b>Available source fields</b><span>ChassisNo</span><span>CustomerContactnumber</span><span>Customer location</span><span>Complain date</span><span>Response Date</span><span>VEHICLE ATTEND SUPERVISOR</span><span>Remarks</span><span>parts receive date</span></div></Card></>; }
function Claims() { return <><Header title="FML / Claim Report" subtitle="AMIT UPDATED FML Claim Sheet Feb 26.xlsx · Data Report sheet" /><Card><div className="report-toolbar"><div><Badge>SOURCE</Badge><span>Claim register</span></div><div><button className="filter">All statuses ⌄</button><button className="secondary">Export</button></div></div><SimpleTable headers={["Claim Invoice","Internal No","Invoice Date","Invoice Value","Type","Status","Passed Amount"]} rows={claims} /><div className="field-strip"><b>Available source fields</b><span>Rejected Amount</span><span>Payment Date</span><span>Remarks</span><span>Claim Month</span><span>Claim Year</span></div></Card></>; }
function Customer() { return <><Header title="Customer / Vehicle" subtitle="Searchable customer and vehicle information from the existing Job Card data." /><Card><div className="search-box"><span>⌕</span><input placeholder="Search customer, vehicle number or phone number" defaultValue="Lachchiram PG College Salikpur Gzp" /><button className="primary">Search</button></div><div className="customer-profile"><div className="avatar large">L</div><div><Badge>SOURCE</Badge><h2>Lachchiram PG College Salikpur Gzp</h2><p>Customer record from Job Card data</p></div></div><div className="customer-grid"><Info label="Customer Phone Number" value="9454277263" /><Info label="Vehicle Number" value="UP61AT2335" /><Info label="Vehicle Model" value="T1" /><Info label="Customer category" value="School" /><Info label="Type Of Service" value="Paid" /><Info label="Job Card No" value="91" /><Info label="Part Value" value="₹410" /><Info label="Total Invoice Value" value="₹646" /></div><div className="empty-history"><strong>History modules</strong><p>Service, breakdown and claim history will appear when matching records exist in the imported data.</p></div></Card></>; }
function Info({label,value}:{label:string;value:string}) { return <div className="info"><span>{label}</span><strong>{value}</strong></div>; }
function SimpleTable({ headers, rows }: {headers:string[];rows:string[][]}) { return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((x,j)=><td key={j}>{j === 5 && (x === "Open" || x === "REJECTED") ? <Badge tone="proposed">{x}</Badge> : x}</td>)}</tr>)}</tbody></table></div>; }
