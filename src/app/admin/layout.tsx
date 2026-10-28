import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/layout/AdminShell'
import { auth } from '@/lib/auth'

const AdminLayout = async ({
	children,
}: {
	children: ReactNode
}) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session?.user) {
		redirect('/login')
	}

	return (
		<AdminShell>{children}</AdminShell>
	)
}

export default AdminLayout