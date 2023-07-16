import { useWindowSize } from '@libs/hooks';
import Icon, { multiRoundedCircle } from '@libs/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

export const DetailsBox: FC = () => {
	const { width } = useWindowSize();

	const router = useRouter();
	const [email, setEmail] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();
		router.push(`/register?userEmail=${email}`);
	};
	return (
		<Container className="my-5">
			<Row className="g-4">
				<Col lg={14} className="pe-3 text-center text-lg-start">
					<BlueText>Deliver Better</BlueText>
					<CoffeeText>Communication</CoffeeText>
					<BlueText>with Video Bubble</BlueText>
					{width > 996 && (
						<BottomParra>
							CompleteGreet combines live text chat and video bubbles in perfect harmony. Did we mention
							that you can start today?
						</BottomParra>
					)}
					{width <= 996 && (
						<BottomParra className="px-3">
							CompleteGreet combines live text chat and video bubbles in perfect harmony. Did we mention
							that you can start today?
						</BottomParra>
					)}
					{width > 996 && (
						<div className="mt-4 ">
							<Form onSubmit={handleSubmit}>
								<InputGroup style={{ maxWidth: '37rem' }}>
									<Form.Control
										required
										type="email"
										style={{ border: 'none' }}
										className="py-4"
										placeholder="Enater Your Email"
										onChange={(e) => setEmail(e.target.value)}
										// aria-label="Recipient's username with two button addons"
									/>
									<Button
										type="submit"
										style={{ width: '13rem', fontSize: '1.25rem' }}
										variant="primary"
										className="text-white"
										// onClick={() => router.push(`/register?userEmail=${email}`)}
									>
										Get Started
									</Button>
								</InputGroup>
							</Form>
							<div className="my-3 d-flex  flex-wrap">
								<div className="me-3">
									<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
									<span style={{ fontSize: '0.875rem' }}>Try us out for free</span>
								</div>
								<div className="me-3">
									<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
									<span style={{ fontSize: '0.875rem' }}>No credit card required</span>
								</div>
								<div>
									<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
									<span style={{ fontSize: '0.875rem' }}>Easy to install</span>
								</div>
							</div>
						</div>
					)}
					{width <= 996 && (
						<div className="mt-4 px-3">
							<Form onSubmit={handleSubmit}>
								<InputGroup style={{ maxWidth: '100%' }}>
									<Form.Control
										required
										type="email"
										style={{ border: 'none' }}
										className="py-3"
										placeholder="Enater Your Email"
										onChange={(e) => setEmail(e.target.value)}
										// aria-label="Recipient's username with two button addons"
									/>
									<Button
										type="submit"
										style={{ width: '8rem', fontSize: '1rem' }}
										variant="primary"
										className="text-white"
										// onClick={() => router.push(`/register?userEmail=${email}`)}
									>
										Get Started
									</Button>
								</InputGroup>
							</Form>
							{width > 996 && (
								<div className="my-3 d-flex  flex-wrap">
									<div className="me-3">
										<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
										<span style={{ fontSize: '0.875rem' }}>Try us out for free</span>
									</div>
									<div className="me-3">
										<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
										<span style={{ fontSize: '0.875rem' }}>No credit card required</span>
									</div>
									<div>
										<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
										<span style={{ fontSize: '0.875rem' }}>Easy to install</span>
									</div>
								</div>
							)}
							{width <= 996 && (
								<div className="my-3 d-flex justify-content-center  flex-wrap">
									<div className="me-3">
										<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
										<span style={{ fontSize: '0.875rem' }}>Try us out for free</span>
									</div>
									<div className="me-3">
										<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
										<span style={{ fontSize: '0.875rem' }}>No credit card required</span>
									</div>
									<div>
										<Icon path={multiRoundedCircle} fill="#4ECB71" />{' '}
										<span style={{ fontSize: '0.875rem' }}>Easy to install</span>
									</div>
								</div>
							)}
						</div>
					)}
				</Col>
				<Col lg={10} sm={24} xs={20} className=" text-center p-0">
					<Image src="/images/Bubble.png" alt="bubble" width={680} height={512} layout="responsive" />
				</Col>
			</Row>
		</Container>
	);
};

const BlueText = styled.h1`
	font-family: 'Poppins Bold';
	margin: 0;
	color: var(--bs-dark);
	font-size: 4rem;
	@media screen and (max-width: 1024px) {
		font-size: 2.5rem;
	}
	@media screen and (max-width: 425px) {
		font-size: 2rem;
	}
`;
const CoffeeText = styled.h1`
	font-family: 'Poppins Bold';
	margin: 0;
	color: var(--bs-primary);
	font-size: 4rem;
	@media screen and (max-width: 1024px) {
		font-size: 2.5rem;
	}
	@media screen and (max-width: 425px) {
		font-size: 2rem;
	}
`;

const BottomParra = styled.div`
	font-size: 1.25rem;
	color: var(--bs-dark);
	/* @media screen and (max-width: 1024px) {
		font-size: 2.5rem;
	} */
`;
