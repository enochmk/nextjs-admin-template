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
		<Card className='bg-card border shadow-sm'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Activity className='h-5 w-5' />
					Member Activity
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4 sm:grid-cols-3'>
					<div className='text-center p-4 rounded-lg border bg-muted/30'>
						<div className='mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2'>
							<Star className='h-5 w-5 text-primary' />
						</div>
						<div className='text-2xl font-bold'>4.8</div>
						<div className='text-sm text-muted-foreground'>Rating</div>
					</div>
					<div className='text-center p-4 rounded-lg border bg-muted/30'>
						<div className='mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2'>
							<Activity className='h-5 w-5 text-primary' />
						</div>
						<div className='text-2xl font-bold'>24</div>
						<div className='text-sm text-muted-foreground'>Activities</div>
					</div>
					<div className='text-center p-4 rounded-lg border bg-muted/30'>
						<div className='mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2'>
							<Calendar className='h-5 w-5 text-primary' />
						</div>
						<div className='text-2xl font-bold'>
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
