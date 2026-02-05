// "use client"

// import { useEffect, useState } from "react"
// import { fetchGovernmentApprovals, fetchGovernmentApprovalDetail } from "../utils/api-helper"
// import GovernmentDetailModal from "./GovernmentDetailModal"

// export default function GovernmentTable() {
//   const [tableData, setTableData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [selectedGovernment, setSelectedGovernment] = useState(null)
//   const [showDetailModal, setShowDetailModal] = useState(false)

//   const fetchGovernments = async (pageNum = 1) => {
//     try {
//       setLoading(true)
//       const response = await fetchGovernmentApprovals(pageNum)
//       console.log("[v0] Full API Response:", response)

//       let approvals = []
//       if (response?.data?.approvals && Array.isArray(response.data.approvals)) {
//         approvals = response.data.approvals
//       } else if (Array.isArray(response)) {
//         approvals = response
//       }

//       setTableData(approvals)
//       setTotalPages(response?.data?.pagination?.pages || 1)
//       setError(null)
//     } catch (err) {
//       console.error("[v0] Fetch error:", err)
//       setError(err.message)
//       setTableData([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchGovernments(page)
//   }, [page])

//   const handleRowClick = async (governmentId) => {
//     try {
//       const data = await fetchGovernmentApprovalDetail(governmentId)
//       const approval = data?.data?.approval ?? data?.approval ?? data
//       setSelectedGovernment(approval) // pass the approval object to the modal
//       setShowDetailModal(true)
//     } catch (err) {
//       console.error("[v0] Detail fetch error:", err)
//       setError(err.message)
//     }
//   }

//   const handleDecisionSubmitted = () => {
//     setShowDetailModal(false)
//     setSelectedGovernment(null)
//     fetchGovernments(page)
//   }

//   if (loading && tableData.length === 0) {
//     return <div className="p-4 text-center">Loading.</div>
//   }

