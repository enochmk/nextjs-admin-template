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
		<Card className="bg-card border shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="h-5 w-5" />
					Account Overview
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="bg-muted/30 rounded-lg border p-3">
					<div className="mb-1 flex items-center justify-between">
						<span className="text-muted-foreground text-sm font-medium">
							Member ID
						</span>
						<CopyButton text={memberData.id.toString()} />
					</div>
					<p className="font-mono text-lg font-bold">#{memberData.id}</p>
				</div>

				<div className="space-y-3">
					<div className="flex items-center gap-2 text-sm">
						<Clock className="text-muted-foreground h-4 w-4" />
						<div>
							<p className="font-medium">Member since</p>
							<p className="text-muted-foreground">
								{new Date(memberData.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2 text-sm">
						<Edit className="text-muted-foreground h-4 w-4" />
						<div>
							<p className="font-medium">Last updated</p>
							<p className="text-muted-foreground">
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
