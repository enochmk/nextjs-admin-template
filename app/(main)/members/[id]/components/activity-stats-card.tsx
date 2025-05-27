import { Activity, Star, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MemberData {
	createdAt: Date;
}

interface ActivityStatsCardProps {
	memberData: MemberData;
}

export function ActivityStatsCard({ memberData }: ActivityStatsCardProps) {
	return (
		<Card className='border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden'>
			<CardHeader className='pb-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-gray-100 dark:border-gray-800'>
				<CardTitle className='flex items-center gap-3'>
					<div className='p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg'>
						<Activity className='h-5 w-5 text-white' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>Member Activity</h3>
						<p className='text-sm text-muted-foreground mt-1'>
							Recent activity and engagement metrics
						</p>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='grid gap-6 sm:grid-cols-3'>
					<div className='text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/30 dark:border-blue-800/30'>
						<div className='mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-3'>
							<Star className='h-6 w-6 text-blue-600 dark:text-blue-400' />
						</div>
						<div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
							4.8
						</div>
						<div className='text-sm text-muted-foreground'>Rating</div>
					</div>
					<div className='text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/30 dark:border-green-800/30'>
						<div className='mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-3'>
							<Activity className='h-6 w-6 text-green-600 dark:text-green-400' />
						</div>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400'>
							24
						</div>
						<div className='text-sm text-muted-foreground'>Activities</div>
					</div>
					<div className='text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/30 dark:border-purple-800/30'>
						<div className='mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-3'>
							<Calendar className='h-6 w-6 text-purple-600 dark:text-purple-400' />
						</div>
						<div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
							{Math.floor(
								(new Date().getTime() -
									new Date(memberData.createdAt).getTime()) /
									(1000 * 60 * 60 * 24),
							)}
						</div>
						<div className='text-sm text-muted-foreground'>Days Active</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
