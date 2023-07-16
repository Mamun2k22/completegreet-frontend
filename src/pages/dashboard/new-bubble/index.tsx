import { BubbleConfigs, VideoLibrary, VideoRecorderPopup } from '@components/Dashboard';
import { DashboardLayout } from '@components/templates';
import { withAuth } from '@libs/hoc';
import { getVideoState } from '@store/actions';
import { setVideoModeHandler } from '@store/bubble/bubble.actions';
import { editModeHandler } from '@store/user/user.actions';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const NewBubble: NextPage = () => {
	const { pagePath } = useSelector(getVideoState);

	useEffect(() => {
		editModeHandler(false);
		setVideoModeHandler('create');
	}, []);
	return (
		<DashboardLayout>
			{pagePath === 'videoLibrary' ? <VideoLibrary /> : pagePath === 'bubbleConfig' ? <BubbleConfigs /> : ''}
			<VideoRecorderPopup />
		</DashboardLayout>
	);
};

export default withAuth(NewBubble);
