import { useWindowSize } from '@libs/hooks';
import Icon, { chat, links, mailUnread, meeting, phoneDialPad } from '@libs/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import styled, { css } from 'styled-components';

export const SecondContainer: FC = () => {
	const { width } = useWindowSize();
	console.log(width);

	return (
		<Wrapper className="my-3">
			{/* <Icon className="me-2 mb-4" path={chat} fill="var(--bs-dark)" width={290} height={50} /> */}
			<BlackWrapper>
				<Image src="/svg/word.svg" alt="comp" width={60} height={60} />
				<Image src="/svg/shopify (1).svg" alt="comp" width={120} height={118} />
				<Image src="/svg/webflow.svg" alt="comp" width={130} height={118} />
				<Image src="/svg/wix.svg" alt="comp" width={70} height={70} />
				<Image src="/svg/joomla.svg" alt="comp" width={50} height={50} />
				<Image src="/svg/sq-space.svg" alt="comp" width={70} height={70} />
			</BlackWrapper>
			<RestWrapper>
				<h5 className="title" style={{ fontSize: width <= 580 ? '1.5rem' : '3rem' }}>
					Which Button Do You Want?
				</h5>
				<p className="subText">Do you want to convert customers, guide visitors or bring leads in?</p>

				{width > 1029 && (
					<Row gutter={24} className="justify-content-center align-items-center  my-5">
						<Col md={7}>
							<PortraitWrapper>
								<Button>
									<Icon path={chat} fill="var(--bs-white)" width={26} height={26} /> Start Live Chat
								</Button>
							</PortraitWrapper>
						</Col>

						<Col md={8}>
							<ButtonWrapper className="py-3 my-2">
								<Icon
									className="me-2"
									path={phoneDialPad}
									width={28}
									height={28}
									fill="var(--bs-dark)"
								/>
								Call Now
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" activeBtn>
								<Icon className="me-2" width={28} height={28} path={chat} fill="var(--bs-white)" />
								Start Live Chat
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2">
								<Icon className="me-2" width={28} height={28} path={links} fill="var(--bs-dark)" />
								Link To Specific Page
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2">
								<Icon className="me-2" width={28} height={28} path={mailUnread} fill="var(--bs-dark)" />
								Built It Contact
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2">
								<Icon className="me-2" path={meeting} width={28} height={28} fill="var(--bs-dark)" />
								Books Meeting On Calendly
							</ButtonWrapper>
							{/* <Button style={{ width: '20rem' }}>Add</Button> */}
						</Col>
					</Row>
				)}
				{width <= 1029 && width > 580 && (
					<Row gutter={24} className="justify-content-center align-items-center  my-5">
						<Col md={12} sm={12} xs={24}>
							<PortraitWrapper>
								<Button>
									<Icon path={chat} fill="var(--bs-white)" width={26} height={26} /> Start Live Chat
								</Button>
							</PortraitWrapper>
						</Col>

						<Col md={12} sm={12} xs={24}>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon
									className="me-2"
									path={phoneDialPad}
									width={28}
									height={28}
									fill="var(--bs-dark)"
								/>
								<span>Call Now</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" activeBtn width={width}>
								<Icon className="me-2" width={28} height={28} path={chat} fill="var(--bs-white)" />
								<span>Start Live Chat</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon className="me-2" width={28} height={28} path={links} fill="var(--bs-dark)" />
								<span>Link To Specific Page</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon className="me-2" width={28} height={28} path={mailUnread} fill="var(--bs-dark)" />
								<span>Built It Contact</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon className="me-2" path={meeting} width={28} height={28} fill="var(--bs-dark)" />
								<span>Books Meeting On Calendly</span>
							</ButtonWrapper>
							{/* <Button style={{ width: '20rem' }}>Add</Button> */}
						</Col>
					</Row>
				)}
				{width <= 580 && (
					<Row gutter={24} className="justify-content-center align-items-center  my-5">
						<Col md={12} sm={12} xs={24}>
							<PortraitWrapper className=" mx-auto">
								<Button>
									<Icon path={chat} fill="var(--bs-white)" width={26} height={26} /> Start Live Chat
								</Button>
							</PortraitWrapper>
						</Col>

						<Col md={12} sm={12} xs={24}>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon
									className="me-2"
									path={phoneDialPad}
									width={28}
									height={28}
									fill="var(--bs-dark)"
								/>
								<span>Call Now</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" activeBtn width={width}>
								<Icon className="me-2" width={28} height={28} path={chat} fill="var(--bs-white)" />
								<span>Start Live Chat</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon className="me-2" width={28} height={28} path={links} fill="var(--bs-dark)" />
								<span>Link To Specific Page</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon className="me-2" width={28} height={28} path={mailUnread} fill="var(--bs-dark)" />
								<span>Built It Contact</span>
							</ButtonWrapper>
							<ButtonWrapper className="py-3 my-2" width={width}>
								<Icon className="me-2" path={meeting} width={28} height={28} fill="var(--bs-dark)" />
								<span>Books Meeting On Calendly</span>
							</ButtonWrapper>
							{/* <Button style={{ width: '20rem' }}>Add</Button> */}
						</Col>
					</Row>
				)}
			</RestWrapper>
			{/* <RoundBox>
				<h1>HERES HOW IT WORKS</h1>
			</RoundBox>
			<TextWrapper className="text-center mt-4">
				<h1>PERFECT FIRST IMPRESSIONS </h1>
				<h1>PERSONAL GREETINGS </h1>
				<h1>TRUSTWORTHY PRESENTATION </h1>
			</TextWrapper> */}
		</Wrapper>
	);
};

