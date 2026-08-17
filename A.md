# Employee Intelligence & Work Management — Requirements, UX Specification & Checklist

**Status:** Implementation specification  
**Audience:** Codex / engineering agent  
**Priority:** P0 / highest demo priority  
**Scope:** Static high-fidelity demo first. Architecture must be suitable for later real data/API integration.

---

## 0. Non-Negotiable Rules

1. This is **not a replacement for Force FDMS or Zoho**.
2. Do not rebuild floor management, stock management, escalation, or OEM operational workflows as primary features.
3. Employee Intelligence + Work Management is the hero product area.
4. Use the supplied Excel files as the source of truth for existing fields, terminology, records and formulas.
5. Never fabricate a number to make a chart look complete.
6. Every value must be one of:
   - **SOURCE**: directly present in source data.
   - **DERIVED**: calculated transparently from source data.
   - **PROPOSED**: a new field/metric that the future system will capture or calculate.
7. If a required value is unavailable, show `--` or `Awaiting technician attribution`.
8. Do not present proposed KPIs as if they already exist in Excel.
9. The demo must look like production enterprise software, not a requirements document.
10. All graphs must have correct labels, units, periods and source/derived/proposed status.
11. Period selection must control all applicable data on the employee page.
12. Employee-to-job attribution must be explicit before employee-level operational KPIs are populated.

---

# 1. Product Purpose

The product is a **Dealer Intelligence & Reporting Platform** sitting alongside Force FDMS, Zoho, Excel/PDF/manual processes and other operational systems.

Core flow:

```text
Force FDMS / Zoho / Excel / PDF / Manual Input
                    ↓
              DATA CAPTURE
                    ↓
             DEALER DATA HUB
                    ↓
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    REPORTING   EMPLOYEE    CUSTOMER
               INTELLIGENCE INTELLIGENCE
                    ↓
             INCENTIVE ENGINE
                    ↓
            MANAGEMENT ACTION
```

For this implementation, **Employee Intelligence + Work Management** must be the most polished and information-rich area.

---

# 2. Source Workbooks

The demo is based on these supplied workbooks:

- `June 26.xlsx`
- `Gazipur workshop reporting Jul 26.xlsx`
- `Breakdown tracking.xlsx`
- `AMIT UPDATED FML Claim Sheet Feb 26.xlsx`

Relevant sheets include:

### June 26.xlsx
- `Data`
- `Incentive`
- `KRA Assessment Mechanic`
- `Mechanic KRA Print`
- `Spare part`
- `Spare part admin`
- `Service advisor`

### Gazipur workshop reporting Jul 26.xlsx
- `Job Card`
- `Daily report`
- `Spare Part IN`
- `Inventory Check`
- `Service Coupon`
- `Warranty`

### Breakdown tracking.xlsx
- `Daily service Tracker`
- `Sheet2`

### AMIT UPDATED FML Claim Sheet Feb 26.xlsx
- `Data Report sheet`
- `Claim Summary`
- `PDI report`
- `FSC report`
- `Warranty report`
- `Report`

Do not assume that a field exists merely because it would be useful. Verify against these sources.

---

# 3. Employee Intelligence Information Architecture

Employee detail page must have these tabs:

1. **Overview**
2. **KRA Evaluation**
3. **Work Management**
4. **Quality**
5. **Productivity**
6. **Targets**
7. **Performance History**
8. **Incentive**

The employee header must remain visible while navigating tabs.

### Employee header

Show:

- Employee name
- Role/designation
- Workshop/location if available
- Evaluation period
- Active/inactive status if available
- Current KRA score
- Final performance score if available
- Grade if the proposed grading layer has enough data

Do not invent an Employee ID if none exists in the source.

---

# 4. Global Period Controls

This is mandatory.

At the top of Employee Intelligence provide:

- Year
- Month
- Week
- View mode
- Optional comparison period

Example:

```text
Year: 2026
Month: June
Week: All Weeks
View: Monthly
Compare: Previous Period / Workshop Average / None
```

### Drill-down hierarchy

```text
Year
 ↓
Month
 ↓
Week
 ↓
Day
 ↓
Job Card
```

When the user selects a specific month or week:

