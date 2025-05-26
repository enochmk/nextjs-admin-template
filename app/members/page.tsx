export default function CreateMemberPage() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-2xl font-bold mb-4'>Create Member</h1>
			<p className='text-gray-600 mb-8'>
				Please fill out the form below to create a new member.
			</p>
			{/* Here you would typically include a form component */}
			{/* <CreateMemberForm /> */}
		</div>
	);
}
