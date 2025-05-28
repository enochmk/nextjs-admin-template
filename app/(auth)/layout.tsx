import { APP_NAME } from '@/lib/constants';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentYear = new Date().getFullYear();

	return (
		<div className="relative min-h-screen">
			<main className="relative z-10">{children}</main>
			<footer className="absolute right-0 bottom-0 left-0 z-0">
				<div className="flex h-14 items-center justify-center px-4 md:px-6">
					<p className="text-muted-foreground/60 text-xs">
						© {currentYear} {APP_NAME}. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
