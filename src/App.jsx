import{BrowserRouter,Routes,Route}from "react-router-dom";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import SpecialOffer from "./components/SpecialOffer/SpecialOffer";
import Testimonial from "./components/Testimonials/Testimonial";
// import ShopNow from "./pages/ShopNow/shopNow";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Faq from "./pages/Faq/Faq";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/Reset/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Orders from "./pages/Dashboard/Orders";
import Wishlist from "./pages/Dashboard/Wishlist";
import Reviews from "./pages/Dashboard/Reviews";
import AccountSetting from "./pages/Dashboard/AccountSetting";
function Home(){
  return(
   
    <>
      <About />
      <WhyChooseUs />
      <Contact />
      <Faq /> 
      <SpecialOffer /> 
      <Testimonial />
      
      

      
    </>
  );
}
function App(){
  return(
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />}/>
     <Route path="/dashboard" element={<Dashboard />}/> 
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<Faq />} />
     {/* <Route path="/ShopNow" element={<ShopNow />} /> */}
     <Route path="/wishlist" element={<Wishlist />}/>
     <Route path="/reviews" element={<Reviews />} />
     <Route path="/accountsetting" element={<AccountSetting />} />
  </Routes>
</BrowserRouter>
     
  );
}
export default App;
