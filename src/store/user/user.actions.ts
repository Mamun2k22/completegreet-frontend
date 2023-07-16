import store from '@store';
import { handleCompleteGreetButton } from '@store/bubble/bubble.actions';
import jwt from 'jsonwebtoken';
import router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import {
	authSignIn,
	authSignOut,
	authUpdateAvatar,
	handleSettings,
	handleSidebarOpen,
	setEditEditMode,
	setPlanId,
	settingsType,
	sidebarCollapse,
} from './user.slice';
// import { destroyCookie, setCookie } from 'nookies';
/**
 * Set app user if credentials are valid
 * @param data
 */

export const setSidebarCollapsed = (isCollapsed: boolean) => {
	store.dispatch(sidebarCollapse(isCollapsed));
};
export const setUserPlanId = (id: number) => {
	store.dispatch(setPlanId(id));
};
export const handleUpdateAvatar = (image: string) => {
	store.dispatch(authUpdateAvatar(image));
};
export const setAuthUser = async (data: { token: string }): Promise<void> => {
	setCookie(null, 'token', data.token, {
		maxAge: 2 * 24 * 60 * 60,
		path: '/',
	});
	const userInfo: any = jwt.decode(data.token);
	console.log({ userInfo });
	if (userInfo.plan_id === 1) {
		handleCompleteGreetButton(true);
	}

	store.dispatch(
		authSignIn({
			profile: {
				plan_id: userInfo.plan_id,
				email: userInfo.email,
				name: userInfo.name,
				id: userInfo.user_id,
				token: data.token,
				avatarURL: userInfo.image,
			},
			settings: {
				live_on_bubble: userInfo.live_on_bubble,
				push_notification: userInfo.push_notification,
			},
		}),
	);
};

/**
 * Revoke app user access
 */
export const revokeAuthUser = (): Promise<void> => {
	return new Promise((resolve) => {
		destroyCookie(null, 'token');
		store.dispatch(authSignOut());
		resolve();
		router.push('/');
	});
};

export const editModeHandler = (value: boolean) => {
	store.dispatch(setEditEditMode(value));
};
export const openSidebarHandler = (value: boolean) => {
	store.dispatch(handleSidebarOpen(value));
};

export const setSettings = (data: settingsType) => {
	store.dispatch(handleSettings(data));
};

/**
 * Set global data such as `cart count`, `notifications`
 */

export interface GlobeData {
	user: IAuth;
}
export interface IAuth {
	id: string;
	name: string;
	avatarURL?: string;
	token: string;
	email?: string;
}
