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
		<div className='bg-card border rounded-lg p-6 shadow-sm mb-6'>
			<div className='flex flex-col lg:flex-row lg:items-center gap-6'>
				<div className='flex items-center gap-4'>
					<Link
						href='/members'
						className='group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						<div className='p-2 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors'>
							<ArrowLeft className='h-4 w-4' />
						</div>
					</Link>
				</div>

				<div className='flex-1 min-w-0'>
					<div className='flex items-center gap-3 mb-2'>
						<div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg'>
							{memberData.firstName[0]}
							{memberData.lastName[0]}
						</div>
						<div>
							<h1 className='text-2xl lg:text-3xl font-bold text-foreground'>
								{memberData.firstName} {memberData.lastName}
							</h1>
							<p className='text-muted-foreground text-sm'>
								Member ID: #{memberData.id}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<Badge
							variant='secondary'
							className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
						>
							<CheckCircle className='w-3 h-3 mr-1' />
							Active Member
						</Badge>
						<Badge
							variant='outline'
							className='text-xs'
						>
							Joined{' '}
							{new Date(memberData.createdAt).toLocaleDateString('en-US', {
								month: 'short',
								year: 'numeric',
							})}
						</Badge>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex items-center gap-3'>
					<Link href={`/members/${memberData.id}/edit`}>
						<Button variant='outline'>
							<Edit className='mr-2 h-4 w-4' />
							Edit Profile
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
