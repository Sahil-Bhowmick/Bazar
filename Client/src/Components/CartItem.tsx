import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/bazarSlice";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector(
    (state: RootState) => state.bazar.productData
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-2 lg:px-12 xl:px-16">
      <div className="mt-8">
        <h2 className="font-bold text-2xl">Shopping Cart</h2>
      </div>
      <div className="mt-6">
        {productData.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-2 lg:flex lg:flex-row lg:gap-5 md:flex md:flex-row md:gap-4 sm:flex-row items-center gap-4 sm:gap-6 py-4 border-b sm:border-b-0"
          >
            <div className="flex items-center justify-center sm:justify-start gap-4 sm:w-1/5">
              <MdOutlineClose
                onClick={() => {
                  dispatch(deleteItem(item._id));
                  toast.error(`${item.title} is removed`);
                }}
                className="text-2xl lg:text-3xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
              />
              <img
                className="w-20 h-20 object-cover rounded-sm"
                src={item.image}
                alt="productImg"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:w-2/5">
              <h2 className="text-base sm:text-lg sm:w-48 md:w-52 lg:w-50">
                {item.title}
              </h2>
              <div className="flex gap-1 lg:gap-3 items-center mt-2 mx-2 sm:mt-0">
                <p className="text-base mr-2">Price:</p>
                <p className="text-base font-semibold">
                  ₹{(item.price * 10).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:w-1/5">
              <div className="flex gap-0 items-center">
                <p className="text-base mr-2">Quantity:</p>
                <div className="flex items-center gap-2">
                  <span
                    onClick={() =>
                      dispatch(
                        decrementQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                          description: item.description,
                        })
                      )
                    }
                    className="border rounded-sm h-6 w-6 flex items-center justify-center text-base text-gray-700 hover:bg-gray-300 cursor-pointer duration-300"
                  >
                    -
                  </span>
                  <span className="text-base font-semibold">
                    {item.quantity}
                  </span>
                  <span
                    onClick={() =>
                      dispatch(
                        incrementQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                          description: item.description,
                        })
                      )
                    }
                    className="border rounded-sm h-6 w-6 flex items-center justify-center text-sm text-gray-700 hover:bg-gray-300 cursor-pointer duration-300"
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center sm:w-1/5">
              <p className="text-base font-semibold">Total:</p>
              <p className="text-base ml-2">
                ₹{(item.quantity * (item.price * 10)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
        <button
          onClick={() => {
            dispatch(resetCart());
            toast.error("Your Cart is Empty!");
          }}
          className="bg-red-500 rounded-md text-white py-2 px-6 hover:bg-red-800 duration-300 sm:mr-4"
        >
          Reset Cart
        </button>
        <Link to="/" className="mt-4 sm:mt-0">
          <button className="flex items-center gap-1 text-gray-700 hover:text-black duration-300">
            <span>
              <HiOutlineArrowLeft />
            </span>
            Go to Shopping
          </button>
        </Link>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartItem;
