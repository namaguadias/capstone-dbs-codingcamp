import React from 'react';
import ProfilePresenter from './Profile-presenter';
import LoadingProfile from '../../components/LoadingProfile';

export default function User() {
  return (
    <ProfilePresenter>
      {({
        formData,
        loading,
        error,
        editMode,
        saving,
        handleInputChange,
        handleToggleEdit,
        handleSave,
      }) => {
        if (loading) {
          return <LoadingProfile />;
        }

        if (error) {
          return <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left text-red-600">Error: {error}</div>;
        }

        return (
          <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left animate-fadeIn">
            <h1 className="text-4xl font-extrabold mb-8 text-[#0077B6] tracking-wide">Profil Pengguna</h1>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block font-semibold mb-2 text-[#2C7A7B]">Nama:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  className={`border rounded-lg px-4 py-3 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00B4D8] ${editMode ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                />
              </div>
              <div>
                <label htmlFor="age" className="block font-semibold mb-2 text-[#2C7A7B]">Usia:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  className={`border rounded-lg px-4 py-3 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00B4D8] ${editMode ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                />
              </div>
              <div>
                <label htmlFor="address" className="block font-semibold mb-2 text-[#2C7A7B]">Alamat:</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  className={`border rounded-lg px-4 py-3 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00B4D8] ${editMode ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                />
              </div>
              <div>
                <label htmlFor="gender" className="block font-semibold mb-2 text-[#2C7A7B]">Jenis Kelamin:</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`border rounded-lg px-4 py-3 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00B4D8] ${editMode ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div className="flex space-x-6 mt-6">
                {!editMode && (
                  <button
                    type="button"
                    onClick={handleToggleEdit}
                    className="btn bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white px-6 py-3 rounded-lg shadow-lg hover:from-[#00B4D8] hover:to-[#0077B6] transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Update Profile
                  </button>
                )}
                {editMode && (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="btn bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white px-6 py-3 rounded-lg shadow-lg hover:from-[#0077B6] hover:to-[#00B4D8] transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={handleToggleEdit}
                      disabled={saving}
                      className="btn bg-gray-400 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
              {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
            </form>
          </div>
        );
      }}
    </ProfilePresenter>
  );
}
