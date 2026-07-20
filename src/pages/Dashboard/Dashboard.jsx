import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Dashboard.css";

import {
FaShoppingBag,
FaHeart,
FaStar,
FaGift
} from "react-icons/fa";

import dashboardbanner from "../../assets/dashboardbanner.png";
// import avatar from "../../assets/dashboard/avatar.jpg";
import product4 from "../../assets/product4.jpg";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";

function Dashboard() {

const orders=[
{
id:"#FO1001",
image:product1,
name:"Earings",
date:"18 Jul 2026",
amount:"₹2,499",
status:"Delivered"
},
{
id:"#FO1002",
image:product2,
name:"Necklace",
date:"16 Jul 2026",
amount:"₹3,999",
status:"Shipped"
},
{
id:"#FO1003",
image:product3,
name:"Bracelete",
date:"12 Jul 2026",
amount:"₹1,899",
status:"Confirmed"
},
{
id:"#FO1004",
image:product4,
name:"Key-chain",
date:"10 Jul 2026",
amount:"₹5,299",
status:"Cancelled"
}
];

return(

<DashboardLayout>

<div className="dashboard-top">

<div>

<h2>
Welcome Back, User! ✨
</h2>

<p>
Here's what's happening with your Fashion Oasis account.
</p>

</div>

<div className="top-profile">

<span>
Welcome, User
</span>

{/* <img src={avatar} alt="" /> */}

</div>

</div>

<div
className="dashboard-banner"
style={{
backgroundImage:`url(${dashboardbanner})`
}}
>

</div>

<div className="dashboard-cards">

<div className="card-box">

<div className="icon">
<FaShoppingBag/>
</div>

<h5>Total Orders</h5>

<h2>24</h2>

</div>

<div className="card-box">

<div className="icon">
<FaHeart/>
</div>

<h5>Wishlist</h5>

<h2>12</h2>

</div>

<div className="card-box">

<div className="icon">
<FaStar/>
</div>

<h5>Reviews</h5>

<h2>8</h2>

</div>

<div className="card-box">

<div className="icon">
<FaGift/>
</div>

<h5>Reward Points</h5>

<h2>350</h2>

</div>

</div>

<div className="orders-card">

<div className="orders-header">

<h3>
Recent Orders
</h3>

<span>
View All →
</span>

</div>

<table>

<thead>

<tr>

<th>Order ID</th>

<th>Product</th>

<th>Date</th>

<th>Amount</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{
orders.map((item,index)=>(

<tr key={index}>

<td>{item.id}</td>

<td>

<div className="product">

<img
src={item.image}
alt=""
/>

<span>

{item.name}

</span>

</div>

</td>

<td>{item.date}</td>

<td>{item.amount}</td>

<td>

<span
className={`status ${item.status.toLowerCase()}`}
>

{item.status}

</span>

</td>

</tr>

))
}

</tbody>

</table>

</div>

</DashboardLayout>

);

}

export default Dashboard;