import Icon, { searchBig } from '@libs/icons';
import { setRecordVideoUrl } from '@store/bubble/bubble.actions';
import { handleSetCurrentButtonType, setPagePathHandler, setVideoPopup } from '@store/video/video.actions';
import { Col, Row } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { BubbleCard } from './BubbleCard';

export const VideoLibrary: FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [duration, setDuration] = useState<number | null>(null);
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = () => {
		const selectedFile = fileInputRef.current?.files?.[0];
		if (selectedFile && selectedFile.type.includes('video/')) {
			setFile(selectedFile);
		} else {
			setFile(null);
		}
	};
	const handleVideoLoadedMetadata = () => {
		setDuration(videoRef.current?.duration || null);
	};
	useEffect(() => {
		if (file) {
			setRecordVideoUrl({ bubble_video: URL.createObjectURL(file), video_file: file });
			setPagePathHandler('bubbleConfig');
			handleSetCurrentButtonType({
				buttonConfigPageType: 'bubble_config_1',
				// currentButtonDetails: activeButtonInfo?.value,
			});
		}
	}, [duration, file]);

	return (
		<Wrapper>
			<Row gutter={32}>
				<Col span={24}>
					<div className="bg-secondary p-4 rounded text-white">
						<Row align="middle">
							<Col span={16} lg={16} md={14} sm={24} xs={24}>
								<h1>Videos Library</h1>
								<p className="m-0 mt-3" style={{ fontSize: '1rem' }}>
									In here you can upload or record you newest video. Plan out where you want your
									videos to show up and not show up
								</p>
							</Col>
							<Col span={8} lg={8} md={10} sm={24} xs={24} className="text-center">
								<video poster="/images/thumb1.png" controls width="250">
									<source src="/videos/movie.mp4" type="video/webm" />
									video.
								</video>
							</Col>
						</Row>
					</div>
				</Col>
				<Col span={24}>
					<div className="bg-white p-4 rounded my-3">
						<Row className="align-items-center" justify={'space-between'} gutter={16}>
							<Col
								style={{ position: 'relative' }}
								span={18}
								lg={16}
								md={15}
								sm={24}
								xs={24}
								className="text-start mt-2"
							>
								<Button
									className="text-white py-2 px-4 me-3"
									onClick={() => fileInputRef?.current?.click()}
								>
									Upload
								</Button>
								<small
									className="text-danger"
									style={{ fontSize: '10px', position: 'absolute', bottom: -20, left: 10 }}
								>
									* supports only MP4, WEBM and MOV
								</small>
								<input
									ref={fileInputRef}
									type="file"
									accept="video/*"
									onChange={handleFileChange}
									className="d-none"
								/>
								<Button
									onClick={() => setVideoPopup(true)}
									variant="secondary"
									className="text-white py-2 px-4 "
								>
									Record
								</Button>
							</Col>
							<Col className="mt-md-0 mt-4" lg={6} md={9} sm={24} xs={24}>
								<SearchInput>
									<Icon path={searchBig} fill="var(--bs-dark)" />
									<input placeholder="Search Here" />
								</SearchInput>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
			<video
				className="d-none"
				ref={videoRef}
				src={file && URL.createObjectURL(file)}
				controls
				width="400"
				height="300"
				onLoadedMetadata={handleVideoLoadedMetadata}
			/>
			{/* {duration && <p>Duration: {duration.toFixed(2)} seconds</p>} */}
			{/* <h6 className="text-center text-muted my-4">No Bubble Found!</h6> */}
			<div className="my-3">
				<BubbleCard />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	max-height: calc(100vh - 100px);
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

const SearchInput = styled.div`
	border: 1px solid #edf5ff;
	padding: 0.475rem 1rem;
	border-radius: 0.285rem;
	display: flex;
	align-items: center;
	input {
		border: none;
		outline: none;
		width: 100%;
		padding: 0.2rem;
	}
`;
