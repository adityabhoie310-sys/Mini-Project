import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SelectJob from './pages/SelectJob';

// Assessment Pages
import Assessment from './pages/Assessment/Assessment';
import TechnicalAssessment from './pages/Assessment/TechnicalAssessment';
import ReasoningAssessment from './pages/Assessment/ReasoningAssessment';
import AptitudeAssessment from './pages/Assessment/AptitudeAssessment';
import AssessmentResult from './pages/Assessment/AssessmentResult';

// Other Pages
import SkillGap from './pages/SkillGap';
import Roadmap from './pages/Roadmap';
import DailyPlan from './pages/DailyPlan';
import Resources from './pages/Resources';
import Practice from './pages/Practice';
import CodingPractice from './pages/CodingPractice';
import Progress from './pages/Progress';
import WeeklyReport from './pages/WeeklyReport';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ display: 'flex', flex: 1 }}>
              <Sidebar />
              <main style={{ flex: 1, padding: '2rem', background: '#f8fafc' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/select-job" element={<SelectJob />} />

                  {/* Assessments */}
                  <Route path="/assessment" element={<Assessment />} />
                  <Route path="/assessment/technical" element={<TechnicalAssessment />} />
                  <Route path="/assessment/reasoning" element={<ReasoningAssessment />} />
                  <Route path="/assessment/aptitude" element={<AptitudeAssessment />} />
                  <Route path="/assessment/result" element={<AssessmentResult />} />

                  {/* Skills & Action */}
                  <Route path="/skill-gap" element={<SkillGap />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/daily-plan" element={<DailyPlan />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/coding-practice" element={<CodingPractice />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/weekly-report" element={<WeeklyReport />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
