'use server';

export const signInAction = async (prevState: any, formData: FormData) => {
	console.log(formData.get('username'));
	console.log(formData.get('password'));
	return {
		success: true,
		message: 'Sign in successful',
		data: {
			username: formData.get('username'),
			password: formData.get('password'),
		},
		error: null,
	};
};
