import React, { useState } from 'react';

export default function ScanNow() {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      // Simulate diagnosis result for demonstration
      setDiagnosis('Hasil diagnosa awal: Kemungkinan dermatitis atau eksim.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left">
      <h1 className="text-3xl font-bold mb-6 text-[#2C7A7B]">ScanNow</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {image && (
        <div className="mb-4">
          <img src={image} alt="Uploaded skin" className="max-w-full rounded shadow" />
        </div>
      )}
      {diagnosis && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded">
          {diagnosis}
        </div>
      )}
    </div>
  );
}
