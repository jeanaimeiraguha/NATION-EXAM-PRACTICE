import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name ||  !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    axios.post("http://localhost:3000/register", { name, password })
      .then((res) => {
        alert("Account created successfully!");
        navigate('/login'); // Redirect to login page after successful signup
      })
      .catch((err) => {
        console.error("Signup failed:", err);
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  return (
    <div>
      <h2 className='text-center mt-4 text-primary'>Create an Account</h2>
      <div className='d-flex justify-content-center pt-4'>
        <form onSubmit={handleSubmit} className='bg-light p-4 rounded shadow-sm w-50'>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className='form-control'
              placeholder="Enter your name"
              required
            />
          </div>


          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='form-control'
              placeholder="Enter your password"
              required
            />
          </div>

          <button className='btn btn-sm btn-info me-2'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
