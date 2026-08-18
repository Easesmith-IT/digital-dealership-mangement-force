import type {
  ReportingCompareMode,
  ReportingPreset,
  ReportingViewMode,
} from "../../types/reporting";

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

interface ReportFiltersProps {
  filters: FilterState;
  months: string[];
  weeks: string[];
  serviceTypes: string[];
  vehicleModels: string[];
  statuses: string[];
  onPresetChange: (preset: ReportingPreset) => void;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

const presets: Array<{ id: ReportingPreset; label: string }> = [
  { id: "sourcePeriod", label: "Source Period" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "thisWeek", label: "This Week" },
  { id: "thisMonth", label: "This Month" },
  { id: "lastMonth", label: "Last Month" },
  { id: "custom", label: "Custom Range" },
];

export function ReportFilters({
  filters,
  months,
  weeks,
  serviceTypes,
  vehicleModels,
  statuses,
  onPresetChange,
  onFilterChange,
}: ReportFiltersProps) {
  return (
    <section className="reporting-filter-bar">
      <div className="reporting-filter-header">
        <div>
          <p className="reporting-eyebrow">Reporting &amp; Management</p>
          <h2>Ghazipur Workshop</h2>
        </div>
        <button
          className="reporting-refresh"
          type="button"
          onClick={() => onPresetChange(filters.preset)}
        >
          Refresh
        </button>
      </div>

      <div className="reporting-quick-range">
        {presets.map((preset) => (
          <button
            key={preset.id}
            className={`range-chip ${filters.preset === preset.id ? "active" : ""}`}
            type="button"
            onClick={() => onPresetChange(preset.id)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="reporting-filter-grid">
        <FilterSelect
          label="Workshop"
          value="Ghazipur Workshop"
          options={["Ghazipur Workshop"]}
          onChange={() => undefined}
        />
        <FilterSelect
          label="Month"
          value={filters.month}
          options={months}
          onChange={(value) => onFilterChange("month", value)}
        />
        <FilterSelect
          label="Week"
          value={filters.week}
          options={weeks}
          onChange={(value) => onFilterChange("week", value)}
        />
        <FilterSelect
          label="View"
          value={filters.view}
          options={["Monthly", "Weekly", "Operational"]}
          onChange={(value) => onFilterChange("view", value as ReportingViewMode)}
        />
        <FilterSelect
          label="Compare"
          value={filters.compare}
          options={["None", "Previous Period", "Workshop Average"]}
          onChange={(value) => onFilterChange("compare", value as ReportingCompareMode)}
        />
        <FilterSelect
          label="Service Type"
          value={filters.serviceType}
          options={serviceTypes}
          onChange={(value) => onFilterChange("serviceType", value)}
        />
        <FilterSelect
          label="Vehicle Model"
          value={filters.vehicleModel}
          options={vehicleModels}
          onChange={(value) => onFilterChange("vehicleModel", value)}
        />
        <FilterSelect
          label="Status"
          value={filters.status}
          options={statuses}
          onChange={(value) => onFilterChange("status", value)}
        />
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="reporting-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
