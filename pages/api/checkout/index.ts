import Stripe from 'stripe'

async function CheckoutSessions(req, res) {
  const { items } = req.body;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27"
  })

  const params: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: "http://localhost:3000/cart",
    cancel_url: "http://localhost:3000/cart",
  }

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

  res.status(200).send(session);
}

export default CheckoutSessions;