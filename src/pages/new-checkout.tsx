import { bubbleAPI } from '@libs/api';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
	'pk_test_51MhzlcJggWefJ04AqfAiXjZpCC0hd6XGJkkul4p6LRBQlA2QyTOLZeWoezcxDwt56LgUCwVOQkpMVZYWGvty8i7t00BtMNtrzS',
);

const NewCheckout = () => {
	const [clientSecret, setClientSecret] = useState('');
	const [error, setError] = useState(null);

	const getCheckInfo = async (payload: any) => {
		try {
			const { data, error, message } = await bubbleAPI.getCheckoutInfo(payload);
			if (!error) {
				setClientSecret(data?.clientSecret);
			} else {
				alert(message);
			}
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		getCheckInfo({
			Plan: {
				code: 'CGYBuildPType',
				duration: 12,
			},
		});
	}, []);

	async function handlePayment() {
		// const stripe = await stripePromise;
		// const elements = stripe.elements({
		// 	appearance: {
		// 		theme: 'stripe',
		// 	},
		// });
		// const paymentElement = elements.create('card', {
		// 	hidePostalCode: true,
		// });
		// // Mount the payment element to the DOM
		// paymentElement.mount('#payment-element');
		// const result = await stripe.confirmPayment({ clientSecret, elements: [PaymentElement],confirmParams: });
		// if (result.error) {
		// 	setError(result.error.message);
		// } else {
		// 	// Payment succeeded
		// }
	}
	return (
		<div>
			<div>
				<div id="payment-element"></div>
				{error && <p>{error}</p>}
				<button onClick={handlePayment}>Pay Now</button>
			</div>
		</div>
	);
};

export default NewCheckout;
