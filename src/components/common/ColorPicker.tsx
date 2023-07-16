import { FC } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';

// interface ColorPickerProps extends HTMLProps<HTMLInputElement> {}

export const ColorPicker: FC<FormControlProps> = (props) => {
	return <Form.Control {...props} type="color" id="colorPicker" />;
};
