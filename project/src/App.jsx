import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigation } from "./components/Navigation";
import { ChatBot } from "./components/ChatBot";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { PartnershipPage } from "./pages/PartnershipPage";
import { AppointmentPage } from "./pages/AppointmentPage";
import { AIFeedbackPage } from "./pages/AIFeedbackPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
            />
            <Route
              path="/signup"
              element={<Signup onSignupSuccess={() => setIsLoggedIn(true)} />}
            />

            {isLoggedIn && (
              <>
                <Route
                  path="/home"
                  element={
                    <>
                      <Navigation currentPage="home" onNavigate={() => {}} />
                      <HomePage />
                      <ChatBot />
                    </>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <>
                      <Navigation currentPage="dashboard" onNavigate={() => {}} />
                      <DashboardPage />
                      <ChatBot />
                    </>
                  }
                />
                <Route
                  path="/partnership"
                  element={
                    <>
                      <Navigation currentPage="partnership" onNavigate={() => {}} />
                      <PartnershipPage />
                      <ChatBot />
                    </>
                  }
                />
                <Route
                  path="/appointment"
                  element={
                    <>
                      <Navigation currentPage="appointment" onNavigate={() => {}} />
                      <AppointmentPage />
                      <ChatBot />
                    </>
                  }
                />
                <Route
                  path="/ai-feedback"
                  element={
                    <>
                      <Navigation currentPage="ai-feedback" onNavigate={() => {}} />
                      <AIFeedbackPage />
                      <ChatBot />
                    </>
                  }
                />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