- KPI cards update.
- Charts update.
- KRA table updates.
- Work history updates.
- Current assignment remains current-state where applicable.
- Quality metrics update.
- Incentive preview updates where the policy period supports it.

Clicking a week point/bar on a graph must drill into that week.

---

# 5. Mechanic KRA — Existing Source Logic

For the **Mechanic** role, use exactly these six source KRA criteria:

1. `Technical Knowledge`
2. `Kaam Sekhne ki koshish`
3. `Bay Cleanliness`
4. `Uniform`
5. `Punctuality - Time par aana`
6. `Repeat job nahin aana`

Do **not** add generic HR criteria to the source KRA form.

Each criterion is scored 1–5:

- 1 = Very Bad
- 2 = Poor
- 3 = Pass
- 4 = Good
- 5 = Excellent

### Weekly formula

```text
Weekly Final Score = SUM(six KRA scores) / 6
```

The workbook contains this formula in the `KRA Assessment Mechanic` sheet.

### Monthly formula

```text
Monthly Average = AVERAGE of the employee's weekly Final Score
for the same Month + Year + Mechanic Name
```

Do not introduce arbitrary KRA weightages into this source calculation.

---

# 6. Source Example — VISHWAJEET

The source workbook contains VISHWAJEET's June 2026 weekly assessments.

Known source values include:

### Week 1
- Technical Knowledge = 3
- Kaam Sekhne ki koshish = 4
- Bay Cleanliness = 4
- Uniform = 5
- Punctuality - Time par aana = 4
- Repeat job nahin aana = 3
- Weekly Final Score = 3.833333...

### Week 2
- Technical Knowledge = 3
- Kaam Sekhne ki koshish = 4
- Bay Cleanliness = 4
- Uniform = 5
- Punctuality - Time par aana = 4
- Repeat job nahin aana = 3
- Weekly Final Score = 3.833333...

### Week 3
- Technical Knowledge = 3
- Kaam Sekhne ki koshish = 2
- Bay Cleanliness = 3
- Uniform = 2
- Punctuality - Time par aana = 3
- Repeat job nahin aana = 3
- Weekly Final Score = 2.666667...

### Week 4
- Technical Knowledge = 3
- Kaam Sekhne ki koshish = 4
- Bay Cleanliness = 3
- Uniform = 5
- Punctuality - Time par aana = 4
- Repeat job nahin aana = 4
- Weekly Final Score = 3.833333...

### Correct June monthly average

```text
AVERAGE(3.833333, 3.833333, 2.666667, 3.833333)
≈ 3.541667
```

Display rounded to **3.54 / 5**, while retaining precise internal calculation.

Do not display 3.83 as the monthly average. 3.83 is the value for Weeks 1, 2 and 4 individually.

---

# 7. Employee Overview — Required UI

The Overview must feel like an executive performance cockpit.

### Header

```text
VISHWAJEET
Mechanic · Ghazipur Workshop
June 2026
```

### KPI cards

Show, where supported:

- KRA Score
- Final Performance Score
- Grade
- Jobs Completed
- Current Work
- Average TAT
- Quality / Repeat Rate
- Labour Generated

If an operational KPI cannot be reliably attributed to the employee, show:

`--`

and a small explanation such as:

`Awaiting technician ↔ job-card attribution`

Do not use fake values.

---

# 8. KRA Performance Visualizations

## 8.1 Weekly Performance Line Chart

Title:

**Weekly KRA Performance**

For June 2026, show one point per available week.

Example source-backed values:

- Week 1 = 3.83
- Week 2 = 3.83
- Week 3 = 2.67
- Week 4 = 3.83

Chart requirements:

- X-axis = week
- Y-axis = score 0–5
- Tooltip = exact score + period
- Click point = drill into selected week
- Show average line if useful
- No invented future weeks

## 8.2 Monthly Performance Line Chart

Title:

**Monthly KRA Performance**

X-axis = month
Y-axis = 0–5

Only show months supported by source data.

Do not create fake January–May values simply to fill a graph.

## 8.3 KRA Radar Chart

Use exactly the six Mechanic KRA fields.

Allow selector:

- Selected Week
- Monthly Average
- Previous Week if available

