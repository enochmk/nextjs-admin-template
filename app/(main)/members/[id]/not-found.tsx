import Link from 'next/link';
import { ArrowLeft, UserX, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberNotFound() {
	return (
		<div className='container mx-auto p-6 max-w-2xl'>
			<div className='relative mb-8'>
				<div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg -z-10'></div>
				<div className='flex items-center justify-between p-4'>
					<div className='flex items-center gap-3'>
						<Link
							href='/members'
							className='group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
						>
							<div className='p-1.5 rounded-md bg-white dark:bg-gray-800 shadow-sm border group-hover:shadow-md transition-all duration-200'>
								<ArrowLeft className='h-4 w-4' />
							</div>
							<span className='hidden sm:inline'>Back to Members</span>
						</Link>
					</div>
					<div className='flex items-center gap-2 text-xs text-muted-foreground'>
						<div className='w-2 h-2 rounded-full bg-red-400 animate-pulse'></div>
						<span>Member not found</span>
					</div>
				</div>
			</div>

			<Card className='text-center'>
				<CardHeader className='pb-4'>
					<div className='mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4'>
						<UserX className='h-8 w-8 text-muted-foreground' />
					</div>
					<CardTitle className='text-2xl'>Member Not Found</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='text-muted-foreground'>
						<p className='text-lg mb-2'>
							The member you&apos;re looking for doesn&apos;t exist or may have
							been deleted.
						</p>
						<p className='text-sm'>
							Please check the member ID and try again, or browse our member
							directory.
						</p>
					</div>

					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Link href='/members'>
							<Button className='w-full sm:w-auto'>
								<Users className='mr-2 h-4 w-4' />
								View All Members
							</Button>
						</Link>
						<Link href='/members/new'>
							<Button
								variant='outline'
								className='w-full sm:w-auto'
							>
								Add New Member
							</Button>
						</Link>
					</div>

					<div className='pt-4 border-t'>
						<p className='text-xs text-muted-foreground'>
							If you believe this is an error, please contact support.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
