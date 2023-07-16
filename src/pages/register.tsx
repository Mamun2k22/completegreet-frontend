import { AuthPage } from '@components/Auth';
import { withoutAuth } from '@libs/hoc';
import { NextPage } from 'next';
import styled from 'styled-components';

const Register: NextPage = () => {
	return (
		<Wrapper>
			<AuthPage auth="register" />
		</Wrapper>
	);
};

export default withoutAuth(Register);

const Wrapper = styled.div`
	padding: 8rem 0;
	/* max-height: 90vh;
	overflow-y: auto;
	overflow-x: hidden; */
`;
