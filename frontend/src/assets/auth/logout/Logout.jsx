import React from 'react';
import AuthPresenter from '../../../data/api.js';
import LogoutPresenter from './Logout-presenter';

export default function Logout() {
  const handleLogout = () => {
    AuthPresenter.logout();
    window.location.href = '/login'; // Manual redirect to login page
  };

  return <LogoutPresenter onLogout={handleLogout} />;
}
