import { useWindowSize } from '@libs/hooks';
import { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

export const TopHeader: FC = () => {
	const { width } = useWindowSize();
	return (
		<Wrapper>
			<Col md={12}>
				<Title style={{ fontSize: width <= 580 ? '1.5rem' : '2.5rem' }}>WANT THE PERFECT PLAN?</Title>
			</Col>
			<Col md={12}>
				<h1 style={{ fontSize: width <= 580 ? '1.2rem' : '1.8rem' }} className="secondTitle">
					Ready when you are…
				</h1>
			</Col>
			<Col md={4}>
				<h6 className="para" style={{ fontSize: width <= 580 ? '0.875rem' : '1rem' }}>
					Pick a plan, click a button, start communicating. When it’s time to connect, we make it happen.
					contact us if you have any problem.
				</h6>
			</Col>
			<Col md={12}>
				<Button
					className="px-4 text-white mt-3"
					style={{ fontSize: '1.1rem', background: '#CD7D3B', border: 'none' }}
				>
					Contact Us
				</Button>
			</Col>
		</Wrapper>
	);
};
const Wrapper = styled(Row)`
	justify-content: center;
	background-color: #f7f9fd;
	padding: 2rem;
	border-radius: 1rem;
	margin: 0.775rem;
	text-align: center;
	.secondTitle {
		color: #00155a;
	}
	.para {
		font-size: 1.1rem;
		color: #3a5499;
	}
`;

const Title = styled.h1`
	font-weight: 700;
	color: #00155a;
	/* font-size: 2.6rem; */
`;
