import { IAuth } from '@libs/api/interfaces';

declare module 'next/dist/shared/lib/utils' {
	interface NextPageContext {
		authUser?: IAuth;
	}
}
