'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/lib/db/schema';
import { createUser, updateUser } from '../actions';
import {
	createUserSchema,
	editUserSchema,
	CreateUserSchema,
	EditUserSchema,
} from '../schemas';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UserFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	user?: User | null;
	mode: 'create' | 'edit';
}

export function UserFormModal({
	isOpen,
	onClose,
	user,
	mode,
}: UserFormModalProps) {
	const [isLoading, setIsLoading] = useState(false);

	const isEdit = mode === 'edit' && user;
	const schema = isEdit ? editUserSchema : createUserSchema;

	const form = useForm<CreateUserSchema | EditUserSchema>({
		resolver: zodResolver(schema),
		defaultValues: isEdit
			? {
					name: user.name || '',
					email: user.email,
					password: '',
				}
			: {
					name: '',
					email: '',
					password: '',
				},
	});

	const onSubmit = async (data: CreateUserSchema | EditUserSchema) => {
		setIsLoading(true);
		try {
			if (isEdit) {
				const editData = data as EditUserSchema;
				await updateUser(user.id, {
					name: editData.name,
					email: editData.email,
					...(editData.password && { password: editData.password }),
				});
				toast.success('User updated successfully');
			} else {
				const createData = data as CreateUserSchema;
				await createUser(createData);
				toast.success('User created successfully');
			}
			form.reset();
			onClose();
		} catch (error) {
			toast.error(isEdit ? 'Failed to update user' : 'Failed to create user');
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		form.reset();
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{isEdit ? 'Edit User' : 'Create New User'}</DialogTitle>
					<DialogDescription>
						{isEdit
							? 'Update the user information below.'
							: 'Fill in the information to create a new user.'}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="Enter email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Password{' '}
										{isEdit && '(Leave empty to keep current password)'}
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder={
												isEdit
													? 'Enter new password (optional)'
													: 'Enter password'
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end gap-2 pt-4">
							<Button type="button" variant="outline" onClick={handleClose}>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading
									? isEdit
										? 'Updating...'
										: 'Creating...'
									: isEdit
										? 'Update User'
										: 'Create User'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
