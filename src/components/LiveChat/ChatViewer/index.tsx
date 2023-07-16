import { bubbleAPI } from '@libs/api';
import { pushNotification } from '@libs/helpers';
import Icon, { sendPlane, userSmile } from '@libs/icons';
import { getLiveChatState, getUserState, setChatHistory } from '@store/actions';
import { Empty, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { ChatContent } from './ChatContent';

export const ChatViewer: FC<PropsType> = ({ socket, setActivePage, loading }) => {
	const [value, setValue] = useState('');
	const { profile } = useSelector(getUserState);
	const { activeChat } = useSelector(getLiveChatState);
	const dispatch = useDispatch();
	function playSound() {
		const audio = new Audio('/audio/NotificationSoundFile-1672841469730.wav');
		audio.play();
		pushNotification();
	}
	const getChatHistory = async () => {
		try {
			const { error, data } = await bubbleAPI.getChatHistory(activeChat?.id);
			if (!error) {
				dispatch(setChatHistory(data));
			}
		} catch (error) {}
	};

	useEffect(() => {
		socket.on(activeChat?.chat_code, (msg) => {
			playSound();

			// getChatHistory();
			if (msg.chat_id === activeChat?.id) {
				getChatHistory();

				setActivePage('offline');
				socket.emit(activeChat?.chat_code + 'UL', 'L');
				socket.on(activeChat?.chat_code + 'UL', async (msg) => {
					setActivePage(msg);
				});
			}
		});

		// return () => {
		// 	dispatch(setActiveChat(null));
		// };
	}, [socket, activeChat?.chat_code]);

	const handleSendMsg = () => {
		if (value) {
			const payload = {
				SenderID: profile?.id,
				text: value,
				UserId: profile?.id,
				Receiver: activeChat?.subscriber_id,
				chat_id: activeChat?.id,
				BubbleID: activeChat?.bubble_id,
				ChatCode: activeChat?.chat_code,
				ImageURL: profile.avatarURL,
			};
			socket.on(activeChat?.chat_code, (msg) => {
				// console.log('lis', msg);
				// getChatHistory();
			});
			socket.emit(activeChat?.chat_code, payload, () => {
				getChatHistory();
			});
			// socket.emit(activeChat?.chat_code + 'UL', 'L');
			// socket.on(activeChat?.chat_code + 'UL', async (msg) => {
			// 	console.log('UL', msg);
			// });
			setValue('');
		}
	};

	return (
		<Col md={6}>
			<Spin spinning={loading}>
				{activeChat && (
					<Wrapper>
						<div className="Header">
							<p>{activeChat?.client_name}</p>
							<p>
								{activeChat?.client_city}/{activeChat?.client_country}
							</p>
						</div>

						<ChatContent />

						<Sender>
							<div className="InputWrapper">
								<Icon className="Icon Icon_Smile" path={userSmile} />
								<input
									className="Input"
									placeholder="Type Here..."
									value={value}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleSendMsg();
										}
									}}
									onChange={(e) => setValue(e.target.value)}
								/>
								<Icon onClick={handleSendMsg} className="Icon Icon_Send" path={sendPlane} />
							</div>
						</Sender>
					</Wrapper>
				)}
				<div className="mt-5">{!activeChat?.client_name && <Empty description="No chat Found" />}</div>
			</Spin>
		</Col>
	);
};

interface PropsType {
	socket: Socket;
	setActivePage: any;
	loading: boolean;
}
const Wrapper = styled.div`
	border-radius: 2.5rem;
	background-color: var(--bs-secondary);

	.Header {
		padding: 1.25rem 1rem;

		p {
			margin: 0;
			font-size: 1.25rem;
			color: var(--bs-white);
			font-family: 'Poppins Bold';
		}
	}
`;

const Sender = styled.div`
	padding: 1.25rem 1rem;
	box-shadow: -4px -7px 8px -9px #00000075;
	border-bottom-left-radius: 2.4rem;
	border-bottom-right-radius: 2.4rem;
	background-color: var(--bs-white);

	.InputWrapper {
		position: relative;

		.Input {
			width: 100%;
			border: none;
			outline: none;
			font-size: 0.9rem;
			border-radius: 1.563rem;
			padding: 0.625rem 2.25rem;
			background: #3b5dcd1c 0% 0% no-repeat padding-box;
		}
		.Icon {
			top: 0.52rem;
			cursor: pointer;
			position: absolute;

			&_Smile {
				left: 0.5rem;
			}
			&_Send {
				right: 0.6rem;

				path {
					fill: var(--bs-secondary);
				}
			}
		}
	}
`;
