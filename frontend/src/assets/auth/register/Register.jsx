import { useState, useEffect } from 'react';
import AuthPresenter from '../../../presenters/Authpresenter.js';

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
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

  const handleRegister = async () => {
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

  return (
    <div className="p-6 max-w-md mx-auto form-background">
      <h2 className="text-2xl font-bold mb-4">Daftar</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Nama"
        className="input mb-2 w-full"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="input mb-2 w-full"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="input mb-2 w-full"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      {/* Removed confirm password input */}
      <input
        type="number"
        placeholder="Usia"
        className="input mb-2 w-full"
        value={form.age}
        onChange={e => setForm({ ...form, age: e.target.value })}
      />
      <textarea
        placeholder="Alamat"
        className="input mb-2 w-full"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
      />
      <select
        className="input mb-2 w-full"
        value={form.gender}
        onChange={e => setForm({ ...form, gender: e.target.value })}
      >
        <option value="">Pilih jenis kelamin</option>
        <option value="L">Laki-Laki</option>
        <option value="P">Perempuan</option>
      </select>

      <button
        onClick={handleRegister}
        className="btn bg-green-600 text-white w-full mb-2"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Daftar'}
      </button>

      <p className="text-center text-sm">
        Sudah punya akun?{' '}
        <button
          onClick={() => onSwitchToLogin && onSwitchToLogin()}
          className="text-blue-600 underline"
          type="button"
        >
          Masuk di sini
        </button>
      </p>
    </div>
  );
};

export default Register;
