/* eslint-disable camelcase */
import { BaseAPI } from './baseApi';
import { BR, IAuthPayload, IRegPayload, IUpdatePassword } from './interfaces';

class AuthAPI extends BaseAPI {
	constructor(baseURL: string) {
		super(baseURL);
	}
	validateAuth = (token: string) => this.post<BR<string>>('token-check', { token: token });

	forgotPassword = (email: string) => this.post<BR<string>>('forgot-password', { email });
	resetPassword = (new_password: string, confirm_password: string, reset_link: string) =>
		this.post<BR<string>>('reset-password', { new_password, confirm_password, reset_link });

	login = (data: IAuthPayload) => this.post<BR<any>>('login', data);
	userValidationCheck = (data: { email: string }) => this.post<BR<any>>('email-check', data);

	register = (payload: IRegPayload) => {
		return this.post<BR<any>>('register', payload);
	};

	userDetails = (phoneNumber: string) => {
		return this.get<BR<any>>(`userDetail/${phoneNumber}`);
	};

	updatePassword = (payload: IUpdatePassword) => this.post<BR<string>>('auth/update-new-password', payload);
	noteAdd = (payload: string) =>
		this.post<BR<string>>('api/v1/add-note', {
			note_text: payload,
		});
	bugAdd = (payload: string) =>
		this.post<BR<string>>('api/v1/add-bug', {
			bug_text: payload,
		});

	getAllBug = () => {
		return this.get<BR<any>>(`api/v1/get-bug`);
	};
	getAllNotes = () => {
		return this.get<BR<any>>(`api/v1/get-note`);
	};
	deleteNote = (id: number) => {
		return this.delete<BR<any>>(`api/v1/delete-note/${id}`);
	};
	deleteBug = (id: number) => {
		return this.delete<BR<any>>(`api/v1/delete-bug/${id}`);
	};

	imageUpload = (data: FormData) => this.image<BR<any>>('api/v1/image-upload', data);
	updateDashInfo = (data: { live_on_bubble: number; push_notification: number }) =>
		this.patch<BR<any>>('api/v1/updateuserinfo', data);
}

export const authAPI = new AuthAPI(process.env.apiUrl);
