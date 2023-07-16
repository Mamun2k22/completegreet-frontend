import { MainLayout } from '@components/templates';
import { authAPI } from '@libs/api/auth';
import store, { persistor } from '@store';
import jwt from 'jsonwebtoken';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../../public/scss/app.scss';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	// const dispatch = useDispatch();

	useEffect(() => {
		NProgress.configure({ showSpinner: true });
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());
		// if (pageProps?.authUser) {
		// 	const { token, ...rest } = pageProps.authUser;
		// 	if (token) {
		// 		dispatch(authSignIn(rest));
		// 	}
		// }
	}, [router.events]);

	return (
		<Provider store={store}>
			<PersistGate loading={<h6>Loading...</h6>} persistor={persistor}>
				{router.pathname === '/login' ||
				router.pathname === '/register' ||
				router.pathname.includes('/dashboard') ||
				router.pathname.includes('bubble-edit') ||
				router.pathname.includes('checkout') ||
				router.pathname.includes('/confirm-payment') ||
				router.pathname.includes('user-profile') ||
				router.pathname === '/forgot-password' ||
				router.pathname.includes('/reset-password') ? (
					<>
						<Component {...pageProps} />
					</>
				) : (
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				)}
			</PersistGate>
		</Provider>
	);
}

MyApp.getInitialProps = async (appContext: AppContext) => {
	const { ctx } = appContext;
	const cookies = parseCookies(ctx);

	if (ctx?.req) {
		if (cookies?.token) {
			try {
				const { error, data } = await authAPI.validateAuth(cookies?.token);

				if (!error && data) {
					const userDetails: any = jwt.decode(data);

					ctx.authUser = { ...userDetails, token: data };
				}
			} catch (error) {}
		}
	} else if (typeof window !== 'undefined') {
		const {
			user: { profile, isAuthenticate },
		} = store.getState();

		if (isAuthenticate) {
			const data = { ...profile, token: cookies.token };
			ctx.authUser = data;
		}
	}

	const appProps = await App.getInitialProps({ ...appContext });
	appProps.pageProps = {
		...appProps.pageProps,
		authUser: ctx?.authUser,
	};
	return { ...appProps };
};

export default MyApp;
