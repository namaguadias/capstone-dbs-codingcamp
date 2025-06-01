import React, { useState, useEffect } from 'react';

// Komponen untuk menampilkan informasi penyakit kulit dengan gambar
const DiseaseInfoCard = ({ diseaseName, imageUrl, description, imageAlt }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-2xl">
    <img
      src={imageUrl}
      alt={imageAlt || `Visual example of ${diseaseName}`}
      className="w-full h-56 object-cover" // Tinggi gambar bisa disesuaikan
      onError={(e) => { e.target.onerror = null; e.target.src="/no image available.jpg"; e.target.alt="Image loading error"; }} // Fallback jika gambar gagal dimuat
    />
    <div className="p-5 md:p-6 flex-grow flex flex-col">
      <h3 className="text-xl lg:text-2xl font-semibold text-sky-700 mb-3">{diseaseName}</h3>
      <p className="text-gray-700 text-sm leading-relaxed flex-grow text-justify">{description}</p>
      {/* Anda bisa menambahkan link ke halaman detail di sini jika ada */}
      {/* <a href={`/conditions/${diseaseName.toLowerCase().replace(/\s+/g, '-')}`} className="mt-4 text-sky-600 hover:text-sky-800 font-medium self-start">
        Learn More &rarr;
      </a> */}
    </div>
  </div>
);

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  // State untuk modal detail penyakit
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const commonDiseases = [
    {
      name: 'Eczema (Atopic Dermatitis)',
      imageUrl: '/Eczema (Atopic Dermatitis).webp',
      description: 'Eczema (Atopic Dermatitis) adalah kondisi yang menyebabkan kulit menjadi gatal, kering, dan pecah-pecah. Ini adalah kondisi jangka panjang (kronis) pada kebanyakan orang, meskipun dapat membaik seiring waktu, terutama pada anak-anak.',
    },
    {
      name: 'Acne Vulgaris',
      imageUrl: '/Acne Vulgaris.webp',
      description: 'Acne Vulgaris adalah kondisi kulit umum yang terjadi ketika folikel rambut di bawah kulit tersumbat. Sebum—minyak yang membantu menjaga kulit agar tidak kering—dan sel-sel kulit mati menyumbat pori-pori, yang menyebabkan timbulnya lesi, yang biasa disebut jerawat atau komedo.',
    },
    {
      name: 'Ringworm (Tinea Corporis)',
      imageUrl: '/Ringworm (Tinea Corporis).jpg',
      description: 'Ringworm (Tinea Corporis) adalah infeksi jamur yang berkembang di lapisan atas kulit. Ini ditandai dengan ruam merah berbentuk lingkaran dengan kulit yang lebih bersih di tengahnya. Ruam ini bisa menyebabkan rasa gatal.',
    },
    {
      name: 'Psoriasis',
      imageUrl: '/Psoriasis.jpg',
      description: 'Psoriasis adalah penyakit kulit yang menyebabkan ruam dengan bercak gatal dan bersisik, paling umum terjadi di lutut, siku, tubuh, dan kulit kepala. Psoriasis adalah penyakit umum dan jangka panjang (kronis) yang tidak dapat disembuhkan tetapi dapat dikendalikan.',
    },
  ];

  // Komponen Modal Detail Penyakit
  const DiseaseDetailModal = ({ disease, onClose }) => {
    if (!disease) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-0 relative border border-slate-200 animate-modalShow">
          {/* Tombol close di pojok kanan atas */}
          <button
            className="disease-modal-close"
            onClick={onClose}
            aria-label="Tutup"
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 20,
              background: '#2196f3',
              border: '2px solid #fff',
              borderRadius: '50%',
              width: 36,
              height: 36,
              minWidth: 36,
              minHeight: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 6px rgba(0,0,0,0.13)',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <line x1="6" y1="6" x2="18" y2="18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          {/* Gambar */}
          <img
            src={disease.imageUrl}
            alt={disease.name}
            className="w-full h-64 object-cover rounded-t-2xl mb-0 border-b transition-all duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src='/no image available.jpg'; }}
          />
          <div className="px-7 pt-6 pb-7">
            <h3 className="text-2xl font-bold text-sky-700 mb-3 text-center">{disease.name}</h3>
            <p className="text-gray-700 leading-relaxed text-justify text-base">{disease.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section - Pengenalan Website */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-sky-50 to-slate-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-sky-700 mb-5 text-center">
            Selamat Datang di <span className="text-sky-500">skinInfection</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed text-justify">
            Panduan komprehensif Anda untuk memahami berbagai infeksi dan penyakit kulit.
            Jelajahi informasi, kenali gejala, dan pelajari kapan harus mencari bantuan profesional.
          </p>
          {/* Gambar ilustrasi umum (opsional) */}
          <div className="mt-8 max-w-lg mx-auto rounded-xl overflow-hidden border border-sky-300/50">
            <img
              src="/Ilustrasi umum.jpg"
              alt="Ilustrasi Umum Kesehatan Kulit"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {showInstallButton && (
            <button
              onClick={handleInstallClick}
              className="mt-6 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
            >
              Pasang Aplikasi
            </button>
          )}
        </div>
      </section>

      {/* Apa itu Penyakit Kulit? */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-center">Memahami Penyakit Kulit</h2>
          <p className="text-gray-700 leading-relaxed mb-3 text-justify">
            Penyakit kulit adalah kondisi yang mempengaruhi kulit Anda. Kondisi ini dapat menyebabkan ruam, peradangan, gatal, atau perubahan kulit lainnya. Beberapa kondisi kulit bersifat genetik, sementara faktor gaya hidup atau infeksi dapat menyebabkan yang lain.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Website <span className="font-semibold text-sky-700">skinInfection</span> bertujuan untuk menyediakan informasi edukatif umum mengenai kondisi kulit yang umum terjadi. Informasi di sini tidak menggantikan nasihat medis profesional.
          </p>
        </div>
      </section>

      {/* Jenis-Jenis Penyakit Kulit Umum (dengan foto placeholder) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">Beberapa Kondisi Kulit Umum</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:gap-10">
            {commonDiseases.map((disease) => (
              <div
                key={disease.name}
                onClick={() => { setSelectedDisease(disease); setShowModal(true); }}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <DiseaseInfoCard
                  diseaseName={disease.name}
                  imageUrl={disease.imageUrl}
                  description={disease.description}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Modal detail penyakit */}
        {showModal && (
          <DiseaseDetailModal
            disease={selectedDisease}
            onClose={() => setShowModal(false)}
          />
        )}
      </section>

      {/* Gejala Umum & Kapan Harus ke Dokter */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-justify">Gejala Umum</h2>
            <p className="text-gray-700 mb-4 text-justify">Beberapa gejala umum yang mungkin mengindikasikan masalah kulit meliputi:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Ruam atau perubahan warna kulit</li>
              <li>Kulit kering, pecah-pecah, atau bersisik</li>
              <li>Rasa gatal yang persisten</li>
              <li>Benjolan, luka, atau lesi baru pada kulit</li>
              <li>Perubahan pada tahi lalat yang sudah ada</li>
            </ul>
          </div>
          <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-justify">Kapan Harus ke Dokter?</h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              Segera konsultasikan dengan dokter atau tenaga medis profesional jika Anda mengalami gejala kulit yang:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
              <li>Muncul tiba-tiba dan parah</li>
              <li>Menyebar dengan cepat</li>
              <li>Menyakitkan atau sangat mengganggu</li>
              <li>Disertai demam atau gejala sistemik lainnya</li>
              <li>Tidak membaik dengan perawatan mandiri sederhana</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer Penting */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto p-6 bg-rose-50 border-l-4 border-rose-500 rounded-md shadow">
          <h3 className="text-xl font-semibold text-rose-700 mb-2">Penting: Batasan Informasi</h3>
          <p className="text-sm text-rose-700 leading-relaxed text-justify">
            Informasi yang disediakan di website <span className="font-semibold">skinInfection</span> hanya untuk tujuan informasional dan edukasi umum, dan bukan merupakan nasihat medis. Sangat penting untuk selalu berkonsultasi dengan dokter atau tenaga kesehatan profesional yang kvalifisir untuk segala kekhawatiran kesehatan atau sebelum membuat keputusan apa pun terkait kesehatan atau pengobatan Anda. Jangan pernah mengabaikan nasihat medis profesional atau menunda mencarinya karena sesuatu yang telah Anda baca di situs web ini.
          </p>
        </div>
      </section>
    </div>
  );
}

/* Tambahkan animasi custom di bawah ini jika belum ada di Tailwind config */
// @layer utilities {
//   .animate-fadeInModal {
//     animation: fadeInModal 0.3s ease;
//   }
//   .animate-modalShow {
//     animation: modalShow 0.3s ease forwards;
//   }
//   @keyframes fadeInModal {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }
//   @keyframes modalShow {
//     from { opacity: 0; transform: scale(0.95); }
//     to { opacity: 1; transform: scale(1); }
//   }
// }
