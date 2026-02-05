"use client"

// src/pages/PrivacyPolicy.jsx
import { useCallback, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { showSuccess, showError } from "../utils/sweetalert"
import { createOrUpdatePolicy } from "../utils/policy-api-helper"

export default function PrivacyPolicy() {
  const location = useLocation()
  const [content, setContent] = useState("<p>Write your Privacy Policy here…</p>")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSidebarToggle = useCallback(() => {
    setSidebarCollapsed((v) => !v)
    document.body.classList.toggle("mini-sidebar")
  }, [])

  const handleMobileToggle = useCallback(() => {
    document.body.classList.toggle("slide-nav")
  }, [])

  useEffect(() => {
    if (location.state?.policy?.content) {
      setContent(location.state.policy.content)
      setLoading(false)
    }
  }, [location.state?.policy?.content])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createOrUpdatePolicy({
        policyType: "privacy_policy",
        content: content,
        changeNotes: "Updated via privacy policy page",
      })
      showSuccess("Submitted", "Privacy Policy updated successfully!")
    } catch (error) {
      showError("Error", error.message || "Failed to update Privacy Policy")
    }
  }

  if (loading) {
    return (
      <div className="main-wrapper">
        <Header onSidebarToggle={handleSidebarToggle} onMobileToggle={handleMobileToggle} />
        <Sidebar collapsed={sidebarCollapsed} />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="text-center py-5">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="main-wrapper">
        <Header onSidebarToggle={handleSidebarToggle} onMobileToggle={handleMobileToggle} />
        <Sidebar collapsed={sidebarCollapsed} />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="row g-4">
              <div className="col-md-12">
                <div className="card flex-fill">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">Privacy Policy</h5>
                    </div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-4">
                        <div className="col-lg-12 mb-1">
                          <CKEditor
                            key={content}
                            editor={ClassicEditor}
                            data={content}
                            onChange={(_, editor) => setContent(editor.getData())}
                          />
                        </div>

                        <div className="col-md-12">
                          <div className="text-start">
                            <button type="submit" className="btn btn-primary px-5">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
