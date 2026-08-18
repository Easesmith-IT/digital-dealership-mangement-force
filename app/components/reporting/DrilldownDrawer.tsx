interface DrilldownDrawerProps {
  open: boolean;
  title: string;
  subtitle: string;
  columns: string[];
  rows: string[][];
  emptyMessage?: string;
  onClose: () => void;
}

export function DrilldownDrawer({
  open,
  title,
  subtitle,
  columns,
  rows,
  emptyMessage = "No rows match the current filter set.",
  onClose,
}: DrilldownDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="reporting-drawer-backdrop" onClick={onClose}>
      <aside className="reporting-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="reporting-drawer-head">
          <div>
            <p>{subtitle}</p>
            <h3>{title}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close drilldown">
            ×
          </button>
        </div>

        <div className="reporting-drawer-search">
          <input type="text" value="Search available in live mode" readOnly />
        </div>

        <div className="reporting-drawer-table">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="empty">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                rows.map((row, rowIndex) => (
                  <tr key={`${row[0]}-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
}
