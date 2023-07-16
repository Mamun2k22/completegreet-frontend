/* eslint-disable camelcase */
import { Input } from '@components/common';
import { IDropdownType, SelectDropdown } from '@components/common/SelectDropdown';
import { Form } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { IRegPayload } from '../RegistrationComp';
type PropsType = {
	setRegistrationData: Dispatch<SetStateAction<IRegPayload>>;
	registrationData: IRegPayload;
};
export const BusinessInfo: FC<PropsType> = ({ registrationData, setRegistrationData }) => {
	return (
		<>
			<Form.Item
				label="Business Name"
				name="business_name"
				initialValue={registrationData.business_name}
				rules={[
					{
						required: true,
						message: 'Business Name is required',
					},
				]}
			>
				<Input
					onChange={(e) =>
						setRegistrationData((prevState) => ({ ...prevState, business_name: e.target.value }))
					}
				/>
			</Form.Item>

			<Form.Item
				label="Industry"
				name="industry"
				initialValue={registrationData.industry}
				rules={[
					{
						required: true,
						message: 'Industry is required!',
					},
				]}
			>
				<Input
					onChange={(e) => setRegistrationData((prevState) => ({ ...prevState, industry: e.target.value }))}
				/>
			</Form.Item>

			<Form.Item
				initialValue={registrationData.website_url}
				label="Website URL"
				name="website_url"
				rules={[
					{
						required: true,
						message: 'Website URL is required!',
					},
				]}
			>
				<Input
					onChange={(e) =>
						setRegistrationData((prevState) => ({ ...prevState, website_url: e.target.value }))
					}
				/>
			</Form.Item>
			<Form.Item initialValue={registrationData.goals} name="goals" label="Goals For Using CompleteGreet">
				<SelectDropdown
					defaultValue={registrationData.goals}
					onChange={(e: IDropdownType) =>
						setRegistrationData((prevState) => ({ ...prevState, goals: e.value }))
					}
					className="bg-white px-2"
					options={[
						{
							value: 'Welcome to your website visitor',
							title: 'Welcome to your website visitor',
							type: 'Welcome to your website visitor',
						},
						{
							value: 'Personalize client communication',
							title: 'Personalize client communication',
							type: 'Personalize client communication',
						},
						{
							value: 'Personal lead generation',
							title: 'Personal lead generation',
							type: 'Personal lead generation',
						},
						{
							value: 'Customer Support',
							title: 'Customer Support',
							type: 'Customer Support',
						},
						{
							value: 'Reduce churn',
							title: 'Reduce churn',
							type: 'Reduce churn',
						},
					]}
				/>
			</Form.Item>
		</>
	);
};
