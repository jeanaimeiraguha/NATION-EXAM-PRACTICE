import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateDepartment from './UpdateDepartment';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/departments');
      setDepartments(res.data);
    } catch (error) {
      console.error('Failed to fetch departments', error);
      alert('Error fetching departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleEdit = (d_code) => {
    setSelectedDeptCode(d_code);
  };

  const handleUpdateComplete = () => {
    setSelectedDeptCode(null);
    fetchDepartments();
  };

  const handleDelete = async (d_code) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this department?');
    if (!confirmDelete) return;

    setActionLoading(true);
    try {
      const res = await axios.delete(`http://localhost:3000/departments/${d_code}`);
      if (res.status === 200) {
        alert('Department deleted successfully');
        fetchDepartments();
      }
    } catch (error) {
      console.error('Failed to delete department', error.response ? error.response.data : error.message);
      alert('Failed to delete department');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="mt-5 container" style={{ maxWidth: '900px' }}>
      <h3 className="text-center mb-4">Department List</h3>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading departments...</p>
        </div>
      ) : selectedDeptCode ? (
        <UpdateDepartment d_code={selectedDeptCode} onUpdate={handleUpdateComplete} />
      ) : departments.length === 0 ? (
        <p className="text-center">No departments found. Please add some.</p>
      ) : (
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Department Code</th>
              <th>Department Name</th>
              <th>Gross Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.d_code}>
                <td>{dept.d_code}</td>
                <td>{dept.d_name}</td>
                <td>{dept.gross_salary}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(dept.d_code)}
                    disabled={actionLoading}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(dept.d_code)}
                    disabled={actionLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentList;
