import { handleResetBubbleState } from '@store/bubble/bubble.actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useNavigationLock = (
	isEnabled = true,
	warningText = 'You have unsaved changes – are you sure you wish to leave this page?',
) => {
	const router = useRouter();

	useEffect(() => {
		const handleWindowClose = (e: BeforeUnloadEvent) => {
			if (!isEnabled) return;
			e.preventDefault();
			return (e.returnValue = warningText);
		};

		const handleBrowseAway = () => {
			if (!isEnabled) return;
			if (window.confirm(warningText)) {
				handleResetBubbleState();
				return;
			}
			router.events.emit('routeChangeError');
			throw 'routeChange aborted.';
		};

		window.addEventListener('beforeunload', handleWindowClose);

		router.events.on('routeChangeStart', handleBrowseAway);

		return () => {
			window.removeEventListener('beforeunload', handleWindowClose);
			router.events.off('routeChangeStart', handleBrowseAway);
		};
	}, [isEnabled]);
};

export default useNavigationLock;
