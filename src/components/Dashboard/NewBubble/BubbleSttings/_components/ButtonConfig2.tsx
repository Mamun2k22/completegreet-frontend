import { useClickOutside } from '@libs/hooks';
import Icon, { addCircle, deleteBin, penEdit } from '@libs/icons';
import { getUserState } from '@store/actions';
import { setBubbleButtonConfigHandler } from '@store/bubble/bubble.actions';
import { IBubbleButtonConfigType, getBubbleState } from '@store/bubble/bubble.slice';
import { setEditButtonHandler } from '@store/editButton/editButton.action';
import { Popconfirm } from 'antd';
import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { EditBubbleForm } from './EditBubbleForm';
import { buttonItems } from './constants';
import { BorderContentBox, ButtonWrapper, IconButton } from './styles';

export const ButtonConfig2: FC = () => {
	const { bubble_button_config } = useSelector(getBubbleState);
	const { profile } = useSelector(getUserState);
	const [isButtonMenuOpen, setIsButtonMenuOpen] = useState(false);

	const { wrapperRef } = useClickOutside(() => setIsButtonMenuOpen(false));

	const handleEditClick = (item: IBubbleButtonConfigType) => {
		setEditButtonHandler(true, item);
	};

	const handleDeleteButton = (item: IBubbleButtonConfigType) => {
		const newBubble = [...bubble_button_config].filter((el) => el.type !== item.type);

		setBubbleButtonConfigHandler(newBubble);
	};
	const handleAddNewButton = () => {
		setIsButtonMenuOpen(!isButtonMenuOpen);
	};

	const filteredItems =
		bubble_button_config.length === 0
			? buttonItems
			: buttonItems.filter((item) =>
					bubble_button_config.some((bubble) => {
						if (bubble.type !== item.type) {
							return item;
						}
					}),
			  );

	return (
		<Wrapper>
			{bubble_button_config.map((item, idx) => {
				return (
					<BorderContentBox className="mb-3" key={idx} content={`Button ${idx + 1}`}>
						<ButtonWrapper
							color={item.color}
							active
							style={{ fontSize: '12px' }}
							className="w-100 my-2 py-2"
						>
							<Icon className="me-2" path={item?.icon} fill={'var(--bs-white)'} />
							{item?.title}
						</ButtonWrapper>
						<div className="mt-2 d-flex justify-content-between">
							<IconButton onClick={() => handleEditClick(item)}>
								<Icon path={penEdit} width={14} fill="var(--bs-dark)" />{' '}
								<span className="ms-2">Edit Now</span>
							</IconButton>
							<Popconfirm
								title="Delete the Video"
								description="Are you sure to delete this Video?"
								okText="Yes"
								cancelText="No"
								onConfirm={() => handleDeleteButton(item)}
							>
								<IconButton>
									<Icon path={deleteBin} width={14} fill="var(--bs-danger)" />{' '}
									<span className="ms-2 text-danger">Remove</span>
								</IconButton>
							</Popconfirm>
						</div>
					</BorderContentBox>
				);
			})}

			{bubble_button_config.length < 2 && (
				<div className="my-4">
					<Button
						disabled={(profile.plan_id === 1 || profile.plan_id === 6) && bubble_button_config.length === 1}
						ref={wrapperRef}
						style={{ position: 'relative' }}
						onClick={handleAddNewButton}
						variant="dark"
						className="w-100 py-2 d-flex align-items-center justify-content-center"
					>
						<Icon path={addCircle} fill="var(--bs-white)" width={36} height={36} className="me-2" />{' '}
						<span>Add A New Button</span>
					</Button>
					<PickerWrapper isButtonMenuOpen={isButtonMenuOpen}>
						<div className="p-2">
							<div className="mb-1">
								<small className="text-muted">Choose a button</small>
							</div>
							{filteredItems.map((el) => (
								<div key={el.type}>
									<ButtonPicker
										onClick={() => {
											setBubbleButtonConfigHandler([...bubble_button_config, el]);
											setIsButtonMenuOpen(false);
										}}
										className="mb-2 border  shadow shadow-sm px-3 w-100 py-2"
									>
										<Icon path={el.icon} /> {el.title}
									</ButtonPicker>
								</div>
							))}
						</div>
					</PickerWrapper>
				</div>
			)}
			<EditBubbleForm />
		</Wrapper>
	);
};

const Wrapper = styled.div``;
const PickerWrapper = styled.div<{ isButtonMenuOpen: boolean }>`
	position: absolute;
	transition: 0.3s;
	z-index: 99;
	background-color: var(--bs-white);
	width: 100%;
	height: ${({ isButtonMenuOpen }) => (isButtonMenuOpen ? '290px' : 0)};
	overflow: hidden;
`;

const ButtonPicker = styled.div`
	cursor: pointer;
	transition: 0.2s;
	svg {
		fill: var(--bs-dark);
	}
	&:hover {
		background-color: var(--bs-primary);
		color: var(--bs-white);
		svg {
			fill: var(--bs-white);
		}
	}
`;
