require("dotenv").config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

let sessionId;
async function createCheckoutSession(req, res) {
  const booking = req.body;

  console.log("BOOKING AKA ROW", booking);
  const { stationName, price } = booking;

  stripe.customers.create({
    email: req.user.email,
  })
    .then(customer => console.log(customer.id))
    .catch(error => console.error(error));

  try {
    //TODO: DOUBLE CHECK SESSION OR SESSIONS?
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: stationName,
            },
            unit_amount: price
          }
          ,
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          userId: req.user.id,
          bookingId: booking.id,
        },
      },
      mode: "payment",

      //TODO: set success and canceled URLs
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000`,
    });

    sessionId = session.id;
    res.json({url: session.url, sessionId})

  } catch (err) {
    console.log("THIS IS ERROR FROM STRIPE CHECKOUT", err);
    res.json({ error: "Stripe Error" });
  }
}

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookSecret = "whsec_024a4088719c941ebb0e7c5a90b6739c0b2dc22fbb19f7b4409d12c83830309b"
// const endpointSecret = testEndpointSecret || process.env.STRIPE_WEBHOOK_SECRET;

async function webHook(req, res) {

  console.log("THIS IS WEBHOOK REQ", req)

  console.log("WEBHOOK FUNCTION TRIGGER");

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log("THIS IS STRIPE EVENT", event)
  } catch (err) {
    console.log("ERROR FROM WEBHOOK", err)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("EVENT PASSED", event)
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      //TODO: Handle sucess event such as update booking status, unavailability table etc.
      console.log("THIS IS PAYMENT INTENT WHEN SUCCESS", paymentIntent)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({received: true});
    // res.send();
}

module.exports = {
  createCheckoutSession,
  webHook,
};