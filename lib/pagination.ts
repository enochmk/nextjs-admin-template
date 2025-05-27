export interface PaginationParams {
	page: number;
	limit: number;
}

export interface PaginationResult<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

export function calculateOffset(page: number, limit: number): number {
	return (page - 1) * limit;
}

export function calculatePagination(
	page: number,
	limit: number,
	total: number
) {
	const totalPages = Math.ceil(total / limit);

	return {
		page,
		limit,
		total,
		totalPages,
		hasNext: page < totalPages,
		hasPrev: page > 1,
	};
}

export function parsePaginationParams(
	searchParams: URLSearchParams,
	defaultLimit = 10
): PaginationParams {
	const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
	const limit = Math.max(
		1,
		parseInt(searchParams.get('limit') || defaultLimit.toString(), 10)
	);

	return { page, limit };
}
