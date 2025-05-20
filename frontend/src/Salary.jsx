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

  // Fetch salaries
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

  // Format YYYYMM to YYYY-MM
  const formatMonth = (monthInt) => {
    const str = String(monthInt);
    return `${str.slice(0, 4)}-${str.slice(4)}`;
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ['gross_salary', 'total_deduction'].includes(name)
      ? parseInt(value, 10) || ''
      : value;
    setForm({ ...form, [name]: parsedValue });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const gross = parseInt(form.gross_salary, 10) || 0;
    const deduction = parseInt(form.total_deduction, 10) || 0;

    if (deduction > gross) {
      alert("Total deduction cannot exceed gross salary.");
      return;
    }

    const monthInt = form.month ? parseInt(form.month.replace('-', ''), 10) : 0;
    const netsalary = gross - deduction;

    const payload = {
      gross_salary: gross,
      total_deduction: deduction,
      netsalary,
      month: monthInt,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/salaries/${editId}`, payload);
        alert('Salary updated successfully!');
      } else {
        await axios.post('http://localhost:3000/salaries', payload);
        alert('Salary added successfully!');
      }

      setForm({ gross_salary: '', total_deduction: '', month: '' });
      setEditId(null);
      fetchSalaries();
    } catch (error) {
      console.error('Error saving salary:', error);
      alert('Failed to save salary');
    }
  };

  // Handle edit
  const handleEdit = (salary) => {
    const monthStr = formatMonth(salary.month);
    setForm({
      gross_salary: salary.gross_salary,
      total_deduction: salary.total_deduction,
      month: monthStr,
    });
    setEditId(salary.id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this salary entry?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/salaries/${id}`);
      alert('Salary deleted successfully!');
      fetchSalaries();
    } catch (error) {
      console.error('Error deleting salary:', error);
      alert('Failed to delete salary');
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
                <tr key={salary.id}>
                  <td>{salary.id}</td>
                  <td>{Number(salary.gross_salary).toLocaleString()}</td>
                  <td>{Number(salary.total_deduction).toLocaleString()}</td>
                  <td>{Number(salary.netsalary).toLocaleString()}</td>
                  <td>{formatMonth(salary.month)}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(salary)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(salary.id)}
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
