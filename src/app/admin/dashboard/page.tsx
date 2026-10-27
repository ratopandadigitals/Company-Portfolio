
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import DashboardOverviewGrid from '@/components/admin/dashboard/DashboardOverviewGrid'
import QuickActions from '@/components/admin/dashboard/QuickActions'
import RecentActivity from '@/components/admin/dashboard/RecentActivity'

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <AdminPageHeader
        title="Overview"
        description="Manage your website content and review recent activity."
      />

      <DashboardOverviewGrid />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecentActivity />
        </div>

        <div className="xl:col-span-2">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage