import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { count, desc } from 'drizzle-orm';
import {
	PaginationParams,
	PaginationResult,
	calculateOffset,
	calculatePagination,
} from '@/lib/pagination';
import type { Member } from '@/lib/db/schema';

export async function getMembersPaginated(
	params: PaginationParams,
): Promise<PaginationResult<Member>> {
	const offset = calculateOffset(params.page, params.limit);

	// Run both queries in parallel for better performance
	const [totalResult, data] = await Promise.all([
		db.select({ count: count() }).from(members),
		db
			.select()
			.from(members)
			.limit(params.limit)
			.offset(offset)
			.orderBy(desc(members.createdAt)),
	]);

	const total = totalResult[0].count;
	const pagination = calculatePagination(params.page, params.limit, total);

	return {
		data,
		pagination,
	};
}
