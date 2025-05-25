import { useEffect } from 'react';
import AuthPresenter from '../../../presenters/Authpresenter.js';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    AuthPresenter.logout();
    onLogout();
  }, [onLogout]);

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <p>Logout berhasil...</p>
    </div>
  );
};

export default Logout;
