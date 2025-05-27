import React from 'react';

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md rounded">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer hover:underline"
          onClick={() => onNavigate('home')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onNavigate('home');
            }
          }}
        >
          SkinSights
        </h1>
        <ul className="flex space-x-6">
          <li>
            <button
              className="hover:underline"
              onClick={() => onNavigate('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className="hover:underline"
              onClick={() => onNavigate('about')}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              className="hover:underline"
              onClick={() => onNavigate('scannow')}
            >
              ScanNow
            </button>
          </li>
          <li>
            <button
              className="hover:underline"
              onClick={() => onNavigate('Profile')}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              className="hover:bg-red-700 text-white px-3 py-1 rounded hover:underline"
              style={{ backgroundColor: '#dc2626' }}
              onClick={() => onNavigate('logout')}
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
