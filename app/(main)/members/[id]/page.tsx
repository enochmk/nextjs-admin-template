import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { MemberHeader } from './components/member-header';
import { PersonalInformationCard } from './components/personal-information-card';
import { AccountOverviewCard } from './components/account-overview-card';
import { QuickActionsCard } from './components/quick-actions-card';
// import { ActivityStatsCard } from './components/activity-stats-card';

interface MemberPageProps {
	params: Promise<{ id: string }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
	const { id } = await params;
	const memberId = parseInt(id);

	// Validate that the ID is a positive integer
	if (isNaN(memberId) || memberId <= 0) {
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
		<div className="container mx-auto max-w-6xl p-6">
			<MemberHeader memberData={memberData} />
			<div className="grid gap-6 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-2">
					<PersonalInformationCard memberData={memberData} />
					{/* <ActivityStatsCard memberData={memberData} /> */}
				</div>
				<div className="space-y-6">
					<AccountOverviewCard memberData={memberData} />
					<QuickActionsCard memberData={memberData} />
				</div>
			</div>
		</div>
	);
}
