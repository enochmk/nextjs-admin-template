'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { UserFormModal } from './user-form-modal';

interface UsersFiltersProps {
	totalUsers: number;
}

export function UsersFilters({ totalUsers }: UsersFiltersProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const [search, setSearch] = useState(searchParams.get('search') || '');
	const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'name');
	const [sortOrder, setSortOrder] = useState(
		searchParams.get('sortOrder') || 'asc'
	);

	const updateFilters = (updates: Record<string, string | null>) => {
		startTransition(() => {
			const params = new URLSearchParams(searchParams);

			Object.entries(updates).forEach(([key, value]) => {
				if (value === null || value === '') {
					params.delete(key);
				} else {
					params.set(key, value);
				}
			});

			// Reset to page 1 when filters change
			if (Object.keys(updates).some(key => key !== 'page')) {
				params.delete('page');
			}

			router.push(`${pathname}?${params.toString()}`);
		});
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		updateFilters({ search });
	};

	const handleSortChange = (value: string) => {
		setSortBy(value);
		updateFilters({ sortBy: value });
	};

	const handleSortOrderChange = (value: string) => {
		setSortOrder(value);
		updateFilters({ sortOrder: value });
	};

	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex flex-1 gap-2">
					<form onSubmit={handleSearch} className="flex max-w-sm flex-1 gap-2">
						<div className="relative flex-1">
							<IconSearch className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
							<Input
								placeholder="Search users..."
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="pl-9"
							/>
						</div>
						<Button type="submit" disabled={isPending}>
							Search
						</Button>
					</form>

					<div className="flex gap-2">
						<Select value={sortBy} onValueChange={handleSortChange}>
							<SelectTrigger className="w-32">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">Name</SelectItem>
								<SelectItem value="email">Email</SelectItem>
							</SelectContent>
						</Select>

						<Select value={sortOrder} onValueChange={handleSortOrderChange}>
							<SelectTrigger className="w-32">
								<SelectValue placeholder="Order" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="asc">A-Z</SelectItem>
								<SelectItem value="desc">Z-A</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<p className="text-muted-foreground text-sm">
						{totalUsers} user{totalUsers !== 1 ? 's' : ''} total
					</p>
					<Button onClick={() => setIsCreateModalOpen(true)}>
						<IconPlus className="mr-2 h-4 w-4" />
						Add User
					</Button>
				</div>
			</div>

			<UserFormModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				mode="create"
			/>
		</>
	);
}
