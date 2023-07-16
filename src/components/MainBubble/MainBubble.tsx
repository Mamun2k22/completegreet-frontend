import { useWindowSize } from '@libs/hooks';
import { handleBubbleMode, handleGlobalBubbleOpen } from '@store/bubble/bubble.actions';
import { BubbleState, getBubbleState } from '@store/bubble/bubble.slice';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';

const moveRight = keyframes`
  from {
    transform: translateX(-600px);
  }
  to {
    transform: translateX(0px);
  }
`;
const moveLeft = keyframes`
  from {
    transform: translateX(600px);
  }
  to {
    transform: translateX(0px);
  }
`;
const moveToBottom = keyframes`
  from {
    transform: translateY(-600px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const MainBubble: FC<{ layout: string; mode?: string }> = ({ layout, mode = null }) => {
	const { width } = useWindowSize();
	const ref = useRef<HTMLVideoElement>();
	const router = useRouter();
	const bubleState = useSelector(getBubbleState);

	const handleMiniBubbleClick = () => {
		if (width > 768) {
			handleBubbleMode('laptop');
		} else {
			handleBubbleMode('mobile');
		}
		handleGlobalBubbleOpen(true);
	};
	console.log({ bubleState });

	return (
		<>
			<BubbleWrapper onClick={handleMiniBubbleClick} layout={layout} bubleState={bubleState} mode={mode}>
				{mode !== 'demo' && (
					<video
						ref={ref}
						src={
							bubleState.videoUploadMode === 'edit'
								? `${process.env.apiUrl}/files/users/${bubleState.user_id}/Bubble-Videos/${bubleState.bubble_video}` ||
								  '/videos/demo.mp4'
								: bubleState.bubble_video
						}
						autoPlay
						loop
						muted
						style={{ objectFit: 'cover' }}
						controlsList="nodownload"
					></video>
				)}
				{mode === 'demo' && (
					<video
						ref={ref}
						src={'/videos/demo.mp4'}
						autoPlay
						loop
						muted
						style={{ objectFit: 'cover' }}
						controlsList="nodownload"
					></video>
				)}
			</BubbleWrapper>
		</>
	);
};

const BubbleWrapper = styled.div<{ layout: string; bubleState: BubbleState; mode: string }>`
	position: absolute;
	overflow: hidden;
	transition: 0.3s;
	border-radius: 3px;
	animation: ${({ bubleState }) =>
			bubleState.bubble_animation === 'Left-to-right'
				? moveRight
				: bubleState.bubble_animation === 'Right-to-left'
				? moveLeft
				: bubleState.bubble_animation === 'Top-to-bottom'
				? moveToBottom
				: ''}
		0.5s linear forwards;
	border: ${(props) =>
		props.bubleState.bubble_border_color ? `4px solid ${props.bubleState.bubble_border_color}` : ''};
	cursor: pointer;
	&:before {
		content: '${(props) => (props.mode === 'demo' ? 'Hey' : props.bubleState.bubble_title)}';
		text-align: center;
		padding: 0;
		margin: 0;
		font-size: ${(props) => `${props.bubleState.bubble_font_size}px`};
		transition: 0.3ms;
		word-break: break-all;
		z-index: 99;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		color: #ffffff;
	}

	&:after {
		transition: 0.3s;
		content: '';
		z-index: 98;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		${({ bubleState: { bubble_darken } }) => {
			switch (bubble_darken) {
				case 1:
					return css`
						background-color: #00000050;
					`;

				default:
					return css``;
			}
		}}

		${({ bubleState: { bubble_style } }) => {
			switch (bubble_style) {
				case 'Circle':
					return css`
						border-radius: 50rem;
					`;

				default:
					return css``;
			}
		}}
	}
	bottom: 15px;

	${({ bubleState: { bubble_position }, layout }) => {
		switch (bubble_position) {
			case 'Right':
				return css`
					right: ${layout === 'mobile' ? '10px' : '15px'};
				`;

			default:
				return css`
					left: ${layout === 'mobile' ? '10px' : '15px'};
				`;
		}
	}}
	${({ bubleState: { bubble_style, bubble_size } }) => {
		switch (bubble_style) {
			case 'Circle':
				return css`
					width: ${bubble_size}px;
					height: ${bubble_size}px;
					border-radius: 50rem;
				`;

			default:
				return css`
					width: ${bubble_size}px;
					height: ${bubble_size + 1.4 * 50}px;
				`;
		}
	}}



	video {
		transition: 0.3s;
		position: relative;
		width: 100%;
		height: 100%;
	}
	button {
		position: absolute;
		top: 90%; /* position the top  edge of the element at the middle of the parent */
		left: 50%; /* position the left edge of the element at the middle of the parent */

		transform: translate(-50%, -50%);
		width: 90%;
		color: var(--bs-white);
		padding: 0.1rem;
		border-radius: 2px;

		font-size: 10px;
		&:hover {
			color: var(--bs-white);
		}
		&:focus {
			color: var(--bs-white) !important;
		}
	}
`;
