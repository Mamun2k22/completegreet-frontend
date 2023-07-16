import { NewDashboard } from '@components/Dashboard/MainDashboardPanel/NewDashboard';
import { DashboardLayout } from '@components/templates';
import { bubbleAPI } from '@libs/api';
import { withAuth } from '@libs/hoc';
import { getUserState, setChatList } from '@store/actions';
import { setUserPlanId } from '@store/user/user.actions';
import { message } from 'antd';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashBoard: NextPage = () => {
	const dispatch = useDispatch();
	const { profile } = useSelector(getUserState);
	const [messageApi, contextHolder] = message.useMessage();

	const getAllBubble = async () => {
		try {
			const { error, data, message } = await bubbleAPI.getAllBubble();
			if (!error) {
			} else {
				messageApi.open({
					type: 'error',
					content: String(message),
				});
			}
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: String(error),
			});
		}
	};

	const getSubInfo = async () => {
		try {
			const { error, data, message } = await bubbleAPI.getSubscriberInfo(profile.id);
			if (!error) {
				console.log({ data });
				setUserPlanId(data?.plan_id);
			} else {
				messageApi.open({
					type: 'error',
					content: String(message),
				});
			}
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: String(error),
			});
		}
	};

	const getChatList = async () => {
		try {
			const { data, error, message } = await bubbleAPI.getChatList(profile?.id);
			if (!error) {
				dispatch(setChatList(data));
			} else {
				console.log(message);
			}
		} catch (error) {}
	};

	useEffect(() => {
		getAllBubble();
		getChatList();
		getSubInfo();
	}, []);

	return (
		<DashboardLayout>
			{contextHolder}
			{/* <MainDashboardPanel /> */}
			<NewDashboard />
		</DashboardLayout>
	);
};

export default withAuth(DashBoard);
