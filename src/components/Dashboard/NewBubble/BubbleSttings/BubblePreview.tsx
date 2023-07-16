import Icon, { addCircle, refresh } from '@libs/icons';
import { getVideoState } from '@store/actions';
import { setRecordVideoUrl, setVideoModeHandler } from '@store/bubble/bubble.actions';
import { setVideoPopup } from '@store/video/video.actions';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BubblePreviewConfig2, VideoPlayerBox } from './_components';

export const BubblePreview: FC = () => {
	const router = useRouter();
	const { currentButtonInfo } = useSelector(getVideoState);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = () => {
		const selectedFile = fileInputRef.current?.files?.[0];
		if (selectedFile && selectedFile.type.includes('video/')) {
			setFile(selectedFile);
		} else {
			setFile(null);
		}
	};

	useEffect(() => {
		if (file) {
			setRecordVideoUrl({ bubble_video: URL.createObjectURL(file), video_file: file });
			if (router.query?.code) {
				setVideoModeHandler('change');
			}
		}
	}, [file, router.query?.code]);

	return (
		<Wrapper>
			<Row>
				<Col span={24} className="bg-white p-3 rounded mb-2">
					<h4 className="mb-0">Edit Bubble</h4>
				</Col>
				<Col span={24} className="bg-white px-3 py-5 my-2 ">
					{currentButtonInfo.buttonConfigPageType === 'bubble_config_2' ? (
						<BubblePreviewConfig2 />
					) : currentButtonInfo.buttonConfigPageType === 'bubble_config_1' ? (
						<VideoPlayerBox />
					) : null}
				</Col>
				<Col span={24} className="mt-2">
					<Row gutter={24}>
						<Col span={12}>
							<Button onClick={() => setVideoPopup(true)} className="w-100 py-2 bg-white border-white">
								<Icon className="me-2" path={addCircle} fill="var(--bs-primary)" /> New Record
							</Button>
						</Col>
						<Col span={12}>
							<Button
								onClick={() => {
									fileInputRef?.current?.click();
								}}
								className="w-100 py-2 bg-white border-white"
							>
								<Icon width={22} className="me-2" path={refresh} fill="var(--bs-secondary)" /> Change
								Video
							</Button>
							<input
								ref={fileInputRef}
								type="file"
								accept="video/*"
								onChange={handleFileChange}
								className="d-none"
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: calc(100vh - 150px);
	overflow: hidden;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		/* box-shadow: inset 0 0 5px #000000; */
		background-color: #f8f8f8;
		border-radius: 10px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #d8d8d8;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #e4e4e4;
	}
`;
