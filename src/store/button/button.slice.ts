import { IDropdownType } from '@components/common/SelectDropdown';
import { chat, links, mailSend, phoneDialPad, teams } from '@libs/icons';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store';

const initialState: ButtonState = {
	buttonFunctions: [
		{
			title: 'Live Chat',
			icon: chat,
			value: 'live_chat',
		},
		{
			title: 'Call Phone',
			icon: phoneDialPad,
			value: 'call_phone',
		},
		{
			title: 'Link To Page',
			icon: links,
			value: 'link_to_page',
		},
		{
			title: 'Built In Contact Form',
			icon: mailSend,
			value: 'built_in_contact_form',
		},
		{
			title: 'Book Meeting On Calendly',
			icon: teams,
			value: 'book_meeting_on_calendly',
		},
	],
	liveChatFields: {
		nameOnLiveChat: '',
		firstMessage: '',
		firstMessageDelay: 3,
		openHours: '',
	},
	callPhoneFields: {
		phoneNumber: '',
		openHours: '',
	},
	linkToPageFields: {
		linkUrl: '',
		isOpenNewTab: true,
	},
	bluitInContactFormFields: {
		email: '',
	},
	bookMeetingsOnCalendlyFields: {
		url: '',
	},
	currentActiveButton: {
		title: '',
		icon: '',
		type: null,
	},
	isOpen: false,
	buttonColor: '#FF5E1C',
	buttonColors: ['#3B46F8', '#3B5DCD', '#2C85FF', '#FF5E1C', '#15B8FC', '#0BDC78', '#B12929', '#DA1ABB'],
	buttonTitle: '',
	position: 100,
};

const slice = createSlice({
	name: 'button',
	initialState,
	reducers: {
		setLiveChatFields: (state, action: PayloadAction<LiveChatFieldsType>) => {
			state.liveChatFields = { ...action.payload };
		},
		setCallPhoneFields: (state, action: PayloadAction<CallPhoneTypes>) => {
			state.callPhoneFields = { ...action.payload };
		},
		setLinkToPageFields: (state, action: PayloadAction<LinkToPageFieldsType>) => {
			state.linkToPageFields = { ...action.payload };
		},
		setBuitInContactFormFields: (state, action: PayloadAction<{ email: string }>) => {
			state.bluitInContactFormFields = { ...action.payload };
		},
		setBookMeetingsOnCalendlyFields: (state, action: PayloadAction<{ url: string }>) => {
			state.bookMeetingsOnCalendlyFields = { ...action.payload };
		},
		setButtonConfigs: (
			state,
			action: PayloadAction<{ buttonColor: string; buttonTitle: string; position: number }>,
		) => {
			const items = { ...action.payload };
			state.buttonColor = items.buttonColor;
			state.buttonTitle = items.buttonTitle;
			state.position = items.position;
		},
		setOpenButtonConfigOpen: (state, action: PayloadAction<ButtonState['isOpen']>) => {
			state.isOpen = action.payload;
		},
		resetButtonState: (state) => {
			state = initialState;
		},
		setCurrentButtonFunction: (state, action: PayloadAction<IDropdownType>) => {
			state.currentActiveButton.icon = action.payload.icon;
			state.currentActiveButton.title = action.payload.title;
			state.currentActiveButton.type = action.payload.type;
		},
	},
});

export default slice.reducer;

export const {
	setButtonConfigs,
	setOpenButtonConfigOpen,
	setCurrentButtonFunction,
	setLiveChatFields,
	setCallPhoneFields,
	setLinkToPageFields,
	setBuitInContactFormFields,
	setBookMeetingsOnCalendlyFields,
} = slice.actions;

export const getButtonState = (state: AppState): typeof initialState => state.button;

export type ButtonState = {
	buttonFunctions: ButtonFunctionsType;
	liveChatFields: LiveChatFieldsType;
	callPhoneFields: CallPhoneTypes;
	linkToPageFields: LinkToPageFieldsType;
	bluitInContactFormFields: {
		email: string;
	};
	bookMeetingsOnCalendlyFields: {
		url: String;
	};
	isOpen?: boolean;
	buttonTitle: string;
	buttonColor: string;
	position: number;
	currentActiveButton: IDropdownType;
	buttonColors: string[];
};

export type LiveChatFieldsType = {
	nameOnLiveChat: string;
	firstMessage: string;
	firstMessageDelay: number;
	openHours: string;
};
export type CallPhoneTypes = {
	phoneNumber: string;
	openHours: string;
};
export type LinkToPageFieldsType = {
	linkUrl: string;
	isOpenNewTab: boolean;
};

export type ButtonFunctionsType = SingleFunctionType[];
export type SingleFunctionType = {
	title: string;
	icon?: string;
	value: ButtonFunctionType;
};

export type ButtonFunctionType =
	| 'live_chat'
	| 'call_phone'
	| 'link_to_page'
	| 'book_meeting_on_calendly'
	| 'built_in_contact_form';
