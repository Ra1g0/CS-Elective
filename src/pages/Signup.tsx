import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SGSM from "../assets/SGSM.png";
import FacebookIcon from "../assets/facebook-icon.png"; 
import GoogleIcon from "../assets/google-icon.png"; 
import "../App.css";

function Signup() {
  return (
    <div className="font-['TT Firs Text Trial']">
      {/* Header Component */}
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-[#ffffff] py-10">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Left Side - Image and Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg">
              <img
                src={SGSM} // Correct path for SGSM.png
                alt="Strong Gifts Minds"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="w-full lg:w-1/2 bg-[rgba(248,192,202,0.7)] p-10 rounded-lg shadow-lg border-2 border-[#F8C0CA] ml-auto">
            <h2 className="text-2xl font-bold mb-4 text-right">SIGN UP</h2>

            <form>
              {/* Name Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-400 p-2 rounded bg-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-400 p-2 rounded bg-white focus:outline-none"
                />
              </div>

              {/* Home Address Input with Label */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Home Address"
                  className="border border-gray-400 p-2 rounded w-full bg-white focus:outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  House No., Street, City, Province, Zip Code
                </p>
              </div>

              {/* Mobile Number Input */}
              <div className="grid grid-cols-6 gap-4 mt-4">
                <span className="border border-gray-400 p-2 rounded bg-white text-center w-10">+63</span>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="border border-gray-400 p-2 rounded bg-white col-span-5 focus:outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-400 p-2 rounded w-full bg-white focus:outline-none"
                />
              </div>

              {/* Password Inputs */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 p-2 rounded bg-white focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-400 p-2 rounded bg-white focus:outline-none"
                />
              </div>

              {/* Sign Up Button with Terms Notice */}
              <div className="mt-4">
                <button className="bg-[#F393AE] text-white py-2 px-6 rounded text-center">
                  Sign Up
                </button>
                <p className="text-xs text-gray-600 mt-2">
                  By clicking 'Sign Up,' you agree to share your personal
                  information with the seller for the purpose of processing
                  your request. Your information will be handled in accordance
                  with our data privacy policy.
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Social Login */}
              <div className="flex justify-center gap-4">
                <button className="bg-white border border-gray-300 px-6 py-2 rounded shadow flex items-center gap-2 hover:shadow-md transition">
                  <img src={FacebookIcon} alt="Facebook" className="w-5" />
                  Facebook
                </button>
                <button className="bg-white border border-gray-300 px-6 py-2 rounded shadow flex items-center gap-2 hover:shadow-md transition">
                  <img src={GoogleIcon} alt="Google" className="w-5" />
                  Google
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-4 text-center">
                <span>Have an account? </span>
                <a href="/Login" className="text-pink-600 font-semibold">Log In</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default Signup;