import React from 'react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left">
      <h1 className="text-3xl font-bold mb-6 text-[#2C7A7B]">About Us</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Data Diri Pengembang</h2>
        <p>Nama: Tim Pengembang SkinSight</p>
        <p>Email: contact@skinsight.com</p>
        <p>Telepon: 0812-3456-7890</p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Visi</h2>
        <p>
          Menjadi aplikasi web terdepan dalam membantu diagnosis awal penyakit kulit dengan teknologi yang mudah diakses dan akurat.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Misi</h2>
        <ul className="list-disc list-inside">
          <li>Menyediakan platform yang user-friendly untuk deteksi dini penyakit kulit.</li>
          <li>Menggunakan teknologi AI untuk meningkatkan akurasi diagnosis.</li>
          <li>Mengedukasi masyarakat tentang pentingnya perawatan kulit.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Tahun Dibuat</h2>
        <p>2024</p>
      </section>
    </div>
  );
}
