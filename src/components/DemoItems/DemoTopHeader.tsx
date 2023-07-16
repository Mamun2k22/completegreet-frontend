import { useWindowSize } from '@libs/hooks';
import { FC } from 'react';

export const DemoTopHeader: FC = () => {
	const { width } = useWindowSize();
	return (
		<div className="px-2 pt-4 pb-2">
			<h1
				className="text-center"
				style={{ color: '#CD7D3B', fontWeight: 700, fontSize: width <= 580 ? '1.1rem' : '1.8rem' }}
			>
				WHAT DOES A VIDEO BUBBLE LOOK LIKE ON YOUR SITE?
			</h1>
			<h1
				className="text-center"
				style={{
					fontSize: width <= 580 ? '1.5rem' : '2.5rem',
					fontWeight: 800,
					color: '#3B5DCD',
					wordSpacing: '10px',
				}}
			>
				WE&apos;LL GIVE YOU AN EXCLUSIVE PREVIEW RIGHT NOW!
			</h1>
		</div>
	);
};
