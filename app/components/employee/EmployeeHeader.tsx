import React from "react";
import { ComparisonPeriod, EmployeeProfile, EvaluationPeriodMonth, EvaluationPeriodWeek, EvaluationPeriodYear, ViewMode } from "../../types/employee";
import { GradeBadge, ProvenanceBadge } from "../common/Badge";
import { PeriodSelector } from "../common/PeriodSelector";
import { finalPerformanceScore, objectiveKpiScore, performanceGrade, vishwajeetJuneProposedPerformance } from "../../data/proposed-performance";
import { vishwajeetJuneKra } from "../../data/employee-data";

interface EmployeeHeaderProps {
  employee: EmployeeProfile;
  currentScoreText: string;
  provenance: "SOURCE" | "DERIVED" | "PROPOSED";
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
  employeeList: EmployeeProfile[];
  onSelectEmployee: (emp: EmployeeProfile) => void;
}

export const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  employee,
  currentScoreText,
  provenance,
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
  employeeList,
  onSelectEmployee,
}) => {
  const proposedFinalScore = finalPerformanceScore(
    vishwajeetJuneKra.monthlyAverageScore,
    objectiveKpiScore(vishwajeetJuneProposedPerformance.monthly),
  );
  const displayedGrade = employee.id === "emp-vishwajeet" ? performanceGrade(proposedFinalScore) : employee.currentGrade;
  const displayedGradeProvenance = employee.id === "emp-vishwajeet" ? "PROPOSED" : undefined;

  return (
    <div className="employee-cockpit-header">
      <div className="header-top-row">
        <div className="employee-identity">
          <div className="employee-avatar">{employee.avatarText}</div>
          <div className="identity-details">
            <div className="name-role-row">
              <h2 className="employee-name">{employee.name}</h2>
              <span className="role-tag">{employee.role}</span>
              <GradeBadge grade={displayedGrade} />
              {displayedGradeProvenance && <ProvenanceBadge provenance="PROPOSED" size="sm" />}
            </div>
            <div className="meta-row">
              <span>{employee.workshop}</span>
              <span>&bull;</span>
              <span>{employee.department}</span>
              <span>&bull;</span>
              <span>Manager: {employee.reportingManager}</span>
            </div>
          </div>
        </div>

        <div className="header-score-card">
          <div className="score-meta">
            <span className="label">{selectedWeek === "All Weeks" ? `${selectedMonth} Monthly Score` : `${selectedWeek} Score`}</span>
            <ProvenanceBadge provenance={provenance} size="sm" />
          </div>
          <div className="score-value">{currentScoreText}<span className="max-scale">/ 5.0</span></div>
          <div className="employee-picker">
            <select className="employee-select" value={employee.id} onChange={(e) => {
              const found = employeeList.find((x) => x.id === e.target.value);
              if (found) onSelectEmployee(found);
            }}>
              {employeeList.map((emp) => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
            </select>
          </div>
        </div>
      </div>

      <PeriodSelector
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedWeek={selectedWeek}
        selectedViewMode={selectedViewMode}
        selectedComparison={selectedComparison}
        onYearChange={onYearChange}
        onMonthChange={onMonthChange}
        onWeekChange={onWeekChange}
        onViewModeChange={onViewModeChange}
        onComparisonChange={onComparisonChange}
      />
    </div>
  );
};
