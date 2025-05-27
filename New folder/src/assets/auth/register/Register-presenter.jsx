import { useState, useEffect } from 'react';
import AuthPresenter from '../../../presenters/Authpresenter.js';

export default function RegisterPresenter({ children }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const handleRegister = async (onRegisterSuccess) => {
    // Basic validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.age ||
      !form.address ||
      !form.gender
    ) {
      setError('Semua field harus diisi');
      return;
    }

    setLoading(true);
    const registerData = form;

    try {
      // Kirim ke presenter untuk daftar
      const user = await AuthPresenter.register(registerData);

      onRegisterSuccess(user);
    } catch (err) {
      setError('Register gagal: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return children({
    form,
    error,
    loading,
    setForm,
    handleRegister,
  });
}
