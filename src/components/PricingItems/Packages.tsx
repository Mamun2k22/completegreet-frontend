import Icon, { check } from '@libs/icons';
import { getUserState } from '@store/actions';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { tabItems } from './constant';

export const Packages: FC<{ data: []; currentPlan?: any }> = ({ data, currentPlan }) => {
	const router = useRouter();

	const {
		profile: { id },
	} = useSelector(getUserState);
	const [tabActive, setActive] = useState(12);
	const [currentItems, setCurrentItems] = useState([]);
	const handleTabClick = (key: number) => {
		setActive(key);
	};

	useEffect(() => {
		setCurrentItems(() => {
			return data?.filter((el: any) => el.duration === tabActive);
		});
	}, [tabActive, data]);

	return (
		<>
			<div className="text-center">
				{tabItems.map((el, idx) => (
					<TabButton
						active={tabActive === el.duration}
						onClick={() => handleTabClick(el.duration)}
						className="mx-1"
						key={idx}
					>
						{el.title}
					</TabButton>
				))}
			</div>
			{/* <Container style={{ maxWidth: '1400px' }}>

			</Container> */}
			<Row className="p-3 w-100 mx-auto" gutter={12} justify={'center'}>
				{currentItems?.map((el: any, idx: number) => {
					return (
						<Col key={idx} xl={4} lg={6} md={12} sm={12} xs={24} className="mb-4">
							<Card
								className="py-3 shadow"
								style={{
									height: '520px',
									borderRadius: '0.425rem',
									border: currentPlan?.id === el.id ? '1px solid #e07720' : '',
									color: el?.active ? '#ed7a1b' : '#ee7d21',
									backgroundColor: currentPlan?.id === el.id ? '#FFEEDF' : '#ffffff',
								}}
							>
								<div>
									<div className="mt-3 text-center">
										<Card.Title
											style={{
												fontWeight: 700,
												fontSize: '1.3rem',
												color: el?.active ? '#e07720' : '#e07720',
											}}
										>
											{el?.pname}
										</Card.Title>
									</div>
									<div className="p-2 text-center">
										<Card.Title
											style={{
												fontWeight: 700,
												color: el?.active ? '#e07720' : '#e07720',
												fontSize: '1.3rem',
											}}
										>
											${el?.price}
											<sub style={{ fontSize: '10px' }}>/per month</sub>
										</Card.Title>
									</div>
								</div>
								<Card.Body>
									<div style={{ height: '310px' }}>
										{JSON.parse(el?.details).map((item: string, idx: number) => (
											<Card.Text
												key={idx}
												style={{ fontSize: '1rem', color: el?.active ? '#e07720' : '#e07720' }}
											>
												<div className="d-flex">
													<div>
														<Icon
															width={20}
															path={check}
															fill={el?.active ? '#e07720' : '#e07720'}
														/>
													</div>
													<p className="m-0">{item}</p>
												</div>
											</Card.Text>
										))}
									</div>
									<div className="text-center">
										<>
											{el?.active && id && (
												<Button
													className="px-4 text-dark mt-3"
													type="submit"
													style={{
														fontSize: '0.825rem',
														background: '#E3D6CC',
														boxShadow: '0px 5px 0px #C6BAB0',
														border: 'none',
														fontWeight: 700,
													}}
												>
													Current Plan
												</Button>
											)}
										</>

										{el.id !== currentPlan?.id && (
											<Button
												className="px-4 text-white mt-3"
												onClick={() => {
													router.push(`/checkout/${el?.code}?dur=${el?.duration}`);
												}}
												style={{
													fontSize: '0.825rem',
													background: '#CD7D3B',
													border: 'none',
													fontWeight: 700,
												}}
											>
												Get This
											</Button>
										)}
										{el.id === currentPlan?.id && (
											<Button
												className="px-4 text-dark mt-3"
												style={{
													fontSize: '0.825rem',
													background: '#E3D6CC',
													border: 'none',
													fontWeight: 700,
												}}
											>
												Current Plan
											</Button>
										)}
									</div>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row>
		</>
	);
};

type TabProps = {
	active: boolean;
};

const TabButton = styled(Button)<TabProps>`
	border-radius: 10rem;
	padding: 0.825rem 2rem;
	${({ active }) => {
		switch (active) {
			case true:
				return css`
					color: #ffffff !important;
					background-color: #3b5dcd !important;
					border: none;
					font-size: 1.1rem;
					font-weight: 700;
				`;
			case false:
				return css`
					color: #3b5dcd !important;
					background-color: #f7f9fd !important;
					border: none;
					font-size: 1.1rem;
					font-weight: 700;
				`;

			default:
				break;
		}
	}}
`;
