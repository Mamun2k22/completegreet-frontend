import { useWindowSize } from '@libs/hooks';
import Icon, { arrowRightLine, linkedIn, solidMessenger, twitter } from '@libs/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const FooterSection = () => {
	const { width } = useWindowSize();
	return (
		<Wrapper>
			<Container>
				{width > 773 && (
					<Row className="justify-content-center ">
						<Col md={7} sm={7}>
							<Image className="mb-3" src="/images/white-logo.png" alt="logo" width={216} height={62} />
							<p>
								Launch live chats, pop up in a video bubble, and make sure everyone gets exactly what
								they need from you. It&apos;s the simple, scalable way to engage like never before.
							</p>
						</Col>
						<Col md={6} sm={6} className="text-center ps-3">
							<h1 style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.2rem' }}>Get Started</h1>
							<InputWrapper>
								<input placeholder="Your Email address" />
								<div className="iconWrapper">
									<Icon path={arrowRightLine} fill="var(--bs-white)" />
								</div>
							</InputWrapper>
						</Col>
						<Col md={10} sm={10}>
							<LinkWrapper>
								<Link href="/">Home</Link>
								<Link href="/pricing">Pricing</Link>

								<Link href="/demo">Demo</Link>
								<Link href="/about">About Us</Link>
							</LinkWrapper>
						</Col>
					</Row>
				)}
				{width <= 773 && width > 640 && (
					<Row className="justify-content-center ">
						<Col md={7} sm={8}>
							<Image className="mb-3" src="/images/white-logo.png" alt="logo" width={216} height={62} />
							<p>
								Launch live chats, pop up in a video bubble, and make sure everyone gets exactly what
								they need from you. It&apos;s the simple, scalable way to engage like never before.
							</p>
						</Col>
						<Col md={6} sm={8} className="text-center ps-3">
							<h1 style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.2rem' }}>Get Started</h1>
							<InputWrapper>
								<input placeholder="Your Email address" />
								<div className="iconWrapper">
									<Icon path={arrowRightLine} fill="var(--bs-white)" />
								</div>
							</InputWrapper>
						</Col>
						<Col md={10} sm={8}>
							<LinkWrapper>
								<Link href="/">Home</Link>
								<Link href="/pricing">Pricing</Link>

								<Link href="/demo">Demo</Link>
								<Link href="/about">About Us</Link>
							</LinkWrapper>
						</Col>
					</Row>
				)}
				{width <= 640 && (
					<Row className="justify-content-center ">
						<Col span={24}>
							<div className="text-center">
								<Image
									className="mb-3"
									src="/images/white-logo.png"
									alt="logo"
									width={216}
									height={62}
								/>
							</div>
							<p>
								Launch live chats, pop up in a video bubble, and make sure everyone gets exactly what
								they need from you. It&apos;s the simple, scalable way to engage like never before.
							</p>
						</Col>
						<Col span={13} className="text-center ps-3">
							<h1 style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.2rem' }}>Get Started</h1>
							<InputWrapper>
								<input placeholder="Your Email address" />
								<div className="iconWrapper">
									<Icon path={arrowRightLine} fill="var(--bs-white)" />
								</div>
							</InputWrapper>
						</Col>
						<Col span={11}>
							<LinkWrapper width={width}>
								<Link href="/">Home</Link>
								<Link href="/pricing">Pricing</Link>

								<Link href="/demo">Demo</Link>
								<Link href="/about">About Us</Link>
							</LinkWrapper>
						</Col>
					</Row>
				)}
				<hr />
				<Row className="mt-3 justify-content-between align-items-center">
					<Col span={20}>
						<h6 style={{ fontSize: '14px' }}>© 2023 CompleteGreet || All rights reserved</h6>
					</Col>
					<Col span={4}>
						<div className="d-flex justify-content-around">
							<Icon path={linkedIn} fill="var(--bs-primary)" width={20} />
							<Icon path={solidMessenger} fill="var(--bs-primary)" width={20} />
							<Icon path={twitter} fill="var(--bs-primary)" width={20} />
							{/* <Image src="/images/tik-tok-2.png"  /> */}
						</div>
					</Col>
				</Row>
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: var(--bs-dark);
	padding: 2rem 1rem;
	/* text-align: center; */
	color: #ffffff;
	overflow: hidden;
`;

const LinkWrapper = styled.div<{ width?: number }>`
	/* background-color: #ffffff90; */
	/* border-radius: 1rem; */
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	a {
		font-family: 'Poppins';
		margin: 0 2rem;
		font-size: ${({ width }) => (width <= 680 ? '12px' : '18px')};
		color: #ffffff;
		text-decoration: none;
	}
`;

const InputWrapper = styled.div`
	width: 100%;
	position: relative;
	/* display: flex; */
	background-color: #191919;
	justify-content: space-between;
	/* padding: 0.125rem 0; */
	border-radius: 33px;
	input {
		background-color: transparent;
		outline: none;
		border: none;
		color: var(--bs-white);
		padding: 0.825rem;
	}
	.iconWrapper {
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
		padding: 0.625rem;
		background-color: var(--bs-primary);
		border-radius: 50%;
	}
	/* flex-wrap: wrap; */
`;
