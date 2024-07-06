import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "../Components/CartItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const productData = useSelector(
    (state: RootState) => state.bazar.productData
  );
  const userInfo = useSelector((state: RootState) => state.bazar.userInfo);
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price += item.price * 10 * item.quantity;
    });
    setTotalAmt(parseFloat(price.toFixed(2)));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  const payment = async (token: any) => {
    try {
      const response = await axios.post("http://localhost:8000/pay", {
        amount: Math.round(totalAmt * 100),
        token: token,
        name: userInfo?.name,
        email: userInfo?.email,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Payment Successful");
      } else {
        throw new Error(`Payment failed with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Payment Error:", error.message);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Unknown error";
        toast.error(`Payment failed: ${errorMessage}`);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <img
        className="w-full h-60 object-cover hidden lg:block md:block"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      <div className="max-w-screen-xl mx-auto py-5 px-2 lg:py-20 md:py-20 flex flex-col lg:flex-row">
        <div className="lg:w-2/3">
          <CartItem />
        </div>
        <div className="lg:w-1/3 md:w-5/6 md:mx-auto lg:ml-8 rounded-sm bg-gray-200 py-4 px-4 mt-6 lg:mt-0">
          <div className="flex flex-col gap-2 lg:gap-6 md:gap-4 pb-6">
            <h2 className="text-xl lg:text-2xl font-medium">Order Summary</h2>
            {productData.map((item) => (
              <div key={item._id} className="flex justify-between">
                <p className="text-base">
                  {item.title} (Qty: {item.quantity})
                </p>
                <p className="text-base font-semibold">
                  ₹{(item.price * 10 * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <hr className="border-t border-gray-300" />
            <div className="flex justify-between">
              <p className="text-lg font-medium">Subtotal:</p>
              <p className="text-lg font-medium">₹{totalAmt}</p>
            </div>
            <p className=" flex items-start gap-4 text-lg font-medium">
              Shipping:{" "}
              <span className="text-base font-normal">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                consectetur.
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg lg:text-2xl font-medium">Total:</h2>
            <p className="text-lg lg:text-2xl font-medium">₹{totalAmt}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="text-base bg-black rounded-full lg:rounded-sm text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
          >
            Proceed to Checkout
          </button>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <StripeCheckout
                stripeKey="pk_test_51P5q8uSItlT8eoqW0PolzcXCRsijH83hPdPl9slJPUI4ork861TNSOqNMxXrD6s8ZGG6ZQik4pBuMm7khqxJMTIx00bRNhDMi9"
                name="Bazaar Online Shopping"
                amount={totalAmt * 100}
                label="Pay Now"
                description={`Your Payment amount is ₹${totalAmt}`}
                token={payment}
                email={userInfo.email}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
