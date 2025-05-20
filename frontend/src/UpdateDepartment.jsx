// UpdateDepartment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateDepartment = ({ d_code, onUpdate }) => {
  const [formData, setFormData] = useState({
    d_code: '',
    d_name: '',
    gross_salary: ''
  });

  useEffect(() => {
    // Fetch the department data for editing when the component loads
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/departments/${d_code}`);
        setFormData(res.data);
      } catch (error) {
        alert('Failed to fetch department for update');
      }
    };

    if (d_code) {
      fetchDepartment();
    }
  }, [d_code]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/departments/${d_code}`, formData);
      alert('Department updated successfully!');
      onUpdate(); // Refresh the department list
    } catch (error) {
      alert('Error updating department: ' + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Update Department</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Department Code</label>
          <input
            type="text"
            className="form-control"
            name="d_code"
            value={formData.d_code}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department Name</label>
          <input
            type="text"
            className="form-control"
            name="d_name"
            value={formData.d_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gross Salary</label>
          <input
            type="number"
            className="form-control"
            name="gross_salary"
            value={formData.gross_salary}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateDepartment;
