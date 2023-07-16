import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store';

const initialState: BubbleState = {
	mode: 'laptop',
	globalBubbleConfig: {
		isOpen: false,
	},
	id: null,
	bubble_available: 2,
	bubble_name: '',
	bubble_video: '',
	bubble_gif: '',
	bubble_font_size: 18,
	bubble_title: '',
	bubble_size: 100,
	bubble_border_color: '',
	bubble_background_color: '',
	bubble_font_family: 'Lucida',
	bubble_darken: 0,
	bubble_style: 'Circle',
	bubble_position: 'Right',
	bubble_video_fit: 1,
	bubble_delay: 2,
	bubble_animation: 'No-animation',
	is_deleted: 0,
	bubble_button_config: [],
	bubble_all_pages: 1,
	specific_page_url: null,
	is_show_on_a_specific_page: false,
	bubble_exc_pages: [''],
	is_complete_greet_button: false,
	bubble_code: null,
	video_file: null,
	deactivated: true,
	user_id: null,
	bubble_greet_msg: 'Hey, thanks for visiting! Feel free to ask anything.!!!',
	videoUploadMode: 'create',
};

const slice = createSlice({
	name: 'bubble',
	initialState,
	reducers: {
		setBubbleConfigs: (state, action: PayloadAction<BubbleState>) => {
			const items = { ...action.payload };
			state.id = items?.id;
			state.user_id = items?.user_id;
			state.bubble_all_pages = items.bubble_all_pages;
			state.bubble_animation = items.bubble_animation;
			state.bubble_background_color = items.bubble_background_color;
			state.bubble_border_color = items.bubble_border_color;
			state.bubble_darken = items.bubble_darken;
			state.bubble_delay = items.bubble_delay;
			state.bubble_exc_pages = items.bubble_exc_pages;
			state.mode = items.mode;
			state.bubble_font_family = items.bubble_font_family;
			state.bubble_font_size = items.bubble_font_size;
			state.bubble_gif = items.bubble_gif;
			state.bubble_name = items.bubble_name;
			state.bubble_position = items.bubble_position;
			state.bubble_size = items.bubble_size;
			state.bubble_style = items.bubble_style;
			state.bubble_title = items.bubble_title;
			state.bubble_video = items.bubble_video;
			state.bubble_video_fit = items.bubble_video_fit;
			state.is_deleted = items.is_deleted;
			state.specific_page_url = items.specific_page_url;
			state.is_show_on_a_specific_page = items.is_show_on_a_specific_page;
			state.is_complete_greet_button = items.is_complete_greet_button;
			state.bubble_available = items?.bubble_available;
			state.bubble_code = items?.bubble_code;
			state.deactivated = items?.deactivated;
		},
		setBubbleButtonConfig: (state, action: PayloadAction<IBubbleButtonConfigType[]>) => {
			state.bubble_button_config = action.payload;
		},
		setOpenGlobalBubble: (state, action: PayloadAction<GlobalBubbleType['isOpen']>) => {
			state.globalBubbleConfig.isOpen = action.payload;
		},
		setBubbleMode: (state, action: PayloadAction<BubbleState['mode']>) => {
			state.mode = action.payload;
		},
		setBubbleName: (state, action: PayloadAction<BubbleState['bubble_name']>) => {
			state.bubble_name = action.payload;
		},
		setVideoUrl: (state, action: PayloadAction<{ bubble_video: string; video_file: File }>) => {
			state.bubble_video = action.payload.bubble_video;
			state.video_file = action.payload.video_file;
		},
		setVideoMode: (state, action: PayloadAction<BubbleState['videoUploadMode']>) => {
			state.videoUploadMode = action.payload;
		},
		setIsCompleteGreetButton: (state, action: PayloadAction<BubbleState['is_complete_greet_button']>) => {
			state.is_complete_greet_button = action.payload;
		},
		resetBubbleState: (state) => {
			const items: BubbleState = {
				mode: 'laptop',
				globalBubbleConfig: {
					isOpen: false,
				},
				id: null,
				bubble_available: 2,
				bubble_name: '',
				bubble_video: '',
				bubble_gif: '',
				bubble_font_size: 18,
				bubble_title: '',
				bubble_size: 100,
				bubble_border_color: '',
				bubble_background_color: '',
				bubble_font_family: 'Lucida',
				bubble_darken: 0,
				bubble_style: 'Circle',
				bubble_position: 'Right',
				bubble_video_fit: 1,
				bubble_delay: 2,
				bubble_animation: 'No-animation',
				is_deleted: 0,
				bubble_button_config: [],
				bubble_all_pages: 1,
				specific_page_url: null,
				is_show_on_a_specific_page: false,
				bubble_exc_pages: [''],
				is_complete_greet_button: false,
				bubble_code: null,
				video_file: null,
				deactivated: true,
				user_id: null,
				bubble_greet_msg: 'Hey, thanks for visiting! Feel free to ask anything.!!!',
				videoUploadMode: 'create',
			};
			state.id = items?.id;
			state.video_file = items?.video_file;
			state.bubble_button_config = items?.bubble_button_config;
			state.videoUploadMode = items?.videoUploadMode;
			state.bubble_greet_msg = items?.bubble_greet_msg;
			state.globalBubbleConfig = items.globalBubbleConfig;
			state.user_id = items?.user_id;
			state.bubble_all_pages = items.bubble_all_pages;
			state.bubble_animation = items.bubble_animation;
			state.bubble_background_color = items.bubble_background_color;
			state.bubble_border_color = items.bubble_border_color;
			state.bubble_darken = items.bubble_darken;
			state.bubble_delay = items.bubble_delay;
			state.bubble_exc_pages = items.bubble_exc_pages;
			state.mode = items.mode;
			state.bubble_font_family = items.bubble_font_family;
			state.bubble_font_size = items.bubble_font_size;
			state.bubble_gif = items.bubble_gif;
			state.bubble_name = items.bubble_name;
			state.bubble_position = items.bubble_position;
			state.bubble_size = items.bubble_size;
			state.bubble_style = items.bubble_style;
			state.bubble_title = items.bubble_title;
			state.bubble_video = items.bubble_video;
			state.bubble_video_fit = items.bubble_video_fit;
			state.is_deleted = items.is_deleted;
			state.specific_page_url = items.specific_page_url;
			state.is_show_on_a_specific_page = items.is_show_on_a_specific_page;
			state.is_complete_greet_button = items.is_complete_greet_button;
			state.bubble_available = items?.bubble_available;
			state.bubble_code = items?.bubble_code;
			state.deactivated = items?.deactivated;
		},
	},
});

