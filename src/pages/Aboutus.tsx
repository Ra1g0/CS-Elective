
import Header from "../Components/Header"; 
import Footer from "../Components/Footer";
import "../App.css";

function Aboutus() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg">
          Welcome to the About Us page. Here you can learn more about our company, our mission, and our team.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Aboutus;