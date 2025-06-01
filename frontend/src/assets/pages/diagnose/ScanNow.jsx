import React, { useRef, useState } from 'react';
import ScanNowPresenter from './ScanNow-presenter';

export default function ScanNow() {
  const fileInputRef = useRef(null);
  const [deletingId, setDeletingId] = useState(null);

  return (
    <ScanNowPresenter>
      {({
        image,
        diagnosis,
        loading,
        handleImageChange,
        cameraOn,
        startCamera,
        stopCamera,
        takePhoto,
        resetScan,
        videoRef,
        history,
        historyLoading,
        historyError,
        deleteHistoryItem,
        clearHistory,
        error,
      }) => {
        // Handler for drag and drop file upload
        const handleDrop = (e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            // Create a synthetic event to pass to handleImageChange
            const syntheticEvent = { target: { files: [file] } };
            handleImageChange(syntheticEvent);
            e.dataTransfer.clearData();
          }
        };

        const handleDragOver = (e) => {
          e.preventDefault();
        };

        return (
          <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left">
            <h1 className="text-3xl font-bold mb-6 text-[#2C7A7B]">ScanNow</h1>

            <div className="mb-4 flex space-x-4">
              {!cameraOn && (
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Nyalakan Kamera
                </button>
              )}
              {cameraOn && (
                <>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Matikan Kamera
                  </button>
                  <button
                    onClick={takePhoto}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Ambil Foto
                  </button>
                </>
              )}
            </div>

            {cameraOn && (
              <div className="mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full max-h-96 rounded shadow"
                />
              </div>
            )}

            <div
              className="border-2 border-dashed border-blue-400 rounded p-6 mb-4 cursor-pointer hover:bg-blue-50 transition"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  fileInputRef.current && fileInputRef.current.click();
                }
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              role="button"
              tabIndex={0}
            >
              <p className="text-blue-600 text-center mb-2">
                {loading ? 'Processing image...' : 'Click or drag and drop an image to upload'}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {loading && (
              <div className="flex justify-center mb-4">
                <div className="loader border-blue-600 border-t-blue-300"></div>
              </div>
            )}

            {image && !loading && (
              <div className="mb-4 transition-opacity duration-500 ease-in-out">
                <img src={image} alt="Uploaded skin" className="max-w-full rounded shadow" />
              </div>
            )}

            {diagnosis && !loading && (
              <>
                <div className="p-4 bg-blue-100 text-blue-800 rounded transition-opacity duration-500 ease-in-out whitespace-pre-line">
                  {diagnosis}
                </div>
                {(image || diagnosis) && !loading && (
                  <button
                    onClick={resetScan}
                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Scan Lagi
                  </button>
                )}
              </>
            )}
            {error && !loading && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                Error: {error}
              </div>
            )}

            {/* History Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#2C7A7B]">History Diagnosis</h2>
              {historyLoading && <p>Loading history...</p>}
              {historyError && <p className="text-red-600">Error: {historyError}</p>}
              {!historyLoading && history.length === 0 && <p>No history available.</p>}
              {!historyLoading && history.length > 0 && (
                <>
                  <ul className="space-y-4 max-h-64 overflow-y-auto border border-gray-300 rounded p-4 bg-gray-50">
                    {history.map((item) => (
                      <li key={item.id} className="border-b border-gray-300 pb-2 last:border-b-0 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{item.diagnosis}</p>
                          <p className="text-sm text-gray-600">Confidence: {item.confidence}</p>
                        </div>
                  <button
                    onClick={() => {
                      setDeletingId(item.id);
                      deleteHistoryItem(item.id).finally(() => setDeletingId(null));
                    }}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full max-w-[100px]"
                    title="Delete this history"
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? 'Menghapus' : 'Delete'}
                  </button>
                      </li>
                    ))}
            </ul>
            <button
              onClick={clearHistory}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full max-w-[100px]"
            >
              Clear History
            </button>
                </>
              )}
            </div>
          </div>
        );
      }}
    </ScanNowPresenter>
  );
}
