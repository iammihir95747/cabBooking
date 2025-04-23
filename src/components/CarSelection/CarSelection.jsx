import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarSelection.css'; // Custom styling

const CarSelection = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const response = await axios.get('http://localhost:5001/api/vehicles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched cars:', response.data);

        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          setCars([response.data]);
        }
      } catch (error) {
        console.error('Error fetching cars:', error.response?.data || error.message);
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
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div key={index} className="car-card col-md-4 mb-4">
              <div className="card h-100 text-center shadow p-3">
                <img src={car.imageUrl} alt={car.modelName} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
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
        ) : (
          <p>Loading car details...</p>
        )}
      </div>
    </section>
  );
};

export default CarSelection;
