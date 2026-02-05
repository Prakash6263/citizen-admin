import { Navigate } from "react-router-dom"

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("authToken")

  if (token) {
    return <Navigate to="/government" replace />
  }

  return children
}
