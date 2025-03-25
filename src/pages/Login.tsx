import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SGSM from "../assets/SGSM.png";
import FacebookIcon from "../assets/facebook-icon.png"; 
import GoogleIcon from "../assets/google-icon.png"; 
import "../App.css";

function Login() {
  return (
    <div className="font-['TT Firs Text Trial']">
      {/* Header Component */}
      <Header />

      {/* Background color, border, container */}
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff] py-10">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">

          {/* Left Side - Image and Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg">
              <img
                src={SGSM} // Corrected image reference
                alt="Strong Gifts Minds"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Right Side - Log In Form */}
          <div className="w-full lg:w-1/2 bg-[rgba(248,192,202,0.7)] p-10 rounded-lg shadow-lg border-2 border-[#F8C0CA]">
            <h2 className="text-2xl font-bold mb-4">LOG IN</h2>

            <form>
              {/* Email Input */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Address / Phone Number"
                  className="border border-gray-400 p-3 rounded w-full bg-white focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4 relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 p-3 rounded w-full bg-white focus:outline-none"
                />
                <span className="absolute right-3 top-3 cursor-pointer">
                  👁️ {/* Add JavaScript functionality for toggling password visibility */}
                </span>
              </div>

              {/* Login Button and Forgot Password - Inline */}
              <div className="flex justify-between items-center mb-4">
                <button className="bg-pink-400 text-white px-6 py-2 rounded text-sm hover:bg-pink-500 transition">
                  LOG IN
                </button>
                <div className="text-pink-600 text-sm cursor-pointer hover:underline">
                  Forgot Password?
                </div>
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

              {/* Sign Up Link */}
              <div className="mt-4 text-center">
                <span>Don’t have an account? </span>
                <a href="/Signup" className="text-pink-600 font-semibold">Sign Up</a>
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

export default Login;