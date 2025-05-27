'use client';

import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
	total: number;
	limit: number;
}

export default function PaginationControls({
	currentPage,
	totalPages,
	hasNext,
	hasPrev,
	total,
	limit,
}: PaginationControlsProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const createPageURL = (page: number, newLimit?: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		if (newLimit) {
			params.set('limit', newLimit.toString());
		}
		return `?${params.toString()}`;
	};

	const handleLimitChange = (newLimit: string) => {
		startTransition(() => {
			router.push(createPageURL(1, parseInt(newLimit)));
		});
	};

	const handlePageChange = (page: number) => {
		startTransition(() => {
			router.push(createPageURL(page));
		});
	};

	const startItem = (currentPage - 1) * limit + 1;
	const endItem = Math.min(currentPage * limit, total);

	// Generate page numbers to show
	const getVisiblePages = () => {
		const delta = 2; // Number of pages to show on each side of current page
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	if (total === 0) return null;

	return (
		<div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4 sm:flex-row">
			<div className="text-muted-foreground flex items-center gap-4 text-sm">
				<div>
					Showing {startItem} to {endItem} of {total} results
				</div>
				<div className="flex items-center gap-2">
					<span>Items per page:</span>
					<Select value={limit.toString()} onValueChange={handleLimitChange}>
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="5">5</SelectItem>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex items-center space-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={!hasPrev || isPending}
				>
					{isPending ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<ChevronLeft className="h-4 w-4" />
					)}
					Previous
				</Button>

				<div className="flex items-center space-x-1">
					{getVisiblePages().map((page, index) => (
						<div key={index}>
							{page === '...' ? (
								<span className="text-muted-foreground px-3 py-2 text-sm">
									...
								</span>
							) : (
								<Button
									variant={currentPage === page ? 'default' : 'outline'}
									size="sm"
									onClick={() => handlePageChange(page as number)}
									className="min-w-[2.5rem]"
									disabled={isPending}
								>
									{page}
								</Button>
							)}
						</div>
					))}
				</div>

				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={!hasNext || isPending}
				>
					Next
					{isPending ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<ChevronRight className="h-4 w-4" />
					)}
				</Button>
			</div>
		</div>
	);
}
