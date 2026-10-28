
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
    <div className="w-full">
      {/* Mobile card layout */}
      <div className="space-y-3 md:hidden">
        {rows.length === 0 ? (
          <div className="rounded-md border border-border-subtle px-inset-compact py-inset-card text-center text-size-small text-text-caption">
            {emptyMessage}
          </div>
        ) : (
          rows.map((row, index) => (
            <article
              key={getKey(row, index)}
              className="overflow-hidden rounded-lg border border-border-subtle bg-surface-card"
            >
              {columns.map((column, columnIndex) => (
                <div
                  key={`${column.label}-${columnIndex}`}
                  className={
                    columnIndex === 0
                      ? 'min-w-0 p-inset-compact'
                      : columnIndex === columns.length - 1
                        ? 'flex min-w-0 items-center justify-between gap-3 border-t border-border-subtle px-inset-compact py-3'
                        : 'flex min-w-0 flex-col gap-1 border-t border-border-subtle px-inset-compact py-3'
                  }
                >
                  {columnIndex !== 0 && (
                    <span className="text-size-caption text-text-caption">
                      {column.label}
                    </span>
                  )}

                  <div
                    className={
                      columnIndex === 0
                        ? 'min-w-0'
                        : columnIndex === columns.length - 1
                          ? 'flex min-w-0 justify-end'
                          : 'min-w-0 wrap-break-word text-size-small text-text-heading'
                    }
                  >
                    {column.render(row)}
                  </div>
                </div>
              ))}
            </article>
          ))
        )}
      </div>

      {/* Desktop table — original layout preserved */}
      <div className="hidden w-full overflow-x-auto rounded-md border border-border-subtle md:block">
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
    </div>
  )
}

export default DataTable
