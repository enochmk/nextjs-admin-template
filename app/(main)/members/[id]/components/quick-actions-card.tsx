import Link from 'next/link';
import { Edit, Mail, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MemberData {
	id: number;
}

interface QuickActionsCardProps {
	memberData: MemberData;
}

export function QuickActionsCard({ memberData }: QuickActionsCardProps) {
	return (
		<Card className='bg-card border shadow-sm'>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
			</CardHeader>
			<CardContent className='space-y-3'>
				<Link
					href={`/members/${memberData.id}/edit`}
					className='block'
				>
					<Button
						variant='outline'
						className='w-full justify-start'
					>
						<Edit className='mr-3 h-4 w-4' />
						Edit Member Details
					</Button>
				</Link>
				<Button
					variant='outline'
					className='w-full justify-start'
				>
					<Mail className='mr-3 h-4 w-4' />
					Send Message
				</Button>
				<Button
					variant='outline'
					className='w-full justify-start text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/20'
				>
					<Trash2 className='mr-3 h-4 w-4' />
					Delete Member
				</Button>
			</CardContent>
		</Card>
	);
}
