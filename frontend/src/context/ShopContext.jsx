 import React, { createContext, useState, useEffect } from "react";
import thumb1 from "../assets/thumb1.png";
import thumb2 from "../assets/thumb2.png";
import thumb3 from "../assets/thumb3.png";
import thumb4 from "../assets/thumb4.png";
import { toggleWishlist } from "../api/customer"; // <-- Import your wishlist API

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
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [currentOrder, setCurrentOrder] = useState(null);
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

  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress({ ...shippingAddress });
    }
  }, [shippingAddress, sameAsShipping]);

  // Updated Wishlist handler to sync with backend API
  const addToWishlist = async (product) => {
    try {
      // Format payload to match your backend schema expectation
      const payload = {
        product: {
          id: String(product.id),
          name: product.name,
          image: typeof product.image === "string" ? product.image : "",
          price: product.price,
          oldPrice: product.oldPrice || product.price,
        },
      };

      await toggleWishlist(payload);

      if (!wishlist.find((item) => item.id === product.id)) {
        setWishlist([...wishlist, product]);
      }
    } catch (error) {
      console.error("Failed to update wishlist on backend:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const productToRemove = wishlist.find((item) => item.id === id);
      if (productToRemove) {
        await toggleWishlist({
          product: {
            id: String(productToRemove.id),
            name: productToRemove.name,
            price: productToRemove.price,
          },
        });
      }
      setWishlist(wishlist.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
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

  const placeOrder = () => {
    const generatedOrderId = "FO" + Math.floor(10000 + Math.random() * 90000);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    
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
    setCart([]);
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