import { useClickOutside } from '@libs/hooks';
import Icon, { arrowDown } from '@libs/icons';
import { FC, MouseEvent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface SelectDropdownProps {
	options?: IDropdownType[];
	hasIcon?: boolean;
	onChange?: any;
	placeHolder?: string;
	defaultValue?: string;
	className?: string;
	disabled?: boolean;
	disabledItems?: string[];
}

export interface IDropdownType {
	type?: string;
	title?: string;
	icon?: string;
	color?: string;
	action?: string;
	value?: string;
}

export const SelectDropdown: FC<SelectDropdownProps> = (props) => {
	const { options, onChange, placeHolder, defaultValue, className, disabled, disabledItems, ...rest } = props;

	const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
	const { wrapperRef } = useClickOutside(() => setIsOptionOpen(false));
	const [selectedValue, setSelectedValue] = useState<IDropdownType>();
	const handleSelectClick = (e: MouseEvent) => {
		e.stopPropagation();
		if (!disabled) {
			setIsOptionOpen(true);
		}
	};

	const handleOptionClick = (e: MouseEvent, value: IDropdownType) => {
		e.stopPropagation();
		setSelectedValue(value);
		setIsOptionOpen(false);
		onChange(value);
	};

	useEffect(() => {
		if (defaultValue) {
			const defaultItem = [...options].find((option) => option.type === defaultValue);
			setSelectedValue(defaultItem);
		}
	}, [defaultValue, options]);

	return (
		<SelectWrapper
			defaultValue={defaultValue}
			className={className}
			{...rest}
			onClick={handleSelectClick}
			ref={wrapperRef}
		>
			{selectedValue?.title ? (
				<div className="d-flex ms-2">
					{selectedValue?.icon && (
						<span>
							<Icon width={18} height={18} path={selectedValue?.icon} fill="var(--bs-dark)" />
						</span>
					)}
					<span className="ms-2">{selectedValue?.title}</span>
				</div>
			) : (
				<span className="m-0 text-start text-muted">{placeHolder || 'please select an option'}</span>
			)}

			<span>
				<Icon path={arrowDown} />
			</span>
			{isOptionOpen && (
				<OptionWrapper>
					{options.map((option, idx) => {
						const isDisabledItem = disabledItems?.includes(option.type);
						return (
							<Option
								disabled={isDisabledItem}
								active={selectedValue?.type === option.type}
								onClick={(e: MouseEvent) => {
									if (!isDisabledItem) {
										handleOptionClick(e, option);
									}
								}}
								key={idx}
							>
								{option.icon && (
									<Icon
										width={18}
										height={18}
										path={option?.icon}
										fill={selectedValue?.type === option.type && 'var(--bs-white)'}
									/>
								)}
								<p className="m-0 text-start ps-2" style={{ flexGrow: 1 }}>
									{option.title}
								</p>
							</Option>
						);
					})}
				</OptionWrapper>
			)}
		</SelectWrapper>
	);
};

const SelectWrapper = styled.div`
	padding: 0.225rem 0;
	cursor: pointer;
	position: relative;
	width: 100%;
	display: flex;
	justify-content: space-between;
	border: none;
	outline: none;
	transition: 0.2s;
`;

const OptionWrapper = styled.div`
	position: absolute;

	z-index: 999;
	/* border: 1px solid var(--bs-gray); */
	background-color: var(--bs-white);
	border-radius: 3px;
	box-shadow: 0px 0px 2px 0px var(--bs-gray);
	top: 130%;
	left: 0;
	width: 100%;
`;
const Option = styled.div<{ active: boolean; disabled: boolean }>`
	display: flex;
	justify-content: flex-start;
	padding: 0.425rem 0.825rem;
	margin: 2px 0;
	${({ disabled }) => {
		switch (disabled) {
			case true:
				return css`
					background-color: #bebebe !important;
					color: #818181 !important;
					svg {
						fill: #818181 !important;
					}
				`;

			default:
				return css`
					/* background-color: var(--bs-white);
					color: var(--bs-dark); */
				`;
		}
	}}
	${({ active }) => {
		switch (active) {
			case true:
				return css`
					background-color: var(--bs-primary);
					color: var(--bs-white);
				`;

			default:
				return css`
					background-color: var(--bs-white);
					color: var(--bs-dark);
				`;
		}
	}}
	&:hover {
		background-color: var(--bs-primary);
		color: var(--bs-white);
		svg {
			fill: var(--bs-white);
		}
	}
`;
