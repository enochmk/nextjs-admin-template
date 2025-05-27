import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import MembersTable from './components/members-table';
import PaginationControls from '@/components/ui/pagination-controls';
import { getMembersPaginated } from '@/app/(main)/members/utils/members';
import { parsePaginationParams } from '@/lib/pagination';

interface MembersPageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
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
		<div className='container mx-auto p-6'>
			<div className='flex justify-between items-center mb-6'>
				<div>
					<h1 className='text-2xl font-bold'>Members</h1>
					<p className='text-muted-foreground mt-1'>
						Manage your organization members
					</p>
				</div>
				<Link
					href='/members/new'
					className='bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded inline-block transition-colors'
				>
					<PlusIcon className='inline mr-1 h-4 w-4' />
					Add Member
				</Link>
			</div>
			<div className='bg-white rounded-lg border shadow-sm'>
				<MembersTable membersList={result.data} />
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
	);
}
