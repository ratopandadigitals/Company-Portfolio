
import type { ReactNode } from 'react'

type DataTableProps<T> = {
  columns: {
    label: string
    render: (row: T) => ReactNode
  }[]
  rows: T[]
  getRowKey?: (row: T) => string
  emptyMessage?: string
}

const DataTable = <T,>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) => {
  const getKey = (row: T, index: number): string => {
    if (getRowKey) return getRowKey(row)

    if (typeof row === 'object' && row !== null) {
      const record = row as Record<string, unknown>

      if (typeof record.id === 'string') return record.id
      if (typeof record.slug === 'string') return record.slug
    }

    return String(index)
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border border-border-subtle">
      <table className="w-full min-w-190 text-left text-size-small">
        <thead className="bg-surface-section">
          <tr>
            {columns.map((column) => (
              <th
                key={column.label}
                scope="col"
                className="px-inset-compact py-inset-mini font-semibold text-text-heading"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-inset-compact py-inset-card text-center text-text-caption"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={getKey(row, index)}
                className="border-t border-border-subtle transition-colors hover:bg-surface-page"
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={`${column.label}-${columnIndex}`}
                    className="px-inset-compact py-4 align-middle text-body"
                  >
                    {column.render(row)}
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

export default DataTable
