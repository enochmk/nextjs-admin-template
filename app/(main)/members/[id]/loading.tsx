import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function MemberLoading() {
	return (
		<div className="container mx-auto max-w-4xl p-6">
			{/* Breadcrumb skeleton */}
			<div className="mb-6">
				<Skeleton className="h-4 w-32" />
			</div>

			{/* Header skeleton */}
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Skeleton className="h-16 w-16 rounded-full" />
						<div>
							<Skeleton className="mb-2 h-8 w-48" />
							<Skeleton className="h-4 w-32" />
						</div>
					</div>
					<div className="flex gap-2">
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-20" />
					</div>
				</div>
			</div>

			{/* Cards grid skeleton */}
			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* Personal Information Card */}
				<Card>
					<CardHeader>
						<Skeleton className="h-5 w-32" />
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-4 w-24" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-28" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-20" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-4 w-32" />
						</div>
					</CardContent>
				</Card>

				{/* Account Overview Card */}
				<Card>
					<CardHeader>
						<Skeleton className="h-5 w-32" />
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-16" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-20" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-4 w-24" />
						</div>
					</CardContent>
				</Card>

				{/* Quick Actions Card */}
				<Card>
					<CardHeader>
						<Skeleton className="h-5 w-32" />
					</CardHeader>
					<CardContent className="space-y-3">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</CardContent>
				</Card>
			</div>

			{/* Activity Stats Card */}
			<Card>
				<CardHeader>
					<Skeleton className="h-5 w-32" />
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div className="text-center">
							<Skeleton className="mx-auto mb-2 h-8 w-16" />
							<Skeleton className="mx-auto h-4 w-20" />
						</div>
						<div className="text-center">
							<Skeleton className="mx-auto mb-2 h-8 w-16" />
							<Skeleton className="mx-auto h-4 w-24" />
						</div>
						<div className="text-center">
							<Skeleton className="mx-auto mb-2 h-8 w-16" />
							<Skeleton className="mx-auto h-4 w-28" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
