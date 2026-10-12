import AdminPageHeader from '@/components/admin/AdminPageHeader'
import DataTable from '@/components/admin/DataTable'

type ServiceRow = { id: string; name: string; status: string; updated: string }

export default function AdminServicesPage() {
	return (
		<>
			<AdminPageHeader title="Services" description="Manage the services shown on the public website." />
			<DataTable<ServiceRow>
				columns={[
					{ key: 'name', label: 'Service' },
					{ key: 'status', label: 'Status' },
					{ key: 'updated', label: 'Last updated' },
				]}
				rows={[]}
				emptyMessage="No services are connected to the admin workspace yet."
			/>
		</>
	)
}
