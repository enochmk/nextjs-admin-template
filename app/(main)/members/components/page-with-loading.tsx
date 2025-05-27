import { Suspense } from 'react';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import MembersTable from './members-table';
import PaginationControls from '@/components/ui/pagination-controls';
import { getMembersPaginated } from '@/app/(main)/members/utils/members';
import { parsePaginationParams } from '@/lib/pagination';
import { Skeleton } from '@/components/ui/skeleton';

interface MembersPageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

function MembersTableSkeleton() {
	return (
		<div className="bg-card rounded-lg border">
			<div className="p-4">
				<div className="space-y-4">
					<Skeleton className="h-10 w-full" />
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton key={i} className="h-12 w-full" />
					))}
				</div>
			</div>
			<div className="border-t p-4">
				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-48" />
					<div className="flex space-x-2">
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-20" />
					</div>
				</div>
			</div>
		</div>
	);
}

async function MembersContent({ searchParams }: MembersPageProps) {
	const urlSearchParams = new URLSearchParams();

	// Convert searchParams to URLSearchParams
	Object.entries(searchParams).forEach(([key, value]) => {
		if (typeof value === 'string') {
			urlSearchParams.set(key, value);
		} else if (Array.isArray(value)) {
			urlSearchParams.set(key, value[0]);
		}
	});

	const paginationParams = parsePaginationParams(urlSearchParams, 10);
	const result = await getMembersPaginated(paginationParams);

	return (
		<div className="bg-card rounded-lg border">
			<MembersTable
				membersList={result.data}
				currentPage={result.pagination.page}
				limit={result.pagination.limit}
			/>
			<PaginationControls
				currentPage={result.pagination.page}
				totalPages={result.pagination.totalPages}
				hasNext={result.pagination.hasNext}
				hasPrev={result.pagination.hasPrev}
				total={result.pagination.total}
				limit={result.pagination.limit}
			/>
		</div>
	);
}

export default function MembersPage({ searchParams }: MembersPageProps) {
	return (
		<div className="container mx-auto p-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Members</h1>
				<Link
					href="/members/new"
					className="bg-primary hover:bg-primary/90 text-primary-foreground inline-block rounded px-4 py-2"
				>
					<PlusIcon className="mr-1 inline" />
					Add Member
				</Link>
			</div>
			<Suspense fallback={<MembersTableSkeleton />}>
				<MembersContent searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
