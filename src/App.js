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
import AdminStudentProfile from "./pages/admin/AdminStudentProfile";
import StudentLayout from "./components/layouts/StudentLayout";
import StudentBatchAssignments from "./pages/student/StudentBatch&Assignments";
import StudentNotification from "./pages/student/StudentNotification";
import StudentProfile from "./pages/student/StudentProfile";
import AdminBatchDetails from "./pages/admin/AdminBatchDetails";
import AdminAssignmentDetails from "./pages/admin/AdminAssignmentDetails";
import AdminManageEvents from "./pages/admin/AdminManageEvents";
import AdminManageInterviews from "./pages/admin/AdminManageInterviews";
import StudentEvents from "./pages/student/StudentEvents";
import StudentInterviews from "./pages/student/StudentInterviews";
import StudentDashboard from "./pages/student/StudentDashboard";
import ReviewerLayout from "./components/layouts/ReviewerLayout";
import ReviewerStudentList from "./pages/reviewer/ReviewerStudentList";
import AdminManageReviewer from "./pages/admin/AdminManageReviewer";
import ReviewerStudentProfile from "./pages/reviewer/ReviewerStudentProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* auth route */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/course_registration" element={<CourseRegister />} />

          {/* public route */}
          <Route path="/" element={<UserHomePage />} />
          <Route path="/our_programs" element={<UserProgramsPage />} />

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage_batch" element={<AdminManageBatch />} />
            <Route path="/admin/students" element={<AdminStudentsList />} />
            <Route
              path="/admin/student/profile"
              element={<AdminStudentProfile />}
            />
            <Route
              path="/admin/batch/details"
              element={<AdminBatchDetails />}
            />
            <Route
              path="/admin/batch/student/assignment_details"
              element={<AdminAssignmentDetails />}
            />
            <Route
              path="/admin/manage_events"
              element={<AdminManageEvents />}
            />
            {/* <Route
              path="/admin/manage_interviews"
              element={<AdminManageInterviews />}
            /> */}
            <Route
              path="/admin/manage_reviewers"
              element={<AdminManageReviewer />}
            />
          </Route>

          {/* student route */}
          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route
              path="/student/assignment"
              element={<StudentBatchAssignments />}
            />
            <Route
              path="/student/notification"
              element={<StudentNotification />}
            />
            <Route path="/student/events" element={<StudentEvents />} />
            <Route path="/student/interviews" element={<StudentInterviews />} />
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>

          {/* reviewer route */}
          <Route element={<ReviewerLayout />}>
            <Route
              path="/reviewer/students"
              element={<ReviewerStudentList />}
            />
            <Route
              path="/reviewer/student/profile"
              element={<ReviewerStudentProfile />}
            />
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
