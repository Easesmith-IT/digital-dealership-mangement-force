# Product Requirements — Dealer Intelligence Layer

## 1. Product objective

Provide a management and intelligence layer around the dealership's existing/OEM systems and spreadsheets.

The system should reduce Excel dependency, preserve existing reporting/KPI logic, consolidate dealership history, and turn operational data into management decisions.

## 2. What this product is NOT

For the current proposal/demo, do not position this as:

- a replacement for Force FDMS
- a replacement for Zoho
- a floor-management system
- a stock-management system
- a full accounting system
- a full invoicing system

Those areas may already be covered or expected to be covered by OEM/Zoho software.

## 3. Product pillars

### Pillar A — Dealer Data Hub

Bring agreed Excel/report data into structured records so users do not have to maintain multiple reporting workbooks manually.

Capabilities:

- source registration
- field mapping
- import preview
- validation flags
- duplicate detection
- historical search
- source traceability
- report generation

### Pillar B — Employee Intelligence

Digitize the existing employee evaluation process and add a clearly separated future objective KPI layer.

### Pillar C — Incentive Intelligence

Digitize existing incentive rules by employee group and make the policy visible and auditable.

### Pillar D — Reports & MIS

Replace repetitive Excel-based reporting with filterable management reports.

### Pillar E — Customer Intelligence

Create a searchable customer/vehicle history using available dealership records, with CRM and communication capabilities as the longer-term layer.

### Pillar F — Management Intelligence

Identify exceptions, aging, performance changes, customer opportunities and data-quality issues.

## 4. Employee Evaluation requirements

### Mechanic source KRA

Exact criteria:

- Technical Knowledge
- Kaam Sekhne ki koshish
- Bay Cleanliness
- Uniform
- Punctuality - Time par aana
- Repeat job nahin aana

Rating: 1–5.

Weekly Final Score = sum of six scores / 6.

Monthly Average = average of weekly Final Scores for selected month/year.

### Service Advisor source KRA

The source workbook has four criteria:

- Cleanliness - Upkeep on Floor
- Communication with customer whtsapp Group
- Team - Technician Uniform and Discipline
- Customer Feedback

Use the same source rating approach where supported by the workbook.

### Employee views

1. Employee list
2. Employee detail
3. Weekly assessment
4. Monthly history
5. KRA trend
6. Ranking
7. Incentive view

Ranking/grade beyond the source score is proposed functionality and must be labelled as such.

## 5. Incentive requirements

### Mechanic / Electrician

Formula from source:

`10% of (Total Labour generated without GST - (Salary + OT))`

Assessment multiplier:

1 → 0.50
2 → 0.65
3 → 0.80
4 → 1.00
5 → 1.20

### Floor Advisor

Use the source monthly labour target bands and quarterly incentive values. Do not generalize the mechanic formula to this role.

### CRE

Use role/person-specific target bands present in the source workbook. Do not combine Srishti and Dipti into one policy if their source targets differ.

## 6. Reports requirements

### Workshop / Job Card Report

Use actual Job Card source fields.

Required filters for demo:

- date
- month
- year
- service type
- customer category
- vehicle model

Required views:

- register
- detail
- totals/summary

### Daily Workshop Report

Derived from Job Card data where supported.

Core source/derived measures:

- Total Job Cards
- Labour Sale
- Spare Sale
- Total Sale
- Workshop Collection

### Breakdown Report

Use the Daily service Tracker fields.

Required filters:

- status
- supervisor
- vehicle type
- aging

### FML / Claims Report

Use actual claim fields.

Required filters:

- claim type
- claim status
- month/year

### Employee KPI Report

Show weekly/monthly KRA scores and derived averages.

### Incentive Report

Show applicable policy, target, assessment, multiplier and incentive status. Do not calculate missing salary/OT/labour data.

### Customer / Vehicle Report

Search by:

- Customer Name
- Customer Phone Number
- Vehicle number
- Vehicle Model

## 7. Customer intelligence requirements

Customer 360 should be based only on relationships supported by imported data.

Potential sections:

- customer details
- vehicle details
- job card history
- invoice references
- breakdown history where linked
- claims where linked
- feedback where linked

Future/proposed capabilities:

- service reminders
- follow-up assignment
- WhatsApp communication
- appointment follow-up
- customer retention opportunities

## 8. Management intelligence requirements

Proposed capabilities:

- management attention list
- aging exceptions
- employee performance exceptions
- claim aging
- breakdown aging
- customer follow-up opportunities
- data-quality exceptions
- opportunity/leakage dashboard

Every proposed insight must be traceable to source records once implemented.

## 9. Source traceability requirement

Every imported record should eventually retain:

- source file
- source sheet
- source row/reference where technically practical
- import timestamp
- normalized record ID

This prevents the platform from becoming another opaque spreadsheet.

## 10. Demo-only constraints

For the current demo:

- static data is acceptable
- navigation should work
- interactions can be simulated
- no backend is required
- no live integration is required
- no real messaging is required

But all displayed data must be source-backed or explicitly labelled proposed.
