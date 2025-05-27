import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AppSidebar from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	// Redirect if not authenticated
	if (!session) {
		redirect('/sign-in');
	}

	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': 'calc(var(--spacing) * 72)',
					'--header-height': 'calc(var(--spacing) * 12)',
				} as React.CSSProperties
			}
		>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<SiteHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
