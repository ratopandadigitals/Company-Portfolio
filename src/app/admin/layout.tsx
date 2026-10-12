
import type { ReactNode } from 'react'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import AdminSidebar from '@/components/admin/layout/AdminSidebar'

export default function AdminLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="flex h-dvh overflow-hidden bg-surface-page">
			<AdminSidebar />

			<div className="flex min-h-0 min-w-0 flex-1 flex-col">
				<AdminHeader />

				<main className="min-h-0 flex-1 overflow-y-auto">
					<div className="mx-auto w-full max-w-7xl p-5 sm:p-8">
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}