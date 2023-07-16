import { getLiveChatState } from '@store/actions';
import Image from 'next/image';
import { FC } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const UserInfo: FC<any> = ({ activePage }) => {
	const { activeChat } = useSelector(getLiveChatState);

	return (
		<Col md={3}>
			{activeChat && (
				<Wrapper>
					<Image width={60} height={60} src="/images/avatar.jpg" alt="" />
					<h4 className="Name text-ellipsis">{activeChat?.client_name}</h4>
					<h4 className="Email text-ellipsis">{activeChat?.client_email}</h4>
					<p>Current page</p>
					<small className="d-block text-ellipsis">{activePage}</small>
				</Wrapper>
			)}
		</Col>
	);
};

const Wrapper = styled.div`
	padding: 1rem;
	text-align: center;
	border-radius: 1.5rem;
	color: var(--bs-secondary);
	background-color: var(--bs-white);
	box-shadow: 0px 16px 18px #3b5dcd21;

	.Name {
		font-size: 1.375rem;
		margin: 0.5rem 0 0 0;
		color: var(--bs-secondary);
		font-family: 'Poppins Bold';
	}
	.Email {
		font-weight: 500;
		margin: 0 0 1rem 0;
	}

	p {
		margin-bottom: 0;
		line-height: initial;

		&:first-of-type {
			font-weight: 600;
		}
	}
`;
