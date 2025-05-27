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
		<div className='relative mb-8'>
			<div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl blur-xl'></div>
			<div className='relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl'>
				<div className='flex flex-col lg:flex-row lg:items-center gap-6'>
					{/* Navigation */}
					<div className='flex items-center gap-4'>
						<Link
							href='/members'
							className='group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
						>
							<div className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors'>
								<ArrowLeft className='h-4 w-4' />
							</div>
							<span className='hidden sm:inline'>Back to Members</span>
						</Link>
					</div>

					{/* Member Info */}
					<div className='flex-1 min-w-0'>
						<div className='flex items-center gap-3 mb-2'>
							<div className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg'>
								{memberData.firstName[0]}
								{memberData.lastName[0]}
							</div>
							<div>
								<h1 className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
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
							<Button
								variant='outline'
								className='bg-white/50 border-gray-200 hover:bg-white'
							>
								<Edit className='mr-2 h-4 w-4' />
								Edit Profile
							</Button>
						</Link>
						<Button
							variant='ghost'
							size='icon'
							className='hover:bg-gray-100 dark:hover:bg-gray-800'
						>
							<MoreVertical className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
