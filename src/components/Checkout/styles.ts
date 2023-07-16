import styled from 'styled-components';

export const CheckoutFormContainer = styled.form`
	max-width: 400px;
	margin: 0 auto;
`;

export const Label = styled.label`
	display: block;
	margin-bottom: 10px;
`;

export const CardElementContainer = styled.div`
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
	margin-bottom: 20px;
`;

export const Button = styled.button`
	display: block;
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #0070f3;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0054a4;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const Error = styled.div`
	color: #f00;
	margin-top: 10px;
`;

export const Success = styled.div`
	color: #008000;
	margin-top: 10px;
`;
