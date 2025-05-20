import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({
    gross_salary: '',
    total_deduction: '',
    month: '',
  });
  const [editId, setEditId] = useState(null);

  // Fetch all salary records from the backend
  const fetchSalaries = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3000/salaries');
      setSalaries(res.data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
      setSalaries([]);
    }
  }, []);

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ['gross_salary', 'total_deduction'].includes(name)
      ? parseInt(value) || ''  // Ensure that gross_salary and total_deduction are integers
      : value;

    setForm({ ...form, [name]: parsedValue });
  };

  // Handle form submission for both Add and Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse inputs as integers
    const gross = parseInt(form.gross_salary) || 0;
    const deduction = parseInt(form.total_deduction) || 0;

    // Convert month to integer (e.g., "2024-05" → 202405)
    const monthInt = parseInt(form.month.replace('-', '')) || 0;

    // Calculate netsalary
    const netsalary = gross - deduction;

    const payload = {
      gross_salary: gross,
      total_deduction: deduction,
      netsalary,
      month: monthInt,  // Pass month as an integer
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/salaries/${editId}`, payload);
      } else {
        await axios.post('http://localhost:3000/salaries', payload);
      }
      setForm({ gross_salary: '', total_deduction: '', month: '' });
      setEditId(null);
      fetchSalaries(); // Reload salaries after submission
    } catch (error) {
      console.error('Error saving salary:', error);
    }
  };

  // Pre-fill the form for editing an existing salary
  const handleEdit = (salary) => {
    const monthStr = `${String(salary.month).slice(0, 4)}-${String(salary.month).slice(4)}`; // Convert month integer to "YYYY-MM"
    setForm({
      gross_salary: salary.gross_salary,
      total_deduction: salary.total_deduction,
      month: monthStr,
    });
    setEditId(salary.month);  // Use month (integer) as edit ID
  };

  // Handle deleting a salary entry
  const handleDelete = async (month) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this salary entry?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/salaries/${month}`);
      fetchSalaries(); // Reload salaries after deletion
    } catch (error) {
      console.error('Error deleting salary:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Salary Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              name="gross_salary"
              type="number"
              className="form-control"
              placeholder="Gross Salary"
              value={form.gross_salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              name="total_deduction"
              type="number"
              className="form-control"
              placeholder="Total Deduction"
              value={form.total_deduction}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              name="month"
              type="month"
              className="form-control"
              value={form.month}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Gross Salary</th>
              <th>Total Deduction</th>
              <th>Net Salary</th>
              <th>Month</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.length > 0 ? (
              salaries.map((salary) => (
                <tr key={salary.id || salary.month}>
                  <td>{salary.id || salary.month}</td>
                  <td>{Number(salary.gross_salary).toFixed(2)}</td>
                  <td>{Number(salary.total_deduction).toFixed(2)}</td>
                  <td>{Number(salary.netsalary).toFixed(2)}</td>
                  <td>{`${String(salary.month).slice(0, 4)}-${String(salary.month).slice(4)}`}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(salary)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(salary.month)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No salaries available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salary;
