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
		<Card className='border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden'>
			<CardHeader className='pb-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-gray-100 dark:border-gray-800'>
				<CardTitle className='flex items-center gap-3'>
					<div className='p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg'>
						<User className='h-5 w-5 text-white' />
					</div>
					<div>
						<h3 className='text-xl font-semibold'>Personal Information</h3>
						<p className='text-sm text-muted-foreground mt-1'>
							Member details and contact information
						</p>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='grid gap-6 sm:grid-cols-2'>
					<div className='group'>
						<label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block'>
							Full Name
						</label>
						<div className='flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-800/30 group-hover:from-gray-100 dark:group-hover:from-gray-800 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50'>
							<div className='p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30'>
								<User className='h-4 w-4 text-blue-600 dark:text-blue-400' />
							</div>
							<span className='font-semibold text-gray-900 dark:text-gray-100'>
								{memberData.firstName} {memberData.lastName}
							</span>
						</div>
					</div>

					<div className='group'>
						<label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block'>
							Date of Birth
						</label>
						<div className='flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-800/30 group-hover:from-gray-100 dark:group-hover:from-gray-800 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50'>
							<div className='p-2 rounded-lg bg-green-100 dark:bg-green-900/30'>
								<Calendar className='h-4 w-4 text-green-600 dark:text-green-400' />
							</div>
							<span className='font-semibold text-gray-900 dark:text-gray-100'>
								{new Date(memberData.dateOfBirth).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</div>
					</div>

					<div className='group'>
						<label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block'>
							Phone Number
						</label>
						<div className='flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-800/30 group-hover:from-gray-100 dark:group-hover:from-gray-800 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50'>
							<div className='p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30'>
								<Phone className='h-4 w-4 text-purple-600 dark:text-purple-400' />
							</div>
							<span className='font-semibold text-gray-900 dark:text-gray-100 flex-1'>
								{memberData.phoneNumber}
							</span>
							<CopyButton
								text={memberData.phoneNumber}
								className='h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg'
							/>
						</div>
					</div>

					<div className='group'>
						<label className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block'>
							Member Status
						</label>
						<div className='flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/50'>
							<div className='p-2 rounded-lg bg-green-100 dark:bg-green-900/50'>
								<Shield className='h-4 w-4 text-green-600 dark:text-green-400' />
							</div>
							<Badge
								variant='secondary'
								className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold px-3 py-1'
							>
								<CheckCircle className='w-3 h-3 mr-1.5' />
								Active Member
							</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
