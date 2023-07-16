import { EditFilled } from '@ant-design/icons';
import { DashboardLayout } from '@components/templates';
import { authAPI } from '@libs/api/auth';
import { withAuth } from '@libs/hoc';
import { useWindowSize } from '@libs/hooks';
import { getUserState } from '@store/actions';
import { handleUpdateAvatar, revokeAuthUser } from '@store/user/user.actions';
import { Card, Image, Spin, Switch, message as msg } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const UserProfile: NextPage = () => {
	const { width } = useWindowSize();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const userInfo = useSelector(getUserState);
	const ref = useRef<HTMLInputElement>();
	const uploadImage = () => {
		ref.current?.click();
	};
	console.log(width);

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		const formData = new FormData();
		formData.append('image', event.target.files[0]);
		try {
			const { data, message, error } = await authAPI.imageUpload(formData);
			if (!error) {
				handleUpdateAvatar(data);
				router.reload();
				msg.success(String(message));
			} else {
				msg.error(String(message));
			}
		} catch (error) {
			msg.error(String(error));
		} finally {
			setLoading(false);
		}
	};

	return (
		<DashboardLayout>
			<Card>
				<Wrapper className="text-center " width={width}>
					<h1 className="text-center text-secondary">Personal Information</h1>
					<Spin spinning={loading}>
						<div className="image_container">
							<div
								style={{
									overflow: 'hidden',
									width: '120px',
									height: '120px',
									borderRadius: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Image
									src={process.env.apiUrl + userInfo.profile.avatarURL}
									className="w-100 h-100"
									alt="profile_picure"
								/>
							</div>
							<div className="uploadButton" onClick={uploadImage}>
								<EditFilled />
								<input
									onChange={handleChange}
									ref={ref}
									type="file"
									className="d-none"
									accept="image/png, image/jpeg"
								/>
							</div>
						</div>
					</Spin>
					<small className="text-danger">* max size 150 MB</small>
					<h5 className="mt-3" style={{ fontSize: width > 700 ? '1.3rem' : '0.8rem' }}>
						{userInfo?.profile.name}
					</h5>
					<h5 style={{ fontSize: width > 700 ? '1.3rem' : '0.8rem' }}>{userInfo?.profile.email}</h5>

					<div className="conv_email">
						<h4>Send Conversations transcript of conversation to emails</h4>
						<div>
							<Switch />
						</div>
					</div>
					<div className="conv_email mt-3">
						<h5 onClick={() => revokeAuthUser()} className="text-danger" style={{ cursor: 'pointer' }}>
							Logout
						</h5>
					</div>
				</Wrapper>
			</Card>
		</DashboardLayout>
	);
};

const Wrapper = styled.div<{ width?: number }>`
	.image_container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		/* overflow: hidden; */
		margin: auto;
		border: 1px solid var(--bs-secondary);
		position: relative;
		z-index: 98;
		.uploadButton {
			cursor: pointer;
			z-index: 99;
			position: absolute;
			border-radius: 50%;
			bottom: 0;
			right: 0;
			width: 30px;
			height: 30px;
			background: var(--bs-white);
		}
	}
	.conv_email {
		background-color: #e9edfa;
		padding: 1rem;
		margin: 0 auto;
		border-radius: 8px;
		width: ${({ width }) => (width > 700 ? '400px' : '100%')};

		h4 {
			color: var(--bs-secondary);
			font-size: ${({ width }) => (width > 700 ? '1.5rem' : '1rem')};
		}
	}
`;

export default withAuth(UserProfile);
