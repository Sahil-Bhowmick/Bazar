import { useState } from "react";
import { Link } from "react-router-dom";
import { cartImg, logoDark } from "../Assets/index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CgProfile, CgMenu, CgClose } from "react-icons/cg";

const Header = () => {
  const productData = useSelector(
    (state: RootState) => state.bazar.productData
  );
  const userInfo = useSelector((state: RootState) => state.bazar.userInfo);

  const capitalizeNameTitle = (str: string) => {
    return str
      .split(" ")
      .map((word) => {
        if (word === word.toUpperCase()) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join(" ");
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="w-full bg-white border-b-[1px] border-b-gray-300 font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-20 mx-auto flex items-center  justify-between px-4">
        <div className="md:hidden">
          {showMenu ? (
            <CgClose
              className="w-8 h-8 cursor-pointer text-red-500 hover:text-red-700"
              onClick={closeMenu}
            />
          ) : (
            <CgMenu className="w-8 h-8 cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
        <Link to={"/"} className="flex-shrink-0">
          <img className="w-32" src={logoDark} alt="logoDark" />
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-10 mr-12">
            <Link to={"/"}>
              <li className="text-base font-bold hover:text-orange-600 duration-300">
                Home
              </li>
            </Link>

            <li className="text-base font-bold hover:text-orange-600 duration-300">
              Pages
            </li>

            <li className="text-base font-bold hover:text-orange-600 duration-300">
              Shop
            </li>

            <li className="text-base font-bold hover:text-orange-600 duration-300">
              Element
            </li>

            <Link
              to={"/"}
              className="text-base font-bold hover:text-orange-600 duration-300"
            >
              <li>Blog</li>
            </Link>
          </ul>
          <Link to="/cart" className="relative">
            <img className="w-6" src={cartImg} alt="" />
            <span className="absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold">
              {productData.length}
            </span>
          </Link>
          <Link to="/login" className="flex items-center gap-2">
            {userInfo ? (
              <img
                className="w-8 h-8 rounded-full"
                src={userInfo?.image}
                alt="user"
              />
            ) : (
              <>
                <CgProfile className="w-9 h-9 rounded-full border border-gray-300 transition duration-300 ease-in-out transform hover:scale-110" />
                <span className="text-base font-semibold hidden lg:block md:block">
                  Profile
                </span>
              </>
            )}
          </Link>
          {userInfo && (
            <p className="hidden md:block text-base titleFont font-bold underline underline-offset-2">
              {capitalizeNameTitle(userInfo?.name)}
            </p>
          )}
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden bg-white shadow-md py-2 px-4 border border-gray-200 flex flex-col items-center justify-center">
          <Link
            to={"/"}
            className="block text-base font-ont-bold hover:text-orange-600 duration-300 py-2 border-b border-gray-200"
          >
            Home
          </Link>
          <li className="block text-base font-ont-bold hover:text-orange-600 duration-300 py-2 border-b border-gray-200">
            Pages
          </li>
          <li className="block text-base font-ont-bold hover:text-orange-600 duration-300 py-2 border-b border-gray-200">
            Shop
          </li>
          <li className="block text-base font-ont-bold hover:text-orange-600 duration-300 py-2 border-b border-gray-200">
            Element
          </li>
          <li className="block text-base font-ont-bold hover:text-orange-600 duration-300 py-2 border-b border-gray-200">
            Blog
          </li>
        </div>
      )}
    </div>
  );
};

export default Header;
