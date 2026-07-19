import { useState } from "react";

import "./Shop.css";

import HeroBanner from "../../components/Shop/HeroBanner/HeroBanner";
import Sidebar from "../../components/Shop/Sidebar/Sidebar";
import SearchSort from "../../components/Shop/SearchSort/SearchSort";
import ProductGrid from "../../components/Shop/ProductGrid/ProductGrid";
import Pagination from "../../components/Shop/Pagination/Pagination";

import { products } from "../../data/products";

export default function Shop() {

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const [sortBy, setSortBy] = useState("Popularity");



  let filteredProducts = [...products];



  if (selectedCategory !== "All Products") {

    filteredProducts = filteredProducts.filter(
      item => item.category === selectedCategory
    );

  }



  if (searchTerm) {

    filteredProducts = filteredProducts.filter(item =>

      item.name.toLowerCase().includes(searchTerm.toLowerCase())

    );

  }



  if (sortBy === "Price Low to High") {

    filteredProducts.sort((a,b)=>a.price-b.price);

  }

  if (sortBy === "Price High to Low") {

    filteredProducts.sort((a,b)=>b.price-a.price);

  }



  return (

    <div className="shop-page">

      <HeroBanner/>

      <div className="shop-layout">

        <Sidebar

          selectedCategory={selectedCategory}

          setSelectedCategory={setSelectedCategory}

        />



        <div className="shop-content">

          <SearchSort

            searchTerm={searchTerm}

            setSearchTerm={setSearchTerm}

            sortBy={sortBy}

            setSortBy={setSortBy}

            totalProducts={filteredProducts.length}

          />



          <ProductGrid

            products={filteredProducts}

          />



          <Pagination/>

        </div>

      </div>

    </div>

  );

}