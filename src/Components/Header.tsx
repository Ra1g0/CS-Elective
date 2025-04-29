import { useState } from 'react';
import LoveriviLogo from '../assets/Loverivi.png'; 
import LoginLogo from '../assets/Login_logo.png';
import CartLogo from '../assets/Cart.png';
import MessageLogo from '../assets/Message.png';
import VectorLogo from '../assets/Vector.png';
import '../App.css'; 
import { Link } from 'react-router-dom';
import Chatbot from '../pages/chatbot'; // Import your Chatbot component

function Header() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <>
      <header className="bg-white p-0 fixed top-0 left-0 w-full z-10 shadow-md border-t-15 border-pink-300">
        <nav className="flex items-center justify-between p-7">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={LoveriviLogo} alt="Loverivi Logo" className="h-13" />
          </div>
          <div className="flex items-center space-x-10 ml-auto">
            <a href="/Login">
              <img src={LoginLogo} alt="Login Logo" className="h-5" />
            </a>
            <Link to="/cart">
              <img src={CartLogo} alt="Cart Logo" className="h-5" />
            </Link>
            <img
              src={MessageLogo}
              alt="Message Logo"
              className="h-5 cursor-pointer"
              onClick={toggleChatbot} // Toggle chatbot visibility on click
            />
            <img src={VectorLogo} alt="Vector Logo" className="h-5" />
          </div>
        </nav>
        <div className="bg-pink-200 w-full">
          <ul className="flex justify-center space-x-15 p-1 font-Garet font-bold text-0.5xl">
            <li>
              <a href="/home" className="text-white" style={{ color: 'white' }}>HOME</a>
            </li>
            <li>
              <a href="/Shop" className="text-white" style={{ color: 'white' }}>SHOP</a>
            </li>
            <li>
              <a href="/Services" className="text-white" style={{ color: 'white' }}>SERVICES</a>
            </li>
            <li>
              <a href="/Aboutus" className="text-white" style={{ color: 'white' }}>ABOUT US</a>
            </li>
            <li>
              <a href="/Contactus" className="text-white" style={{ color: 'white' }}>CONTACT US</a>
            </li>
          </ul>
        </div>
      </header>
      {isChatbotVisible && (
        <div className="fixed bottom-5 right-5">
          <Chatbot /> {/* Render the Chatbot component */}
        </div>
      )}
    </>
  );
}

export default Header;