## 8.4 Individual KRA Trend

Dropdown:

```text
Technical Knowledge
Kaam Sekhne ki koshish
Bay Cleanliness
Uniform
Punctuality - Time par aana
Repeat job nahin aana
```

Display a week-by-week line chart for the selected criterion.

---

# 9. Week Drilldown

When a user selects Week 3:

Header must change to:

**VISHWAJEET · Week 3 · June 2026**

Show:

- Weekly Final Score
- All six KRA scores
- Radar chart
- Comparison vs previous week if previous week exists
- Strengths
- Attention areas
- Work performed for that week if technician attribution exists
- Current assigned work as current-state data

### Derived insights

Strongest KRA = highest score in selected period.

Attention area = lowest score in selected period.

Do not hard-code these labels.

---

# 10. Month Drilldown

When user selects June 2026:

Show:

- Monthly KRA average
- Weekly performance chart
- KRA radar for monthly average
- KRA-by-KRA monthly averages
- Work performance for June if attributed
- Incentive period preview
- Performance history

A month must be decomposable into its available weeks.

---

# 11. Work Management — Core Feature

This is as important as KRA.

The purpose is to answer:

1. What work is currently assigned to this employee?
2. What work is in progress?
3. What work is waiting?
4. What work has been completed?
5. What jobs/services has this employee performed historically?
6. What type of work does this employee handle?
7. How much work is assigned vs completed?
8. How long does work take once proper timestamps are available?

Tabs/sections:

- Currently Assigned
- In Progress
- Waiting
- Completed
- Work History
- Work Mix
- Workload

---

# 12. Currently Assigned Work

Show a prominent section:

**CURRENTLY ASSIGNED**

Columns:

- Job Card No
- Vehicle Number
- Vehicle Model
- Customer
- Type Of Service
- Assignment Status
- Current Status
- Assigned At
- Waiting Reason

### Data status

Current Excel data provides Job Card/customer/vehicle/service information but does not reliably provide every technician assignment/status timestamp.

Therefore:

- Build the complete UI.
- Use source-backed job data where relationships exist.
- Mark assignment/status/timestamp fields as `PROPOSED` until captured.
- Do not invent current assignments.

---

# 13. In Progress

Create a professional active-work table.

Columns:

- Job Card
- Vehicle
- Service
- Started
- Current Status
- Elapsed Time
- Waiting Reason

If Start Time does not exist:

`--`

Do not derive a fake start time from Job Card Opening Date and call it technician start time.

---

# 14. Waiting Work

Waiting reasons should be structured for future capture:

- Parts
- Customer Approval
- Diagnosis
- Bay / Resource
- Technician
- External Job
- Other

These are **PROPOSED operational categories** unless already present in source data.

Display the reason explicitly.

---

# 15. Completed Work / Work History

Create a searchable, filterable table.

Use actual Job Card fields where available:

- Job Card Opening Date
- Job Card Closing Date
- Job Card No
- Customer Name
- Customer Phone Number
- Vehicle number
- Vehicle Model
- Customer category
- Type Of Service
- Part Code Issued
- Part Description
- Part Qty
- Part MRP
- Part Value
- Labour Charges
- Electrical Labour
- Outside Labour
- Laptop Charges
- Deputation
- Other charges
- Total Labour
- Invoice No
- Total Invoice Value

Filters:

- Today
- This Week
- This Month
- Custom Range
- Type Of Service
- Vehicle Model
- Status

Clicking a job must open a detailed job view.

---

# 16. Job Detail / Service Performed

The employee-to-job relationship must produce this view:

```text
JOB CARD #...

Customer
Vehicle
Model
Customer Category
Type Of Service

Assigned Technician

Status

WORK
Assigned
Started
Paused
Resumed
Completed

PARTS
Part Description
Qty
MRP
Part Value

LABOUR
Labour Charges
Electrical Labour
Outside Labour
Other Charges
Total Labour

INVOICE
Invoice No
Total Invoice Value
```

Timestamps such as Assigned, Started, Paused, Resumed, Completed are **PROPOSED** unless present in source data.

Do not infer them from unrelated dates.

---

# 17. Work Mix

Use the actual `Type Of Service` field from Job Card data.

