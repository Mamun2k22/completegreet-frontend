import { ButtonWrapper } from '@components/Dashboard/NewBubble/BubbleSttings/_components/styles';
import { useWindowSize } from '@libs/hooks';
import Icon, { chat, close, meeting, mute, play, reload, volume } from '@libs/icons';
import { handleGlobalBubbleOpen } from '@store/bubble/bubble.actions';
import { BubbleState, getBubbleState } from '@store/bubble/bubble.slice';
import { Progress } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import ChatDemo from './ChatDemo';
import ContactForm from './ContactForm';

export const GlobalBubble: FC<{ mode?: string }> = ({ mode = null }) => {
	const { width } = useWindowSize();
	const ref = useRef<HTMLVideoElement>();
	const router = useRouter();
	const bubleState = useSelector(getBubbleState);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [isVideoPaused, setIsVideoPaused] = useState(false);
	const [isVideoMute, setIsVideoMute] = useState(false);
	const [duration, setDuration] = useState(0);
	const [isVideoEnded, setVideoEnded] = useState(false);
	const [btnType, setButtonType] = useState<string>(null);

	const handleVideoClick = () => {
		ref?.current?.pause();
		setIsVideoPaused(true);
	};

	useEffect(() => {
		if (bubleState.globalBubbleConfig.isOpen) {
			if (ref.current) {
				ref?.current?.play();
			} else {
				ref.current?.pause();
			}
		}
	}, [bubleState.globalBubbleConfig.isOpen]);

	const handleMiniBubbleClick = () => {
		if (ref.current) {
			ref.current.pause();
			ref.current.currentTime = 0;
			handleGlobalBubbleOpen(false);
		}
	};

	const handleTimeUpdate = () => {
		if (ref.current) {
			setCurrentTime(ref.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		setDuration(ref.current.duration);
	};

	const handlePlayVideo = () => {
		ref?.current?.play();
		setIsVideoPaused(false);
	};

	const handleVolumeCliCk = () => {
		setIsVideoMute((prevState) => !prevState);
	};
	const handleReload = () => {
		ref.current.currentTime = 0;
	};
	useEffect(() => {
		setVideoEnded(false);
	}, []);

	const handleVideoEnded = () => {
		setIsVideoPaused(true);
		setVideoEnded(true);
		ref?.current?.play();
		setIsVideoPaused(false);
	};

	const handleButtonClick = (btn: any) => {
		if (btn?.type === 'Chat') {
			ref?.current?.pause();
			setButtonType(btn.type);
		} else if (btn?.type === 'Contact') {
			ref?.current?.pause();
			setButtonType(btn.type);
		}
	};

	return (
		<GlobalBubbleWrapper
			bubbleMode={bubleState.mode}
			bubleState={bubleState}
			isVideoEnded={isVideoEnded}
			isOpen={bubleState.globalBubbleConfig.isOpen}
		>
			<Bubble_wrapper className="h-100 bubble_wrapper border" btnType={btnType}>
				<div className="progress_bar_main">
					<Progress showInfo={false} percent={(currentTime / duration) * 100} />
				</div>
				<Button onClick={handleMiniBubbleClick} className=" border-0 close_button">
					<Icon path={close} fill="#ffffff" width={26} height={26} />
				</Button>

				<div className="progress_bar px-2">
					<div className="my-1 ">
						{mode !== 'demo' &&
							bubleState.bubble_button_config.map((btn, idx) => (
								<ButtonWrapper
									key={idx}
									color={btn.color}
									active
									style={{ fontSize: '16px' }}
									className="w-100 mb-2 py-2"
									onClick={() => handleButtonClick(btn)}
								>
									<Icon
										width={23}
										height={23}
										className="me-2"
										path={btn.icon}
										fill="var(--bs-white)"
									/>
									{btn.title}{' '}
									{(btn.type === 'Chat' || btn.type === 'Call') &&
										btn.open_hours?.from &&
										btn.open_hours?.to &&
										`(${btn.open_hours?.from} To ${btn.open_hours?.to})`}
								</ButtonWrapper>
							))}

						{mode === 'demo' && (
							<>
								<ButtonWrapper
									color={'#FF5E1C'}
									active
									style={{ fontSize: '16px' }}
									className="w-100 mb-2 py-2"
								>
									<Icon width={23} height={23} className="me-2" path={chat} fill="var(--bs-white)" />
									Live Chat
								</ButtonWrapper>
								<ButtonWrapper
									color={'#FF5E1C'}
									active
									style={{ fontSize: '16px' }}
									className="w-100 mb-2 py-2"
								>
									<Icon
										width={23}
										height={23}
										className="me-2"
										path={meeting}
										fill="var(--bs-white)"
									/>
									Book Meeting
								</ButtonWrapper>
							</>
						)}
					</div>

					{bubleState.is_complete_greet_button === true && (
						<h6 className="text-white text-center m-0">
							<a
								style={{ fontSize: '16px', textDecoration: 'none' }}
								className="text-white"
								href="https://www.completegreet.com"
								target="_blank"
							>
								Created With Complete Greet
							</a>
						</h6>
					)}
				</div>
				{isVideoPaused && (
					<Button onClick={handlePlayVideo} className=" border-0 play_button">
						<Icon path={play} fill="#ffffff" width={26} height={26} />
					</Button>
				)}
				<div className="button_wrapper">
					<Button onClick={handleVolumeCliCk} className="volume_button border-0">
						<Icon path={isVideoMute ? mute : volume} fill="#ffffff" width={26} height={26} />
					</Button>
					<Button onClick={handleReload} className="volume_button border-0">
						<Icon path={reload} fill="#ffffff" width={26} height={26} />
					</Button>
				</div>
				<div
					onClick={() => {
						ref.current?.pause();
						setIsVideoPaused(!isVideoPaused);
					}}
					className="w-100 h-100 overlay_wrapper"
				>
					<video
						id="vid"
						className="w-100 h-100"
						onClick={handleVideoClick}
						onEnded={handleVideoEnded}
						ref={ref}
						src={
							mode === 'demo'
								? '/videos/demo.mp4'
								: bubleState.videoUploadMode === 'edit'
								? `${process.env.apiUrl}/files/users/${bubleState.user_id}/Bubble-Videos/${bubleState.bubble_video}`
								: bubleState.bubble_video
						}
						// autoPlay
						// loop
						muted={!bubleState.globalBubbleConfig.isOpen || isVideoMute}
						onTimeUpdate={handleTimeUpdate}
						onLoadedMetadata={handleLoadedMetadata}
						style={{ objectFit: 'cover', cursor: 'pointer' }}
						controlsList="nodownload"
					></video>
				</div>
			</Bubble_wrapper>
			{btnType === 'Chat' && (
				<ChatWrapper>
					<ChatDemo setButtonType={setButtonType} handleMiniBubbleClick={handleMiniBubbleClick} />
				</ChatWrapper>
			)}
			{btnType === 'Contact' && (
				<ChatWrapper className="p-0">
					<ContactForm setButtonType={setButtonType} handleMiniBubbleClick={handleMiniBubbleClick} />
				</ChatWrapper>
			)}
		</GlobalBubbleWrapper>
	);
};

const ChatWrapper = styled.div``;

const Bubble_wrapper = styled.div<{ btnType: string }>`
	left: 0;
	z-index: 100;
	/* position: ${({ btnType }) => (btnType ? 'absolute' : 'relative')}; */
	transition: 0.8s;
	${({ btnType }) => {
		switch (btnType) {
			case 'Chat':
				return css`
					transition: 0.8s;
					position: absolute;
					left: -350%;
					/* background-color: red; */
					border: 1px solid red;
				`;
			case 'Contact':
				return css`
					transition: 0.8s;
					position: absolute;
					left: -350%;
					/* background-color: red; */
					border: 1px solid red;
				`;

			default:
				return css`
					transition: 0.8s;
					left: 0;
				`;
		}
	}}

	.progress_bar_main {
		position: absolute;
		width: 100%;

		top: -10px;
		.ant-progress-bg {
			height: 13px !important;
			border-radius: 2px !important;
		}
		.ant-progress-inner {
			background-color: rgb(0 0 0 / 24%);
		}
	}
`;

const GlobalBubbleWrapper = styled.div<{
	bubbleMode?: string;
	bubleState?: BubbleState;
	isOpen: boolean;
	isVideoEnded?: boolean;
}>`
	background-color: var(--bs-white);
	position: absolute;
	border-radius: 5px;
	overflow: hidden;
	transition: 0.5s;
	.overlay_wrapper {
		transition: 0.3s;
		&:before {
			content: '';
			transition: 0.3s;
			z-index: ${({ isVideoEnded }) => (isVideoEnded === true ? 100 : -1)};
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.387);
		}
	}

	bottom: ${({ isOpen }) => (isOpen ? '15px' : '-1200px')};

	${({ bubleState: { bubble_position }, bubbleMode }) => {
		switch (bubble_position) {
			case 'Right':
				return css`
					right: ${bubbleMode === 'mobile' ? '0' : '15px'};
				`;

			default:
				return css`
					left: ${bubbleMode === 'mobile' ? '10px' : '15px'};
				`;
		}
	}}

	/* left: ${({ bubleState }) => (bubleState?.bubble_position === 'Left' ? '10px' : '10%')}; */
	height: 550px;
	width: ${({ bubbleMode }) => (bubbleMode === 'mobile' ? '100%' : '360px')};
	z-index: 990;
	.close_button {
		cursor: pointer;
		z-index: 991;
		position: absolute;
		top: 10px;
		right: 10px;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		background-color: #00000084;
		padding: 0;
	}
	.play_button {
		cursor: pointer;
		z-index: 991;
		position: absolute;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		width: 50px;
		height: 50px;
		background-color: #00000084;
		padding: 0;
	}
	.progress_bar {
		position: absolute;
		z-index: 992;
		bottom: 10px;
		width: 94%;
		left: 10px;
		.ant-progress-bg {
			height: 10px !important;
		}
	}
	.button_wrapper {
		display: flex;
		flex-direction: column;
		position: absolute;
		z-index: 992;
		top: 10px;
		width: 100px;
		left: 10px;
		.volume_button {
			border-radius: 50%;
			width: 50px;
			height: 50px;
			background-color: #00000084;
			padding: 0;
			margin-bottom: 5px;
		}
	}
`;
