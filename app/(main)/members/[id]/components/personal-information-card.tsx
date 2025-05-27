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
		<Card className='bg-card border shadow-sm'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<User className='h-5 w-5' />
					Personal Information
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div>
					<label className='text-sm font-medium text-muted-foreground'>
						Full Name
					</label>
					<div className='flex items-center gap-2 mt-1'>
						<span className='text-sm'>
							{memberData.firstName} {memberData.lastName}
						</span>
					</div>
				</div>

				<div>
					<label className='text-sm font-medium text-muted-foreground'>
						Date of Birth
					</label>
					<div className='flex items-center gap-2 mt-1'>
						<Calendar className='h-4 w-4 text-muted-foreground' />
						<span className='text-sm'>
							{new Date(memberData.dateOfBirth).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</span>
					</div>
				</div>

				<div>
					<label className='text-sm font-medium text-muted-foreground'>
						Phone Number
					</label>
					<div className='flex items-center gap-2 mt-1'>
						<Phone className='h-4 w-4 text-muted-foreground' />
						<span className='text-sm'>{memberData.phoneNumber}</span>
						<CopyButton text={memberData.phoneNumber} />
					</div>
				</div>

				<div>
					<label className='text-sm font-medium text-muted-foreground'>
						Member Status
					</label>
					<div className='flex items-center gap-2 mt-1'>
						<Shield className='h-4 w-4 text-muted-foreground' />
						<Badge
							variant='secondary'
							className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
						>
							<CheckCircle className='w-3 h-3 mr-1' />
							Active Member
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
