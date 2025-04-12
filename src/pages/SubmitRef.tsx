import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import submit from "../assets/SubmitRef.png";

function SubmitRef() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="relative bg-white min-h-screen" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
      <Header />

      <div className="relative flex items-center justify-center py-20">
        {/* Image */}
        <img
          src={submit} // Replace with your image URL
          alt="Submission Successful"
          className="w-400 h-300"
        />

        {/* Buttons */}
        <div className="absolute flex space-x-4 mb-85 gap-18 ">
          <button
            className="bg-pink-300 text-white text-3xl px-16 py-3 rounded-lg shadow-md hover:bg-pink-500 "
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className="bg-pink-300 text-white text-3xl px-10 py-3 rounded-lg shadow-md hover:bg-pink-500"
            onClick={() => navigate("/orders")}
          >
            My Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SubmitRef;