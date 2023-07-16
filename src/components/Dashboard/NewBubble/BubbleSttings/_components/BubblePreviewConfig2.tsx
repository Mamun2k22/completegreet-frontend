import { LaptopOutlined } from '@ant-design/icons';
import { MobileOutlined } from '@ant-design/icons/lib/icons';
import { GlobalBubble } from '@components/GlobalBubble';
import { MainBubble } from '@components/MainBubble';
import { handleBubbleMode } from '@store/bubble/bubble.actions';
import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
// import MobileIcon from '00';
import { useWindowSize } from '@libs/hooks';
import { IconButton } from './styles';

export const BubblePreviewConfig2: FC = () => {
	const [layout, setLayout] = useState<string>(null);
	const { width } = useWindowSize();

	useEffect(() => {
		if (width > 768) {
			setLayout('laptop');
			// handleBubbleMode('laptop');
		} else {
			// handleBubbleMode('mobile');
			setLayout('mobile');
		}
	}, [width]);

	return (
		<Wrapper layout={layout}>
			<div className="bubble_container">
				<MainBubble layout={layout} />
				<GlobalBubble />
			</div>
			<div className="d-flex justify-content-end my-2">
				<IconButton
					onClick={() => {
						setLayout('laptop');
						handleBubbleMode('laptop');
					}}
				>
					<LaptopOutlined style={{ fontSize: '2rem', color: layout === 'laptop' ? '#3B5DCD' : '#B9B9B9' }} />
				</IconButton>
				<IconButton
					onClick={() => {
						setLayout('mobile');
						handleBubbleMode('mobile');
					}}
				>
					<MobileOutlined style={{ fontSize: '2rem', color: layout === 'mobile' ? '#3B5DCD' : '#B9B9B9' }} />
				</IconButton>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div<{ layout: string }>`
	transition: 0.3s;
	.bubble_container {
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		padding: 0.425rem;
		height: 600px;
		transition: 0.5s;
		${({ layout }) => {
			switch (layout) {
				case 'mobile':
					return css`
						margin: 0 auto;
						width: 270px;
						background-image: url('/images/mobile-image.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						background-position: center;
						transition: 0.5s;
					`;

				default:
					return css`
						width: 100%;
						background-image: url('/images/big-prev.png');
						background-repeat: no-repeat;
						background-position: 15px 15px;
						background-size: 95%;
						background-color: #f8f8f8;
						transition: 0.5s;
					`;
			}
		}}/* object-fit: cover; */
	}
`;
