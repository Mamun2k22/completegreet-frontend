import { IDropdownType } from '@components/common/SelectDropdown';
import store from '@store';
import {
	CallPhoneTypes,
	LinkToPageFieldsType,
	LiveChatFieldsType,
	setBookMeetingsOnCalendlyFields,
	setBuitInContactFormFields,
	setButtonConfigs,
	setCallPhoneFields,
	setCurrentButtonFunction,
	setLinkToPageFields,
	setLiveChatFields,
	setOpenButtonConfigOpen,
} from './button.slice';

export const setButtonSettingPage = async (isOpen: boolean): Promise<void> => {
	store.dispatch(setOpenButtonConfigOpen(isOpen));
};
export const setMainButtonConfigs = async (item: {
	buttonColor: string;
	buttonTitle: string;
	position: number;
}): Promise<void> => {
	store.dispatch(setButtonConfigs(item));
};
export const setHandleCurrentButtonFunction = async (funtionType: IDropdownType): Promise<void> => {
	store.dispatch(setCurrentButtonFunction(funtionType));
};
export const setHandleLiveChatFieldTypes = async (values: LiveChatFieldsType): Promise<void> => {
	store.dispatch(setLiveChatFields(values));
};
export const setHandleCallPhoneFields = async (values: CallPhoneTypes): Promise<void> => {
	store.dispatch(setCallPhoneFields(values));
};
export const setHandlesetLinkToPageFields = async (values: LinkToPageFieldsType): Promise<void> => {
	store.dispatch(setLinkToPageFields(values));
};
export const setHandleBuitInContactFormFields = async (values: { email: string }): Promise<void> => {
	store.dispatch(setBuitInContactFormFields(values));
};
export const setHandleBookMeetingsOnCalendlyFields = async (values: { url: string }): Promise<void> => {
	store.dispatch(setBookMeetingsOnCalendlyFields(values));
};
