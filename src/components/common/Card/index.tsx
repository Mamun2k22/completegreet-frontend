import { EditFilled } from '@ant-design/icons';
import { bubbleAPI } from '@libs/api';
import { IBubbleType } from '@libs/api/interfaces';
import useDebounce from '@libs/hooks/useDebounce';
import Icon, { code, deleteBin, penEdit } from '@libs/icons';
import { getUserState } from '@store/actions';
import { Col, Input, Popconfirm, Row, Switch, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

type PropsType = {
	editHandler: (data: IBubbleType) => void;
	embedHandler: (el: IBubbleType) => void;
	deleteHandler: (data: IBubbleType) => void;
	data: IBubbleType;
	handleDeactivate: (value: boolean, code: string) => void;
	getBubbleData: () => void;
	checkLoading: any;
	isTextCopied: boolean;
	currentItem: IBubbleType;
};

const Card: FC<PropsType> = ({
	editHandler,
	embedHandler,
	deleteHandler,
	data,
	handleDeactivate,
	getBubbleData,
	checkLoading,
	isTextCopied,
	currentItem,
}) => {
	const { profile } = useSelector(getUserState);
	const [bubbleName, setBubbleName] = useState<string>('');
	const debouncedValue = useDebounce<string>(bubbleName, 500);
	const [isNameEditable, setIsNameEditable] = useState<boolean>(false);

	const updateBubbleName = async () => {
		try {
			const response = await bubbleAPI.updateBubbleName(bubbleName, data.id);
			if (!response.error) {
				getBubbleData();
				setBubbleName('');
				setIsNameEditable(false);
			}
		} catch (error) {
			message.error(error.toString());
		} finally {
			setBubbleName('');
		}
	};

	useEffect(() => {
		if (debouncedValue.length > 0) {
			updateBubbleName();
		}
	}, [debouncedValue]);

	const handleNameEdit = () => {
		setIsNameEditable(true);
	};

	return (
		<Wrapper className="pb-3 mx-auto">
			<div className="imageBox">
				<SwitchWrapper>
					<Switch
						loading={checkLoading.code === data.bubble_code && checkLoading.loading}
						onChange={(value) => handleDeactivate(value, data.bubble_code)}
						checked={data.deactivated === 1 ? false : true}
					/>
					<p className="mb-0">{data.deactivated === 1 ? 'Deactivate' : 'Activate'}</p>
				</SwitchWrapper>
				<video
					className="w-100"
					style={{ objectFit: 'cover', height: '280px' }}
					src={`${process.env.apiUrl}/files/users/${profile.id}/Bubble-Videos/${data.bubble_video}`}
				></video>
			</div>
			<div className="py-2 px-3 d-flex align-items-center justify-content-between">
				{!isNameEditable && <h6 className="my-2">{data.bubble_name}</h6>}
				{isNameEditable && (
					<Input
						onChange={(e) => setBubbleName(e.target.value)}
						onBlur={() => setIsNameEditable(false)}
						className="me-3"
						defaultValue={data.bubble_name}
					/>
				)}
				<EditFilled onClick={handleNameEdit} />
			</div>

			<Row className="justify-content-between  px-3" gutter={12}>
				<Col span={8}>
					<CardButton btnType="edit" onClick={() => editHandler(data)}>
						<Icon path={penEdit} fill="#cd7d3b" width={14} height={14} /> <span>Edit Now</span>
					</CardButton>
				</Col>
				<Col span={8}>
					<div style={{ position: 'relative' }}>
						{/* {isTextCopied && data.bubble_code === currentItem.bubble_code && (
							<Alert
								message="Copied to clipboard"
								type="success"
								showIcon
								style={{
									position: 'absolute',
									zIndex: 99999,
									top: '-50px',
									width: '180px',
									left: '-30px',
								}}
							/>
						)} */}
						<CardButton onClick={() => embedHandler(data)} btnType="embed">
							<Icon path={code} fill="var(--bs-secondary)" width={14} height={14} /> <span>Embed</span>
						</CardButton>
					</div>
				</Col>
				<Col span={8}>
					<Popconfirm
						title="Delete the Bubble"
						description="Are you sure to delete this task?"
						onConfirm={() => deleteHandler(data)}
						okText="Yes"
						cancelText="No"
					>
						<CardButton btnType="remove">
							<Icon path={deleteBin} fill="var(--bs-danger)" width={14} height={14} />
							<span>Remove</span>
						</CardButton>
					</Popconfirm>
				</Col>
			</Row>
		</Wrapper>
	);
};

export default Card;
const Wrapper = styled.div`
	border-radius: 12px;
	overflow: hidden;
	background-color: var(--bs-white);
	width: 100%;
	max-width: 355px;
	overflow: hidden;
	position: relative;
	z-index: 9;
	.imageBox {
	}
`;
const SwitchWrapper = styled.div`
	position: absolute;
	left: 10px;
	top: 10px;
	z-index: 10;
	background: rgba(59, 93, 205, 0.6);
	border-radius: 12px;
	display: flex;
	align-items: center;
	max-width: 130px;
	padding: 0.2rem;
	p {
		padding-right: 1rem;
		color: var(--bs-white);
		margin: 0 0 0 8px;
	}

	.ant-switch-checked {
		background-color: var(--bs-primary) !important;
	}
	/* background-color: var(--bs-white); */
`;

const CardButton = styled.button<{ btnType?: 'edit' | 'embed' | 'remove' }>`
	white-space: nowrap;
	width: 100%;
	border: none;
	outline: none;
	padding: 0.225rem 0.675rem;
	& span {
		font-size: 13px;
	}
	border-radius: 3px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: transparent;
	${({ btnType }) => {
		switch (btnType) {
			case 'edit':
				return css`
					color: #cd7d3b;
					border: 1px solid #cd7d3b;
				`;
			case 'embed':
				return css`
					color: var(--bs-secondary);
					border: 1px solid var(--bs-secondary);
				`;
			case 'remove':
				return css`
					color: var(--bs-danger);
					border: 1px solid var(--bs-danger);
				`;

			default:
				break;
		}
	}}
`;
