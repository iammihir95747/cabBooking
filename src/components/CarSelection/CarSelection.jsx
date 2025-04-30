import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarSelection.css'; // Custom styling

const API_VITE = "http://localhost:5001"

const CarSelection = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
        try {
            const response = await axios.get(`${API_VITE}/api/vehicles/available`);  // Public route, no auth token required
            console.log('Fetched available vehicles:', response.data);  // Log the fetched data
            setCars(response.data);  // Assuming `setCars` updates state for the list of vehicles
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cars:', error.response?.data || error.message);
            setError("Failed to load cars.");
            setLoading(false);
        }
    };

    fetchCars();
  }, []);

  const handleBookNow = (car) => {
    const token = localStorage.getItem('token');
    navigate('/Booking', {
      state: {
        selectedCar: car,
        token,
      },
    });
  };

  return (
    <section id="car-selection" className="container my-5">
      <h2 className="text-center mb-4">Select a Car</h2>
      <div className="row justify-content-center">
        {loading ? (
          <p>🚗 Car is loading...</p>
        ) : error ? (
          <p className="text-danger">❌ {error}</p>
        ) : (
          cars.map((car, index) => (
            <div key={index} className="car-card col-md-4 mb-4">
              <div className="card h-100 text-center shadow p-3">
                <img
                  src={car.imageUrl}
                  alt={car.modelName}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{car.modelName}</h5>
                  <p className="card-text">Type: {car.type}</p>
                  <p className="card-text">Seats: {car.capacity}</p>
                  <p className="card-text">Rate: ₹{car.ratePerKm}/km</p>
                  <p className="card-text">Base Fare: ₹{car.baseFare}</p>
                  <button className="btn btn-primary" onClick={() => handleBookNow(car)}>Book Now</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CarSelection;
