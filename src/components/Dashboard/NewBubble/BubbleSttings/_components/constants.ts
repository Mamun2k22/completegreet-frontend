import { chat, links, mailSend, phoneDialPad, teams } from '@libs/icons';
import { IBubbleButtonConfigType } from '@store/bubble/bubble.slice';

export const buttonItems: IBubbleButtonConfigType[] = [
	{
		type: 'Chat',
		color: '#FF5E1C',
		action: '',
		icon: chat,
		title: 'Live Chat',
		first_message_delay: 1,
		bubble_greet_msg: 'Hey, thanks for visiting! Feel free to ask anything.!!!',
	},
	{
		type: 'Call',
		color: '#FF5E1C',
		action: '',
		icon: phoneDialPad,
		title: 'Call Phone',
	},
	{
		type: 'Link',
		color: '#FF5E1C',
		action: '',
		icon: links,

		title: 'Link To Page',
	},
	{
		type: 'Contact',
		color: '#FF5E1C',
		action: '',
		icon: mailSend,
		title: 'Built In Contact Form',
	},
	{
		type: 'Calendly',
		color: '#FF5E1C',
		action: '',
		icon: teams,
		title: 'Book Meeting On Calendly',
	},
];
