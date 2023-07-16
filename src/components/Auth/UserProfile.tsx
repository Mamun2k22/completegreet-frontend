import { DashboardFilled, LogoutOutlined, ProfileFilled, UserOutlined } from '@ant-design/icons';
import { getUserState } from '@store/actions';
import { revokeAuthUser } from '@store/user/user.actions';
import { Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';

type MenuType = { slug: string };

export const UserProfile: FC = () => {
	const router = useRouter();
	const {
		profile: { name },
	} = useSelector(getUserState);
	const items: MenuProps['items'] = [
		{
			label: 'Profile',
			key: '/user-profile',
			icon: <ProfileFilled />,
		},
		{
			label: 'Dashboard',
			key: '/dashboard',
			icon: <DashboardFilled />,
		},
		{
			label: 'Logout',
			key: 'logout',
			icon: <LogoutOutlined />,
			danger: true,
		},
	];
	const handleMenuClick: MenuProps['onClick'] = (e) => {
		if (e.key !== 'logout') {
			router.push(e.key);
		} else if (e.key === 'logout') {
			revokeAuthUser();
		}
	};

	const menuProps = {
		items,
		onClick: handleMenuClick,
	};

	return (
		<div>
			<Dropdown.Button menu={menuProps} placement="bottomLeft" icon={<UserOutlined />}>
				{name}
			</Dropdown.Button>
		</div>
	);
};
