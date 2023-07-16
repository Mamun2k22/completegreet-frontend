import { IAuth } from '@libs/api/interfaces';
import { NextPageContext } from 'next/types';

export interface CustomNextPageContext extends NextPageContext {
	authUser?: IAuth;
}
