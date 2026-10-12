import AdminPageHeader from '@/components/admin/AdminPageHeader'
import DataTable from '@/components/admin/DataTable'

type WorkRow = { id: string; title: string; status: string; updated: string }

export default function AdminWorksPage() {
	return (
		<>
			<AdminPageHeader title="Works" description="Manage portfolio projects and their publication status." />
			<DataTable<WorkRow>
				columns={[
					{ key: 'title', label: 'Project' },
					{ key: 'status', label: 'Status' },
					{ key: 'updated', label: 'Last updated' },
				]}
				rows={[]}
				emptyMessage="No projects are connected to the admin workspace yet."
			/>
		</>
	)
}
