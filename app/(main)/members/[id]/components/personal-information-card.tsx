import { Calendar, Phone, User, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from './copy-button';

interface MemberData {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	phoneNumber: string;
}

interface PersonalInformationCardProps {
	memberData: MemberData;
}

export function PersonalInformationCard({
	memberData,
}: PersonalInformationCardProps) {
	return (
		<Card className="bg-card border shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<User className="h-5 w-5" />
					Personal Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<label className="text-muted-foreground text-sm font-medium">
						Full Name
					</label>
					<div className="mt-1 flex items-center gap-2">
						<span className="text-sm">
							{memberData.firstName} {memberData.lastName}
						</span>
					</div>
				</div>

				<div>
					<label className="text-muted-foreground text-sm font-medium">
						Date of Birth
					</label>
					<div className="mt-1 flex items-center gap-2">
						<Calendar className="text-muted-foreground h-4 w-4" />
						<span className="text-sm">
							{new Date(memberData.dateOfBirth).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</span>
					</div>
				</div>

				<div>
					<label className="text-muted-foreground text-sm font-medium">
						Phone Number
					</label>
					<div className="mt-1 flex items-center gap-2">
						<Phone className="text-muted-foreground h-4 w-4" />
						<span className="text-sm">{memberData.phoneNumber}</span>
						<CopyButton text={memberData.phoneNumber} />
					</div>
				</div>

				<div>
					<label className="text-muted-foreground text-sm font-medium">
						Member Status
					</label>
					<div className="mt-1 flex items-center gap-2">
						<Shield className="text-muted-foreground h-4 w-4" />
						<Badge
							variant="secondary"
							className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
						>
							<CheckCircle className="mr-1 h-3 w-3" />
							Active Member
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
