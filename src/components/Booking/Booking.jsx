import React, { useEffect, useState } from 'react';
import './Booking.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import PhoneAuthModal from '../PhoneAuthModal/PhoneAuthModal'; 

const API_BASE = "http://localhost:5001";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: "",
    bookingType: "one-way",
    notes: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auto-auth check on mount
  useEffect(() => {
    const verified = localStorage.getItem("isPhoneVerified");
    if (!verified) {
      alert("You are not authorized. Redirecting to verification...");
      setTimeout(() => setShowAuthModal(true), 1000);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please verify your phone before booking.");
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          pickupLocation: "",
          dropoffLocation: "",
          pickupDateTime: "",
          bookingType: "one-way",
          notes: "",
        });
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error making booking:", error);
      alert("Failed to submit booking. Please try again later.");
    }
  };

  return (
    <div className="booking-container">
      {/* Phone Auth Popup */}
      <PhoneAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onVerified={() => {
          setIsAuthenticated(true);
          localStorage.setItem("isPhoneVerified", "true");
        }}
      />

      {/* Contact Info */}
      <div className="contact-info-box">
        <h2 className="contact-subtitle">We'd Love To Serve You</h2>
        <h1 className="contact-title">CONTACT INFORMATION</h1>
        <div className="contact-section"><FaMapMarkerAlt className="contact-icon" /><div><h3>Address</h3><p>The Grand Monarch, located near Seema Hall in Prahlad Nagar, Ahmedabad - 380015</p></div></div>
        <div className="contact-section"><FaPhoneAlt className="contact-icon" /><div><h3>Phone</h3><p>+91 9054891423</p></div></div>
        <div className="contact-section"><FaEnvelope className="contact-icon" /><div><h3>Email</h3><p>gohelvivek0000@gmail.com</p></div></div>
      </div>

      {/* Booking Form */}
      <div className="contact-form-box">
        <h2>Book a ride !</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

          <div className="input-with-icon"><FaMapMarkerAlt className="input-icon" />
            <input type="text" name="pickupLocation" placeholder="Pickup Location" value={formData.pickupLocation} onChange={handleChange} />
          </div>

          <div className="input-with-icon"><FaMapMarkerAlt className="input-icon" />
            <input type="text" name="dropoffLocation" placeholder="Dropoff Location" value={formData.dropoffLocation} onChange={handleChange} />
          </div>

          <input type="datetime-local" name="pickupDateTime" value={formData.pickupDateTime} onChange={handleChange} />

          <select name="bookingType" value={formData.bookingType} onChange={handleChange}>
            <option value="one-way">One-way</option>
            <option value="round-trip">Round-trip</option>
            <option value="tour">Tour</option>
          </select>

          <textarea name="notes" placeholder="Any Special Instructions" value={formData.notes} onChange={handleChange} />
          <button type="submit">SUBMIT BOOKING</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
