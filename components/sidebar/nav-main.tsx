'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Icon } from '@tabler/icons-react';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

type NavMainItem = {
	items: {
		title: string;
		url: string;
		icon?: Icon;
	}[];
};

export function NavMain({ items }: NavMainItem) {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupContent className='flex flex-col gap-2'>
				<SidebarMenu>
					{items.map((item) => (
						<Link
							href={item.url}
							key={item.title}
						>
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									tooltip={item.title}
									isActive={pathname.startsWith(item.url)}
								>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</Link>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
