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

// Get all policies (admin view)
export const fetchAllPolicies = () => {
  return apiCall(API_ENDPOINTS.POLICIES)
}

// Get policy by type (public)
export const fetchPolicyByType = (type) => {
  return apiCall(`${API_ENDPOINTS.POLICIES}/${type}`)
}

// Wrapper function to match expected imports
export const getPolicyByType = (type) => {
  return fetchPolicyByType(type)
}

// Get policy history
export const fetchPolicyHistory = (type) => {
  return apiCall(`${API_ENDPOINTS.POLICIES}/${type}/history`)
}

// Create new policy
export const createPolicy = (data) => {
  console.log("[v0] Creating policy with data:", data)
  return apiCall(API_ENDPOINTS.POLICIES, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Update existing policy
export const updatePolicy = (id, data) => {
  console.log("[v0] Updating policy with id:", id, "data:", data)
  return apiCall(`${API_ENDPOINTS.POLICIES}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// Update policy status
export const updatePolicyStatus = (id, isActive) => {
  return apiCall(`${API_ENDPOINTS.POLICIES}/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  })
}

// Create or update policy based on data presence
export const createOrUpdatePolicy = async (data) => {
  console.log("[v0] CreateOrUpdate called with data:", data)
  if (data._id) {
    return updatePolicy(data._id, data)
  } else {
    return createPolicy(data)
  }
}

// Get specific version
export const fetchPolicyVersion = (type, versionNumber) => {
  return apiCall(`${API_ENDPOINTS.POLICIES}/${type}/version/${versionNumber}`)
}

// Restore to previous version
export const restorePolicyVersion = (type, versionNumber, changeNotes = "") => {
  return apiCall(`${API_ENDPOINTS.POLICIES}/${type}/restore/${versionNumber}`, {
    method: "POST",
    body: JSON.stringify({ changeNotes }),
  })
}
