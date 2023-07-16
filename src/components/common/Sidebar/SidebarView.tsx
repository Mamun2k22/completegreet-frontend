import { UserOutlined } from '@ant-design/icons';
import { useWindowSize } from '@libs/hooks';
import Icon, { arrowDown, nonAlignedMenu } from '@libs/icons';
import { getUserState } from '@store/actions';
import { openSidebarHandler, setSidebarCollapsed } from '@store/user/user.actions';
import { setPagePathHandler } from '@store/video/video.actions';
import { Avatar } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { menuArray } from './constant';
import { IconButton, Item, SideItems, SidebarBody, SidebarFooter, SidebarHeader, SidebarWraaper } from './styles';

export const SidebarView: FC = () => {
	const { width } = useWindowSize();
	const { isSidebarcollapse, profile, isSidebarOpen, editMode } = useSelector(getUserState);
	const [activeMenu, setActiveMenu] = useState<string>('/dashboard');
	const [isTitleVisible, setIsTitleVisible] = useState<boolean>(true);
	const router = useRouter();

	const onToggleSideBar = () => {
		if (width > 768) {
			setSidebarCollapsed(!isSidebarcollapse);
		} else {
			setSidebarCollapsed(true);
			openSidebarHandler(false);
		}
	};
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (width > 768 && width > 0) {
				openSidebarHandler(true);
				setSidebarCollapsed(isSidebarcollapse);
			} else if (width <= 768 && width > 0) {
				setSidebarCollapsed(true);
				openSidebarHandler(false);
			}
		}
	}, [width]);

	useEffect(() => {
		if (isSidebarcollapse) {
			setIsTitleVisible(false);
		} else {
			setIsTitleVisible(true);
		}
	}, [isSidebarcollapse]);

	useEffect(() => {
		setActiveMenu(router.pathname);
	}, [router]);

	const handleItemClick = (idx: number, slug: string) => {
		if (!editMode) {
			setPagePathHandler('videoLibrary');
			// handleResetBubbleState();
			router.push(`${slug}`);
		} else {
			router.push(`${slug}`);
		}
	};
	return (
		<SidebarWraaper className="py-2" isToggle={isSidebarcollapse} width={width} isSidebarOpen={isSidebarOpen}>
			<SidebarHeader className="my-3 d-flex ">
				{!isSidebarcollapse && (
					<div className="mx-auto">
						<Image
							onClick={() => router.push('/')}
							src="/images/logo-white.png"
							width={147}
							height={42}
							alt="logo"
							style={{ cursor: 'pointer' }}
						/>
					</div>
				)}
				<IconButton
					onClick={onToggleSideBar}
					className="p-2 bg-white ms-auto d-flex justify-content-center align-items-center"
				>
					<Icon path={nonAlignedMenu} fill="var(--bs-secondary)" />
				</IconButton>
			</SidebarHeader>
			{menuArray.length > 0 && (
				<SidebarBody>
					<SideItems>
						{menuArray.map((el, idx) => (
							<Item
								key={idx}
								active={activeMenu === `${el.slug}`}
								onClick={() => handleItemClick(idx, el.slug)}
							>
								<Icon path={el.icon} fill="var(--bs-white)" />
								{isTitleVisible && <span>{el.title}</span>}
							</Item>
						))}
					</SideItems>
				</SidebarBody>
			)}
			<SidebarFooter
				className="text-center"
				style={{ cursor: 'pointer' }}
				onClick={() => router.push('/user-profile')}
			>
				<div className="d-flex align-items-center justify-content-center">
					<Avatar
						className="d-flex justify-content-center align-items-center"
						size="large"
						icon={
							profile.avatarURL ? (
								<Image
									src={process.env.apiUrl + '/' + profile.avatarURL}
									width={30}
									height={30}
									alt="profile"
									priority
								/>
							) : (
								<UserOutlined />
							)
						}
					/>
					{!isSidebarcollapse && (
						<h6
							// style={{ maxWidth: '100px', overflow: 'hidden', whiteSpace: 'nowrap' }}
							className="m-0 ms-2"
						>
							{profile.name}
							<Icon path={arrowDown} fill="white" />
						</h6>
					)}
				</div>
			</SidebarFooter>
		</SidebarWraaper>
	);
};
