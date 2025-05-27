import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function DashboardLoading() {
	return (
		<div className="container mx-auto p-6">
			{/* Header skeleton */}
			<div className="mb-8">
				<Skeleton className="mb-2 h-8 w-48" />
				<Skeleton className="h-4 w-64" />
			</div>

			{/* Stats cards skeleton */}
			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-4" />
						</CardHeader>
						<CardContent>
							<Skeleton className="mb-2 h-8 w-16" />
							<Skeleton className="h-3 w-32" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Charts/content skeleton */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<Skeleton className="h-5 w-32" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-64 w-full" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<Skeleton className="h-5 w-40" />
					</CardHeader>
					<CardContent className="space-y-4">
						{Array.from({ length: 5 }).map((_, index) => (
							<div key={index} className="flex items-center space-x-4">
								<Skeleton className="h-8 w-8 rounded-full" />
								<div className="flex-1">
									<Skeleton className="mb-1 h-4 w-32" />
									<Skeleton className="h-3 w-20" />
								</div>
								<Skeleton className="h-4 w-16" />
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
