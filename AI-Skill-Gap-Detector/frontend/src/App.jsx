
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SelectJob from "./pages/SelectJob";

import Assessment from "./pages/Assessment/Assessment";
import TechnicalAssessment from "./pages/Assessment/TechnicalAssessment";
import ReasoningAssessment from "./pages/Assessment/ReasoningAssessment";
import AptitudeAssessment from "./pages/Assessment/AptitudeAssessment";
import AssessmentResult from "./pages/Assessment/AssessmentResult";

import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import DailyPlan from "./pages/DailyPlan";
import Resources from "./pages/Resources";
import Progress from "./pages/Progress";
import WeeklyReport from "./pages/WeeklyReport";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const protectedPage = (page) => <ProtectedRoute>{page}</ProtectedRoute>;
const CodingPractice = React.lazy(() => import("./pages/CodingPractice"));
const AdminQuestions = React.lazy(() => import("./pages/AdminQuestions"));

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <div className="app-shell">
            <Navbar />

            <div className="app-body">
              <Sidebar />

              <main className="app-main">
                <Suspense fallback={<p role="status" style={{ padding: "2rem" }}>Loading page…</p>}>
                <Routes>
                  {/* Public pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Main pages */}
                  <Route path="/dashboard" element={protectedPage(<Dashboard />)} />
                  <Route path="/select-job" element={protectedPage(<SelectJob />)} />

                  {/* Assessment flow */}
                  <Route path="/assessment" element={protectedPage(<Assessment />)} />
                  <Route
                    path="/assessment/technical"
                    element={protectedPage(<TechnicalAssessment />)}
                  />
                  <Route
                    path="/assessment/technical-rating"
                    element={protectedPage(<TechnicalAssessment />)}
                  />
                  <Route
                    path="/assessment/reasoning"
                    element={protectedPage(<ReasoningAssessment />)}
                  />
                  <Route
                    path="/assessment/aptitude"
                    element={protectedPage(<AptitudeAssessment />)}
                  />
                  <Route
                    path="/assessment/result"
                    element={protectedPage(<AssessmentResult />)}
                  />

                  {/* Skills and learning */}
                  <Route path="/skill-gap" element={protectedPage(<SkillGap />)} />
                  <Route path="/roadmap" element={protectedPage(<Roadmap />)} />
                  <Route path="/daily-plan" element={protectedPage(<DailyPlan />)} />
                  <Route path="/resources" element={protectedPage(<Resources />)} />

                  {/* Consolidated practice page */}
                  <Route
                    path="/practice"
                    element={protectedPage(<CodingPractice />)}
                  />
                  <Route
                    path="/coding-practice"
                    element={protectedPage(<CodingPractice />)}
                  />

                  {/* Progress and reports */}
                  <Route path="/progress" element={protectedPage(<Progress />)} />
                  <Route path="/weekly-report" element={protectedPage(<WeeklyReport />)} />

                  {/* User profile */}
                  <Route path="/profile" element={protectedPage(<Profile />)} />
                  <Route path="/admin/questions" element={protectedPage(<AdminQuestions />)} />
                </Routes>
                </Suspense>
              </main>
            </div>

            <Footer />
          </div>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
