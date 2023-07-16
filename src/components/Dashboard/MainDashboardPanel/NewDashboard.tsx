import { bubbleAPI } from '@libs/api';
import { authAPI } from '@libs/api/auth';
import { getUserState } from '@store/actions';
import { handleSetSubscriberInfo } from '@store/dashboard/dashboard.action';
import { getSubscriberState } from '@store/dashboard/dashboard.slice';
import { setSettings } from '@store/user/user.actions';
import { Col, Row, Spin, Switch, message as msg } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LiveChatCard } from './LiveChatCard';
import { OverviewCard } from './OverviewCard';
import { NoteAndBug } from './_components';

export const NewDashboard: FC = () => {
	const [loading, setLoading] = useState(false);
	const [greeting, setGreeting] = useState('');
	const { profile, settings } = useSelector(getUserState);
	const subscriberInfo = useSelector(getSubscriberState);
	const [loadingType, setLoadingType] = useState<string>('');

	const getDashboardDetails = async () => {
		setLoading(true);
		try {
			const { data, error, message } = await bubbleAPI.getSubscriberOverview(profile.id);
			if (!error) {
				handleSetSubscriberInfo(data);
			} else {
				msg.error(message);
			}
		} catch (error) {
			msg.error(String(error));
		} finally {
			setLoading(false);
		}
	};

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
		getDashboardDetails();
	}, []);

	const handleInfo = async (e: boolean, type: string) => {
		const payload = {
			live_on_bubble: settings.live_on_bubble,
			push_notification: settings.push_notification,
		};
		if (type === 'live_on_bubble') {
			setLoadingType('live_on_bubble');
			payload.live_on_bubble = e === true ? 1 : 0;
		}
		if (type === 'push_notification') {
			// alert(type);
			setLoadingType('push_notification');
			payload.push_notification = e === true ? 1 : 0;
		}

		try {
			const { data, error, message } = await authAPI.updateDashInfo(payload);
			if (!error) {
				console.log(data);
				setSettings(data);
			} else {
				alert(message);
			}
		} catch (error) {
			alert(error);
		} finally {
			setLoadingType('');
		}
	};

	const notifyMe = async (e: boolean) => {
		if (!('Notification' in window)) {
			// Check if the browser supports notifications
			alert('This browser does not support desktop notification');
		} else if (Notification.permission === 'granted') {
			handleInfo(e, 'push_notification');
		} else if (Notification.permission !== 'denied') {
			// We need to ask the user for permission
			Notification.requestPermission().then((permission) => {
				// If the user accepts, let's create a notification
				if (permission === 'granted') {
					handleInfo(true, 'push_notification');
				} else {
					handleInfo(false, 'push_notification');
				}
			});
		}

		//  else {
		// 	handleInfo(false, 'push_notification');
		// }

		// At last, if the user has denied notifications, and you
		// want to be respectful, there is no need to bother them anymore.
	};

	return (
		<Wrapper>
			<div className="p-4">
				<h1 style={{ fontWeight: '700' }}>
					<span>{greeting}</span>, <span className="text-secondary">{profile.name}!</span>
				</h1>
			</div>
			<h4 className="my-2">Realtime Overview</h4>

			<Row className="w-100 mb-3" gutter={16}>
				<Col lg={19} md={24} sm={24} xs={24} className="mb-3">
					<Row gutter={16}>
						<Col lg={8} md={24} sm={24} xs={24}>
							<Spin spinning={loading}>
								<OverviewCard
									footerText="Chats"
									variant="red"
									leftText={`New: ${subscriberInfo.new_chat}`}
									rightText={`Old: ${subscriberInfo.old_chat}`}
									content={subscriberInfo.chat}
								/>
							</Spin>
						</Col>

						<Col lg={8} md={24} sm={24} xs={24}>
							<Spin spinning={loading}>
								<OverviewCard
									footerText="All Visitors"
									variant="pink"
									leftText={`New: ${subscriberInfo.new_visitor}`}
									rightText={`Old: ${subscriberInfo.old_visitor}`}
									content={subscriberInfo.visitor}
								/>
							</Spin>
						</Col>

						<Col lg={8} md={24} sm={24} xs={24}>
							<Spin spinning={loading}>
								<OverviewCard
									headTitle="Increase Capacity"
									content={`${subscriberInfo.visitor_percent}%`}
									footerText="Capacity Of Visitors"
									variant="orange"
									// leftText="New: 0"
									rightText={`${subscriberInfo.visitor}/${subscriberInfo.visitor_capacity}`}
								/>
							</Spin>
						</Col>

						<Col lg={12} md={24} sm={24} xs={24}>
							<div
								style={{ borderRadius: '22px' }}
								className="bg-white p-4 d-flex justify-content-between align-items-center  mb-4"
							>
								<h3>Live On Chats</h3>
								<Switch
									loading={loadingType === 'live_on_bubble'}
									checked={settings.live_on_bubble === 1 ? true : false}
									onChange={(e) => handleInfo(e, 'live_on_bubble')}
								/>
							</div>
						</Col>

						<Col lg={12} md={24} sm={24} xs={24}>
							<div
								style={{ borderRadius: '22px' }}
								className="bg-white p-4 d-flex justify-content-between align-items-center mb-4"
							>
								<h3>Push Notification</h3>
								<Switch
									loading={loadingType === 'push_notification'}
									checked={settings.push_notification === 1 ? true : false}
									onChange={notifyMe}
								/>
							</div>
						</Col>

						<Col md={24}>
							<NoteAndBug />
						</Col>
					</Row>
				</Col>

				<Col lg={5} md={24} sm={24} xs={24}>
					<LiveChatCard />
				</Col>
			</Row>
		</Wrapper>
	);
};

const Wrapper = styled.div``;

const ItemBox = styled.div`
	overflow: hidden;
	border-radius: 0.325rem;
	box-shadow: 0 0 8px 1px #8181813a;
`;
