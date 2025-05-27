import Link from 'next/link';
import { ArrowLeft, Users, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MembersNotFound() {
	return (
		<div className="container mx-auto max-w-2xl p-6">
			<div className="mb-6 flex items-center gap-4">
				<Link href="/dashboard">
					<Button variant="outline" size="sm">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Dashboard
					</Button>
				</Link>
			</div>

			<Card className="text-center">
				<CardHeader className="pb-4">
					<div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
						<Search className="text-muted-foreground h-8 w-8" />
					</div>
					<CardTitle className="text-2xl">Page Not Found</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="text-muted-foreground">
						<p className="mb-2 text-lg">
							The page you&apos;re looking for doesn&apos;t exist.
						</p>
						<p className="text-sm">
							It may have been moved, deleted, or you may have mistyped the URL.
						</p>
					</div>

					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Link href="/members">
							<Button className="w-full sm:w-auto">
								<Users className="mr-2 h-4 w-4" />
								View All Members
							</Button>
						</Link>
						<Link href="/dashboard">
							<Button variant="outline" className="w-full sm:w-auto">
								Go to Dashboard
							</Button>
						</Link>
					</div>

					<div className="border-t pt-4">
						<p className="text-muted-foreground text-xs">
							Need help? Check the navigation menu or contact support.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
