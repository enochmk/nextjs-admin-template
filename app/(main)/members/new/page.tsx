'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
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
import { createMemberAction } from './action';
import { toast } from 'sonner';

const formSchema = z.object({
	firstName: z.string().min(2, {
		message: 'First name must be at least 2 characters.',
	}),
	lastName: z.string().min(2, {
		message: 'Last name must be at least 2 characters.',
	}),
	dateOfBirth: z.string().min(1, {
		message: 'Date of birth is required.',
	}),
	phoneNumber: z.string().min(10, {
		message: 'Phone number must be at least 10 characters.',
	}),
});

export default function NewMemberPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			phoneNumber: '',
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const formData = new FormData();
		Object.entries(data).forEach(([k, v]) => formData.append(k, v as string));
		const result = await createMemberAction(null, formData);
		console.log({ result });

		if (result?.success) {
			toast.success(result.message || 'Member created successfully!');
			form.reset();
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
							<Button
								type='submit'
								className='w-full'
							>
								Create Member
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
