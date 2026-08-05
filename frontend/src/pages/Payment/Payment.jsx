import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaLock,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaMoneyBillWave,
  FaArrowLeft
} from "react-icons/fa";
import "./Payment.css";

const Payment = () => {
  const { currentOrder, setCurrentOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  // Screen states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [activeMethod, setActiveMethod] = useState("card"); // "card" | "upi" | "netbanking" | "cod"
  const [upiProvider, setUpiProvider] = useState("gpay"); // "gpay" | "phonepe" | "paytm" | "other"
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [bank, setBank] = useState("");
  const [netbankingUser, setNetbankingUser] = useState("");
  const [netbankingPass, setNetbankingPass] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleNetbankingUserChange = (e) => {
    setNetbankingUser(e.target.value);
    setErrorMessage("");
  };

  const handleNetbankingPassChange = (e) => {
    setNetbankingPass(e.target.value);
    setErrorMessage("");
  };

  // Auto formatting for card number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedValue.substring(0, 19));
    setErrorMessage("");
  };

  // Auto formatting for expiry (MM/YY)
  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, "");
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setCardExpiry(formattedValue.substring(0, 5));
    setErrorMessage("");
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, "");
    setCardCvv(value.substring(0, 3));
    setErrorMessage("");
  };

  const handleNameChange = (e) => {
    setCardName(e.target.value);
    setErrorMessage("");
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
    setErrorMessage("");
  };

  const handleBankChange = (e) => {
    setBank(e.target.value);
    setErrorMessage("");
  };

  // Live validator on Pay button submit
  const validateForm = () => {
    if (activeMethod === "upi") {
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiId.trim()) {
        setErrorMessage("UPI ID is incorrect, please provide valid details");
        return false;
      }
      if (!upiRegex.test(upiId.trim())) {
        setErrorMessage("UPI ID is incorrect, please provide valid details");
        return false;
      }
    } else if (activeMethod === "card") {
      const numericCard = cardNumber.replace(/\s+/g, "");
      if (numericCard.length !== 16) {
        setErrorMessage("Card No is incorrect, please provide valid details");
        return false;
      }
      
      if (cardExpiry.length !== 5) {
        setErrorMessage("Expiry date is incorrect, please provide valid details");
        return false;
      }
      const [month, year] = cardExpiry.split("/");
      const mVal = parseInt(month, 10);
      if (mVal < 1 || mVal > 12) {
        setErrorMessage("Expiry date is incorrect, please provide valid details");
        return false;
      }

      if (cardCvv.length !== 3) {
        setErrorMessage("CVV is incorrect, please provide valid details");
        return false;
      }

      if (cardName.trim().length < 3) {
        setErrorMessage("Cardholder name is incorrect, please provide valid details");
        return false;
      }
    } else if (activeMethod === "netbanking") {
      if (!bank) {
        setErrorMessage("Please select a bank to proceed");
        return false;
      }
      if (!netbankingUser.trim() || netbankingUser.trim().length < 6) {
        setErrorMessage("Customer ID is incorrect, please provide valid details");
        return false;
      }
      if (!netbankingPass.trim() || netbankingPass.trim().length < 6) {
        setErrorMessage("Password is incorrect, please provide valid details");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // Failure triggers based on inputs
      let simulateFailure = false;
      if (activeMethod === "upi" && upiId.toLowerCase() === "fail@upi") {
        simulateFailure = true;
      } else if (activeMethod === "card" && cardNumber.replace(/\s+/g, "").startsWith("4000")) {
        simulateFailure = true;
      } else if (activeMethod === "netbanking" && bank === "Axis Bank") {
        simulateFailure = true;
      }

      if (simulateFailure) {
        setIsFailed(true);
        setIsSuccess(false);
      } else {
        let payModeStr = "ONLINE";
        if (activeMethod === "upi") {
          payModeStr = `UPI (${upiProvider.toUpperCase()})`;
        } else if (activeMethod === "card") {
          payModeStr = "CARD";
        } else if (activeMethod === "netbanking") {
          payModeStr = `NET BANKING (${bank})`;
        } else if (activeMethod === "cod") {
          payModeStr = "CASH ON DELIVERY (COD)";
        }

        setCurrentOrder(prev => ({
          ...prev,
          paymentMethod: payModeStr
        }));

        setIsSuccess(true);
        setIsFailed(false);
      }
    }, 1800);
  };

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/thank-you");
    }, 800);
  };

  const handleTryAgain = () => {
    setIsFailed(false);
    setIsSuccess(false);
    setErrorMessage("");
    // Keep user on form and allow trying another payment method
  };

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <div className="container">
          
          <div className="payment-card-wrapper fade-in">
            {isSuccess ? (
              /* PAYMENT SUCCESS STATE */
              <div className="payment-success-card">
                <div className="success-icon-wrapper">
                  <FaCheckCircle />
                </div>
                
                <h1>Payment Success!</h1>
                <p className="payment-desc">Your payment has been processed successfully.</p>
                
                <div className="payment-details-box">
                  <div className="detail-row">
                    <span>Order ID</span>
                    <strong>#{currentOrder.orderId}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Amount Paid</span>
                    <strong className="success-amount">₹{currentOrder.total.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="payment-actions">
                  <button
                    className={`payment-btn-primary success-btn ${loading ? "loading" : ""}`}
                    onClick={handleContinue}
                    disabled={loading}
                  >
                    {loading ? <span className="spinner"></span> : "CONTINUE"}
                  </button>
                  
                  <button
                    className="payment-btn-secondary"
                    onClick={() => navigate("/shop")}
                    disabled={loading}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : isFailed ? (
              /* PAYMENT FAILED STATE (Backup Screen) */
              <div className="payment-failed-card">
                <div className="failed-icon-wrapper">
                  <FaTimesCircle />
                </div>
                
                <h1>Payment Failed!</h1>
                <p className="payment-desc">Something went wrong with the transaction. Please check your details and try again.</p>
                
                <div className="payment-details-box">
                  <div className="detail-row">
                    <span>Amount</span>
                    <strong className="failed-amount">₹{currentOrder.total.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="payment-actions">
                  <button
                    className="payment-btn-primary fail-btn"
                    onClick={handleTryAgain}
                  >
                    TRY AGAIN
                  </button>
                  
                  <button
                    className="payment-btn-secondary"
                    onClick={() => navigate("/cart")}
                  >
                    Return to Cart
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE PAYMENT FORM VIEW */
              <div className="payment-form-card">
                <div className="payment-header">
                  <h2>Secure Checkout</h2>
                  <p>Choose your payment mode to complete purchase</p>
                </div>

                <div className="amount-banner">
                  <span>Payable Amount:</span>
                  <strong>₹{currentOrder.total.toLocaleString()}</strong>
                </div>

                <form onSubmit={handlePay} className="payment-form">
                  {/* Payment Method Selector Grid */}
                  <div className="payment-methods-grid">
                    <div
                      className={`method-tab-btn ${activeMethod === "card" ? "active" : ""}`}
                      onClick={() => { setActiveMethod("card"); setErrorMessage(""); }}
                    >
                      <FaCreditCard />
                      <span>Card</span>
                    </div>

                    <div
                      className={`method-tab-btn ${activeMethod === "upi" ? "active" : ""}`}
                      onClick={() => { setActiveMethod("upi"); setErrorMessage(""); }}
                    >
                      <FaMobileAlt />
                      <span>UPI</span>
                    </div>

                    <div
                      className={`method-tab-btn ${activeMethod === "netbanking" ? "active" : ""}`}
                      onClick={() => { setActiveMethod("netbanking"); setErrorMessage(""); }}
                    >
                      <FaUniversity />
                      <span>Net Banking</span>
                    </div>

                    <div
                      className={`method-tab-btn ${activeMethod === "cod" ? "active" : ""}`}
                      onClick={() => { setActiveMethod("cod"); setErrorMessage(""); }}
                    >
                      <FaMoneyBillWave />
                      <span>COD</span>
                    </div>
                  </div>

                  {/* Sub Form Container */}
                  <div className="payment-subform-box">
                    
                    {/* Credit / Debit Card Form */}
                    {activeMethod === "card" && (
                      <div className="card-form-wrapper fade-in">
                        <div className="form-group-row logos-row">
                          <label>Credit / Debit Card</label>
                          <div className="card-brand-logos">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Z3Xm02y0rZifjX2q76HlC3v1v6zG3K2Dyw&s"
                              alt="Visa"
                              className="brand-logo"
                            />
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRw23c5C63B4rGkC8rNn3gN3Q0_WbZ4W5e-g&s"
                              alt="Mastercard"
                              className="brand-logo"
                            />
                          </div>
                        </div>

                        <div className="input-field-group">
                          <label htmlFor="cardNumber">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9101 1121"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className={errorMessage.toLowerCase().includes("card no") ? "error-input" : ""}
                          />
                        </div>

                        <div className="input-field-row">
                          <div className="input-field-group col-6">
                            <label htmlFor="cardExpiry">Expiry Date</label>
                            <input
                              type="text"
                              id="cardExpiry"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              className={errorMessage.toLowerCase().includes("expiry") ? "error-input" : ""}
                            />
                          </div>
                          <div className="input-field-group col-6">
                            <label htmlFor="cardCvv">CVV</label>
                            <input
                              type="password"
                              id="cardCvv"
                              placeholder="123"
                              value={cardCvv}
                              onChange={handleCvvChange}
                              className={errorMessage.toLowerCase().includes("cvv") ? "error-input" : ""}
                            />
                          </div>
                        </div>

                        <div className="input-field-group">
                          <label htmlFor="cardName">Cardholder Name</label>
                          <input
                            type="text"
                            id="cardName"
                            placeholder="Cardholder Full Name"
                            value={cardName}
                            onChange={handleNameChange}
                            className={errorMessage.toLowerCase().includes("cardholder") ? "error-input" : ""}
                          />
                        </div>
                      </div>
                    )}

                    {/* UPI Form */}
                    {activeMethod === "upi" && (
                      <div className="upi-form-wrapper fade-in">
                        <label className="section-label">UPI Provider Logo Mode</label>
                        <div className="upi-logos-row">
                          <div
                            className={`upi-logo-option ${upiProvider === "gpay" ? "active" : ""}`}
                            onClick={() => setUpiProvider("gpay")}
                          >
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJWuzguunIiksOOw26hiCgGUijGmj3jyxvSbGH-a47g&s=10"
                              alt="Google Pay"
                            />
                          </div>
                          <div
                            className={`upi-logo-option ${upiProvider === "phonepe" ? "active" : ""}`}
                            onClick={() => setUpiProvider("phonepe")}
                          >
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0N6bjzJ89P1KNnl9g-kueY850sUinE6Hj4HQkpCGqQ8OlY1BzUoFdXk&s=10"
                              alt="PhonePe"
                            />
                          </div>
                          <div
                            className={`upi-logo-option ${upiProvider === "paytm" ? "active" : ""}`}
                            onClick={() => setUpiProvider("paytm")}
                          >
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_bSjW-fG0UvK-48FhB1n6kYyW8s7c6K-iw&s"
                              alt="Paytm"
                            />
                          </div>
                          <div
                            className={`upi-logo-option text-option ${upiProvider === "other" ? "active" : ""}`}
                            onClick={() => setUpiProvider("other")}
                          >
                            <span>Other UPI</span>
                          </div>
                        </div>

                        <div className="input-field-group">
                          <label htmlFor="upiId">
                            {upiProvider === "gpay" && "GPay UPI ID"}
                            {upiProvider === "phonepe" && "PhonePe UPI ID"}
                            {upiProvider === "paytm" && "Paytm UPI ID"}
                            {upiProvider === "other" && "UPI ID"}
                          </label>
                          <input
                            type="text"
                            id="upiId"
                            placeholder={
                              upiProvider === "gpay" ? "example@okaxis" :
                              upiProvider === "phonepe" ? "example@ybl" :
                              upiProvider === "paytm" ? "example@paytm" : "example@upi"
                            }
                            value={upiId}
                            onChange={handleUpiChange}
                            className={errorMessage.toLowerCase().includes("upi id") ? "error-input" : ""}
                          />
                          <p className="field-hint">e.g. name@bank, phone@ybl</p>
                        </div>
                      </div>
                    )}

                    {/* Net Banking Form */}
                    {activeMethod === "netbanking" && (
                      <div className="netbanking-form-wrapper fade-in">
                        <div className="netbanking-header">
                          <label>Net Banking</label>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzQOaF5p0b5zPq6b_dE1wP8s9Xw_Q4F2z8Pg&s"
                            alt="Net Banking"
                            className="nb-logo"
                          />
                        </div>

                        <div className="input-field-group">
                          <label htmlFor="bankSelect">Select Bank</label>
                          <select
                            id="bankSelect"
                            value={bank}
                            onChange={handleBankChange}
                            className={errorMessage.toLowerCase().includes("bank") ? "error-input" : ""}
                          >
                            <option value="">-- Choose Your Bank --</option>
                            <optgroup label="Popular Banks">
                              <option value="State Bank of India">State Bank of India (SBI)</option>
                              <option value="HDFC Bank">HDFC Bank</option>
                              <option value="ICICI Bank">ICICI Bank</option>
                              <option value="Axis Bank">Axis Bank</option>
                              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                            </optgroup>
                            <optgroup label="Other Major Banks">
                              <option value="IndusInd Bank">IndusInd Bank</option>
                              <option value="Yes Bank">Yes Bank</option>
                              <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
                              <option value="Federal Bank">Federal Bank</option>
                              <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                              <option value="Bank of Baroda">Bank of Baroda</option>
                              <option value="Canara Bank">Canara Bank</option>
                              <option value="Union Bank of India">Union Bank of India</option>
                              <option value="Indian Bank">Indian Bank</option>
                              <option value="UCO Bank">UCO Bank</option>
                              <option value="Central Bank of India">Central Bank of India</option>
                              <option value="South Indian Bank">South Indian Bank</option>
                              <option value="Bank of India">Bank of India</option>
                              <option value="IDBI Bank">IDBI Bank</option>
                              <option value="Bandhan Bank">Bandhan Bank</option>
                              <option value="Karur Vysya Bank">Karur Vysya Bank</option>
                              <option value="Karnataka Bank">Karnataka Bank</option>
                              <option value="RBL Bank">RBL Bank</option>
                              <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                              <option value="Citibank">Citibank</option>
                              <option value="HSBC Bank">HSBC Bank</option>
                            </optgroup>
                          </select>
                        </div>

                        {bank && (
                          <div className="netbanking-credentials-box fade-in" style={{ marginTop: "20px", borderTop: "1px dashed var(--border-color)", paddingTop: "20px" }}>
                            <div className="secure-badge" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#1B9C52", marginBottom: "15px", fontWeight: "600" }}>
                              <FaLock />
                              <span>Redirecting to secured {bank} NetBanking login page</span>
                            </div>
                            
                            <div className="input-field-group" style={{ marginBottom: "15px" }}>
                              <label htmlFor="nbUser">Customer ID / User ID</label>
                              <input
                                type="text"
                                id="nbUser"
                                placeholder="Enter Customer ID"
                                value={netbankingUser}
                                onChange={handleNetbankingUserChange}
                                className={errorMessage.toLowerCase().includes("customer id") ? "error-input" : ""}
                              />
                            </div>
                            
                            <div className="input-field-group">
                              <label htmlFor="nbPass">Password / IPIN</label>
                              <input
                                type="password"
                                id="nbPass"
                                placeholder="Enter NetBanking Password"
                                value={netbankingPass}
                                onChange={handleNetbankingPassChange}
                                className={errorMessage.toLowerCase().includes("password") ? "error-input" : ""}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* COD Info */}
                    {activeMethod === "cod" && (
                      <div className="cod-form-wrapper fade-in">
                        <div className="cod-info-alert">
                          <p>
                            <strong>Cash on Delivery (COD) Selected:</strong> Pay ₹{currentOrder.total.toLocaleString()} in cash to our courier partner at the time of delivery.
                          </p>
                          <span className="cod-tagline">No extra handling fee applies.</span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* General Error Message */}
                  {errorMessage && (
                    <div className="payment-error-alert fade-in">
                      <FaTimesCircle />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit and Navigation */}
                  <div className="form-submit-row">
                    <button
                      type="submit"
                      className={`payment-form-pay-btn ${loading ? "loading" : ""}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span> Processing...
                        </>
                      ) : (
                        `PAY ₹${currentOrder.total.toLocaleString()}`
                      )}
                    </button>
                    
                    <button
                      type="button"
                      className="payment-form-back-btn"
                      onClick={() => navigate("/checkout")}
                      disabled={loading}
                    >
                      <FaArrowLeft /> Back to Checkout
                    </button>
                  </div>
                </form>

                <div className="secured-footer">
                  <FaLock />
                  <span>256-Bit SSL Secured Transaction. All details are encrypted.</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
