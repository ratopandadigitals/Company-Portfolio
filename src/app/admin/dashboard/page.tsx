
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import DashboardOverviewGrid from '@/components/admin/dashboard/DashboardOverviewGrid'
import QuickActions from '@/components/admin/dashboard/QuickActions'
import RecentActivity from '@/components/admin/dashboard/RecentActivity'
import clientPromise from '@/lib/mongodb'
import type { EnquiryDocument } from '@/types/database'

const AdminDashboardPage = async () => {
  const client = await clientPromise
  const db = client.db('rato_panda_portfolio')
  const [services, works, events, gallery, recentEnquiries] = await Promise.all([
    db.collection('services').countDocuments(),
    db.collection('works').countDocuments(),
    db.collection('events').countDocuments(),
    db.collection('gallery').countDocuments(),
    db.collection<EnquiryDocument>('enquiries')
      .find(
        { status: 'new' },
        { projection: { id: 1, name: 1, subject: 1, createdAt: 1, status: 1 } },
      )
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray(),
  ])

  return (
    <div className="space-y-6 sm:space-y-8">
      <AdminPageHeader
        title="Overview"
        description="Manage your website content and review recent activity."
      />

      <DashboardOverviewGrid counts={{ services, works, events, gallery }} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecentActivity enquiries={recentEnquiries} />
        </div>

        <div className="xl:col-span-2">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage