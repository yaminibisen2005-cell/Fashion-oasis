
import "./shopNow.css";
// import Bannershopnow from "../../assets/images/Bannershopnow.jpg";  

const products = [
  {
    id: 1,
    name: "Braclete",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGpld2VsZXJ5fGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Set",
    price: "₹2,999",
    image:
      "https://images.unsplash.com/photo-1722410180687-b05b50922362?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGpld2VsZXJ5fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Rings",
    price: "₹1,599",
    image:
      "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGpld2VsZXJ5fGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Bracelet",
    price: "₹3,499",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amV3ZWxlcnklMjBvbiUyMGJyYWNlbGV0fGVufDB8fDB8fHww",
  },
   {
    id: 5,
    name: "Ear Rings",
    price: "₹2,000",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amV3ZWxlcnl8ZW58MHx8MHx8fDA%3D",
  },
   {
    id: 6,
    name: "Necklace",
    price: "₹2,500",
    image:
      "https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZWxlcnl8ZW58MHx8MHx8fDA%3D",
  },
   {
    id: 7,
    name: "Rings",
    price: "₹3,499",
    image:
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amV3ZWxlcnl8ZW58MHx8MHx8fDA%3D",
  },
   {
    id: 8,
    name: "Gold plated pendant",
    price: "₹3,499",
    image:
      "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpld2VsZXJ5fGVufDB8fDB8fHww",
  },
];

function ShopNow() {
  return (
    <div className="shop-page">

   <section
  className="shop-banner">
  <div className="banner-content">
    <h1>NEW COLLECTION</h1>
    <h2>Elegant Fashion For You</h2>
    <p>
      Discover premium styles crafted with love and luxury.
    </p>

    <button>Explore Collection →</button>
  </div>


</section>


      <h2 className="title">
        Featured Products
      </h2>


      <div className="product-container">

        {products.map((item)=>(
          <div className="product-card" key={item.id}>

            <img src={item.image} alt={item.name}/>

            <h3>{item.name}</h3>

            <p>{item.price}</p>

            <button>
              Add To Cart
            </button>

          </div>
        ))}

      </div>


    </div>
  );
}

export default ShopNow;