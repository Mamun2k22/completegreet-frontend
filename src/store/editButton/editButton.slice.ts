import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store';
import { IBubbleButtonConfigType } from '@store/bubble/bubble.slice';

const initialState: ButtonState = {
	isOpen: false,
	currentButton: {
		action: null,
		color: null,
		type: null,
		icon: null,
		title: null,
	},
};

const slice = createSlice({
	name: 'editButton',
	initialState,
	reducers: {
		setOpenButtonConfigOpen: (
			state,
			action: PayloadAction<{ isOpen: ButtonState['isOpen']; currentButton: IBubbleButtonConfigType }>,
		) => {
			state.isOpen = action.payload.isOpen;
			state.currentButton = action.payload.currentButton;
		},
		hideButtonCollapse: (state, action: PayloadAction) => {
			state.isOpen = false;
		},
		setCurrentButton: (state, action: PayloadAction<IBubbleButtonConfigType>) => {
			state.currentButton = action.payload;
		},
	},
});

export default slice.reducer;

export const { setOpenButtonConfigOpen, hideButtonCollapse, setCurrentButton } = slice.actions;

export const getEditButtonState = (state: AppState): typeof initialState => state.editButton;

export type ButtonState = {
	isOpen: boolean;
	currentButton: IBubbleButtonConfigType;
};

// export type IBubbleButtonConfigType = {
// 	type: 'Calendly' | 'Contact' | 'Link' | 'Call' | 'Chat' | string;
// 	color: string;
// 	action: string;
// 	icon?: string;
// 	title?: string;
// 	name_on_live_chat?: string;
// 	first_message?: string;
// 	first_message_delay?: number;
// 	open_hours?: OpenHoursType;
// 	phone_number?: string;
// 	email?: string;
// 	calendly_url?: string;
// 	link_url?: string;
// 	open_in_new_tab?: boolean;
// };

export type OpenHoursType = {
	from: string;
	to: string;
};
