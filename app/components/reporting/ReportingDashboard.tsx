"use client";

import { useMemo, useState } from "react";
import {
  breakdownSourceSummary,
  claimMonthlySeries,
  claimsSourceSummary,
  historicalJobCards,
  managementActions,
  operationalExceptions,
  operationalJobs,
  reportingSourceRange,
  sourceBreakdowns,
  sourceClaims,
  workshopMonthlySeries,
  workshopSourceSummary,
  workshopTatSeries,
} from "../../data/reporting-data";
import type { DataProvenance } from "../../types/employee";
import type {
  ReportingCompareMode,
  ReportingPreset,
  ReportingViewMode,
} from "../../types/reporting";
import { ProvenanceBadge } from "../common/Badge";
import { DrilldownDrawer } from "./DrilldownDrawer";
import { ReportFilters } from "./ReportFilters";

type DrawerState = {
  title: string;
  subtitle: string;
  columns: string[];
  rows: string[][];
} | null;

type FilterState = {
  preset: ReportingPreset;
  month: string;
  week: string;
  serviceType: string;
  vehicleModel: string;
  status: string;
  compare: ReportingCompareMode;
  view: ReportingViewMode;
};

const initialFilters: FilterState = {
  preset: "sourcePeriod",
  month: "All Months",
  week: "All Weeks",
  serviceType: "All Service Types",
  vehicleModel: "All Models",
  status: "All Statuses",
  compare: "Previous Period",
  view: "Monthly",
};

const sourceStart = new Date(`${reportingSourceRange.start}T00:00:00`);
const sourceEnd = new Date(`${reportingSourceRange.end}T00:00:00`);

