# Codex Start Here — Digital Dealership Intelligence Demo

## Mission

Build a high-fidelity, static demo of a dealership intelligence platform for Force Motors dealer operations.

This is **not a replacement DMS** and must not compete visually or functionally with Force FDMS/Zoho floor management or stock management.

The product proposition is:

> Existing dealership data → structured dealer data → reporting → employee intelligence → incentive intelligence → customer intelligence → management action.

The current demo is visual only. Do not introduce a backend, authentication, real FDMS/Zoho APIs, WhatsApp sending, or production workflows unless explicitly requested later.

## Repository

`Easesmith-IT/digital-dealership-mangement-force`

## Current stack

- Next.js App Router
- TypeScript
- Existing `app/page.tsx`
- Existing `app/globals.css`
- Keep the current project runnable.

## Priority order

### P1 — Employee Intelligence
1. Employee Evaluation
2. Employee History
3. Employee Ranking
4. Incentive Policy
5. Incentive Calculation Preview

### P2 — Data & Reports
1. Data Hub / source files
2. Workshop / Job Card Report
3. Daily Workshop Report
4. Breakdown Report
5. FML / Claims Report
6. Employee KPI Report
7. Incentive Report
8. Customer / Vehicle Search

### P3 — Management Intelligence
1. Data Quality
2. Management Attention / Action Centre
3. Opportunity / Leakage views

P3 is proposal/demo functionality. It must not be presented as existing Excel functionality.

## Non-negotiable source accuracy

There are three data states:

- **SOURCE** = directly present in supplied Excel data.
- **DERIVED** = calculated from SOURCE using a documented formula.
- **PROPOSED** = new product capability not present in the source files.

Never invent a value to fill a dashboard. If source data is unavailable, show `—` or `Not available in imported data`.

Do not silently rename source fields where exact source terminology matters.

## Employee Evaluation source logic

Mechanic KRA criteria are exactly:

1. Technical Knowledge
2. Kaam Sekhne ki koshish
3. Bay Cleanliness
4. Uniform
5. Punctuality - Time par aana
6. Repeat job nahin aana

Each is scored 1–5.

Weekly Final Score:

`SUM(six KRA scores) / 6`

Monthly Average:

`AVERAGE(employee weekly Final Scores for the selected Month + Year)`

Example source record used in the demo:

VISHWAJEET, June 2026:

- Week 1: 3.833333
- Week 2: 3.833333
- Week 3: 2.666667
- Week 4: 3.833333

Monthly average: 3.583333 when all four weekly scores are averaged. Verify the actual workbook values before displaying derived totals.

Do **not** introduce weightages into the existing KRA calculation.

## Incentive source rules

### Mechanic / Electrician

Existing basis:

`10% of (Total Labour generated without GST - (Salary + OT))`

Assessment multipliers:

| Assessment | Multiplier |
|---:|---:|
| 1 | 0.50 |
| 2 | 0.65 |
| 3 | 0.80 |
| 4 | 1.00 |
| 5 | 1.20 |

### Floor Advisor

Monthly labour target bands:

- ₹225,000
- ₹275,000
- ₹325,000
- ₹375,000

Quarterly labour:

- ₹675,000
- ₹825,000
- ₹975,000
- ₹1,125,000

Quarterly incentives:

- ₹3,000
- ₹6,000
- ₹9,000
- ₹16,000

### CRE Srishti

Monthly vehicle reporting targets:

- 440
- 465
- 490
- 515

Quarterly targets:

- 1320
- 1395
- 1470
- 1545

Quarterly incentives:

- ₹3,000
- ₹6,000
- ₹9,000
- ₹12,000

### CRE Dipti

Monthly targets:

- 50
- 60
- 70
- 80

Quarterly targets:

- 150
- 180
- 210
- 240

Use the source workbook to verify the corresponding incentive values before implementation.

## Proposed employee performance layer

A future objective KPI layer may include technician productivity, TAT, repeat/rework, labour generated and attendance, but the current supplied data does not reliably establish technician attribution for all such measures.

Therefore:

- Do not fabricate these metrics.
- Display `—` where unavailable.
- Label future metrics `PROPOSED` or `Awaiting technician attribution`.

If a proposed final performance formula is demonstrated, clearly label it PROPOSED and do not imply it is an existing dealership formula.

## Workshop / Job Card source fields

Use source terminology from `Gazipur workshop reporting Jul 26.xlsx` Job Card sheet, including:

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
- GST on Lobour
- Invoice No
- Total Invoice Value
- Description of Outside Job
- Amount paid for Outside Job
- Day
- Month
- Year

## Breakdown source fields

From `Breakdown tracking.xlsx` / `Daily service Tracker`:

- Complain No
- VehicleRegistrationNo
- ChassisNo
- CustomerName
- CustomerContactnumber
- Customer location
- VehicleType
- VehicleModel
- Complain date
- complain Person
- Customer complain
- No. days Open
- Response Date
- Closer/OPEN
- Supervisor Name/Manager
- VEHICLE ATTEND SUPERVISOR
- Customer satisfaction form signed Y/N
- Remarks
- SPO Order No
- Order Date
- parts receive date

## FML / Claims source fields

From `AMIT UPDATED FML Claim Sheet Feb 26.xlsx` / Data Report sheet:

- GAPL Claim invoice number
- GAPL Internal Claim No
- GAPL Invoice Date
- Invoice Value
- Type of Claim
- Claim status
- Claim Passed Amount
- Rejected Amount
- Payment Date
- Remarks

## Customer / Vehicle

Use actual customers and vehicles from Job Card source data. Customer 360 can link customer → vehicle → Job Card/invoice history where source relationships exist.

Do not invent breakdown, claim or service history for a customer. If no imported relationship exists, show `No imported record available`.

## UX direction

The first screen must communicate the product's real purpose:

**Data Sources → Dealer Data Hub → Reports & Intelligence → Management Action**

Do not lead with a generic SaaS KPI dashboard.

The demo should look like enterprise dealership management software:

- Light theme
- Dense but readable information hierarchy
- Professional tables
- Clear filters
- Search
- Detail drawers/pages
- Source/Derived/Proposed badges
- Consistent status indicators
- No excessive gradients or decorative UI

## Do not build

Do not add major modules for:

- Floor management
- Bay allocation
- Stock management
- Purchase orders
- Full invoicing
- Full accounting

Those are intentionally outside the core differentiator for this demo because OEM/Zoho systems are expected to cover much of that operational area.

## Definition of done

A demo is complete only when:

1. The app looks like a coherent real product, not isolated mock screens.
2. The main navigation works between demo sections.
3. P1 is polished and credible.
4. P2 demonstrates the Excel-to-digital reporting proposition.
5. Actual source terminology is preserved.
6. No unsupported numbers are fabricated.
7. Source/Derived/Proposed states are clear.
8. Existing project builds without TypeScript/lint errors.
9. The UI does not claim that live FDMS/Zoho integration exists.
10. A client can understand the product without the developer explaining every screen.

## Codex working method

Before changing code:

1. Inspect the entire repository and current UI.
2. Read the existing `page.tsx`, `globals.css`, layout and package dependencies.
3. Preserve useful existing components.
4. Implement in small coherent increments.
5. Run the project build/type checks after meaningful changes.
6. Fix errors before continuing.
7. Review the final UI for empty/unfinished states.
8. Do not commit code that has not been checked for build/type errors.

Do not treat a successful Git commit as proof that the implementation works.
