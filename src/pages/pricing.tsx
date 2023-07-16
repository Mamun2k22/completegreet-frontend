import { PricingWrapper } from '@components/templates';
import { bubbleAPI } from '@libs/api';
import type { NextPage } from 'next';
const Pricing: NextPage<any> = (props) => {
	return (
		<div>
			<PricingWrapper data={props.data} />
		</div>
	);
};

export async function getServerSideProps() {
	try {
		const response = await bubbleAPI.getAllPackages();

		if (!response.error) {
			console.log(response.data);

			return {
				props: response,
			};
		} else {
			return {
				props: response,
			};
		}
	} catch (error) {
		return {
			props: {},
		};
	}
}

export default Pricing;
