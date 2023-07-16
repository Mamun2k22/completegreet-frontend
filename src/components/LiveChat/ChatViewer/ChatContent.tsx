import { getLiveChatState, getUserState } from '@store/actions';
import Image from 'next/image';
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const ChatContent: FC = () => {
	const { chatHistory, activeChat } = useSelector(getLiveChatState);
	const { profile } = useSelector(getUserState);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chatHistory]);
	// console.log(activeChat);

	// console.log(chatHistory);

	const getZoneTime = (time: string) => {
		const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		// console.log(userTimezone);
		const date = new Date(time);
		const options: any = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: userTimezone,
			hour12: true,
		};
		const convertedDateTime = date.toLocaleString('en-US', options);
		return convertedDateTime;
	};

	// const getZoneTime = (time: string): string => {
	// 	// Retrieve the user's timezone offset
	// 	var userTimezoneOffset = new Date().getTimezoneOffset();

	// 	// Send the user's timezone offset to the server and retrieve the server-side timestamp

	// 	// Assuming the serverTimestamp is the timestamp received from the server
	// 	var serverTimestamp = time;

	// 	// Convert the server timestamp to the user's timezone
	// 	var userTimestamp = new Date(serverTimestamp);
	// 	userTimestamp.setMinutes(userTimestamp.getMinutes() - userTimezoneOffset);

	// 	// Format the user's timestamp as a user-friendly string
	// 	var formattedTimestamp = userTimestamp.toLocaleString();

	// 	// Display the formatted timestamp to the user
	// 	return formattedTimestamp?.replace(/:\d+\s(AM|PM)$/g, ' $1');
	// };

	return (
		<Wrapper className="VerticalScroller">
			{chatHistory?.length > 0 &&
				chatHistory?.map((el, i, arr) => {
					if (String(profile?.id) == String(el.receiver_id)) {
						return (
							<div key={i} className="Received" ref={arr.length - 1 === i ? messagesEndRef : undefined}>
								<div className="Received_Message">{el.content}</div>
								<div className="Received_Date">{getZoneTime(el.time)}</div>
							</div>
						);
					} else {
						return (
							<div key={i} className="Sent" ref={arr.length - 1 === i ? messagesEndRef : undefined}>
								<div className="d-flex align-items-end">
									<div className="Sent_Message">{el.content}</div>
									<Image width={42} height={42} src="/images/avatar.jpg" alt="" />
								</div>
								<div className="Sent_Date">{getZoneTime(el.time)}</div>
							</div>
						);
					}
				})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 1.25rem 1rem;
	border-top-left-radius: 2.5rem;
	border-top-right-radius: 2.5rem;
	background-color: var(--bs-white);
	overflow: hidden;
	overflow-y: auto;
	height: 55vh;

	.Received {
		max-width: 70%;
		margin-right: auto;

		&_Message {
			position: relative;
			padding: 0.813rem;
			border-radius: 0.75rem;
			border-bottom-left-radius: 0;
			background: #3b5dcd1a 0% 0% no-repeat padding-box;

			&::after {
				content: '';
				bottom: 0;
				left: -1.063rem;
				position: absolute;
				border-style: solid;
				border-width: 0.438rem;
				border-color: transparent;
				border-right-width: 0.625rem;
				border-right-color: #3b5dcd1a;
				border-bottom-color: #3b5dcd1a;
			}
		}

		&_Date {
			margin-top: 0.25rem;
			color: var(--light-gray);
		}
	}

	.Sent {
		max-width: 70%;
		margin-left: auto;

		&_Message {
			width: 100%;
			margin-right: 0.65rem;
			position: relative;
			padding: 0.813rem;
			border-radius: 0.75rem;
			color: var(--bs-white);
			border-bottom-right-radius: 0;
			background: transparent linear-gradient(106deg, #3b5dcd 0%, #1e2f67 100%) 0% 0% no-repeat padding-box;

			&::after {
				bottom: 0;
				content: '';
				right: -1rem;
				border-width: 0.438rem;
				border-style: solid;
				border-color: transparent;
				border-right-width: 0.813rem;
				border-left-color: #1e2f67;
				border-bottom-color: #1e2f67;
				position: absolute;
			}
		}

		&_Date {
			text-align: right;
			margin-top: 0.25rem;
			color: var(--light-gray);
		}
	}
`;
