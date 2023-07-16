import { AuthPage } from '@components/Auth';
import { withoutAuth } from '@libs/hoc';
import { NextPage } from 'next';
import styled from 'styled-components';

const Login: NextPage = () => {
	return (
		<Wrapper>
			<AuthPage auth="login" />
		</Wrapper>
	);
};

export default withoutAuth(Login);

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-y: auto;
`;
