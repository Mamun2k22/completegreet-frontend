import { useWindowSize } from '@libs/hooks';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
export const DeliverSection = () => {
	const { width } = useWindowSize();
	return (
		<Wrapper className="bg-white py-4">
			<Container>
				<div className="mt-4 mb-5 text-center">
					<h1 style={{ fontSize: width <= 580 ? '1.5rem' : '3rem', fontWeight: 600, margin: '0' }}>
						Is it Easy to install?
					</h1>
					<h6 style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem', margin: '0' }}>
						It takes about 5-10 minuets to install and have great setup
					</h6>
				</div>
				{width > 1029 && (
					<Row className="align-items-center justify-content-around">
						<Col md={5} className="text-center">
							<Image
								src="/images/work1.png"
								width={210}
								height={185}
								alt="image"
								// layout="responsive"
							/>
							<p className="mt-3" style={{ fontWeight: 500 }}>
								Easily upload your video from your phone or computer in just a few clicks.
							</p>
						</Col>
						<Col md={1} className="text-center">
							<Image
								src="/images/next-icon.png"
								width={30}
								height={30}
								alt="image"
								// layout="responsive"
							/>
						</Col>
						<Col md={5} className="text-center">
							<Image
								src="/images/work2.png"
								width={220}
								height={185}
								alt="image"
								// layout="responsive"
							/>
							<p className="mt-3" style={{ fontWeight: 500 }}>
								Effortlessly customize your pages and buttons to create a seamless user experience.
							</p>
						</Col>
						<Col md={1} className="text-center">
							<Image
								src="/images/next-icon.png"
								width={30}
								height={30}
								alt="image"
								// layout="responsive"
							/>
						</Col>
						<Col md={5} className="text-center">
							<Image
								src="/images/work3.png"
								width={240}
								height={185}
								alt="image"
								// layout="responsive"
							/>
							<p className="mt-3" style={{ fontWeight: 500 }}>
								Quickly and easily integrate your video and other media by placing the code in your
								website builder.
							</p>
						</Col>
					</Row>
				)}
				{width <= 1029 && (
					<Row className="align-items-center justify-content-around">
						<Col md={5} className="text-center">
							<Image
								src="/images/work1.png"
								width={160}
								height={155}
								alt="image"
								// layout="responsive"
							/>
							<p className="mt-3 px-3" style={{ fontWeight: 500 }}>
								Easily upload your video from your phone or computer in just a few clicks.
							</p>
						</Col>
						{width > 773 && (
							<Col md={1} className="text-center">
								<Image
									src="/images/next-icon.png"
									width={30}
									height={30}
									alt="image"
									// layout="responsive"
								/>
							</Col>
						)}
						<Col md={5} className="text-center">
							<Image
								src="/images/work2.png"
								width={160}
								height={155}
								alt="image"
								// layout="responsive"
							/>
							<p className="mt-3 px-3" style={{ fontWeight: 500 }}>
								Effortlessly customize your pages and buttons to create a seamless user experience.
							</p>
						</Col>
						{width > 773 && (
							<Col md={1} className="text-center">
								<Image
									src="/images/next-icon.png"
									width={30}
									height={30}
									alt="image"
									// layout="responsive"
								/>
							</Col>
						)}
						<Col md={5} className="text-center">
							<Image
								src="/images/work3.png"
								width={160}
								height={155}
								alt="image"
								// layout="responsive"
							/>
							<p className="mt-3 px-3" style={{ fontWeight: 500 }}>
								Quickly and easily integrate your video and other media by placing the code in your
								website builder.
							</p>
						</Col>
					</Row>
				)}
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	overflow: hidden;
`;
