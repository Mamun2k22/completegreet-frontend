import { FrequentlyAsked, Packages, TopHeader } from '@components/PricingItems';
import { FC } from 'react';

export const PricingWrapper: FC<any> = ({ data }) => {
	return (
		<div>
			<TopHeader />
			<Packages data={data} />
			<FrequentlyAsked />
		</div>
	);
};
