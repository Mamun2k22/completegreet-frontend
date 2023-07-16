import Icon, { arrowLeftLine, close } from '@libs/icons';
import { Button, Col, Input, Row } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const { TextArea } = Input;

const ContactForm: FC<any> = ({ handleMiniBubbleClick, setButtonType }) => {
	return (
		<Wrapper>
			<div className="h-100">
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
				<FormWrapper>
					<Input className="bg-white py-3 mb-4" placeholder="Full Name" bordered={false} />
					<Input className="bg-white py-3 mb-4" placeholder="e-Mail" bordered={false} />
					<TextArea rows={8} placeholder="Write your message" maxLength={6} />
					<p className="text-end text-muted mb-4">150 characters remaining</p>
					<Button type="primary" className="w-100" style={{ height: '45px' }}>
						Send
					</Button>
				</FormWrapper>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	z-index: 95;
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

const FormWrapper = styled.div`
	background-color: #edf5ff;
	height: 100%;
	padding: 0.825rem;
	input {
		&::placeholder {
			color: #7b7b7b;
			opacity: 1;
		}
	}
	textarea {
		&::placeholder {
			color: #7b7b7b;
			opacity: 1;
		}
	}
`;

export default ContactForm;
