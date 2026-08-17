# Data Dictionary — Source-Aligned Demo

This document defines the minimum source-aligned fields for the demo. It is not a final production database schema.

## A. Employee KRA — Mechanic

| Field | Meaning | State |
|---|---|---|
| Employee / Mechanic | Person being assessed | SOURCE |
| Month | Assessment month | SOURCE |
| Year | Assessment year | SOURCE |
| Week No. | Assessment week | SOURCE |
| Technical Knowledge | 1–5 | SOURCE |
| Kaam Sekhne ki koshish | 1–5 | SOURCE |
| Bay Cleanliness | 1–5 | SOURCE |
| Uniform | 1–5 | SOURCE |
| Punctuality - Time par aana | 1–5 | SOURCE |
| Repeat job nahin aana | 1–5 | SOURCE |
| Final Score | Six scores / 6 | DERIVED |
| Average for month | Average of weekly final scores | DERIVED |
| Grade | Future grading layer | PROPOSED |

## B. Service Advisor KRA

| Field | State |
|---|---|
| Cleanliness - Upkeep on Floor | SOURCE |
| Communication with customer whtsapp Group | SOURCE |
| Team - Technician Uniform and Discipline | SOURCE |
| Customer Feedback | SOURCE |
| Score / assessment | SOURCE |

## C. Job Card

| Field |
|---|
| Job Card Opening Date |
| Job Card Closing Date |
| Job Card No |
| Customer Name |
| Customer Phone Number |
| Vehicle number |
| Vehicle Model |
| Customer category |
| Type Of Service |
| Part Code Issued |
| Part Description |
| Part Qty |
| Part MRP |
| Part Value |
| Labour Charges |
| Electrical Labour |
| Outside Labour |
| Laptop Charges |
| Deputation |
| Other charges |
| Total Labour |
| GST on Lobour |
| Invoice No |
| Total Invoice Value |
| Description of Outside Job |
| Amount paid for Outside Job |
| Day |
| Month |
| Year |

## D. Breakdown — Daily service Tracker

| Field |
|---|
| Complain No |
| VehicleRegistrationNo |
| ChassisNo |
| CustomerName |
| CustomerContactnumber |
| Customer location |
| VehicleType |
| VehicleModel |
| Complain date |
| complain Person |
| Customer complain |
| No. days Open |
| Response Date |
| Closer/OPEN |
| Supervisor Name/Manager |
| VEHICLE ATTEND SUPERVISOR |
| Customer satisfaction form signed Y/N |
| Remarks |
| SPO Order No |
| Order Date |
| parts receive date |

## E. FML / Claims — Data Report

| Field |
|---|
| GAPL Claim invoice number |
| GAPL Internal Claim No |
| GAPL Invoice Date |
| Invoice Value |
| Type of Claim |
| Claim status |
| Claim Passed Amount |
| Rejected Amount |
| Payment Date |
| Remarks |

## F. Incentive policy

Mechanic / Electrician:

`10% of (Total Labour generated without GST - (Salary + OT))`

Assessment multipliers:

| Assessment | Multiplier |
|---:|---:|
| 1 | 0.50 |
| 2 | 0.65 |
| 3 | 0.80 |
| 4 | 1.00 |
| 5 | 1.20 |

Floor Advisor and CRE policies must remain role-specific according to the source workbook.

## Data classification

### SOURCE
Present directly in an uploaded workbook.

### DERIVED
Produced from SOURCE using a documented formula or aggregation.

### PROPOSED
New product capability. It must not be represented as an existing source value.

## Missing data behavior

Use one of:

- `—`
- `Not available in imported data`
- `Awaiting attribution`

Never create a plausible-looking number to fill a blank.
