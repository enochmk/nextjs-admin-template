import { Skeleton } from '@/components/ui/skeleton';

export function UsersFilterssSkeleton() {
	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div className="flex flex-1 gap-2">
				<div className="flex max-w-sm flex-1 gap-2">
					<Skeleton className="h-10 flex-1" />
					<Skeleton className="h-10 w-20" />
				</div>
				<div className="flex gap-2">
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-10 w-32" />
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-10 w-24" />
			</div>
		</div>
	);
}
