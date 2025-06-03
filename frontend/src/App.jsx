import React, { useState, useEffect } from "react";
import LoadingIndicator from "./assets/components/LoadingIndicator";
import Login from "./assets/auth/login/Login";
import Register from "./assets/auth/register/Register";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/home/Home";
import AboutUs from "./assets/pages/AboutUs";
import ScanNow from "./assets/pages/diagnose/ScanNow";
import Profile from "./assets/pages/profile/Profile";
import Footer from "./assets/components/Footer";
import Logout from "./assets/auth/logout/Logout";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Simpan halaman aktif ke localStorage
  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  // Ambil data user dan halaman dari localStorage
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem("currentUser");
    const storedPage = localStorage.getItem("currentPage");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedPage) setPage(storedPage);
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleLoginSuccess = (user) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setPage("home");
  };

  const handleRegisterSuccess = (user) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setPage("home");
  };

  const handleNavigate = (targetPage) => {
    // Halaman yang butuh login
    const protectedPages = ["scannow", "Profile", "logout"];
    if (protectedPages.includes(targetPage) && !user) {
      setPage("login");
    } else {
      setPage(targetPage);
    }
  };

  // Ganti judul tab sesuai halaman
  useEffect(() => {
    const pageTitleMap = {
      home: "SkinSights",
      about: "SkinSights - About Us",
      scannow: "SkinSights - Scan Now",
      Profile: "SkinSights - Profile",
      login: "SkinSights - Login",
      register: "SkinSights - Register",
    };
    document.title = pageTitleMap[page] || "SkinSights";
  }, [page]);

  // Deteksi koneksi internet
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (loading) return <LoadingIndicator />;

  const offlineBanner = !isOnline && (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
      You are currently offline.
    </div>
  );

  return (
    <>
      <Navbar onNavigate={handleNavigate} isOffline={!isOnline} />
      {offlineBanner}
      <div className="w-full min-h-screen p-6 mt-6 bg-white rounded shadow-md">
        {page === "home" && <Home />}
        {page === "about" && <AboutUs />}
        {page === "scannow" &&
          (user ? (
            <ScanNow />
          ) : (
            <Login
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setPage("register")}
            />
          ))}
        {page === "Profile" &&
          (user ? (
            <Profile />
          ) : (
            <Login
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setPage("register")}
            />
          ))}
        {page === "logout" && (user ? <Logout /> : <Home />)}
        {page === "login" && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setPage("register")}
          />
        )}
        {page === "register" && (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => setPage("login")}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
