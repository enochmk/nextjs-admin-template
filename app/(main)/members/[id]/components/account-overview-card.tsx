import { Shield, Clock, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from './copy-button';

interface MemberData {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

interface AccountOverviewCardProps {
	memberData: MemberData;
}

export function AccountOverviewCard({ memberData }: AccountOverviewCardProps) {
	return (
		<Card className='border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'>
			<CardHeader className='pb-4'>
				<CardTitle className='flex items-center gap-3 text-lg'>
					<div className='p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30'>
						<Shield className='h-5 w-5 text-purple-600 dark:text-purple-400' />
					</div>
					Account Overview
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-800/50'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-sm font-medium text-muted-foreground'>
							Member ID
						</span>
						<CopyButton
							text={memberData.id.toString()}
							className='h-6 w-6 p-0'
						/>
					</div>
					<p className='font-mono text-lg font-bold'>#{memberData.id}</p>
				</div>

				<div className='space-y-3'>
					<div className='flex items-center gap-3 text-sm'>
						<Clock className='h-4 w-4 text-muted-foreground' />
						<div>
							<p className='font-medium'>Member since</p>
							<p className='text-muted-foreground'>
								{new Date(memberData.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>
					</div>

					<div className='flex items-center gap-3 text-sm'>
						<Edit className='h-4 w-4 text-muted-foreground' />
						<div>
							<p className='font-medium'>Last updated</p>
							<p className='text-muted-foreground'>
								{new Date(memberData.updatedAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
