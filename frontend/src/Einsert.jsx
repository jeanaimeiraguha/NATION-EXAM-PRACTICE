import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Einsert = () => {
  const navigate=useNavigate()
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [gender, setGender] = useState('');
  const [h_date, setH_date] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    axios
      .post('http://localhost:3000/eadd', {
        fname,
        lname,
        position,
        address,
        telephone,
        gender,
        h_date,
      })
      .then((res) => {
        alert('Employee added successfully');
        navigate('/employees')
        // Clear form fields after successful submission
        setFname('');
        setLname('');
        setPosition('');
        setAddress('');
        setTelephone('');
        setGender('');
        setH_date('');
      })
      .catch((err) => {
        console.error('Failed to add employee:', err);
        setError('Failed to add employee. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Position:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Telephone:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Gender:</label>
            <select
              className="form-select form-select-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Hire Date:</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={h_date}
            onChange={(e) => setH_date(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm w-100">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Einsert;