import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ user }: { [key: string]: any } | any): any => (
  <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        PixelPaint <i className="fas fa-paint-brush" /> App
      </Link>
      <button
        aria-controls="navbars"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-target="#navbars"
        data-toggle="collapse"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbars">
        <ul className="navbar-nav mr-auto">
          <li
            className="nav-item"
            data-target=".navbar-collapse.show"
            data-toggle="collapse"
          >
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
          </li>
          <li
            className="nav-item"
            data-target=".navbar-collapse.show"
            data-toggle="collapse"
          >
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          {user && (
            <>
              <li
                className="nav-item text-center"
                data-target=".navbar-collapse.show"
                data-toggle="collapse"
              >
                <NavLink className="nav-link" to="/create-drawing">
                  <small>Create Drawing</small>
                </NavLink>
              </li>
              <li
                className="nav-item text-center"
                data-target=".navbar-collapse.show"
                data-toggle="collapse"
              >
                <NavLink className="nav-link" to="/my-drawings">
                  <small>My Drawings</small>
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ml-auto text-center">
          {!user && (
            <>
              <li
                className="nav-item"
                data-target=".navbar-collapse.show"
                data-toggle="collapse"
              >
                <NavLink className="nav-link" to="/sign-in">
                  <small>Sign In</small>
                </NavLink>
              </li>
              <li
                className="nav-item"
                data-target=".navbar-collapse.show"
                data-toggle="collapse"
              >
                <NavLink className="nav-link" to="/sign-up">
                  <small>Sign Up</small>
                </NavLink>
              </li>
              <li
                className="nav-item"
                data-target=".navbar-collapse.show"
                data-toggle="collapse"
              >
                <NavLink className="nav-link pl-2 pr-0" to="/painter-sign-up">
                  <small>Create Painter Account</small>
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <li
              className="nav-item"
              data-target=".navbar-collapse.show"
              data-toggle="collapse"
            >
              <NavLink className="nav-link" to="/logout">
                <small>Log Out</small>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
