import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Eselect = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    position: '',
    address: '',
    telephone: '',
    gender: '',
    h_date: '',
  });

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get('http://localhost:3000/employees')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch(() => {
        alert('Failed to fetch employees');
      });
  };

  // Handle delete
  const deleteEmployee = (e_n) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/employees/${e_n}`)
        .then(() => {
          alert('Employee deleted successfully');
          fetchEmployees();
        })
        .catch(() => {
          alert('Failed to delete employee');
        });
    }
  };

  // Handle edit
  const handleEdit = (employee) => {
    setEditingEmployee(employee.e_n);
    setFormData({
      fname: employee.fname,
      lname: employee.lname,
      position: employee.position,
      address: employee.address,
      telephone: employee.telephone,
      gender: employee.gender,
      h_date: employee.h_date,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  // Handle update
  const updateEmployee = (e_n) => {
    axios
      .put(`http://localhost:3000/employees/${e_n}`, formData)
      .then(() => {
        alert('Employee updated successfully');
        setEditingEmployee(null);
        fetchEmployees();
      })
      .catch(() => {
        alert('Failed to update employee');
      });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic form validation to enable update button
  const isFormValid = () => {
    const { fname, lname, position, address, telephone, gender, h_date } = formData;
    return fname && lname && position && address && telephone && gender && h_date;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>List Of Employees</h2>
        <Link to="/einsert" className="btn btn-success">
          Add New Employee
        </Link>
      </div>

      <table className="table table-bordered table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Gender</th>
            <th>Hire Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center text-muted">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((data) => (
              <tr key={data.e_n} style={{ cursor: 'pointer' }}>
                <td>{data.e_n}</td>
                <td>{data.fname}</td>
                <td>{data.lname}</td>
                <td>{data.position}</td>
                <td>{data.address}</td>
                <td>{data.telephone}</td>
                <td>{data.gender}</td>
                <td>{data.h_date}</td>
                <td className="text-center">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(data)}
                    title="Edit Employee"
                    style={{ transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmployee(data.e_n)}
                    title="Delete Employee"
                    style={{ transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editingEmployee && (
        <div
          className="card mt-5 shadow-lg"
          style={{ animation: 'fadeIn 0.5s ease-in-out' }}
        >
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Edit Employee</h5>
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid()) updateEmployee(editingEmployee);
                else alert('Please fill all fields correctly.');
              }}
              noValidate
            >
              {[
                { label: 'First Name', name: 'fname', type: 'text' },
                { label: 'Last Name', name: 'lname', type: 'text' },
                { label: 'Position', name: 'position', type: 'text' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'Telephone', name: 'telephone', type: 'tel' },
              ].map(({ label, name, type }) => (
                <div className="mb-3" key={name}>
                  <label htmlFor={name} className="form-label">
                    {label}:
                  </label>
                  <input
                    id={name}
                    type={type}
                    name={name}
                    className="form-control"
                    value={formData[name]}
                    onChange={handleInputChange}
                    required
                    style={{ transition: 'border-color 0.3s' }}
                    onFocus={(e) => (e.target.style.borderColor = '#0d6efd')}
                    onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                  />
                </div>
              ))}

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#0d6efd')}
                  onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="h_date" className="form-label">
                  Hire Date:
                </label>
                <input
                  id="h_date"
                  type="date"
                  name="h_date"
                  className="form-control"
                  value={formData.h_date}
                  onChange={handleInputChange}
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#0d6efd')}
                  onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                />
              </div>

              <div className="d-flex align-items-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!isFormValid()}
                  style={{ minWidth: '130px' }}
                >
                  Update Employee
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={() => setEditingEmployee(null)}
                  style={{ minWidth: '100px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS for fadeIn animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .table-hover tbody tr:hover {
            background-color: #f1f9ff !important;
          }
        `}
      </style>
    </div>
  );
};

export default Eselect;
