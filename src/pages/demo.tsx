import { DemoTopHeader, PreviewWebsite } from '@components/DemoItems';
import { NextPage } from 'next';

const Demo: NextPage = () => {
	return (
		<div>
			<DemoTopHeader />
			<PreviewWebsite />
		</div>
	);
};

export default Demo;
