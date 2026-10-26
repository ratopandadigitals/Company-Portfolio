import ProfileSettings from '@/components/admin/settings/ProfileSettings'
import SecuritySettings from '@/components/admin/settings/SecuritySettings'

const AdminSettingsPage = () => {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold text-heading">
          Settings
        </h1>
        <p className="mt-2 text-caption">
          Manage your administrator profile and account security.
        </p>
      </div>

      {/* Settings sections */}
      <div className="space-y-6">
        <ProfileSettings />
        <SecuritySettings />
      </div>
    </div>
  )
}

export default AdminSettingsPage