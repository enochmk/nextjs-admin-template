'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

import { useRouter } from 'next/navigation';
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
import { newMemberAction } from './action';
import { newMemberSchema } from './schema';

export default function NewMemberPage() {
	const router = useRouter();
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
		const formData = new FormData();
		Object.entries(data).forEach(([k, v]) => formData.append(k, v as string));
		const result = await newMemberAction(null, formData);
		if (result?.success) {
			toast.success(result.message || 'Member created successfully!');
			form.reset();
			redirect('/members');
		}
	}

	return (
		<div className='container mx-auto py-6'>
			<Card className='max-w-2xl mx-auto'>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<div>
							<CardTitle>Add New Member</CardTitle>
							<CardDescription>
								Create a new member by filling out the form below.
							</CardDescription>
						</div>
						<Link href='/members'>
							<Button
								variant='outline'
								className='text-accent-foreground bg-accent hover:bg-accent/80'
							>
								← Back
							</Button>
						</Link>
					</div>
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
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='flex-1'
								>
									Create Member
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
