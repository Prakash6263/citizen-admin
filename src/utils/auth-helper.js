export const logout = () => {
  localStorage.removeItem("authToken")
  localStorage.removeItem("user")
  window.location.href = "/login"
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken")
}

export const getUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}
