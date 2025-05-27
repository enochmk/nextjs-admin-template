import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import SignInForm from '@/app/(auth)/sign-in/components/sign-in-form';

export default async function SignInPage() {
	const session = await auth();

	// Redirect if already authenticated
	if (session) {
		redirect('/dashboard');
	}

	return (
		<div className="from-background via-muted/20 to-background flex min-h-svh items-center justify-center bg-gradient-to-br p-4 sm:p-6 md:p-10">
			<div className="w-full max-w-md">
				<SignInForm />
			</div>
		</div>
	);
}
