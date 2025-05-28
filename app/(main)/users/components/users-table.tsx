'use client';

import { useState } from 'react';
import { User } from '@/lib/db/schema';
import { deleteUser } from '../actions';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';
import { UserFormModal } from './user-form-modal';

interface UsersTableProps {
	users: Array<{
		id: string;
		name: string | null;
		email: string;
		emailVerified: Date | null;
		image: string | null;
	}>;
	currentPage: number;
	limit: number;
}

export function UsersTable({ users, currentPage, limit }: UsersTableProps) {
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

	const handleEdit = (user: any) => {
		setEditingUser(user);
	};

	const handleDelete = async (userId: string) => {
		try {
			await deleteUser(userId);
			toast.success('User deleted successfully');
		} catch (error) {
			toast.error('Failed to delete user');
		} finally {
			setDeletingUserId(null);
		}
	};

	const getInitials = (name: string | null) => {
		if (!name) return '??';
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	if (users.length === 0) {
		return (
			<div className="py-8 text-center">
				<p className="text-muted-foreground">No users found.</p>
			</div>
		);
	}

	return (
		<>
			<div className="px-6">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-16">#</TableHead>
							<TableHead>User</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-20">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user, index) => {
							const rowNumber = (currentPage - 1) * limit + index + 1;
							return (
								<TableRow key={user.id}>
									<TableCell className="text-muted-foreground">
										{rowNumber}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<Avatar className="h-8 w-8">
												<AvatarImage src={user.image || undefined} />
												<AvatarFallback className="text-xs">
													{getInitials(user.name)}
												</AvatarFallback>
											</Avatar>
											<div className="min-w-0">
												<p className="truncate font-medium">
													{user.name || 'No name'}
												</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="font-mono text-sm">{user.email}</span>
									</TableCell>
									<TableCell>
										<Badge
											variant={user.emailVerified ? 'default' : 'secondary'}
										>
											{user.emailVerified ? 'Verified' : 'Unverified'}
										</Badge>
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="sm">
													<IconDotsVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => handleEdit(user)}>
													<IconEdit className="mr-2 h-4 w-4" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => setDeletingUserId(user.id)}
													className="text-destructive focus:text-destructive"
												>
													<IconTrash className="mr-2 h-4 w-4" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>

			{editingUser && (
				<UserFormModal
					isOpen={!!editingUser}
					onClose={() => setEditingUser(null)}
					user={editingUser}
					mode="edit"
				/>
			)}

			<ConfirmDialog
				isOpen={!!deletingUserId}
				onClose={() => setDeletingUserId(null)}
				onConfirm={() => deletingUserId && handleDelete(deletingUserId)}
				title="Delete User"
				description="Are you sure you want to delete this user? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
			/>
		</>
	);
}
