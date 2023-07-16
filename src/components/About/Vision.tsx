import Image from 'next/image';
import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const Vision: FC = () => {
	return (
		<Container style={{ borderRadius: '2rem' }} className="p-5 shadow mb-5 bg-white">
			<Row>
				<Col md={4}>
					<div style={{ marginBottom: '6.3rem' }}>
						<h1 style={{ fontWeight: 700, color: '#3B5DCD' }}>VISIONS &</h1>
						<h1 style={{ color: '#CD7D3B', fontWeight: 700 }}>VALUES</h1>
					</div>
					<div>
						<h6 style={{ color: '#00155A', fontWeight: 700, fontSize: '1rem' }}>WARMLY YOURS</h6>
						<Image src="/images/sign.jpg" width={160} height={35} alt="image" />
					</div>
				</Col>
				<Col md={8}>
					<h2 style={{ color: '#00155A', fontWeight: 700 }}>
						WE BELIEVE COMMUNICATION IS THE SECRET TO YOUR SUCCESS.
					</h2>
					<p className="mb-4" style={{ fontSize: '1rem', color: '#143ab8', fontWeight: 500 }}>
						Technology is everywhere you look, but do generic, high-volume approaches really add anything
						beneficial? Just because the technology exists, does that make it worth using? When we asked
						ourselves these key questions we realized something: the more human the better.
					</p>
					<p style={{ fontSize: '1rem', color: '#143ab8', fontWeight: 500 }}>
						From that moment on we’ve worked tirelessly to create a personable, helpful service that changes
						the way you interact with your customers. CompleteGreet is our solution and it allows you to add
						the personal touch to every customer interaction. Just what you want to hear when it’s time to
						build your business the right way.
					</p>
				</Col>
			</Row>
		</Container>
	);
};
