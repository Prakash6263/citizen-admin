"use client"

import { useCallback, useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import CitizenTable from "../components/CitizenTable"

const Citizens = () => {
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
              <h4>Citizen Application List</h4>
            </div>

            <CitizenTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Citizens
