import React, { useState, useEffect } from "react";

// === Komponen DiseaseInfoCard ===
const DiseaseInfoCard = ({
  diseaseName,
  imageUrl,
  description,
  imageAlt,
  onCardClick,
}) => (
  <div
    className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl h-full cursor-pointer hover:-translate-y-1 hover:shadow-sky-100"
    onClick={onCardClick}
  >
    <img
      src={imageUrl}
      alt={imageAlt || `Contoh visual ${diseaseName}`}
      className="w-full h-40 xs:h-48 sm:h-52 object-cover flex-shrink-0"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/no image available.jpg";
        e.target.alt = "Gagal memuat gambar";
      }}
    />
    <div className="p-4 sm:p-5 flex flex-col flex-grow min-h-0">
      <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-sky-700 mb-2 flex-shrink-0">
        {diseaseName}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-left mb-3 line-clamp-3 sm:line-clamp-4">
        {description}
      </p>
      <div className="mt-auto pt-2">
        <span className="text-sm text-sky-600 font-medium hover:text-sky-700 group inline-flex items-center">
          Lihat Detail
          <svg
            className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  </div>
);
// === Akhir Komponen DiseaseInfoCard ===

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") console.log("User accepted the install prompt");
    else console.log("User dismissed the install prompt");
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const commonDiseases = [
    {
      name: "Acne (Jerawat)",
      imageUrl: "/image/Acne.jpg",
      description:
        "Jerawat adalah kondisi kulit umum yang terjadi ketika folikel rambut tersumbat oleh minyak dan sel kulit mati, menyebabkan peradangan dan berbagai jenis lesi seperti komedo, papula, pustula, nodul, atau kista.",
      prevention:
        "Jaga kebersihan wajah (cuci 2x sehari dengan pembersih lembut), gunakan produk non-komedogenik, hindari memencet jerawat, kelola stres, dan perhatikan pola makan.",
      imageAlt: "Contoh tampilan jerawat pada kulit",
    },
    {
      name: "Hyperpigmentation",
      imageUrl: "/image/Hyperpigmentation.jpg",
      description:
        "Hiperpigmentasi adalah kondisi di mana area kulit tertentu menjadi lebih gelap dibandingkan kulit sekitarnya akibat produksi melanin yang berlebihan. Bisa disebabkan oleh paparan sinar matahari, peradangan, atau kondisi medis lain.",
      prevention:
        "Gunakan tabir surya setiap hari (SPF 30+), hindari paparan sinar matahari berlebih terutama pada jam puncak, gunakan pakaian pelindung, dan atasi peradangan kulit dengan cepat.",
      imageAlt: "Contoh tampilan hiperpigmentasi pada kulit",
    },
    {
      name: "Nail Psoriasis",
      imageUrl: "/image/nail psoriasis.jpg",
      description:
        "Psoriasis kuku adalah manifestasi psoriasis yang mempengaruhi kuku jari tangan dan kaki. Gejalanya meliputi perubahan warna, lekukan kecil (pitting), penebalan, atau kuku yang terlepas dari dasarnya.",
      prevention:
        "Jaga kuku tetap pendek dan bersih, hindari cedera kuku, gunakan pelembap pada kuku dan kutikula, dan hindari penggunaan cat kuku atau kuku palsu jika memperburuk kondisi.",
      imageAlt: "Contoh tampilan psoriasis pada kuku",
    },
    {
      name: "SJS-TEN",
      imageUrl: "/image/sjs-ten.jpg",
      description:
        "Sindrom Stevens-Johnson (SJS) & Nekrolisis Epidermal Toksik (TEN) adalah reaksi kulit parah yang jarang terjadi, seringkali dipicu oleh reaksi terhadap obat-obatan. Menyebabkan lepuhan dan pengelupasan kulit yang luas.",
      prevention:
        "Waspada terhadap penggunaan obat baru, informasikan riwayat alergi obat kepada dokter, dan segera hentikan penggunaan obat jika muncul reaksi kulit yang mencurigakan dan konsultasi ke dokter.",
      imageAlt: "Manifestasi kulit SJS/TEN",
    },
    {
      name: "Vitiligo",
      imageUrl: "/image/vitiligo.jpg", // Pastikan path ini benar
      description:
        "Vitiligo adalah kondisi kronis yang menyebabkan hilangnya melanosit (sel pigmen kulit), mengakibatkan munculnya bercak-bercak putih pucat pada kulit di berbagai bagian tubuh.",
      prevention:
        "Tidak sepenuhnya dapat dicegah karena sering terkait faktor autoimun atau genetik. Lindungi kulit dari paparan sinar matahari berlebih (gunakan tabir surya pada area vitiligo dan sekitarnya), kelola stres.",
      imageAlt: "Contoh tampilan vitiligo pada kulit",
    },
  ];

  // === Komponen DiseaseDetailModal yang Diperbarui ===
  const DiseaseDetailModal = ({ disease, onClose }) => {
    // Hooks must always be called at the top level
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      setImageError(false); // Reset error state saat disease (atau modal) berubah/dibuka kembali
    }, [disease]); // Dependency array memastikan ini berjalan saat 'disease' berubah

    // Early return if disease is null
    if (!disease) return null;

    const handleImageError = (e) => {
      e.target.onerror = null; // Mencegah loop error jika placeholder juga gagal
      setImageError(true);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeInModal p-3 xs:p-4">
        {/* Kontainer Modal Utama */}
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative border border-slate-200 animate-modalShow max-h-[90vh] flex flex-col overflow-hidden">
          {/* Tombol Close menggunakan kelas CSS kustom Anda */}
          <button
            className="disease-modal-close" // Menggunakan kelas dari file CSS Anda
            onClick={onClose}
            aria-label="Tutup"
          >
            {/* SVG ikon X, styling akan diambil dari CSS Anda untuk .disease-modal-close svg */}
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          {/* Area Gambar (jika ada) */}
          <div className="flex-shrink-0">
            {!imageError ? (
              <img
                src={disease.imageUrl}
                alt={disease.imageAlt || `Gambar ${disease.name}`}
                className="w-full h-48 xs:h-56 sm:h-60 object-cover rounded-t-xl"
                onError={handleImageError}
              />
            ) : (
              // Placeholder Jika Gambar Error
              <div className="w-full h-48 xs:h-56 sm:h-60 bg-slate-200 rounded-t-xl flex flex-col items-center justify-center text-slate-500 p-4">
                <svg
                  className="w-12 h-12 mb-2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="text-sm text-center">
                  Gambar tidak tersedia
                </span>
                <span className="text-xs text-slate-400 text-center mt-1">
                  {disease.imageAlt || `Gambar ${disease.name}`}
                </span>
              </div>
            )}
          </div>

          {/* Bagian Teks */}
          {/* Pastikan padding atas cukup agar teks tidak tertutup tombol close */}
          <div className="px-4 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6 overflow-y-auto flex-grow">
            <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2 sm:mb-3 text-center">
              {disease.name}
            </h3>
            <p className="text-gray-700 leading-relaxed text-left text-sm sm:text-[0.9rem] mb-3 sm:mb-4">
              {disease.description}
            </p>
            {disease.prevention && (
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-sky-600 mb-1">
                  Cara Mencegah:
                </h4>
                <p className="text-gray-600 leading-relaxed text-left text-sm sm:text-[0.9rem]">
                  {disease.prevention}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  // === Akhir Komponen DiseaseDetailModal yang Diperbarui ===

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 text-center bg-sky-700">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold !text-white mb-4 sm:mb-6">
            Selamat Datang di
            <br className="sm:hidden" />
            {/* Untuk "SkinSight", !text-sky-300 biasanya cukup kontras. Jika masih samar, bisa diubah ke !text-white atau !text-sky-200 */}
            <span className="!text-sky-300 ml-0 sm:ml-3">SkinSight</span>
          </h1>
          {/* PERUBAHAN DI SINI: !text-sky-100 diubah menjadi !text-white */}
          <p className="text-sm sm:text-lg !text-white mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
            Panduan komprehensif Anda untuk memahami berbagai infeksi dan
            penyakit kulit. Jelajahi informasi, kenali gejala, dan pelajari
            kapan harus mencari bantuan profesional.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                const scanSection =
                  document.getElementById("common-conditions");
                if (scanSection)
                  scanSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-sky-700 font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg shadow-md hover:bg-sky-50 transition-colors duration-300 text-base sm:text-lg w-full sm:w-auto"
            >
              Lihat Kondisi Kulit
            </button>
            {showInstallButton && (
              <button
                onClick={handleInstallClick}
                className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg shadow-md transition-colors duration-300 text-base sm:text-lg w-full sm:w-auto"
              >
                Pasang Aplikasi
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Memahami Penyakit Kulit Section */}
      <section
        id="understand-skin"
        className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto p-5 sm:p-8 bg-white rounded-xl shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-sky-700 mb-4 sm:mb-6 text-center">
            Memahami Penyakit Kulit
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-left text-sm sm:text-base md:text-lg">
            Penyakit kulit adalah kondisi yang mempengaruhi kulit Anda. Kondisi
            ini dapat menyebabkan ruam, peradangan, gatal, atau perubahan kulit
            lainnya. Beberapa kondisi kulit bersifat genetik, sementara faktor
            gaya hidup atau infeksi dapat menyebabkan yang lain.
          </p>
          <p className="text-gray-700 leading-relaxed text-left text-sm sm:text-base md:text-lg">
            Website{" "}
            <span className="font-semibold text-sky-700">SkinSight</span>{" "}
            bertujuan untuk menyediakan informasi edukatif umum mengenai kondisi
            kulit yang umum terjadi. Informasi di sini tidak menggantikan
            nasihat medis profesional.
          </p>
        </div>
      </section>

      {/* Jenis-Jenis Penyakit Kulit Umum (Layout Grid) */}
      <section
        id="common-conditions"
        className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-100"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-sky-700 mb-6 sm:mb-8 md:mb-10 text-center">
            Beberapa Kondisi Kulit Umum
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {commonDiseases.map((disease) => (
              <DiseaseInfoCard
                key={disease.name}
                diseaseName={disease.name}
                imageUrl={disease.imageUrl}
                description={disease.description}
                prevention={disease.prevention}
                imageAlt={disease.imageAlt}
                onCardClick={() => {
                  setSelectedDisease(disease);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        </div>

        {showModal && (
          <DiseaseDetailModal
            disease={selectedDisease}
            onClose={() => setShowModal(false)}
          />
        )}
      </section>

      {/* Sisa Section (Gejala Umum, Kapan ke Dokter, Disclaimer) */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-5 sm:p-8 bg-white rounded-xl shadow-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-3 sm:mb-4">
              Gejala Umum
            </h2>
            <p className="text-gray-700 mb-3 sm:mb-4 text-left text-sm sm:text-base">
              Beberapa gejala umum yang mungkin mengindikasikan masalah kulit
              meliputi:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-1.5 text-sm sm:text-base">
              <li>Ruam atau perubahan warna kulit</li>
              <li>Kulit kering, pecah-pecah, atau bersisik</li>
              <li>Rasa gatal yang persisten</li>
              <li>Benjolan, luka, atau lesi baru pada kulit</li>
              <li>Perubahan pada tahi lalat yang sudah ada</li>
            </ul>
          </div>
          <div className="p-5 sm:p-8 bg-white rounded-xl shadow-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-3 sm:mb-4">
              Kapan Harus ke Dokter?
            </h2>
            <p className="text-gray-700 leading-relaxed text-left text-sm sm:text-base">
              Segera konsultasikan dengan dokter atau tenaga medis profesional
              jika Anda mengalami gejala kulit yang:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-1.5 mt-2 sm:mt-3 text-sm sm:text-base">
              <li>Muncul tiba-tiba dan parah</li>
              <li>Menyebar dengan cepat</li>
              <li>Menyakitkan atau sangat mengganggu</li>
              <li>Disertai demam atau gejala sistemik lainnya</li>
              <li>Tidak membaik dengan perawatan mandiri sederhana</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pt-8 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto p-5 sm:p-6 bg-rose-50 border-l-4 border-rose-500 rounded-md shadow">
          <h3 className="text-lg sm:text-xl font-semibold text-rose-700 mb-2">
            Penting: Batasan Informasi
          </h3>
          <p className="text-xs sm:text-sm text-rose-700 leading-relaxed text-left">
            Informasi yang disediakan di website{" "}
            <span className="font-semibold">SkinSight</span> hanya untuk tujuan
            informasional dan edukasi umum, dan bukan merupakan nasihat medis.
            Sangat penting untuk selalu berkonsultasi dengan dokter atau tenaga
            kesehatan profesional yang kvalifisir untuk segala kekhawatiran
            kesehatan atau sebelum membuat keputusan apa pun terkait kesehatan
            atau pengobatan Anda. Jangan pernah mengabaikan nasihat medis
            profesional atau menunda mencarinya karena sesuatu yang telah Anda
            baca di situs web ini.
          </p>
        </div>
      </section>
    </div>
  );
}
