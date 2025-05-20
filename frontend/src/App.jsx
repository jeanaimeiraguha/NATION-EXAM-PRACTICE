import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS animation styles

import Einsert from './Einsert';
import Eselect from './Eselect';
import DepartmentList from './DepartmentList';
import DepartmentForm from './DepartmentForm';
import Salary from './Salary';
import SalaryForm from './SalaryForm';
import Login from './Login';
import Signup from './Signup';
import Report from './Report';
import './App.css';

const Home = () => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(t => new bootstrap.Tooltip(t));

    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="container my-5">
      <div id="welcomeCarousel" className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="4000" data-aos="fade-in">
        <div className="carousel-inner rounded shadow-sm">
          <div className="carousel-item active bg-success text-white p-5">
            <h2>Welcome to Employee Payroll Management System</h2>
            <p>Your one-stop solution for efficient and secure payroll management.</p>
          </div>
          <div className="carousel-item bg-primary text-white p-5">
            <h2>Manage Departments Easily</h2>
            <p>Create, update and view departments effortlessly.</p>
          </div>
          <div className="carousel-item bg-info text-white p-5">
            <h2>Track Salaries & Reports</h2>
            <p>Stay on top of payments and generate detailed reports.</p>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="row text-center" data-aos="fade-up">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100" data-aos="zoom-in">
            <div className="card-body d-flex flex-column justify-content-center">
              <h3 className="card-title">Department Management</h3>
              <p className="card-text">Add new departments or view existing ones with ease.</p>
              <Link
                to="/department"
                className="btn btn-success btn-lg"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Go to Department Management"
              >
                <i className="bi bi-building me-2"></i> Manage Departments
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100" data-aos="zoom-in">
            <div className="card-body d-flex flex-column justify-content-center">
              <h3 className="card-title">Salary & Reports</h3>
              <p className="card-text">Handle employee salaries and generate reports efficiently.</p>
              <Link
                to="/salary"
                className="btn btn-info btn-lg"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="View Salary and Reports"
              >
                <i className="bi bi-cash-stack me-2"></i> Salary & Reports
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5" data-aos="fade-up">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#welcomeModal"
        >
          <i className="bi bi-info-circle me-2"></i> More Info
        </button>
      </div>

      <div className="modal fade" id="welcomeModal" tabIndex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" data-aos="zoom-in">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="welcomeModalLabel">Welcome!</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              This system helps you manage employee payroll, departments, salaries, and reports easily and securely.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Department = () => (
  <div className="text-center mt-4" data-aos="fade-up">
    <h2>Department Management</h2>
    <div className="d-flex flex-column align-items-center gap-3 mt-3">
      <Link to="/department/add" className="btn btn-primary btn-lg">
        <i className="bi bi-plus-circle me-2"></i> Add Department
      </Link>
      <Link to="/departmentlist" className="btn btn-secondary btn-lg">
        <i className="bi bi-list-ul me-2"></i> View Departments
      </Link>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-briefcase-fill me-2"></i> Employee Payroll MS
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home"><i className="bi bi-house-door-fill me-1"></i> Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/employees"><i className="bi bi-people-fill me-1"></i> Employees</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/department"><i className="bi bi-building me-1"></i> Department</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/salary"><i className="bi bi-cash-coin me-1"></i> Salary</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/report"><i className="bi bi-clipboard-data me-1"></i> Report</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/"><i className="bi bi-box-arrow-right me-1"></i> Logout</Link>
                </li>
                <li className="nav-item d-flex align-items-center ms-3">
                  <div className="form-check form-switch text-white mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="darkModeToggle"
                      onChange={() => {
                        document.body.classList.toggle('dark-mode');
                      }}
                    />
                    <label className="form-check-label" htmlFor="darkModeToggle" style={{ userSelect: 'none' }}>
                      Dark Mode
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex-grow-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/employees" element={<Eselect />} />
            <Route path="/departmentlist" element={<DepartmentList />} />
            <Route path="/einsert" element={<Einsert />} />
            <Route path="/department" element={<Department />} />
            <Route path="/department/add" element={<DepartmentForm />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/report" element={<Report />} />
            <Route path="/salaryform" element={<SalaryForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>

        <footer className="bg-success text-white py-4 mt-auto">
          <div className="container text-center">
            <p className="mb-1">&copy; {new Date().getFullYear()} Employee Payroll Management System. All Rights Reserved.</p>
            <p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-github"></i> GitHub
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-linkedin"></i> LinkedIn
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
