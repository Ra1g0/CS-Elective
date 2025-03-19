
import Header from "../Components/Header"; 
import Footer from "../Components/Footer";
import "../App.css";

function Contactus() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg">
          Welcome to the Contactus page
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Contactus;