export function ReportingDashboard() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [drawer, setDrawer] = useState<DrawerState>(null);

  const months = useMemo(
    () => [
      "All Months",
      ...workshopMonthlySeries.map((item) => item.label),
      ...claimMonthlySeries.map((item) => item.label),
    ].filter((value, index, items) => items.indexOf(value) === index),
    [],
  );

  const weeks = useMemo(
    () => ["All Weeks", "Week 51", "Week 52", "Week 1", "Week 2", "Week 3", "Week 4"],
    [],
  );

  const serviceTypes = useMemo(
    () => ["All Service Types", ...Object.keys(workshopSourceSummary.serviceMix)],
    [],
  );

  const vehicleModels = useMemo(
    () => ["All Models", ...Object.keys(workshopSourceSummary.vehicleMix)],
    [],
  );

  const statuses = [
    "All Statuses",
    "Active",
    "Waiting",
    "Overdue",
    "QC Pending",
    "Ready for Delivery",
    "Open",
    "Close",
    "Accepted",
    "Rejected",
    "Partial/Rejected",
  ];

  const filteredJobs = useMemo(() => {
    return historicalJobCards.filter((job) => {
      const jobDate = new Date(`${job.openDate}T00:00:00`);
      const inPreset = isInPreset(jobDate, filters.preset);
      const inMonth = filters.month === "All Months" || monthLabel(job.openDate) === filters.month;
      const inService = filters.serviceType === "All Service Types" || job.serviceType === filters.serviceType;
      const inModel = filters.vehicleModel === "All Models" || job.vehicleModel === filters.vehicleModel;
      const inWeek = filters.week === "All Weeks" || isoWeekLabel(jobDate) === filters.week;
      return inPreset && inMonth && inService && inModel && inWeek;
    });
  }, [filters]);

  const filteredOperational = useMemo(() => {
    return operationalJobs.filter((job) => {
      const matchesStatus = filters.status === "All Statuses" || job.status === filters.status;
      const matchesService =
        filters.serviceType === "All Service Types" || job.serviceType === filters.serviceType;
      const matchesModel =
        filters.vehicleModel === "All Models" ||
        job.vehicleNumber.includes(filters.vehicleModel) ||
        job.stage.includes(filters.vehicleModel);
      return matchesStatus && matchesService && matchesModel;
    });
  }, [filters]);

  const filteredBreakdowns = useMemo(() => {
    return sourceBreakdowns.filter((item) => {
      const recordDate = new Date(`${item.complaintDate}T00:00:00`);
      const inPreset = isInPreset(recordDate, filters.preset);
      const inMonth = filters.month === "All Months" || monthLabel(item.complaintDate) === filters.month;
      const matchesStatus = filters.status === "All Statuses" || item.status === filters.status;
      return inPreset && inMonth && matchesStatus;
    });
  }, [filters]);

  const filteredClaims = useMemo(() => {
    return sourceClaims.filter((item) => {
      const recordDate = new Date(`${item.invoiceDate}T00:00:00`);
      const inPreset = isInPreset(recordDate, filters.preset);
      const inMonth = filters.month === "All Months" || monthLabel(item.invoiceDate) === filters.month;
      const matchesStatus = filters.status === "All Statuses" || item.claimStatus === filters.status;
      return inPreset && inMonth && matchesStatus;
    });
  }, [filters]);

  const currentStatusCards = [
    {
      label: "Vehicles Currently In Workshop",
      value: filteredOperational.length,
      note: "Demo live queue",
      provenance: "PROPOSED" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "Vehicles Currently In Workshop",
          "DEMO / PROPOSED live operational queue",
          ["Job Card", "Vehicle", "Customer", "Stage", "Status", "Owner"],
          filteredOperational.map((job) => [
            job.jobCardNo,
            job.vehicleNumber,
            job.customerName,
            job.stage,
            job.status,
            job.assignedOwner,
          ]),
        ),
    },
    {
      label: "Active Job Cards",
      value: filteredOperational.filter((job) => job.status === "Active").length,
      note: "Demo live queue",
      provenance: "PROPOSED" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "Active Job Cards",
          "DEMO / PROPOSED stage capture",
          ["Job Card", "Vehicle", "Customer", "Stage", "Age"],
          filteredOperational
            .filter((job) => job.status === "Active")
            .map((job) => [job.jobCardNo, job.vehicleNumber, job.customerName, job.stage, `${job.ageDays}d`]),
        ),
    },
    {
      label: "Waiting",
      value: filteredOperational.filter((job) => job.status === "Waiting").length,
      note: "Demo live queue",
      provenance: "PROPOSED" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "Jobs Waiting",
          "DEMO / PROPOSED operational capture",
          ["Job Card", "Vehicle", "Customer", "Reason", "Owner"],
          filteredOperational
            .filter((job) => job.status === "Waiting")
            .map((job) => [
              job.jobCardNo,
              job.vehicleNumber,
              job.customerName,
              job.waitingReason ?? "Awaiting reason",
              job.assignedOwner,
            ]),
        ),
    },
    {
      label: "Overdue",
      value: filteredOperational.filter((job) => job.status === "Overdue").length,
      note: "Demo live queue",
      provenance: "PROPOSED" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "Overdue Jobs",
          "DEMO / PROPOSED live queue",
          ["Job Card", "Vehicle", "Customer", "Stage", "Age"],
          filteredOperational
            .filter((job) => job.status === "Overdue")
            .map((job) => [job.jobCardNo, job.vehicleNumber, job.customerName, job.stage, `${job.ageDays}d`]),
        ),
    },
    {
      label: "QC Pending",
      value: filteredOperational.filter((job) => job.status === "QC Pending").length,
      note: "Demo live queue",
      provenance: "PROPOSED" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "QC Pending",
          "DEMO / PROPOSED live queue",
          ["Job Card", "Vehicle", "Customer", "Stage", "Owner"],
          filteredOperational
            .filter((job) => job.status === "QC Pending")
            .map((job) => [job.jobCardNo, job.vehicleNumber, job.customerName, job.stage, job.assignedOwner]),
        ),
    },
    {
      label: "Ready for Delivery",
      value: filteredOperational.filter((job) => job.status === "Ready for Delivery").length,
      note: "Demo live queue",
      provenance: "PROPOSED" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "Ready for Delivery",
          "DEMO / PROPOSED live queue",
          ["Job Card", "Vehicle", "Customer", "Stage", "Owner"],
          filteredOperational
            .filter((job) => job.status === "Ready for Delivery")
            .map((job) => [job.jobCardNo, job.vehicleNumber, job.customerName, job.stage, job.assignedOwner]),
        ),
    },
    {
      label: "Open Breakdowns",
      value: filteredBreakdowns.filter((item) => item.status === "Open").length,
      note: "Breakdown register",
      provenance: "SOURCE" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "Open Breakdowns",
          "SOURCE · Breakdown tracking.xlsx",
          ["Complaint", "Vehicle", "Customer", "Days Open", "SPO"],
          filteredBreakdowns
            .filter((item) => item.status === "Open")
            .map((item) => [
              item.complaintNo,
              item.vehicleNumber,
              item.customerName,
              `${item.daysOpen}`,
              item.spoOrderNo || "--",
            ]),
        ),
    },
    {
      label: "Pending Claims",
      value: filteredClaims.filter((item) => item.claimStatus.toLowerCase().includes("pending")).length,
      note: "No pending rows in current cleaned claim slice",
      provenance: "SOURCE" as DataProvenance,
      onClick: () =>
        openDrawer(
          setDrawer,
          "Pending Claims",
          "SOURCE · Cleaned claim rows",
          ["Claim", "Type", "Status", "Invoice Value", "Payment Date"],
          filteredClaims
            .filter((item) => item.claimStatus.toLowerCase().includes("pending"))
            .map((item) => [
              item.claimInvoiceNumber,
              item.claimType,
              item.claimStatus,
              formatCurrency(item.invoiceValue),
              item.paymentDate || "--",
            ]),
        ),
    },
  ];

  const flowStages = ["Received", "Diagnosis", "Repair", "QC", "Washing", "Ready", "Delivered"];
  const flowCounts = {
    Received: filteredOperational.filter((job) => job.stage === "Received").length,
    Diagnosis: filteredOperational.filter((job) => job.stage === "Diagnosis").length,
    Repair: filteredOperational.filter((job) => job.stage === "Repair").length,
    QC: filteredOperational.filter((job) => job.stage === "QC").length,
    Washing: filteredOperational.filter((job) => job.stage === "Washing").length,
    Ready: filteredOperational.filter((job) => job.stage === "Ready").length,
    Delivered: 0,
  };

  const workshopLoad = [
    ["Active", filteredOperational.filter((job) => job.status === "Active").length],
    ["Waiting", filteredOperational.filter((job) => job.status === "Waiting").length],
    ["Overdue", filteredOperational.filter((job) => job.status === "Overdue").length],
    ["QC Pending", filteredOperational.filter((job) => job.status === "QC Pending").length],
    ["Ready", filteredOperational.filter((job) => job.status === "Ready for Delivery").length],
  ] as const;

  const displayedThroughput =
    filters.month === "All Months"
      ? workshopMonthlySeries
      : workshopMonthlySeries.filter((item) => item.label === filters.month);

  const displayedClaimsTrend =
    filters.month === "All Months"
      ? claimMonthlySeries
      : claimMonthlySeries.filter((item) => item.label === filters.month);

  const displayedTat =
    filters.month === "All Months"
      ? workshopTatSeries
      : workshopTatSeries.filter((item) => item.label === filters.month);

  const serviceMixEntries = Object.entries(workshopSourceSummary.serviceMix);
  const maxServiceMix = Math.max(...serviceMixEntries.map(([, value]) => value));
  const throughputTrend = workshopMonthlySeries.map((item) => ({
    label: item.label,
    value: item.closed - item.opened,
  }));
  const claimStatusRows: Array<[string, number]> = [
    ["Accepted", claimsSourceSummary.accepted],
    ["Rejected", claimsSourceSummary.rejected],
    ["Partial/Rejected", claimsSourceSummary.partialRejected],
    ["Invalid / #VALUE!", claimsSourceSummary.invalidStatus],
  ];
  const operationalStageRows: Array<[string, number]> = [
    ["Received", flowCounts.Received],
    ["Diagnosis", flowCounts.Diagnosis],
    ["Repair", flowCounts.Repair],
    ["QC", flowCounts.QC],
    ["Washing", flowCounts.Washing],
    ["Ready", flowCounts.Ready],
  ];
  const claimComposition = [
    { label: "Passed", value: claimsSourceSummary.passedTotal, tone: "cool" as const },
    { label: "Rejected", value: claimsSourceSummary.rejectedTotal, tone: "warm" as const },
    {
      label: "Unresolved Delta",
      value: Math.max(0, claimsSourceSummary.invoiceTotal - claimsSourceSummary.passedTotal - claimsSourceSummary.rejectedTotal),
      tone: "neutral" as const,
    },
  ];
  const revenueComposition = [
    { label: "Labour", value: workshopSourceSummary.labourTotal, tone: "cool" as const },
    {
      label: "Balance Invoice",
      value: Math.max(0, workshopSourceSummary.invoiceTotal - workshopSourceSummary.labourTotal),
      tone: "neutral" as const,
    },
  ];
  const managementPulse = [
    { label: "Claims Review", value: claimsSourceSummary.partialRejected + claimsSourceSummary.invalidStatus, target: 75 },
    { label: "Breakdown Risk", value: breakdownSourceSummary.aboveSla, target: 8 },
    { label: "Throughput Stress", value: operationalExceptions.find((item) => item.id === "tat")?.count ?? 0, target: 20 },
  ];

  return (
    <div className="reporting-dashboard">
      <ReportFilters
        filters={filters}
        months={months}
        weeks={weeks}
        serviceTypes={serviceTypes}
        vehicleModels={vehicleModels}
        statuses={statuses}
        onPresetChange={(preset) => setFilters((current) => ({ ...current, preset }))}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
      />

      <section className="reporting-hero">
        <div className="reporting-hero-main">
          <div className="reporting-command-head">
            <div>
              <p className="reporting-eyebrow">Management Command Deck</p>
              <h2>Workshop control signals</h2>
            </div>
            <div className="reporting-command-chip">
              <span>Filtered Period</span>
              <strong>{filters.month === "All Months" ? "Source Range" : filters.month}</strong>
            </div>
          </div>
          <div className="reporting-hero-metrics">
            <HeroMetric
              label="Historical Job Cards"
              value={`${workshopSourceSummary.totalJobCards}`}
              note="SOURCE"
              tone="navy"
              onClick={() =>
                openDrawer(
                  setDrawer,
                  "Historical Job Cards",
                  "SOURCE · Job card source slice",
                  ["Job Card", "Customer", "Vehicle", "Service", "Invoice"],
                  historicalJobCards.map((job) => [
                    job.jobCardNo,
                    job.customerName,
                    job.vehicleNumber || "--",
                    job.serviceType,
                    formatCurrency(job.invoiceValue),
                  ]),
                )
              }
            />
            <HeroMetric
              label="Open Breakdowns"
              value={`${breakdownSourceSummary.open}`}
              note="SOURCE"
              tone="cyan"
              onClick={() =>
                openDrawer(
                  setDrawer,
                  "Open Breakdown Cases",
                  "SOURCE · Breakdown tracking.xlsx",
                  ["Complaint", "Vehicle", "Customer", "Days Open", "Status"],
                  sourceBreakdowns
                    .filter((item) => item.status === "Open")
                    .map((item) => [
                      item.complaintNo,
                      item.vehicleNumber,
                      item.customerName,
                      `${item.daysOpen}`,
                      item.status,
                    ]),
                )
              }
            />
            <HeroMetric
              label="Claims Rows"
              value={`${claimsSourceSummary.total}`}
              note="SOURCE"
              tone="violet"
              onClick={() =>
                openDrawer(
                  setDrawer,
                  "Claims Register",
                  "SOURCE · Clean claim slice",
                  ["Claim", "Type", "Status", "Invoice"],
                  sourceClaims.map((item) => [
                    item.claimInvoiceNumber,
                    item.claimType,
                    item.claimStatus,
                    formatCurrency(item.invoiceValue),
                  ]),
                )
              }
            />
            <HeroMetric
              label="Current Operational Queue"
              value={`${filteredOperational.length}`}
              note="DEMO / PROPOSED"
              tone="amber"
              onClick={() =>
                openDrawer(
                  setDrawer,
                  "Operational Queue",
                  "DEMO / PROPOSED live queue",
                  ["Job Card", "Vehicle", "Customer", "Stage", "Status"],
                  filteredOperational.map((job) => [
                    job.jobCardNo,
                    job.vehicleNumber,
                    job.customerName,
                    job.stage,
                    job.status,
                  ]),
                )
              }
            />
          </div>
          <div className="reporting-command-strip">
            <CommandBand
              label="Throughput Stress"
              value={operationalExceptions.find((item) => item.id === "tat")?.count ?? 0}
              max={20}
              tone="navy"
            />
            <CommandBand
              label="Claim Review Load"
              value={claimsSourceSummary.partialRejected + claimsSourceSummary.invalidStatus}
              max={75}
              tone="violet"
            />
            <CommandBand
              label="Breakdown Escalation"
              value={breakdownSourceSummary.aboveSla}
              max={8}
              tone="amber"
            />
          </div>
        </div>

        <div className="reporting-hero-side">
          <div className="reporting-hero-chart-card">
            <div className="reporting-panel-head compact">
              <div>
                <p className="reporting-panel-eyebrow">Closed Minus Opened</p>
                <h3>Throughput Momentum</h3>
              </div>
              <ProvenanceBadge provenance="DERIVED" size="sm" />
            </div>
            <SparkAreaChart
              items={throughputTrend}
              positiveLabel="Clearing backlog"
              negativeLabel="Building backlog"
            />
          </div>

          <div className="reporting-hero-chart-card">
            <div className="reporting-panel-head compact">
              <div>
                <p className="reporting-panel-eyebrow">Claims Flow</p>
                <h3>Invoice vs Passed</h3>
              </div>
              <ProvenanceBadge provenance="SOURCE" size="sm" />
            </div>
            <DualLineTrend
              items={claimMonthlySeries.map((item) => ({
                label: item.label,
                first: item.invoice,
                second: item.passed,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="reporting-kpi-grid">
        {currentStatusCards.map((card) => (
          <button key={card.label} className="reporting-kpi-card" type="button" onClick={card.onClick}>
            <div className="reporting-kpi-top">
              <span>{card.label}</span>
              <ProvenanceBadge provenance={card.provenance} size="sm" />
            </div>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </button>
        ))}
      </section>

      <div className="reporting-row reporting-row-three">
        <section className="reporting-panel reporting-panel-tall">
          <div className="reporting-panel-head compact">
            <div>
              <p className="reporting-panel-eyebrow">Operational Mix</p>
              <h3>Live Stage Distribution</h3>
            </div>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <RadialSummary
            rows={operationalStageRows}
            centerLabel="Live queue"
            centerValue={`${filteredOperational.length}`}
          />
        </section>

        <section className="reporting-panel reporting-panel-tall">
          <div className="reporting-panel-head compact">
            <div>
              <p className="reporting-panel-eyebrow">Revenue Shape</p>
              <h3>Invoice Composition</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <StackComposition items={revenueComposition} formatter={formatCurrency} />
        </section>

        <section className="reporting-panel reporting-panel-tall">
          <div className="reporting-panel-head compact">
            <div>
              <p className="reporting-panel-eyebrow">Management Pulse</p>
              <h3>Action Pressure Index</h3>
            </div>
            <ProvenanceBadge provenance="DERIVED" size="sm" />
          </div>
          <MetricPulseGrid items={managementPulse} />
        </section>
      </div>

      <section className="reporting-panel">
        <div className="reporting-panel-head">
          <div>
            <p className="reporting-panel-eyebrow">Operational Exceptions</p>
            <h3>What needs management action today?</h3>
          </div>
          <ProvenanceBadge provenance="DERIVED" size="sm" />
        </div>
        <div className="exception-bars">
          {operationalExceptions.map((item) => (
            <button
              key={item.id}
              className={`exception-row ${item.severity}`}
              type="button"
              onClick={() =>
                openDrawer(
                  setDrawer,
                  item.label,
                  `${item.provenance} · ${item.note}`,
                  ["Issue", "Current Count", "Severity"],
                  [[item.label, `${item.count}`, item.severity.toUpperCase()]],
                )
              }
            >
              <div className="exception-copy">
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </div>
                <ProvenanceBadge provenance={item.provenance} size="sm" />
              </div>
              <div className="exception-bar-shell">
                <div className="exception-bar-fill" style={{ width: `${Math.min(100, item.count * 5)}%` }} />
              </div>
              <span className="exception-count">{item.count}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="reporting-row reporting-row-two">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Workshop Flow</p>
              <h3>Live stage pipeline</h3>
            </div>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="flow-pipeline">
            {flowStages.map((stage, index) => (
              <button
                key={stage}
                className="flow-stage"
                type="button"
                onClick={() =>
                  openDrawer(
                    setDrawer,
                    stage,
                    "DEMO / PROPOSED workshop stage queue",
                    ["Job Card", "Vehicle", "Customer", "Status"],
                    filteredOperational
                      .filter((job) => job.stage === stage)
                      .map((job) => [job.jobCardNo, job.vehicleNumber, job.customerName, job.status]),
                  )
                }
              >
                <span>{stage}</span>
                <strong>{flowCounts[stage as keyof typeof flowCounts]}</strong>
                {index < flowStages.length - 1 && <i aria-hidden="true" />}
              </button>
            ))}
          </div>
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Workshop Load</p>
              <h3>Operational workload split</h3>
            </div>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="mini-bars">
            {workshopLoad.map(([label, value]) => (
              <div key={label} className="mini-bar-row">
                <span>{label}</span>
                <div className="mini-bar-shell">
                  <div className="mini-bar-fill" style={{ width: `${value * 18}%` }} />
                </div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="reporting-row reporting-row-two">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Vehicles by Aging</p>
              <h3>Historical job card aging</h3>
            </div>
            <ProvenanceBadge provenance="DERIVED" size="sm" />
          </div>
          <SimpleBars
            rows={Object.entries(workshopSourceSummary.agingBuckets)}
            onSelect={(label) =>
              openDrawer(
                setDrawer,
                label,
                "DERIVED · Closing date minus opening date",
                ["Job Card", "Customer", "Vehicle", "Open Date", "Close Date"],
                filteredJobs.map((job) => [
                  job.jobCardNo,
                  job.customerName,
                  job.vehicleNumber || "--",
                  job.openDate,
                  job.closeDate,
                ]),
              )
            }
          />
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Job Card Throughput</p>
              <h3>Opened vs closed</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <DualSeriesChart
            items={displayedThroughput.map((item) => ({
              label: item.label,
              first: item.opened,
              second: item.closed,
            }))}
            firstLabel="Opened"
            secondLabel="Closed"
          />
          <SparkAreaChart items={throughputTrend} positiveLabel="Net positive" negativeLabel="Net negative" />
        </section>
      </div>

      <div className="reporting-row reporting-row-two">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Workshop TAT Trend</p>
              <h3>Actual vs target job card TAT</h3>
            </div>
            <ProvenanceBadge provenance="DERIVED" size="sm" />
          </div>
          <LineCompareChart
            items={displayedTat.map((item) => ({
              label: item.label,
              actual: item.actualDays,
              target: item.targetDays,
            }))}
            unit="days"
          />
          <p className="reporting-footnote">
            Actual TAT uses valid opening and closing dates. Target is a proposed 1-day management benchmark, not
            a source field.
          </p>
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Service Mix</p>
              <h3>Type of service distribution</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <div className="service-mix">
            {serviceMixEntries.map(([label, value]) => (
              <button
                key={label}
                className="service-mix-row"
                type="button"
                onClick={() =>
                  openDrawer(
                    setDrawer,
                    label,
                    "SOURCE · Type Of Service from job cards",
                    ["Job Card", "Customer", "Vehicle", "Service Type", "Invoice"],
                    historicalJobCards
                      .filter((job) => job.serviceType === label)
                      .map((job) => [
                        job.jobCardNo,
                        job.customerName,
                        job.vehicleNumber || "--",
                        job.serviceType,
                        formatCurrency(job.invoiceValue),
                      ]),
                  )
                }
              >
                <span>{label}</span>
                <div className="service-mix-shell">
                  <div className="service-mix-fill" style={{ width: `${(value / maxServiceMix) * 100}%` }} />
                </div>
                <strong>{value}</strong>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="reporting-row reporting-row-two">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Workshop Revenue Trend</p>
              <h3>Total invoice value</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <SingleSeriesBars
            items={displayedThroughput.map((item) => ({ label: item.label, value: item.invoice }))}
            unit="₹"
          />
          <p className="reporting-footnote">
            Total revenue uses Total Invoice Value. Labour and parts are shown separately below to avoid double
            counting.
          </p>
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Labour vs Parts</p>
              <h3>Revenue composition</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <DualSeriesChart
            items={displayedThroughput.map((item) => ({
              label: item.label,
              first: item.labour,
              second: item.parts,
            }))}
            firstLabel="Labour"
            secondLabel="Parts"
          />
        </section>
      </div>

      <div className="reporting-row reporting-row-three">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Breakdown Status</p>
              <h3>Open vs closed</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <SimpleBars
            rows={[
              ["Open", breakdownSourceSummary.open],
              ["Closed", breakdownSourceSummary.closed],
            ]}
            onSelect={(label) =>
              openDrawer(
                setDrawer,
                `Breakdowns: ${label}`,
                "SOURCE · Breakdown tracking.xlsx",
                ["Complaint", "Vehicle", "Customer", "Days Open", "Status"],
                sourceBreakdowns
                  .filter((item) => (label === "Closed" ? item.status === "Close" : item.status === "Open"))
                  .map((item) => [
                    item.complaintNo,
                    item.vehicleNumber,
                    item.customerName,
                    `${item.daysOpen}`,
                    item.status,
                  ]),
              )
            }
          />
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Breakdown Aging</p>
              <h3>Days open buckets</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <SimpleBars rows={Object.entries(breakdownSourceSummary.agingBuckets)} />
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Breakdown Responsibility</p>
              <h3>Open cases by attend supervisor</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <SimpleBars rows={[["Unassigned", 1], ["AJIT SINGH/ASHISH", 1], ["RISHU MISHRA", 0]]} />
        </section>
      </div>

      <section className="reporting-panel">
        <div className="reporting-panel-head">
          <div>
            <p className="reporting-panel-eyebrow">Parts Delay Impact</p>
            <h3>Impact of parts availability on breakdown closure</h3>
          </div>
          <ProvenanceBadge provenance="DERIVED" size="sm" />
        </div>
        <div className="parts-delay-grid">
          <StatInset label="Cases with SPO" value="4" note="SOURCE · SPO Order No present" />
          <StatInset label="Cases Waiting for Parts" value="1" note="SOURCE · open breakdown with SPO" />
          <StatInset label="Average Parts Waiting Days" value="30.5 days" note="DERIVED from sample SPO cases" />
          <StatInset label="Parts-related Open Cases" value="1" note="SOURCE · currently open in register" />
        </div>
      </section>

      <div className="reporting-row reporting-row-two">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Claims by Status</p>
              <h3>Accepted, rejected, review-needed</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <SimpleBars rows={claimStatusRows} />
          <RadialSummary rows={claimStatusRows} centerLabel="Claims" centerValue={`${claimsSourceSummary.total}`} />
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Claim Value Trend</p>
              <h3>Invoice vs passed vs rejected</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <DualLineTrend
            items={displayedClaimsTrend.map((item) => ({
              label: item.label,
              first: item.invoice,
              second: item.passed,
            }))}
          />
          <TripleSeriesTable items={displayedClaimsTrend} />
        </section>
      </div>

      <div className="reporting-row reporting-row-two">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Customer Service Due</p>
              <h3>Service-due visibility</h3>
            </div>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <div className="awaiting-grid">
            <StatInset label="Overdue 30+" value="--" note="Awaiting next-service due data" />
            <StatInset label="Overdue 15-30" value="--" note="Awaiting next-service due data" />
            <StatInset label="Overdue 1-15" value="--" note="Awaiting next-service due data" />
            <StatInset label="Due within 7" value="--" note="Awaiting next-service due data" />
            <StatInset label="Due within 30" value="--" note="Awaiting next-service due data" />
          </div>
          <div className="complaint-strip">
            <strong>Customer complaint reporting</strong>
            <span>{sourceBreakdowns.length} visible complaint rows</span>
            <span>1 open</span>
            <span>6 closed</span>
          </div>
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Employee Snapshot</p>
              <h3>Connected to Employee Intelligence</h3>
            </div>
            <ProvenanceBadge provenance="DERIVED" size="sm" />
          </div>
          <div className="employee-snapshot-grid">
            <StatInset label="Verified KRA Profiles" value="1" note="SOURCE slice currently verified" />
            <StatInset label="Average Performance" value="3.54 / 5" note="DERIVED from June 2026 mechanic KRA" />
            <StatInset label="Best Performer" value="VISHWAJEET" note="DERIVED within verified mechanic slice" />
            <StatInset label="Attention Required" value="Week 3 dip" note="DERIVED from lowest weekly score" />
          </div>
          <SimpleBars rows={[["A+", 0], ["A", 1], ["B", 0], ["C", 0], ["D", 0]]} />
          <SparkAreaChart
            items={[
              { label: "W1", value: 3.83 },
              { label: "W2", value: 3.83 },
              { label: "W3", value: 2.67 },
              { label: "W4", value: 3.83 },
            ]}
            positiveLabel="Weekly KRA pulse"
            negativeLabel="Weekly KRA pulse"
          />
        </section>
      </div>

      <div className="reporting-row reporting-row-two">
        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Claim Leakage</p>
              <h3>Invoice, passed, and unresolved value</h3>
            </div>
            <ProvenanceBadge provenance="SOURCE" size="sm" />
          </div>
          <StackComposition items={claimComposition} formatter={formatCurrency} />
        </section>

        <section className="reporting-panel">
          <div className="reporting-panel-head">
            <div>
              <p className="reporting-panel-eyebrow">Source Coverage</p>
              <h3>Historical vs Live Layers</h3>
            </div>
            <ProvenanceBadge provenance="PROPOSED" size="sm" />
          </div>
          <CoverageBands
            items={[
              { label: "Historical Job Cards", filled: 100, note: "Source-backed" },
              { label: "Breakdown Intelligence", filled: 100, note: "Source-backed" },
              { label: "Claims Intelligence", filled: 100, note: "Source-backed" },
              { label: "Workshop Live Stages", filled: 48, note: "Demo / proposed" },
              { label: "Customer Service Due", filled: 18, note: "Awaiting operational fields" },
            ]}
          />
        </section>
      </div>

      <section className="reporting-panel">
        <div className="reporting-panel-head">
          <div>
            <p className="reporting-panel-eyebrow">Management Action Centre</p>
            <h3>Issue, owner, due date, required action</h3>
          </div>
          <ProvenanceBadge provenance="PROPOSED" size="sm" />
        </div>
        <div className="management-action-table">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {managementActions.map((item) => (
                <tr key={item.id}>
                  <td>{item.issue}</td>
                  <td>{item.category}</td>
                  <td>{item.priority}</td>
                  <td>{item.owner}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.status}</td>
                  <td>{item.source}</td>
                  <td>{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DrilldownDrawer
        open={drawer !== null}
        title={drawer?.title ?? ""}
        subtitle={drawer?.subtitle ?? ""}
        columns={drawer?.columns ?? []}
        rows={drawer?.rows ?? []}
        onClose={() => setDrawer(null)}
      />
    </div>
  );
}

function openDrawer(
  setDrawer: (state: DrawerState) => void,
  title: string,
  subtitle: string,
  columns: string[],
  rows: string[][],
) {
  setDrawer({ title, subtitle, columns, rows });
}

function monthLabel(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function isoWeekLabel(date: Date) {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const diff = target.getTime() - firstThursday.getTime();
  const week = 1 + Math.round(diff / 604800000);
  return `Week ${week}`;
}

function isInPreset(date: Date, preset: ReportingPreset) {
  if (preset === "sourcePeriod" || preset === "custom") {
    return date >= sourceStart && date <= sourceEnd;
  }

  const today = new Date("2026-08-17T00:00:00");
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  switch (preset) {
    case "today":
      return sameDay(date, today);
    case "yesterday": {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return sameDay(date, yesterday);
    }
    case "thisWeek":
      return date >= startOfWeek && date <= endOfWeek;
    case "thisMonth":
      return date >= startOfMonth && date <= endOfMonth;
    case "lastMonth":
      return date >= startOfLastMonth && date <= endOfLastMonth;
    default:
      return true;
  }
}

function sameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatInset({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="reporting-inset">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function SimpleBars({
  rows,
  onSelect,
}: {
  rows: Array<[string, number]>;
  onSelect?: (label: string) => void;
}) {
  const maxValue = Math.max(...rows.map(([, value]) => value), 1);
  return (
    <div className="simple-bars">
      {rows.map(([label, value]) => (
        <button
          key={label}
          className="simple-bar-row"
          type="button"
          onClick={() => onSelect?.(label)}
        >
          <span>{label}</span>
          <div className="simple-bar-shell">
            <div className="simple-bar-fill" style={{ width: `${(value / maxValue) * 100}%` }} />
          </div>
          <strong>{value}</strong>
        </button>
      ))}
    </div>
  );
}

function SingleSeriesBars({
  items,
  unit,
}: {
  items: Array<{ label: string; value: number }>;
  unit: string;
}) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="series-bars">
      {items.map((item) => (
        <div key={item.label} className="series-bar-card">
          <span>{item.label}</span>
          <div className="series-bar-shell">
            <div className="series-bar-fill" style={{ height: `${(item.value / maxValue) * 100}%` }} />
          </div>
          <strong>{unit === "₹" ? formatCurrency(item.value) : item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function DualSeriesChart({
  items,
  firstLabel,
  secondLabel,
}: {
  items: Array<{ label: string; first: number; second: number }>;
  firstLabel: string;
  secondLabel: string;
}) {
  const maxValue = Math.max(...items.flatMap((item) => [item.first, item.second]), 1);
  return (
    <div className="dual-series-chart">
      {items.map((item) => (
        <div key={item.label} className="dual-series-card">
          <span>{item.label}</span>
          <div className="dual-series-shell">
            <div className="dual-bar" style={{ height: `${(item.first / maxValue) * 100}%` }} />
            <div className="dual-bar secondary" style={{ height: `${(item.second / maxValue) * 100}%` }} />
          </div>
          <small>
            {firstLabel}: {item.first} · {secondLabel}: {item.second}
          </small>
        </div>
      ))}
    </div>
  );
}

function LineCompareChart({
  items,
  unit,
}: {
  items: Array<{ label: string; actual: number; target: number }>;
  unit: string;
}) {
  return (
    <div className="line-compare-chart">
      {items.map((item) => (
        <div key={item.label} className="line-compare-row">
          <span>{item.label}</span>
          <div>
            <strong>
              Actual {item.actual}
              {unit}
            </strong>
            <small>
              Target {item.target}
              {unit}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

function TripleSeriesTable({
  items,
}: {
  items: Array<{ label: string; invoice: number; passed: number; rejected: number; count: number }>;
}) {
  return (
    <div className="triple-series-table">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Claims</th>
            <th>Invoice Value</th>
            <th>Passed Amount</th>
            <th>Rejected Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{item.count}</td>
              <td>{formatCurrency(item.invoice)}</td>
              <td>{formatCurrency(item.passed)}</td>
              <td>{formatCurrency(item.rejected)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HeroMetric({
  label,
  value,
  note,
  tone,
  onClick,
}: {
  label: string;
  value: string;
  note: string;
  tone: "navy" | "cyan" | "violet" | "amber";
  onClick: () => void;
}) {
  return (
    <button className={`hero-metric ${tone}`} type="button" onClick={onClick}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </button>
  );
}

function CommandBand({
  label,
  value,
  max,
  tone,
}: {
  label: string;
  value: number;
  max: number;
  tone: "navy" | "violet" | "amber";
}) {
  const width = Math.min(100, (value / max) * 100);
  return (
    <div className="command-band">
      <div className="command-band-copy">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="command-band-track">
        <div className={`command-band-fill ${tone}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function SparkAreaChart({
  items,
  positiveLabel,
  negativeLabel,
}: {
  items: Array<{ label: string; value: number }>;
  positiveLabel: string;
  negativeLabel: string;
}) {
  const width = 420;
  const height = 140;
  const padding = 16;
  const values = items.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const points = items.map((item, index) => {
    const x = padding + (index / Math.max(1, items.length - 1)) * (width - padding * 2);
    const y = height - padding - ((item.value - minValue) / range) * (height - padding * 2);
    return { x, y, ...item };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${points[0]?.x ?? padding},${height - padding} ${line} ${points[points.length - 1]?.x ?? width - padding},${height - padding}`;
  const trendLabel = (items[items.length - 1]?.value ?? 0) >= (items[0]?.value ?? 0) ? positiveLabel : negativeLabel;

  return (
    <div className="spark-card">
      <svg viewBox={`0 0 ${width} ${height}`} className="spark-chart" role="img" aria-label={trendLabel}>
        <defs>
          <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(37,99,235,0.36)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0.02)" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#sparkArea)" />
        <polyline points={line} fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="4" fill="#0f2746" />
            <text x={point.x} y={height - 2} textAnchor="middle" className="spark-axis">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="spark-legend">
        <strong>{trendLabel}</strong>
        <small>
          {items[0]?.label} to {items[items.length - 1]?.label}
        </small>
      </div>
    </div>
  );
}

function DualLineTrend({
  items,
}: {
  items: Array<{ label: string; first: number; second: number }>;
}) {
  const width = 420;
  const height = 180;
  const padding = 18;
  const values = items.flatMap((item) => [item.first, item.second]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const firstPoints = items.map((item, index) => {
    const x = padding + (index / Math.max(1, items.length - 1)) * (width - padding * 2);
    const y = height - padding - ((item.first - minValue) / range) * (height - padding * 2);
    return `${x},${y}`;
  });
  const secondPoints = items.map((item, index) => {
    const x = padding + (index / Math.max(1, items.length - 1)) * (width - padding * 2);
    const y = height - padding - ((item.second - minValue) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <div className="dual-line-card">
      <svg viewBox={`0 0 ${width} ${height}`} className="dual-line-chart">
        <polyline points={firstPoints.join(" ")} fill="none" stroke="#123d72" strokeWidth="3" />
        <polyline points={secondPoints.join(" ")} fill="none" stroke="#4d8cff" strokeWidth="3" />
        {items.map((item, index) => {
          const x = padding + (index / Math.max(1, items.length - 1)) * (width - padding * 2);
          return (
            <text key={item.label} x={x} y={height - 2} textAnchor="middle" className="spark-axis">
              {item.label}
            </text>
          );
        })}
      </svg>
      <div className="dual-line-legend">
        <span>
          <i className="tone primary" />
          Invoice
        </span>
        <span>
          <i className="tone secondary" />
          Passed
        </span>
      </div>
    </div>
  );
}

function RadialSummary({
  rows,
  centerLabel,
  centerValue,
}: {
  rows: Array<[string, number]>;
  centerLabel: string;
  centerValue: string;
}) {
  const total = rows.reduce((sum, [, value]) => sum + value, 0) || 1;
  let offset = 0;
  return (
    <div className="radial-summary">
      <div className="radial-graphic">
        <svg viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="58" fill="none" stroke="#e7eef7" strokeWidth="20" />
          {rows.map(([label, value], index) => {
            const portion = (value / total) * 364;
            const dashArray = `${portion} ${364 - portion}`;
            const dashOffset = -offset;
            offset += portion;
            return (
              <circle
                key={label}
                cx="90"
                cy="90"
                r="58"
                fill="none"
                stroke={ringColor(index)}
                strokeWidth="20"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 90 90)"
              />
            );
          })}
        </svg>
        <div className="radial-center">
          <span>{centerLabel}</span>
          <strong>{centerValue}</strong>
        </div>
      </div>
      <div className="radial-legend">
        {rows.map(([label, value], index) => (
          <div key={label} className="radial-legend-row">
            <span>
              <i style={{ backgroundColor: ringColor(index) }} />
              {label}
            </span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackComposition({
  items,
  formatter,
}: {
  items: Array<{ label: string; value: number; tone: "cool" | "warm" | "neutral" }>;
  formatter: (value: number) => string;
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  return (
    <div className="stack-composition">
      <div className="stack-bar">
        {items.map((item) => (
          <div
            key={item.label}
            className={`stack-segment ${item.tone}`}
            style={{ width: `${(item.value / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="stack-legend">
        {items.map((item) => (
          <div key={item.label} className="stack-legend-row">
            <span>
              <i className={item.tone} />
              {item.label}
            </span>
            <strong>{formatter(item.value)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricPulseGrid({
  items,
}: {
  items: Array<{ label: string; value: number; target: number }>;
}) {
  return (
    <div className="metric-pulse-grid">
      {items.map((item) => {
        const percent = Math.min(100, (item.value / item.target) * 100);
        return (
          <div key={item.label} className="metric-pulse-card">
            <div className="metric-pulse-ring" style={{ background: `conic-gradient(#123d72 ${percent * 3.6}deg, #e8eef7 0deg)` }}>
              <div className="metric-pulse-inner">
                <strong>{item.value}</strong>
                <small>{item.target} threshold</small>
              </div>
            </div>
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function CoverageBands({
  items,
}: {
  items: Array<{ label: string; filled: number; note: string }>;
}) {
  return (
    <div className="coverage-bands">
      {items.map((item) => (
        <div key={item.label} className="coverage-row">
          <div className="coverage-meta">
            <strong>{item.label}</strong>
            <small>{item.note}</small>
          </div>
          <div className="coverage-track">
            <div className="coverage-fill" style={{ width: `${item.filled}%` }} />
          </div>
          <span>{item.filled}%</span>
        </div>
      ))}
    </div>
  );
}

function ringColor(index: number) {
  const palette = ["#123d72", "#2f6cb0", "#5a94d1", "#89b6e6", "#d06442", "#e8a257"];
  return palette[index % palette.length];
}
