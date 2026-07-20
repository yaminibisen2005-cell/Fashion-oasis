import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Reviews.css";

import product1 from "../../assets/product1.jpg";
import product5 from "../../assets/product5.jpg";
import product6 from "../../assets/product6.jpg";

import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    image: product1,
    product: "Women's Dress",
    rating: 5,
    review: "Beautiful design and premium quality. Perfect fitting and comfortable fabric.",
  },
  {
    id: 2,
    image: product5,
    product: "Running Shoes",
    rating: 5,
    review: "Very comfortable and lightweight. Perfect for daily workouts and running.",
  },
  {
    id: 3,
    image: product6,
    product: "Luxury Watch",
    rating: 5,
    review: "Excellent quality and stylish look. Worth every penny.",
  },
];

function Reviews() {
  return (
    <DashboardLayout>
      <div className="reviews-page">

        <div className="reviews-header">
          <h2>My Reviews</h2>
          <p>Your recent product reviews.</p>
        </div>

        {reviews.map((item) => (
          <div className="review-card" key={item.id}>

            <img src={item.image} alt={item.product} />

            <div className="review-content">

              <h3>{item.product}</h3>

              <div className="stars">
                {[...Array(item.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <p>{item.review}</p>

              <button>View Product</button>

            </div>

          </div>
        ))}

      </div>
    </DashboardLayout>
  );
}

export default Reviews;