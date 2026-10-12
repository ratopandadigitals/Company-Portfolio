import AdminPageHeader from '@/components/admin/AdminPageHeader'

type AdminPlaceholderPageProps = {
  title: string
  description: string
}

export default function AdminPlaceholderPage({ title, description }: AdminPlaceholderPageProps) {
  return (
    <>
      <AdminPageHeader title={title} description={description} />
      <p className="text-sm text-caption">
        This screen is not connected to authentication or persistent content storage yet.
      </p>
    </>
  )
}