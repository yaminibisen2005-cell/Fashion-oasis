import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Reviews.css";

function Reviews() {
  const reviews = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      product: "Women's Dress",
      rating: "★★★★★",
      review: "Beautiful design and premium quality."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      product: "Running Shoes",
      rating: "★★★★☆",
      review: "Very comfortable and lightweight."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300",
      product: "Luxury Watch",
      rating: "★★★★★",
      review: "Excellent quality and stylish."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300",
      product: "Leather Handbag",
      rating: "★★★★☆",
      review: "Looks elegant and spacious."
    }
  ];

  return (
    <DashboardLayout>
      <div className="reviews-page">

        <h2>My Reviews</h2>

        {reviews.map((item) => (
          <div className="review-card" key={item.id}>

            <img src={item.image} alt={item.product} />

            <div className="review-content">
              <h4>{item.product}</h4>

              <div className="stars">{item.rating}</div>

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