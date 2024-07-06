import { ToastContainer, toast } from "react-toastify";
import { googleLogo } from "../Assets";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  // const facebookProvider = new FacebookAuthProvider();

  const handleGoogleLogin = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        toast.success("Login successful!");
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed. Please try again.");
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully!");
        dispatch(removeUser());
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-200 py-20 px-4 md:px-0">
      <div className="max-w-lg w-full mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Welcome!</h2>
        <div className="space-y-5">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 py-3 px-4 w-full bg-blue-400 text-white rounded-full sm:rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            <img className="w-8" src={googleLogo} alt="Google Logo" />
            <span>Sign in with Google</span>
          </button>
          {/* <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center gap-2 py-3 px-4 w-full bg-blue-400 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            <img className="w-8" src={facebookLogo} alt="Facebook Logo" />
            <span>Sign in with Facebook</span>
          </button> */}
          <button
            onClick={handleSignOut}
            className="py-3 px-4 w-full bg-red-600 text-white rounded-full sm:rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      </div>
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

export default Login;
