import AdminPageHeader from '@/components/admin/AdminPageHeader'
import DataTable from '@/components/admin/DataTable'

type GalleryRow = { id: string; title: string; status: string; updated: string }

export default function AdminGalleryPage() {
	return (
		<>
			<AdminPageHeader title="Gallery" description="Manage images displayed in the public gallery." />
			<DataTable<GalleryRow>
				columns={[
					{ key: 'title', label: 'Image' },
					{ key: 'status', label: 'Status' },
					{ key: 'updated', label: 'Last updated' },
				]}
				rows={[]}
				emptyMessage="No gallery items are connected to the admin workspace yet."
			/>
		</>
	)
}
