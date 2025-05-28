import { Suspense } from 'react';
import { getUsers, UserFilters } from './actions';
import { UsersTable } from './components/users-table';
import { UsersFilters } from './components/users-filters';
import { UsersTableSkeleton } from './components/users-table-skeleton';
import { UsersFilterssSkeleton } from './components/users-filters-skeleton';
import PaginationControls from '@/components/ui/pagination-controls';

interface UsersPageProps {
	searchParams: {
		search?: string;
		page?: string;
		limit?: string;
		sortBy?: string;
		sortOrder?: string;
	};
}

async function UsersContent({ searchParams }: UsersPageProps) {
	const params = await searchParams;
	const filters: UserFilters = {
		search: params.search || '',
		page: parseInt(params.page || '1'),
		limit: parseInt(params.limit || '10'),
		sortBy: (params.sortBy as any) || 'name',
		sortOrder: (params.sortOrder as any) || 'asc',
	};

	const { users, totalPages, currentPage, totalUsers } =
		await getUsers(filters);

	return (
		<div className="space-y-6">
			<Suspense fallback={<UsersFilterssSkeleton />}>
				<UsersFilters totalUsers={totalUsers} />
			</Suspense>

			<div className="bg-card rounded-lg border shadow-sm">
				<Suspense fallback={<UsersTableSkeleton />}>
					<UsersTable
						users={users}
						currentPage={currentPage}
						limit={filters.limit!}
					/>
				</Suspense>

				{totalPages > 1 && (
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						hasNext={currentPage < totalPages}
						hasPrev={currentPage > 1}
						total={totalUsers}
						limit={filters.limit!}
					/>
				)}
			</div>
		</div>
	);
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Users</h1>
						<p className="text-muted-foreground">
							Manage system users and their accounts.
						</p>
					</div>

					<UsersContent searchParams={searchParams} />
				</div>
			</div>
		</div>
	);
}
