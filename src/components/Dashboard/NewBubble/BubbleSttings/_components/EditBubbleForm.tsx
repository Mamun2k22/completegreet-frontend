/* eslint-disable camelcase */
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { ColorPicker, Input } from '@components/common';
import { SelectDropdown } from '@components/common/SelectDropdown';
import { bubbleAPI } from '@libs/api';
import { useNavigationLock } from '@libs/hooks';
import Icon, { save } from '@libs/icons';
import { getUserState } from '@store/actions';
import { handleResetBubbleState, setBubbleItems } from '@store/bubble/bubble.actions';
import { BubbleState, getBubbleState } from '@store/bubble/bubble.slice';
import { getEditButtonState } from '@store/editButton/editButton.slice';
import { setUserPlanId } from '@store/user/user.actions';
import { handleSetCurrentButtonType, setPagePathHandler } from '@store/video/video.actions';
import { Button, Col, Form, InputNumber, Radio, Row, Space, Switch, message } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BorderContentBox, Label, SliderWrapper } from './styles';

export const EditBubbleForm: FC = () => {
	const router = useRouter();
	const [isnavigatioEnables, setIsNavigationEnabled] = useState(true);
	useNavigationLock(isnavigatioEnables);
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const bubbleState = useSelector(getBubbleState);
	const { currentButton } = useSelector(getEditButtonState);
	const { editMode, profile } = useSelector(getUserState);

	const [form] = Form.useForm();

	const generatePayload = (videoUrl: string, mode: string) => {
		// const newConfigs = [...bubbleState.bubble_button_config].map((el) => {
		// 	if (el.type === 'Chat') {
		// 		el.first_message = 'Hey, thanks for visiting! Feel free to ask anything.!!!';
		// 	}
		// 	return el;
		// });
		return {
			bubble_animation: bubbleState.bubble_animation,
			bubble_background_color: bubbleState.bubble_background_color,
			bubble_border_color: bubbleState.bubble_border_color,
			bubble_darken: bubbleState.bubble_darken,
			bubble_delay: bubbleState.bubble_delay,
			bubble_font_family: bubbleState.bubble_font_family,
			bubble_font_size: bubbleState.bubble_font_size,
			bubble_gif: bubbleState.bubble_gif,
			bubble_position: bubbleState.bubble_position,
			bubble_size: bubbleState.bubble_size,
			bubble_style: bubbleState.bubble_style,
			bubble_title: bubbleState.bubble_title,
			bubble_video: mode === 'create' ? videoUrl : bubbleState.bubble_video,
			bubble_video_fit: bubbleState.bubble_video_fit,
			bubble_all_pages: bubbleState.bubble_all_pages,
			bubble_button_config: bubbleState.bubble_button_config,
			bubble_exc_pages: bubbleState.bubble_exc_pages,
			is_show_on_a_specific_page: bubbleState.is_show_on_a_specific_page,
			specific_page_url: bubbleState.specific_page_url,
			is_complete_greet_button: bubbleState.is_complete_greet_button,
			bubble_greet_msg: currentButton.first_message,
			bubble_name: bubbleState.bubble_name || 'Your Bubble',
		};
	};

	const handleSubmitBubble = async (videoUrl: string) => {
		const finalPayload: BubbleState = generatePayload(videoUrl, 'create');

		try {
			const { error, data, message } = await bubbleAPI.createBubble(finalPayload);
			if (!error) {
				messageApi.open({
					type: 'success',
					content: message,
				});

				setIsNavigationEnabled(false);
				setPagePathHandler('videoLibrary');
				handleSetCurrentButtonType({
					buttonConfigPageType: '',
					// currentButtonDetails: activeButtonInfo?.value,
				});
				setLoading(false);
				setBubbleItems(null);
				handleResetBubbleState();
			}
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: error.toString(),
			});
			setLoading(false);
		}
	};

	const updateBubble = async (data?: string) => {
		const finalPayload: BubbleState = generatePayload(null, 'update');
		delete finalPayload.bubble_name;
		if (router.query.code && bubbleState.videoUploadMode === 'change') {
			finalPayload.bubble_video = data;
		}
		try {
			const { error, data, message } = await bubbleAPI.updateBubble({
				...finalPayload,
				id: bubbleState.id,
				bubble_button_config: bubbleState.bubble_button_config,
			});
			if (!error) {
				handleSetCurrentButtonType({
					buttonConfigPageType: '',
				});
				setBubbleItems(null);
				setPagePathHandler('videoLibrary');
				router.push('/dashboard/new-bubble');
				messageApi.success(message);
			} else {
				messageApi.open({
					type: 'error',
					content: message,
				});
				setLoading(false);
			}
		} catch (error) {
			alert(error);
			setLoading(false);
		}
	};

	const handleCreateBubble = () => {
		setLoading(true);
		if (!router.query?.code) {
			uploadBubbleVideo();
		} else if (router.query.code && bubbleState.videoUploadMode === 'change') {
			uploadBubbleVideo();
		} else {
			updateBubble();
		}
	};

	const uploadBubbleVideo = async () => {
		const formData = new FormData();
		formData.append('video', bubbleState.video_file);

		try {
			const { error, data, message } = await bubbleAPI.uploadBubbleVideo(formData);
			if (!error) {
				if (router.query.code && bubbleState.videoUploadMode === 'change') {
					updateBubble(data);
				} else {
					handleSubmitBubble(data);
				}
			} else {
				messageApi.open({
					type: 'error',
					content: message,
				});
				setLoading(false);
			}
		} catch (error) {
			alert(error);
			setLoading(false);
		}
	};

	const getSubInfo = async () => {
		try {
			const { error, data, message } = await bubbleAPI.getSubscriberInfo(profile.id);
			if (!error) {
				setUserPlanId(data?.plan_id);
			} else {
				messageApi.open({
					type: 'error',
					content: String(message),
				});
			}
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: String(error),
			});
		}
	};

	useEffect(() => {
		getSubInfo();
	}, []);

	return (
		<div className="pb-1">
			{contextHolder}
			<h2 className="text-center text- mt-3">Edit Bubble</h2>
			<div className="mt-5">
				<Form form={form} onFinish={handleCreateBubble}>
					<Form.Item name="bubble_title">
						<BorderContentBox content="Text Overlay On Bubble" forForm>
							<Input
								value={bubbleState.bubble_title}
								placeholder="write overlay here"
								onChange={(e) => {
									setBubbleItems({ ...bubbleState, bubble_title: e.target.value });
								}}
							/>
						</BorderContentBox>
					</Form.Item>
					<div className="px-3">
						<Form.Item name="bubble_darken">
							<Switch
								checked={bubbleState.bubble_darken ? true : false}
								onChange={(value) => {
									setBubbleItems({ ...bubbleState, bubble_darken: value ? 1 : 0 });
								}}
							/>
							<Label className="ms-2">Darken for text readability</Label>
						</Form.Item>
						<Form.Item className="bubble_font_size">
							<Row gutter={12} className="align-items-end">
								<Col span={20}>
									<Label>Text overlay Font Size:</Label>
									<SliderWrapper
										min={1}
										max={150}
										value={bubbleState.bubble_font_size}
										onChange={(value: number) => {
											setBubbleItems({ ...bubbleState, bubble_font_size: value });
										}}
										// value={typeof inputValue === 'number' ? inputValue : 0}
										trackStyle={{
											backgroundColor: 'var(--bs-primary)',
										}}
									/>
								</Col>
								<Col span={4}>
									<InputNumber
										min={1}
										max={150}
										value={bubbleState.bubble_font_size}
										onChange={(value: number) => {
											setBubbleItems({ ...bubbleState, bubble_font_size: value });
										}}
										className="w-100"
									/>
								</Col>
							</Row>
						</Form.Item>
					</div>
					<hr />
					<div>
						<Form.Item name="bubble_size" initialValue={bubbleState.bubble_size}>
							<Row gutter={12} className="align-items-end">
								<Col span={20}>
									<Label>Bubble Size:</Label>
									<SliderWrapper
										min={1}
										max={200}
										value={bubbleState.bubble_size - 99}
										onChange={(value: number) => {
											setBubbleItems({ ...bubbleState, bubble_size: value + 99 });
										}}
										trackStyle={{
											backgroundColor: 'var(--bs-primary)',
										}}
									/>
								</Col>
								<Col span={4}>
									<InputNumber
										min={1}
										max={200}
										value={bubbleState.bubble_size - 99}
										onChange={(value: number) => {
											setBubbleItems({ ...bubbleState, bubble_size: value + 99 });
										}}
										className="w-100 "
									/>
								</Col>
							</Row>
						</Form.Item>
						<Form.Item name="bubble_border_color" initialValue={bubbleState.bubble_border_color}>
							<BorderContentBox content="Border Color" forForm>
								<Row gutter={12} className="align-items-center">
									<Col className=" text-start" span={20}>
										<Input
											placeholder="Write a color code - Example (#a51d1d)"
											value={bubbleState.bubble_border_color}
											onChange={(e) =>
												setBubbleItems({
													...bubbleState,
													bubble_border_color: e.target.value,
												})
											}
										/>
									</Col>
									<Col span={4}>
										<ColorPicker
											value={bubbleState.bubble_border_color}
											onChange={(e) => {
												setBubbleItems({ ...bubbleState, bubble_border_color: e.target.value });
											}}
											className="w-100 p-0 border-0 m-0"
										/>
									</Col>
								</Row>
							</BorderContentBox>
						</Form.Item>
					</div>
					<div className="mb-3">
						<Label className="mb-2">Bubble Style:</Label>
						<Form.Item className="bubble_style">
							<Radio.Group
								className="w-100"
								value={bubbleState.bubble_style}
								onChange={(e) => {
									setBubbleItems({ ...bubbleState, bubble_style: e.target.value });
								}}
							>
								<SwitchBox className="mb-2">
									<Radio className="ms-2" value={'Circle'}>
										Round
									</Radio>
									<Image src="/images/round-bubble.png" width={70} height={70} alt="round" />
								</SwitchBox>
								<SwitchBox>
									<Radio className="ms-2" value={'Rectangle'}>
										Rectangular
									</Radio>
									<Image src="/images/rect-bubble.png" width={70} height={70} alt="round" />
								</SwitchBox>
							</Radio.Group>
						</Form.Item>
					</div>
					<div>
						<Label className="mb-2">Bubble Position:</Label>
						<Form.Item className="bubble_position">
							<Radio.Group
								value={bubbleState.bubble_position}
								className="w-100"
								onChange={(e) => {
									setBubbleItems({ ...bubbleState, bubble_position: e.target.value });
								}}
							>
								<SwitchBox className="mb-2">
									<Radio className="ms-2" value={'Right'}>
										Right Bottom
									</Radio>
									<Image src="/images/bubble-pos-1.png" width={70} height={70} alt="round" />
								</SwitchBox>
								<SwitchBox>
									<Radio className="ms-2" value={'Left'}>
										Left Bottom
									</Radio>
									<Image src="/images/bubble-pos-2.png" width={70} height={70} alt="round" />
								</SwitchBox>
							</Radio.Group>
						</Form.Item>
					</div>
					<div>
						<Form.Item name="bubble_animation" initialValue={bubbleState.bubble_animation}>
							<BorderContentBox content="Animation" forForm>
								<SelectDropdown
									defaultValue={bubbleState.bubble_animation}
									onChange={(e: any) => setBubbleItems({ ...bubbleState, bubble_animation: e.type })}
									options={[
										{
											title: 'No Animation',
											type: 'No-animation',
										},
										{
											title: 'Right To Left',
											type: 'Right-to-left',
										},
										{
											title: 'Left To Right',
											type: 'Left-to-right',
										},
										{
											title: 'Top To Bottom',
											type: 'Top-to-bottom',
										},
									]}
								/>
							</BorderContentBox>
						</Form.Item>
					</div>
					<Form.Item name="specific_page">
						<Switch
							checked={bubbleState.is_show_on_a_specific_page}
							onChange={(e) =>
								setBubbleItems({
									...bubbleState,
									is_show_on_a_specific_page: e,
									bubble_all_pages: 0,
									bubble_exc_pages: [],
								})
							}
						/>
						<Label className="ms-2">Only show on a specific page</Label>
					</Form.Item>
					{bubbleState.is_show_on_a_specific_page && (
						<Form.Item name="specific_page_url">
							<BorderContentBox content="Specific Page URL" forForm>
								<Input
									value={bubbleState.specific_page_url}
									onChange={(e) =>
										setBubbleItems({
											...bubbleState,
											specific_page_url: e.target.value,
										})
									}
									placeholder="ex: /home"
								/>
							</BorderContentBox>
						</Form.Item>
					)}
					{!bubbleState.is_show_on_a_specific_page && (
						<>
							<Form.Item name="page_type" valuePropName="checked">
								<div className="mb-2">
									<Label>Show On:</Label>
								</div>

								<Radio.Group value={bubbleState.bubble_all_pages} className="px-2">
									<Space direction="vertical">
										<Radio
											onChange={(e) => {
												setBubbleItems({
													...bubbleState,
													bubble_all_pages: 1,
													bubble_exc_pages: [''],
													specific_page_url: null,
												});
											}}
											value={1}
										>
											All Pages
										</Radio>
										<Radio
											onChange={() =>
												setBubbleItems({
													...bubbleState,
													bubble_exc_pages: [''],
													bubble_all_pages: 2,
													specific_page_url: null,
												})
											}
											value={2}
										>
											All Page except
										</Radio>
									</Space>
								</Radio.Group>
							</Form.Item>
							{bubbleState.bubble_all_pages !== 1 &&
								bubbleState.bubble_exc_pages?.map((item, idx) => (
									<BorderContentBox className="mb-2" key={idx} content={`Url ${idx + 1}`} forForm>
										<div className="d-flex">
											<Input
												value={item}
												onChange={(e) => {
													const newItems = [...bubbleState.bubble_exc_pages];
													newItems[idx] = e.target.value;

													setBubbleItems({
														...bubbleState,
														bubble_exc_pages: newItems,
													});
												}}
											/>
											<>
												{idx === bubbleState.bubble_exc_pages.length - 1 && (
													<PlusCircleFilled
														onClick={() =>
															setBubbleItems({
																...bubbleState,
																bubble_exc_pages: [...bubbleState.bubble_exc_pages, ''],
																specific_page_url: null,
															})
														}
														className="me-2 "
														style={{ fontSize: '1.5rem' }}
													/>
												)}
												{bubbleState.bubble_exc_pages.length > 0 && (
													<MinusCircleFilled
														style={{ fontSize: '1.5rem' }}
														onClick={() => {
															const newItems = [...bubbleState.bubble_exc_pages].filter(
																(_, index) => index !== idx,
															);
															setBubbleItems({
																...bubbleState,
																bubble_exc_pages: newItems,
															});
														}}
													/>
												)}
											</>
										</div>
									</BorderContentBox>
								))}
						</>
					)}
					{profile.plan_id !== 1 && profile.plan_id !== 6 && (
						<Form.Item className="my-2" name="remove_deafult">
							<Switch
								onChange={(e) =>
									setBubbleItems({
										...bubbleState,
										is_complete_greet_button: !e,
									})
								}
								checked={!bubbleState.is_complete_greet_button}
							/>{' '}
							<Label className="ms-2">Remove “Created with Complete Greet”</Label>
						</Form.Item>
					)}
					<div className="my-4">
						<Button
							loading={loading}
							htmlType="submit"
							style={{ fontSize: '1.1rem', padding: '2rem 0' }}
							// variant="dark"
							className=" w-100 text-white bg-dark d-flex align-items-center justify-content-center"
						>
							<Icon path={save} fill="var(--bs-white)" width={24} height={24} className="me-2" />{' '}
							<span>{editMode ? 'Update' : 'Save Now'}</span>
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

const SwitchBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #edf5ff;
	padding: 0.425rem;
	border-radius: 8px;
	width: 100%;
`;
