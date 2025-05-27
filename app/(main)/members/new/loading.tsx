import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function NewMemberLoading() {
	return (
		<div className='container mx-auto p-6 max-w-4xl'>
			{/* Breadcrumb skeleton */}
			<div className='mb-6'>
				<Skeleton className='h-4 w-32' />
			</div>

			{/* Page Header skeleton */}
			<div className='mb-8'>
				<div className='flex items-center justify-between'>
					<div>
						<Skeleton className='h-9 w-40 mb-2' />
						<Skeleton className='h-4 w-56' />
					</div>
				</div>
			</div>

			{/* Add Form skeleton */}
			<Card>
				<CardContent className='p-6'>
					<div className='space-y-4'>
						{/* First and Last Name row */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Skeleton className='h-4 w-20 mb-2' />
								<Skeleton className='h-10 w-full' />
							</div>
							<div>
								<Skeleton className='h-4 w-20 mb-2' />
								<Skeleton className='h-10 w-full' />
							</div>
						</div>

						{/* Date of Birth */}
						<div>
							<Skeleton className='h-4 w-24 mb-2' />
							<Skeleton className='h-10 w-full' />
						</div>

						{/* Phone Number */}
						<div>
							<Skeleton className='h-4 w-24 mb-2' />
							<Skeleton className='h-10 w-full' />
						</div>

						{/* Action buttons */}
						<div className='flex gap-4 pt-4'>
							<Skeleton className='h-10 flex-1' />
							<Skeleton className='h-10 flex-1' />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
