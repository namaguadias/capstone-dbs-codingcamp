import React, { useState, useEffect } from 'react';
import AuthPresenter from '../../../presenters/Authpresenter';

export default function ProfilePresenter({ children }) {
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
        if (err.message === 'Failed to fetch current user' || err.message === 'Failed to fetch user data' || err.message === 'NetworkError when attempting to fetch resource.') {
          setError('You appear to be offline. Showing cached data if available.');
        } else {
          setError(err.message || 'Failed to fetch user data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  return children({
    formData,
    loading,
    error,
    editMode,
    saving,
    handleInputChange,
    handleToggleEdit,
    handleSave,
  });
}
