import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Wishlist.css";

function Wishlist() {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      name: "Women's Dress",
      price: "₹1,999"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      name: "Running Shoes",
      price: "₹3,499"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300",
      name: "Luxury Watch",
      price: "₹5,999"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300",
      name: "Leather Handbag",
      price: "₹2,799"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=300",
      name: "Gold Ring",
      price: "₹1,499"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300",
      name: "Earrings",
      price: "₹999"
    }
  ];

  return (
    <DashboardLayout>
      <div className="wishlist-page">

        <h2>My Wishlist</h2>

        <div className="wishlist-grid">
          {products.map((item) => (
            <div className="wishlist-card" key={item.id}>

              <img src={item.image} alt={item.name} />

              <h5>{item.name}</h5>

              <p>{item.price}</p>

              <button>Add To Cart</button>

            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Wishlist;