//   return (
//     <>
//       <div className="row">
//         <div className="col-sm-12">
//           <div className="card-table card p-2">
//             <div className="card-body">
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               <style
//                 dangerouslySetInnerHTML={{
//                   __html: `
//                     .badge-status {
//                       background-color: #1c78e6;
//                       color: #fff;
//                       padding: 6px 12px;
//                       border-radius: 30px;
//                       font-size: 13px;
//                     }
//                     .badge-pending {
//                       background-color: #ffc107;
//                       color: #000;
//                     }
//                     .badge-approved {
//                       background-color: #28a745;
//                     }
//                     .badge-rejected {
//                       background-color: #dc3545;
//                     }
//                     .badge-suspended {
//                       background-color: #6c757d;
//                     }
//                     .table-row-clickable {
//                       cursor: pointer;
//                     }
//                     .table-row-clickable:hover {
//                       background-color: #f5f5f5;
//                     }
//                   `,
//                 }}
//               />
//               <div className="table-responsive">
//                 <table id="example" className="table table-striped" style={{ width: "100%" }}>
//                   <thead>
//                     <tr>
//                       <th>Local Government Name</th>
//                       <th>Entity Type</th>
//                       <th>Country</th>
//                       <th>Province / State</th>
//                       <th>City</th>
//                       <th>Representative Name</th>
//                       <th>Email</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableData.length === 0 ? (
//                       <tr>
//                         <td colSpan="9" className="text-center p-4">
//                           No pending government approvals
//                         </td>
//                       </tr>
//                     ) : (
//                       tableData.map((row) => (
//                         <tr key={row._id} className="table-row-clickable">
//                           <td>{row.applicantId?.governmentName || "N/A"}</td>
//                           <td>{row.applicantId?.entityType || "Government"}</td>
//                           <td>{row.applicantId?.country || "N/A"}</td>
//                           <td>{row.applicantId?.province || "N/A"}</td>
//                           <td>{row.applicantId?.city || "N/A"}</td>
//                           <td>{row.applicantId?.representativeName || "N/A"}</td>
//                           <td>{row.applicantId?.institutionalEmail || "N/A"}</td>
//                           <td>
//                             <span className={`badge-status badge-${row.applicantId?.status || row.status}`}>
//                               {(row.applicantId?.status || row.status)?.charAt(0).toUpperCase() +
//                                 (row.applicantId?.status || row.status)?.slice(1)}
//                             </span>
//                           </td>
//                           <td>
//                             <button className="btn btn-sm btn-primary" onClick={() => handleRowClick(row._id)}>
//                               Review
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {totalPages > 1 && (
//                 <div className="d-flex justify-content-between align-items-center mt-3">
//                   <div>
//                     Page {page} of {totalPages}
//                   </div>
//                   <div>
//                     <button
//                       className="btn btn-sm btn-outline-primary me-2"
//                       onClick={() => setPage(Math.max(1, page - 1))}
//                       disabled={page === 1}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => setPage(Math.min(totalPages, page + 1))}
//                       disabled={page === totalPages}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showDetailModal && selectedGovernment && (
//         <GovernmentDetailModal
//           government={selectedGovernment}
//           onClose={() => {
//             setShowDetailModal(false)
//             setSelectedGovernment(null)
//           }}
//           onDecisionSubmitted={handleDecisionSubmitted}
//         />
//       )}
//     </>
//   )
// }




"use client"

import { useEffect, useState } from "react"
import { fetchGovernmentApprovals, fetchGovernmentApprovalDetail } from "../utils/api-helper"
import GovernmentDetailModal from "./GovernmentDetailModal"

export default function GovernmentTable() {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedGovernment, setSelectedGovernment] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("pending")

  const fetchGovernments = async (pageNum = 1, status = "pending") => {
    try {
      setLoading(true)
      const response = await fetchGovernmentApprovals(pageNum, status)
      console.log("[v0] Full API Response:", response)

      let approvals = []
      if (response?.data?.approvals && Array.isArray(response.data.approvals)) {
        approvals = response.data.approvals
      } else if (Array.isArray(response)) {
        approvals = response
      }

      setTableData(approvals)
      setTotalPages(response?.data?.pagination?.pages || 1)
      setError(null)
    } catch (err) {
      console.error("[v0] Fetch error:", err)
      setError(err.message)
      setTableData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGovernments(page, statusFilter)
  }, [page, statusFilter])

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }

  const handleRowClick = async (governmentId) => {
    try {
      const data = await fetchGovernmentApprovalDetail(governmentId)
      const approval = data?.data?.approval ?? data?.approval ?? data
      setSelectedGovernment(approval)
      setShowDetailModal(true)
    } catch (err) {
      console.error("[v0] Detail fetch error:", err)
      setError(err.message)
    }
  }

  const handleDecisionSubmitted = () => {
    setShowDetailModal(false)
    setSelectedGovernment(null)
    fetchGovernments(page, statusFilter)
  }

  if (loading && tableData.length === 0) {
    return <div className="p-4 text-center">Loading.</div>
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="d-flex justify-content-end mb-3">
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="govStatusFilter" className="mb-0 fw-medium">
                    Status:
                  </label>
                  <select
                    id="govStatusFilter"
                    className="form-select form-select-sm"
                    style={{ width: "150px" }}
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    .badge-status {
                      background-color: #1c78e6;
                      color: #fff;
                      padding: 6px 12px;
                      border-radius: 30px;
                      font-size: 13px;
                    }
                    .badge-pending {
                      background-color: #ffc107;
                      color: #000;
                    }
                    .badge-approved {
                      background-color: #28a745;
                    }
                    .badge-rejected {
                      background-color: #dc3545;
                    }
                    .badge-suspended {
                      background-color: #6c757d;
                    }
                    .table-row-clickable {
                      cursor: pointer;
                    }
                    .table-row-clickable:hover {
                      background-color: #f5f5f5;
                    }
                  `,
                }}
              />
              <div className="table-responsive">
                <table id="example" className="table table-striped" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Local Government Name</th>
                      <th>Entity Type</th>
                      <th>Country</th>
                      <th>Province / State</th>
                      <th>City</th>
                      <th>Representative Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center p-4">
                          No {statusFilter} government approvals
                        </td>
                      </tr>
                    ) : (
                      tableData.map((row) => (
                        <tr key={row._id} className="table-row-clickable">
                          <td>{row.applicantId?.governmentName || "N/A"}</td>
                          <td>{row.applicantId?.entityType || "Government"}</td>
                          <td>{row.applicantId?.country || "N/A"}</td>
                          <td>{row.applicantId?.province || "N/A"}</td>
                          <td>{row.applicantId?.city || "N/A"}</td>
                          <td>{row.applicantId?.representativeName || "N/A"}</td>
                          <td>{row.applicantId?.institutionalEmail || "N/A"}</td>
                          <td>
                            <span className={`badge-status badge-${row.applicantId?.status || row.status}`}>
                              {(row.applicantId?.status || row.status)?.charAt(0).toUpperCase() +
                                (row.applicantId?.status || row.status)?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-primary" onClick={() => handleRowClick(row._id)}>
                              Review
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    Page {page} of {totalPages}
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDetailModal && selectedGovernment && (
        <GovernmentDetailModal
          government={selectedGovernment}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedGovernment(null)
          }}
          onDecisionSubmitted={handleDecisionSubmitted}
        />
      )}
    </>
  )
}
