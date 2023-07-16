import styled, { css } from 'styled-components';

export const SidebarWraaper = styled.div<{ isToggle: boolean; width: number; isSidebarOpen: boolean }>`
	position: ${({ width }) => (width <= 768 ? 'absolute' : 'relative')};
	z-index: 999;
	left: ${({ isSidebarOpen }) => (isSidebarOpen ? '0px' : '-200px')};
	/* display: ${({ width }) => (width <= 768 ? 'none' : 'block')}; */
	background-color: var(--bs-secondary);
	height: 100vh;
	color: var(--bs-white);
	transition: 0.3s;
	${({ isToggle }) => {
		switch (isToggle) {
			case true:
				return css`
					width: 80px;
				`;

			default:
				return css`
					width: 270px;
				`;
		}
	}}/* padding: 1rem; */
`;

export const SidebarHeader = styled.div`
	/* min-height: 80px; */
`;

export const IconButton = styled.button`
	border: none;
	outline: none;
`;

export const SidebarFooter = styled.div`
	padding: 1rem;
	background-color: var(--bs-secondary);
	/* border: 1px solid; */
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
`;

export const SidebarBody = styled.div`
	height: calc(100% - 130px);
	margin: auto 0;
	display: flex;
	align-items: center;
`;

export const SideItems = styled.div`
	width: 100%;
	max-height: 100%;
	justify-content: center;
	padding: 1rem 0;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 0.25rem;
	}
	/* Track */
	&::-webkit-scrollbar-track {
		background: var(--bs-light);
	}
	/* Handle */
	&::-webkit-scrollbar-thumb {
		border-radius: 0.5rem;
		background: #4d11ff;
	}
	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
		background: var(--bs-primary);
	}
	/* border: 1px solid; */
`;
export const Item = styled.button<{ active?: boolean }>`
	background: transparent;
	border: none;
	outline: none;
	color: var(--bs-white);
	transition: 0.3s;
	position: relative;
	width: 100%;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 0.425rem;
	& svg {
		min-width: 40px;
		max-width: 40px;
	}
	& span {
		text-align: left;
		min-width: 100px;
		max-width: 150px;
		transition: 0.3s;
		font-size: 1rem;
		font-weight: 500;
		margin: 0 0 0 0.675rem;
		white-space: nowrap;
	}

	${({ active }) => {
		switch (active) {
			case true:
				return css`
					&:before {
						transition: 0.3s;
						content: '';
						position: absolute;
						height: 100%;
						width: 100%;
						left: 0;
						top: 0;
						background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
						opacity: 0.3;
					}
				`;

			default:
				return css`
					&:hover {
						transition: 0.3s;
						&:before {
							content: '';
							position: absolute;
							height: 100%;
							width: 100%;
							left: 0;
							top: 0;
							background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
							opacity: 0.3;
						}
					}
				`;
		}
	}}
`;
