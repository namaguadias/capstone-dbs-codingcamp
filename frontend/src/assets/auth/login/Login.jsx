import { useState, useEffect } from 'react';
import AuthPresenter from '../../../presenters/Authpresenter.js';

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await AuthPresenter.login({ email, password });
      onLoginSuccess(user);
    } catch (err) {
      setError('Login gagal: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        onClick={handleLogin}
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
  );
};

export default Login;
