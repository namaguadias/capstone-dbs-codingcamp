import React from 'react';
import ContentCard from '../../components/ContentCard';

export default function Home() {
  const content = (
    <>
      <p className="mb-4 text-[#004d40] text-lg leading-relaxed">
        Penyakit kulit adalah kondisi yang mempengaruhi lapisan kulit dan dapat disebabkan oleh berbagai faktor seperti infeksi, alergi, atau kondisi genetik.
      </p>
      <p className="mb-4 text-[#004d40] text-lg leading-relaxed">
        Penanganan sederhana yang dapat dilakukan di rumah meliputi:
      </p>
      <ul className="list-disc list-inside mb-4 text-[#004d40] text-lg leading-relaxed">
        <li>Menjaga kebersihan kulit dengan mandi secara teratur menggunakan sabun yang lembut.</li>
        <li>Menghindari menggaruk area yang gatal untuk mencegah infeksi.</li>
        <li>Menggunakan pelembap untuk menjaga kelembapan kulit.</li>
        <li>Menghindari paparan langsung sinar matahari yang berlebihan.</li>
        <li>Jika gejala memburuk, segera konsultasikan ke dokter kulit.</li>
      </ul>
      <p className="text-[#004d40] text-lg leading-relaxed">
        Informasi ini bersifat umum dan tidak menggantikan konsultasi medis profesional.
      </p>
    </>
  );

  const popupContent = (
    <p className="text-sm text-gray-600 italic">
      Informasi tambahan saat hover: Jaga kesehatan kulit Anda dengan baik.
    </p>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <ContentCard
        title="Informasi Umum Mengenai Penyakit Kulit dan Penanganan Sederhana"
        content={content}
        popupContent={popupContent}
      />
    </div>
  );
}
