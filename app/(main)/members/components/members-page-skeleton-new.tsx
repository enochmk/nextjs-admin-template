import { Skeleton } from '@/components/ui/skeleton';
import SearchFiltersSkeleton from './search-filters-skeleton';
import MembersTableSkeleton from './members-table-skeleton';

export default function MembersPageSkeleton() {
	return (
		<div className='container mx-auto p-6'>
			{/* Header Skeleton */}
			<div className='flex justify-between items-center mb-6'>
				<div>
					<Skeleton className='h-8 w-32 mb-2' />
					<Skeleton className='h-4 w-48' />
				</div>
				<Skeleton className='h-10 w-32' />
			</div>

			{/* Search Filters Skeleton */}
			<SearchFiltersSkeleton />

			{/* Table Skeleton */}
			<MembersTableSkeleton rows={5} />
		</div>
	);
}
