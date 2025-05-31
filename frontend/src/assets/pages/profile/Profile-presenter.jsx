import { useState, useEffect } from 'react';
import AuthPresenter from '../../../data/api'; // Pastikan path ini benar

export default function ProfilePresenter({ children }) {
  // Menghapus profileImageUrl dari state awal formData
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

  // State yang berkaitan dengan foto profil DIHAPUS:
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = await AuthPresenter.getCurrentUser();
        if (user) {
          const userData = {
            name: user.nama || '',
            age: user.usia || '',
            address: user.alamat || '',
            gender: user.jenisKelamin || '',
            // profileImageUrl dihapus dari sini
          };
          setFormData(userData);
          // setImagePreviewUrl dihapus dari sini
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
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

  // Fungsi handleProfileImageChange DIHAPUS
  // const handleProfileImageChange = (event) => { ... };
  
  // originalImageBeforeEdit DIHAPUS karena tidak ada lagi gambar
  // const originalImageBeforeEdit = formData.profileImageUrl; 

  const handleToggleEdit = () => {
    if (editMode) {
      // Logika reset gambar saat batal edit DIHAPUS
      // setSelectedFile(null);
      // setImagePreviewUrl(originalImageBeforeEdit);
      // TODO: Mungkin perlu fetch ulang formData dari server atau reset ke state awal fetch
      // Untuk sementara, kita reset formData ke kondisi sebelum diedit jika memungkinkan
      // atau biarkan seperti ini dan pengguna harus refresh jika ingin data benar-benar kembali
    }
    setEditMode(!editMode);
    setError(null); // Hapus error saat toggle mode
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    // let newImageUrl = formData.profileImageUrl; // Dihapus

    try {
      // LANGKAH 1: UNGGAH GAMBAR DIHAPUS
      // if (selectedFile) { ... }

      // LANGKAH 2: PERSIAPKAN DATA PROFIL UNTUK DISIMPAN
      const profileData = {
        nama: formData.name,
        usia: parseInt(formData.age, 10) || null,
        alamat: formData.address,
        jenisKelamin: formData.gender,
        // profileImageUrl dihapus dari data yang disimpan
      };

      // LANGKAH 3: UPDATE PROFIL PENGGUNA
      await AuthPresenter.updateProfile(profileData); 
      // Mungkin juga perlu updateUserInfo jika itu adalah entitas terpisah
      // await AuthPresenter.updateUserInfo(profileData);

      setFormData(prev => ({ ...prev, ...profileData }));
      // setSelectedFile(null); // Dihapus
      setEditMode(false);
      alert("Profil berhasil diperbarui!");

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
    // Prop untuk foto profil DIHAPUS:
    // imagePreviewUrl,
    // handleProfileImageChange,
  });
}
