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
		<div className="px-6">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/30 border-b">
						<TableHead className="text-foreground h-12 w-16 px-4 text-left align-middle font-semibold tracking-wide">
							#
						</TableHead>
						<TableHead className="text-foreground h-12 px-4 text-left align-middle font-semibold tracking-wide">
							First Name
						</TableHead>
						<TableHead className="text-foreground h-12 px-4 text-left align-middle font-semibold tracking-wide">
							Last Name
						</TableHead>
						<TableHead className="text-foreground h-12 px-4 text-left align-middle font-semibold tracking-wide">
							Date of Birth
						</TableHead>
						<TableHead className="text-foreground h-12 px-4 text-left align-middle font-semibold tracking-wide">
							Phone Number
						</TableHead>
						<TableHead className="text-foreground h-12 px-4 text-left align-middle font-semibold tracking-wide">
							Created On
						</TableHead>
						<TableHead className="text-foreground h-12 w-20 px-4 text-right align-middle font-semibold tracking-wide">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{membersList.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-muted-foreground border-0 py-16 text-center"
							>
								<div className="flex flex-col items-center space-y-3">
									<div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
										<span className="text-xl">👥</span>
									</div>
									<div className="space-y-1">
										<p className="text-lg font-medium">No members found</p>
										<p className="text-muted-foreground text-sm">
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
								className="hover:bg-muted/40 border-border/40 border-b transition-colors"
							>
								<TableCell className="text-muted-foreground w-16 px-4 py-4 text-sm font-medium">
									{startingPosition + index + 1}
								</TableCell>
								<TableCell className="text-foreground px-4 py-4 font-medium">
									{member.firstName}
								</TableCell>
								<TableCell className="text-foreground px-4 py-4">
									{member.lastName}
								</TableCell>
								<TableCell className="text-muted-foreground px-4 py-4 font-mono text-sm">
									{member.dateOfBirth}
								</TableCell>
								<TableCell className="text-muted-foreground px-4 py-4 font-mono text-sm">
									{member.phoneNumber}
								</TableCell>
								<TableCell className="text-muted-foreground px-4 py-4 text-sm">
									{new Date(member.createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'short',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</TableCell>
								<TableCell className="px-4 py-4 text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												className="hover:bg-muted h-8 w-8 p-0"
											>
												<span className="sr-only">Open menu</span>
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-40">
											<DropdownMenuItem asChild>
												<Link
													href={`/members/${member.id}`}
													className="flex cursor-pointer items-center"
												>
													<Eye className="mr-2 h-4 w-4" />
													View
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href={`/members/${member.id}/edit`}
													className="flex cursor-pointer items-center"
												>
													<Edit className="mr-2 h-4 w-4" />
													Edit
												</Link>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
												onClick={() => handleDeleteClick(member.id)}
												disabled={isDeleting === member.id}
											>
												<Trash2 className="mr-2 h-4 w-4" />
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
				title="Delete Member"
				description="Are you sure you want to delete this member? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				isLoading={isDeleting !== null}
			/>
		</div>
	);
}