export default slice.reducer;

export const {
	setBubbleConfigs,
	setOpenGlobalBubble,
	setVideoUrl,
	setBubbleMode,
	setBubbleButtonConfig,
	setBubbleName,
	resetBubbleState,
	setVideoMode,
	setIsCompleteGreetButton,
} = slice.actions;

export const getBubbleState = (state: AppState): typeof initialState => state.bubble;

export type BubbleState = {
	id?: number;
	user_id?: number;
	bubble_available?: number;
	mode?: 'laptop' | 'mobile';
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
	bubble_button_config: IBubbleButtonConfigType[];
	is_show_on_a_specific_page: boolean;
	specific_page_url: string;
	bubble_all_pages: number;
	bubble_exc_pages: string[];
	is_complete_greet_button: boolean;
	bubble_code?: string;
	video_file?: File;
	bubble_greet_msg: string;
	deactivated?: boolean;
	videoUploadMode?: 'create' | 'edit' | 'change';
};

export type IBubbleButtonConfigType = {
	type: 'Calendly' | 'Contact' | 'Link' | 'Call' | 'Chat' | string;
	color: string;
	action: string;
	icon?: string;
	title?: string;
	name_on_live_chat?: string;
	first_message?: string;
	first_message_delay?: number;
	open_hours?: OpenHoursType;
	phone_number?: string;
	email?: string;
	calendly_url?: string;
	link_url?: string;
	open_in_new_tab?: boolean;
	bubble_greet_msg?: string;
};

export type GlobalBubbleType = {
	isOpen: boolean;
};

export type OpenHoursType = {
	from: string;
	to: string;
};
