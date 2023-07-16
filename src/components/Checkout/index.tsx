import { bubbleAPI } from '@libs/api';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styled from 'styled-components';

const CheckoutForm: FC<any> = ({ currentPackage }) => {
	const router = useRouter();
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);

	const handleError = (error: any) => {
		setLoading(false);
		setErrorMessage(error.message);
	};
	const handleSubmit = async (event: any) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setLoading(true);
		// const paymentElementNew = elements.getElement(PaymentElement);
		// Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError) {
			alert('here');
			handleError(submitError);
			setLoading(false);
			return;
		}

		try {
			const { data, error, message } = await bubbleAPI.getCheckoutInfo({
				Plan: {
					code: router.query?.pid,
					duration: router.query?.dur,
				},
			});
			if (!error) {
				const { error } = await stripe.confirmPayment({
					clientSecret: data?.clientSecret,
					elements,
					confirmParams: {
						return_url: `${process.env.publicURL}/confirm-payment/${router.query?.pid}?dur=${router.query?.dur}&price=${currentPackage?.Plan?.price}`,
					},
				});

				if (error) {
					// This point is only reached if there's an immediate error when
					// confirming the payment. Show the error to your customer (for example, payment details incomplete)
					handleError(error);
				} else {
					// Your customer is redirected to your `return_url`. For some payment
					// methods like iDEAL, your customer is redirected to an intermediate
					// site first to authorize the payment, then redirected to the `return_url`.
				}
			} else {
				alert(message);
			}
		} catch (error) {
			alert(error);
		}

		// Confirm the PaymentIntent using the details collected by the Payment Element
	};

	return (
		<Wrapper
			style={{ height: '100vh', overflow: 'auto' }}
			className="my-auto text-center d-flex justify-content-center align-items-center  border"
		>
			{currentPackage && (
				<div style={{ width: '500px', margin: 'auto' }} className="bg-white p-3 pt-5">
					<div className="bg-white p-3 logo_container">
						<h5>Complete greet</h5>
						<h6>
							Subscription Plan: <span style={{ fontWeight: 600 }}>{currentPackage?.Plan?.pname}</span>
						</h6>
						<h6>
							Price:{' '}
							<span style={{ fontWeight: 600 }}>
								{currentPackage?.Plan?.price * parseInt(router.query?.dur.toString())}$
							</span>
						</h6>
						<h6>
							Duration: <span style={{ fontWeight: 600 }}>{currentPackage?.Plan?.duration} month</span>
						</h6>
					</div>
					<form onSubmit={handleSubmit}>
						<div>
							<PaymentElement options={{ layout: 'auto' }} />
						</div>

						<Button loading={loading} htmlType="submit" type="primary" className="mt-3" disabled={!stripe}>
							Submit
						</Button>
					</form>
				</div>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.p-PaymentMethodSelector,
	.p-Tab {
		display: none !important;
	}
	.logo_container {
		position: relative;
		z-index: 1;
		&:before {
			content: '';
			position: absolute;
			background: url('/images/mainicon.png');
			background-size: cover;
			background-repeat: no-repeat;
			top: -100px;
			left: 50%;
			transform: translateX(-50%);
			width: 100px;
			height: 100px;
			z-index: 999;
		}
	}
`;

export default CheckoutForm;
