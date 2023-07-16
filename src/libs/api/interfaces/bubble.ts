import { GlobalBubbleType, IBubbleButtonConfigType } from '@store/bubble/bubble.slice';

export interface IBubbleType {
	mode?: 'laptop' | 'mobile';
	id?: number;
	user_id?: number;
	bubble_code?: string;
	bubble_name?: string;
	globalBubbleConfig?: GlobalBubbleType;
	bubble_video: string;
	bubble_gif: string;
	bubble_font_size: number;
	bubble_title: string;
	bubble_size: number;
	bubble_border_color: string;
	bubble_background_color: string;
	bubble_font_family: string;
	bubble_darken: number;
	bubble_style: 'Circle' | 'Rectangle';
	bubble_position: 'Left' | 'Right';
	bubble_video_fit: number;
	bubble_delay: number;
	bubble_animation: 'Top-to-bottom' | 'Left-to-right' | 'Right-to-left' | 'No-animation';
	is_deleted?: number;
	bubble_button_config: IBubbleButtonConfigType[] | string;
	is_show_on_a_specific_page: boolean;
	specific_page_url: string;
	bubble_all_pages: number;
	bubble_exc_pages: string[];
	is_complete_greet_button: boolean;
	bubble_greet_msg: string;
	deactivated?: boolean | number;
}

export interface IChatList {
	id: number;
	chat_cookie_id: string;
	chat_code: string;
	client_name: string;
	client_ip_address: string;
	client_city?: string;
	client_country?: string;
	client_email: string;
	hoster_id: number;
	bubble_id: number;
	chat_date: string;
	subscriber_id: number;
	created_at: string;
	updated_at: string;
	new_chat: number;
}

export interface IChatHistory {
	id: number;
	sender_id: string;
	time: string;
	receiver_id: string;
	bubble_id: string;
	chat_code: string;
	content: string;
	is_read: number;
	created_at: string;
	updated_at: string;
	chat_id: number;
	user_id: number;
}
