import Link from 'next/link';
import { ArrowLeft, Edit, MoreVertical, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MemberData {
	id: number;
	firstName: string;
	lastName: string;
	createdAt: Date;
}

interface MemberHeaderProps {
	memberData: MemberData;
}

export function MemberHeader({ memberData }: MemberHeaderProps) {
	return (
		<div className="bg-card mb-6 rounded-lg border p-6 shadow-sm">
			<div className="flex flex-col gap-6 lg:flex-row lg:items-center">
				<div className="flex items-center gap-4">
					<Link
						href="/members"
						className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
					>
						<div className="bg-muted group-hover:bg-muted/80 rounded-lg p-2 transition-colors">
							<ArrowLeft className="h-4 w-4" />
						</div>
					</Link>
				</div>

				<div className="min-w-0 flex-1">
					<div className="mb-2 flex items-center gap-3">
						<div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold">
							{memberData.firstName[0]}
							{memberData.lastName[0]}
						</div>
						<div>
							<h1 className="text-foreground text-2xl font-bold lg:text-3xl">
								{memberData.firstName} {memberData.lastName}
							</h1>
							<p className="text-muted-foreground text-sm">
								Member ID: #{memberData.id}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							variant="secondary"
							className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
						>
							<CheckCircle className="mr-1 h-3 w-3" />
							Active Member
						</Badge>
						<Badge variant="outline" className="text-xs">
							Joined{' '}
							{new Date(memberData.createdAt).toLocaleDateString('en-US', {
								month: 'short',
								year: 'numeric',
							})}
						</Badge>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex items-center gap-3">
					<Link href={`/members/${memberData.id}/edit`}>
						<Button variant="outline">
							<Edit className="mr-2 h-4 w-4" />
							Edit Profile
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
