import React, { useRef } from 'react';
import ScanNowPresenter from './ScanNow-presenter';

export default function ScanNow() {
  const fileInputRef = useRef(null);
  const [buttonLoading, setButtonLoading] = React.useState({
    scan: false,
    delete: null, // id
    clear: false,
    update: false,
  });

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
        videoRef,
        history,
        historyLoading,
        historyError,
        clearHistory,
        error,
        deleteHistoryItem,
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

        // Remove static artiMap, use dynamic arti from history item instead

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
              <div className="mb-4 flex justify-center transition-opacity duration-500 ease-in-out">
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
                    onClick={async () => {
                      setButtonLoading((prev) => ({ ...prev, scan: true }));
                      window.location.reload();
                    }}
                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center"
                    disabled={buttonLoading.scan}
                  >
                    {buttonLoading.scan && (
                      <span className="loader loader-yellow mr-2"></span>
                    )}
                    {buttonLoading.scan ? 'Loading...' : 'Scan Lagi'}
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-[#2C7A7B]">History Diagnosis</h2>
                <button
                  onClick={async () => {
                    setButtonLoading((prev) => ({ ...prev, update: true }));
                    if (typeof historyLoading === 'boolean' && typeof historyError === 'string') {
                      if (typeof window !== 'undefined') {
                        setTimeout(() => {
                          setButtonLoading((prev) => ({ ...prev, update: false }));
                        }, 1000);
                        window.location.reload();
                        return;
                      }
                    }
                    setButtonLoading((prev) => ({ ...prev, update: false }));
                  }}
                  className="ml-2 px-2.5 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-sans text-base custom-update-btn flex items-center justify-center"
                  disabled={buttonLoading.update}
                >
                  {buttonLoading.update && (
                    <span className="loader mr-2"></span>
                  )}
                  {buttonLoading.update ? 'Updating...' : 'Update History'}
                </button>
              </div>
              {historyLoading && <p>Loading history...</p>}
              {historyError && <p className="text-red-600">Error: {historyError}</p>}
              {!historyLoading && history.length === 0 && <p>No history available.</p>}
              {!historyLoading && history.length > 0 && (
                <>
                  <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-300 rounded p-2 bg-white text-gray-900">
                    {history.map((item) => {
                      const symptoms = item.symptoms || 'Deskripsi tidak tersedia.';
                      const saran = item.recommendations && item.recommendations.length > 0 ? item.recommendations[0] : 'Tidak ada saran.';
                      const text = `Diagnosis: ${item.diagnosis}\nConfidence: ${item.confidence}\nArti: ${symptoms}\nSaran: ${saran}`;
                      return (
                        <div
                          key={item.id}
                          className="p-2 bg-white rounded flex justify-between items-center font-sans text-base border-b last:border-b-0"
                        >
                          <pre className="whitespace-pre-wrap m-0 flex-grow mr-4 font-sans text-base">{text}</pre>
                          <button
                            onClick={async () => {
                              setButtonLoading((prev) => ({ ...prev, delete: item.id }));
                              await deleteHistoryItem(item.id);
                              setButtonLoading((prev) => ({ ...prev, delete: null }));
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center text-base font-semibold"
                            aria-label={`Delete history item ${item.diagnosis}`}
                            disabled={buttonLoading.delete === item.id}
                            style={{ fontSize: '1rem', fontWeight: 600, minWidth: '100px', width: buttonLoading.delete === item.id ? '130px' : '100px', transition: 'width 0.2s' }}
                          >
                            {buttonLoading.delete === item.id && (
                              <span className="loader mr-2" style={{ width: '18px', height: '18px', borderWidth: '3px' }}></span>
                            )}
                            {buttonLoading.delete === item.id ? 'Loading...' : 'Delete'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={async () => {
                      setButtonLoading((prev) => ({ ...prev, clear: true }));
                      await clearHistory();
                      setTimeout(() => {
                        setButtonLoading((prev) => ({ ...prev, clear: false }));
                      }, 1000); // pastikan spinner terlihat minimal 1 detik
                    }}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-28 flex items-center justify-center min-w-[70px] text-sm font-semibold"
                    disabled={buttonLoading.clear}
                  >
                    {buttonLoading.clear && (
                      <span className="loader mr-2"></span>
                    )}
                    {buttonLoading.clear ? 'Loading...' : 'Clear History'}
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