Create:

- Service type distribution chart
- Count by service type
- Labour by service type if technician attribution exists
- Invoice value by service type if attribution exists

Possible source values include whatever is actually present in the workbook. Do not hard-code a list that isn't present in the data.

Use the actual distinct source values.

---

# 18. Workload Analytics

Create a visually strong **Target vs Actual / Assigned vs Completed** area.

Graphs:

### Assigned vs Completed
Grouped bars by week.

### Current workload
Stacked state bars:

- Assigned
- In Progress
- Waiting
- Completed

### Workload trend
Week-by-week line/bar chart.

These become real once technician assignment/status data is captured.

Until then, render the components in a clearly marked `PROPOSED` state.

Do not fabricate counts.

---

# 19. Productivity KPIs

The proposed technician objective KPI framework contains:

### Job Cards Completed

```text
Achievement % = Actual Completed / Target × 100
```

### Labour Generated

```text
Achievement % = Labour without GST / Target × 100
```

### Average TAT

If actual TAT <= target:

```text
Performance = 100
```

Otherwise:

```text
Performance = Target / Actual × 100
```

### Repeat / Rework Rate

If actual rate <= target:

```text
Performance = 100
```

Otherwise:

```text
Performance = Target / Actual × 100
```

Do not populate actual employee values until the required data is available.

---

# 20. Performance Score Architecture

Keep the existing KRA score separate from the proposed objective KPI layer.

### KRA Score
Existing Excel-based score.

### Objective KPI Score
Proposed operational score.

### Final Performance Score
Proposed formula:

```text
Final Score = (KRA Score × 40%) + (Objective KPI Score × 60%)
```

### Grade

Proposed grading bands:

| Score | Grade |
|---:|---|
| 90–100 | A+ |
| 80–89.99 | A |
| 70–79.99 | B |
| 60–69.99 | C |
| <60 | D |

Do not calculate a final score if Objective KPI Score is unavailable.

Show:

`Final Score: Pending Objective KPI data`

rather than fabricating it.

---

# 21. Quality Analytics

Create a dedicated Quality section.

KPIs to support when data exists:

- Repeat / Rework Rate
- Customer Feedback
- Complaint-linked Jobs
- QC Failures
- Breakdown-linked Work

The breakdown source contains:

- Complain No
- VehicleRegistrationNo
- ChassisNo
- CustomerName
- CustomerContactnumber
- Customer location
- VehicleType
- VehicleModel
- Complain date
- Customer complain
- complain Person
- No. days Open
- Response Date
- Closer/OPEN
- Supervisor Name/Manager
- VEHICLE ATTEND SUPERVISOR
- Customer satisfaction form signed Y/N
- Remarks
- SPO Order No
- Order Date

Do not claim that every breakdown is attributable to a technician. Preserve the distinction between Supervisor and Vehicle Attend Supervisor.

---

# 22. Performance Comparison

Allow comparison against:

- Previous week
- Previous month
- Workshop average
- Same employee previous period

Never compare unrelated roles in one performance ranking.

Ranking must be department/role specific:

- Technician vs Technician
- Service Advisor vs Service Advisor
- CRE vs CRE
- Spare Parts vs Spare Parts

---

# 23. Employee Role Variants

The same architecture should support different roles.

## Service Advisor source KRA

Use the actual source fields from `Service advisor` sheet:

- Cleanliness - Upkeep on Floor
- Communication with customer whtsapp Group
- Team - Technician Uniform and Discipline
- Customer Feedback

Do not reuse Mechanic KRA fields for Service Advisors.

## CRE

Use role-appropriate proposed objective KPIs such as:

- Monthly Vehicle Reporting
- Follow-up Completion
- Breakdown Response SLA
- Complaint Resolution SLA

Existing incentive target data must remain workshop-specific.

## Spare Parts

Use actual source KRA fields from `Spare part` / `Spare part admin` sheets. Do not invent criteria.

---

# 24. Incentive Integration

Employee Intelligence must connect to Incentive, but Incentive remains a separate policy/calculation area.

### Mechanic / Electrician source policy

```text
10% of
(Total Labour generated without GST - (Salary + OT))
```

Assessment multipliers:

