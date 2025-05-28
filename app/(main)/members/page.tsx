import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import MembersTable from './components/members-table';
import SearchFilters from './components/search-filters';
import PaginationControls from '@/components/ui/pagination-controls';
import { getMembersPaginated, type SearchParams } from './utils/members';
import { parsePaginationParams } from '@/lib/pagination';

interface MembersPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
	const resolvedSearchParams = await searchParams;
	const urlSearchParams = new URLSearchParams();

	// Convert searchParams to URLSearchParams
	Object.entries(resolvedSearchParams).forEach(([key, value]) => {
		if (typeof value === 'string') {
			urlSearchParams.set(key, value);
		} else if (Array.isArray(value)) {
			urlSearchParams.set(key, value[0]);
		}
	});

	// Parse pagination parameters
	const paginationParams = parsePaginationParams(urlSearchParams, 10);

	// Parse search parameters
	const searchFilters: SearchParams = {
		search: urlSearchParams.get('search') || undefined,
		dateFrom: urlSearchParams.get('dateFrom') || undefined,
		dateTo: urlSearchParams.get('dateTo') || undefined,
	};

	// Get members with search and pagination
	const result = await getMembersPaginated({
		...paginationParams,
		search: searchFilters,
	});

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Members</h1>
							<p className="text-muted-foreground">
								Manage your organization members
							</p>
						</div>
						<Link
							href="/members/new"
							className="bg-primary hover:bg-primary/90 text-primary-foreground inline-block rounded px-4 py-2 transition-colors"
						>
							<PlusIcon className="mr-1 inline h-4 w-4" />
							Add Member
						</Link>
					</div>

					<SearchFilters totalResults={result.pagination.total} />

					<div className="bg-card rounded-lg border shadow-sm">
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
				</div>
			</div>
		</div>
	);
}
