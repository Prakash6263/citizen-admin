const API_BASE_URL = process.env.REACT_APP_API_URL

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/super/login`,
  GOVERNMENTS: `${API_BASE_URL}/governments`,
  ADD_APPLICATION: `${API_BASE_URL}/applications`,
  POLICIES: `${API_BASE_URL}/policies`,
  POLICIES_TERMS: `${API_BASE_URL}/policies/terms_and_conditions`,
  POLICIES_PRIVACY: `${API_BASE_URL}/policies/privacy_policy`,
  ADMIN_APPROVALS: `${API_BASE_URL}/admin/approvals`,
  CITIZEN_APPROVALS: `${API_BASE_URL}/admin/approvals`,
}

export default API_BASE_URL
