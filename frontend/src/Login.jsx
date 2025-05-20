import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Prevent back navigation after login
  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };
    preventBack();
    window.onpopstate = preventBack;

    return () => {
      window.onpopstate = null; // clean up on unmount
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/login', { name, password });
      alert(`Welcome ${name}`);
      setName('');
      setPassword('');
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2 className='text-center mt-4 text-primary'>Login Here</h2>
      <div className='d-flex justify-content-center pt-4'>
        <form onSubmit={handleSubmit} className='bg-light p-4 rounded shadow-sm w-50'>
          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className='form-control'
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className='btn btn-info btn-sm'>
              Login
            </button>
            <Link to="/register" className='btn btn-success btn-sm'>
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
