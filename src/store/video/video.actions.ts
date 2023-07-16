import store from '@store';
import { setCurrentButtonInfo, setPagePath, videoPopup } from './video.slice';

export const setVideoPopup = async (isOpen: boolean): Promise<void> => {
	store.dispatch(videoPopup({ isOpen: isOpen }));
};

export const setPagePathHandler = async (path: pagePathtype): Promise<void> => {
	store.dispatch(setPagePath(path));
};
export const handleSetCurrentButtonType = async (buttonInfo: ButtonInfoType): Promise<void> => {
	store.dispatch(setCurrentButtonInfo(buttonInfo));
};

type pagePathtype = 'videoLibrary' | 'bubbleConfig';
type ButtonInfoType = {
	buttonConfigPageType: string;
	currentButtonDetails?: string;
};

type RecordVideoType = {
	url: string;
	duration: number;
	mainVideoData: File;
};
