import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']
  const hook = process.env.STRIPE_WEBHOOK_SECRET as string

  if(!sig){
    return res.status(400).send("Missing the Stripe signature")
  }

  let event: Stripe.Event

  try{
    event = stripe.webhooks.constructEvent(buf, sig, hook!);
  }catch(err){
    return res.status(400).send("webhook error" + err);
  }

  switch (event.type) {

    case "charge.succeeded":
    
    const charge: any = event.data.object as Stripe.Charge;
    
    if (typeof charge.payment_intent === "string") {
      await prisma?.order.update({
        where: { paymentIntentId: charge.payment_intent },
        data: { status: "complete", address: charge.shipping?.address},
      });
    }
    break;
    default:
      console.log("Unhandled event type:" + event.type);
    }
    
    res.json({ received: true });
  }
