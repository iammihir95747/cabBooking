import React from 'react';
import Footer from '../components/Footer/Footer';
import './Services.css';

const Services = () => {
  return (
    <div className='service'>
        <section className="services">
      <h2>Our Services</h2>
      <p>Experience hassle-free, reliable, and affordable cab services across Gujarat. Whether you're traveling for business, leisure, or daily commuting, we have the perfect ride for you!</p>

      <div className="service-grid">
        {/* City Rides */}
        <div className="service-card">
          <h3>City Rides</h3>
          <p>Enjoy smooth and convenient rides within the city. Whether you need a ride to work, shopping malls, or restaurants, we ensure timely pickup and comfortable travel.</p>
        </div>

        {/* Airport Transfers */}
        <div className="service-card">
          <h3>Airport Transfers</h3>
          <p>Never miss a flight! Get on-time airport pick-ups and drop-offs with our reliable airport transfer services, ensuring a stress-free journey.</p>
        </div>

        {/* Outstation Trips */}
        <div className="service-card">
          <h3>Outstation Trips</h3>
          <p>Planning a getaway? Book our long-distance rides to explore cities outside Gujarat with ease. Comfortable cabs with experienced drivers make road trips enjoyable.</p>
        </div>

        {/* Business Travel */}
        <div className="service-card">
          <h3>Corporate Travel</h3>
          <p>We offer professional chauffeur services tailored for business professionals. Book corporate rides for meetings, events, or employee transportation with flexible scheduling.</p>
        </div>

        {/* Rental Services */}
        <div className="service-card">
          <h3>Hourly Rentals</h3>
          <p>Need a cab for a few hours? Our hourly rental services allow you to book a vehicle on-demand for multiple stops, meetings, or shopping sprees.</p>
        </div>

        {/* Luxury Car Services */}
        <div className="service-card">
          <h3>Luxury Car Services</h3>
          <p>Experience premium travel in luxury sedans and SUVs. Perfect for special occasions, weddings, or VIP travel needs.</p>
        </div>
      </div>
    </section>

      <div className="footersec">
        <Footer />
        </div>
    </div>
  )
}

export default Services
