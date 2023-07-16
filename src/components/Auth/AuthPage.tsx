import { Col, Row } from 'antd';
import Image from 'next/image';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { ForgotPassComp, LoginComp, RegistrationComp, RestPasswordComp } from './_components';

export const AuthPage: FC<{ auth: string }> = ({ auth }) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Wrapper>
				<Row>
					<Col md={10} sm={24} className="p-0">
						{auth === 'register' && (
							<LeftPart>
								<div>
									<div className="d-flex align-items-center mb-5">
										<Image src="/images/logo2.png" width={80} height={76} alt="logo" />
										<h2 className="mb-0 ms-2" style={{ fontWeight: 700, fontSize: '2.2rem' }}>
											Complete Greet
										</h2>
									</div>
									<div>
										<ul className="my-4">
											<li>Improve conversion rates</li>
											<li>Boost Engagement</li>
											<li>Streamline Customer Service</li>
										</ul>
										<p className="bottomText">
											Create the best first impression of your business. Personalized video
											greetings helps build credibility and trust. This feature helps your
											businesses create a strong first impression and strengthens your brand and
											image.
										</p>
									</div>
								</div>
							</LeftPart>
						)}
						{auth === 'login' && (
							<LeftPart>
								<div>
									<div className="d-flex align-items-center mb-5">
										<Image src="/images/logo2.png" width={80} height={76} alt="logo" />
										<h2 className="mb-0 ms-2" style={{ fontWeight: 700, fontSize: '2.2rem' }}>
											Complete Greet
										</h2>
									</div>
									<div>
										<ul className="my-4">
											<li>Address Customer Concerns</li>
											<li>Demonstrate Thought Leadership</li>
											<li>Stay Connected</li>
										</ul>
										<p className="bottomText">
											Provide easy access to communication tools that cater to the needs of
											customers, helping businesses streamline and optimize their customer service
											experience.
										</p>
									</div>
								</div>
							</LeftPart>
						)}
					</Col>
					<Col md={14} sm={24} xs={24} className="p-0">
						<RightPart>
							{auth === 'login' ? (
								<>
									<h1 style={{ color: '#000D36', fontWeight: 700 }}>Login</h1>
									<p style={{ color: '#000D36', fontWeight: 600, fontSize: '1rem' }}>
										Welcome to complete greet
									</p>
									<LoginComp />
								</>
							) : auth === 'register' ? (
								<>
									<h1 style={{ color: '#000D36', fontWeight: 700 }}>Register</h1>
									<p style={{ color: '#000D36', fontWeight: 600, fontSize: '1rem' }}>
										Few simple steps and get register
									</p>
									<RegistrationComp />
								</>
							) : auth === 'reset' ? (
								<>
									<h1 style={{ color: '#000D36', fontWeight: 700 }}>Password Reset</h1>
									<RestPasswordComp />
								</>
							) : (
								<>
									<h1 style={{ color: '#000D36', fontWeight: 700 }}>Password Reset</h1>
									<p style={{ color: '#000D36', fontWeight: 600, fontSize: '1rem' }}>
										Enter your email
									</p>
									<ForgotPassComp />
								</>
							)}
						</RightPart>
					</Col>
				</Row>
			</Wrapper>
		</div>
	);
};

const Wrapper = styled(Container)`
	border-radius: 2rem;
	padding: 0;
	/* overflow: hidden; */
`;

const LeftPart = styled.div`
	display: flex;
	align-items: center;
	background-color: #2b4394;
	height: 100%;
	padding: 2.5rem 2.5rem;
	color: #ffffff;
	ul {
		li {
			font-weight: 700;
			font-size: 1rem;
		}
	}
	.bottomText {
		font-size: 1rem;
	}
`;
const RightPart = styled.div`
	background-color: #e2e9ff;
	height: 100%;
	padding: 2.5rem 2.5rem;
	color: #ffffff;
`;
