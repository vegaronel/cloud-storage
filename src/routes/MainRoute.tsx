import { Routes, Route } from "react-router";
import Login from "../pages/Login";
import LandingPageLayout from "../layouts/LandingPageLayout";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import MyFiles from "@/pages/MyFiles";
import ProtectedRoute from "@/context/ProtectedRoute"; // Import the ProtectedRoute component

function MainRoute() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<LandingPageLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-files" element={<MyFiles />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default MainRoute;
