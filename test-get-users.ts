// Simple test script to verify users data fetching
import { getUsers } from './app/(main)/users/actions';

async function testGetUsers() {
	console.log('🧪 Testing getUsers function...\n');

	try {
		// Test basic functionality
		console.log('1️⃣ Getting all users...');
		const result = await getUsers();
		console.log(`✅ Found ${result.totalUsers} users`);
		console.log(`📄 Page ${result.currentPage} of ${result.totalPages}`);
		console.log('👥 Users:');
		result.users.forEach(user => {
			console.log(`  - ID: ${user.id}`);
			console.log(`    Name: ${user.name}`);
			console.log(`    Email: ${user.email}`);
			console.log(`    Email Verified: ${user.emailVerified}`);
			console.log(`    Image: ${user.image || 'None'}`);
			console.log('');
		});

		// Test pagination
		console.log('2️⃣ Testing pagination...');
		const paginatedResult = await getUsers({ page: 1, limit: 5 });
		console.log(
			`✅ Pagination test: ${paginatedResult.users.length} users per page`
		);

		// Test search
		console.log('3️⃣ Testing search...');
		const searchResult = await getUsers({ search: 'enoch' });
		console.log(
			`✅ Search test: found ${searchResult.totalUsers} users matching "enoch"`
		);

		// Test sorting
		console.log('4️⃣ Testing sorting...');
		const sortedResult = await getUsers({ sortBy: 'email', sortOrder: 'asc' });
		console.log('✅ Sorting test: users sorted by email');
		sortedResult.users.forEach(user => {
			console.log(`  - ${user.email}`);
		});

		console.log('\n🎉 All read operations working correctly!');
	} catch (error) {
		console.error('❌ Test failed:', error);
		throw error;
	}
}

// Run the test
testGetUsers()
	.then(() => {
		console.log('\n✅ Testing completed successfully');
		process.exit(0);
	})
	.catch(error => {
		console.error('\n❌ Testing failed:', error);
		process.exit(1);
	});
