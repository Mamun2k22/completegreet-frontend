import { chat, dashboardIcon, subscritption, videoIcon } from '@libs/icons';

export const menuArray: MenuType = [
	{
		title: 'Dashboard',
		icon: dashboardIcon,
		slug: '/dashboard',
	},
	{
		title: 'Live Chat',
		icon: chat,
		slug: '/dashboard/live-chat',
	},
	{
		title: 'New Bubble',
		icon: videoIcon,
		slug: '/dashboard/new-bubble',
	},
	// {
	// 	title: 'Team',
	// 	icon: teams,
	// 	slug: '/dashboard/team',
	// },
	{
		title: 'Subscription',
		icon: subscritption,
		slug: '/dashboard/subscription',
	},
];

type MenuType = {
	title: string;
	icon?: string;
	slug: string;
}[];
