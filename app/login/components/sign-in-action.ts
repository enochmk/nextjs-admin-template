'use server';

export const signInAction = async (formData: FormData) => {
	console.log('Sign In Action:');
	console.log(formData.get('username'));
	console.log(formData.get('password'));
};
