'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import { Search, X, Calendar as CalendarIcon, Filter } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface SearchFiltersProps {
	totalResults: number;
}

export default function SearchFilters({ totalResults }: SearchFiltersProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [searchQuery, setSearchQuery] = useState(
		searchParams.get('search') || '',
	);
	const [dateFrom, setDateFrom] = useState<Date | undefined>(
		searchParams.get('dateFrom')
			? new Date(searchParams.get('dateFrom')!)
			: undefined,
	);
	const [dateTo, setDateTo] = useState<Date | undefined>(
		searchParams.get('dateTo')
			? new Date(searchParams.get('dateTo')!)
			: undefined,
	);

	const createSearchURL = (params: Record<string, string | undefined>) => {
		const newParams = new URLSearchParams(searchParams);

		// Reset page to 1 when searching
		newParams.set('page', '1');

		// Update search parameters
		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				newParams.set(key, value);
			} else {
				newParams.delete(key);
			}
		});

		return `?${newParams.toString()}`;
	};

	const handleSearch = () => {
		const params: Record<string, string | undefined> = {
			search: searchQuery || undefined,
			dateFrom: dateFrom ? format(dateFrom, 'yyyy-MM-dd') : undefined,
			dateTo: dateTo ? format(dateTo, 'yyyy-MM-dd') : undefined,
		};

		router.push(createSearchURL(params));
	};

	const handleClearFilters = () => {
		setSearchQuery('');
		setDateFrom(undefined);
		setDateTo(undefined);

		const newParams = new URLSearchParams(searchParams);
		newParams.delete('search');
		newParams.delete('dateFrom');
		newParams.delete('dateTo');
		newParams.set('page', '1');

		router.push(`?${newParams.toString()}`);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const hasActiveFilters = searchQuery || dateFrom || dateTo;

	return (
		<div className='bg-card border rounded-lg p-4 mb-6'>
			<div className='flex flex-col lg:flex-row gap-4'>
				{/* Search Input */}
				<div className='flex-1'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
						<Input
							placeholder='Search by name or phone number...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyPress={handleKeyPress}
							className='pl-10'
						/>
					</div>
				</div>

				{/* Date Filters */}
				<div className='flex gap-2'>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className='w-40 justify-start text-left font-normal'
							>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{dateFrom ? format(dateFrom, 'MMM dd, yyyy') : 'From date'}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className='w-auto p-0'
							align='start'
						>
							<Calendar
								mode='single'
								selected={dateFrom}
								onSelect={setDateFrom}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className='w-40 justify-start text-left font-normal'
							>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{dateTo ? format(dateTo, 'MMM dd, yyyy') : 'To date'}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className='w-auto p-0'
							align='start'
						>
							<Calendar
								mode='single'
								selected={dateTo}
								onSelect={setDateTo}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>

				{/* Action Buttons */}
				<div className='flex gap-2'>
					<Button
						onClick={handleSearch}
						size='sm'
					>
						<Filter className='mr-2 h-4 w-4' />
						Apply
					</Button>

					{hasActiveFilters && (
						<Button
							onClick={handleClearFilters}
							variant='outline'
							size='sm'
						>
							<X className='mr-2 h-4 w-4' />
							Clear
						</Button>
					)}
				</div>
			</div>

			{/* Results Summary */}
			{hasActiveFilters && (
				<div className='mt-3 pt-3 border-t'>
					<div className='flex items-center justify-between text-sm text-muted-foreground'>
						<div className='flex items-center gap-4'>
							{searchQuery && (
								<span>
									Search: <strong>&ldquo;{searchQuery}&rdquo;</strong>
								</span>
							)}
							{dateFrom && (
								<span>
									From: <strong>{format(dateFrom, 'MMM dd, yyyy')}</strong>
								</span>
							)}
							{dateTo && (
								<span>
									To: <strong>{format(dateTo, 'MMM dd, yyyy')}</strong>
								</span>
							)}
						</div>
						<span>
							{totalResults} result{totalResults !== 1 ? 's' : ''} found
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
