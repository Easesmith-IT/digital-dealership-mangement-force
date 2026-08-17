import React from "react";
import { DataProvenance } from "../../types/employee";

interface ProvenanceBadgeProps {
  provenance: DataProvenance;
  size?: "sm" | "md";
  tooltip?: string;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  provenance,
  size = "md",
  tooltip,
}) => {
  const stylesMap: Record<DataProvenance, { bg: string; color: string; border: string }> = {
    SOURCE: {
      bg: "#e0f2fe",
      color: "#0369a1",
      border: "1px solid #bae6fd",
    },
    DERIVED: {
      bg: "#f0fdf4",
      color: "#15803d",
      border: "1px solid #bbf7d0",
    },
    PROPOSED: {
      bg: "#fff7ed",
      color: "#c2410c",
      border: "1px solid #ffedd5",
    },
  };

  const current = stylesMap[provenance] || stylesMap.PROPOSED;

  const defaultTooltips: Record<DataProvenance, string> = {
    SOURCE: "Directly present in source Excel dataset",
    DERIVED: "Calculated from source data using a documented formula",
    PROPOSED: "Proposed operational metric / platform data capture",
  };

  return (
    <span
      className={`provenance-badge ${size}`}
      title={tooltip || defaultTooltips[provenance]}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: size === "sm" ? "2px 6px" : "3px 8px",
        borderRadius: "4px",
        fontSize: size === "sm" ? "10px" : "11px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        backgroundColor: current.bg,
        color: current.color,
        border: current.border,
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: current.color,
        }}
      />
      {provenance}
    </span>
  );
};

export const GradeBadge: React.FC<{ grade: string }> = ({ grade }) => {
  const getGradeStyle = (g: string) => {
    switch (g.toUpperCase()) {
      case "A+":
      case "A":
        return { bg: "#dcfce7", color: "#166534", border: "1px solid #86efac" };
      case "B":
        return { bg: "#dbeafe", color: "#1e40af", border: "1px solid #93c5fd" };
      case "C":
        return { bg: "#fef3c7", color: "#92400e", border: "1px solid #fde047" };
      default:
        return { bg: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" };
    }
  };

  const style = getGradeStyle(grade);

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: 800,
        backgroundColor: style.bg,
        color: style.color,
        border: style.border,
      }}
    >
      Grade {grade}
    </span>
  );
};
