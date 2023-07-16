import { FC } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';

export const CountryPhoneInput: FC<any> = ({ value, onChange }) => {
	return (
		<PhoneInputWrapper
			countryCodeEditable={false}
			enableSearch
			country="no"
			value={value}
			onChange={(e: string) => onChange(e)}
		/>
	);
};
const PhoneInputWrapper = styled(PhoneInput)`
	background-color: var(--bs-white);
	position: relative;
	input {
		/* border: none !important; */
		outline: none;
		width: 100% !important;
	}
	.country-list {
		position: absolute;
		text-align: left;
		z-index: 999 !important;
	}
	.flag-dropdown.open {
		z-index: 999;
	}
`;
