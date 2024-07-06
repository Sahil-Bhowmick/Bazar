import { logoLight, paymentLogo } from "../Assets";
import { ImGithub } from "react-icons/im";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import { BsPaypal, BsPersonFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black text-white py-8 px-4 md:px-8 lg:px-12 xl:px-16 font-titleFont">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Logo and Social Icons */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img className="w-32 md:w-40" src={logoLight} alt="Logo" />
          <div className="flex gap-5 text-xl md:text-2xl">
            <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
            <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
            <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
          </div>
          <p className="text-xs text-center md:text-sm">
            © {currentYear} Sahil Bhowmick. All Rights Reserved.
          </p>
          <img
            className="w-48 mt-4 md:w-56"
            src={paymentLogo}
            alt="Payment Methods"
          />
        </div>

        {/* Location */}
        <div className="text-center md:text-left">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Locate Us</h2>
          <div className="text-sm md:text-base flex flex-col gap-1">
            <p>Arambagh, Hooghly</p>
            <p>Pincode: 712613</p>
            <p>Mobile: +91 8670120798</p>
            <p>E-Mail: bazar@gmail.com</p>
          </div>
        </div>

        {/* Customer Service */}
        <div className="md:text-left">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Customer Service
          </h2>
          <div className="text-sm md:text-base flex flex-col gap-1">
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <BsPersonFill />
              </span>{" "}
              My Account
            </p>
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <BsPaypal />
              </span>{" "}
              Checkout
            </p>
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <FaHome />
              </span>{" "}
              Order Tracking
            </p>
            <p className="flex items-center gap-2 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <MdLocationOn />
              </span>{" "}
              Help & Support
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="text-center md:text-left">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Newsletter</h2>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <input
              className="bg-transparent border border-white rounded-sm px-3 py-2 text-sm md:w-40"
              placeholder="Your email"
              type="email"
            />
            <button className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
