import { BorderContentBox } from '@components/Dashboard/NewBubble/BubbleSttings/_components/styles';
import { openNotification } from '@components/common';
import { authAPI } from '@libs/api/auth';
import { Button, Form, Input } from 'antd';
import { RuleObject } from 'antd/es/form';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

export const RestPasswordComp: FC = () => {
	const [form] = Form.useForm();
	const router = useRouter();
	const [isLoading, setisLoading] = useState(false);
	const [validation, setValidation] = useState({
		length: false,
		number: false,
		uppercase: false,
		lowercase: false,
	});

	const validatePassword = (_: any, value: string) => {
		if (!value) {
			setValidation({
				length: false,
				number: false,
				uppercase: false,
				lowercase: false,
			});
			return Promise.reject('please enter new password');
		}
		const newValidation = {
			length: value.length >= 6,
			number: /\d/.test(value),
			uppercase: /[A-Z]/.test(value),
			lowercase: /[a-z]/.test(value),
		};
		setValidation(newValidation);

		if (value.length < 6) {
			return Promise.reject('Password should be at least 6 characters');
		}

		if (!/\d/.test(value)) {
			return Promise.reject('Password should contain at least one number');
		}

		if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
			return Promise.reject('Password should contain both uppercase and lowercase letters');
		}

		return Promise.resolve();
	};

	const handleSubmit = async (values: any) => {
		const { new_password, confirm_password } = values;
		setisLoading(true);
		try {
			const { error, message } = await authAPI.resetPassword(
				new_password,
				confirm_password,
				String(router.query?.token),
			);
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

	const validateConfirmPassword = async (_: RuleObject, value: string) => {
		const newPassword = form.getFieldValue('new_password');

		if (value && value !== newPassword) {
			throw new Error('Passwords do not match');
		}
	};

	return (
		<Form form={form} autoComplete="off" onFinish={handleSubmit}>
			<Form.Item name="new_password" className="mt-4" rules={[{ validator: validatePassword }]}>
				<BorderContentBox content="New Password" borderColor="#000000" contentBg="#e2e9ff">
					<Input bordered={false} className="bg-transparent" />
				</BorderContentBox>
			</Form.Item>
			<Form.Item
				name="confirm_password"
				className="mt-5 mb-4"
				rules={[
					{ validator: validateConfirmPassword },
					{ required: true, message: 'confirm password required' },
				]}
			>
				<BorderContentBox content="Confirm Password" borderColor="#000000" contentBg="#e2e9ff">
					<Input bordered={false} className="bg-transparent" />
				</BorderContentBox>
			</Form.Item>
			<ul>
				<li className={validation.length ? 'text-success' : 'text-danger'}>6 character minimum</li>
				<li className={validation.number ? 'text-success' : 'text-danger'}>At least one number</li>
				<li className={validation.lowercase && validation.uppercase ? 'text-success' : 'text-danger'}>
					Uppercase and lower case character
				</li>
			</ul>

			<div className="text-center">
				<Button
					style={{ height: '40px' }}
					type="primary"
					className="bg-primary text-white "
					htmlType="submit"
					loading={isLoading}
				>
					Submit
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
	);
};
