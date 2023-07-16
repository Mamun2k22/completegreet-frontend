import { getEditButtonState } from '@store/editButton/editButton.slice';
import { Col, Row } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BubblePreview, ButtonConfig } from './BubbleSttings';

export const BubbleConfigs: FC = () => {
	const { isOpen } = useSelector(getEditButtonState);
	return (
		<Row gutter={24} className="w-100 mx-auto ">
			<Col lg={8} md={24} sm={24} xs={24}>
				<ButtonConfigWrapper isOpen={isOpen} className="bg-white h-100 rounded">
					<ButtonConfig />
				</ButtonConfigWrapper>
			</Col>
			<Col lg={16} md={24} sm={24} xs={24}>
				<BubblePreviewWrapper>
					<BubblePreview />
				</BubblePreviewWrapper>
			</Col>
		</Row>
	);
};

const BubblePreviewWrapper = styled.div`
	max-height: calc(100vh - 150px);
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

const ButtonConfigWrapper = styled.div<{ isOpen: boolean }>`
	max-height: calc(100vh - 150px);
	overflow: hidden;
	overflow-y: ${({ isOpen }) => (isOpen ? 'hidden' : 'auto')};
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
