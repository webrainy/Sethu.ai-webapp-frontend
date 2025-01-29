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
import UserProgramsPage from "./pages/user/UserProgramsPage";
import AdminStudentsList from "./pages/admin/AdminStudentsList";
import AdminManageBatch from "./pages/admin/AdminManageBatch";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/course_registration" element={<CourseRegister />} />
            
          <Route path="/" element={<UserHomePage />} />
          <Route path="/our_programs" element={<UserProgramsPage />} />

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage_batch" element={<AdminManageBatch />} />
            <Route path="/admin/students" element={<AdminStudentsList />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        containerClassName="font-ddin"
      />
    </div>
  );
}

export default App;
