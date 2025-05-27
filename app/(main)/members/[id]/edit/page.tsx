import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

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
		<div className='container mx-auto p-6 max-w-2xl'>
			{/* Header */}
			<div className='flex items-center gap-4 mb-6'>
				<Link href={`/members/${memberData.id}`}>
					<Button
						variant='outline'
						size='sm'
					>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to Member
					</Button>
				</Link>
				<div>
					<h1 className='text-2xl font-bold'>Edit Member</h1>
					<p className='text-muted-foreground'>
						Update {memberData.firstName} {memberData.lastName}&apos;s
						information
					</p>
				</div>
			</div>

			{/* Edit Form */}
			<div className='bg-card rounded-lg border shadow-sm p-6'>
				<p className='text-center text-muted-foreground py-8'>
					Edit form will be implemented here.
					<br />
					Current member: {memberData.firstName} {memberData.lastName}
				</p>
			</div>
		</div>
	);
}
