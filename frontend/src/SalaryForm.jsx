import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalaryForm = ({ updateMode, salaryId, fetchSalaries }) => {
  const [grossSalary, setGrossSalary] = useState('');
  const [totalDeduction, setTotalDeduction] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // For editing an existing salary
  useEffect(() => {
    if (updateMode && salaryId) {
      axios.get(`http://localhost:5000/salaries/${salaryId}`)
        .then(response => {
          const { gross_salary, total_deduction, month } = response.data;
          setGrossSalary(gross_salary);
          setTotalDeduction(total_deduction);
          setMonth(month);
        })
        .catch(error => {
          console.error('Error fetching salary data for update', error);
        });
    }
  }, [updateMode, salaryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate input fields
    if (isNaN(grossSalary) || isNaN(totalDeduction) || isNaN(month)) {
      setError('All fields must be valid numbers.');
      return;
    }

    const payload = {
      gross_salary: parseFloat(grossSalary),
      total_deduction: parseFloat(totalDeduction),
      month,
    };

    try {
      if (updateMode) {
        // Update salary
        await axios.put(`http://localhost:5000/salaries/${salaryId}`, payload);
      } else {
        // Add salary
        await axios.post('http://localhost:5000/salaries', payload);
      }
      setSuccessMessage('Salary details successfully submitted!');
      fetchSalaries(); // Fetch updated salary data
      clearForm();
    } catch (error) {
      setError('An error occurred while processing your request.');
    }
  };

  const clearForm = () => {
    setGrossSalary('');
    setTotalDeduction('');
    setMonth('');
  };

  return (
    <div className="form-container">
      <h2>{updateMode ? 'Update Salary' : 'Add Salary'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="grossSalary">Gross Salary:</label>
          <input
            type="number"
            id="grossSalary"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalDeduction">Total Deduction:</label>
          <input
            type="number"
            id="totalDeduction"
            value={totalDeduction}
            onChange={(e) => setTotalDeduction(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="month">Month:</label>
          <input
            type="text"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <button type="submit">{updateMode ? 'Update Salary' : 'Add Salary'}</button>

        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </form>
    </div>
  );
};

export default SalaryForm;
