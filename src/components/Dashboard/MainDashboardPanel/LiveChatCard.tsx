import { getLiveChatState } from '@store/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const LiveChatCard: FC = () => {
	const { chatList, activeChat } = useSelector(getLiveChatState);
	const router = useRouter();
	return (
		<Wrapper>
			<div className="Header">Live Chats</div>
			<div className="Content VerticalScroller">
				{chatList?.map((el, idx) => (
					<div key={idx} className="Item p-3 m-1">
						<div className="d-flex align-items-center">
							<Image height={50} width={50} src="/images/avatar.jpg" alt="abc" />
							<p className="text-ellipsis ms-3">{el.client_email}</p>
						</div>
						<p style={{ fontSize: '11px' }} className="mb-0 mt-2">
							Hey, thanks for visiting! Feel free to ask anything.
						</p>
					</div>
				))}
				{!chatList?.length && <p className="text-center">No chat available</p>}
			</div>
			<Link href="/dashboard/live-chat">
				<button className="Footer">View All</button>
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	padding: 10px 7px;
	background: rgba(59, 93, 205, 0.29) 0% 0% no-repeat padding-box;
	border-radius: 22px;

	.Header {
		font: normal normal bold 25px/30px Poppins;
		letter-spacing: 0px;
		color: #000d36;
		margin-bottom: 1rem;
	}
	.Content {
		width: 100%;
		/* background: #ffffff 0% 0% no-repeat padding-box; */
		box-shadow: 0px 16px 18px #3b5dcd21;
		border-radius: 14px;
		padding: 0.5rem;
		margin-bottom: 1.5rem;
		max-height: calc(100vh - 400px);
		overflow: hidden;
		overflow-y: auto;

		.Item {
			gap: 0.5rem;
			/* display: flex; */
			cursor: pointer;
			/* align-items: center; */
			background: #ffffff 0% 0%;
			border-radius: 8px;

			p {
				margin-bottom: 0;
				font-size: 1.2rem;
				line-height: initial;
			}
		}
	}
	.Footer {
		background: rgba(255, 255, 255, 0.52) 0% 0% no-repeat padding-box;
		border-radius: 22px;
		font: normal normal bold 14px Poppins;
		letter-spacing: 0px;
		color: #06227e;
		outline: none;
		border: none;
		padding: 0.75rem;
	}
`;
