import React from 'react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-8 mt-16 bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] rounded-xl shadow-xl text-left text-teal-900 animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-8 text-[#0077B6] tracking-wide">About Us</h1>
      <section className="mb-8 transition-transform transform hover:scale-105 hover:shadow-lg p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-[#004d40]">Data Diri Pengembang</h2>
        <p className="mb-1">Nama: Tim Pengembang SkinSight</p>
        <p className="mb-1">Email: <a href="mailto:contact@skinsight.com" className="text-[#0077B6] hover:underline">contact@skinsight.com</a></p>
        <p>Telepon: 0812-3456-7890</p>
      </section>
      <section className="mb-8 transition-transform transform hover:scale-105 hover:shadow-lg p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-[#004d40]">Visi</h2>
        <p>
          Menjadi aplikasi web terdepan dalam membantu diagnosis awal penyakit kulit dengan teknologi yang mudah diakses dan akurat.
        </p>
      </section>
      <section className="mb-8 transition-transform transform hover:scale-105 hover:shadow-lg p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-[#004d40]">Misi</h2>
        <ul className="list-disc list-inside text-[#004d40]">
          <li>Menyediakan platform yang user-friendly untuk deteksi dini penyakit kulit.</li>
          <li>Menggunakan teknologi AI untuk meningkatkan akurasi diagnosis.</li>
          <li>Mengedukasi masyarakat tentang pentingnya perawatan kulit.</li>
        </ul>
      </section>
      <section className="transition-transform transform hover:scale-105 hover:shadow-lg p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-[#004d40]">Tahun Dibuat</h2>
        <p>2025</p>
      </section>
    </div>
  );
}
