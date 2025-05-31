import { useState, useEffect } from 'react';
import AuthPresenter from '../../../data/api'; // Pastikan path ini benar

export default function ProfilePresenter({ children }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    gender: '',
    profileImageUrl: '', // Tambahkan field untuk URL gambar profil
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // State baru untuk foto profil
  const [selectedFile, setSelectedFile] = useState(null); // File gambar yang dipilih untuk diunggah
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // URL untuk pratinjau gambar

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = await AuthPresenter.getCurrentUser(); // Asumsi mengembalikan user dengan profileImageUrl
        if (user) {
          const userData = {
            name: user.nama || '',
            age: user.usia || '',
            address: user.alamat || '',
            gender: user.jenisKelamin || '',
            profileImageUrl: user.profileImageUrl || '', // Ambil URL gambar profil
          };
          setFormData(userData);
          setImagePreviewUrl(user.profileImageUrl || null); // Set pratinjau awal
        }
      } catch (err) {
        // ... (penanganan error yang sudah ada) ...
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

  // Fungsi baru untuk menangani pemilihan file gambar
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Buat URL pratinjau sementara
      if (!editMode) setEditMode(true); // Otomatis masuk mode edit jika gambar diubah
    } else {
      // Opsional: Tampilkan pesan error jika file bukan gambar
      console.warn('Please select a valid image file.');
      // Atau setError('Please select a valid image file.');
    }
  };
  
  const originalImageBeforeEdit = formData.profileImageUrl; // Simpan URL gambar asli

  const handleToggleEdit = () => {
    if (editMode) { // Jika membatalkan edit
      setSelectedFile(null); // Hapus file yang dipilih jika ada
      setImagePreviewUrl(originalImageBeforeEdit); // Kembalikan ke gambar profil asli
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
    let newImageUrl = formData.profileImageUrl; // Default ke URL gambar yang sudah ada

    try {
      // **LANGKAH 1: UNGGAH GAMBAR JIKA ADA FILE BARU YANG DIPILIH**
      if (selectedFile) {
        console.log("Uploading new profile image...", selectedFile.name);
        // ======================================================================
        // TODO: LOGIKA UNGGAH GAMBAR KE CLOUD STORAGE (MISALNYA FIREBASE STORAGE)
        // Ini adalah placeholder. Anda perlu mengimplementasikan fungsi upload sebenarnya.
        // Fungsi upload ini harus mengembalikan URL publik dari gambar yang diunggah.
        // Contoh: newImageUrl = await AuthPresenter.uploadProfileImage(selectedFile);
        // Untuk sekarang, kita akan simulasikan dengan pesan:
        alert("Simulasi: Gambar '" + selectedFile.name + "' akan diunggah. Implementasikan fungsi unggah sebenarnya.");
        // Setelah berhasil diunggah dan mendapatkan URL baru, set newImageUrl
        // newImageUrl = "URL_GAMBAR_BARU_DARI_SERVER"; // Ganti dengan URL hasil upload
        // ======================================================================
        // Jika simulasi/placeholder, mungkin jangan update newImageUrl agar tidak error
        // atau, jika Anda punya backend dummy:
        // newImageUrl = `https://via.placeholder.com/150x150.png?text=${selectedFile.name.substring(0,5)}`;
      }

      // **LANGKAH 2: PERSIAPKAN DATA PROFIL UNTUK DISIMPAN**
      const profileData = {
        nama: formData.name,
        usia: parseInt(formData.age, 10) || null, // Pastikan usia adalah angka atau null
        alamat: formData.address,
        jenisKelamin: formData.gender,
        profileImageUrl: newImageUrl, // Gunakan URL gambar baru (jika ada) atau yang lama
      };

      // **LANGKAH 3: UPDATE PROFIL PENGGUNA**
      // Asumsi AuthPresenter.updateProfile bisa menangani semua field ini termasuk profileImageUrl
      await AuthPresenter.updateProfile(profileData); 
      // Mungkin juga perlu updateUserInfo jika itu adalah entitas terpisah
      // await AuthPresenter.updateUserInfo(profileData); // Jika ada fungsi terpisah

      setFormData(prev => ({ ...prev, ...profileData })); // Update formData lokal dengan data yang berhasil disimpan
      setSelectedFile(null); // Hapus file yang dipilih setelah berhasil disimpan
      // imagePreviewUrl sudah diupdate dengan URL gambar baru jika upload berhasil,
      // atau tetap dengan URL lama jika tidak ada gambar baru.
      // Jika newImageUrl didapat dari server, pastikan setImagePreviewUrl(newImageUrl) juga dipanggil.
      setEditMode(false);
      alert("Profil berhasil diperbarui!"); // Atau notifikasi yang lebih baik

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
    // Prop baru untuk foto profil
    imagePreviewUrl,
    handleProfileImageChange,
  });
}