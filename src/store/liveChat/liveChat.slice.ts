import { IChatList } from '@libs/api/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store';
import { IChatHistory } from './../../libs/api/interfaces/bubble';

const initialState: ILiveChatState = {
	chatList: null,
	chatHistory: null,
	activeChat: null,
};

const slice = createSlice({
	name: 'liveChat',
	initialState,
	reducers: {
		setChatList: (state, action: PayloadAction<ILiveChatState['chatList']>) => {
			state.chatList = action.payload;
		},
		setChatHistory: (state, action: PayloadAction<ILiveChatState['chatHistory']>) => {
			state.chatHistory = action.payload;
		},
		setActiveChat: (state, action: PayloadAction<ILiveChatState['activeChat']>) => {
			console.log('setActiveChat');

			state.activeChat = action.payload;
		},
	},
});

export default slice.reducer;

export const { setChatList, setChatHistory, setActiveChat } = slice.actions;

export const getLiveChatState = (state: AppState): typeof initialState => state.liveChat;

interface ILiveChatState {
	activeChat: IChatList;
	chatList: IChatList[];
	chatHistory: IChatHistory[];
}
