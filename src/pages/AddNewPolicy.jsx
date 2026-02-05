"use client"

import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { createPolicy } from "../utils/policy-api-helper"

const AddNewPolicy = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    policyType: "terms_and_conditions",
    content: "",
    changeNotes: "",
    isActive: true,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSidebarToggle = useCallback(() => {
    setSidebarCollapsed((v) => !v)
    document.body.classList.toggle("mini-sidebar")
  }, [])

  const handleMobileToggle = useCallback(() => {
    setMobileOpen((v) => !v)
    document.body.classList.toggle("slide-nav")
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)

      if (!formData.policyType) {
        setError("Please select a policy type")
        return
      }

      if (!formData.content.trim()) {
        setError("Please enter policy content")
        return
      }

      await createPolicy(formData)
      alert("Policy created successfully!")
      navigate("/policies")
    } catch (err) {
      setError(err.message || "Failed to create policy")
      console.error("Error creating policy:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="main-wrapper">
        <Header onSidebarToggle={handleSidebarToggle} onMobileToggle={handleMobileToggle} />
        <Sidebar collapsed={sidebarCollapsed} />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="top-bar">
              <h4>Add New Policy</h4>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label className="form-label">Policy Type</label>
                        <select
                          name="policyType"
                          value={formData.policyType}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        >
                          <option value="terms_and_conditions">Terms & Conditions</option>
                          <option value="privacy_policy">Privacy Policy</option>
                        </select>
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label">Policy Content</label>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          className="form-control"
                          rows="15"
                          placeholder="Enter policy content here..."
                          required
                        />
                        <small className="text-muted">{formData.content.length} characters</small>
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label">Change Notes</label>
                        <textarea
                          name="changeNotes"
                          value={formData.changeNotes}
                          onChange={handleInputChange}
                          className="form-control"
                          rows="4"
                          placeholder="Describe what changed in this version..."
                        />
                      </div>

                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                          />
                          <label className="custom-control-label" htmlFor="isActive">
                            Activate this policy immediately
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <button type="submit" disabled={loading} className="btn btn-turquoise">
                          {loading ? "Creating..." : "Create Policy"}
                        </button>
                        <button type="button" onClick={() => navigate("/policies")} className="btn btn-secondary ms-2">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5>Instructions</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Policy Type:</strong> Select whether you're creating Terms & Conditions or Privacy Policy.
                    </p>
                    <p>
                      <strong>Content:</strong> Enter the full text of the policy. This will be displayed to users.
                    </p>
                    <p>
                      <strong>Change Notes:</strong> Document what changed in this version for audit purposes.
                    </p>
                    <p>
                      <strong>Active:</strong> Check the box to make this policy immediately available to users.
                    </p>
                    <hr />
                    <p className="text-muted small">
                      All policies are versioned automatically. You can restore previous versions from the policy
                      management page.
                    </p>
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

export default AddNewPolicy
