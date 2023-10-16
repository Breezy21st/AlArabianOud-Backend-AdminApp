import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";

import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<Home />} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path="product" element={<OurStore />} />
                <Route path="product/:id" element={<SingleProduct />} />
                <Route path="blogs" element={<Blog />} />
                <Route path="blog/:id" element={<SingleBlog />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<Forgotpassword />} />
                <Route path="signup" element={<Signup />} />
                <Route path="reset-password" element={<Resetpassword />} />
                {/* <Route path="privacy-policy" element={<PrivacyPolicy />} /> */}
                {/* <Route path="refund-policy" element={<RefundPolicy />} /> */}
                <Route path="shipping-policy" element={<ShippingPolicy />} />
                <Route path="term-conditions" element={<TermAndContions />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
