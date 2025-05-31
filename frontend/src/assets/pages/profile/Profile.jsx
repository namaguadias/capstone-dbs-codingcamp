import React from 'react'; // useRef tidak lagi diperlukan di sini
import ProfilePresenter from './Profile-presenter';
import LoadingProfile from '../../components/LoadingProfile';

const SimpleLoader = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-128px)]"> {/* Sesuaikan min-h */}
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
    <p className="ml-4 text-lg text-sky-700">Loading Profile...</p>
  </div>
);

const ProfileDataItem = ({ label, value }) => (
  <div>
    <label className="block text-xs sm:text-sm font-semibold text-gray-500 mb-1">{label}:</label>
    <p className="text-base sm:text-lg text-gray-800 p-3 bg-slate-50 rounded-md min-h-[48px] flex items-center break-words">
      {value || <span className="italic text-gray-400">Belum diisi</span>}
    </p>
  </div>
);

export default function Profile() {
  // fileInputRef dan triggerFileInput tidak lagi diperlukan

  return (
    <ProfilePresenter>
      {({
        formData,
        loading,
        error: generalError,
        editMode,
        saving,
        handleInputChange,
        handleToggleEdit,
        handleSave,
        // imagePreviewUrl dan handleProfileImageChange dihapus dari props yang digunakan
      }) => {
        if (loading) {
          return LoadingProfile ? <LoadingProfile /> : <SimpleLoader />;
        }
        
        // triggerFileInput tidak lagi diperlukan

        return (
          <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 py-8 sm:py-12 px-4 animate-fadeIn">
            <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl">
              <header className="mb-8 text-center border-b border-gray-200 pb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 tracking-tight">
                  Profil Pengguna
                </h1>
              </header>

              {/* Bagian Foto Profil DIHAPUS */}
              
              {generalError && !editMode && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
                  Error: {generalError}
                </div>
              )}

              <form className="space-y-6" onSubmit={e => { e.preventDefault(); if(editMode) handleSave(); }}>
                {editMode ? (
                  <>
                    {/* Input fields untuk mode edit */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama:</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Usia:</label>
                      <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat:</label>
                      <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin:</label>
                      <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                        <option value="">Pilih jenis kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Menampilkan data sebagai teks jika tidak edit mode */}
                    <ProfileDataItem label="Nama" value={formData.name} />
                    <ProfileDataItem label="Usia" value={formData.age} />
                    <ProfileDataItem label="Alamat" value={formData.address} />
                    <ProfileDataItem label="Jenis Kelamin" value={formData.gender === 'L' ? 'Laki-laki' : formData.gender === 'P' ? 'Perempuan' : ''} />
                  </>
                )}

                <div className="pt-8 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0">
                  {/* Tombol-tombol */}
                  {!editMode ? (
                    <button type="button" onClick={handleToggleEdit} className="w-full sm:w-auto btn bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-sky-600 hover:to-cyan-600 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                      Update Profile
                    </button>
                  ) : (
                    <>
                      <button type="button" onClick={handleSave} disabled={saving} className="w-full sm:w-auto btn bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-600 transition duration-150 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        {saving ? (<span className="flex items-center justify-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Menyimpan...</span>) : 'Simpan Perubahan'}
                      </button>
                      <button type="button" onClick={handleToggleEdit} disabled={saving} className="w-full sm:w-auto btn bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                        Batal
                      </button>
                    </>
                  )}
                </div>
                {editMode && generalError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm text-center">
                    Error: {generalError}
                  </div>
                )}
              </form>
            </div>
          </div>
        );
      }}
    </ProfilePresenter>
  );
}