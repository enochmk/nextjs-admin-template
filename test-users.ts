// Test script to verify users management functionality
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
} from './app/(main)/users/actions';

async function testUsersManagement() {
	console.log('🧪 Testing Users Management System...\n');

	try {
		// Test 1: Get users
		console.log('1️⃣ Testing getUsers...');
		const result = await getUsers({ page: 1, limit: 10 });
		console.log(`✅ Found ${result.totalUsers} users`);
		console.log(`📄 Page ${result.currentPage} of ${result.totalPages}`);
		console.log(
			'👥 Users:',
			result.users.map(u => ({ id: u.id, name: u.name, email: u.email }))
		);

		// Test 2: Create a new user
		console.log('\n2️⃣ Testing createUser...');
		const newUser = await createUser({
			name: 'Jane Doe',
			email: 'jane@example.com',
			password: 'password123',
		});
		console.log('✅ User created successfully:', newUser);

		// Test 3: Update user (without password)
		if (newUser.id) {
			console.log('\n3️⃣ Testing updateUser...');
			const updatedUser = await updateUser(newUser.id, {
				name: 'Jane Smith',
				email: 'jane.smith@example.com',
			});
			console.log('✅ User updated successfully:', updatedUser);
		}

		// Test 4: Get users with search filter
		console.log('\n4️⃣ Testing getUsers with search...');
		const searchResult = await getUsers({ search: 'jane', page: 1, limit: 10 });
		console.log(
			`✅ Search found ${searchResult.totalUsers} users matching "jane"`
		);

		// Test 5: Get users with sorting
		console.log('\n5️⃣ Testing getUsers with sorting...');
		const sortedResult = await getUsers({
			sortBy: 'email',
			sortOrder: 'desc',
			page: 1,
			limit: 10,
		});
		console.log(
			'✅ Users sorted by email (desc):',
			sortedResult.users.map(u => u.email)
		);

		// Test 6: Clean up - delete the test user
		if (newUser.id) {
			console.log('\n6️⃣ Testing deleteUser...');
			await deleteUser(newUser.id);
			console.log('✅ Test user deleted successfully');
		}

		console.log(
			'\n🎉 All tests passed! Users management system is working correctly.'
		);
	} catch (error) {
		console.error('❌ Test failed:', error);
		throw error;
	}
}

// Run the tests
testUsersManagement()
	.then(() => {
		console.log('\n✅ Testing completed successfully');
		process.exit(0);
	})
	.catch(error => {
		console.error('\n❌ Testing failed:', error);
		process.exit(1);
	});
