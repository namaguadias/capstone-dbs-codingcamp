
import React from 'react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left">
      <h1 className="text-3xl font-bold mb-6 text-[#2C7A7B]">Informasi Umum Mengenai Penyakit Kulit dan Penanganan Sederhana</h1>
      <p className="mb-4 text-gray-700">
        Penyakit kulit adalah kondisi yang mempengaruhi lapisan kulit dan dapat disebabkan oleh berbagai faktor seperti infeksi, alergi, atau kondisi genetik.
      </p>
      <p className="mb-4 text-gray-700">
        Penanganan sederhana yang dapat dilakukan di rumah meliputi:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Menjaga kebersihan kulit dengan mandi secara teratur menggunakan sabun yang lembut.</li>
        <li>Menghindari menggaruk area yang gatal untuk mencegah infeksi.</li>
        <li>Menggunakan pelembap untuk menjaga kelembapan kulit.</li>
        <li>Menghindari paparan langsung sinar matahari yang berlebihan.</li>
        <li>Jika gejala memburuk, segera konsultasikan ke dokter kulit.</li>
      </ul>
      <p className="text-gray-700">
        Informasi ini bersifat umum dan tidak menggantikan konsultasi medis profesional.
      </p>
    </div>
  );
}
