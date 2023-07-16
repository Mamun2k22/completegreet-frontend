/* eslint-disable camelcase */
import { authAPI } from '@libs/api/auth';
import { Button, Form, message, Spin, Steps, theme } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BusinessInfo, FormFields } from './_regComps';

export interface IRegPayload {
	email: string;
	password: string;
	name: string;
	business_name?: string;
	website_url?: string;
	industry?: string;
	goals?: string;
}

const layout = {
	labelCol: {
		span: 24,
	},
	wrapperCol: {
		span: 24,
	},
};

export const RegistrationComp: FC = () => {
	const { token } = theme.useToken();
	const router = useRouter();
	const [messageApi, contextHolder] = message.useMessage();
	const [regForm] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [current, setCurrent] = useState<number>(0);
	const [registrationData, setRegistrationData] = useState<IRegPayload>({
		email: '',
		name: '',
		password: '',
		business_name: '',
		goals: '',
		industry: '',
		website_url: '',
	});
	const [stepsArr, setStepsArr] = useState([0]);
	const contentStyle: React.CSSProperties = {
		padding: 16,
		color: token.colorTextTertiary,
		backgroundColor: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: `1px dashed ${token.colorBorder}`,
		marginTop: 16,
	};

	const onFinishRegFields = async (values: any) => {
		if (current === 0) {
			setLoading(true);
			handleValidation(values);
			setStepsArr((prevState) => [...prevState, 1]);
		} else if (current === 1) {
			setStepsArr((prevState) => [...prevState, 2]);
			setCurrent(current + 1);
		} else if (current === 2) {
			setLoading(true);
			setStepsArr([]);
			handleCompleteRegistration();
		}
	};

	const handleValidation = async (values: any) => {
		try {
			const { message, error } = await authAPI.userValidationCheck({ email: values.email });
			if (!error) {
				setRegistrationData((prevState) => ({ ...prevState, ...values }));
				setCurrent(current + 1);

				regForm.resetFields();
			} else {
				messageApi.error(message);
			}
		} catch (error) {
			messageApi.error(error.toString());
		} finally {
			setLoading(false);
			setStepsArr([0, 1, 2]);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const steps = [
		{
			title: 'Basic Information',
			content: (
				<Spin spinning={loading}>
					<FormFields registrationData={registrationData} setRegistrationData={setRegistrationData} />
				</Spin>
			),
		},
		{
			title: 'Property Details',
			content: (
				<Spin spinning={loading}>
					<BusinessInfo registrationData={registrationData} setRegistrationData={setRegistrationData} />
				</Spin>
			),
		},
		{
			title: 'Install Widget',
			content: (
				<Spin spinning={loading}>
					<p className="text-dark">
						When you create your first bubble, you will then be able to embed the script before the head tag
						section. This will allow the bubble to appear on all pages.
						<div>
							<small>Below is just an example of the script. It is just a sample.</small>
						</div>
						<div className="bg-white my-2 p-3 rounded">
							{`<script>window.CompleteGreet_ID="eb382bcb-d521-5ee9-9477-3177d5b4778c";(function (s, a, l, u, t, e) {t = a.createElement(l),e = a.getElementsByTagName(l)[0];t.async = 1;t.src = u;e.parentNode.insertBefore(t, e)})(window, document, 'script', 'https://completegreet.com/js/CompleteGreetInstallation.js');</script>`}
						</div>
					</p>
				</Spin>
			),
		},
	];

	const items = steps.map((item, idx) => ({
		key: item.title,
		title: item.title,
		disabled: loading ? loading : !stepsArr.includes(idx),
	}));

	const handleCompleteRegistration = async () => {
		try {
			const { error, message } = await authAPI.register(registrationData);
			if (!error) {
				messageApi.open({
					type: 'success',
					content: message,
				});
				router.push('/login');
			} else {
				messageApi.open({
					type: 'error',
					content: message,
				});
			}
		} catch (error) {
			messageApi.error(error?.toString());
		} finally {
			setLoading(false);
			setStepsArr([0, 1, 2]);
		}
	};

	const handleStepChange = (value: number) => {
		setCurrent(value);
	};

	return (
		<Wrapper>
			{contextHolder}
			<Form
				{...layout}
				form={regForm}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinishRegFields}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				autoCorrect="off"
			>
				<div>
					<Steps className="w-100" onChange={handleStepChange} current={current} items={items} />
				</div>
				<div style={contentStyle}>{steps[current].content}</div>

				{current < steps.length - 1 && (
					<div className="text-center">
						<Button loading={loading} className="m-2" type="primary" htmlType="submit">
							Next
						</Button>
					</div>
				)}
				{current === steps.length - 1 && (
					<div className="text-center">
						<Button loading={loading} type="primary" htmlType="submit">
							Register
						</Button>
					</div>
				)}
				{/* {current > 0 && (
					<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
						Previous
					</Button>
				)} */}
			</Form>

			<h6
				onClick={() => router.push('/login')}
				className="text-dark text-center mt-3"
				style={{ cursor: 'pointer' }}
			>
				Already have an account?
			</h6>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.ant-steps-item {
		/* margin-bottom: 0.425rem;
		margin-right: min(-2.7vw, -27px);
		padding-inline-start: 0 !important;
		text-align: left; */
		/* background: transparent linear-gradient(102deg, #3b5dcd 0%, #1e2f67 100%); */
		/* border-radius: 10rem; */
		/* color: var(--bs-white); */
		.ant-steps-item-icon {
			/* background-color: var(--bs-white); */
			/* margin: 0.425rem; */
			.ant-steps-icon {
				/* color: #000000 !important; */
				font-weight: 800;
			}
		}
		.ant-steps-item-disabled {
			.ant-steps-item-content {
				.ant-steps-item-title {
					/* color: #b8b8b8 !important; */
				}
			}
		}

		/* .ant-steps-item-container {
			display: flex;
			align-items: center;
		} */
	}
`;
