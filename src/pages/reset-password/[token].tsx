import { AuthPage } from '@components/Auth';
import { FC } from 'react';
import styled from 'styled-components';
// https://gleaming-fudge-32ab9a.netlify.app//reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1MCwiZW1haWwiOiJqYWhpZHVuLm51ci5tYWhlZUBnbWFpbC5jb20iLCJleHBpcmVzSW4iOiIxNGQiLCJpYXQiOjE2ODQ4NjUwMzd9.ZoowXcy4Np-GD8-sS1tsfHZoCjjV9-jfwXwiEYKF7Vc
const RestsPassword: FC = () => {
	return (
		<Wrapper>
			<AuthPage auth="reset" />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default RestsPassword;
