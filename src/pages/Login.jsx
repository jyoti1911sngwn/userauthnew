import React, { useState } from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null); // To store success/error messages

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cred.email, password: cred.password }),
      });

      const json = await response.json();
      if (json.success) {
        setMessage("Successfully logged in!");
      } else {
        setMessage("Login failed! Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f7f7f7' }}>
      <form onSubmit={handleSubmit} style={{  padding: '40px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <nav style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Login</Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: '#007bff' }}>Sign Up</Link>
        </nav>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
       <div style={{width: "350px"}}> <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={cred.email} 
          onChange={onChange} 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={cred.password} 
          onChange={onChange} 
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} 
        /></div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Login
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

export default Login;
