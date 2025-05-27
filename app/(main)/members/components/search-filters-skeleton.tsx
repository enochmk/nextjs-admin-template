import { Skeleton } from '@/components/ui/skeleton';

export default function SearchFiltersSkeleton() {
	return (
		<div className="bg-card mb-6 rounded-lg border p-4">
			<div className="flex flex-col gap-4 lg:flex-row">
				{/* Search Input Skeleton */}
				<div className="flex-1">
					<Skeleton className="h-10 w-full" />
				</div>

				{/* Date Filters Skeleton */}
				<div className="flex gap-2">
					<Skeleton className="h-10 w-40" />
					<Skeleton className="h-10 w-40" />
				</div>

				{/* Action Buttons Skeleton */}
				<div className="flex gap-2">
					<Skeleton className="h-9 w-20" />
					<Skeleton className="h-9 w-16" />
				</div>
			</div>
		</div>
	);
}
