"use client"

import { useState } from "react"
import { submitCitizenDecision } from "../utils/api-helper"

export default function CitizenDetailModal({ citizen, onClose, onDecisionSubmitted }) {
  // In this flow, `citizen` is the APPROVAL object
  const approval = citizen || {}
  const applicant = approval.applicantId || {}

  const initialStatus = approval.status || applicant.status || "pending"

  const [decision, setDecision] = useState(initialStatus)
  const [reviewNotes, setReviewNotes] = useState("")
  const [conditionsText, setConditionsText] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const DECISION_OPTIONS = ["pending", "approved", "rejected", "suspended"]

  const handleSubmitDecision = async () => {
    // Build conditions array from comma-separated text
    const conditions = conditionsText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)

    // Validate rejection reason if rejected
    if (decision === "rejected" && !rejectionReason.trim()) {
      setError("Rejection reason is required when rejecting.")
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      setSuccess(null)

      await submitCitizenDecision(approval._id, {
        decision,
        reviewNotes,
        conditions,
        ...(decision === "rejected" ? { rejectionReason: rejectionReason.trim() } : {}),
      })

      setSuccess("Decision submitted successfully!")
      setTimeout(() => {
        onDecisionSubmitted && onDecisionSubmitted()
      }, 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const statusText = approval.status || applicant.status || "N/A"
  const statusColor =
    statusText === "pending"
      ? "#ffc107"
      : statusText === "approved"
        ? "#28a745"
        : statusText === "rejected"
          ? "#dc3545"
          : "#6c757d"

  return (
    <>
      <div
        className="modal-overlay"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1050,
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "30px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>Citizen Application Details</h2>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#999",
              }}
            >
              ×
            </button>
          </div>

          {/* Alerts */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Details */}
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "15px" }}>Application Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
              <div>
                <strong>Full Name:</strong>
                <p>{applicant.fullName || "N/A"}</p>
              </div>
              <div>
                <strong>Email:</strong>
                <p>{applicant.email || "N/A"}</p>
              </div>
              <div>
                <strong>Country:</strong>
                <p>{applicant.country || "N/A"}</p>
              </div>
              <div>
                <strong>Province/State:</strong>
                <p>{applicant.province || "N/A"}</p>
              </div>
              <div>
                <strong>City:</strong>
                <p>{applicant.city || "N/A"}</p>
              </div>
              <div>
                <strong>Current Status:</strong>
                <p style={{ color: statusColor }}>
                  {typeof statusText === "string" ? statusText.charAt(0).toUpperCase() + statusText.slice(1) : "N/A"}
                </p>
              </div>
              <div>
                <strong>Submitted At:</strong>
                <p>{new Date(approval.submittedAt).toLocaleString() || "N/A"}</p>
              </div>
              <div>
                <strong>Is Super Admin Verified:</strong>
                <p>{applicant.isSuperAdminVerified ? "Yes" : "No"}</p>
              </div>
            </div>

            {applicant.profileUrl && (
              <div style={{ marginBottom: "20px" }}>
                <strong>Profile URL:</strong>
                <p>
                  <a href={applicant.profileUrl} target="_blank" rel="noopener noreferrer">
                    {applicant.profileUrl}
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Review Decision */}
          <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: "20px" }}>
            <h4 style={{ marginBottom: "15px" }}>Review Decision</h4>

            <label className="mb-2 fw-semibold">Decision</label>
            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              disabled={submitting}
              className="form-control mb-3"
            >
              {DECISION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>

            {/* Rejection Reason (only when rejected) */}
            {decision === "rejected" && (
              <>
                <label className="mb-2 fw-semibold">Rejection Reason</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  disabled={submitting}
                  rows="2"
                  className="form-control mb-3"
                  placeholder="Provide the reason for rejection"
                />
              </>
            )}

            <label className="mb-2 fw-semibold">Conditions (comma separated)</label>
            <textarea
              value={conditionsText}
              onChange={(e) => setConditionsText(e.target.value)}
              disabled={submitting}
              rows="2"
              className="form-control mb-3"
              placeholder="Example: Complete KYC verification, Submit identity documents"
            />

            <label className="mb-2 fw-semibold">Review Notes</label>
            <textarea
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              disabled={submitting}
              rows="4"
              className="form-control mb-4"
            />

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-light" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmitDecision} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Decision"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
