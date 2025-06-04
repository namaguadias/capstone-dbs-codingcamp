import React, { useState, useEffect } from 'react';
import LoginPresenter from './Login-presenter'; // Pastikan path ini benar

// 1. Impor semua gambar yang ingin Anda gunakan
// Pastikan path dan nama file ini BENAR dan file gambarnya ADA
import GambarPertama from '../../../assets/images/medic.jpg'; 
import GambarKedua from '../../../assets/images/medic2.jpg';   
import GambarKetiga from '../../../assets/images/medic3.jpg'; 

// 2. Buat array dari gambar yang sudah diimpor
const daftarGambarAnimasi = [GambarPertama, GambarKedua, GambarKetiga];

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [indeksGambarSaatIni, setIndeksGambarSaatIni] = useState(0);
  // Animasi awal dari kiri
  const [kelasAnimasi, setKelasAnimasi] = useState('animate-slideInFromLeft'); 

  useEffect(() => {
    // Hanya jalankan interval jika ada lebih dari satu gambar
    if (daftarGambarAnimasi.length <= 1) return; 

    const intervalId = setInterval(() => {
      setIndeksGambarSaatIni((indeksSebelumnya) => {
        const indeksBerikutnya = (indeksSebelumnya + 1) % daftarGambarAnimasi.length;
        
        // Tentukan animasi berdasarkan apakah indeksBerikutnya genap atau ganjil
        if (indeksBerikutnya % 2 === 0) { // Indeks genap (0, 2, 4...) akan slide dari kiri
          setKelasAnimasi('animate-slideInFromLeft');
        } else { // Indeks ganjil (1, 3, 5...) akan slide dari kanan
          setKelasAnimasi('animate-slideInFromRight');
        }
        return indeksBerikutnya;
      });
    }, 5000); // Ganti gambar setiap 5 detik (5000 milidetik)

    // Fungsi cleanup untuk membersihkan interval saat komponen tidak lagi digunakan
    return () => clearInterval(intervalId);
  }, []); // Array dependensi ditambahkan

  return (
    // Container utama halaman
    <div className="login-page-root min-h-screen font-sans 
                   bg-gray-100 {/* Default background mobile, bisa diubah di CSS */}
                   md:flex md:items-center md:justify-center md:bg-gradient-to-br md:from-sky-50 md:via-slate-50 md:to-purple-100 md:p-4">
      
      {/* Wrapper Utama: 
          flex-col untuk mobile (gambar atas, form bawah), 
          md:flex-row untuk desktop (form kiri, gambar kanan dengan order) 
      */}
      <div className="login-content-wrapper w-full max-w-4xl bg-white
                     flex flex-col md:flex-row md:shadow-2xl md:rounded-xl md:overflow-hidden">
        
        {/* Bagian Gambar (Slideshow) */}
        {/* Muncul di atas pada mobile, di kanan pada desktop karena md:order-2 */}
        <div className="image-column w-full h-64 sm:h-72 md:h-auto md:w-1/2 md:order-2 flex items-center justify-center bg-slate-100 md:bg-slate-50 overflow-hidden"> 
          {daftarGambarAnimasi.length > 0 && (
            <img 
              key={indeksGambarSaatIni} // Penting untuk re-trigger animasi
              src={daftarGambarAnimasi[indeksGambarSaatIni]} 
              alt="Ilustrasi Medis" 
              className={`object-cover w-full h-full ${kelasAnimasi}`} // Menggunakan kelas animasi dinamis
            />
          )}
        </div>

        {/* Kolom Formulir Login */}
        {/* Muncul di bawah gambar pada mobile, di kiri pada desktop karena md:order-1 */}
        <div className="form-column w-full md:w-1/2 md:order-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <LoginPresenter>
            {({ email, setEmail, password, setPassword, error, loading, handleLogin }) => (
              <>
                <h2 className="login-form-title text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center md:text-left">
                  Welcome Back! 
                </h2>
                <p className="login-form-subtitle text-sm text-gray-500 mb-6 sm:mb-8 text-center md:text-left">
                  Please enter your credentials to log in.
                </p>

                {error && (
                  <p className="login-error bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-md relative mb-4 text-sm" role="alert">
                    {error}
                  </p>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(onLoginSuccess); }}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter Your Email Address"
                      className="login-input w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      aria-label="Email Address"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter Your Password"
                      className="login-input w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      aria-label="Password"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="login-button w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 disabled:opacity-50 text-sm"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Sign In'}
                  </button>
                </form>

                {/* Bagian Tombol Sosial Login DIHAPUS */}
                {/* <div className="my-6 flex items-center">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-4 text-xs font-medium text-gray-400">OR</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <div className="space-y-3">
                  <button type="button" className="social-login-button google-button w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.56,12.25C22.56,11.47,22.49,10.72,22.36,10H12V14.26H17.94C17.64,15.93,16.74,17.33,15.34,18.27V21.09H19.19C21.38,19.12,22.56,15.93,22.56,12.25Z" fill="#4285F4"/><path d="M12,24C15.24,24,17.97,22.91,19.95,21.09L15.34,18.27C14.2,19,13.04,19.48,12,19.48C9.14,19.48,6.71,17.64,5.86,15.08H1.89V17.91C3.82,21.66,7.62,24,12,24Z" fill="#34A853"/><path d="M5.86,15.08C5.63,14.36,5.5,13.59,5.5,12.79C5.5,11.99,5.63,11.21,5.86,10.5L1.89,7.67C0.96,9.46,0.5,11.52,0.5,12.79C0.5,14.05,0.96,16.11,1.89,17.91L5.86,15.08Z" fill="#FBBC05"/><path d="M12,5.5C13.84,5.5,15.36,6.17,16.56,7.31L20.04,3.91C17.97,2.09,15.24,1,12,1C7.62,1,3.82,3.34,1.89,7.09L5.86,9.92C6.71,7.36,9.14,5.5,12,5.5Z" fill="#EA4335"/></svg>
                    Sign in with Google
                  </button>
                  <button type="button" className="social-login-button apple-button w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                     <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.32,12.71A4.41,4.41,0,0,0,17.4,10.88c-.79-2.23-2.67-3.59-4.81-3.6A4.55,4.55,0,0,0,8.28,10.5c-1.78.2-3.33,1.46-3.33,3.27A3.76,3.76,0,0,0,7.5,17.05c.9.33,1.65.38,2.37.38,1.14,0,2.39-.42,3.63-1.3,1.2,1,2.6,1.42,3.9,1.22A3.49,3.49,0,0,0,19.32,12.71ZM13,6.12c.78-.05,1.81.52,2.32,1.31.41.63.26,1.5-.31,2.18-.53.62-1.33.84-2.07.36S12.19,8.71,12.72,8c.45-.61.1-1.77.27-1.88Z"/></svg>
                    Sign in with Apple
                  </button>
                </div>
                */}
                
                {/* Tombol "Sign up" sekarang mungkin perlu margin atas yang lebih besar jika tombol sosial dihilangkan */}
                <p className="mt-8 text-center text-sm text-gray-600"> {/* Atau ganti <p> dengan <button> langsung jika hanya ada satu aksi */}
                  Don't have an account?{' '}
                  <button
                    onClick={() => onSwitchToRegister && onSwitchToRegister()}
                    className="font-medium text-sky-600 hover:text-sky-500 hover:underline"
                    type="button"
                  >
                    Sign up
                  </button>
                </p>
                {/* Jika Anda ingin tombol "Sign up" menjadi tombol solid seperti di Register.jsx: */}
                {/* <button
                  onClick={() => onSwitchToRegister && onSwitchToRegister()}
                  className="mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 text-sm"
                  type="button"
                >
                  Sign up
                </button> 
                */}
              </>
            )}
          </LoginPresenter>
        </div>

      </div>
    </div>
  );
};

export default Login;
