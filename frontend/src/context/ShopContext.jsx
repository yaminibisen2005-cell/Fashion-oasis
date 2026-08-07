 import React, { createContext, useState, useEffect, useRef } from "react";
import thumb1 from "../assets/thumb1.png";
import thumb2 from "../assets/thumb2.png";
import thumb3 from "../assets/thumb3.png";
import thumb4 from "../assets/thumb4.png";
import { toggleWishlist, getCart, saveCart, getWishlist } from "../api/customer";

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
  const [buyNowItem, setBuyNowItem] = useState(null);
  const isInitialMount = useRef(true);
  
  const customerToken = localStorage.getItem("customerToken") || localStorage.getItem("token");

  // Fetch cart and wishlist from backend on mount/login
  useEffect(() => {
    const fetchUserData = async () => {
      if (!customerToken) {
        try {
          const savedCart = localStorage.getItem("fashion_oasis_cart");
          if (savedCart) setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error(e);
        }
        return;
      }

      try {
        const [cartRes, wishlistRes] = await Promise.all([
          getCart().catch(() => null),
          getWishlist().catch(() => null)
        ]);

        if (cartRes && cartRes.cart) {
          setCart(cartRes.cart);
        }
        if (wishlistRes && wishlistRes.wishlist) {
          setWishlist(wishlistRes.wishlist);
        }
      } catch (error) {
        console.error("Failed to fetch user data from backend:", error);
      }
    };

    fetchUserData();
  }, [customerToken]);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
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

  // Sync cart to backend database and localStorage with debounce protection
  useEffect(() => {
    try {
      localStorage.setItem("fashion_oasis_cart", JSON.stringify(cart));
      
      if (customerToken) {
        if (isInitialMount.current) {
          isInitialMount.current = false;
          return;
        }
        const timer = setTimeout(() => {
          saveCart({ cart }).catch((err) =>
            console.error("Failed to sync cart to backend:", err)
          );
        }, 400);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart, customerToken]);

 useEffect(() => {
    // If cart has items, use cart exclusively. Ignore buyNowItem entirely if cart has elements.
    const activeItems = cart && cart.length > 0 ? cart : (buyNowItem ? [buyNowItem] : []);
    const subtotal = activeItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
    const discount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discount;
    setTotals({ subtotal, discount, total });
  }, [cart, buyNowItem, discountPercent]);

  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress({ ...shippingAddress });
    }
  }, [shippingAddress, sameAsShipping]);

  // Wishlist handler
  const addToWishlist = async (product) => {
    try {
      const prodId = String(product.id || product._id);
      const payload = {
        product: {
          id: prodId,
          name: product.name,
          image: typeof product.image === "string" ? product.image : "",
          price: product.price,
          oldPrice: product.oldPrice || product.price,
        },
      };

      const res = await toggleWishlist(payload);
      if (res && res.wishlist) {
        setWishlist(res.wishlist);
      }
    } catch (error) {
      console.error("Failed to update wishlist on backend:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const productToRemove = wishlist.find((item) => String(item.id || item._id) === String(id));
      if (productToRemove) {
        const res = await toggleWishlist({
          product: {
            id: String(productToRemove.id || productToRemove._id),
            name: productToRemove.name,
            price: productToRemove.price,
            image: productToRemove.image || "",
          },
        });
        if (res && res.wishlist) {
          setWishlist(res.wishlist);
          return;
        }
      }
      setWishlist(wishlist.filter((item) => String(item.id || item._id) !== String(id)));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  // Cart handlers with structure normalization
  const addToCart = (product, qty = 1) => {
    setBuyNowItem(null);
    const rawProd = product.product || product;
    const productId = String(rawProd.id || rawProd._id);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => String(item.product?.id || item.product?._id) === productId
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product: {
              id: productId,
              name: rawProd.name,
              image: rawProd.image || "",
              price: rawProd.price || 0,
              oldPrice: rawProd.oldPrice || rawProd.price || 0,
            },
            quantity: qty,
          },
        ];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    const strId = String(id);
    if (quantity <= 0) {
      removeFromCart(strId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          String(item.product?.id || item.product?._id) === strId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    const strId = String(id);
    setCart((prevCart) =>
      prevCart.filter((item) => String(item.product?.id || item.product?._id) !== strId)
    );
  };

  const moveToCart = (id) => {
    const target = wishlist.find((item) => String(item.id || item._id) === String(id));
    if (target) {
      addToCart(target, 1);
      removeFromWishlist(id);
    }
  };

  const moveAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
    wishlist.forEach((item) => {
      removeFromWishlist(item.id || item._id);
    });
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

  const placeOrder = (backendOrderData = null) => {
    const generatedOrderId = backendOrderData?.orderId || "FO" + Math.floor(10000 + Math.random() * 90000);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    
    // Fixed: Prioritize full cart array items unless buyNowItem is explicitly set and cart is empty
    const itemsToOrder = (cart && cart.length > 0) ? [...cart] : (buyNowItem ? [buyNowItem] : []);

    const newOrder = {
      orderId: generatedOrderId,
      date: formattedDate,
      items: itemsToOrder,
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
    setBuyNowItem(null);
    return newOrder;
  };

  // Complete cleanup function for secure logouts
  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("token");
    localStorage.removeItem("fashion_oasis_cart");
    localStorage.removeItem("customerName");
    setCart([]);
    setWishlist([]);
    setBuyNowItem(null);
    setCurrentOrder(null);
    setShippingAddress({
      fullName: "",
      phone: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
    });
    setBillingAddress({
      fullName: "",
      phone: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  return (
    <ShopContext.Provider
      value={{
        products: initialProducts,
        wishlist,
        cart,
        buyNowItem,
        setBuyNowItem,
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
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;