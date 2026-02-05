"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchAllPolicies, updatePolicyStatus, restorePolicyVersion } from "../utils/policy-api-helper"

export default function PolicyTable() {
  const navigate = useNavigate()
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedPolicy, setExpandedPolicy] = useState(null)

  useEffect(() => {
    loadPolicies()
  }, [])

  const loadPolicies = async () => {
    try {
      setLoading(true)
      const data = await fetchAllPolicies()
      setPolicies(data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error("Error loading policies:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (policyId, currentStatus) => {
    try {
      await updatePolicyStatus(policyId, !currentStatus)
      loadPolicies()
    } catch (err) {
      setError(err.message)
      alert("Error updating policy status: " + err.message)
    }
  }

  const handleRestore = async (type, versionNumber) => {
    try {
      if (window.confirm(`Restore policy to version ${versionNumber}?`)) {
        await restorePolicyVersion(type, versionNumber, `Restored from version ${versionNumber}`)
        loadPolicies()
        alert("Policy restored successfully!")
      }
    } catch (err) {
      setError(err.message)
      alert("Error restoring policy: " + err.message)
    }
  }

  const handleEditPolicy = (policy) => {
    if (policy.policyType === "privacy_policy") {
      navigate("/privacy-policy", { state: { policy } })
    } else if (policy.policyType === "terms_and_conditions") {
      navigate("/terms-conditions", { state: { policy } })
    }
  }

  if (loading) {
    return <div className="alert alert-info">Loading policies...</div>
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>
  }

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card-table card p-2">
          <div className="card-body">
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .badge-status {
                    background-color: #1c78e6;
                    color: #fff;
                    padding: 6px 12px;
                    border-radius: 30px;
                    font-size: 13px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                  }
                  .badge-status:hover {
                    background-color: #1560c0;
                  }
                  .badge-active {
                    background-color: #28a745;
                  }
                  .badge-inactive {
                    background-color: #dc3545;
                  }
                  .content-preview {
                    max-height: 200px;
                    overflow-y: auto;
                    background-color: #f8f9fa;
                    padding: 10px;
                    border-radius: 4px;
                    font-size: 13px;
                    line-height: 1.5;
                    white-space: pre-wrap;
                    word-break: break-word;
                  }
                  .policy-actions {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                  }
                  .policy-actions button {
                    padding: 4px 8px;
                    font-size: 12px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                  }
                  .btn-edit {
                    background-color: #007bff;
                    color: white;
                  }
                  .btn-edit:hover {
                    background-color: #0056b3;
                  }
                  .btn-restore {
                    background-color: #17a2b8;
                    color: white;
                  }
                  .btn-restore:hover {
                    background-color: #138496;
                  }
                `,
              }}
            />
            <div className="table-responsive">
              <table id="policies-table" className="table table-striped" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Policy Type</th>
                    <th>Version</th>
                    <th>Status</th>
                    <th>Content Preview</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.length > 0 ? (
                    policies.map((policy) => (
                      <tr key={policy._id}>
                        <td>
                          <strong>{policy.policyType.replace(/_/g, " ").toUpperCase()}</strong>
                        </td>
                        <td>
                          <span className="badge-status">v{policy.version}</span>
                        </td>
                        <td>
                          <button
                            className={`badge-status ${policy.isActive ? "badge-active" : "badge-inactive"}`}
                            onClick={() => handleStatusToggle(policy._id, policy.isActive)}
                          >
                            {policy.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td>
                          <div
                            className="content-preview"
                            onClick={() => setExpandedPolicy(expandedPolicy === policy._id ? null : policy._id)}
                            style={{ cursor: "pointer" }}
                          >
                            {policy.content.substring(0, 150)}...
                            {expandedPolicy === policy._id && (
                              <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
                                <strong>Full Content:</strong>
                                <div>{policy.content}</div>
                                {policy.changeNotes && (
                                  <div style={{ marginTop: "10px", color: "#666" }}>
                                    <strong>Change Notes:</strong> {policy.changeNotes}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>{policy.createdBy?.fullName || "System"}</td>
                        <td>{policy.updatedBy?.fullName || "-"}</td>
                        <td>{new Date(policy.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(policy.updatedAt).toLocaleDateString()}</td>
                        <td>
                          <div className="policy-actions">
                            <button className="btn-edit" onClick={() => handleEditPolicy(policy)}>
                              Edit
                            </button>
                            {policy.versionHistory && policy.versionHistory.length > 0 && (
                              <button
                                className="btn-restore"
                                onClick={() => handleRestore(policy.policyType, policy.versionHistory[0].version)}
                              >
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No policies found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
