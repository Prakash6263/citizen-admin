"use client"

// src/pages/Government.jsx
import { useCallback, useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import GovernmentTable from "../components/GovernmentTable"
import { Link } from "react-router-dom"

const Government = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSidebarToggle = useCallback(() => {
    setSidebarCollapsed((v) => !v)
    document.body.classList.toggle("mini-sidebar")
  }, [])

  const handleMobileToggle = useCallback(() => {
    setMobileOpen((v) => !v)
    document.body.classList.toggle("slide-nav")
  }, [])

  return (
    <>
      <div className="main-wrapper">
        <Header onSidebarToggle={handleSidebarToggle} onMobileToggle={handleMobileToggle} />
        <Sidebar collapsed={sidebarCollapsed} />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="top-bar">
              <h4>Government Application List</h4>
              <Link to="/add-new-application" className="btn btn-turquoise">
                <i className="fa-solid fa-plus" /> Add New Application
              </Link>
            </div>

            <GovernmentTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Government
