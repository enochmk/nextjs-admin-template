import { APP_NAME } from '@/lib/constants';

export function SiteFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
			<div className="container flex h-14 items-center justify-center px-4 md:px-6">
				<p className="text-muted-foreground text-sm">
					© {currentYear} {APP_NAME}. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
