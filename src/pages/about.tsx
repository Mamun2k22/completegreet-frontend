import { AboutHeader, Vision } from '@components/About';
import { useWindowSize } from '@libs/hooks';
import { NextPage } from 'next';

const AboutUs: NextPage = () => {
	const { width } = useWindowSize();
	return (
		<div style={{ padding: width <= 580 ? '1rem' : '0.425rem' }}>
			<AboutHeader />
			<Vision />
		</div>
	);
};

export default AboutUs;
