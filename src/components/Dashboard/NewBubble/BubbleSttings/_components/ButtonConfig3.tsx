import { CountryPhoneInput, Input } from '@components/common';
import { IDropdownType, SelectDropdown } from '@components/common/SelectDropdown';
import Icon, { arrowCircleDown, arrowCircleUp } from '@libs/icons';
import { handleGlobalBubbleOpen, setBubbleButtonConfigHandler } from '@store/bubble/bubble.actions';
import { IBubbleButtonConfigType, getBubbleState } from '@store/bubble/bubble.slice';
import { getButtonState } from '@store/button/button.slice';
import {
	setCurrentButtonHandler,
	setEditButtonHandler,
	setHideCollapseHandler,
} from '@store/editButton/editButton.action';
import { getEditButtonState } from '@store/editButton/editButton.slice';
import { Form, Input as PreInput, Switch, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { buttonItems } from './constants';
import { BorderContentBox, Label, SliderWrapper } from './styles';

dayjs.extend(customParseFormat);

export const ButtonConfig3: FC = () => {
	const { buttonColors } = useSelector(getButtonState);
	const [disableButton, setDisableButton] = useState(null);

	const {
		globalBubbleConfig: { isOpen },
		bubble_button_config,
		bubble_greet_msg,
	} = useSelector(getBubbleState);

	const { currentButton } = useSelector(getEditButtonState);

	useEffect(() => {
		if (currentButton.type) {
			let disableIndex = null;
			[...bubble_button_config].map((el, idx) => {
				if (el.type === currentButton.type) {
					disableIndex = idx;
					return;
				}
			});
			setDisableButton(disableIndex);
		}
	}, [currentButton, bubble_button_config]);

	const handleBackClick = () => {
		setHideCollapseHandler();
	};

	const handleDropDown = (value: IDropdownType) => {
		if (!isOpen) {
			handleGlobalBubbleOpen(true);
		}
		const newBubble = [...bubble_button_config].filter((el) => el.type !== currentButton.type);
		const newItem = [...buttonItems].find((itm) => itm.type === value.type);
		setBubbleButtonConfigHandler([...newBubble, newItem]);
		setEditButtonHandler(true, newItem);
	};

	const handleItemChange = (field: string | number, value: string) => {
		if (!isOpen) {
			handleGlobalBubbleOpen(true);
		}
		const newCurrentButton = { ...currentButton };
		const newBubbleItem = { ...bubble_button_config.find((el) => el.type === currentButton.type) };
		if (field === 'title') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		} else if (field === 'name_on_live_chat') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		} else if (field === 'first_message') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
			newCurrentButton.bubble_greet_msg = value;
		} else if (field === 'phone_number') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		} else if (field === 'email') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		} else if (field === 'calendly_url') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		} else if (field === 'color') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		} else if (field === 'phone_number') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		} else if (field === 'link_url') {
			newBubbleItem[field] = value;
			newCurrentButton[field] = value;
		}

		setToMainReduxState(newCurrentButton, newBubbleItem);
	};

	const handleOPenForHours = (type: string, time: string) => {
		if (!isOpen) {
			handleGlobalBubbleOpen(true);
		}
		const newCurrentButton = { ...currentButton };
		const newBubbleItem = { ...bubble_button_config.find((el) => el.type === currentButton.type) };

		if (type === 'from') {
			newBubbleItem.open_hours = {
				from: time,
				to: newBubbleItem.open_hours?.to || '',
			};
			newCurrentButton.open_hours = {
				from: time,
				to: newBubbleItem.open_hours?.to || '',
			};
		} else if (type === 'to') {
			newBubbleItem.open_hours = {
				from: newBubbleItem.open_hours?.from || '',
				to: time,
			};
			newCurrentButton.open_hours = {
				from: newBubbleItem.open_hours?.from || '',
				to: time,
			};
		}

		setToMainReduxState(newCurrentButton, newBubbleItem);
	};

	const openNewTabHabdler = (name: string, value: boolean) => {
		if (!isOpen) {
			handleGlobalBubbleOpen(true);
		}
		const newCurrentButton = { ...currentButton };
		const newBubbleItem = { ...bubble_button_config.find((el) => el.type === currentButton.type) };
		newCurrentButton.open_in_new_tab = value;
		newBubbleItem.open_in_new_tab = value;

		setToMainReduxState(newCurrentButton, newBubbleItem);
	};
	const handleFirstMsgDelay = (name: string, value: number) => {
		if (!isOpen) {
			handleGlobalBubbleOpen(true);
		}
		const newCurrentButton = { ...currentButton };
		const newBubbleItem = { ...bubble_button_config.find((el) => el.type === currentButton.type) };
		newCurrentButton.first_message_delay = value;
		newBubbleItem.first_message_delay = value;
		setToMainReduxState(newCurrentButton, newBubbleItem);
	};

	const setToMainReduxState = (newCurrentButton: IBubbleButtonConfigType, newBubbleItem: IBubbleButtonConfigType) => {
		const newItem = [...bubble_button_config].map((item) => {
			if (item.type === newBubbleItem.type) {
				item = newCurrentButton;
			}
			return item;
		});

		setCurrentButtonHandler(newBubbleItem);
		setBubbleButtonConfigHandler(newItem);
	};

	const handleBubblePosition = (position: 'up' | 'down') => {
		const newConfigs = [...bubble_button_config];
		if (position === 'up') {
			[newConfigs[0], newConfigs[1]] = [newConfigs[1], newConfigs[0]];
			setBubbleButtonConfigHandler(newConfigs);
		} else if (position === 'down') {
			[newConfigs[1], newConfigs[0]] = [newConfigs[0], newConfigs[1]];
			setBubbleButtonConfigHandler(newConfigs);
		}
	};

	return (
		<FormWrapper className="py-4">
			<Form>
				<Form.Item name="functionType">
					<BorderContentBox content="Please Choose a Function" forForm>
						<SelectDropdown
							// disabled
							disabledItems={bubble_button_config.map((el) => el.type)}
							hasIcon
							defaultValue={currentButton.type}
							placeHolder="Please Choose a function"
							onChange={(e: IDropdownType) => handleDropDown(e)}
							options={buttonItems}
						/>
					</BorderContentBox>
				</Form.Item>
				{currentButton.type === 'Call' && (
					<Form.Item name="phone_number">
						<BorderContentBox content="Phone Number" forForm>
							<CountryPhoneInput
								value={currentButton.phone_number}
								onChange={(val: string) => handleItemChange('phone_number', val)}
							/>
						</BorderContentBox>
					</Form.Item>
				)}
				{currentButton.type === 'Link' && (
					<>
						<Form.Item name="link_url">
							<BorderContentBox content="Link URL" forForm>
								<PreInput
									value={currentButton.link_url}
									// addonAfter=".com"
									// addonBefore="https://"
									onChange={(e) => handleItemChange('link_url', e.target.value)}
								/>
							</BorderContentBox>
						</Form.Item>
						<Form.Item name="open_in_new_tab">
							<Switch
								checked={currentButton.open_in_new_tab}
								onChange={(value) => openNewTabHabdler('open_in_new_tab', value)}
							/>
							<Label className="ms-2">Open in new tab</Label>
						</Form.Item>
					</>
				)}
				{currentButton.type === 'Chat' && (
					<Form.Item name="name_on_live_chat">
						<BorderContentBox content="Name on live chat" forForm>
							<Input
								value={currentButton.name_on_live_chat}
								placeholder="Enter Name on live chat"
								onChange={(e) => handleItemChange('name_on_live_chat', e.target.value)}
							/>
						</BorderContentBox>
					</Form.Item>
				)}
				{currentButton.type === 'Calendly' && (
					<Form.Item name="calendly_url">
						<BorderContentBox content="Calendly URL" forForm>
							<PreInput
								value={currentButton.calendly_url}
								onChange={(e) => {
									handleItemChange('calendly_url', e.target.value);
								}}
								addonBefore="calendly.com/"
								placeholder="Calendly Url"
							/>
						</BorderContentBox>
					</Form.Item>
				)}
				<Form.Item name="title">
					<BorderContentBox content="Button Title" forForm>
						<Input
							value={currentButton.title}
							placeholder="Button title here"
							onChange={(e) => handleItemChange('title', e.target.value)}
						/>
					</BorderContentBox>
				</Form.Item>
				{currentButton.type === 'Contact' && (
					<Form.Item name="email">
						<BorderContentBox content="Mail Address" forForm>
							<Input
								value={currentButton.email}
								placeholder="Enter your email"
								onChange={(e) => handleItemChange('email', e.target.value)}
							/>
						</BorderContentBox>
					</Form.Item>
				)}
				{currentButton.type === 'Chat' && (
					<>
						<Form.Item name="first_message">
							<BorderContentBox content="First Message" forForm>
								<Input
									// defaultValue={'Hey, thanks for visiting! Feel free to ask anything.!!!'}
									value={currentButton.first_message}
									placeholder="Type First Message"
									onChange={(e) => handleItemChange('first_message', e.target.value)}
								/>
							</BorderContentBox>
						</Form.Item>
						<Form.Item name="first_message_delay">
							<BorderContentBox content="First Message Delay (s)" forForm>
								<SliderWrapper
									value={currentButton.first_message_delay}
									onChange={(e: number) => handleFirstMsgDelay('first_message_delay', e)}
									min={1}
									max={100}
									trackStyle={{
										backgroundColor: 'var(--bs-primary)',
									}}
								/>
							</BorderContentBox>
						</Form.Item>
					</>
				)}
				{(currentButton.type === 'Chat' || currentButton.type === 'Call') && (
					<Form.Item name="open_hours">
						<BorderContentBox content="Open hours" forForm>
							<div className="d-flex align-items-center">
								<TimePicker
									value={
										currentButton?.open_hours?.from && dayjs(currentButton?.open_hours?.from, 'h a')
									}
									format="h a"
									onChange={(val, time) => {
										handleOPenForHours('from', time);
									}}
								/>
								<span className="mx-2">To</span>
								<TimePicker
									value={currentButton?.open_hours?.to && dayjs(currentButton?.open_hours?.to, 'h a')}
									format="h a"
									onChange={(val, time) => handleOPenForHours('to', time)}
								/>
							</div>
						</BorderContentBox>
					</Form.Item>
				)}
				<Form.Item name="color" initialValue={currentButton.color}>
					<BorderContentBox content="Button Color" forForm>
						<Input
							value={currentButton.color}
							placeholder="color"
							onChange={(e) => handleItemChange('color', e.target.value)}
						/>
					</BorderContentBox>
					<div className="my-3 d-flex align-items-center justify-content-between">
						{buttonColors.map((color, idx) => (
							<>
								<ButtonColor
									active={color === currentButton.color}
									onClick={() => {
										if (!isOpen) {
											handleGlobalBubbleOpen(true);
										}
										handleItemChange('color', color);
									}}
									key={idx}
									color={color}
								/>
							</>
						))}
					</div>
				</Form.Item>
				<div className="mb-3 d-flex align-items-center justify-content-between position_buttons">
					<Button
						disabled={disableButton === 0}
						className="w-50 icon_button py-3 me-1 d-flex align-items-center justify-content-center"
						variant="outline-secondary"
						onClick={() => handleBubblePosition('up')}
					>
						<span className="me-2" style={{ fontSize: '16px', fontWeight: 400 }}>
							MOVE UP
						</span>{' '}
						<Icon path={arrowCircleUp} fill="var(--bs-secondary)" />
					</Button>
					<Button
						disabled={disableButton === 1}
						onClick={() => handleBubblePosition('down')}
						className="icon_button w-50 ms-1 py-3 d-flex align-items-center justify-content-center"
						variant="outline-secondary"
					>
						<span className="me-2" style={{ fontSize: '16px', fontWeight: 400 }}>
							MOVE DOWN
						</span>{' '}
						<Icon path={arrowCircleDown} fill="var(--bs-secondary)" />
					</Button>
				</div>
			</Form>
			<Button onClick={handleBackClick} className="w-100 py-3" variant="dark">
				Back
			</Button>
		</FormWrapper>
	);
};

const FormWrapper = styled.div`
	max-height: calc(100vh - 150px);
	overflow: hidden;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		/* box-shadow: inset 0 0 5px #000000; */
		background-color: #f8f8f8;
		border-radius: 10px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #d8d8d8;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #e4e4e4;
	}
	.icon_button {
		&:hover {
			svg {
				fill: var(--bs-white);
			}
		}
	}

	.position_buttons {
		button {
		}
		button {
			&:disabled {
				opacity: 0.4 !important;
				cursor: not-allowed !important;
				pointer-events: none;
			}

			/* other styles */
		}
	}
`;

const ButtonColor = styled.div<{ color: string; active?: boolean }>`
	position: relative;
	width: 40px;
	height: 22px;
	cursor: pointer;
	background-color: ${({ color }) => color};
	border-radius: 4px;
	z-index: 98;
	${({ active }) => {
		switch (active) {
			case true:
				return css`
					&:before {
						position: absolute;
						content: '';
						z-index: 99;
						width: 100%;
						height: 100%;
						left: 0;
						top: 0;
						background-image: url('/images/eye.png');
						background-repeat: no-repeat;
						background-position: center;
					}
				`;

			default:
				return css``;
		}
	}}
`;
