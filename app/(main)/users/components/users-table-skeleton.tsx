import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface UsersTableSkeletonProps {
	rows?: number;
}

export function UsersTableSkeleton({ rows = 5 }: UsersTableSkeletonProps) {
	return (
		<div className="px-6">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-16">#</TableHead>
						<TableHead>User</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="w-20">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: rows }).map((_, index) => (
						<TableRow key={index}>
							<TableCell>
								<Skeleton className="h-4 w-8" />
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Skeleton className="h-8 w-8 rounded-full" />
									<Skeleton className="h-4 w-32" />
								</div>
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-48" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-16 rounded-full" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-8 w-8" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
