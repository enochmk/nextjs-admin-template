import Link from 'next/link';
import { ArrowLeft, UserX, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberNotFound() {
	return (
		<div className="container mx-auto max-w-2xl p-6">
			<div className="relative mb-8">
				<div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"></div>
				<div className="flex items-center justify-between p-4">
					<div className="flex items-center gap-3">
						<Link
							href="/members"
							className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
						>
							<div className="rounded-md border bg-white p-1.5 shadow-sm transition-all duration-200 group-hover:shadow-md dark:bg-gray-800">
								<ArrowLeft className="h-4 w-4" />
							</div>
							<span className="hidden sm:inline">Back to Members</span>
						</Link>
					</div>
					<div className="text-muted-foreground flex items-center gap-2 text-xs">
						<div className="h-2 w-2 animate-pulse rounded-full bg-red-400"></div>
						<span>Member not found</span>
					</div>
				</div>
			</div>

			<Card className="text-center">
				<CardHeader className="pb-4">
					<div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
						<UserX className="text-muted-foreground h-8 w-8" />
					</div>
					<CardTitle className="text-2xl">Member Not Found</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="text-muted-foreground">
						<p className="mb-2 text-lg">
							The member you&apos;re looking for doesn&apos;t exist or may have
							been deleted.
						</p>
						<p className="text-sm">
							Please check the member ID and try again, or browse our member
							directory.
						</p>
					</div>

					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Link href="/members">
							<Button className="w-full sm:w-auto">
								<Users className="mr-2 h-4 w-4" />
								View All Members
							</Button>
						</Link>
						<Link href="/members/new">
							<Button variant="outline" className="w-full sm:w-auto">
								Add New Member
							</Button>
						</Link>
					</div>

					<div className="border-t pt-4">
						<p className="text-muted-foreground text-xs">
							If you believe this is an error, please contact support.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
