import { UserProfile } from '@components/Auth/UserProfile';
import { getUserState } from '@store/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { AuthButtons } from './AuthButtons';

export const BigScreenItems: FC = () => {
	const router = useRouter();
	const { isAuthenticate } = useSelector(getUserState);

	return (
		<>
			<NavWrapper className="ms-auto me-3">
				<LinkWrapper active={router.pathname === '/'} href="/">
					Home
				</LinkWrapper>

				<LinkWrapper active={router.pathname === '/pricing'} href="/pricing">
					Pricing
				</LinkWrapper>

				<LinkWrapper active={router.pathname === '/demo'} href="/demo">
					Demo
				</LinkWrapper>

				{/* <LinkWrapper active={router.pathname === '/blog'} href="/blog">
					Blog
				</LinkWrapper> */}

				<LinkWrapper active={router.pathname === '/about'} href="/about">
					About Us
				</LinkWrapper>
			</NavWrapper>
			{isAuthenticate && <UserProfile />}
			<NavWrapper>{!isAuthenticate && <AuthButtons />}</NavWrapper>
		</>
	);
};

const NavWrapper = styled(Nav.Link)``;

const LinkWrapper = styled(Link)<{ active?: boolean }>`
	${({ active }) => {
		switch (active) {
			case true:
				return css`
					color: var(--bs-secondary) !important;
					border-bottom: 2px solid var(--bs-secondary);
				`;

			default:
				return css``;
		}
	}}
	color: #010b14;
	text-decoration: none;
	font-size: 1rem;
	font-weight: 600;
	margin: 0 2.5rem 0 0;
	@media screen and (max-width: 922px) {
		/* color: red; */
		font-size: 0.875rem;
		margin: 0 0.725rem;
	}
	@media screen and (max-width: 831px) {
		font-size: 0.775rem;
		margin: 0 0.525rem;
	}
`;
