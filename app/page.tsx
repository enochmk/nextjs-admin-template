import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function Home() {
	const session = await auth();

	// Redirect to dashboard if authenticated, otherwise to login
	if (session) {
		redirect('/dashboard');
	} else {
		redirect('/login');
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<Loader2 className='h-6 w-6 animate-spin' />
		</div>
	);
}
