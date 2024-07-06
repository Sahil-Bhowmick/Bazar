import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../redux/bazarSlice";
import { Product } from "./Interfaces";

const SingleProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState<Product | null>(null);
  let [baseQty, setBaseQty] = useState<number>(1);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.item) {
      setDetails(location.state.item);
    }
  }, [location]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Product Image */}
        <div className="w-full lg:w-2/5 relative">
          <img
            className="w-full rounded-sm h-[300px] lg:h-[550px] object-cover"
            src={details.image}
            alt="productImg"
          />
          <div className="absolute top-4 right-4">
            {details.isNew && (
              <p className="absolute top-1 right-1 bg-red-600 text-white rounded-full py-1 px-3 text-xs md:text-sm">
                Sale!
              </p>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          {/* Title and Price */}
          <div>
            <h2 className="text-lg lg:text-3xl font-semibold">
              {details.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xl lg:text-2xl font-medium text-gray-900">
                ₹ {(details.price * 10).toFixed(2)}
              </p>
              <p className="line-through font-base text-gray-500">
                MRP ₹ {(details.oldPrice * 10).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex text-sm">
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>
            <p className="text-xs text-gray-500">(1 Customer review)</p>
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base text-gray-500">
            {details.description}
          </p>
          {/* Category */}
          <p className="text-xs lg:text-sm text-gray-500 mt-2">
            Category:{" "}
            <span className="font-medium capitalize">{details.category}</span>
          </p>

          {/* Quantity Selector and Add to Cart Button */}
          <div className="flex flex-row sm:flex-row items-center gap-2 sm:gap-12">
            {/* Quantity Selector */}
            <div className="w-48 sm:w-1/3 lg:w-52 rounded-sm flex items-center justify-between text-gray-500 gap-4 border p-2">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <button
                  onClick={() => setBaseQty(Math.max(1, baseQty - 1))}
                  className="border rounded-sm h-8 w-8 font-normal text-base flex items-center justify-center hover:bg-gray-700 hover:text-white cursor-pointer duration-300"
                >
                  -
                </button>
                <span>{baseQty}</span>
                <button
                  onClick={() => setBaseQty(baseQty + 1)}
                  className="border rounded-sm h-8 w-8 font-normal text-base flex items-center justify-center hover:bg-gray-700 hover:text-white cursor-pointer duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    _id: details._id,
                    title: details.title,
                    image: details.image,
                    price: details.price,
                    quantity: baseQty,
                    description: details.description,
                  })
                );
                toast.success(`${details.title} is added`);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white py-2 px-4 sm:py-3 sm:px-6 active:bg-gradient-to-r active:from-blue-700 active:to-purple-700 mt-2 sm:mt-0 w-full sm:w-auto m-2 md:mb-0 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 max-w-xs sm:max-w-none"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-left"
        autoClose={2000}
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

export default SingleProduct;
