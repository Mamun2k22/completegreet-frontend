import { FooterSection, NavigationBar } from '@components/common';
import { FC } from 'react';

export const MainLayout: FC<any> = ({ children }) => {
	return (
		<div>
			<NavigationBar />
			{children}
			<FooterSection />
		</div>
	);
};
