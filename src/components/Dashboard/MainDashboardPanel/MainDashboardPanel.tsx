import { getUserState } from '@store/actions';
import { Col, Row, Switch, Tag } from 'antd';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { NoteAndBug } from './_components';

export const MainDashboardPanel: FC = () => {
	const [greeting, setGreeting] = useState('');
	const { profile } = useSelector(getUserState);

	useEffect(() => {
		const currentHour = new Date().getHours();
		if (currentHour >= 5 && currentHour < 12) {
			setGreeting('Good Morning');
		} else if (currentHour >= 12 && currentHour < 16) {
			setGreeting('Good Noon');
		} else if (currentHour >= 16 && currentHour < 20) {
			setGreeting('Good Evening');
		} else {
			setGreeting('Good Night');
		}
	}, []);
	return (
		<Wrapper>
			<div className="p-4">
				<h1 style={{ fontWeight: 'bold' }}>
					<span>{greeting}</span>, <span className="text-secondary">{profile.name}!</span>
				</h1>
			</div>
			<h4 className="my-2">Realtime Overview</h4>
			<Row gutter={18} className="my-4">
				<Col md={6}>
					<ItemBox style={{ backgroundColor: '#0051ff' }} className=" text-white">
						<div className="text-center m-0 p-4">
							<h3 style={{ fontWeight: 700, fontSize: '2.5rem' }} className="m-0">
								0
							</h3>
							<h5 className="text-center">Chats</h5>
						</div>
						<div
							style={{ backgroundColor: '#4882ff' }}
							className="text-center py-1 px-3 d-flex justify-content-between"
						>
							<span>New: 0</span>
							<span>Old: 0</span>
						</div>
					</ItemBox>
				</Col>
				<Col md={6}>
					<ItemBox style={{ backgroundColor: '#058b27' }} className=" text-white">
						<div className="text-center m-0 p-4">
							<h3 style={{ fontWeight: 700, fontSize: '2.5rem' }} className="m-0">
								0
							</h3>
							<h5 className="text-center">All Visitors</h5>
						</div>
						<div
							style={{ backgroundColor: '#7cc28c' }}
							className="text-center py-1 px-3 d-flex justify-content-between"
						>
							<span>New: 0</span>
							<span>Old: 0</span>
						</div>
					</ItemBox>
				</Col>
				<Col md={7}>
					<ItemBox style={{ backgroundColor: '#bea800' }} className="text-white">
						<div className="text-center m-0 p-4">
							<div className="">
								<Link className="text-white" href="/pricing">
									Increase Capacity
								</Link>
							</div>
							<h3 className="mb-2">
								<Tag color="#746e00">0.00%</Tag>
							</h3>
							<h5 className="text-center m-0">Capacity Of Visitors</h5>
						</div>
						<div
							style={{ backgroundColor: '#cec264' }}
							className="text-center py-1 px-3 d-flex justify-content-between"
						>
							<span>March 23</span>

							<span>0/500</span>
						</div>
					</ItemBox>
				</Col>
				<Col md={5}>
					<ItemBox style={{ backgroundColor: '#be2c00' }} className=" text-white">
						<div className="text-center m-0 p-4">
							<Tag style={{ fontSize: '1rem', cursor: 'pointer' }} className="my-2 px-2 py-1" color="red">
								View all
							</Tag>

							<h5 className="text-center mt-1">Live Chats</h5>
						</div>
						<div
							style={{ backgroundColor: '#ee6840' }}
							className=" py-1 px-3 d-flex justify-content-center"
						>
							<span>No chat to view</span>
						</div>
					</ItemBox>
				</Col>
			</Row>
			<Row gutter={18} className="my-4">
				<Col md={12}>
					<div className="bg-white p-4 rounded d-flex justify-content-between align-items-center">
						<h3>Live On Chats</h3>
						<Switch />
					</div>
				</Col>
				<Col md={12}>
					<div className="bg-white p-4 rounded d-flex justify-content-between align-items-center">
						<h3>Push Notification</h3>
						<Switch />
					</div>
				</Col>
			</Row>
			<NoteAndBug />
		</Wrapper>
	);
};

const Wrapper = styled.div``;

const ItemBox = styled.div`
	overflow: hidden;
	border-radius: 0.325rem;
	box-shadow: 0 0 8px 1px #8181813a;
`;
