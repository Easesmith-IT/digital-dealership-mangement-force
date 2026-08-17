import React from "react";
import {
  ComparisonPeriod,
  EvaluationPeriodMonth,
  EvaluationPeriodWeek,
  EvaluationPeriodYear,
  ViewMode,
} from "../../types/employee";

interface PeriodSelectorProps {
  selectedYear: EvaluationPeriodYear;
  selectedMonth: EvaluationPeriodMonth;
  selectedWeek: EvaluationPeriodWeek;
  selectedViewMode: ViewMode;
  selectedComparison: ComparisonPeriod;
  onYearChange: (year: EvaluationPeriodYear) => void;
  onMonthChange: (month: EvaluationPeriodMonth) => void;
  onWeekChange: (week: EvaluationPeriodWeek) => void;
  onViewModeChange: (view: ViewMode) => void;
  onComparisonChange: (compare: ComparisonPeriod) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedYear,
  selectedMonth,
  selectedWeek,
  selectedViewMode,
  selectedComparison,
  onYearChange,
  onMonthChange,
  onWeekChange,
  onViewModeChange,
  onComparisonChange,
}) => {
  return (
    <div className="period-selector-toolbar">
      <div className="selector-group">
        <label className="selector-label">YEAR</label>
        <select
          className="selector-control"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value as EvaluationPeriodYear)}
        >
          <option value="2026">2026 (Source)</option>
          <option value="2025">2025 (Historical)</option>
        </select>
      </div>

      <div className="selector-group">
        <label className="selector-label">MONTH</label>
        <select
          className="selector-control"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value as EvaluationPeriodMonth)}
        >
          <option value="June">June 2026 (Verified Source)</option>
          <option value="May">May 2026 (Unavailable)</option>
          <option value="July">July 2026 (Unavailable)</option>
        </select>
      </div>

      <div className="selector-group">
        <label className="selector-label">WEEK</label>
        <select
          className="selector-control"
          value={selectedWeek}
          onChange={(e) => onWeekChange(e.target.value as EvaluationPeriodWeek)}
        >
          <option value="All Weeks">All Weeks (Monthly Avg)</option>
          <option value="Week 1">Week 1 (3.83)</option>
          <option value="Week 2">Week 2 (3.83)</option>
          <option value="Week 3">Week 3 (2.67)</option>
          <option value="Week 4">Week 4 (3.83)</option>
        </select>
      </div>

      <div className="selector-group">
        <label className="selector-label">VIEW MODE</label>
        <select
          className="selector-control"
          value={selectedViewMode}
          onChange={(e) => onViewModeChange(e.target.value as ViewMode)}
        >
          <option value="Monthly">Monthly View</option>
          <option value="Weekly">Weekly View</option>
          <option value="Daily">Daily View</option>
          <option value="Job Card">Job Card Drilldown</option>
        </select>
      </div>

      <div className="selector-group">
        <label className="selector-label">COMPARE VS</label>
        <select
          className="selector-control"
          value={selectedComparison}
          onChange={(e) => onComparisonChange(e.target.value as ComparisonPeriod)}
        >
          <option value="None">None</option>
          <option value="Previous Period">Previous Period</option>
          <option value="Workshop Average">Workshop Average</option>
        </select>
      </div>

      <div className="period-active-indicator">
        <span className="dot" />
        <span className="text">
          {selectedMonth} {selectedYear} &bull; {selectedWeek}
        </span>
      </div>
    </div>
  );
};
