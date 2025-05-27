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
		<Card className="bg-card border shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Activity className="h-5 w-5" />
					Member Activity
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="bg-muted/30 rounded-lg border p-4 text-center">
						<div className="bg-primary/10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
							<Star className="text-primary h-5 w-5" />
						</div>
						<div className="text-2xl font-bold">4.8</div>
						<div className="text-muted-foreground text-sm">Rating</div>
					</div>
					<div className="bg-muted/30 rounded-lg border p-4 text-center">
						<div className="bg-primary/10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
							<Activity className="text-primary h-5 w-5" />
						</div>
						<div className="text-2xl font-bold">24</div>
						<div className="text-muted-foreground text-sm">Activities</div>
					</div>
					<div className="bg-muted/30 rounded-lg border p-4 text-center">
						<div className="bg-primary/10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
							<Calendar className="text-primary h-5 w-5" />
						</div>
						<div className="text-2xl font-bold">
							{Math.floor(
								(new Date().getTime() -
									new Date(memberData.createdAt).getTime()) /
									(1000 * 60 * 60 * 24)
							)}
						</div>
						<div className="text-muted-foreground text-sm">Days Active</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
