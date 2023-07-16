import { bubbleAPI } from '@libs/api';
import { getUserState } from '@store/actions';
import { Button, Result } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Stripe from 'stripe';
import styled from 'styled-components';

interface PaymentConfirmationPageProps {
	paymentIntent: Stripe.PaymentIntent;
}
const stripe = new Stripe(
	'pk_test_51MhzlcJggWefJ04AqfAiXjZpCC0hd6XGJkkul4p6LRBQlA2QyTOLZeWoezcxDwt56LgUCwVOQkpMVZYWGvty8i7t00BtMNtrzS',
	{
		apiVersion: '2022-11-15',
	},
);

const SuccessPage: NextPage<any> = (props) => {
	const router = useRouter();
	const [status, setStatus] = useState<string>(null);
	const [paymentIntent, setPaymentIntent] = useState<any>(null);

	const { profile } = useSelector(getUserState);

	const postWebHook = async () => {
		try {
			const { error, message } = await bubbleAPI.webHook({
				code: router.query?.pid,
				user_id: profile.id,
				payment_status: props.paymentIntent.status,
				price: router.query?.price,
				duration: router.query?.dur,
			});
			if (error) {
				alert(message);
			}
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		if (props?.paymentIntent && props?.paymentIntent?.status) {
			setStatus(props?.paymentIntent?.status);
			setPaymentIntent(props.paymentIntent);
			postWebHook();
		}
	}, [props]);

	return (
		<Wrapper>
			<div className="bg-white shadow">
				{paymentIntent &&
					(() => {
						switch (status) {
							case 'succeeded':
								return (
									<Result
										status="success"
										title="Payment Successful!"
										subTitle={`Payment amount $${paymentIntent?.amount}! Now you can go to dashboard and see your current active package!`}
										extra={[
											<Button onClick={() => router.push('/')} type="primary" key="console">
												Go To home
											</Button>,
											<Button onClick={() => router.push('/dashboard')} key="buy">
												Go To Dashboard
											</Button>,
										]}
									/>
								);

							case 'processing':
								return (
									<Result
										title="Your payment is processing."
										subTitle="Please wait..."
										extra={
											<Button loading={true} type="primary" key="loading">
												Loading
											</Button>
										}
									/>
								);

							case 'requires_payment_method':
								return (
									<Result
										status="warning"
										title="Payment Failed"
										subTitle="Your payment was not successful, please try again!"
										extra={
											<Button onClick={() => router.push('/pricing')} type="primary" key="error1">
												Buy Again
											</Button>
										}
									/>
								);

							default:
								return (
									<Result
										status="error"
										title="Something Went Wrong!"
										subTitle="Your payment cannot processed!"
										extra={[
											<Button onClick={() => router.push('/')} type="primary" key="error2">
												Go To Home
											</Button>,
											<Button key="buy" onClick={() => router.push('/pricing')}>
												Buy Again
											</Button>,
										]}
									></Result>
								);
						}
					})()}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const getServerSideProps: GetServerSideProps<PaymentConfirmationPageProps> = async (
	context: GetServerSidePropsContext,
) => {
	const info = context.query;

	const paymentIntent = await stripe.paymentIntents.retrieve(info.payment_intent as string, {
		client_secret: info.payment_intent_client_secret as string,
	});

	return {
		props: {
			paymentIntent,
		},
	};
};

export default SuccessPage;
