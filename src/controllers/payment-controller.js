require("dotenv").config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

let sessionId;
async function createStripeSession(req, res) {
  const booking = req.body;

  console.log("BOOKING AKA ROW", booking);
  const { id, city, stationName, price, date, status } = booking;

  try {
    //TODO: DOUBLE CHECK SESSION OR SESSIONS?
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          // name: stationName,
          price: price,
          // currency: "AUD",
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          userId: req.user && req.user.id,
          bookingId: booking.id,
        },
      },
      mode: "payment",

      //TODO: set success and canceled URLs
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });

    sessionId = session.id;
    stripe.redirectToCheckout({
      sessionId: sessionId,
    });
    // res.redirect(303, session.url);

    // res.json({ url: session.url });
  } catch (err) {
    console.log("THIS IS ERROR FROM STRIPE CHECKOUT", err);
    res.json({ error: "Stripe Error" });
  }
}

const endpointSecret = "Somesecret";

async function webHook(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      //TODO: Handle sucess event such as update booking status, unavailability table etc.

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200);
  res.send();
}

module.exports = {
  createStripeSession,
  webHook,
};
