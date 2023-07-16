import { useWindowSize } from '@libs/hooks';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled, { css } from 'styled-components';

export const PopSection: FC = () => {
	const { width } = useWindowSize();
	const [tabName, setTabName] = useState<string>('home');
	const handleTabChange = (type: string) => {
		setTabName(type);
	};
	return (
		<Container className="my-5">
			<div className="mt-4 mb-5 text-center">
				<h1 style={{ fontSize: width <= 580 ? '1.5rem' : '3rem', fontWeight: 600, margin: '0' }}>
					Hook Customers In Seconds
				</h1>
				<p style={{ fontSize: width <= 580 ? '0.825rem' : '1.5rem', fontWeight: 400, margin: '0' }}>
					Get Trustworthy First Impressions With Personal Greetings
				</p>
			</div>
			<div className="d-flex justify-content-end flex-wrap mb-4">
				<TabButton onClick={() => handleTabChange('home')} active={tabName === 'home'}>
					Home Page
				</TabButton>

				<TabButton onClick={() => handleTabChange('product')} active={tabName === 'product'}>
					Product Page
				</TabButton>

				<TabButton onClick={() => handleTabChange('thanks')} active={tabName === 'thanks'}>
					Thank You Page
				</TabButton>

				<TabButton onClick={() => handleTabChange('land')} active={tabName === 'land'}>
					Landing Page
				</TabButton>

				<TabButton onClick={() => handleTabChange('blog')} active={tabName === 'blog'}>
					Blog Page
				</TabButton>
			</div>
			<Row gutter={24} className="justify-content-between align-items-center">
				<Col md={9} sm={10} xs={24}>
					{tabName === 'home' && (
						<>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/launch1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Enhance user engagement</h5>
									<p>
										The video bubble creates a personal touch, increasing visitor interaction and
										interest in your website.
									</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/magnet1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Improve conversion rates</h5>
									<p>
										Tailored introductions based on page location help guide visitors toward making
										a purchase or taking action.
									</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/double-tap1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Streamline Communication Subheadline:</h5>
									<p>
										All-in-one video bubble with multiple contact options for seamless interaction.
									</p>
								</Col>
							</Row>
						</>
					)}
					{tabName === 'product' && (
						<>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/launch1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Showcase Your Products</h5>
									<p>Detailed introductions entice visitors to explore your offerings.</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/magnet1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Simplify Purchasing</h5>
									<p>Instant live chat and booking options for a hassle-free experience.</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/double-tap1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Address Customer Concerns</h5>
									<p>Use the Product Page Video to Answer FAQs</p>
								</Col>
							</Row>
						</>
					)}
					{tabName === 'thanks' && (
						<>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/launch1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Your Satisfaction Matters</h5>
									<p>Our video bubble ensures a smooth and personalized post-purchase experience.</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/magnet1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Stay Connected</h5>
									<p>Integrated contact options for easy follow-ups and support.</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/double-tap1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Encourage Referrals</h5>
									<p>Use the Thank-You Page Video to Ask for Referrals</p>
								</Col>
							</Row>
						</>
					)}
					{tabName === 'land' && (
						<>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/launch1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Welcome to Our Special Offer</h5>
									<p>Personalized video messaging tailored to your unique interests.</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/magnet1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Time-Sensitive Promotion</h5>
									<p>Dont miss out - our video bubble gets you started quickly</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/double-tap1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Targeted Messaging</h5>
									<p>Use the Landing Page Video to Address Specific Needs</p>
								</Col>
							</Row>
						</>
					)}
					{tabName === 'blog' && (
						<>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/launch1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Engaging Content Awaits</h5>
									<p>Personalized video introductions guide you through our latest articles.</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/magnet1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Boost Engagement</h5>
									<p>Use Video in Your Blog Posts to Keep Readers Engaged</p>
								</Col>
							</Row>
							<Row className="my-3 bg-white rounded p-2" align={'middle'} gutter={12}>
								<Col span={4} className="text-center">
									<Image
										src="/images/double-tap1.png"
										alt=""
										width={30}
										height={30}
										// layout="responsive"
									/>
								</Col>
								<Col span={20}>
									<h5>Demonstrate Thought Leadership</h5>
									<p>Use Video in Your Blog Posts to Establish Yourself as a Thought Leader</p>
								</Col>
							</Row>
						</>
					)}
				</Col>
				<Col md={14} sm={13} xs={24}>
					{/* <Button>Test</Button> */}
					<div className="my-3">
						<Image src="/images/MacBookPro16.png" alt="" width={488} height={114} layout="responsive" />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

const TabButton = styled.button<{ active?: boolean }>`
	padding: 12px 42px;
	border-radius: 6px;
	font-size: 0.75rem;
	margin: 0.325rem 0.424rem;
	font-weight: 500;
	${({ active }) => {
		switch (active) {
			case true:
				return css`
					background-color: var(--bs-secondary);
					color: var(--bs-white);
				`;

			default:
				return css`
					background-color: var(--bs-white);
					color: var(--bs-dark);
				`;
		}
	}}
	border: 1.5px solid var(--bs-secondary);
	/* margin: 0 0.625rem; */
`;
