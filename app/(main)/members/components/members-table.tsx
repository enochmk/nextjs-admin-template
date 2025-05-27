import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Member } from '@/lib/db/schema';

type Props = {
	membersList: Member[];
};

export default function MembersTable({ membersList }: Props) {
	return (
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
							className='text-center py-12 text-muted-foreground'
						>
							<div className='flex flex-col items-center space-y-2'>
								<p>No members found.</p>
								<p className='text-sm'>Add your first member to get started.</p>
							</div>
						</TableCell>
					</TableRow>
				) : (
					membersList.map((member) => (
						<TableRow key={member.id}>
							<TableCell className='font-medium'>{member.firstName}</TableCell>
							<TableCell>{member.lastName}</TableCell>
							<TableCell>{member.dateOfBirth}</TableCell>
							<TableCell>{member.phoneNumber}</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
