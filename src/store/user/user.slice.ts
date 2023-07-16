import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store';

const initialState: IUserState = {
	isSidebarcollapse: false,
	isSidebarOpen: false,
	profile: {
		id: null,
		name: null,
		email: null,
		avatarURL: '/images/mainicon.png',
		token: null,
		plan_id: null,
	},
	isLoading: false,
	isAuthenticate: false,
	error: null,
	editMode: false,
	settings: {
		push_notification: 0,
		live_on_bubble: 0,
	},
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		sidebarCollapse: (state, action: PayloadAction<boolean>) => {
			state.isSidebarcollapse = action.payload;
		},

		authSignIn: (state, action: PayloadAction<IProfile>) => {
			state.profile = { ...action.payload.profile };
			state.isAuthenticate = true;
			state.settings = { ...action.payload.settings };
		},
		authSignOut: (state: any) => {
			for (const [key, value] of Object.entries(initialState)) {
				if (value !== null && typeof value === 'object') {
					state[key] = { ...value };
				} else {
					state[key] = value;
				}
			}
		},
		authUpdateAvatar: (state, action: PayloadAction<IProfile['profile']['avatarURL']>) => {
			state.profile.avatarURL = action.payload;
		},
		authUpdateProfile: (state: any, action: PayloadAction<Partial<IProfile>>) => {
			for (const [key, value] of Object.entries(action.payload)) {
				state.profile[key] = value;
			}
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setEditEditMode: (state, action: PayloadAction<boolean>) => {
			state.editMode = action.payload;
		},
		handleSidebarOpen: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
		handleSettings: (state, action: PayloadAction<Partial<IProfile['settings']>>) => {
			state.settings = { ...action.payload };
		},
		setPlanId: (state, action: PayloadAction<number>) => {
			state.profile.plan_id = action.payload;
		},
	},
});

export default slice.reducer;

export const {
	setLoading,
	setPlanId,
	setError,
	authSignIn,
	authSignOut,
	handleSettings,
	authUpdateAvatar,
	authUpdateProfile,
	sidebarCollapse,
	setEditEditMode,
	handleSidebarOpen,
} = slice.actions;

export const getUserState = (state: AppState): typeof initialState => state.user;

export type IProfile = {
	profile: {
		id?: number;
		name?: string;
		avatarURL?: string;
		email?: string;
		token?: string;
		plan_id?: number;
	};
	settings: settingsType;
};
export type settingsType = {
	push_notification?: number;
	live_on_bubble?: number;
};
type IUserState = {
	isLoading: boolean;
	profile: IProfile['profile'];
	isAuthenticate: boolean;
	isSidebarcollapse: boolean;
	error: string;
	editMode: boolean;
	isSidebarOpen: boolean;
	settings: IProfile['settings'];
};
