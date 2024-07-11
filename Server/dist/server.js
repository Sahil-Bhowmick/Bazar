"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Root endpoint
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Payment endpoint
app.post("/pay", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, token } = req.body;
    try {
        const customer = yield stripe.customers.create({
            email: req.body.email,
            name: req.body.name,
            source: token.id,
        });
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: parseInt(amount.toString()),
            currency: "inr",
            customer: customer.id,
            confirm: true,
            payment_method_types: ["card"],
        });
        res.status(200).send({ success: true, paymentIntent });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
}));
// Start server
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
