import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { count, desc, and, or, ilike, gte, lte, SQL } from 'drizzle-orm';
import {
	PaginationParams,
	PaginationResult,
	calculateOffset,
	calculatePagination,
} from '@/lib/pagination';
import type { Member } from '@/lib/db/schema';

export interface SearchParams {
	search?: string;
	dateFrom?: string;
	dateTo?: string;
}

export interface MembersQueryParams extends PaginationParams {
	search?: SearchParams;
}

export async function getMembersPaginated(
	params: MembersQueryParams,
): Promise<PaginationResult<Member>> {
	const offset = calculateOffset(params.page, params.limit);

	// Build where conditions based on search parameters
	const whereConditions: SQL[] = [];

	if (params.search?.search) {
		const searchTerm = `%${params.search.search}%`;
		whereConditions.push(
			or(
				ilike(members.firstName, searchTerm),
				ilike(members.lastName, searchTerm),
				ilike(members.phoneNumber, searchTerm),
			)!,
		);
	}

	if (params.search?.dateFrom) {
		const fromDate = new Date(params.search.dateFrom);
		fromDate.setHours(0, 0, 0, 0); // Start of day
		whereConditions.push(gte(members.createdAt, fromDate));
	}

	if (params.search?.dateTo) {
		const toDate = new Date(params.search.dateTo);
		toDate.setHours(23, 59, 59, 999); // End of day
		whereConditions.push(lte(members.createdAt, toDate));
	}

	const whereClause =
		whereConditions.length > 0 ? and(...whereConditions) : undefined;

	// Run both queries in parallel for better performance
	const [totalResult, data] = await Promise.all([
		db.select({ count: count() }).from(members).where(whereClause),
		db
			.select()
			.from(members)
			.where(whereClause)
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
