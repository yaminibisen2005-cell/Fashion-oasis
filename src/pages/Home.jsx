import React from "react";

import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import Categories from "../Components/Categories/Categories";
import FeaturedProducts from "../Components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../Components/WhyChooseUs/WhyChooseUs";
import SpecialOffer from "../Components/SpecialOffer/SpecialOffer";
import Testimonials from "../Components/Testimonials/Testimonials";
import Footer from "../Components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
   
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <SpecialOffer />
      <Testimonials />
       <Footer /> 
    </>
  );
};

export default Home;