import React from 'react';
import LoginPresenter from './Login-presenter';

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  return (
    <LoginPresenter>
      {({ email, setEmail, password, setPassword, error, loading, handleLogin }) => (
        <div className="p-6 max-w-md mx-auto form-background">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="input mb-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input mb-4 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={() => handleLogin(onLoginSuccess)}
            className="btn bg-blue-600 text-white w-full mb-2"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Masuk'}
          </button>
          <p className="text-center text-sm">
            Belum punya akun?{' '}
            <button
              onClick={() => onSwitchToRegister && onSwitchToRegister()}
              className="text-green-600 underline"
              type="button"
            >
              Daftar di sini
            </button>
          </p>
        </div>
      )}
    </LoginPresenter>
  );
};

export default Login;
