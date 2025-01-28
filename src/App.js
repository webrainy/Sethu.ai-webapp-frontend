import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/common/Login";
import AuthLayout from "./components/layouts/AuthLayout";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/layouts/AdminLayout";
import "./styles.scss";
import CourseRegister from "./pages/common/CourseRegister";
import UserHomePage from "./pages/user/UserHomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/course_registration" element={<CourseRegister />} />

          <Route path="/" element={<UserHomePage />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
