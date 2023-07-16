import { AuthPage } from '@components/Auth';
import { withoutAuth } from '@libs/hoc';
import { NextPage } from 'next';
import styled from 'styled-components';

const ForgotPassword: NextPage = () => {
	return (
		<Wrapper>
			<AuthPage auth="forgetPass" />
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

export default withoutAuth(ForgotPassword);
