import { IconDashboard, IconUsers, IconUserCog } from '@tabler/icons-react';

export const sidebarData = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: IconDashboard,
		},
		{
			title: 'Users',
			url: '/users',
			icon: IconUserCog,
		},
		{
			title: 'Members',
			url: '/members',
			icon: IconUsers,
		},
	],
};
