import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-white">
  <div className="container-fluid">
    <h4 className="navbar-brand  text-white" >Task Management</h4>
    <button className="navbar-toggler text-white bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon  text-white"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active  text-white" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  text-white" to="/addtask">Add Task</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  text-white" to="/register">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  text-white" to="/login">Login</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar;
