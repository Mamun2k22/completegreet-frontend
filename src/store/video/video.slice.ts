import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store';

const initialState: VideoState = {
	popup: {
		isOpen: false,
	},
	videoUrl: null,
	videoDuration: 0,
	mainVideoData: null,
	pagePath: 'videoLibrary',
	currentButtonInfo: {
		currentButtonDetails: '',
		buttonConfigPageType: 'bubble_config_1',
	},
};

const slice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		videoPopup: (state, action: PayloadAction<VPopup>) => {
			state.popup = { ...action.payload };
		},

		setPagePath: (state, action: PayloadAction<pagePathtype>) => {
			state.pagePath = action.payload;
		},
		setCurrentButtonInfo: (state, action: PayloadAction<ButtonInfoType>) => {
			state.currentButtonInfo.buttonConfigPageType = action.payload.buttonConfigPageType;
			// state.currentButtonInfo.currentButtonDetails = action.payload.currentButtonDetails;
		},
	},
});

export default slice.reducer;

export const { videoPopup, setPagePath, setCurrentButtonInfo } = slice.actions;

export const getVideoState = (state: AppState): typeof initialState => state.video;

type VideoState = {
	popup: VPopup;
	videoUrl: string;
	pagePath: pagePathtype;
	currentButtonInfo: ButtonInfoType;
	videoDuration: number;
	mainVideoData: File;
};

type ButtonInfoType = {
	buttonConfigPageType: string;
	currentButtonDetails?: string;
};

type pagePathtype = 'videoLibrary' | 'bubbleConfig';

type VPopup = {
	isOpen: boolean;
};
