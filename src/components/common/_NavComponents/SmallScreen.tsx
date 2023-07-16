import { getUserState } from '@store/actions';
import { revokeAuthUser } from '@store/user/user.actions';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AuthButtons } from './AuthButtons';

export const SmallScreen: FC<{ showOffcanvas: boolean; handleClose: () => void }> = ({
	showOffcanvas,
	handleClose,
}) => {
	const router = useRouter();
	const { isAuthenticate } = useSelector(getUserState);
	return (
		<Offcanvas placement="end" show={showOffcanvas} onHide={handleClose}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
					<Image src="/images/top-logo.png" alt="logo" width={226} height={62} />
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				{!isAuthenticate && (
					<div className="my-3">
						<AuthButtons />
					</div>
				)}
				{isAuthenticate && (
					<div className="p-1 pb-2">
						<Button
							onClick={() => {
								router.push('/user-profile');
							}}
							className="m-1"
							type="primary"
						>
							Profile
						</Button>
						<Button
							onClick={() => {
								router.push('/dashboard');
							}}
							className="m-1"
							type="primary"
						>
							Dashboard
						</Button>
						<Button onClick={() => revokeAuthUser()} className="m-1" type="dashed" danger>
							Logout
						</Button>
					</div>
				)}
				<LinkWrapper className="d-flex flex-column">
					<Link onClick={() => handleClose()} href="/">
						Home
					</Link>

					<Link onClick={() => handleClose()} href="/pricing">
						Pricing
					</Link>

					<Link onClick={() => handleClose()} href="/demo">
						Demo
					</Link>

					{/* <Link href="/blog">Blog</Link> */}

					<Link onClick={() => handleClose()} href="/about">
						About Us
					</Link>
				</LinkWrapper>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

const LinkWrapper = styled.div`
	a {
		background-color: #0141ff17;
		padding: 0.425rem;
		margin: 0.325rem;
		color: var(--bs-secondary);
		border-radius: 3px;
	}
`;
