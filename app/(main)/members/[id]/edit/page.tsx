import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import EditMemberForm from './components/edit-member-form';

interface EditMemberPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditMemberPage({ params }: EditMemberPageProps) {
	const { id } = await params;
	const memberId = parseInt(id);

	if (isNaN(memberId)) {
		notFound();
	}

	// Get the member
	const member = await db
		.select()
		.from(members)
		.where(eq(members.id, memberId))
		.limit(1);

	if (member.length === 0) {
		notFound();
	}

	const memberData = member[0];

	return (
		<div className='container mx-auto p-6 max-w-4xl'>
			{/* Breadcrumb Navigation */}
			<div className='mb-6'>
				<Link
					href={`/members/${memberData.id}`}
					className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors'
				>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Back to {memberData.firstName} {memberData.lastName}
				</Link>
			</div>

			{/* Page Header */}
			<div className='mb-8'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>Edit Member</h1>
						<p className='text-muted-foreground mt-2'>
							Update {memberData.firstName} {memberData.lastName}&apos;s profile
							information
						</p>
					</div>
				</div>
			</div>

			{/* Edit Form */}
			<EditMemberForm member={memberData} />
		</div>
	);
}
