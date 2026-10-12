import AdminPageHeader from '@/components/admin/AdminPageHeader'
import DataTable from '@/components/admin/DataTable'

type EnquiryRow = { id: string; sender: string; subject: string; received: string }

export default function AdminEnquiriesPage() {
	return (
		<>
			<AdminPageHeader title="Enquiries" description="Review enquiries submitted through the public contact form." />
			<DataTable<EnquiryRow>
				columns={[
					{ key: 'sender', label: 'From' },
					{ key: 'subject', label: 'Subject' },
					{ key: 'received', label: 'Received' },
				]}
				rows={[]}
				emptyMessage="Enquiry delivery and storage are not connected yet."
			/>
		</>
	)
}
