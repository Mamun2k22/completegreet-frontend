import Icon from '@libs/icons';
import { getBubbleState } from '@store/bubble/bubble.slice';
import { Button } from 'antd';
import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const VideoPlayerBox: FC = () => {
	const ref = useRef<HTMLVideoElement>();
	const { bubble_button_config, bubble_video } = useSelector(getBubbleState);
	const handleVideoClick = () => {
		ref?.current?.play();
	};
	return (
		<VideoPLayer className="text-center">
			<video
				onClick={handleVideoClick}
				ref={ref}
				// controls
				className=" rounded"
				src={bubble_video}
				autoPlay
				loop
				muted
				style={{ objectFit: 'cover' }}
				controlsList="nodownload"
			></video>
			<div className="buttonBox p-2">
				{bubble_button_config.map((item, idx) => (
					<Button
						className="w-100 mb-2 text-white border-0 "
						style={{ backgroundColor: item.color, height: '42px' }}
						key={idx}
					>
						<Icon className="me-2" width={20} height={20} path={item.icon} fill="var(--bs-white)" />
						{item.title}
					</Button>
				))}
			</div>
		</VideoPLayer>
	);
};

const VideoPLayer = styled.div`
	max-width: 350px;
	height: 540px;
	margin: auto;
	position: relative;
	video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.buttonBox {
		position: absolute;
		left: 0;
		bottom: 0%;
		width: 100%;
		z-index: 3;
	}
	/* z-index: 1;
	position: relative;
	z-index: 999; */
`;
