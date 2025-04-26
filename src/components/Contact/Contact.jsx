import React, { useState } from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import Footer from '../Footer/Footer';
import { toast, Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: "", email: "", phoneNumber: "", message: "" });
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <>
      {/* Toaster Component at Top Level */}
      <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    style: {
      background: 'black',
      color:'white',
    },
  }}
/>



      <div className="contact-container">
        <div className="contact-info-box">
          <h2 className="contact-subtitle">We'd Love To Hear From You</h2>
          <h1 className="contact-title">CONTACT US</h1>

          <div className="contact-section">
            <FaMapMarkerAlt className="contact-icon" />
            <div>
              <h3>Find Us Here</h3>
              <p>
                Near Shiv Lehri Hotel, Under Bridge Road,<br />
                Samarpan, Jamnagar, 361004
              </p>
            </div>
          </div>

          <div className="contact-section">
            <FaPhoneAlt className="contact-icon" />
            <div>
              <h3>Get In Touch</h3>
              <p>+91 7069996009<br />Info@dwarkeshcab.in</p>
            </div>
          </div>

          <div className="contact-section">
            <FaClock className="contact-icon" />
            <div>
              <h3>Calling Hours</h3>
              <p>Mon- Fri: 9am - 8pm<br />Sat-sun: 10am - 4pm</p>
            </div>
          </div>
        </div>

        <div className="contact-form-box">
          <h2 className="form-heading">
            Take The First Step, We<br />Will Take Care For The Rest
          </h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
