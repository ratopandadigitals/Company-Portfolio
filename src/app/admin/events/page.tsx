import AdminPageHeader from '@/components/admin/AdminPageHeader'
import DataTable from '@/components/admin/DataTable'

type EventRow = { id: string; title: string; date: string; status: string }

export default function AdminEventsPage() {
	return (
		<>
			<AdminPageHeader title="Events" description="Manage upcoming and past event listings." />
			<DataTable<EventRow>
				columns={[
					{ key: 'title', label: 'Event' },
					{ key: 'date', label: 'Date' },
					{ key: 'status', label: 'Status' },
				]}
				rows={[]}
				emptyMessage="No events are connected to the admin workspace yet."
			/>
		</>
	)
}
