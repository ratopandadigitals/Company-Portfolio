'use client'

type ConfirmDeleteDialogProps = {
  open: boolean
  itemName: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDeleteDialog({
  open,
  itemName,
  onCancel,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        className="w-full max-w-md rounded-md border border-border-subtle bg-surface-page p-6 shadow-xl"
      >
        <h2 id="delete-dialog-title" className="text-lg font-semibold text-heading">
          Delete {itemName}?
        </h2>
        <p id="delete-dialog-description" className="mt-2 text-sm text-caption">
          This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-md border border-border-subtle px-4 py-2 text-sm text-heading">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white">
            Delete
          </button>
        </div>
      </section>
    </div>
  )
}