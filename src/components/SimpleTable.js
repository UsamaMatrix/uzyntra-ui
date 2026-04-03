import EmptyState from "@/components/EmptyState";

export default function SimpleTable({
  columns,
  rows,
  emptyText = "No data",
  compact = false,
}) {
  if (!rows || rows.length === 0) {
    return <EmptyState title="No results" text={emptyText} />;
  }

  return (
    <div className="table-wrap">
      <table className={`table-ui ${compact ? "text-sm" : ""}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((column) => (
                <td key={column.key}>
                  <div
                    className="max-w-xs truncate sm:max-w-sm lg:max-w-md"
                    title={String(row[column.key] || "")}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
