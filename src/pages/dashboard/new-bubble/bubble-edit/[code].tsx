import { BubbleConfigs, VideoRecorderPopup } from '@components/Dashboard';
import { DashboardLayout } from '@components/templates';
import { bubbleAPI } from '@libs/api';
import { setBubbleButtonConfigHandler, setBubbleItems, setVideoModeHandler } from '@store/bubble/bubble.actions';
import { handleSetCurrentButtonType } from '@store/video/video.actions';
import { Spin } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BubbleEdit: NextPage = () => {
	const router = useRouter();

	const [isSpinning, setIsSpinning] = useState(false);

	useEffect(() => {
		getSingleBubble(String(router.query.code));
		handleSetCurrentButtonType({
			buttonConfigPageType: 'bubble_config_2',
		});
		setVideoModeHandler('edit');
		// return () => {
		// 	handleSetCurrentButtonType({ buttonConfigPageType: '', currentButtonDetails: '' });
		// };
	}, [router.query]);

	const getSingleBubble = async (code: string) => {
		setIsSpinning(true);
		try {
			const { error, data } = await bubbleAPI.getSingleBubble(code);
			if (!error) {
				const bubbleItem = { ...data[0] };
				bubbleItem.bubble_video = bubbleItem.bubble_video;
				bubbleItem.bubble_exc_pages = JSON.parse(bubbleItem.bubble_exc_pages);

				setBubbleButtonConfigHandler([...JSON.parse(bubbleItem.bubble_button_config)]);
				setBubbleItems(bubbleItem);
			}
		} catch (error) {
		} finally {
			setIsSpinning(false);
		}
	};

	return (
		<DashboardLayout>
			<Spin spinning={isSpinning}>
				<BubbleConfigs />
			</Spin>
			<VideoRecorderPopup />
		</DashboardLayout>
	);
};

export default BubbleEdit;
