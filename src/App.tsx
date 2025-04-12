import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup.tsx";
import Admin from "./pages/admin/AdminAdd.tsx";
import MyCart from "./pages/cart.tsx";
import MyOrder from "./pages/MyOrder.tsx";
import Refund from "./pages/Refund.tsx";
import SubmitRef from "./pages/SubmitRef.tsx";
import Notifications from "./pages/Notif.tsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/admin/AdminAdd" element={<Admin />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/orders" element={<MyOrder/>}/>
          <Route path="/refund" element={<Refund/>}/>
          <Route path="/submitrefund" element={<SubmitRef/>} />
          <Route path="/notif" element={<Notifications/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;