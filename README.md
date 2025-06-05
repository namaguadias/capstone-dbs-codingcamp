# SkinSight - Sistem Deteksi & Edukasi Penyakit Kulit

SkinSight adalah aplikasi web untuk deteksi awal dan edukasi penyakit kulit berbasis AI, terdiri dari tiga komponen utama:
- **Frontend** (React + Tailwind CSS)
- **Backend** (Node.js, Hapi.js, Drizzle ORM, PostgreSQL)
- **Machine Learning API** (Flask + TensorFlow)

---

## Struktur Proyek

```
.
├── backend/           # Backend API (Node.js, Hapi.js, Drizzle ORM)
├── frontend/          # Frontend React (Vite, Tailwind CSS)
├── machine learning/  # Model & API ML (Flask, TensorFlow)
```

---

## 1. Backend

### Prasyarat
- Node.js v18+
- PostgreSQL (atau gunakan layanan cloud seperti Supabase)
- Salin `.env.example` menjadi `.env` dan sesuaikan konfigurasi database & JWT

### Instalasi & Migrasi Database

```sh
cd backend
npm install
# Jalankan migrasi database
npm run migrate
```

### Menjalankan Backend

```sh
npm run dev
# atau
node index.js
```

---

## 2. Frontend

### Prasyarat
- Node.js v18+

### Instalasi

```sh
cd frontend
npm install
```

### Menjalankan Frontend (Vite)

```sh
npm run dev
```

Frontend akan berjalan di [http://localhost:5173](http://localhost:5173) secara default.

---

## 3. Machine Learning API

### Prasyarat
- Python 3.8+
- pip

### Instalasi

```sh
cd "machine learning/API-ML"
pip install -r requirements.txt
# Jika file requirements.txt belum ada, install manual:
pip install flask tensorflow pillow numpy
```

### Menjalankan API ML

```sh
python app.py
```

API akan berjalan di [http://localhost:5000](http://localhost:5000) secara default.

---

## 4. Konfigurasi Koneksi

- Pastikan URL backend dan ML API sudah sesuai di file frontend:
  - [`src/data/api.js`](frontend/src/data/api.js) (`BASE_URL`)
- Untuk deployment, sesuaikan URL pada environment variable di hosting masing-masing.

---

## 5. Fitur Utama

- **Autentikasi**: Register, Login, Logout, Edit Profil
- **Diagnosis Kulit**: Upload gambar atau scan kamera, hasil diagnosis dari model ML
- **Riwayat Diagnosis**: Simpan, tampilkan, dan hapus riwayat diagnosis
- **Edukasi**: Informasi penyakit kulit umum, pencegahan, dan saran

---

## 6. Menjalankan Secara Lokal (Semua Komponen)

1. Jalankan backend (`npm run dev` di folder `backend`)
2. Jalankan frontend (`npm run dev` di folder `frontend`)
3. Jalankan API ML (`python app.py` di folder `machine learning/API-ML`)
4. Akses aplikasi di browser melalui [http://localhost:5173](http://localhost:5173)

---

## 7. Deployment

- **Frontend**: Vercel, Netlify, atau layanan serupa
- **Backend**: Vercel (Serverless), Railway, Render, atau VPS
- **ML API**: Railway, Render, atau VPS (pastikan port dan resource cukup)

---

## 8. Kontribusi

1. Fork repo ini
2. Buat branch fitur: `git checkout -b fitur-anda`
3. Commit perubahan: `git commit -m 'Tambah fitur ...'`
4. Push ke branch: `git push origin fitur-anda`
5. Buat Pull Request

---

## 9. Lisensi

MIT License

---

## 10. Kontak

- Email: contact@skinsight.com
- Tim Pengembang: SkinSight

---

**Catatan:**  
Jangan gunakan aplikasi ini sebagai pengganti konsultasi medis profesional. Selalu konsultasikan ke dokter untuk diagnosis dan penanganan lebih lanjut.
