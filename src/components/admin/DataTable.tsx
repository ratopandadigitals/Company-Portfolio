type DataTableProps<Row extends { id: string }> = {
  columns: { key: keyof Row; label: string }[]
  rows: Row[]
  emptyMessage?: string
}

export default function DataTable<Row extends { id: string }>({
  columns,
  rows,
  emptyMessage = 'Nothing to show yet.',
}: DataTableProps<Row>) {
  return (
    <div className="overflow-x-auto rounded-md border border-border-subtle">
      <table className="w-full min-w-xl border-collapse text-left text-sm">
        <thead className="bg-surface-default text-caption">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} scope="col" className="px-4 py-3 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-caption">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-t border-border-subtle text-heading">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3">
                    {String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}