import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SGSM from "../assets/SGSM.png";
import FacebookIcon from "../assets/facebook-icon.png";
import GoogleIcon from "../assets/google-icon.png";
import "../App.css";

// Login component
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Dummy credentials for admin and user
  const adminEmail = "admin@gmail.com";
  const adminPassword = "password123";

  // Dummy user credentials
  const dummyUser = {
    email: "test@example.com",
    password: "123456",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the email and password match the dummy admin credentials
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      alert("Logged in as admin!");
      navigate("/admin");
      return;
    }

    // Check if the email and password match the dummy user credentials
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email: email }));
      alert("Logged in as user!");
      navigate("/profile");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <div className="font-['TT Firs Text Trial']">
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff] py-10">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">

          {/* Left side image */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg">
              <img src={SGSM} alt="Strong Gifts Minds" className="rounded-lg" />
            </div>
          </div>

          {/* Login Form */}
          <div className="w-full lg:w-1/2 bg-[rgba(248,192,202,0.7)] p-10 rounded-lg shadow-lg border-2 border-[#F8C0CA]">
            <h2 className="text-2xl font-bold mb-4">LOG IN</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleLogin}>
              {/* Email input */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-3 rounded-md border w-full bg-white focus:outline-black-300 border-gray-300 shadow-sm "
                />
              </div>

              {/* Password input with toggle */}
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="p-3 rounded-md border w-full bg-white pr-10 focus:outline-black-300 border-gray-300 shadow-sm "
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <button
                  type="submit"
                  className="bg-pink-400 text-white px-6 py-2 font-semibold rounded text-sm hover:bg-pink-500 transition border-gray-300 shadow-sm "
                >
                  LOG IN
                </button>
                <div className="text-[#D43950] text-sm font-semibold cursor-pointer hover:underline">
                  Forgot Password?
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-600" />
                <span className="mx-4 font-bold text-black-500">OR</span>
                <hr className="flex-grow border-t border-gray-600" />
              </div>

              {/* Social Media Login Buttons */}
              <div className="flex justify-center gap-4">
                <button className="bg-white border border-gray-300 px-6 py-2 rounded shadow flex items-center gap-2 hover:shadow-md transition">
                  <img src={FacebookIcon} alt="Facebook" className="w-5" /> Facebook
                </button>
                <button className="bg-white border border-gray-300 px-6 py-2 rounded shadow flex items-center gap-2 hover:shadow-md transition">
                  <img src={GoogleIcon} alt="Google" className="w-5" /> Google
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-4 font-semibold text-center">
                <span>Don’t have an account? </span>
                <a href="/Signup" className="text-pink-600 font-semibold">
                  Sign Up
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

export default Login;
