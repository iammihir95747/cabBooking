import React, { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: "",
    bookingType: "one-way", // Default type is "one-way"
    notes: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form data being sent:", formData);
  
    const bookingData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      pickupLocation: { description: formData.pickupLocation },
      dropoffLocation: { description: formData.dropoffLocation },
      pickupDateTime: formData.pickupDateTime,
      bookingType: formData.bookingType,
      notes: formData.notes,
    };
  
    try {
      const response = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        if (result?.message?.toLowerCase().includes("duplicate")) {
          setApiError("Duplicate booking found. Please check your booking details.");
        } else {
          setApiError(result?.message || "Something went wrong.");
        }
        return;
      }
  
      setMessage("Booking submitted successfully!");
      setApiError("");
      setSubmittedData(bookingData);
    } catch (err) {
      console.error("Error making the booking:", err);
      setApiError("Something went wrong.");
    }
  };
  

  return (
    <div className="booking-form">
      <h2>Book a Ride</h2>
      {apiError && <p className="error-message">{apiError}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pickupLocation">Pickup Location</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropoffLocation">Dropoff Location</label>
          <input
            type="text"
            id="dropoffLocation"
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pickupDateTime">Pickup Date & Time</label>
          <input
            type="datetime-local"
            id="pickupDateTime"
            name="pickupDateTime"
            value={formData.pickupDateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bookingType">Booking Type</label>
          <select
            id="bookingType"
            name="bookingType"
            value={formData.bookingType}
            onChange={handleChange}
            required
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
            <option value="tour">Tour</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requests?"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Booking
        </button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h3>Booking Submitted:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Booking;
