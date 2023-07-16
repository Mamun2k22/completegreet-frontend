import { UserProfile } from '@components/Auth/UserProfile';
import { SidebarView } from '@components/common/Sidebar';
import { useWindowSize } from '@libs/hooks';
import Icon, { nonAlignedMenu } from '@libs/icons';
import { getLiveChatState, getUserState } from '@store/actions';
import { openSidebarHandler, setSidebarCollapsed } from '@store/user/user.actions';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io(`${process.env.apiUrl}`, { autoConnect: true });

export const DashboardLayout: FC<PropsType> = ({ children }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { chatList, activeChat } = useSelector(getLiveChatState);
	const { width } = useWindowSize();
	const { isSidebarcollapse, settings } = useSelector(getUserState);

	const handleSidebarOpen = () => {
		openSidebarHandler(true);
		setSidebarCollapsed(true);
	};

	// useEffect(() => {
	// 	socket.on('new chat', () => {
	// 		// alert('dhukse');
	// 		if (router.pathname !== '/dashboard/live-chat') {
	// 			// pushNotification();
	// 		}
	// 	});
	// }, [dispatch]);
	// useEffect(() => {
	// 	socket.on(activeChat?.chat_code, () => {
	// 		// alert('dhukse oh 1');
	// 		// alert('dhukse oh');
	// 		if (router.pathname !== '/dashboard/live-chat') {
	// 			// pushNotification();
	// 		}
	// 	});
	// }, [activeChat?.chat_code, dispatch, socket]);
	return (
		<LayoutWrapper width={width}>
			<div className="sideBar">
				<SidebarView />
			</div>

			<div className="children">
				{width <= 768 && (
					<div className="bg-white border p-4 shadow-sm d-flex justify-content-between">
						<Icon path={nonAlignedMenu} onClick={handleSidebarOpen} />
						<UserProfile />
					</div>
				)}
				{width > 768 && (
					<div className="bg-white border p-4 shadow-sm d-flex justify-content-end">
						<UserProfile />
					</div>
				)}
				<div className="child">{children}</div>
			</div>
		</LayoutWrapper>
	);
};

const LayoutWrapper = styled.div<{ width: number }>`
	display: flex;
	.children {
		width: 100%;
		overflow: hidden;
		height: 100vh;
		.child {
			overflow: hidden;
			overflow-y: auto;
			height: calc(100vh - 80px);
			/* background-color: var(--bs-white); */
			padding: ${({ width }) => (width > 768 ? '1.4rem' : '0.475rem')};
			border-radius: 5px;
		}
	}
`;

type PropsType = {
	children: ReactNode;
};
