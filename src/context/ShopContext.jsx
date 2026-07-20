import React, { createContext, useState, useEffect } from "react";
import thumb1 from "../assets/thumb1.png";
import thumb2 from "../assets/thumb2.png";
import thumb3 from "../assets/thumb3.png";
import thumb4 from "../assets/thumb4.png";

export const ShopContext = createContext();

const initialProducts = [
  {
    id: 101,
    name: "Rose Quartz Necklace",
    price: 1299,
    oldPrice: 1899,
    image: thumb1,
    category: "Necklaces",
    rating: 4.9,
  },
  {
    id: 102,
    name: "Pearl Drop Earrings",
    price: 999,
    oldPrice: 1499,
    image: thumb4,
    category: "Earrings",
    rating: 4.8,
  },
  {
    id: 103,
    name: "Floral Diamond Ring",
    price: 1799,
    oldPrice: 2499,
    image: thumb3,
    category: "Rings",
    rating: 4.9,
  },
  {
    id: 104,
    name: "Luxury Charm Bracelet",
    price: 1099,
    oldPrice: 1499,
    image: thumb2,
    category: "Bracelets",
    rating: 4.7,
  },
];

export const ShopProvider = ({ children }) => {
  // Wishlist starts with all 4 items
  const [wishlist, setWishlist] = useState(initialProducts);

  // Cart starts with 3 items (Rose Quartz Necklace x1, Pearl Drop Earrings x2, Floral Diamond Ring x1)
  const [cart, setCart] = useState([
    { product: initialProducts[0], quantity: 1 },
    { product: initialProducts[1], quantity: 2 },
    { product: initialProducts[2], quantity: 1 },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "Neha Sharma",
    phone: "+91 98760 42725",
    address: "123 MG Road, Bandra West",
    address2: "101-B Jasmine Heights",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
  });

  const [billingAddress, setBillingAddress] = useState({
    fullName: "Neha Sharma",
    phone: "+91 98760 42725",
    address: "123 MG Road, Bandra West",
    address2: "101-B Jasmine Heights",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  
  // Holds current active order for Order Confirmation & Tracking
  const [currentOrder, setCurrentOrder] = useState({
    orderId: "FO12345",
    date: "15 July 2025",
    items: [
      { product: initialProducts[0], quantity: 1 },
      { product: initialProducts[1], quantity: 1 },
      { product: initialProducts[2], quantity: 1 },
    ],
    subtotal: 4097,
    discount: 410,
    shipping: "FREE",
    total: 3687,
    status: "Out for Delivery",
    courier: "Delhivery",
    shippingId: "123453498",
    expectedDelivery: "20 July 2025",
  });

  // Calculate cart totals
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 });

  useEffect(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const discount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discount;
    setTotals({ subtotal, discount, total });
  }, [cart, discountPercent]);

  // Sync billing address if sameAsShipping is true
  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress({ ...shippingAddress });
    }
  }, [shippingAddress, sameAsShipping]);

  // Wishlist handlers
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // Cart handlers
  const addToCart = (product, qty = 1) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: qty }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.product.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.product.id !== id));
  };

  // Move items from Wishlist to Cart
  const moveToCart = (id) => {
    const target = wishlist.find((item) => item.id === id);
    if (target) {
      addToCart(target, 1);
      removeFromWishlist(id);
    }
  };

  const moveAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
    setWishlist([]);
  };

  // Coupon application
  const applyCoupon = (code) => {
    setCouponCode(code);
    if (code.trim().toUpperCase() === "KGL56M6UX") {
      setDiscountPercent(10);
      setCouponSuccess("Coupon 'KGL56M6UX' applied! 10% discount added.");
      setCouponError("");
      return true;
    } else if (code.trim() === "") {
      setDiscountPercent(0);
      setCouponSuccess("");
      setCouponError("");
      return false;
    } else {
      setDiscountPercent(0);
      setCouponError("Invalid coupon code. Try 'KGL56M6UX'");
      setCouponSuccess("");
      return false;
    }
  };

  // Place order
  const placeOrder = () => {
    const generatedOrderId = "FO" + Math.floor(10000 + Math.random() * 90000);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    
    // Calculate final tracking details
    const newOrder = {
      orderId: generatedOrderId,
      date: formattedDate,
      items: [...cart],
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: "FREE",
      total: totals.total,
      status: "Order Placed",
      courier: "Delhivery",
      shippingId: "1234" + Math.floor(10000 + Math.random() * 90000),
      expectedDelivery: new Date(today.setDate(today.getDate() + 5)).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    
    setCurrentOrder(newOrder);
    setCart([]); // Clear cart after successful order placement
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products: initialProducts,
        wishlist,
        cart,
        totals,
        couponCode,
        couponSuccess,
        couponError,
        shippingAddress,
        billingAddress,
        sameAsShipping,
        paymentMethod,
        currentOrder,
        setShippingAddress,
        setBillingAddress,
        setSameAsShipping,
        setPaymentMethod,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        updateQuantity,
        removeFromCart,
        moveToCart,
        moveAllToCart,
        applyCoupon,
        placeOrder,
        setCurrentOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
