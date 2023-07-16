import { getVideoState } from '@store/actions';
import { handleResetBubbleState, setRecordVideoUrl, setVideoModeHandler } from '@store/bubble/bubble.actions';
import { getBubbleState } from '@store/bubble/bubble.slice';
import { handleSetCurrentButtonType, setPagePathHandler, setVideoPopup } from '@store/video/video.actions';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { MainVideoRecorder } from './MainVideoRecorder';

export const VideoRecorderPopup: FC = () => {
	const router = useRouter();
	const [finalVideo, setFinalVideo] = useState({ bubble_video: '', video_file: null });
	// const { currentButtonInfo } = useSelector(getVideoState);
	const {
		popup: { isOpen },
		currentButtonInfo,
	} = useSelector(getVideoState);
	const { bubble_video } = useSelector(getBubbleState);
	//ok
	const handleClose = () => {
		setFinalVideo({ bubble_video: '', video_file: null });
		setVideoPopup(false);
	};

	useEffect(() => {
		if (isOpen && !router.query?.code && !bubble_video) {
			handleResetBubbleState();
			setRecordVideoUrl({ bubble_video: '', video_file: null });
		}
	}, [isOpen, router.query, bubble_video]);
	return (
		<Modal show={isOpen} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Record Video</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MainVideoRecorder setFinalVideo={setFinalVideo} finalVideo={finalVideo} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button
					disabled={!finalVideo?.video_file}
					className="text-white"
					variant="primary"
					onClick={() => {
						if (
							currentButtonInfo.buttonConfigPageType === 'bubble_config_1' ||
							currentButtonInfo.buttonConfigPageType === 'bubble_config_2'
						) {
							if (!router.query?.code) {
								handleSetCurrentButtonType({ buttonConfigPageType: 'bubble_config_1' });
							}
						}
						if (router.query?.code) {
							setVideoModeHandler('change');
						}
						setRecordVideoUrl({ ...finalVideo });
						setPagePathHandler('bubbleConfig');
						setVideoPopup(false);
					}}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
