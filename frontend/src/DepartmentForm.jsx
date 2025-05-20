import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    d_code: '',
    d_name: '',
    gross_salary: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // {type: 'success' | 'error', text: string}

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(null);
  };

  const isFormValid = () =>
    formData.d_code.trim() !== '' &&
    formData.d_name.trim() !== '' &&
    formData.gross_salary !== '' &&
    Number(formData.gross_salary) > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    setMessage(null);

    try {
      await axios.post('http://localhost:3000/departments', formData);
      setMessage({ type: 'success', text: 'Department added successfully!' });
      setFormData({ d_code: '', d_name: '', gross_salary: '' });
      setTimeout(() => navigate('/departmentList'), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding department: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4">Add Department</h3>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="d_code" className="form-label">
            Department Code
          </label>
          <input
            type="text"
            className="form-control"
            id="d_code"
            name="d_code"
            value={formData.d_code}
            onChange={handleChange}
            placeholder="Enter code, e.g., HR01"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="d_name" className="form-label">
            Department Name
          </label>
          <input
            type="text"
            className="form-control"
            id="d_name"
            name="d_name"
            value={formData.d_name}
            onChange={handleChange}
            placeholder="Enter department name"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gross_salary" className="form-label">
            Gross Salary
          </label>
          <input
            type="number"
            className="form-control"
            id="gross_salary"
            name="gross_salary"
            value={formData.gross_salary}
            onChange={handleChange}
            placeholder="Enter gross salary amount"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isFormValid() || loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>

      {message && (
        <div
          className={`alert mt-4 ${
            message.type === 'success' ? 'alert-success' : 'alert-danger'
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default DepartmentForm;
