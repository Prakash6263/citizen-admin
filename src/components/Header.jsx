"use client"
import { Link } from "react-router-dom"
import { logout } from "../utils/auth-helper"

export default function Header({ onSidebarToggle, onMobileToggle }) {
  return (
    <div className="header header-one">
      <Link
        to="/government"
        className="d-inline-flex d-sm-inline-flex align-items-center d-md-inline-flex d-lg-none align-items-center device-logo"
      >
        <img src="/assets/img/logo.png" className="img-fluid logo2" alt="Logo" style={{ width: 60 }} />
      </Link>

      <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
        <div className="logo-color">
          <Link to="/government">
            <h4 className="img-fluid logo-blue text-white fw-bold">Admin</h4>
          </Link>
          <Link to="/government">
            <h4 className="img-fluid logo-small" />
          </Link>
        </div>
      </div>

      <button type="button" id="toggle_btn" className="btn p-0" onClick={onSidebarToggle} aria-label="Toggle sidebar">
        <span className="toggle-bars">
          <span className="bar-icons" />
          <span className="bar-icons" />
          <span className="bar-icons" />
          <span className="bar-icons" />
        </span>
      </button>

      <div className="top-nav-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" className="form-control" placeholder="Search here" />
          <button className="btn" type="submit">
            <img src="/assets/img/icons/search.svg" alt="search" />
          </button>
        </form>
      </div>

      <button
        type="button"
        className="mobile_btn btn p-0"
        id="mobile_btn"
        onClick={onMobileToggle}
        aria-label="Toggle mobile menu"
      >
        <i className="fas fa-bars" />
      </button>

      <ul className="nav nav-tabs user-menu">
        <li className="nav-item dropdown">
          <Link to="javascript:void(0)" className="user-link nav-link" data-bs-toggle="dropdown">
            <span className="user-img">
              <img src="/assets/img/profiles/avatar-02.jpg" alt="User Avatar" className="profilesidebar" />
              <span className="animate-circle" />
            </span>
            <span className="user-content">
              <span className="user-details">Admin</span>
              <span className="user-name">Chegg bhatt</span>
            </span>
          </Link>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilemenu">
              <div className="subscription-logout">
                <ul>
                  <li className="pb-0">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        logout()
                      }}
                    >
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
