"use client"

import { Link, useLocation } from "react-router-dom"
import { logout } from "../utils/auth-helper"

export default function Sidebar({ collapsed }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className={`sidebar ${collapsed ? "mini-sidebar" : ""}`} id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul className="sidebar-vertical">
            <li>
              <Link to="/government" className={isActive("/government") ? "active" : ""}>
                <i className="fa fa-table" /> <span> Government Applications</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/citizens" className={isActive("/citizens") ? "active" : ""}>
                <i className="fa fa-users" /> <span> Citizen Applications</span>
              </Link>
            </li> */}
            <li>
              <Link to="/policies" className={isActive("/policies") ? "active" : ""}>
                <i className="fa fa-file-text" /> <span> Policies</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className={isActive("/privacy-policy") ? "active" : ""}>
                <i className="fa fa-list-alt" /> <span> Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/terms-conditions" className={isActive("/terms-conditions") ? "active" : ""}>
                <i className="fa fa-list-alt" /> <span> Terms &amp; Conditions</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
                className="logout-link"
              >
                <i className="fe fe-power" /> <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
