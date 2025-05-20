import React, { useState } from 'react';

const EmployeeReport = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice', department: 'HR', salary: 50000 },
    { id: 2, name: 'Bob', department: 'Engineering', salary: 80000 },
    { id: 3, name: 'Charlie', department: 'Marketing', salary: 60000 },
    { id: 4, name: 'David', department: 'Engineering', salary: 75000 },
    { id: 5, name: 'Eve', department: 'HR', salary: 55000 },
  ]);

  const renderTableRows = () => {
    return employees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.department}</td>
        <td>{employee.salary}</td>
      </tr>
    ));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Department and Salary Report</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      {/* <button onclick={()=>window.print()}>Print</button>
       */}
       {/* <button onclick={()}></ button> */}
    </div>
  );
};

export default EmployeeReport;
