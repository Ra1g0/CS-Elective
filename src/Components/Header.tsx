import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoveriviLogo from '../assets/Loverivi.png'; 
import LoginLogo from '../assets/Login_logo.png';
import CartLogo from '../assets/Cart.png';
import VectorLogo from '../assets/Vector.png';
import '../App.css'; 
import Chatbot from '../pages/chatbot';

function Header() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status on component mount and route changes
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, [location]);

  // function logic to for Login and Logout of profile
  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Already logged in: go to profile
      navigate('/profile');
    } else {
      // Not logged in: only redirect to login if not already there
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  };
  


  return (
    <>
      <header className="bg-white p-0 fixed top-0 left-0 w-full z-10 shadow-md border-t-15 border-pink-300">
        <nav className="flex items-center justify-between p-7">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={LoveriviLogo} alt="Loverivi Logo" className="h-13" />
          </div>
          <div className="flex items-center space-x-10 ml-auto">
            <button onClick={handleLoginClick}>
              <img src={LoginLogo} alt="Login Logo" className="h-5" />
            </button>
            <Link to="/cart">
              <img src={CartLogo} alt="Cart Logo" className="h-5" />
            </Link>
            <img src={VectorLogo} alt="Vector Logo" className="h-5" />
          </div>
        </nav>
        <div className="bg-pink-200 w-full">
          <ul className="flex justify-center space-x-15 p-1 font-Garet font-bold text-0.5xl">
            <li><Link to="/home" className="text-white">HOME</Link></li>
            <li><Link to="/Shop" className="text-white">SHOP</Link></li>
            <li><Link to="/Services" className="text-white">SERVICES</Link></li>
            <li><Link to="/Aboutus" className="text-white">ABOUT US</Link></li>
            <li><Link to="/Contactus" className="text-white">CONTACT US</Link></li>
          </ul>
        </div>
      </header>

      {isChatbotVisible && (
        <div className="fixed bottom-5 right-5">
          <Chatbot />
        </div>
      )}
    </>
  );
}

export default Header;