import LiveChat from '@components/LiveChat';
import { DashboardLayout } from '@components/templates';
import { withAuth } from '@libs/hoc';
import { NextPage } from 'next';

const LiveChatPage: NextPage = () => {
	return (
		<DashboardLayout>
			<LiveChat />
		</DashboardLayout>
	);
};

export default withAuth(LiveChatPage);
