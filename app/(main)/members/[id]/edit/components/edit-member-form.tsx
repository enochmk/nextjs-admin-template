'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { editMemberSchema } from '../schema';
import { editMemberAction } from '../action';
import { Member } from '@/lib/db/schema';

interface EditMemberFormProps {
	member: Member;
}

export default function EditMemberForm({ member }: EditMemberFormProps) {
	const router = useRouter();

	const form = useForm<z.infer<typeof editMemberSchema>>({
		resolver: zodResolver(editMemberSchema),
		defaultValues: {
			firstName: member.firstName,
			lastName: member.lastName,
			dateOfBirth: member.dateOfBirth,
			phoneNumber: member.phoneNumber,
		},
	});

	async function onSubmit(data: z.infer<typeof editMemberSchema>) {
		try {
			const formData = new FormData();
			Object.entries(data).forEach(([k, v]) => formData.append(k, v as string));

			const result = await editMemberAction(member.id, null, formData);

			if (result?.success) {
				toast.success(result.message || 'Member updated successfully!');
				router.push(`/members/${member.id}`);
			} else if (result?.errors) {
				// Set form errors
				Object.entries(result.errors).forEach(([field, messages]) => {
					if (Array.isArray(messages) && messages.length > 0) {
						form.setError(field as keyof typeof data, {
							message: messages[0],
						});
					}
				});
			} else if (result?.message) {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error('An unexpected error occurred. Please try again.');
			console.error('Form submission error:', error);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Member Information</CardTitle>
				<CardDescription>
					Update {member.firstName} {member.lastName}&apos;s details below.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter first name'
												{...field}
												disabled={form.formState.isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter last name'
												{...field}
												disabled={form.formState.isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='dateOfBirth'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of Birth</FormLabel>
									<FormControl>
										<Input
											type='date'
											{...field}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phoneNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter phone number'
											{...field}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex gap-4 pt-4'>
							<Button
								type='button'
								variant='outline'
								className='flex-1'
								onClick={() => router.push(`/members/${member.id}`)}
								disabled={form.formState.isSubmitting}
							>
								Cancel
							</Button>
							<Button
								type='submit'
								className='flex-1'
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Updating...
									</>
								) : (
									'Update Member'
								)}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
