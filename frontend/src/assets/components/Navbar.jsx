import React, { useState } from 'react';

// Komponen Ikon SVG (Tidak ada perubahan)
const HamburgerIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ProfileIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const Navbar = ({ onNavigate, isOffline, user }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk menu mobile

  // State untuk notifikasi login
  const [showLoginNotif, setShowLoginNotif] = useState(false);
  const [notifTimeout, setNotifTimeout] = useState(null);

  // Fungsi untuk trigger notifikasi login
  const triggerLoginNotif = () => {
    setShowLoginNotif(true);
    if (notifTimeout) clearTimeout(notifTimeout);
    const timeout = setTimeout(() => setShowLoginNotif(false), 2500);
    setNotifTimeout(timeout);
  };

  // Modifikasi handleNavigate
  const handleNavigate = (page) => {
    if ((page === 'Profile' || page === 'scannow') && !user) {
      triggerLoginNotif();
      setIsOpen(false); // Tutup menu jika notifikasi muncul
      return;
    }
    onNavigate(page);
    setIsOpen(false); // Selalu tutup menu setelah navigasi
  };

  const navbarBgColor = "bg-white";
  const titleTextColor = "text-teal-700";
  const linkColor = "text-slate-600";
  const hoverAccentColor = "hover:text-teal-500";
  const topOffsetClass = isOffline ? 'top-10' : 'top-0';

  return (
    <nav className={`${navbarBgColor} shadow-md fixed ${topOffsetClass} left-0 right-0 z-50 h-16 flex items-center px-4 sm:px-6 transition-top duration-300`}>
      {/* Notifikasi login dibutuhkan */}
      {showLoginNotif && (
        <div className="fixed top-4 left-1/2 z-[9999] -translate-x-1/2 flex items-center px-5 py-3 rounded-lg shadow-lg bg-white border border-red-200 animate-fadeInSlideDown">
          <svg className="w-6 h-6 text-red-500 mr-2 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
          <span className="text-red-600 font-semibold text-sm">Anda harus login untuk mengakses fitur ini.</span>
        </div>
      )}
      <div className="w-full max-w-7xl mx-auto flex items-center">
        {/* 1. KIRI: Judul Aplikasi */}
        <div className="flex-shrink-0">
          <div
            className={`text-xl font-bold cursor-pointer ${titleTextColor} ${hoverAccentColor} transition-colors`}
            onClick={() => handleNavigate('home')}
            role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavigate('home'); }}
          >
            SkinSights
          </div>
        </div>

        {/* 2. TENGAH: Spacer (Mobile) / Navigasi Link (Desktop) */}
        <div className="flex-grow flex md:justify-center items-center md:px-4">
          <ul className="hidden md:flex space-x-2 lg:space-x-4 items-center">
            <li><button className={`text-sm font-medium ${linkColor} ${hoverAccentColor} px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md transition-colors`} onClick={() => handleNavigate('home')}>Home</button></li>
            <li><button className={`text-sm font-medium ${linkColor} ${hoverAccentColor} px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md transition-colors`} onClick={() => handleNavigate('about')}>About Us</button></li>
            <li><button className={`text-sm font-medium ${linkColor} ${hoverAccentColor} px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md transition-colors`} onClick={() => handleNavigate('scannow')}>ScanNow</button></li>
          </ul>
        </div>

        {/* 3. KANAN: Tombol Profile/Logout (Desktop) DAN Tombol Hamburger untuk Mobile */}
        <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
          {/* === AWAL PERUBAHAN: Wrapper untuk Tombol Desktop === */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
            {/* Profile & Logout (kanan) hanya jika login */}
            {user && (
              <>
                <button
                  className="flex items-center gap-1 text-slate-600 hover:text-teal-500 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md transition-colors text-sm font-medium"
                  onClick={() => handleNavigate('Profile')}
                >
                  <ProfileIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
                <button
                  style={{ backgroundColor: '#dc2626' }}
                  className="text-white text-xs font-medium px-3 py-1.5 lg:px-4 lg:py-2 rounded-md transition-colors hover:brightness-90 focus:brightness-90"
                  onClick={() => handleNavigate('logout')}
                >
                  Logout
                </button>
              </>
            )}
            {/* Login (kanan) jika belum login */}
            {!user && (
              <button
                style={{ backgroundColor: '#16a34a' }}
                className="text-white text-xs font-medium px-3 py-1.5 lg:px-4 lg:py-2 rounded-md transition-colors hover:brightness-90 focus:brightness-90"
                onClick={() => handleNavigate('login')}
              >
                Login
              </button>
            )}
          </div>
          {/* === AKHIR PERUBAHAN === */}

          {/* Tombol Hamburger (Hanya Mobile) */}
          <div className="md:hidden"> {/* Wrapper ini memastikan tombol hamburger hanya tampil di mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)} // Fungsi untuk toggle state isOpen
              className={`navbar-hamburger-button p-1.5 rounded-md ${linkColor} ${hoverAccentColor} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <CloseIcon className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown (Struktur tidak diubah, hanya perilakunya dikontrol oleh isOpen) */}
      <div
        className={`
          md:hidden absolute top-16 left-0 right-0 ${navbarBgColor} shadow-xl border-t border-gray-100 z-40
          transition-all duration-300 ease-in-out transform origin-top
          ${isOpen ? 'opacity-100 scale-y-100 visibility-visible' : 'opacity-0 scale-y-95 pointer-events-none visibility-hidden'}
        `}
      >
        <ul className="pt-2 pb-3 px-3 space-y-1">
          <li><button className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${linkColor} hover:bg-teal-50 ${hoverAccentColor} transition-colors`} onClick={() => handleNavigate('home')}>Home</button></li>
          <li><button className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${linkColor} hover:bg-teal-50 ${hoverAccentColor} transition-colors`} onClick={() => handleNavigate('about')}>About Us</button></li>
          <li><button className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${linkColor} hover:bg-teal-50 ${hoverAccentColor} transition-colors`} onClick={() => handleNavigate('scannow')}>ScanNow</button></li>
          {user && ( // Tambahkan Profile ke dropdown mobile jika user login
            <li><button className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${linkColor} hover:bg-teal-50 ${hoverAccentColor} transition-colors`} onClick={() => handleNavigate('Profile')}>Profile</button></li>
          )}
          <li className="pt-1"><hr className="border-gray-200 my-1"/></li>
          <li>
            {user ? (
              <button
                style={{ backgroundColor: '#dc2626' }}
                className="block w-full text-left text-white text-sm font-medium px-3 py-2.5 rounded-md transition-colors hover:bg-red-700"
                onClick={() => handleNavigate('logout')}
              >
                Logout
              </button>
            ) : (
              <button
                style={{ backgroundColor: '#16a34a' }}
                className="block w-full text-left text-white text-sm font-medium px-3 py-2.5 rounded-md transition-colors hover:bg-green-700"
                onClick={() => handleNavigate('login')}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;