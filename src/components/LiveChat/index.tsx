import { bubbleAPI } from '@libs/api';
import { getUserState, setChatList } from '@store/actions';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { ChatList } from './ChatList';
import { ChatViewer } from './ChatViewer';
import { UserInfo } from './UserInfo';

const socket = io(`${process.env.apiUrl}`, { autoConnect: true }); // Replace with your server URL

const LiveChat: FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [recentMessage, setRecentMessage] = useState(null);
	const [loading, setIsLoading] = useState(false);
	const [activePage, setActivePage] = useState(null);

	const { profile } = useSelector(getUserState);

	function playSound() {
		const audio = new Audio('/audio/NotificationSoundFile-1672841469730.wav');
		audio.play();
	}

	const getChatList = async () => {
		try {
			const { data, error, message } = await bubbleAPI.getChatList(profile?.id);
			if (!error) {
				dispatch(setChatList(data));
			} else {
				console.log(message);
			}
		} catch (error) {}
	};

	useEffect(() => {
		setRecentMessage(null);
		if (profile?.id) getChatList();

		socket.on('new chat', (message) => {
			playSound();
			setRecentMessage(message.chat_code);
			getChatList();
			socket.emit(
				'new User chat',
				message,
				message.client_ip_address,
				message.client_city,
				message.client_country,
			);
		});
	}, [profile, dispatch]);

	return (
		<Container fluid>
			<Row>
				<ChatList
					recentMessage={recentMessage}
					setIsLoading={setIsLoading}
					socket={socket}
					setRecentMessage={setRecentMessage}
				/>
				<ChatViewer socket={socket} setActivePage={setActivePage} loading={loading} />
				<UserInfo activePage={activePage} />
			</Row>
		</Container>
	);
};

export default LiveChat;
