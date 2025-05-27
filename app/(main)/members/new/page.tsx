'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { newMemberSchema } from './schema';
import { createMember } from '../actions';

export default function NewMemberPage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm<z.infer<typeof newMemberSchema>>({
		resolver: zodResolver(newMemberSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			phoneNumber: '',
		},
	});

	async function onSubmit(data: z.infer<typeof newMemberSchema>) {
		setIsSubmitting(true);
		try {
			const formData = new FormData();
			Object.entries(data).forEach(([k, v]) => formData.append(k, v as string));
			const result = await createMember(formData);

			if (result?.success) {
				toast.success(result.message || 'Member created successfully!');
				form.reset();
				redirect('/members');
			} else {
				toast.error(result?.message || 'Failed to create member');
			}
		} catch (error) {
			toast.error('An unexpected error occurred');
			console.error('Error creating member:', error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className='container mx-auto p-6 max-w-4xl'>
			{/* Breadcrumb Navigation */}
			<div className='mb-6'>
				<Link
					href='/members'
					className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors'
				>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Back to Members
				</Link>
			</div>

			{/* Page Header */}
			<div className='mb-8'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>
							Add New Member
						</h1>
						<p className='text-muted-foreground mt-2'>
							Create a new member by filling out the form below
						</p>
					</div>
				</div>
			</div>

			{/* Add Form */}
			<Card>
				<CardContent className='p-6'>
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
													disabled={isSubmitting}
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
													disabled={isSubmitting}
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
												disabled={isSubmitting}
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
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex gap-4'>
								<Button
									type='button'
									variant='outline'
									className='flex-1'
									onClick={() => router.push('/members')}
									disabled={isSubmitting}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='flex-1'
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Creating...
										</>
									) : (
										'Create Member'
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
