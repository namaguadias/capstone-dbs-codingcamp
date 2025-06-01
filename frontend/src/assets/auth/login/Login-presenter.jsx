import { useState, useEffect } from 'react';
import AuthPresenter, { DiagnosisAPI } from '../../../data/api';

export default function LoginPresenter({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleLogin = async (onLoginSuccess) => {
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

  return children({
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  });
}
