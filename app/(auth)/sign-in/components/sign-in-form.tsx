'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { signInFormSchema } from '../schema';

export default function SignInForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(data: z.infer<typeof signInFormSchema>) {
		setIsSubmitting(true);
		try {
			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				toast.error('Invalid email or password');
			} else {
				toast.success('Sign in successful!');
				router.push('/dashboard');
				router.refresh();
			}
		} catch (error) {
			toast.error('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="from-background via-background to-background/95 border-border/50 w-full max-w-md bg-gradient-to-br shadow-xl backdrop-blur-sm">
				<CardHeader className="space-y-6 pb-8 text-center">
					<div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
						<Lock className="text-primary h-6 w-6" />
					</div>
					<div className="space-y-2">
						<CardTitle className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
							Welcome back
						</CardTitle>
						<p className="text-muted-foreground text-sm">
							Sign in to your account to continue
						</p>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-medium">
												Email address
											</FormLabel>
											<FormControl>
												<div className="group relative">
													<Mail className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform transition-colors" />
													<Input
														type="email"
														placeholder="Enter your email"
														className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-11 pl-10 transition-all duration-200"
														{...field}
														disabled={isSubmitting}
													/>
												</div>
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
											<FormLabel className="text-sm font-medium">
												Password
											</FormLabel>
											<FormControl>
												<div className="group relative">
													<Lock className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform transition-colors" />
													<Input
														type={showPassword ? 'text' : 'password'}
														placeholder="Enter your password"
														className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-11 pr-10 pl-10 transition-all duration-200"
														{...field}
														disabled={isSubmitting}
													/>
													<button
														type="button"
														onClick={() => setShowPassword(!showPassword)}
														className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
														disabled={isSubmitting}
													>
														{showPassword ? (
															<EyeOff className="h-4 w-4" />
														) : (
															<Eye className="h-4 w-4" />
														)}
													</button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button
								type="submit"
								className="from-primary to-primary/90 hover:from-primary/90 hover:to-primary h-11 w-full bg-gradient-to-r font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing in...
									</>
								) : (
									'Sign in to your account'
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>

			<div className="text-muted-foreground text-center text-xs text-balance">
				By continuing, you agree to our{' '}
				<a
					href="#"
					className="hover:text-primary underline underline-offset-4 transition-colors"
				>
					Terms of Service
				</a>{' '}
				and{' '}
				<a
					href="#"
					className="hover:text-primary underline underline-offset-4 transition-colors"
				>
					Privacy Policy
				</a>
				.
			</div>
		</div>
	);
}
