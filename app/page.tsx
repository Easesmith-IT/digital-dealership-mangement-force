"use client";

import { useMemo, useState } from "react";
import { evaluationCriteria, weeklyScores, workshopRows, breakdownRows, claimRows, customerRows, incentiveMultipliers } from "./demo-data";

type View = "dashboard" | "employee" | "reports" | "data" | "customers" | "management";
type Tab = "overview" | "kra" | "work" | "quality" | "productivity" | "incentive" | "history";

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const months = ["May 2026", "June 2026", "July 2026"];

const nav: Array<[View, string, string]> = [
  ["dashboard", "Management Dashboard", "Overview"],
  ["employee", "Employee Intelligence", "People"],
  ["reports", "Data & Reports", "Data"],
  ["data", "Data Hub", "Data"],
  ["customers", "Customer Intelligence", "Customer"],
  ["management", "Management Action Centre", "Management"],
];

export default function Home() {
  const [view, setView] = useState<View>("employee");
  const [tab, setTab] = useState<Tab>("overview");
  const [month, setMonth] = useState("June 2026");
  const [week, setWeek] = useState("Month");
  const [comparison, setComparison] = useState("Previous period");
  const [selectedEmployee] = useState("VISHWAJEET");
  const score = week === "Month" ? 3.54 : weeklyScores[Number(week.replace("Week ", "")) - 1] ?? 3.54;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-logo">DI</div><div><b>Force Goenka</b><span>Dealer Intelligence</span></div></div>
        <div className="workshop"><small>WORKSHOP</small><b>GHAZIPUR</b><span>Force Motors · Live demo</span></div>
        <nav>
          <small className="nav-title">WORKSPACE</small>
          {nav.map(([id, label, group]) => (
            <button key={id} className={view === id ? "nav-item active" : "nav-item"} onClick={() => setView(id)}>
              <span className="nav-dot">{group === "People" ? "P" : group === "Data" ? "D" : group === "Customer" ? "C" : group === "Management" ? "M" : "O"}</span>{label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot"><b>Management Demo</b><span>Source-aware presentation layer</span></div>
      </aside>

      <section className="shell-content">
        <header className="top-header">
          <div><div className="eyebrow">FORCE GOENKA / {view === "employee" ? "EMPLOYEE INTELLIGENCE" : view.toUpperCase()}</div><h1>{view === "employee" ? "Employee Intelligence" : nav.find(n => n[0] === view)?.[1]}</h1></div>
          <div className="top-actions"><span className="pill">Ghazipur Workshop</span><span className="avatar">KM</span></div>
        </header>

        {view === "employee" && <EmployeeModule {...{tab, setTab, month, setMonth, week, setWeek, comparison, setComparison, selectedEmployee, score}} />}
        {view === "reports" && <Reports />}
        {view === "data" && <DataHub />}
        {view === "customers" && <Customers />}
        {view === "management" && <Management />}
        {view === "dashboard" && <Dashboard score={score} onEmployee={() => setView("employee")} />}
      </section>
    </main>
  );
}

function PeriodBar({month,setMonth,week,setWeek,comparison,setComparison}:{month:string;setMonth:(x:string)=>void;week:string;setWeek:(x:string)=>void;comparison:string;setComparison:(x:string)=>void}) {
  return <div className="period-bar"><div><small>YEAR / MONTH</small><select value={month} onChange={e=>setMonth(e.target.value)}><option>June 2026</option><option>May 2026</option><option>July 2026</option></select></div><div><small>PERIOD</small><select value={week} onChange={e=>setWeek(e.target.value)}><option>Month</option>{weeks.map(w=><option key={w}>{w}</option>)}</select></div><div><small>VIEW MODE</small><select><option>Performance</option><option>Workload</option><option>Quality</option></select></div><div><small>COMPARE WITH</small><select value={comparison} onChange={e=>setComparison(e.target.value)}><option>Previous period</option><option>Workshop average</option><option>No comparison</option></select></div></div>
}

function EmployeeModule(p:{tab:Tab;setTab:(x:Tab)=>void;month:string;setMonth:(x:string)=>void;week:string;setWeek:(x:string)=>void;comparison:string;setComparison:(x:string)=>void;selectedEmployee:string;score:number}) {
  const {tab,setTab,month,setMonth,week,setWeek,comparison,setComparison,selectedEmployee,score}=p;
  return <div className="page">
    <div className="hero employee-hero"><div><span className="source-badge source">SOURCE + DERIVED</span><h2>{selectedEmployee}</h2><p>Mechanic · Ghazipur Workshop · Employee performance cockpit</p><div className="hero-meta"><span>Evaluation: {month}</span><span>Grade <b className="grade">A</b></span><span>Score <b>{score.toFixed(2)} / 5</b></span></div></div><div className="hero-score"><small>{week === "Month" ? "MONTHLY KRA" : week.toUpperCase()}</small><strong>{score.toFixed(2)}</strong><span>/ 5</span></div></div>
    <PeriodBar {...{month,setMonth,week,setWeek,comparison,setComparison}} />
    <div className="tabs">{(["overview","kra","work","quality","productivity","incentive","history"] as Tab[]).map(t=><button key={t} className={tab===t?"tab active":"tab"} onClick={()=>setTab(t)}>{t === "kra" ? "KRA Evaluation" : t === "work" ? "Work Management" : t[0].toUpperCase()+t.slice(1)}</button>)}</div>
    {tab === "overview" && <EmployeeOverview score={score} week={week} />}
    {tab === "kra" && <Kra score={score} week={week} />}
    {tab === "work" && <WorkManagement />}
    {tab === "quality" && <Quality />}
    {tab === "productivity" && <Productivity score={score} />}
    {tab === "incentive" && <Incentive score={score} />}
    {tab === "history" && <History />}
  </div>
}

function EmployeeOverview({score,week}:{score:number;week:string}) {
  return <>
    <div className="kpi-grid"><Kpi title="KRA Score" value={`${score.toFixed(2)} / 5`} note="Derived from six source criteria" /><Kpi title="Grade" value="A" note="Proposed grading band" /><Kpi title="Jobs Linked" value="--" note="Awaiting technician attribution" /><Kpi title="Repeat Jobs" value="--" note="Awaiting technician attribution" /><Kpi title="Labour Generated" value="--" note="Awaiting technician attribution" /><Kpi title="Avg TAT" value="--" note="Awaiting start / finish timestamps" /></div>
    <div className="grid-2"><Panel title="Weekly KRA performance" badge="DERIVED"><LineChart selected={week}/><div className="chart-legend">{weeks.map((w,i)=><button key={w} className={week===w?"legend active":"legend"}>{w} · {weeklyScores[i].toFixed(2)}</button>)}</div></Panel><Panel title="KRA profile" badge="SOURCE"><Radar values={evaluationCriteria.map(x=>x.weeklyScores[week === "Month" ? 3 : Number(week.slice(-1))-1])} /></Panel></div>
    <div className="grid-2"><Panel title="Strengths" badge="DERIVED"><div className="insight good"><b>Uniform</b><span>Strongest source criterion in the selected period.</span></div><div className="insight good"><b>Technical Knowledge</b><span>Consistent score across the available weeks.</span></div></Panel><Panel title="Attention areas" badge="DERIVED"><div className="insight warn"><b>Week 3 drop</b><span>Overall KRA moved to 2.67 / 5 in Week 3.</span></div><div className="insight warn"><b>Work attribution</b><span>Job-level technician linkage is not present in the source workbook.</span></div></Panel></div>
  </>
}

function Kra({score,week}:{score:number;week:string}) {
  const index=week === "Month" ? 3 : Number(week.slice(-1))-1;
  return <><Panel title="Mechanic KRA Evaluation" badge="SOURCE"><div className="formula">Weekly Score = SUM(6 KRA scores) / 6 · Monthly Score = AVERAGE(W1,W2,W3,W4) = <b>3.54 / 5</b></div><table><thead><tr><th>Criterion</th>{weeks.map(w=><th key={w}>{w}</th>)}<th>Selected</th></tr></thead><tbody>{evaluationCriteria.map(r=><tr key={r.label}><td><b>{r.label}</b></td>{r.weeklyScores.map((v,i)=><td key={i}><span className={v<=2?"score low":"score"}>{v}</span></td>)}<td><b>{r.weeklyScores[index]}</b></td></tr>)}</tbody></table></Panel><div className="grid-2"><Panel title="Selected-period radar" badge="DERIVED"><Radar values={evaluationCriteria.map(x=>x.weeklyScores[index])}/></Panel><Panel title="Performance interpretation" badge="PROPOSED"><div className="grade-box"><b>Grade A</b><strong>{score.toFixed(2)} / 5</strong><span>Proposed standard: 3.50–4.49 = A</span><small>Grading bands are a proposed management rule, not a source workbook fact.</small></div></Panel></div></>
}

function WorkManagement(){
  const rows=workshopRows;
  const [mode,setMode]=useState("Assigned");
  const modes=["Assigned","In Progress","Waiting","Completed","Work History","Work Mix","Workload"];
  return <><div className="subtabs">{modes.map(m=><button className={mode===m?"active":""} onClick={()=>setMode(m)} key={m}>{m}</button>)}</div>{mode === "Work Mix" ? <Panel title="Work Mix by service type" badge="SOURCE"><Bars labels={rows.map(r=>r[6])} values={[1,1]}/><p className="muted">Source field: Type Of Service. Aggregation is illustrative until full workbook import is validated.</p></Panel> : mode === "Workload" ? <div className="kpi-grid"><Kpi title="Assigned" value="--" note="Technician attribution unavailable"/><Kpi title="Completed" value="--" note="Technician attribution unavailable"/><Kpi title="Waiting" value="--" note="Waiting reason unavailable"/><Kpi title="Workload" value="--" note="Requires employee linkage"/></div> : <Panel title={`${mode} work`} badge={mode === "Assigned" ? "SOURCE + DERIVED" : "SOURCE"}><table><thead><tr><th>Job Card</th><th>Date</th><th>Customer</th><th>Vehicle</th><th>Service</th><th>Employee</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><b>#{r[0]}</b></td><td>{r[1]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[6]}</td><td><span className="missing">--</span><small>Awaiting technician attribution</small></td><td><span className="status">{mode === "Waiting" ? "Waiting" : mode === "In Progress" ? "In progress" : mode === "Completed" ? "Completed" : "Available"}</span></td><td><button className="link-btn">View job</button></td></tr>)}</tbody></table></Panel>}</>
}

function Quality(){return <><div className="kpi-grid"><Kpi title="Repeat / Rework Rate" value="--" note="Technician attribution unavailable"/><Kpi title="Complaint-linked jobs" value="--" note="Breakdown source does not attribute technician"/><Kpi title="QC failures" value="--" note="QC field not available in source"/><Kpi title="Customer feedback" value="--" note="Feedback integration proposed"/></div><Panel title="Quality signals" badge="SOURCE + PROPOSED"><div className="timeline"><div><b>Breakdown source</b><span>UP61CT3221 · FUEL METER IS NOT SHOWIN · Open</span></div><div><b>Attribution</b><span>-- · Awaiting technician attribution</span></div><div><b>Future automation</b><span>Link repeat jobs and complaints to employee once job-card attribution is captured.</span></div></div></Panel></>}

function Productivity({score}:{score:number}){return <><div className="kpi-grid"><Kpi title="Job Cards Completed" value="--" note="Needs technician linkage"/><Kpi title="Labour Generated" value="--" note="Needs technician linkage"/><Kpi title="Average TAT" value="--" note="Needs start/finish timestamps"/><Kpi title="Target Achievement" value="--" note="Target policy not source-confirmed"/></div><Panel title="Target vs Actual" badge="PROPOSED"><div className="progress-row"><span>KRA target</span><b>{score.toFixed(2)} / 5</b><div className="progress"><i style={{width:`${Math.min(score/5*100,100)}%`}}/></div></div><p className="muted">Productivity metrics intentionally remain unavailable where the uploaded source does not contain technician-level attribution or timestamps.</p></Panel></>}

function Incentive({score}:{score:number}){return <><Panel title="Mechanic / Electrician incentive policy" badge="SOURCE"><div className="formula">10% of (Total Labour without GST - (Salary + OT))</div><table><thead><tr><th>Assessment</th><th>Multiplier</th></tr></thead><tbody>{incentiveMultipliers.map(x=><tr key={x.assessment}><td>{x.assessment}</td><td>{x.multiplier}</td></tr>)}</tbody></table></Panel><Panel title="Payout preview" badge="PROPOSED"><div className="payout"><span>Current KRA assessment</span><strong>{score.toFixed(2)} / 5</strong><span>Live labour / salary / OT data</span><strong>--</strong><small>Preview cannot calculate a real payout until required employee and labour inputs are available.</small></div></Panel></>}

function History(){return <><Panel title="Performance history" badge="DERIVED"><div className="history-grid">{months.map((m,i)=><div className="history-card" key={m}><span>{m}</span><strong>{i===1?"3.54":"--"}</strong><small>{i===1?"4 weekly assessments":"No verified KRA data loaded"}</small></div>)}</div></Panel><Panel title="Period comparison" badge="PROPOSED"><table><thead><tr><th>Period</th><th>KRA</th><th>Workshop average</th><th>Trend</th></tr></thead><tbody><tr><td>June 2026</td><td>3.54 / 5</td><td>--</td><td>Baseline</td></tr><tr><td>Week 3</td><td>2.67 / 5</td><td>--</td><td>Attention</td></tr></tbody></table></Panel></>}

function Reports(){const [type,setType]=useState("Workshop"); const configs:{[k:string]:{heads:string[];rows:string[][];source:string}}={Workshop:{heads:["Job Card","Opening","Closing","Customer","Vehicle","Model","Service","Parts","Labour","Invoice"],rows:workshopRows,source:"Gazipur workshop reporting Jul 26.xlsx / Job Card"},Breakdown:{heads:["Complaint No","Vehicle","Customer","Complaint","Days Open","Status","Supervisor","Response","Satisfaction"],rows:breakdownRows,source:"Breakdown tracking.xlsx / Daily service Tracker"},Claims:{heads:["Claim No","Invoice","Type","Status","Invoice Value","Passed","Rejected","Payment Date"],rows:claimRows,source:"AMIT UPDATED FML Claim Sheet Feb 26.xlsx / Data Report"},Customers:{heads:["Customer","Phone","Vehicle","Model","Category","Service","Job Card","Breakdowns"],rows:customerRows,source:"Gazipur workshop reporting Jul 26.xlsx / Job Card"}}; const c=configs[type]; return <div className="page"><div className="hero"><div><span className="source-badge source">SOURCE</span><h2>Data & Reports</h2><p>One reporting layer across the existing Excel reporting structure.</p></div><div className="hero-score"><strong>4</strong><span>workbook sources</span></div></div><div className="subtabs">{Object.keys(configs).map(t=><button className={type===t?"active":""} onClick={()=>setType(t)} key={t}>{t}</button>)}</div><Panel title={`${type} Report`} badge="SOURCE"><p className="source-line">{c.source}</p><DataTable heads={c.heads} rows={c.rows}/></Panel><Panel title="Data quality layer" badge="PROPOSED"><div className="quality-grid"><Kpi title="Missing attribution" value="--" note="Flagged instead of fabricated"/><Kpi title="Source traceability" value="100%" note="Every displayed source table identifies workbook/sheet"/><Kpi title="Derived metrics" value="Controlled" note="Only calculate where inputs are validated"/></div></Panel></div>}

function DataHub(){return <div className="page"><div className="hero"><div><span className="source-badge derived">DATA FOUNDATION</span><h2>Data Hub</h2><p>Replace scattered Excel files with one searchable, traceable dealership data layer.</p></div><div className="hero-score"><strong>4</strong><span>source workbooks</span></div></div><div className="kpi-grid"><Kpi title="Source Workbooks" value="4" note="Uploaded dealership reporting inputs"/><Kpi title="Historical Search" value="Ready" note="Demo layer"/><Kpi title="Data Quality" value="Controlled" note="SOURCE / DERIVED / PROPOSED"/><Kpi title="Excel Dependency" value="Migration target" note="Not claimed as complete in demo"/></div><Panel title="Workbook register" badge="SOURCE"><table><thead><tr><th>Workbook</th><th>Primary use</th><th>Traceability</th><th>State</th></tr></thead><tbody><tr><td>June 26.xlsx</td><td>Mechanic KRA, Incentive, Service Advisor, CRE</td><td>Sheet-level</td><td><span className="status">Imported</span></td></tr><tr><td>Gazipur workshop reporting Jul 26.xlsx</td><td>Job Card, Daily Report, Spare Part, Inventory Check</td><td>Sheet-level</td><td><span className="status">Imported</span></td></tr><tr><td>Breakdown tracking.xlsx</td><td>Daily service Tracker</td><td>Sheet-level</td><td><span className="status">Imported</span></td></tr><tr><td>AMIT UPDATED FML Claim Sheet Feb 26.xlsx</td><td>Data Report</td><td>Sheet-level</td><td><span className="status">Imported</span></td></tr></tbody></table></Panel></div>}

function Customers(){return <div className="page"><div className="hero"><div><span className="source-badge source">SOURCE</span><h2>Customer Intelligence</h2><p>Search customer + vehicle history independently of the OEM interface.</p></div></div><Panel title="Customer & vehicle register" badge="SOURCE"><DataTable heads={["Customer","Phone","Vehicle","Model","Category","Service","Job Card","Breakdowns"]} rows={customerRows}/></Panel><Panel title="Customer journey" badge="PROPOSED"><div className="timeline"><div><b>Vehicle history</b><span>Job cards → service → invoice → future CRM interactions</span></div><div><b>WhatsApp follow-up</b><span>Feedback, reminders and status updates are proposed automation layers.</span></div></div></Panel></div>}

function Management(){return <div className="page"><div className="hero"><div><span className="source-badge proposed">MANAGEMENT</span><h2>Management Action Centre</h2><p>Turn reports into exceptions that a manager can actually act on.</p></div></div><div className="grid-2"><Panel title="Needs attention" badge="PROPOSED"><div className="attention"><div><b>Week 3 employee score</b><span>VISHWAJEET · 2.67 / 5</span><button>Review employee</button></div><div><b>Open breakdown</b><span>UP61CT3221 · FUEL METER IS NOT SHOWIN</span><button>Open case</button></div><div><b>Data attribution gap</b><span>Job cards cannot currently be attributed to a technician.</span><button>Fix data capture</button></div></div></Panel><Panel title="Management notes" badge="PROPOSED"><textarea placeholder="Manager review note, action owner, due date..."/><div className="form-row"><input placeholder="Action owner"/><input placeholder="Review date"/></div><button className="primary">Save review</button></Panel></div></div>}

function Dashboard({score,onEmployee}:{score:number;onEmployee:()=>void}){return <div className="page"><div className="hero"><div><span className="source-badge derived">MANAGEMENT COCKPIT</span><h2>Dealership Intelligence</h2><p>Management layer over current workshop data, without replacing the OEM DMS.</p><button className="primary" onClick={onEmployee}>Open Employee Intelligence</button></div><div className="hero-score"><small>EMPLOYEE KRA</small><strong>{score.toFixed(2)}</strong><span>/ 5</span></div></div><div className="kpi-grid"><Kpi title="Employee KRA" value={`${score.toFixed(2)} / 5`} note="June 2026 · VISHWAJEET"/><Kpi title="Job Cards" value="2+" note="Verified demo records shown"/><Kpi title="Open Breakdown" value="1" note="Source record shown"/><Kpi title="Claims" value="4" note="Demo source records shown"/></div></div>}

function Kpi({title,value,note}:{title:string;value:string;note:string}){return <div className="kpi"><small>{title}</small><strong>{value}</strong><span>{note}</span></div>}
function Panel({title,badge,children}:{title:string;badge?:string;children:React.ReactNode}){return <section className="panel"><div className="panel-head"><div><h3>{title}</h3></div>{badge&&<span className={`source-badge ${badge.includes("SOURCE")?"source":badge.includes("DERIVED")?"derived":"proposed"}`}>{badge}</span>}</div>{children}</section>}
function DataTable({heads,rows}:{heads:string[];rows:string[][]}){return <div className="table-wrap"><table><thead><tr>{heads.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div>}
function LineChart({selected}:{selected:string}){const pts=weeklyScores.map((v,i)=>`${i*31+8},${105-v*22}`).join(" ");return <div className="chart"><svg viewBox="0 0 132 115" role="img" aria-label="Weekly KRA performance"><line x1="8" y1="100" x2="128" y2="100"/><line x1="8" y1="8" x2="8" y2="100"/><polyline points={pts}/>{weeklyScores.map((v,i)=><circle key={i} cx={i*31+8} cy={105-v*22} r={selected===`Week ${i+1}`?3.5:2.5}/>)}</svg><div className="axis"><span>W1</span><span>W2</span><span>W3</span><span>W4</span></div></div>}
function Radar({values}:{values:number[]}){const labels=["Tech","Learning","Bay","Uniform","Punctual","Repeat"];return <div className="radar"><svg viewBox="0 0 240 190"><polygon points="120,15 193,57 193,143 120,177 47,143 47,57"/><polygon points="120,48 167,75 167,125 120,147 73,125 73,75"/><polygon points="120,75 143,88 143,112 120,124 97,112 97,88"/>{values.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/3; const x=120+75*(v/5)*Math.cos(a); const y=96+75*(v/5)*Math.sin(a); return <circle key={i} cx={x} cy={y} r="3"/>})}<polyline points={values.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/3;return `${120+75*(v/5)*Math.cos(a)},${96+75*(v/5)*Math.sin(a)}`}).join(" ")}/>{labels.map((l,i)=>{const a=-Math.PI/2+i*Math.PI/3;return <text key={l} x={120+92*Math.cos(a)} y={96+92*Math.sin(a)} textAnchor="middle">{l}</text>})}</svg></div>}
function Bars({labels,values}:{labels:string[];values:number[]}){return <div className="bars">{labels.map((l,i)=><div className="bar-row" key={i}><span>{l}</span><div><i style={{width:`${values[i]*45}px`}}/></div><b>{values[i]}</b></div>)}</div>}
function Hero({children}:{children:React.ReactNode}){return <div className="hero">{children}</div>}
