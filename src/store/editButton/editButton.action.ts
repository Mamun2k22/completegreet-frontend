import store from '@store';
import { IBubbleButtonConfigType } from '@store/bubble/bubble.slice';
import { hideButtonCollapse, setCurrentButton, setOpenButtonConfigOpen } from './editButton.slice';

export const setEditButtonHandler = async (isOpen: boolean, currentButton: IBubbleButtonConfigType): Promise<void> => {
	store.dispatch(setOpenButtonConfigOpen({ isOpen, currentButton }));
};
export const setHideCollapseHandler = async (): Promise<void> => {
	store.dispatch(hideButtonCollapse());
};
export const setCurrentButtonHandler = async (currentButton: IBubbleButtonConfigType): Promise<void> => {
	store.dispatch(setCurrentButton(currentButton));
};
