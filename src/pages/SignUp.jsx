import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null); // For success/error messages
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error for the specific field

  };
  const validateInputs = () => {
    const newErrors = {};
    if (cred.name.length < 6) {
      newErrors.name = "Name must be at least 6 characters long.";
    }
    if (cred.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
        return;
      }
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cred),
      });

      const json = await response.json();
      if (json.success) {
        setMessage("Successfully signed up! Please log in.");
      } else {
        setMessage(json.error || "Sign up failed! Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f7f7f7' }}>
      <form onSubmit={handleSubmit} style={{ padding: '40px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <nav style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Login</Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: '#007bff' }}>Sign Up</Link>
        </nav>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
        <div style={{width:"360px"}}>


        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={cred.name} 
          onChange={onChange} 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />        {errors.name && <p className="error-text">{errors.name}</p>}

        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={cred.email} 
          onChange={onChange} 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />          
          {errors.email && <p className="error-text">{errors.email}</p>}

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={cred.password} 
          onChange={onChange} 
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
          {errors.password && <p className="error-text" >{errors.password}</p>}
          </div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Sign Up
        </button>
        {message && (
          <p style={{ marginTop: '20px', color: message.includes("success") ? "green" : "red", textAlign: 'center' }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
