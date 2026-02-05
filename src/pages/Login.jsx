"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { API_ENDPOINTS } from "../config/api"
import { showError, showSuccess } from "../utils/sweetalert"

export default function Login({ onLogin, redirectTo = "/government" }) {
  const [values, setValues] = useState({ email: "", password: "" })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const bgStyle = useMemo(
    () => ({
      minHeight: "100vh",
      padding: "80px 50px",
      backgroundImage: "url(/assets/img/citizen.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    [],
  )

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!values.email.trim() || !values.password.trim()) {
      return "Email and password are required."
    }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.includes("@")
    if (!ok) return "Please enter a valid email."
    return ""
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const msg = validate()
    if (msg) {
      showError("Validation Error", msg)
      return
    }
    setSubmitting(true)
    try {
      if (onLogin) {
        await onLogin(values)
      } else {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || "Login failed")
        }

        const data = await response.json()
        if (data.token) {
          localStorage.setItem("authToken", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
        }

        showSuccess("Login Successful", "Welcome back!")
        navigate(redirectTo)
      }
    } catch (err) {
      showError("Login Failed", err?.message || "Login failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="features" style={bgStyle}>
      <div className="container-lg">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-5">
            <div className="contact-card destination mt-3 bg-white" style={cardStyle}>
              <h4 className="fw-bold mb-3">Login to Citizen Admin</h4>

              <form onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={onChange}
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={onChange}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                  {submitting ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const cardStyle = {
  borderRadius: 16,
  padding: 30,
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 6px 20px",
}
