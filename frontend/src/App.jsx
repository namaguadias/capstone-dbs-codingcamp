import React, { useState, useEffect } from 'react';
import LoadingIndicator from './assets/components/LoadingIndicator';
import Login from './assets/auth/login/Login';
import Register from './assets/auth/register/Register';
import Navbar from './assets/components/Navbar';
import Home from './assets/pages/home/Home';
import AboutUs from './assets/pages/AboutUs';
import ScanNow from './assets/pages/diagnose/ScanNow';
import Profile from './assets/pages/profile/Profile';
import Footer from './assets/components/Footer';
import Logout from './assets/auth/logout/Logout';

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleLoginSuccess = (user) => {
    setUser(user);
    setPage('home');
  };

  const handleRegisterSuccess = (user) => {
    setUser(user);
    setPage('home');
  };

  const handleNavigate = (page) => {
    setLoading(true);
    setPage(page);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    setLoading(true);
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setPage('home');
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Update document title based on current page
  useEffect(() => {
    const pageTitleMap = {
      home: 'SkinSights',
      about: 'SkinSights - About Us',
      scannow: 'SkinSights - ScanNow',
      Profile: 'SkinSights - Profile',
      login: 'SkinSights - Login',
      register: 'SkinSights - Register',
    };
    document.title = pageTitleMap[page] || 'SkinSights';
  }, [page]);

  // Listen for online/offline events to update isOnline state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (user) {
    return (
      <>
        <Navbar onNavigate={handleNavigate} />
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
            You are currently offline.
          </div>
        )}
        <div className="w-full min-h-screen p-6 mt-6 bg-white rounded shadow-md">
          {page === 'home' && <Home />}
          {page === 'about' && <AboutUs />}
          {page === 'scannow' && <ScanNow />}
          {page === 'Profile' && <Profile />}
          {page === 'logout' && <Logout />}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      {page === 'login' ? (
        <>
          {!isOnline && (
            <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
              You are currently offline.
            </div>
          )}
          <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => handleNavigate('register')} />
        </>
      ) : (
        <>
          {!isOnline && (
            <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
              You are currently offline.
            </div>
          )}
          <Register onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={() => handleNavigate('login')} />
        </>
      )}
    </div>
  );
}
