
import Footer from "../Components/Footer";
import Header from "../Components/Header"; 
import "../App.css";

function Shop () {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-3xl font-bold mb-4">Shop</h2>
        <p className="text-lg">
          Welcome to Shop page
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Shop;