# Acceptance Checklist — Codex

## Before implementation

- [ ] Inspect current repository structure.
- [ ] Inspect existing `app/page.tsx`.
- [ ] Inspect `app/globals.css`.
- [ ] Inspect `app/layout.tsx`.
- [ ] Inspect `package.json` and installed UI dependencies.
- [ ] Reuse existing components where appropriate.

## Product accuracy

- [ ] Product is positioned as a dealer intelligence layer, not a replacement DMS.
- [ ] No major Floor Management module.
- [ ] No major Stock Management module.
- [ ] No false FDMS integration claim.
- [ ] No false Zoho integration claim.

## Employee Evaluation

- [ ] Mechanic KRA uses exactly six source criteria.
- [ ] Each criterion is 1–5.
- [ ] Weekly score is SUM of six / 6.
- [ ] Monthly average is average of weekly Final Scores for selected month/year.
- [ ] No invented KRA weightage.
- [ ] Service Advisor KRA uses its own source criteria.
- [ ] Proposed grades are clearly labelled proposed.
- [ ] Proposed objective KPIs are not populated with fabricated values.

## Incentive

- [ ] Mechanic/Electrician formula is shown exactly.
- [ ] Assessment multipliers are source-aligned.
- [ ] Floor Advisor targets remain separate.
- [ ] CRE targets remain role/person-specific.
- [ ] Missing labour/salary/OT data is not fabricated.

## Reports

- [ ] Workshop report uses actual Job Card fields.
- [ ] Daily report is derived from Job Card where supported.
- [ ] Breakdown report uses Daily service Tracker fields.
- [ ] FML report uses Data Report fields.
- [ ] Customer search uses actual source fields.
- [ ] Missing relationships are shown as unavailable rather than invented.

## Data integrity

- [ ] SOURCE / DERIVED / PROPOSED states are distinguishable.
- [ ] No unsupported number appears as a factual dealership KPI.
- [ ] Dates are not mixed across workbooks without a clear period/filter.
- [ ] Source sheet names are retained in Data Hub/report metadata.
- [ ] Sample records are traceable to source files.

## UX quality

- [ ] No major empty/blank sections.
- [ ] Navigation is coherent.
- [ ] Tables are dense enough for real management use.
- [ ] Detail views contain meaningful information.
- [ ] Filters have visible context.
- [ ] Typography and spacing are consistent.
- [ ] Desktop view is polished.
- [ ] Responsive behavior does not break the primary screens.

## Technical quality

- [ ] TypeScript passes.
- [ ] Lint passes or known existing lint issues are documented.
- [ ] Production build passes.
- [ ] No console errors caused by the new demo.
- [ ] No broken imports.
- [ ] No unused mock architecture that suggests a backend is already connected.

## Client-demo acceptance

A client unfamiliar with the implementation should be able to understand these statements from the UI alone:

1. Their existing Excel/report data can be brought into one place.
2. Their existing employee evaluation process is preserved digitally.
3. Incentive rules can be represented transparently.
4. Reports can be searched instead of manually rebuilding Excel reports.
5. Customer/vehicle history can be consolidated where data exists.
6. Future intelligence can sit alongside, rather than replace, the OEM/Zoho operational system.
