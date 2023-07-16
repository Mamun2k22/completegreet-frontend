import { openNotification } from '@components/common';
import { BorderContentBox } from '@components/Dashboard/NewBubble/BubbleSttings/_components/styles';
import { authAPI } from '@libs/api/auth';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const ForgotPassComp = () => {
	const [form] = Form.useForm();
	const router = useRouter();
	const [isLoading, setisLoading] = useState(false);

	const handleSubmit = async (values: any) => {
		setisLoading(true);
		try {
			const { error, message } = await authAPI.forgotPassword(values.email);
			if (!error) {
				openNotification('topRight', 'success', String(message));
				router.push('/login');
			} else {
				form.resetFields();
				openNotification('topRight', 'error', String(message));
			}
		} catch (error) {
			openNotification('topRight', 'error', String(error));
		} finally {
			setisLoading(false);
		}
	};
	return (
		<div>
			<Form form={form} autoComplete="off" onFinish={handleSubmit}>
				<Form.Item
					name="email"
					className="mt-4"
					rules={[
						{
							type: 'email',
							message: 'Invalid email',
						},
						{ required: true, message: 'Email is required' },
					]}
				>
					<BorderContentBox content="Email" borderColor="#000000" contentBg="#e2e9ff">
						<Input bordered={false} className="bg-transparent" />
					</BorderContentBox>
				</Form.Item>
				<h6 className="text-end">
					<Link href="/login">Try another account?</Link>
				</h6>
				<div className="text-center">
					<Button
						style={{ height: '40px' }}
						type="primary"
						className="bg-primary text-white "
						htmlType="submit"
						loading={isLoading}
					>
						Send Email
					</Button>
				</div>
				{/* <Form.Item
					// initialValue={registrationData?.email}
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
					// onChange={(e) => setRegistrationData((prevState) => ({ ...prevState, email: e.target.value }))}
					/>
				</Form.Item> */}
			</Form>
		</div>
	);
};
