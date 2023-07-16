import { authAPI } from '@libs/api/auth';
import { IAuthPayload } from '@libs/api/interfaces';
import { setAuthUser } from '@store/user/user.actions';
import { Button, Form, Input, message, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

export const LoginComp: FC = () => {
	const [loginForm] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [loginData, setLoginData] = useState<IAuthPayload>({
		email: '',
		password: '',
	});
	const router = useRouter();

	const onFinish = (values: IAuthPayload) => {
		handleLogin(values);
	};
	const handleLogin = async (payload: IAuthPayload) => {
		setLoading(true);
		try {
			const { error, data, message } = await authAPI.login(payload);
			if (!error) {
				setAuthUser(data);

				router.push(router.query?.redirect ? String(router.query.redirect) : '/dashboard');
			} else {
				messageApi.error(message);
				// setErrors((prevState) => ({ ...prevState, mobileNumber: String(message) }));
			}
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: error.toString(),
				style: {
					marginTop: '15vh',
				},
			});
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (error: any) => {
		console.log(error);
	};

	return (
		<div>
			{contextHolder}

			<Spin spinning={loading}>
				<Form
					form={loginForm}
					layout="vertical"
					autoComplete="off"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						initialValue={loginData?.email}
						label="Email"
						name="email"
						rules={[
							{
								type: 'email',
								message: 'Please enter a valid email!',
							},
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input
							onChange={(e) => setLoginData((prevState) => ({ ...prevState, email: e.target.value }))}
						/>
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password
							onChange={(e) => setLoginData((prevState) => ({ ...prevState, password: e.target.value }))}
						/>
					</Form.Item>
					<h6 className="m-0 text-end">
						<Link href="/forgot-password">forgot password</Link>
					</h6>
					<div className="text-center">
						<Button loading={loading} htmlType="submit" type="primary" className="text-white">
							Login
						</Button>
					</div>
				</Form>
			</Spin>
			<h6
				onClick={() => router.push('/register')}
				className="text-dark text-center mt-3"
				style={{ cursor: 'pointer' }}
			>
				Dont have an account?
			</h6>
		</div>
	);
};
