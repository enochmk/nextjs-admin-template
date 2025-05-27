import Link from 'next/link';
import { ArrowLeft, Users, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MembersNotFound() {
	return (
		<div className='container mx-auto p-6 max-w-2xl'>
			<div className='flex items-center gap-4 mb-6'>
				<Link href='/dashboard'>
					<Button
						variant='outline'
						size='sm'
					>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to Dashboard
					</Button>
				</Link>
			</div>

			<Card className='text-center'>
				<CardHeader className='pb-4'>
					<div className='mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4'>
						<Search className='h-8 w-8 text-muted-foreground' />
					</div>
					<CardTitle className='text-2xl'>Page Not Found</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='text-muted-foreground'>
						<p className='text-lg mb-2'>
							The page you're looking for doesn't exist.
						</p>
						<p className='text-sm'>
							It may have been moved, deleted, or you may have mistyped the URL.
						</p>
					</div>

					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Link href='/members'>
							<Button className='w-full sm:w-auto'>
								<Users className='mr-2 h-4 w-4' />
								View All Members
							</Button>
						</Link>
						<Link href='/dashboard'>
							<Button
								variant='outline'
								className='w-full sm:w-auto'
							>
								Go to Dashboard
							</Button>
						</Link>
					</div>

					<div className='pt-4 border-t'>
						<p className='text-xs text-muted-foreground'>
							Need help? Check the navigation menu or contact support.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
