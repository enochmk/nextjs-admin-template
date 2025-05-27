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
	currentPage: number;
	limit: number;
};

export default function MembersTable({
	membersList,
	currentPage,
	limit,
}: Props) {
	// Calculate the starting position for the current page
	const startingPosition = (currentPage - 1) * limit;

	return (
		<div className='px-6'>
			<Table>
				<TableHeader>
					<TableRow className='border-b bg-muted/30'>
						<TableHead className='h-12 px-4 text-left align-middle font-semibold text-foreground tracking-wide w-16'>
							#
						</TableHead>
						<TableHead className='h-12 px-4 text-left align-middle font-semibold text-foreground tracking-wide'>
							First Name
						</TableHead>
						<TableHead className='h-12 px-4 text-left align-middle font-semibold text-foreground tracking-wide'>
							Last Name
						</TableHead>
						<TableHead className='h-12 px-4 text-left align-middle font-semibold text-foreground tracking-wide'>
							Date of Birth
						</TableHead>
						<TableHead className='h-12 px-4 text-left align-middle font-semibold text-foreground tracking-wide'>
							Phone Number
						</TableHead>
						<TableHead className='h-12 px-4 text-left align-middle font-semibold text-foreground tracking-wide'>
							Created On
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{membersList.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={6}
								className='text-center py-16 text-muted-foreground border-0'
							>
								<div className='flex flex-col items-center space-y-3'>
									<div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
										<span className='text-xl'>👥</span>
									</div>
									<div className='space-y-1'>
										<p className='text-lg font-medium'>No members found</p>
										<p className='text-sm text-muted-foreground'>
											Add your first member to get started.
										</p>
									</div>
								</div>
							</TableCell>
						</TableRow>
					) : (
						membersList.map((member, index) => (
							<TableRow
								key={member.id}
								className='hover:bg-muted/40 transition-colors border-b border-border/40'
							>
								<TableCell className='px-4 py-4 text-muted-foreground font-medium text-sm w-16'>
									{startingPosition + index + 1}
								</TableCell>
								<TableCell className='px-4 py-4 font-medium text-foreground'>
									{member.firstName}
								</TableCell>
								<TableCell className='px-4 py-4 text-foreground'>
									{member.lastName}
								</TableCell>
								<TableCell className='px-4 py-4 text-muted-foreground font-mono text-sm'>
									{member.dateOfBirth}
								</TableCell>
								<TableCell className='px-4 py-4 text-muted-foreground font-mono text-sm'>
									{member.phoneNumber}
								</TableCell>
								<TableCell className='px-4 py-4 text-muted-foreground text-sm'>
									{new Date(member.createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'short',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
