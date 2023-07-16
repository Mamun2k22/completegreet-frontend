import { getVideoState } from '@store/actions';
import { getBubbleState } from '@store/bubble/bubble.slice';
import { getEditButtonState } from '@store/editButton/editButton.slice';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonConfig1, ButtonConfig2, ButtonConfig3 } from './_components';

export const ButtonConfig: FC = () => {
	const { currentButtonInfo } = useSelector(getVideoState);
	const { isOpen } = useSelector(getEditButtonState);
	const { globalBubbleConfig } = useSelector(getBubbleState);
	return (
		<ConfigWrapper globalBubbleOpen={globalBubbleConfig.isOpen} className="position-relative h-100 p-3">
			{currentButtonInfo.buttonConfigPageType === 'bubble_config_1' && <ButtonConfig1 />}
			{currentButtonInfo.buttonConfigPageType === 'bubble_config_2' && (
				<div style={{ position: 'relative' }}>
					<Config3Wrapper isOpen={isOpen}>
						<ButtonConfig3 />
					</Config3Wrapper>
					<ButtonConfig2 />
				</div>
			)}
		</ConfigWrapper>
	);
};

const ConfigWrapper = styled.div<{ globalBubbleOpen: boolean }>``;

const Config3Wrapper = styled.div<{ isOpen: boolean }>`
	position: absolute;
	transition: 0.3s;
	z-index: 999;
	height: 100%;
	width: 100%;
	top: -10px;
	left: ${({ isOpen }) => (isOpen ? '0px' : '-1040px')};
	background-color: var(--bs-white);
`;
