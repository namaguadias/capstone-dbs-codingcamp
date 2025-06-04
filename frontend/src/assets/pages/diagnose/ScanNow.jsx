import React, { useRef } from "react";
import ScanNowPresenter from "./ScanNow-presenter"; // Pastikan path ini benar

// Contoh SVG Ikon untuk Upload
const UploadIcon = () => (
  <svg
    className="w-12 h-12 mx-auto text-gray-400 group-hover:text-teal-600 transition-colors"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    ></path>
  </svg>
);

// Contoh SVG Ikon untuk Riwayat Kosong
const HistoryIcon = () => (
  <svg
    className="w-16 h-16 mx-auto mb-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    ></path>
  </svg>
);

// Komponen Loader Sederhana dengan Tailwind (sesuai kode Anda)
const ButtonSpinner = ({ colorClass = "border-white" }) => (
  <div
    className={`animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 ${colorClass} mr-2`}
  ></div>
);

// Updated Flip Camera Icon with modern design and hover animation
const FlipCameraIcon = () => (
  <svg
    className="w-6 h-6 mr-2 text-white-600 transition-transform duration-300 ease-in-out hover:rotate-180 hover:text-white-800"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v1m0 14v1m8-9h1M3 12H2m15.364-6.364l.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M6.343 6.343l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

export default function ScanNow() {
  const fileInputRef = useRef(null);
  const [buttonLoading, setButtonLoading] = React.useState({
    scan: false,
    delete: null, // id
    clear: false,
    update: false,
  });

  // Kelas tombol (sesuai kode Anda)
  const baseButtonClass =
    "font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-150 ease-in-out flex items-center justify-center min-w-[120px]";
  const primaryButtonClass = `${baseButtonClass} bg-teal-600 hover:bg-teal-700 text-white`;
  const destructiveButtonClass = `${baseButtonClass} bg-red-700 hover:bg-red-800 text-white`;
  const secondaryButtonClass = `${baseButtonClass} border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white`;

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
        flipCamera,
        videoRef,
        history,
        historyLoading,
        historyError,
        clearHistory,
        error,
        deleteHistoryItem,
      }) => {
        const handleDrop = (e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const syntheticEvent = { target: { files: [file] } };
            handleImageChange(syntheticEvent);
            e.dataTransfer.clearData();
          }
        };

        const handleDragOver = (e) => {
          e.preventDefault();
        };

        return (
          <div className="max-w-4xl mx-auto p-6 md:p-8 mt-10 mb-10 bg-white rounded-xl shadow-2xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">
              ScanNow
            </h1>

            {/* Tombol Kamera */}
            <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {!cameraOn ? (
                <button
                  onClick={startCamera}
                  className={`${primaryButtonClass} w-full sm:w-auto`}
                >
                  Nyalakan Kamera
                </button>
              ) : (
                <>
                  <button
                    onClick={stopCamera}
                    className={`${destructiveButtonClass} w-full sm:w-auto`}
                  >
                    Matikan Kamera
                  </button>
                  <button
                    onClick={takePhoto}
                    className={`${primaryButtonClass} w-full sm:w-auto`}
                  >
                    Ambil Foto
                  </button>
                  <button
                    onClick={flipCamera}
                    className={`${secondaryButtonClass} w-full sm:w-auto flex items-center justify-center`}
                    type="button"
                    title="Flip Kamera"
                    aria-label="Flip Kamera"
                  >
                    <FlipCameraIcon />
                    <span className="hidden sm:inline">Flip Kamera</span>
                  </button>
                </>
              )}
            </div>

            {/* Tampilan Video Kamera */}
            {cameraOn && (
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full max-h-96 h-auto"
                />
              </div>
            )}

            {/* Area Upload File */}
            <div
              className="group border-2 border-dashed border-gray-300 hover:border-teal-500 rounded-lg p-6 sm:p-10 mb-6 cursor-pointer bg-gray-50 hover:bg-teal-50 transition-all duration-200"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  fileInputRef.current && fileInputRef.current.click();
                }
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              role="button"
              tabIndex={0}
              aria-label="Upload an image"
            >
              <div className="flex flex-col items-center justify-center">
                <UploadIcon />
                <p className="text-gray-600 group-hover:text-teal-700 text-center mt-2">
                  {loading
                    ? "Memproses gambar..."
                    : "Klik atau seret gambar untuk diunggah"}
                </p>
                <p className="text-xs text-gray-400 group-hover:text-teal-500 text-center mt-1">
                  Format yang didukung: JPG, PNG, dll.
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {/* Loading Utama Setelah Upload/Scan */}
            {loading && (
              <div className="flex justify-center items-center my-6 p-4 bg-teal-50 rounded-lg">
                <ButtonSpinner colorClass="border-teal-600" />
                <p className="ml-2 text-teal-700">
                  Sedang menganalisis gambar...
                </p>
              </div>
            )}

            {/* Hasil Diagnosis dengan Layout Responsif */}
            {image && !loading && (
              <div className="my-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:space-x-6 lg:space-x-8">
                  <div className="md:w-2/5 lg:w-1/3 flex-shrink-0 mb-6 md:mb-0 flex justify-center md:justify-start items-start">
                    <img
                      src={image}
                      alt="Pratinjau Gambar Hasil Scan"
                      className="max-w-full h-auto md:max-h-[350px] lg:max-h-[400px] object-contain rounded-lg shadow-lg border border-gray-200"
                    />
                  </div>
                  {diagnosis && (
                    <div className="md:w-3/5 lg:w-2/3">
                      <div className="p-4 sm:p-5 bg-teal-50 text-teal-800 rounded-lg shadow-md h-full">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-teal-700 border-b border-teal-200 pb-2">
                          Hasil Diagnosis
                        </h3>
                        {typeof diagnosis === "object" && diagnosis !== null ? (
                          <div className="space-y-3 text-sm sm:text-base">
                            {" "}
                            {/* Tambah space-y-3 untuk jarak antar field */}
                            {diagnosis.name && (
                              <p>
                                <strong className="font-semibold text-teal-600">
                                  Diagnosis:
                                </strong>{" "}
                                {diagnosis.name}
                              </p>
                            )}
                            {diagnosis.confidence !== undefined && (
                              <p>
                                <strong className="font-semibold text-teal-600">
                                  Tingkat Keyakinan:
                                </strong>{" "}
                                {`${(diagnosis.confidence * 100).toFixed(0)}%`}
                              </p>
                            )}
                            {diagnosis.arti && (
                              <div>
                                <strong className="font-semibold text-teal-600 block mb-0.5">
                                  Arti/Gejala:
                                </strong>{" "}
                                <span className="whitespace-pre-line block leading-relaxed">
                                  {diagnosis.arti}
                                </span>
                              </div>
                            )}
                            {diagnosis.catatan && (
                              <div>
                                <strong className="font-semibold text-teal-600 block mb-0.5">
                                  Catatan:
                                </strong>{" "}
                                <span className="whitespace-pre-line block leading-relaxed">
                                  {diagnosis.catatan}
                                </span>
                              </div>
                            )}
                            {diagnosis.saran && (
                              <div>
                                <strong className="font-semibold text-teal-600 block mb-0.5">
                                  Saran:
                                </strong>{" "}
                                <span className="whitespace-pre-line block leading-relaxed">
                                  {diagnosis.saran}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
                            {diagnosis}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {diagnosis && (
                  <div className="mt-8">
                    <button
                      onClick={async () => {
                        setButtonLoading((prev) => ({ ...prev, scan: true }));
                        if (typeof window !== "undefined")
                          window.location.reload();
                      }}
                      className="font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-150 ease-in-out flex items-center justify-center min-w-[120px] bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 hover:from-emerald-500 hover:to-lime-500 text-white w-full"
                      disabled={buttonLoading.scan}
                    >
                      {buttonLoading.scan && (
                        <ButtonSpinner colorClass="border-white" />
                      )}
                      {buttonLoading.scan ? "Memuat..." : "Save History Data"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tampilan Error */}
            {error && !loading && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Bagian Riwayat Diagnosis */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h2 className="text-3xl font-semibold text-teal-700 mb-3 sm:mb-0">
                  Riwayat Diagnosis
                </h2>
                <button
                  onClick={async () => {
                    setButtonLoading((prev) => ({ ...prev, update: true }));
                    if (typeof window !== "undefined") {
                      window.location.reload();
                    }
                  }}
                  className={`${secondaryButtonClass} w-full sm:w-auto`}
                  disabled={buttonLoading.update}
                >
                  {buttonLoading.update && (
                    <ButtonSpinner colorClass="border-teal-600" />
                  )}
                  {buttonLoading.update ? "Memperbarui..." : "Update Riwayat"}
                </button>
              </div>

              {historyLoading && (
                <div className="flex justify-center items-center my-6 p-4 bg-gray-50 rounded-lg">
                  <ButtonSpinner colorClass="border-teal-600" />
                  <p className="ml-2 text-gray-700">Memuat riwayat...</p>
                </div>
              )}
              {historyError && (
                <p className="text-red-600 p-4 bg-red-50 rounded-lg shadow">
                  Error memuat riwayat: {historyError}
                </p>
              )}

              {!historyLoading &&
                !historyError &&
                (history.length === 0 ? (
                  <div className="text-center py-8 px-4 border border-gray-200 rounded-lg mt-4 bg-gray-50">
                    <HistoryIcon />
                    <p className="text-gray-700 font-semibold text-lg">
                      Belum Ada Riwayat Diagnosis
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Hasil pemindaian Anda akan muncul di sini.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* === AWAL MODIFIKASI TAMPILAN ITEM RIWAYAT === */}
                    <div className="space-y-4">
                      {" "}
                      {/* Memberi jarak antar item riwayat */}
                      {history.map((item) => {
                        // Destrukturisasi properti item untuk kejelasan
                        const {
                          diagnosis: diagnosisNameFromHistory,
                          confidence,
                          symptoms,
                          recommendations,
                          id,
                        } = item;

                        const gejalaText =
                          symptoms || "Deskripsi tidak tersedia.";
                        // Gabungkan rekomendasi menjadi satu string dengan baris baru jika berupa array
                        const saranText =
                          Array.isArray(recommendations) &&
                          recommendations.length > 0
                            ? recommendations.join("\n")
                            : typeof recommendations === "string"
                              ? recommendations
                              : "Tidak ada saran.";
                        const confidenceValue =
                          confidence !== undefined
                            ? `${(parseFloat(confidence) * 100).toFixed(0)}%`
                            : "N/A";

                        return (
                          <div
                            key={id}
                            className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-3 hover:shadow-lg transition-shadow duration-150"
                          >
                            {/* Area Konten Teks Riwayat */}
                            <div className="flex-grow text-sm text-gray-800 space-y-2">
                              <p>
                                <strong className="font-semibold text-gray-900">
                                  Diagnosis:
                                </strong>{" "}
                                {diagnosisNameFromHistory || "N/A"}
                              </p>
                              <p>
                                <strong className="font-semibold text-gray-900">
                                  Keyakinan:
                                </strong>{" "}
                                {confidenceValue}
                              </p>
                              <div>
                                <strong className="font-semibold text-gray-900 block mb-0.5">
                                  Arti/Gejala:
                                </strong>
                                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                                  {gejalaText}
                                </p>
                              </div>
                              <div>
                                <strong className="font-semibold text-gray-900 block mb-0.5">
                                  Saran:
                                </strong>
                                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                                  {saranText}
                                </p>
                              </div>
                            </div>

                            {/* Area Tombol Delete di Tengah */}
                            <div className="flex justify-center items-center w-full sm:w-auto my-4 sm:my-0">
                              <button
                                onClick={async () => {
                                  setButtonLoading((prev) => ({
                                    ...prev,
                                    delete: id,
                                  }));
                                  await deleteHistoryItem(id);
                                  setButtonLoading((prev) => ({
                                    ...prev,
                                    delete: null,
                                  }));
                                }}
                                className={"btn btn-destructive w-full"}
                                aria-label={`Hapus riwayat ${diagnosisNameFromHistory}`}
                                disabled={buttonLoading.delete === id}
                              >
                                {buttonLoading.delete === id && (
                                  <ButtonSpinner />
                                )}
                                {buttonLoading.delete === id
                                  ? "Menghapus..."
                                  : "Delete"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* === AKHIR MODIFIKASI TAMPILAN ITEM RIWAYAT === */}

                    {history.length > 0 && (
                      <button
                        onClick={async () => {
                          setButtonLoading((prev) => ({
                            ...prev,
                            clear: true,
                          }));
                          await clearHistory();
                          setButtonLoading((prev) => ({
                            ...prev,
                            clear: false,
                          }));
                        }}
                        className={"btn btn-destructive w-full mt-6"}
                        disabled={buttonLoading.clear}
                      >
                        {buttonLoading.clear && <ButtonSpinner />}
                        {buttonLoading.clear
                          ? "Menghapus..."
                          : "Clear Semua Riwayat"}
                      </button>
                    )}
                  </>
                ))}
            </div>
          </div>
        );
      }}
    </ScanNowPresenter>
  );
}
