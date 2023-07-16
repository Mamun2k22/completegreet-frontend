import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = (props) => {
	return <InputWrapper {...props} onChange={props.onChange} />;
};
const InputWrapper = styled.input`
	width: 100%;
	padding: 0.225rem;
	border: none;
	outline: none;
`;
