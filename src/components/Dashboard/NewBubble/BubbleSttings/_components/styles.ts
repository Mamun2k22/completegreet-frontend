import { Slider } from 'antd';
import { memo } from 'react';
import { Button } from 'react-bootstrap';
import styled, { css } from 'styled-components';
const MemoizedSlider = memo(Slider);

export const ButtonWrapper = styled(Button)<{ active?: boolean; color?: string }>`
	font-weight: 500;
	border: 0.5px solid #d7edff;
	background-color: var(--bs-white);
	&:hover {
		color: var(--bs-white);
		svg {
			fill: var(--bs-white);
		}
	}
	${({ active, color }) => {
		switch (active) {
			case true:
				return css`
					color: var(--bs-white) !important;
					background-color: ${color}!important;
					border-color: ${color}!important;
					&:focus {
						color: var(--bs-white) !important;
					}
				`;

			default:
		}
	}}

	&:active {
		color: var(--bs-dark) !important;
	}
	&:hover {
		color: var(--bs-white) !important;
		background-color: ${({ color }) => color}!important;
		border-color: ${({ color }) => color}!important;
	}

	&:disabled,
	[disabled] {
		border: 1px solid #999999;
		background-color: #cccccc;
		color: #666666;
		/* &:hover {
			cursor: not-allowed !important;
		} */
	}
`;

export const IconButton = styled.button`
	border: none;
	outline: none;
	background-color: var(--bs-white);
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 600;
	font-size: 12px;
	padding: 0.125rem 0.625rem;
	border-radius: 3px;
	transition: 0.2s;
	&:hover {
		background-color: #f9f9f9;
	}
`;

export const BorderContentBox = styled.div<{
	content: string;
	forForm?: boolean;
	contentBg?: string;
	borderColor?: string;
}>`
	border: ${(props) =>
		props.forForm
			? '1px solid #EDF5FF'
			: props.borderColor
			? `1px solid ${props.borderColor}`
			: '1px solid #8692a1'};
	border-radius: 8px;
	padding: 0.875rem;
	text-align: center;
	position: relative;

	&:before {
		display: flex;
		padding: 0 0.425rem;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #8692a1;
		content: '${(props) => props.content}';
		position: absolute;
		top: -10px;
		left: 0px;
		transform: translateX(20%);
		width: auto;
		height: 20px;
		background-color: ${(props) => (props.contentBg ? props.contentBg : 'var(--bs-white)')};
	}
`;

export const Label = styled.label`
	font-size: '12px';
	font-weight: 600;
	color: '#000215';
`;

export const SliderWrapper = styled(MemoizedSlider)`
	.ant-slider-handle {
		&:after {
			box-shadow: 0 0 0 2px var(--bs-primary) !important;
		}
	}
`;
