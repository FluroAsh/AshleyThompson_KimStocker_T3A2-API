const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Kd2QfIEKRj3Hs5NlCMJmh7aCzOmZ669ix2OMSg48NCClRWYanbxhIkaRcBUdqDBakbyb1L9LPkvVATzNXi5Gonq008dqzCAZ5');

let sessionId;
async function createStripeSession(req, res) {
  const booking = req.body;

  const { id, city, stationName, price, date, status } = booking;

  try {
    //TODO: DOUBLE CHECK SESSION OR SESSIONS?
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: req.user && req.user.id,
      line_items: [
        {
          name: stationName,
          city: city,
          bookingDate: date,
          amount: price,
          currency: "AUD",
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
    res.json({ url: session.url });
  } catch (err) {
    console.log("THIS IS ERROR FROM STRIPE CHECKOUT", err);
    res.json({ error: "Stripe Error" });
  }
  // res.redirect(303, session.url);
}

async function webHook() {}

//   def webhook

//     #Ensure only Stripe webhook
//     begin
//       payload = request.raw_post
//       header = request.headers["HTTP_STRIPE_SIGNATURE"]
//       secret = Rails.application.credentials.dig(:stripe, :webhook_signing_secret)
//       event = Stripe::Webhook.construct_event(payload, header, secret)
//     rescue Stripe::SignatureVerificationError => e
//       render json: { error: "Unauthorised" }, status: 403
//       return
//     rescue JSON::PasserError => e
//       render json: { error: "Bad request" }, status: 422
//       return
//     end

//     payment_intent_id = event.data.object.payment_intent
//     # payment_intent_id = params[:data][:object][:payment_intent]
//     payment = Stripe::PaymentIntent.retrieve(payment_intent_id)
//     pp payment
//     order_id = payment.metadata.order_id
//     receipt_url = payment.charges.data[0].receipt_url
//     #update order, listing and item statuses.
//     order = Order.find(order_id)
//     order.update(order_status: 2)
//     items = order.items
//     order_total = 0
//     items.each do |item|
//       item.update(sold: true)
//       listing = Listing.find_by(id: item.listing_id)
//       listing.update(listing_status: 3)
//       #Delete all other line items that have the same listing_id. Those items would have been created by other users around same time the item/listing was purchased
//       Item.where(listing_id: listing.id, sold: false).destroy_all
//       order_total += item.price
//     end
//     order.update(total: order_total)

//     amount_total = payment.charges.data[0].amount_captured
//     payment_line = Payment.create(order_id: order.id, payment_id: payment_intent_id, receipt_url: receipt_url)
//     payment_line.update(amount_total: amount_total)
//   end
module.exports = {
  createStripeSession,
};
