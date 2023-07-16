import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export const OverviewCard: FC<PropsType> = ({ leftText, content, headTitle, rightText, footerText, variant }) => {
	const router = useRouter();

	return (
		<Wrapper>
			{headTitle && (
				<div
					className="Title"
					style={{ cursor: 'pointer' }}
					onClick={() => router.push('/dashboard/subscription?mode=packages')}
				>
					{headTitle}
				</div>
			)}
			<div className="Number">{content}</div>
			<div className="LeftText">{leftText}</div>
			<div className="RightText">{rightText}</div>

			<Footer variant={variant}>{footerText}</Footer>
		</Wrapper>
	);
};

OverviewCard.defaultProps = {
	variant: 'pink',
};

interface PropsType {
	headTitle?: string;
	children?: ReactNode;
	footerText?: string;
	variant?: 'pink' | 'red' | 'orange';
	leftText?: string;
	rightText?: string;
	content?: number | string;
}

const Wrapper = styled.div`
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 16px 18px #3b5dcd21;
	border-radius: 22px;
	opacity: 1;
	width: 100%;
	height: 150px;
	position: relative;
	margin-bottom: 1.5rem;

	.Title {
		position: absolute;
		top: 7px;
		display: flex;
		width: 100%;
		justify-content: center;
		text-decoration: underline;
		letter-spacing: 0px;
		color: #000000;
		opacity: 1;
		font: normal normal bold 17px Poppins;
	}
	.Number {
		position: absolute;
		top: 38.5px;
		display: flex;
		width: 100%;
		justify-content: center;
		font: normal normal bold 37px/45px Poppins;
		letter-spacing: 0px;
		color: #000000;
		opacity: 1;
	}
	.LeftText {
		font: normal normal bold 11px/14px Poppins;
		letter-spacing: 0px;
		color: #000000;
		opacity: 1;
		position: absolute;
		left: 4px;
		bottom: 34px;
	}
	.RightText {
		font: normal normal bold 11px/14px Poppins;
		letter-spacing: 0px;
		color: #000000;
		opacity: 1;
		position: absolute;
		right: 4px;
		bottom: 34px;
	}
	.ProgressWrapper {
		position: absolute;
		left: 3px;
		transform: translateY(50%);
		width: 100%;
	}
`;

const Footer = styled.div<{ variant?: PropsType['variant'] }>`
	border-radius: 0px 0px 22px 22px;
	opacity: 1;
	position: absolute;
	bottom: 0px;
	width: 100%;
	text-align: center;
	font: normal normal bold 15px/24px Poppins;
	letter-spacing: 0px;
	color: #ffffff;
	opacity: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30px;

	${({ variant }) => {
		if (variant === 'pink') {
			return css`
				background: #f468a9 0% 0% no-repeat padding-box;
				box-shadow: 0px 16px 18px #f468a95c;
			`;
		} else if (variant === 'red') {
			return css`
				background: #f46875 0% 0% no-repeat padding-box;
				box-shadow: 0px 16px 18px #f468755c;
			`;
		} else if (variant === 'orange') {
			return css`
				background: #f4a568 0% 0% no-repeat padding-box;
				box-shadow: 0px 16px 18px #f4a5685c;
			`;
		}
	}}
`;
