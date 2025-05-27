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
	);
}
