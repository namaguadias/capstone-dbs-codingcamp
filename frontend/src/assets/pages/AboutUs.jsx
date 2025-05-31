import React from 'react';

// Komponen Ikon (Contoh menggunakan Heroicons sebagai SVG inline)
const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.268-.25-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.084-1.268.25-1.857m0 0a5.002 5.002 0 019.5 0M12 10a5 5 0 110-10 5 5 0 010 10zm0 0a5 5 0 00-5 5v2a3 3 0 003 3h4a3 3 0 003-3v-2a5 5 0 00-5-5z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ClipboardCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Icon untuk detail kontak (opsional, bisa diganti dengan yang lebih spesifik)
const InformationCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2 text-sky-500"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Halaman */}
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-700 mb-3 tracking-tight">
            Tentang <span className="text-cyan-600">SkinSight</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Kenali lebih jauh tentang tim kami, serta visi dan misi yang kami emban untuk merevolusi kesehatan kulit melalui teknologi.
          </p>
        </header>

        {/* Konten Utama */}
        <div className="space-y-10">

          {/* Kartu Data Diri Pengembang */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <UserGroupIcon />
              <h2 className="text-2xl sm:text-3xl font-semibold text-sky-600">Tim Pengembang SkinSight</h2>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start sm:items-center">
                <InformationCircleIcon className="h-5 w-5 mr-2 text-gray-500 mt-1 sm:mt-0 flex-shrink-0" />
                <p><strong className="font-medium text-gray-800">Nama Tim:</strong> SkinSight</p>
              </div>
              <div className="flex items-start sm:items-center">
                <InformationCircleIcon className="h-5 w-5 mr-2 text-gray-500 mt-1 sm:mt-0 flex-shrink-0" />
                <p><strong className="font-medium text-gray-800">Email:</strong> contact@skinsight.com</p>
              </div>
            </div>
          </section>

          {/* Visi dan Misi dalam Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Kartu Visi */}
            <section className="bg-gradient-to-br from-sky-500 to-sky-600 text-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-6">
                <EyeIcon />
                <h2 className="text-2xl sm:text-3xl font-semibold">Visi Kami</h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed flex-grow">
                Menjadi aplikasi web terdepan dalam membantu diagnosis awal penyakit kulit dengan teknologi yang mudah diakses dan akurat.
              </p>
            </section>

            {/* Kartu Misi */}
            <section className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-6">
                <ClipboardCheckIcon />
                <h2 className="text-2xl sm:text-3xl font-semibold">Misi Kami</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg leading-relaxed flex-grow">
                <li>Menyediakan platform yang user-friendly untuk deteksi dini penyakit kulit.</li>
                <li>Menggunakan teknologi AI untuk meningkatkan akurasi diagnosis.</li>
                <li>Mengedukasi masyarakat tentang pentingnya perawatan kulit.</li>
              </ul>
            </section>
          </div>

          {/* Kartu Tahun Dibuat */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex items-center justify-center mb-4">
              <CalendarIcon />
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">Tahun Pendirian</h2>
            </div>
            <p className="text-5xl sm:text-6xl font-bold text-sky-500">2025</p>
          </section>

        </div>
      </div>
    </div>
  );
}