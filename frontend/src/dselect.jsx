// DepartmentList.js (Updated)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateDepartment from './UpdateDepartment';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:3000/departments');
      setDepartments(res.data);
    } catch (error) {
      console.error('Failed to fetch departments', error);
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
    fetchDepartments(); // Refresh department list after update
  };

  return (
    <div className="mt-5">
      <h3 className="text-center mb-4">Department List</h3>
      {selectedDeptCode ? (
        <UpdateDepartment d_code={selectedDeptCode} onUpdate={handleUpdateComplete} />
      ) : (
        <table className="table table-bordered table-striped">
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
                    className="btn btn-warning"
                    onClick={() => handleEdit(dept.d_code)}
                  >
                    Edit
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
