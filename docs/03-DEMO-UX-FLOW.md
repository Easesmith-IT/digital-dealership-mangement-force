# Demo UX Flow

## Goal

The demo should answer one client question:

> What will I actually get from this system that I am not already getting from Force/Zoho?

The answer is visible consolidation and intelligence around dealership data, especially employee evaluation, incentives and reporting.

## Global shell

Sidebar:

**Dealer Intelligence**

- Overview
- Data Hub
- Employee Intelligence
  - Evaluation
  - History
  - Ranking
  - Incentive
- Reports
  - Workshop
  - Daily Workshop
  - Breakdown
  - FML / Claims
  - Employee KPI
  - Incentive
- Customer Intelligence
- Management Attention

Top bar:

- dealership/workshop context
- selected period
- search
- notifications/attention count
- user/profile placeholder

## Screen 1 — Overview

Do not make this a generic wall of KPI cards.

Hero message:

**Your dealership data, structured into one management system.**

Visual pipeline:

Excel / FDMS / PDFs / Manual Data
→ Data Hub
→ Reports & Intelligence
→ Management Action

Show source cards:

- Workshop Reporting
- Employee Evaluation
- Incentive
- Breakdown Tracking
- FML / Claims

Show a small management summary underneath.

## Screen 2 — Data Hub

Show source files as cards/table:

- file name
- sheet
- record coverage if known
- import/source status
- last source date if known

Each source can open a preview.

Visual flow:

Source → Validation → Structured Record → Report

Do not imply live FDMS integration in the static demo.

## Screen 3 — Employee Evaluation

This is the hero module.

Header:

Employee Evaluation

Filters:

- Month
- Year
- Week No.
- Department
- Employee

Employee card:

- Employee name
- Role
- selected month/week
- Source badge

Mechanic KRA table must use exact source labels:

1. Technical Knowledge
2. Kaam Sekhne ki koshish
3. Bay Cleanliness
4. Uniform
5. Punctuality - Time par aana
6. Repeat job nahin aana

Show score 1–5.

Show Final Score clearly as DERIVED.

## Screen 4 — Employee History

Show weekly trend for the selected employee.

Rows:

- six KRA criteria
- Final Score

Columns:

- Week 1
- Week 2
- Week 3
- Week 4

Show monthly average separately.

## Screen 5 — Employee Ranking

Show:

- Rank
- Employee
- Average for month
- Trend
- Grade

Grade is PROPOSED unless a source policy explicitly defines it.

Do not make the proposed grade look like an existing Excel field.

## Screen 6 — Incentive

Tabs or role selector:

- Mechanic / Electrician
- Floor Advisor
- CRE Srishti
- CRE Dipti

Mechanic section must display the source formula and multiplier table.

Floor Advisor must display its actual labour target bands.

CRE must display its actual person-specific target bands.

Use a calculation preview card but show `—` for unavailable input values.

## Screen 7 — Reports Home

Report groups:

### Workshop
Job Card Report
Daily Workshop Report

### Employee
Employee KPI Report
Incentive Report

### Breakdown
Breakdown Report
Breakdown Aging

### Claims
FML / Claim Report
Claim Aging

### Customer
Customer / Vehicle Search

Each report card should show:

- report name
- purpose
- source
- available filters

## Screen 8 — Workshop Report

Professional dense table.

Columns should use actual Job Card source fields.

Allow visual filters for date/month/year/service/customer category.

Click row → detail drawer showing all relevant fields.

## Screen 9 — Daily Workshop Report

Show derived measures from Job Card:

- Total Job Cards
- Labour Sale
- Spare Sale
- Total Sale
- Workshop Collection

Clearly mark derived values.

## Screen 10 — Breakdown

Table fields should follow Daily service Tracker.

Use filters:

- status
- supervisor
- vehicle type
- aging

Detail view should show complaint, customer, vehicle, response, closure, supervisor, satisfaction, remarks, SPO and parts dates where available.

## Screen 11 — FML / Claims

Use actual claim fields.

Show:

- claim number
- invoice
- claim type
- status
- invoice value
- passed amount
- rejected amount
- payment date
- remarks

## Screen 12 — Customer Intelligence

Search actual source customer/vehicle values.

Show:

Customer
Vehicle
Model
Customer Category
Job Card History
Invoice references

Only show breakdown/claims/history where actual relationship exists.

## Screen 13 — Management Attention

This is PROPOSED.

Cards may represent:

- old/open breakdown
- claim aging
- employee performance change
- missing data
- customer follow-up opportunity

Every card must be traceable to a source or derived record when the real implementation is built.

## Interaction standard

The static demo should feel functional:

- navigation works
- filters change displayed demo state where practical
- employee selection changes profile content
- report rows open detail drawers
- tabs work
- search works against demo records
- badges and status controls respond visually

No backend required.

## Visual standard

Do not leave large empty panels.

Every page should have:

- meaningful title
- context
- filters
- useful content
- table/card/detail area
- consistent spacing

Use realistic table density. This is dealership management software, not a marketing landing page.
