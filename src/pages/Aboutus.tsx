import React from 'react';
import Header from "../Components/Header"; 
import Footer from "../Components/Footer";
import "../App.css";
import aboutbg from "../assets/aboutbg.png"; 
import Values from "../assets/Values.png";
import aboubg from "../assets/bg.jpeg";
import brief from "../assets/Brief.png";
import wave from "../assets/wave.png";

function Aboutus() {
  return (
    <div className="aboutus-container flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow overflow-auto">
        {/* Hero Section */}
        <section
          className="background h-screen flex items-center justify-center relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${aboubg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-4 bg-opacity-70 flex flex-col items-center text-center">
            <h2 className="text-7xl font-bold text-pink-300 drop-shadow-lg">
              About Us
            </h2>
          </div>
        </section>

        {/* Brief History Section */}
        <section
          className="background flex items-center justify-center p-10"
          style={{
            backgroundImage: `url(${aboutbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <img src={brief} alt="Brief History" className="w-full h-auto " />
        </section>

        {/* Mission and Vision Section */}
      <section
          className="background flex items-center justify-center p-10"
          style={{
          backgroundColor: "white", // Changed background to white
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
  }}
>
  <img src={Values} alt="Values" className="w-full h-auto " />
 
</section>
<img src={wave} alt="wave" className="w-600 h-auto " />

      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;