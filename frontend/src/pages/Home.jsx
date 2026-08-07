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

/**
 * Home Page Component
 * Rendered EXCLUSIVELY on the root route ("/")
 * Renders the top Navbar, Home Hero section (<Hero />), and primary storefront sections.
 * The Customer Dashboard operates independently on the "/dashboard" route.
 */
const Home = () => {
  return (
    <div className="home-page-wrapper">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <SpecialOffer />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;