"use client"

import { useCallback, useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import PolicyTable from "../components/PolicyTable"

const Policies = () => {
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
              <h4>Policy Management</h4>
            </div>

            <PolicyTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Policies
