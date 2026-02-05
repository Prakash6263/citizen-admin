"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { showSuccess } from "../utils/sweetalert"

export default function GovernmentApplicationForm() {
  const [formData, setFormData] = useState({
    localGovernmentName: "",
    representativeName: "",
    entityType: "",
    country: "",
    province: "",
    city: "",
    role: "",
    position: "",
    institutionalEmail: "",
    officialWebsite: "",
    comments: "",
    contactConsent: false,
    termsAccepted: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    showSuccess("Success", "Application submitted successfully!")
  }

  return (
    <>
      <div className="mb-3">
        <Link to="/government" className="btn btn-turquoise">
          <i className="bi bi-arrow-left" /> Back to List
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-md-12">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Government Application Form</h5>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Local Government Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="localGovernmentName"
                      placeholder="Enter local government name"
                      value={formData.localGovernmentName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Representative Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="representativeName"
                      placeholder="Enter representative name"
                      value={formData.representativeName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Entity Type</label>
                    <select
                      className="form-select"
                      name="entityType"
                      value={formData.entityType}
                      onChange={handleChange}
                    >
                      <option value="">Choose entity type</option>
                      <option>Municipal Government</option>
                      <option>Local Authority</option>
                      <option>Public Office</option>
                      <option>Department</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Country</label>
                    <select className="form-select" name="country" value={formData.country} onChange={handleChange}>
                      <option value="">Select country</option>
                      <option>USA</option>
                      <option>Canada</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Germany</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Province / State</label>
                    <select className="form-select" name="province" value={formData.province} onChange={handleChange}>
                      <option value="">Select province/state</option>
                      <option>New York</option>
                      <option>Ontario</option>
                      <option>Delhi</option>
                      <option>Berlin</option>
                      <option>Tokyo</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">City</label>
                    <select className="form-select" name="city" value={formData.city} onChange={handleChange}>
                      <option value="">Select city</option>
                      <option>New York City</option>
                      <option>Toronto</option>
                      <option>London</option>
                      <option>Berlin</option>
                      <option>New Delhi</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      placeholder="Enter representative role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Position</label>
                    <select className="form-select" name="position" value={formData.position} onChange={handleChange}>
                      <option value="">Select position</option>
                      <option>Officer</option>
                      <option>Director</option>
                      <option>Administrator</option>
                      <option>Manager</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Institutional Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="institutionalEmail"
                      placeholder="Enter institutional email"
                      value={formData.institutionalEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label className="form-label">Official Website</label>
                    <input
                      type="url"
                      className="form-control"
                      name="officialWebsite"
                      placeholder="Enter website URL"
                      value={formData.officialWebsite}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-12 mb-1">
                    <label className="form-label">Comments</label>
                    <textarea
                      className="form-control"
                      name="comments"
                      placeholder="Enter comments or notes"
                      value={formData.comments}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="contactConsent"
                        id="contactCheck"
                        checked={formData.contactConsent}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="contactCheck">
                        I agree to be contacted by MyTaxes and receive advice before activating the account
                      </label>
                    </div>
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="termsAccepted"
                        id="termsCheck"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="termsCheck">
                        I have read and accept the terms and conditions
                      </label>
                    </div>
                    <div className="text-start">
                      <button type="submit" className="btn btn-primary px-5">
                        Submit Information
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
