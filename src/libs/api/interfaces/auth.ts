export interface IAuth {
	id?: number;
	name?: string;
	avatarURL?: string;
	token: string;
	email?: string;
	password?: string;
}
export interface IAuthPayload {
	email: string;
	password: string;
}
export interface IRegPayload {
	email: string;
	password: string;
	name: string;
	business_name?: string;
	website_url?: string;
	industry?: string;
	goals?: string;
}
export interface IUpdatePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	mobileNumber: string;
}
