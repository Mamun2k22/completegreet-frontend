import store from '@store';
import {
	BubbleState,
	GlobalBubbleType,
	IBubbleButtonConfigType,
	resetBubbleState,
	setBubbleButtonConfig,
	setBubbleConfigs,
	setBubbleMode,
	setBubbleName,
	setIsCompleteGreetButton,
	setOpenGlobalBubble,
	setVideoMode,
	setVideoUrl,
} from './bubble.slice';

export const setBubbleItems = async (items: BubbleState): Promise<void> => {
	store.dispatch(setBubbleConfigs(items));
};
export const handleGlobalBubbleOpen = async (isOpen: GlobalBubbleType['isOpen']): Promise<void> => {
	store.dispatch(setOpenGlobalBubble(isOpen));
};
export const handleCompleteGreetButton = async (isButton: boolean): Promise<void> => {
	store.dispatch(setIsCompleteGreetButton(isButton));
};
export const handleBubbleMode = async (mode: 'laptop' | 'mobile'): Promise<void> => {
	store.dispatch(setBubbleMode(mode));
};

export const setBubbleButtonConfigHandler = (data: IBubbleButtonConfigType[]) => {
	store.dispatch(setBubbleButtonConfig(data));
};
export const handleSetBubbleName = (name: string) => {
	store.dispatch(setBubbleName(name));
};
export const setRecordVideoUrl = async ({ bubble_video, video_file }: RecordVideoType): Promise<void> => {
	store.dispatch(setVideoUrl({ bubble_video, video_file }));
};
export const handleResetBubbleState = async (): Promise<void> => {
	store.dispatch(resetBubbleState());
};
export const setVideoModeHandler = async (mode: 'create' | 'edit' | 'change'): Promise<void> => {
	store.dispatch(setVideoMode(mode));
};

type RecordVideoType = {
	bubble_video: string;
	video_file: File;
};
