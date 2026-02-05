import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

// IMPORT PAGES
import Login from "./pages/Login"
import GovernmentApplicationList from "./pages/Governments.jsx"
import AddApplicationForm from "./pages/AddNewApplication.jsx"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsConditions from "./pages/Termsconditions.jsx"
import Policies from "./pages/Policies"
import Citizens from "./pages/Citizens.jsx"

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/government"
          element={
            <ProtectedRoute>
              <GovernmentApplicationList />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/citizens"
          element={
            <ProtectedRoute>
              <Citizens />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/add-new-application"
          element={
            <ProtectedRoute>
              <AddApplicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/policies"
          element={
            <ProtectedRoute>
              <Policies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <ProtectedRoute>
              <TermsConditions />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<h2 className="text-center mt-5">Page Not Found</h2>} />
      </Routes>
    </Router>
  )
}

export default App
