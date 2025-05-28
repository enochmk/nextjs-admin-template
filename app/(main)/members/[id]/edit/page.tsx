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
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
					{/* Breadcrumb Navigation */}
					<div>
						<Link
							href={`/members/${memberData.id}`}
							className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to {memberData.firstName} {memberData.lastName}
						</Link>
					</div>

					{/* Page Header */}
					<div>
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-3xl font-bold tracking-tight">
									Edit Member
								</h1>
								<p className="text-muted-foreground mt-2">
									Update {memberData.firstName} {memberData.lastName}&apos;s
									profile information
								</p>
							</div>
						</div>
					</div>

					{/* Edit Form */}
					<EditMemberForm member={memberData} />
				</div>
			</div>
		</div>
	);
}
