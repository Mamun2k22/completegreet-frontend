import { useRouter } from 'next/router';
import { FC, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';

export const MainVideoRecorder: FC<any> = ({ finalVideo, setFinalVideo }) => {
	const router = useRouter();
	const [videoViewType, setVideoRecordingType] = useState('will_be');
	const videoRef = useRef<HTMLVideoElement>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [recording, setRecording] = useState(false);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
	const [localVideoURL, setLocalVideoURL] = useState('');
	const [intervalId, setIntervalId] = useState(null);

	const startRecording = async () => {
		setVideoRecordingType('will_be');
		let duration = 0;
		setLoading(true);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			setStream(stream);
			const mediaRecorder = new MediaRecorder(stream);
			setMediaRecorder(mediaRecorder);
			const chunks: Blob[] = [];

			mediaRecorder.addEventListener('dataavailable', (event) => {
				chunks.push(event.data);
			});

			mediaRecorder.addEventListener('stop', () => {
				const blob = new Blob(chunks, { type: 'video/webm' });
				const videoFile = new File([blob], 'greet_video.webm', { type: 'video/webm' });
				const url = URL.createObjectURL(blob);
				setFinalVideo({ bubble_video: url, video_file: videoFile });
				// setRecordVideoUrl();
				setLocalVideoURL(url);
				setRecording(false);
			});

			mediaRecorder.start();
			const intervalID = setInterval(() => {
				duration++;
			}, 1000);
			setIntervalId(intervalID);
			setRecording(true);
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const stopRecording = () => {
		setVideoRecordingType('stopped');
		if (mediaRecorder && stream) {
			clearInterval(intervalId);
			mediaRecorder.stop();
			stream.getTracks().forEach((track) => track.stop());
			setMediaRecorder(null);
			setStream(null);
			setRecording(false);
		}
	};

	return (
		<div>
			{loading && (
				<div className="d-flex alin-items-center justify-content-center mb-3">
					<Spinner className="me-2" animation="grow" variant="primary" />
					<Spinner className="me-2" animation="grow" variant="secondary" />
					<Spinner animation="grow" variant="success" />
				</div>
			)}
			{videoViewType === 'will_be' && <video muted className="w-100 rounded" ref={videoRef} autoPlay></video>}
			{localVideoURL && videoViewType === 'stopped' && (
				<video
					controls
					className="w-100 rounded"
					src={localVideoURL}
					autoPlay
					controlsList="nodownload"
				></video>
			)}
			<div className="p-3 d-flex align-items-center justify-content-between">
				<Button variant="dark" disabled={!recording} onClick={stopRecording}>
					Stop Recording
				</Button>
				{localVideoURL && (
					<Button
						onClick={() => {
							setFinalVideo({ bubble_video: '', video_file: null });
							// setRecordVideoUrl({ bubble_video: '', video_file: null });
							setLocalVideoURL('');
						}}
						variant="danger"
					>
						Delete Video
					</Button>
				)}
				<Button variant="secondary" className="text-white" disabled={recording} onClick={startRecording}>
					Start Recording
				</Button>
			</div>
		</div>
	);
};
