import React from 'react'; // useState telah dihapus dari import
import RegisterPresenter from './Register-presenter'; // Pastikan path ini benar

// Tidak ada import gambar atau useEffect karena slideshow sudah dihilangkan

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
  // Tidak ada state atau logika slideshow di sini

  return (
    <div className="login-page-root min-h-screen font-sans 
                   bg-gray-100 
                   md:flex md:items-center md:justify-center md:bg-gradient-to-r md:from-sky-100 md:via-indigo-50 md:to-purple-50 md:p-4">
      
      {/* Wrapper Konten Utama - Hanya berisi form */}
      {/* Pastikan max-w-md hanya ada satu kali di sini */}
      <div className="login-content-wrapper w-full max-w-md bg-white
                     flex flex-col 
                     md:shadow-2xl md:rounded-xl md:overflow-hidden">
        
        {/* Kolom Formulir Daftar */}
        <div className="form-column w-full 
                        p-6 pt-4 sm:p-8 md:p-10 flex flex-col justify-center">
          <RegisterPresenter>
            {({ form, error, loading, setForm, handleRegister }) => (
              <>
                <h2 className="register-title text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
                  Create New Account
                </h2>

                {error && (
                  <p className="register-error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm" role="alert">
                    {error}
                  </p>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleRegister(onRegisterSuccess); }}>
                  <div className="grid grid-cols-1 gap-y-4">
                    <div className="relative">
                        <label htmlFor="name" className="register-label sr-only">Nama</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Full name"
                            className="register-input w-full"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="email-register" className="register-label sr-only">Email</label>
                        <input
                            id="email-register"
                            type="email"
                            placeholder="Email address"
                            className="register-input w-full"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password-register" className="register-label sr-only">Password</label>
                        <input
                            id="password-register"
                            type="password"
                            placeholder="Password"
                            className="register-input w-full"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    
                    <div className="relative">
                        <label htmlFor="confirm-password-register" className="register-label sr-only">Confirm Password</label>
                        <input
                            id="confirm-password-register"
                            type="password"
                            placeholder="Confirm Password"
                            className="register-input w-full"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="age" className="register-label sr-only">Usia</label>
                        <input
                            id="age"
                            type="number"
                            placeholder="Age"
                            className="register-input w-full"
                            value={form.age}
                            onChange={e => setForm({ ...form, age: Number(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="address" className="register-label sr-only">Alamat</label>
                        <textarea
                            id="address"
                            placeholder="Address"
                            className="register-input w-full min-h-[80px]"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="gender" className="register-label sr-only">Jenis Kelamin</label>
                        <select
                            id="gender"
                            className="register-input w-full"
                            value={form.gender}
                            onChange={e => setForm({ ...form, gender: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="L">Male</option>
                            <option value="P">Female</option>
                        </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="register-button w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-md"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Sign Up'}
                  </button>
                </form>
                
                <p className="mt-8 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => onSwitchToLogin && onSwitchToLogin()}
                    className="font-medium text-sky-600 hover:text-sky-500 hover:underline"
                    type="button"
                  >
                    Log in
                  </button>
                </p>
              </>
            )}
          </RegisterPresenter>
        </div>
      </div>
    </div>
  );
};

export default Register;