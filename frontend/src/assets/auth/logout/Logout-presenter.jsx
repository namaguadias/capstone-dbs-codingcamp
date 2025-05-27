import React, { useEffect } from 'react';

export default function LogoutPresenter({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <p>Logging out...</p>
    </div>
  );
}
