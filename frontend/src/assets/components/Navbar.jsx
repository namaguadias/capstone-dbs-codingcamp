import React, { useState } from 'react';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol menu mobile

  // Fungsi untuk menangani navigasi dan menutup menu mobile
  const handleNavigate = (page) => {
    onNavigate(page);
    setIsOpen(false); // Tutup menu setelah navigasi
  };

  return (
    <nav className="bg-[#0077B6] text-white p-4 shadow-md sticky top-0 z-50 h-16 flex items-center">
      <div className="w-full flex justify-between items-center">

        {/* Judul Aplikasi */}
        <h1
          className="text-xl font-bold cursor-pointer hover:underline"
          onClick={() => handleNavigate('home')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleNavigate('home');
            }
          }}
        >
          SkinSights
        </h1>

        {/* Menu Desktop (Hidden di Mobile) */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <button className="hover:underline" onClick={() => handleNavigate('home')}>
              Home
            </button>
          </li>
          <li>
            <button className="hover:underline" onClick={() => handleNavigate('about')}>
              About Us
            </button>
          </li>
          <li>
            <button className="hover:underline" onClick={() => handleNavigate('scannow')}>
              ScanNow
            </button>
          </li>
          <li>
            <button className="hover:underline" onClick={() => handleNavigate('Profile')}>
              Profile
            </button>
          </li>
          <li>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-200"
              onClick={() => handleNavigate('logout')}
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Tombol Hamburger (Hanya di Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none text-2xl" // Tombol ikon
          >
            {isOpen ? 'X' : '☰'} {/* Ganti dengan ikon jika ada */}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Dropdown / Muncul saat Hamburger diklik) */}
      <ul
        className={`
          md:hidden absolute top-16 left-0 right-0 bg-[#0077B6] shadow-xl 
          p-4 space-y-3 text-center transition-all duration-300 ease-in-out
          ${isOpen ? 'block opacity-100' : 'hidden opacity-0'} 
          border-t border-blue-500
        `}
      >
        <li>
          <button className="hover:underline w-full py-2" onClick={() => handleNavigate('home')}>
            Home
          </button>
        </li>
        <li>
          <button className="hover:underline w-full py-2" onClick={() => handleNavigate('about')}>
            About Us
          </button>
        </li>
        <li>
          <button className="hover:underline w-full py-2" onClick={() => handleNavigate('scannow')}>
            ScanNow
          </button>
        </li>
        <li>
          <button className="hover:underline w-full py-2" onClick={() => handleNavigate('Profile')}>
            Profile
          </button>
        </li>
        <li>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition duration-200 w-full mt-2"
            onClick={() => handleNavigate('logout')}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;