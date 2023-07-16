import { Button, Col, Container, Row } from 'react-bootstrap';

export const AboutHeader = () => {
	return (
		<Container className="my-5">
			<Row>
				<Col md={6}>
					<h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#CD7D3B' }}>Our Philosophy:</h1>
					<h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: '#3B5DCD' }}>
						Business is powered by communication
					</h1>
					<p style={{ color: '#456be7', fontSize: '1rem', fontWeight: 500 }}>
						We’re real people just like you and your customers, which means we know the difference a
						friendly face and a pointer in the right direction can make. By turning your website into a
						helpful, useful corner of the online world, you can change the way browsers become buyers before
						you know it. Our goal is to help you make it happen with one simple change: seamless
						communication. Launch live chats, pop up in a video bubble, and make sure everyone gets exactly
						what they need from you. It’s the simple, scalable way to engage like never before. All you have
						to do is click to get started…
					</p>
					<Button
						className="px-4 text-white"
						style={{ fontSize: '1rem', background: '#CD7D3B', border: 'none' }}
					>
						Contact Us
					</Button>
				</Col>
				<Col md={6} className="d-flex align-items-center justify-content-center">
					<h5>Video coming soon...</h5>
					{/* <iframe
						width="100%"
						height="315"
						src="https://www.youtube.com/embed/jNo82YnmsgA"
						title="YouTube video player"
						// frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					></iframe> */}
				</Col>
			</Row>
		</Container>
	);
};
