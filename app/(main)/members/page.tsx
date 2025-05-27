import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { PlusIcon } from 'lucide-react';

export default async function MembersPage() {
	const membersList = await db.select().from(members);
	return (
		<div className='container mx-auto p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>Members</h1>
				<Link
					href='/members/new'
					className='bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded inline-block'
				>
					<PlusIcon className='inline mr-1' />
					Add Member
				</Link>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead>Date of Birth</TableHead>
						<TableHead>Phone Number</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{membersList.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={4}
								className='text-center py-8 text-muted-foreground'
							>
								No members found. Add your first member to get started.
							</TableCell>
						</TableRow>
					) : (
						membersList.map((member) => (
							<TableRow key={member.id}>
								<TableCell>{member.firstName}</TableCell>
								<TableCell>{member.lastName}</TableCell>
								<TableCell>{member.dateOfBirth}</TableCell>
								<TableCell>{member.phoneNumber}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
