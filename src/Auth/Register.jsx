import {  useState } from "react";
import "./Auth.css";
import { useSearchParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const API_BASE = "http://localhost:5173";

const Register = () => {

  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  const [formData, setFormData] = useState({
    username: "", 
    email: "", 
    password: "", 
    address: "", 
    phone: "", 
    agreeTerms: false,
    role:role,
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed ❌");

      toast.success("✅ Registration Successful!");
      setFormData({ 
        username: "", 
        email: "", 
        password: "", 
        address: "", 
        phone: "", 
        agreeTerms: false , role:role
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <form className="form-block" autoComplete="off" onSubmit={handleSubmit}>
          <center>
            <h5 className="titilereg">
              SignUp <br />
              <span className="actext">Welcome to SteadyDuskApp</span>
            </h5>
          </center>
          <div>
            <input className="form-item" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" required />
          </div>
          <div>
            <input className="form-item" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
          </div>
          <div>
            <input className="form-item" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
          </div>
          <div>
            <input className="form-item" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required />
          </div>
          <div>
            <input className="form-item" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone Number" required />
            <h3>Signin as a {role}</h3>
          </div>

          <button className="sub" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <div>
            <Toaster position="top-right" reverseOrder={false} color='#fff' />
          </div>
          <div className="policy">
            By clicking Sign up you agree to our
            <a href=""> Terms of Use</a> and <a href="">Privacy policy.</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
