import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

interface Member {
	id: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	phoneNumber: string;
}

// Sample data - replace with your actual data source
const members: Member[] = [
	{
		id: '1',
		firstName: 'John',
		lastName: 'Doe',
		dateOfBirth: '1990-05-15',
		phoneNumber: '+1 (555) 123-4567',
	},
	{
		id: '2',
		firstName: 'Jane',
		lastName: 'Smith',
		dateOfBirth: '1985-12-08',
		phoneNumber: '+1 (555) 987-6543',
	},
];

export default function MembersPage() {
	return (
		<div className='container mx-auto p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>Members</h1>
				<Link
					href='/members/new'
					className='bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded inline-block'
				>
					Add New Member
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
					{members.map((member) => (
						<TableRow key={member.id}>
							<TableCell>{member.firstName}</TableCell>
							<TableCell>{member.lastName}</TableCell>
							<TableCell>{member.dateOfBirth}</TableCell>
							<TableCell>{member.phoneNumber}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
