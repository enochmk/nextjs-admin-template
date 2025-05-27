import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, Calendar, Phone, User } from 'lucide-react';

import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { members } from '@/lib/db/schema';

interface MemberPageProps {
	params: Promise<{ id: string }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
	const { id } = await params;
	const memberId = parseInt(id);

	// Validate that the ID is a positive integer
	if (isNaN(memberId) || memberId <= 0) {
		notFound();
	}

	// Get the member
	const member = await db
		.select()
		.from(members)
		.where(eq(members.id, memberId))
		.limit(1);

	if (member.length === 0) {
		notFound();
	}

	const memberData = member[0];

	return (
		<div className='container mx-auto p-6 max-w-4xl'>
			{/* Header */}
			<div className='flex items-center gap-4 mb-6'>
				<Link href='/members'>
					<Button
						variant='outline'
						size='sm'
					>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to Members
					</Button>
				</Link>
				<div className='flex-1'>
					<h1 className='text-2xl font-bold'>
						{memberData.firstName} {memberData.lastName}
					</h1>
					<p className='text-muted-foreground'>Member Details</p>
				</div>
				<div className='flex gap-2'>
					<Link href={`/members/${memberData.id}/edit`}>
						<Button
							variant='outline'
							size='sm'
						>
							<Edit className='mr-2 h-4 w-4' />
							Edit
						</Button>
					</Link>
					<Button
						variant='destructive'
						size='sm'
					>
						<Trash2 className='mr-2 h-4 w-4' />
						Delete
					</Button>
				</div>
			</div>

			{/* Member Information */}
			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
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
							<p className='text-lg font-medium'>
								{memberData.firstName} {memberData.lastName}
							</p>
						</div>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Date of Birth
							</label>
							<p className='flex items-center gap-2'>
								<Calendar className='h-4 w-4 text-muted-foreground' />
								{memberData.dateOfBirth}
							</p>
						</div>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Phone Number
							</label>
							<p className='flex items-center gap-2'>
								<Phone className='h-4 w-4 text-muted-foreground' />
								{memberData.phoneNumber}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Member ID
							</label>
							<p className='font-mono text-sm'>#{memberData.id}</p>
						</div>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Status
							</label>
							<div>
								<Badge variant='secondary'>Active</Badge>
							</div>
						</div>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Created On
							</label>
							<p className='text-sm'>
								{new Date(memberData.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>
						</div>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Last Updated
							</label>
							<p className='text-sm'>
								{new Date(memberData.updatedAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
