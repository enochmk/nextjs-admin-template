import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface MembersTableSkeletonProps {
	rows?: number;
}

export default function MembersTableSkeleton({
	rows = 5,
}: MembersTableSkeletonProps) {
	return (
		<div className='bg-card rounded-lg border shadow-sm'>
			<div className='p-4'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-16'>
								<Skeleton className='h-4 w-8' />
							</TableHead>
							<TableHead>
								<Skeleton className='h-4 w-20' />
							</TableHead>
							<TableHead>
								<Skeleton className='h-4 w-24' />
							</TableHead>
							<TableHead>
								<Skeleton className='h-4 w-28' />
							</TableHead>
							<TableHead>
								<Skeleton className='h-4 w-20' />
							</TableHead>
							<TableHead className='w-20'>
								<Skeleton className='h-4 w-16' />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: rows }).map((_, index) => (
							<TableRow key={index}>
								<TableCell>
									<Skeleton className='h-4 w-8' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-24' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-28' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-32' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-24' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-8 w-8 rounded' />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Pagination skeleton */}
			<div className='flex items-center justify-between px-4 py-3 border-t'>
				<div className='flex items-center gap-2'>
					<Skeleton className='h-4 w-32' />
				</div>
				<div className='flex items-center gap-2'>
					<Skeleton className='h-8 w-20' />
					<Skeleton className='h-8 w-8' />
					<Skeleton className='h-4 w-16' />
					<Skeleton className='h-8 w-8' />
					<Skeleton className='h-8 w-20' />
				</div>
			</div>
		</div>
	);
}
