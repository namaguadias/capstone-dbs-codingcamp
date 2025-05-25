import { useState, useEffect } from 'react';
import './styles/index.css';
import Login from './assets/auth/login/Login';
import Register from './assets/auth/register/Register';
import Logout from './assets/auth/logout/Logout';
import Navbar from './assets/components/Navbar';
import Home from './assets/pages/home/Home';
import AboutUs from './assets/pages/AboutUs';
import ScanNow from './assets/pages/ScanNow';
import Profile from './assets/pages/Profile';
import LoadingIndicator from './assets/components/LoadingIndicator';

export default function App() {
  const [user, setUser] = useState(null); // null = belum login
  const [page, setPage] = useState('login'); // bisa 'login' atau 'register' or page names
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setPage('home'); // default to home after login
  };

  const handleRegisterSuccess = () => {
    // Do not set user here, redirect to login page instead
    setUser(null);
    setPage('login'); // redirect to login after register
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  const handleNavigate = (pageName) => {
    if (pageName === 'logout') {
      handleLogout();
    } else {
      setLoading(true);
      setPage(pageName);
    }
  };

  useEffect(() => {
    if (loading) {
      // simulate loading delay for page transition
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (user) {
    // jika sudah login, tampilkan navbar dan halaman sesuai page state
    return (
      <>
        <Navbar onNavigate={handleNavigate} />
        <div className="w-full min-h-screen p-6 mt-6 bg-white rounded shadow-md">
          {page === 'home' && <Home />}
          {page === 'about' && <AboutUs />}
          {page === 'scannow' && <ScanNow />}
          {page === 'Profile' && (
            <>
              <Profile />
            </>
          )}
        </div>
      </>
    );
  }

  // jika belum login, tampilkan login atau register sesuai state 'page'
  return (
    <div>
      {page === 'login' ? (
        <>
          <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setPage('register')} />
        </>
      ) : (
        <>
          <Register onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={() => setPage('login')} />
        </>
      )}
    </div>
  );
}
