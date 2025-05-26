export const createMemberAction = async (
	prevState: any,
	formData: FormData,
) => {
	const firstName = formData.get('firstName')?.toString() || '';
	const lastName = formData.get('lastName')?.toString() || '';
	const dateOfBirth = formData.get('dateOfBirth')?.toString() || '';
	const phoneNumber = formData.get('phoneNumber')?.toString() || '';

	// Here you would typically send the data to your backend or database
	// For demonstration, we will just log it to the console
	console.log({
		firstName,
		lastName,
		dateOfBirth,
		phoneNumber,
	});

	// Redirect or return a response as needed
	return {
		success: true,
		error: null,
		message: 'Member created successfully!',
	};
};
