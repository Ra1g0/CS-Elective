Home
import Header from "../Components/Header"; 
import Footer from "../Components/Footer";
import "../App.css"; 
import WelcomeImage from '../assets/Welcome.png';
import CartImage from '../assets/Cart.png'; 
import pillowbox from '../assets/pillowbox.png'; 
import ArrowImage from '../assets/arrow.png'; 
import VdbgImage from '../assets/vdbg.png'; 
import HeartImage from '../assets/Heart.png'; 
import onda1 from '../assets/ondaspot1.png';
import onda2 from '../assets/ondaspot2.png';
import onda3 from '../assets/ondaspot3.png';
import { Link } from 'react-router-dom';
import Chatbot from '../pages/chatbot';

function Home() {

  const items = [
    { title: "Available Now!", name: "Pillow Box", description: "Soft and comfy pillow box for your needs." },
    { title: "Limited Offer!", name: "Gift Box", description: "Beautifully designed gift box for special occasions." },
    { title: "New Arrival!", name: "Storage Box", description: "Spacious and stylish storage solution." },
    { title: "Hot Deal!", name: "Jewelry Box", description: "Elegant and secure jewelry storage." },
    { title: "Best Seller!", name: "Shoe Box", description: "Keep your shoes organized and dust-free." },
    { title: "Exclusive!", name: "Keepsake Box", description: "A special place for your precious memories." }
  ];

  return (
    <div className="home-container flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow overflow-auto">
        <section className="background h-screen flex items-center justify-center relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(255, 255, 255, 1) 100%), url(${WelcomeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-4 bg-opacity-70 flex flex-col items-center text-center drop-shadow-sm" style={{ WebkitTextStroke: '0.5px black' }}>
            {/* Welcome Heading */}
            <h2 className=" text-5xl font-Garet font-bold text-pink-400 stroke-black drop-shadow-lg">
              Hi! Welcome to
            </h2>

            {/* Love Rivi Logo */}
            <p className='text-7xl font-Cooper Black font-bold text-pink-400 mt-2'>
              love, rivi  
            </p>
            <p className='text-xl text-pink-400 mt-2'>
              CUSTOM GIFTS & PRINTS
            </p>

            {/* Description Text */}
            <p className="text-3xl font-bold text-pink-400 mt-2">
              We offer different kinds of <br />souvenirs, crafts, and printing services.
            </p>

            {/* Shop Now Button */}
            <Link to="/shop">
              <img src={CartImage} alt="Cart" className="w-6 h-6 mr-2" />
            </Link>
          </div>
        </section>
        <section className="background flex flex-col items-center justify-center p-30"
          style={{
            backgroundImage: `url('/path/to/another-image.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          {/* Featured Header */}
          <div className="bg-pink-300 text-black px-10 py-4 rounded-full text-2xl font-bold mb-15 mr-190">
            Featured Categories
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-x-30 gap-y-10">
            {items.map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden w-120 h-100">
                <img
                  src={pillowbox}
                  alt="pillowbox"
                  className="w-full h-60 object-cover"
                />
                <div className="bg-pink-400 text-black text-left py-12 px-4 py-0 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                  <img src={ArrowImage} alt="Arrow" className="w-6 h-6 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="relative flex flex-col items-center justify-center p-30"
          style={{
            backgroundImage: `url(${VdbgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          {/* New Section Content */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-x-30 gap-y-10">
            {/* Add content for the new section here */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-120 h-100">
              <img
                src="https://via.placeholder.com/150"
                alt="New Arrival"
                className="w-full h-60 object-cover"
              />
              <div className="bg-pink-500 text-black text-left py-12 px-4 py-0 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">New Arrival!</p>
                  <p className="text-sm">New Product</p>
                  <p className="text-xs">Description of the new product.</p>
                </div>
                <img src={ArrowImage} alt="Arrow" className="w-6 h-6 ml-2" />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center my-6">
            <div className="w-37 border-t-3 border-pink-300"></div>
            <span className="px-4 text-3xl text-gray-600 font-semibold">Planning a party or event?</span>
            <div className="flex-grow border-t-3 border-pink-300"></div>
         </div>
         
          {/* Container for the three boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex flex-wrap justify-center px-10">
            {/* Box 1 */}
            <div className="bg-pink-200 p-4 rounded-lg shadow-md w-80 h-100 m-19">
              <img
                src={onda1}
                alt="Image 1"
                className="w-full h-70 object-cover rounded-md"
              />
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center"> 
              <div className="flex items-center justify-center mb-2"> 
                <img src={HeartImage} alt="Heart" className="w-6 h-6 mr-2" />
                <span className="text-xl text-gray-600 font-semibold">WE ALSO OFFER</span>
                <img src={HeartImage} alt="Heart" className="w-6 h-6 ml-2" />
              </div>
              <div className="bg-pink-200 p-4 rounded-lg shadow-md w-80 h-100 m-10">
                <img
                  src={onda2}
                  alt="Image 2"
                  className="w-full h-70 object-cover rounded-md"
                />
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-pink-200 p-4 rounded-lg shadow-md w-80 h-100 m-19">
              <img
                src={onda3}
                alt="Image 3"
                className="w-full h-70 object-cover rounded-md"
               
              />
            </div>  
          </div>
          {/* Bottom Line with Centered Text */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t-2 border-pink-300"></div>
            <span className="px-4 text-3xl text-gray-600 font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;ON-THE-SPOT <br></br>
            SOUVENIR-MAKING SERVICE</span>
            <div className="flex-grow border-t-2 border-pink-300"></div>
          </div>
          <div className='bg-pink-400 h-50'></div>
        </section>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Home;