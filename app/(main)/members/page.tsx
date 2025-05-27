import Link from 'next/link';
import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { PlusIcon } from 'lucide-react';
import MembersTable from './components/members-table';

export default async function MembersPage() {
	const membersList = await db.select().from(members);
	return (
		<div className='container mx-auto p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>Members</h1>
				<Link
					href='/members/new'
					className='bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded inline-block'
				>
					<PlusIcon className='inline mr-1' />
					Add Member
				</Link>
			</div>
			<MembersTable membersList={membersList} />
		</div>
	);
}
