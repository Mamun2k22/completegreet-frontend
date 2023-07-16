const stripe = require('stripe')(
	'sk_test_51L4qtiHV1IREXgYtRaawIs9uW7owPup6V9ksT2kEurvNSMKYVFImcxSGGDdvoyKxHMPgNuxSiBObP5NeexsbaFpw008Qxw37Xi',
);

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		try {
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price: 'price_1MnTudHV1IREXgYtRrzTfVh6',
						quantity: 1,
					},
				],
				payment_method_types: ['card'],
				mode: 'payment',
				success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			});
			res.redirect(303, session.url);
		} catch (err: any) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
