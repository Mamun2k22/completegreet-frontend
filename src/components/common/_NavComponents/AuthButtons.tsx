import { useRouter } from 'next/router';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const AuthButtons: FC = () => {
	const router = useRouter();
	return (
		<>
			<AuthBtn variant="secondary" onClick={() => router.push('/register')}>
				Sign Up
			</AuthBtn>

			<AuthBtn className="ms-3 text-white" onClick={() => router.push('/login')}>
				Sign In
			</AuthBtn>
		</>
	);
};

const AuthBtn = styled(Button)`
	padding: 0.725rem 1.625rem;
	font-size: 1rem;
	@media screen and (max-width: 991px) {
		padding: 0.775rem 1.5rem;
		font-size: 0.875rem;
	}
	@media screen and (max-width: 831px) {
		padding: 0.575rem 1.1rem;
		font-size: 0.825rem;
	}
`;