| Assessment | Multiplier |
|---:|---:|
| 1 | 0.50 |
| 2 | 0.65 |
| 3 | 0.80 |
| 4 | 1.00 |
| 5 | 1.20 |

Do not invent a universal incentive rule for all roles.

The Incentive workbook also contains separate Floor Advisor and CRE structures. Preserve them separately.

---

# 25. Visual Design Requirements

This must look like a serious enterprise application.

### Required

- Desktop-first at 1440px.
- Also work at 1280px.
- Fixed/sticky sidebar.
- Proper top header.
- No content overlap.
- No browser-default buttons.
- No unstyled tables.
- Dense but readable data layout.
- Consistent 8px/4px spacing system.
- Professional typography.
- Subtle borders.
- Controlled shadows.
- Consistent badge system.
- Proper empty/loading states.
- Charts with legends and tooltips.
- Tables with filters/search.
- Clear hierarchy.

### Do not

- Use giant explanatory paragraphs in the application.
- Turn requirements into visible marketing copy.
- Use fake numbers to fill whitespace.
- Use huge empty cards.
- Use emoji as navigation icons.
- Use browser-default buttons.
- Use random colors for every KPI.
- Make every chart a donut chart.

---

# 26. Required Graph Set

Employee Overview should contain, where data is available:

1. Weekly KRA Performance — line chart
2. Monthly KRA Performance — line chart
3. KRA Profile — radar chart
4. Selected KRA Trend — line chart
5. Assigned vs Completed — grouped bar chart
6. Work Mix — bar/donut depending on data volume
7. Workload by Status — stacked bar
8. Quality Trend — line/bar
9. Performance vs Workshop Average — comparison chart

Do not show empty charts with fake values.

If data is unavailable, show a well-designed placeholder:

`Operational KPI will appear after technician-to-job mapping is enabled.`

---

# 27. Data Provenance UI

Every important chart/table should make it possible to understand the source.

Use a compact badge:

- `SOURCE`
- `DERIVED`
- `PROPOSED`

Example:

```text
Weekly KRA Performance   [DERIVED]

Source: KRA Assessment Mechanic
Formula: SUM(6 KRA scores) / 6
```

Do not clutter every screen. Use tooltips/details where appropriate.

---

# 28. Static Demo Data Strategy

The first implementation is a high-fidelity static demo.

It may use local mock objects generated from the supplied Excel records.

However:

- Mock objects must reflect real source data.
- Names/vehicles/job cards must not be invented when source records are available.
- Derived values must be reproducible.
- Proposed values must remain visibly proposed.
- No backend is required for the first demo.

The architecture should make it easy to replace static data with API/database data later.

---

# 29. Acceptance Checklist — Employee Intelligence

## Source Accuracy

- [ ] Exact six Mechanic KRA fields used.
- [ ] Scores are 1–5.
- [ ] Weekly formula is SUM/6.
- [ ] Monthly formula averages weekly scores for employee + month + year.
- [ ] VISHWAJEET June data matches source.
- [ ] June monthly average displays approximately 3.54, not 3.83.
- [ ] No arbitrary KRA weightages.

## Employee Analytics

- [ ] Employee profile is polished.
- [ ] Weekly graph exists.
- [ ] Monthly graph exists.
- [ ] Week selection works visually.
- [ ] Month selection works visually.
- [ ] Graph point click drills to period.
- [ ] KRA radar exists.
- [ ] Individual KRA trend exists.
- [ ] Previous-period comparison exists where data supports it.
- [ ] Workshop comparison exists where data supports it.

## Work Management

- [ ] Currently Assigned section exists.
- [ ] In Progress section exists.
- [ ] Waiting section exists.
- [ ] Completed section exists.
- [ ] Work History exists.
- [ ] Job Card detail exists.
- [ ] Service/work type analysis exists.
- [ ] Workload graph exists.
- [ ] Assigned vs Completed graph exists.
- [ ] Employee-to-job attribution is clearly distinguished from source data.
- [ ] No fake current assignments.

## Productivity

- [ ] Job Cards Completed KPI exists.
- [ ] Labour Generated KPI exists.
- [ ] Average TAT KPI exists.
- [ ] Repeat/Rework KPI exists.
- [ ] KPI formulas are documented.
- [ ] Missing operational data does not produce fake numbers.

