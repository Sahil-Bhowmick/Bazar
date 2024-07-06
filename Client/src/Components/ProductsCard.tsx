import { useNavigate } from "react-router-dom";
import { Product } from "./Interfaces";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bazarSlice";

interface ProductsCardProps {
  product: Product;
}

const ProductsCard: React.FC<ProductsCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = product.title;
  const idString = (_id: string) => {
    return String(_id).toLocaleLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product?._id,
        title: product?.title,
        image: product?.image,
        price: product?.price,
        quantity: 1,
        description: product?.description,
      })
    );
  };

  return (
    <div className="group relative overflow-hidden bg-white rounded-lg shadow-md transition-transform transform hover:shadow-lg">
      <div
        onClick={handleDetails}
        className="w-full h-60 md:h-72 cursor-pointer overflow-hidden rounded-t-lg"
      >
        <img
          className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
          src={product?.image}
          alt="productImage"
        />
      </div>
      <div className="p-4 md:p-6">
        <h2 className="font-semibold text-lg text-gray-900 truncate w-full mb-2">
          {product?.title}
        </h2>
        <div className="flex gap-4 items-center mb-2">
          <div className="text-base md:text-lg text-gray-900 font-semibold">
            ₹{(product?.price * 10).toFixed(2)}
          </div>
          <div className="text-sm md:text-base text-gray-500 line-through">
            ₹{(product?.oldPrice * 10).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-base text-gray-600">{product?.category}</div>
          <button
            onClick={handleAddToCart}
            className="text-sm text-white rounded-full py-2 px-6 md:py-3 md:px-6 flex items-center gap-1 md:gap-2 
             bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
             transition duration-300"
          >
            Add to Cart
          </button>
        </div>

        {product?.isNew && (
          <div className="absolute top-4 right-4 bg-red-600 text-white rounded-full py-1 px-3 text-xs md:text-sm">
            Sale!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
