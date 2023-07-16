import CheckoutForm from '@components/Checkout';
import { bubbleAPI } from '@libs/api';
import { withAuth } from '@libs/hoc';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const stripePromise = loadStripe(
	'pk_test_51MhzlcJggWefJ04AqfAiXjZpCC0hd6XGJkkul4p6LRBQlA2QyTOLZeWoezcxDwt56LgUCwVOQkpMVZYWGvty8i7t00BtMNtrzS',
);

// strip.cre
const CheckoutFormWrapper = () => {
	const router = useRouter();
	const [currentPackage, setCurrentPackage] = useState<any>();

	const getCurrentPackage = async () => {
		try {
			const { data, error, message } = await bubbleAPI.getSinglePackage(
				String(router.query?.pid),
				String(router.query?.dur),
			);
			if (!error) {
				setCurrentPackage(data);
			} else {
				alert(message);
			}
		} catch (error) {
			alert(error);
		}
	};
	useEffect(() => {
		if (router.query?.pid && router.query?.dur) {
			getCurrentPackage();
		}
	}, [router]);

	return (
		<Wrapper>
			{router.query?.pid && currentPackage?.Plan && (
				<Elements
					stripe={stripePromise}
					options={{
						appearance: { theme: 'flat' },
						mode: 'payment',
						amount: currentPackage?.Plan?.price * 100 * 12,
						currency: 'usd',
						paymentMethodTypes: ['card'],
						captureMethod: 'automatic',
					}}
				>
					<CheckoutForm currentPackage={currentPackage} />
				</Elements>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div``;

export default withAuth(CheckoutFormWrapper);
