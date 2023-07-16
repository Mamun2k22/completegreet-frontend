import { SendOutlined } from '@ant-design/icons';
import { BorderContentBox } from '@components/Dashboard/NewBubble/BubbleSttings/_components/styles';
import Icon, { arrowLeftLine, close } from '@libs/icons';
import { Button as Btn, Col, Image, Input, Row, Space } from 'antd';
import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const ChatDemo: FC<any> = ({ setButtonType, handleMiniBubbleClick }) => {
	const [insideButton, setInsideButton] = useState<number>(null);

	return (
		<Wrapper>
			<FirstStep insideButton={insideButton}>
				<Row
					style={{ backgroundColor: '#f7f7f7', border: '1px solid #e4e4e4' }}
					justify="center"
					align="middle"
					className="p-2 mb-2"
				>
					<Col span={8}>
						<Button onClick={() => setButtonType('')} className="volume_button border-0">
							<Icon path={arrowLeftLine} fill="#ffffff" width={26} height={26} />
						</Button>
					</Col>
					<Col span={8} className="text-center">
						<h5>EDEEE</h5>
					</Col>
					<Col span={8} className="text-end">
						<Button onClick={handleMiniBubbleClick} className=" border-0 close_buttons">
							<Icon path={close} fill="#ffffff" width={26} height={26} />
						</Button>
					</Col>
				</Row>
				<div className="px-2">
					<BorderContentBox className="mb-3 mt-4" content="Your Name">
						<Input bordered={false} />
					</BorderContentBox>
					<BorderContentBox content="Your Email">
						<Input bordered={false} />
					</BorderContentBox>
				</div>

				<div className="my-3 text-center">
					<Button
						className="text-white px-5"
						onClick={() => {
							setInsideButton(1);
						}}
					>
						Send
					</Button>
				</div>
			</FirstStep>
			<SecondStep insideButton={insideButton}>
				<Row
					style={{ backgroundColor: '#f7f7f7', border: '1px solid #e4e4e4' }}
					justify="center"
					className="p-2 mb-2"
				>
					<Col span={8}>
						<Button onClick={() => setInsideButton(0)} className="volume_button border-0">
							<Icon path={arrowLeftLine} fill="#ffffff" width={26} height={26} />
						</Button>
					</Col>
					<Col span={8} className="text-center">
						<h5>EDEEE</h5>
					</Col>
					<Col span={8} className="text-end">
						<Button onClick={handleMiniBubbleClick} className=" border-0 close_buttons">
							<Icon path={close} fill="#ffffff" width={26} height={26} />
						</Button>
					</Col>
				</Row>
				<ChatWrapper>
					<Senrder>
						<div className="d-flex">
							<Image src="/images/mainicon.png" width={50} height={50} alt="image" />
							<h6 className="message shadow">Is this Service really for free? Thats unbelievable!</h6>
						</div>
					</Senrder>
					<Reciever className="me-3">
						<h6 className="message shadow">you better believe it!</h6>
					</Reciever>
					<Senrder>
						<div className="d-flex">
							<Image src="/images/mainicon.png" width={50} height={50} alt="image" />
							<h6 className="message shadow">Is this Service really for free? Thats unbelievable!</h6>
						</div>
					</Senrder>
					<Reciever className="me-3">
						<h6 className="message shadow">you better believe it!</h6>
					</Reciever>
					<ButtonWrapper className="px-3">
						<Space.Compact style={{ width: '100%' }}>
							<Input className="py-2" placeholder="Send Message ..." />
							<Btn
								type="primary"
								style={{ backgroundColor: 'var(--bs-primary)', height: '40px' }}
								className="d-flex justify-content-center align-items-center px-4"
								icon={<SendOutlined />}
							/>
						</Space.Compact>
					</ButtonWrapper>
				</ChatWrapper>
			</SecondStep>
			<ThirdStep></ThirdStep>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	.volume_button {
		border-radius: 50%;
		width: 45px;
		height: 45px;
		background-color: #00000084;
		padding: 0;
		margin-bottom: 5px;
	}
	.close_buttons {
		cursor: pointer;
		z-index: 991;

		border-radius: 50%;
		width: 45px;
		height: 45px;
		background-color: #00000084;
		padding: 0;
	}
`;
const FirstStep = styled.div<{ insideButton: number }>`
	z-index: 99;
	position: absolute;
	transition: 0.5s;
	top: 0;
	left: ${({ insideButton }) => (insideButton === 1 ? '-300%' : 0)};
	width: 100%;
	/* height: 100%; */
	background: #ffffff;
`;
const SecondStep = styled.div<{ insideButton: number }>`
	display: ${({ insideButton }) => (insideButton === 1 ? 'block' : 'none')};
	z-index: 90;
	position: absolute;
	transition: 0.5s;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
const ChatWrapper = styled.div``;
const ThirdStep = styled.div``;
const Senrder = styled.div`
	/* position: absolute;
	top: 0;
	left: 0;
	width: 100%; */
	.message {
		background-color: var(--bs-primary);
		color: var(--bs-white);
		padding: 0.625rem;
		border-radius: 0.225rem;
		width: 60%;
		text-align: center;
		margin-left: 0.225rem;
	}
`;
const Reciever = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	.message {
		background-color: var(--bs-white);
		color: var(--bs-dark);
		padding: 0.625rem;
		border-radius: 0.225rem;
		width: 84%;
		text-align: center;
		margin-left: 0.225rem;
	}
`;

const ButtonWrapper = styled.div`
	background-color: #f7f7f7;
	padding: 0.825rem 0.425rem;
	border: 1px solid #d0d0d0;
	position: absolute;
	bottom: -550px;
	width: 100%;
	left: 0;
	z-index: 999;
`;
export default ChatDemo;
