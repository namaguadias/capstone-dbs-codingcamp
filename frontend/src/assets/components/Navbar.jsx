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

const Navbar = ({ onNavigate, isOffline }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const navbarBgColor = "bg-white";
  const titleTextColor = "text-teal-700";
  const linkColor = "text-slate-600";
  const hoverAccentColor = "hover:text-teal-500";
  const iconButtonColor = "text-teal-700";
  const iconButtonHoverBg = "hover:bg-gray-100";

  const logoutButtonDesktopClasses = "bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium px-3 py-1.5 lg:px-4 lg:py-2 rounded-md transition-colors";
  const roundIconButtonBaseClasses = `w-9 h-9 rounded-full flex items-center justify-center ${iconButtonHoverBg} focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-colors`;

  // Calculate top offset based on offline popup visibility
  const topOffsetClass = isOffline ? 'top-10' : 'top-0'; // top-10 is 2.5rem = 40px approx

  return (
    <nav className={`${navbarBgColor} shadow-md fixed ${topOffsetClass} left-0 right-0 z-50 h-16 flex items-center px-4 sm:px-6 transition-top duration-300`}>
      {/* Kontainer utama flex: items-center SAJA, tanpa justify-between */}
      <div className="w-full max-w-7xl mx-auto flex items-center">

        {/* 1. KIRI: Judul Aplikasi */}
        <div className="flex-shrink-0"> {/* Tidak boleh mengecil */}
          <div
            className={`text-xl font-bold cursor-pointer ${titleTextColor} ${hoverAccentColor} transition-colors`}
            onClick={() => handleNavigate('home')}
            role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavigate('home'); }}
          >
            SkinSights
          </div>
        </div>

        {/* 2. TENGAH: Spacer (Mobile) / Navigasi Link (Desktop) */}
        {/* flex-grow membuat div ini mengambil semua sisa ruang */}
        {/* md:flex-grow-0 di desktop jika Anda ingin link navigasi tidak mengambil semua ruang jika sedikit,
            namun biasanya flex-grow di sini baik untuk desktop juga untuk centering yang lebih baik jika link sedikit.
            Untuk kasus ini, kita biarkan flex-grow di semua ukuran agar ia berfungsi sebagai spacer di mobile.
        */}
        <div className="flex-grow flex md:justify-center items-center md:px-4">
          {/* Link Navigasi Desktop - disembunyikan di mobile oleh 'hidden md:flex' */}
          <ul className="hidden md:flex space-x-2 lg:space-x-4 items-center">
            <li><button className={`text-sm font-medium ${linkColor} ${hoverAccentColor} px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md transition-colors`} onClick={() => handleNavigate('home')}>Home</button></li>
            <li><button className={`text-sm font-medium ${linkColor} ${hoverAccentColor} px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md transition-colors`} onClick={() => handleNavigate('about')}>About Us</button></li>
            <li><button className={`text-sm font-medium ${linkColor} ${hoverAccentColor} px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md transition-colors`} onClick={() => handleNavigate('scannow')}>ScanNow</button></li>
          </ul>
          {/* Di mobile, <ul> di atas disembunyikan, jadi div ini kosong namun tetap 'flex-grow',
              sehingga mendorong judul dan ikon berjauhan. */}
        </div>

        {/* 3. KANAN: Ikon-ikon */}
        <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3"> {/* Tidak boleh mengecil */}
          <button // Tombol Ikon Profile
            onClick={() => handleNavigate('Profile')}
            className={`navbar-icon-button ${iconButtonColor} ${roundIconButtonBaseClasses}`}
            aria-label="User Profile"
          >
            <ProfileIcon />
          </button>

          <div className="md:hidden"> {/* Hamburger hanya di mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`navbar-icon-button ${iconButtonColor} ${roundIconButtonBaseClasses}`}
              aria-label="Toggle menu" aria-expanded={isOpen}
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>

          <div className="hidden md:block"> {/* Tombol Logout hanya di desktop */}
            <button
              className={logoutButtonDesktopClasses}
              onClick={() => handleNavigate('logout')}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown (Tidak ada perubahan struktur di sini) */}
      <div
        className={`
          md:hidden absolute top-16 left-0 right-0 ${navbarBgColor} shadow-xl border-t border-gray-100 z-40
          transition-all duration-300 ease-in-out transform origin-top
          ${isOpen ? 'opacity-100 scale-y-100 visibility-visible' : 'opacity-0 scale-y-95 pointer-events-none visibility-hidden'}
        `}
      >
        {/* ... isi dropdown ... */}
        <ul className="pt-2 pb-3 px-3 space-y-1">
          <li><button className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${linkColor} hover:bg-teal-50 ${hoverAccentColor} transition-colors`} onClick={() => handleNavigate('home')}>Home</button></li>
          <li><button className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${linkColor} hover:bg-teal-50 ${hoverAccentColor} transition-colors`} onClick={() => handleNavigate('about')}>About Us</button></li>
          <li><button className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${linkColor} hover:bg-teal-50 ${hoverAccentColor} transition-colors`} onClick={() => handleNavigate('scannow')}>ScanNow</button></li>
          <li className="pt-1"><hr className="border-gray-200 my-1"/></li>
          <li>
            <button
              className="block w-full text-left bg-rose-500 hover:bg-rose-600 text-white font-medium px-3 py-2.5 rounded-md transition-colors mt-1"
              onClick={() => handleNavigate('logout')}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;