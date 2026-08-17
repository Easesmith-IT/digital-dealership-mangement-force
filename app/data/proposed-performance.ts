import { ProposedPerformanceData, ProposedPerformancePeriod } from "../types/employee";

/**
 * DEMO / PROPOSED operational data.
 * These values are intentionally synthetic so the management cockpit can
 * demonstrate how the proposed KPI engine behaves before live technician
 * attribution and shop-floor timestamps are available.
 */
export const vishwajeetJuneProposedPerformance: ProposedPerformanceData = {
  employeeId: "emp-vishwajeet",
  year: "2026",
  month: "June",
  provenance: "PROPOSED",
  monthly: {
    jobsTarget: 24,
    jobsCompleted: 22,
    labourTarget: 120000,
    labourGenerated: 105450,
    tatTargetHours: 3.5,
    tatActualHours: 4.08,
    eligibleQualityJobs: 22,
    repeatJobs: 1,
    qcEligibleJobs: 22,
    qcPassedJobs: 21,
    feedbackResponses: 18,
    feedbackScore: 4.4,
    assignedJobs: 24,
    inProgressJobs: 1,
    waitingJobs: 1,
    activeJobs: 3,
  },
  weekly: {
    week1: {
      jobsTarget: 6,
      jobsCompleted: 6,
      labourTarget: 30000,
      labourGenerated: 28500,
      tatTargetHours: 3.5,
      tatActualHours: 3.7,
      eligibleQualityJobs: 6,
      repeatJobs: 0,
      qcEligibleJobs: 6,
      qcPassedJobs: 6,
      feedbackResponses: 5,
      feedbackScore: 4.5,
      assignedJobs: 6,
      inProgressJobs: 0,
      waitingJobs: 0,
      activeJobs: 0,
    },
    week2: {
      jobsTarget: 6,
      jobsCompleted: 6,
      labourTarget: 30000,
      labourGenerated: 29800,
      tatTargetHours: 3.5,
      tatActualHours: 4.0,
      eligibleQualityJobs: 6,
      repeatJobs: 0,
      qcEligibleJobs: 6,
      qcPassedJobs: 6,
      feedbackResponses: 5,
      feedbackScore: 4.4,
      assignedJobs: 6,
      inProgressJobs: 1,
      waitingJobs: 0,
      activeJobs: 1,
    },
    week3: {
      jobsTarget: 6,
      jobsCompleted: 4,
      labourTarget: 30000,
      labourGenerated: 21500,
      tatTargetHours: 3.5,
      tatActualHours: 4.7,
      eligibleQualityJobs: 4,
      repeatJobs: 1,
      qcEligibleJobs: 4,
      qcPassedJobs: 3,
      feedbackResponses: 3,
      feedbackScore: 4.1,
      assignedJobs: 5,
      inProgressJobs: 1,
      waitingJobs: 1,
      activeJobs: 2,
    },
    week4: {
      jobsTarget: 6,
      jobsCompleted: 6,
      labourTarget: 30000,
      labourGenerated: 25650,
      tatTargetHours: 3.5,
      tatActualHours: 4.1,
      eligibleQualityJobs: 6,
      repeatJobs: 0,
      qcEligibleJobs: 6,
      qcPassedJobs: 6,
      feedbackResponses: 5,
      feedbackScore: 4.6,
      assignedJobs: 7,
      inProgressJobs: 0,
      waitingJobs: 0,
      activeJobs: 0,
    },
  },
};

export function getProposedPeriodData(
  selectedWeek: "All Weeks" | "Week 1" | "Week 2" | "Week 3" | "Week 4",
): ProposedPerformancePeriod {
  if (selectedWeek === "Week 1") return vishwajeetJuneProposedPerformance.weekly.week1;
  if (selectedWeek === "Week 2") return vishwajeetJuneProposedPerformance.weekly.week2;
  if (selectedWeek === "Week 3") return vishwajeetJuneProposedPerformance.weekly.week3;
  if (selectedWeek === "Week 4") return vishwajeetJuneProposedPerformance.weekly.week4;
  return vishwajeetJuneProposedPerformance.monthly;
}

export function achievementPercent(actual: number, target: number): number {
  return target > 0 ? (actual / target) * 100 : 0;
}

export function tatPerformancePercent(actualHours: number, targetHours: number): number {
  if (actualHours <= 0 || targetHours <= 0) return 0;
  return actualHours <= targetHours ? 100 : (targetHours / actualHours) * 100;
}

export function reworkRatePercent(period: ProposedPerformancePeriod): number {
  return period.eligibleQualityJobs > 0
    ? (period.repeatJobs / period.eligibleQualityJobs) * 100
    : 0;
}

export function reworkPerformancePercent(
  period: ProposedPerformancePeriod,
  targetRatePercent = 1,
): number {
  const actualRate = reworkRatePercent(period);
  if (actualRate <= targetRatePercent) return 100;
  return actualRate > 0 ? (targetRatePercent / actualRate) * 100 : 0;
}

export function objectiveKpiScore(period: ProposedPerformancePeriod): number {
  const jobs = achievementPercent(period.jobsCompleted, period.jobsTarget);
  const labour = achievementPercent(period.labourGenerated, period.labourTarget);
  const tat = tatPerformancePercent(period.tatActualHours, period.tatTargetHours);
  const rework = reworkPerformancePercent(period);
  return (jobs + labour + tat + rework) / 4;
}

export function finalPerformanceScore(
  kraScoreOutOfFive: number,
  objectiveScorePercent: number,
): number {
  const kraPercent = (kraScoreOutOfFive / 5) * 100;
  return kraPercent * 0.4 + objectiveScorePercent * 0.6;
}

export function performanceGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

export function qualityRatePercent(period: ProposedPerformancePeriod): number {
  if (period.eligibleQualityJobs <= 0) return 0;
  return ((period.eligibleQualityJobs - period.repeatJobs) / period.eligibleQualityJobs) * 100;
}

export function qcPassRatePercent(period: ProposedPerformancePeriod): number {
  if (period.qcEligibleJobs <= 0) return 0;
  return (period.qcPassedJobs / period.qcEligibleJobs) * 100;
}