## Quality

- [ ] Repeat/Rework view exists.
- [ ] Customer feedback view exists where source data supports it.
- [ ] Breakdown/complaint linkage is not falsely attributed to technicians.

## Incentive

- [ ] Mechanic formula correct.
- [ ] Multiplier table correct.
- [ ] Role-specific incentive policy.
- [ ] No universal incentive formula.

## UX

- [ ] Desktop layout looks professional at 1440px.
- [ ] Sidebar does not overlap content.
- [ ] No raw HTML/default browser controls.
- [ ] No text collisions.
- [ ] No excessive empty space.
- [ ] Tables look production quality.
- [ ] Charts are readable.
- [ ] Filters are visually coherent.
- [ ] Detail drawers/pages are coherent.
- [ ] Navigation is consistent.

## Technical QA

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] No TypeScript errors.
- [ ] No console errors during demo navigation.
- [ ] No broken routes.
- [ ] No missing assets.
- [ ] Existing functionality is not unnecessarily destroyed.

---

# 30. Implementation Order

Do not build everything at once.

### Phase A — Application shell

1. Inspect existing repository.
2. Preserve useful existing components.
3. Establish professional shell.
4. Establish sidebar/topbar.
5. Establish design tokens.

### Phase B — Employee Overview

1. Employee header.
2. Period selectors.
3. KPI cards.
4. Weekly graph.
5. Monthly graph.
6. Radar chart.

### Phase C — KRA

1. KRA table.
2. Weekly detail.
3. Monthly detail.
4. KRA trend.
5. Week/month drilldown.

### Phase D — Work Management

1. Currently Assigned.
2. In Progress.
3. Waiting.
4. Completed.
5. Work History.
6. Job detail.
7. Work Mix.
8. Workload graphs.

### Phase E — Productivity & Quality

1. Objective KPI cards.
2. Target vs actual.
3. TAT.
4. Repeat/Rework.
5. Quality.
6. Workshop comparison.

### Phase F — Incentive

1. Policy.
2. Employee incentive preview.
3. Role-specific policy.

### Phase G — QA

1. Lint.
2. Build.
3. Desktop visual QA.
4. Route QA.
5. Data accuracy QA.
6. Fix all issues.

---

# 31. Codex Operating Instructions

Before editing:

1. Inspect the existing codebase.
2. Read `A.md` completely.
3. Inspect package.json and existing UI dependencies.
4. Inspect existing pages/components/styles.
5. Do not rewrite the application blindly.

During implementation:

1. Build reusable components.
2. Keep data objects separate from presentation.
3. Use typed interfaces/types for employee/KRA/job/work records.
4. Keep source/derived/proposed metadata in the data model.
5. Avoid duplicated UI code.
6. Use real source terminology.
7. Use actual source records for the demo.

After implementation:

1. Run lint.
2. Run build.
3. Fix all errors.
4. Inspect all main routes visually.
5. Check 1440px desktop.
6. Check 1280px desktop.
7. Check sidebar/content alignment.
8. Check charts.
9. Check tables.
10. Check period filters.
11. Check drilldowns.
12. Check that no fake numbers appear.

Do not declare completion merely because the code compiles.

The final result must look like a **credible enterprise product demo** that a dealership owner can understand in a few minutes.

---

# 32. Definition of Done

The Employee Intelligence module is done only when a user can visually follow this journey:

```text
Employee
   ↓
Select Month
   ↓
See Monthly Performance
   ↓
See Weekly Trend
   ↓
Click Week
   ↓
See Six KRA Scores
   ↓
See KRA Radar
   ↓
Open Work Management
   ↓
See Current Assignments
   ↓
See Completed Work
   ↓
Open Job Card
   ↓
See Service / Parts / Labour / Invoice
   ↓
See Productivity
   ↓
See Quality
   ↓
See Incentive
   ↓
See Manager Action
```

The user must be able to understand both:

**“How is this employee performing?”**

and

**“What work is this employee actually doing?”**

without leaving the Employee Intelligence area.

That is the core experience to optimize for.
