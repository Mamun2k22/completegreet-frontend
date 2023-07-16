import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store';

const initialState: StateType = {
	loading: false,
	chat: 0,
	new_chat: 0,
	new_visitor: 0,
	old_chat: 0,
	old_visitor: 0,
	visitor: 0,
	visitor_capacity: 0,
	visitor_percent: 0,
	plan_id: null,
};

const slice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		setSubscriberDetails: (state, action: PayloadAction<StateType>) => {
			state.chat = action.payload.chat;
			state.new_chat = action.payload.new_chat;
			state.new_visitor = action.payload.new_visitor;
			state.old_chat = action.payload.old_chat;
			state.old_visitor = action.payload.old_visitor;
			state.plan_id = action.payload.plan_id;
			state.visitor = action.payload.visitor;
			state.visitor_capacity = action.payload.visitor_capacity;
			state.visitor_percent = action.payload.visitor_percent;
		},
		setLoading: (state, action: PayloadAction<StateType['loading']>) => {
			state.loading = action.payload;
		},
	},
});

export default slice.reducer;

export const { setSubscriberDetails, setLoading } = slice.actions;

export const getSubscriberState = (state: AppState): typeof initialState => state.dashboard;

export type StateType = {
	loading?: boolean;
	chat: number;
	new_chat: number;
	new_visitor: number;
	old_chat: number;
	old_visitor: number;
	visitor: number;
	visitor_capacity: number;
	visitor_percent: number;
	plan_id: number;
};
