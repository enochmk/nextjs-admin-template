'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Member } from '@/lib/db/schema';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { deleteMember } from '../actions';

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
	const [isDeleting, setIsDeleting] = useState<number | null>(null);
	const [confirmDialog, setConfirmDialog] = useState<{
		isOpen: boolean;
		memberId: number | null;
	}>({ isOpen: false, memberId: null });

	// Calculate the starting position for the current page
	const startingPosition = (currentPage - 1) * limit;

	const handleDeleteClick = (memberId: number) => {
		setConfirmDialog({ isOpen: true, memberId });
	};

	const handleDeleteConfirm = async () => {
		if (!confirmDialog.memberId) return;

		setIsDeleting(confirmDialog.memberId);
		setConfirmDialog({ isOpen: false, memberId: null });

		try {
			const result = await deleteMember(confirmDialog.memberId);

			if (!result.success) {
				throw new Error(result.error || 'Failed to delete member');
			}

			// The server action already revalidates the path, so the page will refresh automatically
		} catch (error) {
			console.error('Error deleting member:', error);
			alert('Failed to delete member. Please try again.');
		} finally {
			setIsDeleting(null);
		}
	};

	const handleDeleteCancel = () => {
		setConfirmDialog({ isOpen: false, memberId: null });
	};

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
						<TableHead className='h-12 px-4 text-right align-middle font-semibold text-foreground tracking-wide w-20'>
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{membersList.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
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
								<TableCell className='px-4 py-4 text-right'>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant='ghost'
												className='h-8 w-8 p-0 hover:bg-muted'
											>
												<span className='sr-only'>Open menu</span>
												<MoreHorizontal className='h-4 w-4' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align='end'
											className='w-40'
										>
											<DropdownMenuItem asChild>
												<Link
													href={`/members/${member.id}`}
													className='flex items-center cursor-pointer'
												>
													<Eye className='mr-2 h-4 w-4' />
													View
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href={`/members/${member.id}/edit`}
													className='flex items-center cursor-pointer'
												>
													<Edit className='mr-2 h-4 w-4' />
													Edit
												</Link>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className='text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer'
												onClick={() => handleDeleteClick(member.id)}
												disabled={isDeleting === member.id}
											>
												<Trash2 className='mr-2 h-4 w-4' />
												{isDeleting === member.id ? 'Deleting...' : 'Delete'}
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			<ConfirmDialog
				isOpen={confirmDialog.isOpen}
				onClose={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				title='Delete Member'
				description='Are you sure you want to delete this member? This action cannot be undone.'
				confirmText='Delete'
				cancelText='Cancel'
				isLoading={isDeleting !== null}
			/>
		</div>
	);
}
