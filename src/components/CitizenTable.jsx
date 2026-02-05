// "use client"

// import { useEffect, useState } from "react"
// import { fetchCitizenApprovals, fetchCitizenApprovalDetail } from "../utils/api-helper"
// import CitizenDetailModal from "./CitizenDetailModal"

// export default function CitizenTable() {
//   const [tableData, setTableData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [selectedCitizen, setSelectedCitizen] = useState(null)
//   const [showDetailModal, setShowDetailModal] = useState(false)

//   const fetchCitizens = async (pageNum = 1) => {
//     try {
//       setLoading(true)
//       const response = await fetchCitizenApprovals(pageNum)
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
//     fetchCitizens(page)
//   }, [page])

//   const handleRowClick = async (citizenId) => {
//     try {
//       const data = await fetchCitizenApprovalDetail(citizenId)
//       const approval = data?.data?.approval ?? data?.approval ?? data
//       setSelectedCitizen(approval)
//       setShowDetailModal(true)
//     } catch (err) {
//       console.error("[v0] Detail fetch error:", err)
//       setError(err.message)
//     }
//   }

//   const handleDecisionSubmitted = () => {
//     setShowDetailModal(false)
//     setSelectedCitizen(null)
//     fetchCitizens(page)
//   }

//   if (loading && tableData.length === 0) {
//     return <div className="p-4 text-center">Loading...</div>
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
//                 <table id="citizen-approvals-table" className="table table-striped" style={{ width: "100%" }}>
//                   <thead>
//                     <tr>
//                       <th>Full Name</th>
//                       <th>Email</th>
//                       <th>Country</th>
//                       <th>Province / State</th>
//                       <th>City</th>
//                       <th>Status</th>
//                       <th>Submitted At</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableData.length === 0 ? (
//                       <tr>
//                         <td colSpan="8" className="text-center p-4">
//                           No pending citizen approvals
//                         </td>
//                       </tr>
//                     ) : (
//                       tableData.map((row) => (
//                         <tr key={row._id} className="table-row-clickable">
//                           <td>{row.applicantId?.fullName || "N/A"}</td>
//                           <td>{row.applicantId?.email || "N/A"}</td>
//                           <td>{row.applicantId?.country || "N/A"}</td>
//                           <td>{row.applicantId?.province || "N/A"}</td>
//                           <td>{row.applicantId?.city || "N/A"}</td>
//                           <td>
//                             <span className={`badge-status badge-${row.applicantId?.status || row.status}`}>
//                               {(row.applicantId?.status || row.status)?.charAt(0).toUpperCase() +
//                                 (row.applicantId?.status || row.status)?.slice(1)}
//                             </span>
//                           </td>
//                           <td>{new Date(row.submittedAt).toLocaleDateString()}</td>
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

//       {showDetailModal && selectedCitizen && (
//         <CitizenDetailModal
//           citizen={selectedCitizen}
//           onClose={() => {
//             setShowDetailModal(false)
//             setSelectedCitizen(null)
//           }}
//           onDecisionSubmitted={handleDecisionSubmitted}
//         />
//       )}
//     </>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { fetchCitizenApprovals, fetchCitizenApprovalDetail } from "../utils/api-helper"
import CitizenDetailModal from "./CitizenDetailModal"

export default function CitizenTable() {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCitizen, setSelectedCitizen] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("pending")

  const fetchCitizens = async (pageNum = 1, status = "pending") => {
    try {
      setLoading(true)
      const response = await fetchCitizenApprovals(pageNum, status)
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
    fetchCitizens(page, statusFilter)
  }, [page, statusFilter])

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }

  const handleRowClick = async (citizenId) => {
    try {
      const data = await fetchCitizenApprovalDetail(citizenId)
      const approval = data?.data?.approval ?? data?.approval ?? data
      setSelectedCitizen(approval)
      setShowDetailModal(true)
    } catch (err) {
      console.error("[v0] Detail fetch error:", err)
      setError(err.message)
    }
  }

  const handleDecisionSubmitted = () => {
    setShowDetailModal(false)
    setSelectedCitizen(null)
    fetchCitizens(page, statusFilter)
  }

  if (loading && tableData.length === 0) {
    return <div className="p-4 text-center">Loading...</div>
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
                  <label htmlFor="statusFilter" className="mb-0 fw-medium">
                    Status:
                  </label>
                  <select
                    id="statusFilter"
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
                <table id="citizen-approvals-table" className="table table-striped" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Country</th>
                      <th>Province / State</th>
                      <th>City</th>
                      <th>Status</th>
                      <th>Submitted At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center p-4">
                          No {statusFilter} citizen approvals
                        </td>
                      </tr>
                    ) : (
                      tableData.map((row) => (
                        <tr key={row._id} className="table-row-clickable">
                          <td>{row.applicantId?.fullName || "N/A"}</td>
                          <td>{row.applicantId?.email || "N/A"}</td>
                          <td>{row.applicantId?.country || "N/A"}</td>
                          <td>{row.applicantId?.province || "N/A"}</td>
                          <td>{row.applicantId?.city || "N/A"}</td>
                          <td>
                            <span className={`badge-status badge-${row.applicantId?.status || row.status}`}>
                              {(row.applicantId?.status || row.status)?.charAt(0).toUpperCase() +
                                (row.applicantId?.status || row.status)?.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(row.submittedAt).toLocaleDateString()}</td>
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

      {showDetailModal && selectedCitizen && (
        <CitizenDetailModal
          citizen={selectedCitizen}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedCitizen(null)
          }}
          onDecisionSubmitted={handleDecisionSubmitted}
        />
      )}
    </>
  )
}
