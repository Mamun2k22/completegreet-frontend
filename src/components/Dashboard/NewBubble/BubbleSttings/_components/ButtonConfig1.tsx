import Icon from '@libs/icons';
import { getUserState } from '@store/actions';
import { setBubbleButtonConfigHandler } from '@store/bubble/bubble.actions';
import { IBubbleButtonConfigType } from '@store/bubble/bubble.slice';
import { handleSetCurrentButtonType } from '@store/video/video.actions';
import { Col, Row } from 'antd';
import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { buttonItems } from './constants';
import { ButtonWrapper } from './styles';

export const ButtonConfig1: FC = () => {
	const { profile } = useSelector(getUserState);
	const [currentButtons, setCurrentButtons] = useState([]);

	const handleButtonClick = (values: IBubbleButtonConfigType) => {
		if (currentButtons.length === 0) {
			setCurrentButtons([values]);
		}
		const isItemExist = [...currentButtons].find((itm) => itm.type === values.type);

		if (isItemExist) {
			const newItem = [...currentButtons].filter((itm) => itm.type !== values.type);

			setCurrentButtons(newItem);
		} else {
			setCurrentButtons([...currentButtons, values]);
		}
	};

	return (
		<>
			<h4 className="text-center">Create A New Button</h4>
			<label className="mt-3" style={{ color: '#7B7B7B' }}>
				Choose a Button ( Maximum {profile.plan_id === 1 || profile.plan_id === 6 ? '1 button' : '2 buttons'} )
			</label>
			<Row gutter={20}>
				{buttonItems.map((el, idx) => {
					return (
						<Col span={24} key={idx}>
							<ButtonWrapper
								disabled={
									(![...currentButtons].find((itm) => itm?.type === el.type) &&
										currentButtons.length >= 2) ||
									((profile.plan_id === 1 || profile.plan_id === 6) &&
										currentButtons.length === 1 &&
										![...currentButtons].find((itm) => itm?.type === el.type))
								}
								color={el.color}
								active={!![...currentButtons].find((itm) => itm?.type == el.type)}
								onClick={() => {
									handleButtonClick(el);
								}}
								className="w-100 my-2 py-3"
							>
								<Icon
									className="me-2"
									path={el.icon}
									fill={
										!![...currentButtons].find((itm) => itm?.type == el.type)
											? 'var(--bs-white)'
											: 'var(--bs-dark)'
									}
								/>
								{el.title}
							</ButtonWrapper>
						</Col>
					);
				})}
			</Row>
			<div className="p-2" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
				<Button
					variant="dark"
					className="w-100 py-3"
					disabled={currentButtons.length < 1}
					onClick={() => {
						setBubbleButtonConfigHandler(currentButtons);
						handleSetCurrentButtonType({
							buttonConfigPageType: 'bubble_config_2',
							// currentButtonDetails: activeButtonInfo?.value,
						});
						// setHandleCurrentButtonFunction(activeButtonInfo);
					}}
				>
					Confirm
				</Button>
			</div>
		</>
	);
};
