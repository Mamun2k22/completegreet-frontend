import { useWindowSize } from '@libs/hooks';
import { FC } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

export const Questions: FC = () => {
	const { width } = useWindowSize();
	return (
		<div className="bg-white py-5">
			<div className=" mb-5 text-center">
				<h1 style={{ fontSize: width <= 580 ? '1.5rem' : '3rem', fontWeight: 600 }}>Have Questions?</h1>
				<h6 style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem', margin: '0' }}>
					Perfect first impression, Personal Greetings & Trustworthy Presentation.
				</h6>
			</div>
			<Row className="w-100 p-3 g-3">
				<Col md={6}>
					<AccordionWrapper defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>
									{' '}
									How does it works?
								</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											CompleteGreet connects you and your customers through handy little video
											bubbles and effortless live text chat. It really is that simple.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
				<Col md={6}>
					<AccordionWrapper defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>Why is this FREE?</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											Don&apos;t worry, we also have paid options! Our FREE version is designed to
											show you what we can do so you can make the right decision for your
											business.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
				<Col md={6}>
					<AccordionWrapper>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>
									Do I need live video chat?
								</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											Being able to connect with customers and clients in an instant is the future
											of online work. Video bubbles are the most natural, relaxing way to make it
											happen.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
				<Col md={6}>
					<AccordionWrapper>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>
									What can I use a video bubble for?
								</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											Sales, customer support, and of course a Completegreet. Video bubbles are
											the smart way to engage customers from the moment they arrive on your site.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
				<Col md={6}>
					<AccordionWrapper>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>
									How does the live text chat work?
								</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											Not everyone can talk right now, so we added some intuitive live text
											functionality to cater to everyone. Perfect when you want a variety of
											communication options at your fingertips.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
				<Col md={6}>
					<AccordionWrapper>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>
									How do I know if this is right for me?
								</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											Making use of our FREE Trial option is the best way to put us to the test
											because you can try before you buy. Once your trial is complete, we can even
											help recommend the ideal option based on your individual usage.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
				<Col md={6}>
					<AccordionWrapper>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>
									How do I know when I&apos;m “Live”?
								</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											When you&apos;re “Live” an icon appears under your bubble allowing customers
											to chat just like you&apos;re in the room with them. Need to work on
											something else? A quick click will pause your “Live” functionality.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
				<Col md={6}>
					<AccordionWrapper>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Title style={{ fontSize: width <= 580 ? '1rem' : '1.15rem' }}>
									How do I know if this is right for me?
								</Title>
							</Accordion.Header>
							<Accordion.Body>
								<Text style={{ fontSize: width <= 580 ? '0.825rem' : '1.15rem' }}>
									<ul>
										<li>
											Your bubble still displays and we&apos;ll redirect every customer message to
											your email. Ideal when you want to make sure you never miss out on the
											chance to connect and engage.
										</li>
									</ul>
								</Text>
							</Accordion.Body>
						</Accordion.Item>
					</AccordionWrapper>
				</Col>
			</Row>
		</div>
	);
};

const AccordionWrapper = styled(Accordion)`
	.accordion-button {
		background-color: #f2f7f6 !important;
		color: var(--bs-dark);
	}
	.accordion-button:not(.collapsed) {
		background-color: #f2f7f6 !important;
		color: var(--bs-dark);
	}
	.accordion-button:focus {
		box-shadow: none !important;
	}
`;

const Text = styled.p`
	margin: 0;
	/* font-size: 1.1rem; */
`;

const Title = styled.h4`
	margin: 0;
	/* font-size: 20px; */
	font-weight: 500;
`;
