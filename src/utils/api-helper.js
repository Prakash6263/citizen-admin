import { API_ENDPOINTS } from "../config/api"

export const apiCall = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  const token = localStorage.getItem("authToken")
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    const data = await response.json()
    throw new Error(data.message || `API Error: ${response.status}`)
  }

  return await response.json()
}

export const fetchGovernments = () => {
  return apiCall(API_ENDPOINTS.GOVERNMENTS)
}

export const addApplication = (data) => {
  return apiCall(API_ENDPOINTS.ADD_APPLICATION, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const fetchGovernmentApprovals = (page = 1, status = "pending") => {
  const url = `${API_ENDPOINTS.ADMIN_APPROVALS}?type=government&status=${status}&page=${page}&limit=10`
  return apiCall(url)
}

export const fetchGovernmentApprovalDetail = (approvalId) => {
  return apiCall(`${API_ENDPOINTS.ADMIN_APPROVALS}/${approvalId}`)
}

export const submitGovernmentDecision = (
  approvalId,
  payloadOrDecision,
  reviewNotes,
  conditions = [],
  rejectionReason,
) => {
  let bodyObj

  if (typeof payloadOrDecision === "object" && payloadOrDecision !== null) {
    bodyObj = { ...payloadOrDecision }
  } else {
    bodyObj = {
      decision: payloadOrDecision,
      reviewNotes: reviewNotes || "",
      conditions: Array.isArray(conditions) ? conditions : [],
      ...(payloadOrDecision === "rejected" && rejectionReason ? { rejectionReason } : {}),
    }
  }

  return apiCall(`${API_ENDPOINTS.ADMIN_APPROVALS}/${approvalId}/decision`, {
    method: "PUT",
    body: JSON.stringify(bodyObj),
  })
}

export const fetchCitizenApprovals = (page = 1, status = "pending") => {
  const url = `${API_ENDPOINTS.CITIZEN_APPROVALS}?type=citizen&status=${status}&page=${page}&limit=10`
  return apiCall(url)
}

export const fetchCitizenApprovalDetail = (approvalId) => {
  return apiCall(`${API_ENDPOINTS.ADMIN_APPROVALS}/${approvalId}`)
}

export const submitCitizenDecision = (approvalId, payloadOrDecision, reviewNotes, conditions = [], rejectionReason) => {
  let bodyObj

  if (typeof payloadOrDecision === "object" && payloadOrDecision !== null) {
    bodyObj = { ...payloadOrDecision }
  } else {
    bodyObj = {
      decision: payloadOrDecision,
      reviewNotes: reviewNotes || "",
      conditions: Array.isArray(conditions) ? conditions : [],
      ...(payloadOrDecision === "rejected" && rejectionReason ? { rejectionReason } : {}),
    }
  }

  return apiCall(`${API_ENDPOINTS.ADMIN_APPROVALS}/${approvalId}/decision`, {
    method: "PUT",
    body: JSON.stringify(bodyObj),
  })
}
