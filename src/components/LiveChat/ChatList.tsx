import { bubbleAPI } from '@libs/api';
import { IChatList } from '@libs/api/interfaces';
import { getLiveChatState, setActiveChat, setChatHistory } from '@store/actions';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

export const ChatList: FC<PropsType> = ({ socket, setIsLoading, setRecentMessage, recentMessage }) => {
	const { chatList, activeChat } = useSelector(getLiveChatState);
	const router = useRouter();

	const dispatch = useDispatch();

	const getChatHistory = async (el: IChatList) => {
		try {
			const { error, data } = await bubbleAPI.getChatHistory(el?.id);
			if (!error) {
				dispatch(setActiveChat(el));
				dispatch(setChatHistory(data));
				// router.push(`/dashboard/live-chat?chat_id=${el.id}`);
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};
	// console.log({ recentMessage });

	return (
		<Wrapper md={3}>
			<h3 className="Header">Chats</h3>

			<div className="main_list VerticalScroller">
				{chatList?.length > 0 ? (
					<ul className="List">
						{chatList?.map((el, i) => (
							<li
								key={i}
								className={`Item ${activeChat?.chat_code === el.chat_code && 'Active'}`}
								onClick={() => {
									setRecentMessage(null);
									setIsLoading(true);
									getChatHistory(el);
								}}
							>
								<Image height={50} width={50} src="/images/avatar.jpg" alt="abc" />
								<p className="text-ellipsis" title={el.client_email}>
									{el.client_email}
								</p>
								{recentMessage === el.chat_code && (
									<div
										style={{
											width: '13px',
											height: '9px',
											borderRadius: '50%',
											backgroundColor: 'var(--bs-secondary)',
											overflow: 'hidden',
										}}
									></div>
								)}
							</li>
						))}
					</ul>
				) : (
					<p className="text-center my-3">No chats found!</p>
				)}
			</div>
		</Wrapper>
	);
};

interface PropsType {
	data?: IChatList[];
	socket?: any;
	setIsLoading: any;
	setRecentMessage: any;
	recentMessage: string;
}

const Wrapper = styled(Col)`
	.main_list {
		max-height: 700px;
		overflow-y: auto;
	}
	.Header {
		font-size: 1.8rem;
		font-family: 'Poppins Bold';
	}
	.List {
		margin: 0;
		padding: 0.55rem;
		border-radius: 8px;
		list-style-type: none;
		background-color: var(--bs-white);

		.Item {
			gap: 1rem;
			display: flex;
			padding: 1rem;
			cursor: pointer;
			align-items: center;
			border: 1px solid #cfcfcf;
			margin: 0.225rem;
			border-radius: 8px;
			position: relative;
			z-index: 9;
			.new_msg {
				content: 'ok chai';
				background-color: #000000;
				position: absolute;
				width: 100%;
				height: 20px;
				right: 0;
				top: 0;
				z-index: 10;
			}

			p {
				margin-bottom: 0;
				font-size: 1.2rem;
				line-height: initial;
			}

			&.Active {
				color: #002dc2;
				background-color: var(--bs-gray-300);
			}
			&:hover {
				background-color: var(--bs-gray-100);
			}
		}
	}
`;
