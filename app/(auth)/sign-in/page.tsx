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
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<SignInForm />
			</div>
		</div>
	);
}
