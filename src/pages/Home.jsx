import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import SpecialOffer from "../components/SpecialOffer/SpecialOffer";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer/Footer";
import Newsletter from "../components/Newsletter/Newsletter";

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
      <Newsletter/>
       <Footer /> 
    </>
  );
};

export default Home;