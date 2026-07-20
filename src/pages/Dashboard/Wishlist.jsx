import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Wishlist.css";

import { FaHeart, FaShoppingCart } from "react-icons/fa";

import product7 from "../../assets/product7.jpg";
import product8 from "../../assets/product8.jpg";
import product5 from "../../assets/product5.jpg";
import product6 from "../../assets/product6.jpg";

import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";

const wishlistItems = [
  {
    id: 1,
    name: "Flower",
    image: product7,
    price: "₹1,999",
  },
  {
    id: 2,
    name: "Key-Chain",
    image: product8,
    price: "₹3,499",
  },
  {
    id: 3,
    name: "Necklace",
    image: product5,
    price: "₹5,999",
  },
  {
    id: 4,
    name: "Rings",
    image: product6,
    price: "₹2,799",
  },
  {
    id: 5,
    name: "Necklace",
    image: product2,
    price: "₹2,499",
  },
  {
    id: 6,
    name: "Ear-rings",
    image: product1,
    price: "₹3,299",
  },
];

function Wishlist() {
  return (
    <DashboardLayout>
      <div className="wishlist-page">

        <div className="wishlist-header">
          <h2>My Wishlist</h2>
          <p>Your favourite Fashion Oasis products.</p>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div className="wishlist-card" key={item.id}>

              <div className="wishlist-image">
                <img src={item.image} alt={item.name} />

                <button className="heart-btn">
                  <FaHeart />
                </button>
              </div>

              <div className="wishlist-content">
                <h4>{item.name}</h4>
                <h3>{item.price}</h3>

                <button className="cart-btn">
                  <FaShoppingCart />
                  Add To Cart
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Wishlist;