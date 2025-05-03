import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SGSM from "../assets/SGSM.png";
import FacebookIcon from "../assets/facebook-icon.png";
import GoogleIcon from "../assets/google-icon.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../App.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

 //DEMO Notification
 const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  alert("sign up successful");
  navigate("/Login"); // Redirect to Login page after form submission
};
  

  return (
    <div className="font-['TT Firs Text Trial']">

      {/* Header Component */}
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-[#ffffff] py-10">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg">
              <img
                src={SGSM}
                alt="Strong Gifts Minds"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 bg-[rgba(248,192,202,0.7)] p-10 rounded-lg shadow-lg border-2 border-[#F8C0CA] ml-auto">
            <h2 className="text-2xl font-bold mb-4 text-left">SIGN UP</h2>

            <form onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name "
                  className="p-3 rounded-md border bg-white w-full focus:outline-black-300 border-gray-300 shadow-sm "
                />
                <input
                  type="text"
                  placeholder="Last Name "
                  className="p-3 rounded-md border bg-white w-full focus:outline-black-300 border-gray-300 shadow-sm "
                />
              </div>

              {/* Address */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Address"
                  className="p-3 rounded-md border w-full bg-white focus:outline-black-300 border-gray-300 shadow-sm "
                />
                <p className="text-[#D43950] text-xs mt-1">
                  House No., Street, City, Province, Zip Code
                </p>
              </div>

              {/* Mobile Number */}
              <div className="grid grid-cols-6 gap-4 mt-4">
                <select
                  className="col-span-1 p-3 rounded-md border bg-white text-sm border-gray-300 shadow-sm "
                  defaultValue="+63"
                >
                  <option value="+63">+63</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="col-span-5 p-3 rounded-md border bg-white focus:outline-black-300 border-gray-300 shadow-sm "
                />
              </div>

              {/* Email */}
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-3 rounded-md border w-full bg-white focus:outline-black-300 border-gray-300 shadow-sm "
                />
              </div>

              {/* Passwords with toggle */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Password */}
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="p-3 rounded-md border bg-white focus:outline-black-300 w-full pr-10 border-gray-300 shadow-sm "
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 border-white  "
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="p-3 rounded-md border bg-white focus:outline-black-300 w-full pr-10 border-gray-300 shadow-sm "
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-pink-400 hover:bg-pink-600 text-white text-sm font-semibold px-6 py-2 rounded transition duration-300"
                >
                  SIGN UP
                </button>

                <p className="text-xs text-gray-600 mt-2">
                  By clicking 'Sign Up,' you agree to share your personal
                  information with the seller. Your information will be handled
                  in accordance with our data privacy policy.
                </p>
              </div>

              {/* OR & Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-600" />
                <span className="mx-4 font-bold text-black-500">OR</span>
                <hr className="flex-grow border-t border-gray-600" />
              </div>

              {/* Social Signups */}
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="bg-white border border-gray-300 px-6 py-2 rounded shadow flex items-center gap-2 hover:shadow-md transition"
                >
                  <img src={FacebookIcon} alt="Facebook" className="w-5" />
                  Facebook
                </button>
                <button
                  type="button"
                  className="bg-white border border-gray-300 px-6 py-2 rounded shadow flex items-center gap-2 hover:shadow-md transition"
                >
                  <img src={GoogleIcon} alt="Google" className="w-5" />
                  Google
                </button>
              </div>

              {/* Login Redirect */}
              <div className="mt-4 font-semibold text-center">
                <span>Have an account? </span>
                <a href="/Login" className="text-pink-600 font-semibold">
                  Log In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
