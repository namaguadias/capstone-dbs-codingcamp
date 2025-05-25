import React, { useState, useEffect } from 'react';
import AuthPresenter from '../../presenters/Authpresenter';

export default function User() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    gender: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch user data from API
        const user = await AuthPresenter.getCurrentUser();
        if (user) {
          setFormData({
            name: user.nama || '',
            age: user.usia || '',
            address: user.alamat || '',
            gender: user.jenisKelamin || '',
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left">Loading profile...</div>;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left text-red-600">Error: {error}</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleEdit = () => {
    setEditMode(!editMode);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      // Prepare data for update
      const profileData = {
        nama: formData.name,
        usia: parseInt(formData.age, 10),
        alamat: formData.address,
        jenisKelamin: formData.gender,
      };
      // Update profile and user info
      await AuthPresenter.updateProfile(profileData);
      await AuthPresenter.updateUserInfo(profileData);
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left">
      <h1 className="text-3xl font-bold mb-6 text-[#ffffff]">Profil</h1>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">Nama:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`border rounded px-3 py-2 w-full ${editMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
          />
        </div>
        <div>
          <label htmlFor="age" className="block font-semibold mb-1">Usia:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`border rounded px-3 py-2 w-full ${editMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
          />
        </div>
        <div>
          <label htmlFor="address" className="block font-semibold mb-1">Alamat:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`border rounded px-3 py-2 w-full ${editMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
          />
        </div>
        <div>
          <label htmlFor="gender" className="block font-semibold mb-1">Jenis Kelamin:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`border rounded px-3 py-2 w-full ${editMode ? '' : 'bg-gray-100 cursor-not-allowed'}`}
          >
            <option value="">Pilih jenis kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div className="flex space-x-4 mt-4">
          {!editMode && (
            <button
              type="button"
              onClick={handleToggleEdit}
              className="btn bg-blue-600 text-white px-4 py-2 rounded"
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
                className="btn bg-green-600 text-white px-4 py-2 rounded"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleToggleEdit}
                disabled={saving}
                className="btn bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