const ButtonWrapper = styled(Button)`
	display: block;
	width: 100%;
	font-weight: 500;
	font-size: ${({ width }) => (width <= 773 ? '0.875rem' : width <= 1029 ? '1rem' : '1.5rem')};
	border-radius: 0.75rem;
	background-color: transparent;
	&:hover {
		color: var(--bs-white);
		border: 2px solid var(--bs-primary);
		svg {
			fill: var(--bs-white);
		}
	}
	${({ activeBtn }) => {
		switch (activeBtn) {
			case true:
				return css`
					background-color: var(--bs-primary);
					color: #ffffff !important;
					border: 2px solid var(--bs-primary);
				`;

			default:
				return css`
					background-color: var(--bs-white);
					/* width: 31rem; */
					border: 2px solid #edf5ff;
				`;
		}
	}}
	color: var(--bs-dark);
`;

const Wrapper = styled.div`
	/* display: flex;
	flex-direction: column;
	align-items: center; */
`;

const BlackWrapper = styled.div`
	background-color: var(--bs-dark);
	padding: 1.25rem 8.375rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-around;

	img {
		margin: 0.225rem 0.625rem;
	}
`;

const RestWrapper = styled.div`
	padding: 2rem;
	background-color: var(--bs-white);
	.title {
		text-align: center;
		/* font-size: 3rem; */
		font-weight: 600;
		color: #010b14;
	}
	.subText {
		text-align: center;
		font-size: 1.15rem;
		color: #010b14;
	}
	/* h1 {
		font-weight: 800;
		font-size: 1.5rem;
		color: #00155a;
	} */
`;

const PortraitWrapper = styled.div`
	position: relative;
	background: url('/images/portrait.png');
	background-position: center;
	background-size: cover;
	height: 490px;
	max-width: 24rem;
	button {
		position: absolute;
		/* bottom: 10px; */
		width: 95%;
		top: 93%; /* position the top  edge of the element at the middle of the parent */
		left: 50%;
		transform: translate(-50%, -50%);
		/* margin: 0.425rem; */
		color: var(--bs-white);
		padding: 0.875rem 1rem;
		&:hover {
			color: var(--bs-white);
		}
	}
	/* border: 1px solid red; */
`;
