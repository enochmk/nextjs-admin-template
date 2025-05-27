import { IconDashboard, IconUsers } from '@tabler/icons-react';

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
			title: 'Members',
			url: '/members',
			icon: IconUsers,
		},
	],
};
