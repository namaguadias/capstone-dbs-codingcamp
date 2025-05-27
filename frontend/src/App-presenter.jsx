import React from "react";
import Login from "./assets/auth/login/Login";
import Register from "./assets/auth/register/Register";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/home/Home";
import AboutUs from "./assets/pages/AboutUs";
import ScanNow from "./assets/pages/diagnose/ScanNow";
import Profile from "./assets/pages/profile/Profile";
import Footer from "./assets/components/Footer";
import Logout from "./assets/auth/logout/Logout";

export default function AppPresenter({
  user,
  page,
  loading,
  handleLoginSuccess,
  handleRegisterSuccess,
  handleNavigate,
}) {
  if (loading) {
    return null; // Loading handled in container
  }

  if (user) {
    return (
      <>
        <Navbar onNavigate={handleNavigate} />
        <div className="w-full min-h-screen p-6 mt-6 bg-white rounded shadow-md">
          {page === "home" && <Home />}
          {page === "about" && <AboutUs />}
          {page === "scannow" && <ScanNow />}
          {page === "Profile" && <Profile />}
          {page === "logout" && <Logout />}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      {page === "login" ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => handleNavigate("register")}
        />
      ) : (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => handleNavigate("login")}
        />
      )}
    </div>
  );
}
