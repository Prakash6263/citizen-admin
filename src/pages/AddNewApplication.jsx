"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import GovernmentApplicationForm from "../components/GovernmentApplicationForm"

const AddNewApplication = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const navigate = useNavigate()

  const handleSidebarToggle = React.useCallback(() => {
    setSidebarCollapsed((v) => !v)
    document.body.classList.toggle("mini-sidebar")
  }, [])

  const handleMobileToggle = React.useCallback(() => {
    document.body.classList.toggle("slide-nav")
  }, [])

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Header */}
        <Header onSidebarToggle={handleSidebarToggle} onMobileToggle={handleMobileToggle} />
        {/* /Header */}
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} />
        {/* /Sidebar */}
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <GovernmentApplicationForm />
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
      {/* /Main Wrapper */}
    </>
  )
}

export default AddNewApplication
