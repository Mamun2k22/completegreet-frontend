import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { IRegPayload } from '../RegistrationComp';

type PropsType = {
	setRegistrationData: Dispatch<SetStateAction<IRegPayload>>;
	registrationData: IRegPayload;
};
export const FormFields: FC<PropsType> = ({ registrationData, setRegistrationData }) => {
	const [validation, setValidation] = useState({
		length: false,
		number: false,
		uppercase: false,
		lowercase: false,
	});

	const router = useRouter();
	const validatePassword = (_: any, value: string) => {
		if (!value) {
			setValidation({
				length: false,
				number: false,
				uppercase: false,
				lowercase: false,
			});
			return Promise.reject('Please enter your password');
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

	// const handlePassValidMessage = (pass: string) => {
	// 	if (pass.length >= 6 && errors.firstItem) {
	// 		setErros((prevState) => ({ ...prevState, firstItem: false }));
	// 	}
	// 	if (/\d/.test(pass) && errors.secondItem) {
	// 		setErros((prevState) => ({ ...prevState, secondItem: false }));
	// 	}
	// 	if (/[a-z]/.test(pass) && /[A-Z]/.test(pass) && errors.thirdItem) {
	// 		setErros((prevState) => ({ ...prevState, thirdItem: false }));
	// 	} else {
	// 		setErros({ firstItem: true, secondItem: true, thirdItem: true });
	// 	}
	// };

	return (
		<>
			<Form.Item
				initialValue={registrationData?.name}
				label="Name"
				name="name"
				rules={[
					{
						required: true,
						message: 'Please input your name!',
					},
				]}
			>
				<Input onChange={(e) => setRegistrationData((prevState) => ({ ...prevState, name: e.target.value }))} />
			</Form.Item>
			<Form.Item
				initialValue={registrationData?.email || router.query?.userEmail}
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
					onChange={(e) => setRegistrationData((prevState) => ({ ...prevState, email: e.target.value }))}
				/>
			</Form.Item>

			<Form.Item
				initialValue={registrationData?.password}
				label="Password"
				name="password"
				rules={[
					{
						validator: validatePassword,
					},
				]}
			>
				<Input.Password
					onChange={(e) => {
						setRegistrationData((prevState) => ({ ...prevState, password: e.target.value }));
					}}
				/>
			</Form.Item>
			<ul>
				<li className={validation.length ? 'text-success' : 'text-danger'}>6 character minimum</li>
				<li className={validation.number ? 'text-success' : 'text-danger'}>At least one number</li>
				<li className={validation.lowercase && validation.uppercase ? 'text-success' : 'text-danger'}>
					Uppercase and lower case character
				</li>
			</ul>
		</>
	);
};
