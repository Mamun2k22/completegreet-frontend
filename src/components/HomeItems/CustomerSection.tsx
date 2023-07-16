import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';

export const CustomerSection = () => {
	return (
		<Container className="mt-5">
			<h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#00155A' }}>PUT YOUR CUSTOMERS FIRST</h1>
			<Row className="align-items-start">
				<Col md={4}>
					<h3 style={{ color: '#0D2162' }}>
						When your customers feel valued, they come back over and over again. Something as simple as a
						welcome message delivered in an engaging video bubble can massively increase contact rates
						before you know it. We’ve even made it so you can see which page they’re looking at when they
						get in touch. Perfect when you want to get right up to speed!
					</h3>
				</Col>
				<Col md={8} className="text-end">
					<Image src="/images/customer.png" width={520} height={500} alt="image" />
				</Col>
			</Row>
		</Container>
	);
};
