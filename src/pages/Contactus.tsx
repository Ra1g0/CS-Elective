import Header from "../Components/Header";
import Footer from "../Components/Footer";
import envelopeImage from "../assets/envelope.png";
import noteImage from "../assets/Note.png";
// Icons Only
import tiktokIcon from "../assets/Tiktok.png";
import phoneIcon from "../assets/Phone.png";
import locationIcon from "../assets/Loc.png";
import igIcon from "../assets/IG.png";
import fbIcon from "../assets/FB.png";
import mailIcon from "../assets/Mail.png";
import "../App.css";

function Contactus() {
  return (
    <div>
      <Header />
      <main className="p-4 flex flex-col items-center text-center relative">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-4">Welcome to the Contactus page</p>
        {/* Envelope Image */}
        <div className="relative">
          <img src={envelopeImage} alt="Pink Envelope" className="w-[500px] h-auto mt-4" />
          {/* Note Image Overlay */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-[445px] h-[305px]">
            {/* Background as note.png */}
            <div
              className="w-full h-full bg-no-repeat bg-contain bg-center relative"
              style={{ backgroundImage: `url(${noteImage})` }}
            >
              {/* Content Inside Note */}
              <div className="absolute inset-0 px-8 pt-7 pb-4 text-left">
                {/* Title */}
                <p className="text-sm font-semibold mb-3 tracking-wide">CONTACT US</p>
                {/* Icon + Text List */}
                <div className="flex flex-col justify-start gap-[13px] text-sm leading-4">
                  <div className="flex items-center gap-2">
                    <img src={locationIcon} alt="Location" className="w-5 h-5" />
                    <span className="ml-1">South, Caloocan, Philippines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={fbIcon} alt="Facebook" className="w-5 h-5" />
                    <a href="https://www.facebook.com/loverivi.ph" target="_blank" rel="noopener noreferrer" className="ml-1 text-black-600">
                      www.facebook.com/loverivi.ph
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={mailIcon} alt="Email" className="w-5 h-5" />
                    <a href="mailto:loverivi28@gmail.com" className="ml-1 text-black-600">
                      loverivi28@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={igIcon} alt="Instagram" className="w-7 h-6 -ml-1" />
                    <a href="https://www.instagram.com/loverivicustomgiftsandprints" target="_blank" rel="noopener noreferrer" className="text-black-600">
                      @loverivicustomgiftsandprints
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={phoneIcon} alt="Phone" className="w-5 h-5" />
                    <span className="ml-1">0927 009 2386</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={tiktokIcon} alt="TikTok" className="w-6 h-5" />
                    <a href="https://www.tiktok.com/@loverivisouvenirshop" target="_blank" rel="noopener noreferrer" className="text-black-600">
                      @loverivisouvenirshop
                    </a>
                  </div>
                </div>
                {/* Signature */}
                <p className="absolute bottom-3 right-6 text-base font-medium">
                  Love, Riri <span className="text-pink-500">❤️</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Text Description */}
        <div className="mt-6 max-w-md text-center text-sm text-gray-700 font-bold">
          <p>Connect with Us!</p>
          <p>
            At Love, Rivi Custom Gifts & Prints, we're here to make your special moments even more memorable.
            Whether you have a specific design in mind or need help finding the perfect style,
            we'd love to create something beautiful for your event.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contactus;