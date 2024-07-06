import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as any,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define types for request body
interface PaymentRequestBody {
  amount: number;
  token: {
    id: string;
  };
  email: string;
  name: string;
}

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Payment endpoint
app.post(
  "/pay",
  async (req: Request<{}, {}, PaymentRequestBody>, res: Response) => {
    const { amount, token } = req.body;

    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.name,
        source: token.id,
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount.toString()),
        currency: "inr",
        customer: customer.id,
        confirm: true,
        payment_method_types: ["card"],
      });

      res.status(200).send({ success: true, paymentIntent });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, error: (error as Error).message });
    }
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
