import React, { useState, useEffect, useRef } from "react";
import AuthPresenter, { DiagnosisAPI } from "../../../data/api";

export default function ScanNowPresenter({ children }) {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Camera related states
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  // Tambahan untuk flip kamera
  const [facingMode, setFacingMode] = useState("environment"); // 'user' untuk depan, 'environment' untuk belakang

  // History state
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  // Fetch diagnosis history
  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const data = await DiagnosisAPI.getHistory();
      // Ensure each history item has arti field, fallback to empty string if missing
      const historyWithArti = data.map((item) => ({
        ...item,
        arti: item.arti || "",
      }));
      setHistory(historyWithArti);
    } catch (err) {
      setHistoryError(err.message);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // Delete a diagnosis record by id
  const deleteHistoryItem = async (id) => {
    setHistoryError("");
    try {
      const prevHistoryLength = history.length;
      await DiagnosisAPI.deleteDiagnosis(id);
      await fetchHistory();
      // Simpan flag ke localStorage sebelum reload
      localStorage.setItem(
        "checkHistoryAfterReload",
        JSON.stringify({ prevHistoryLength })
      );
      window.location.reload();
    } catch (err) {
      if (err.message.includes("404")) {
        setHistory((prev) => prev.filter((item) => item.id !== id));
      } else {
        setHistoryError(err.message);
      }
    }
  };

  // Clear all history by deleting all records
  const clearHistory = async () => {
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const prevHistoryLength = history.length;
      // Delete all history items sequentially
      for (const item of history) {
        try {
          await DiagnosisAPI.deleteDiagnosis(item.id);
        } catch (err) {
          if (err.message.includes("404")) {
            // Skip invalid id
            setHistory((prev) => prev.filter((h) => h.id !== item.id));
          } else {
            throw err;
          }
        }
      }
      // Refresh history from backend after clearing
      await fetchHistory();
      // Simpan flag ke localStorage sebelum reload
      localStorage.setItem(
        "checkHistoryAfterReload",
        JSON.stringify({ prevHistoryLength })
      );
      window.location.reload();
    } catch (err) {
      setHistoryError(err.message);
    } finally {
      setHistoryLoading(false);
    }
  };

  // New: handle image upload and diagnosis
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only PNG, JPEG, and JPG files are allowed.");
        setImage(null);
        setDiagnosis("");
        return;
      }
      setLoading(true);
      setError("");
      setImage(URL.createObjectURL(file));
      try {
        // Call API diagnose
        const result = await DiagnosisAPI.diagnoseImage(file);
        // Support both {label, confidence, ...} and {data: {label, ...}}
        const label =
          result.label || (result.data && result.data.label) || "undefined";
        const confidence =
          result.confidence ||
          (result.data && result.data.confidence) ||
          "undefined";
        const arti =
          result.arti || (result.data && result.data.arti) || "undefined";
        const saran =
          result.saran || (result.data && result.data.saran) || "undefined";
        setDiagnosis(
          `Diagnosis: ${label}\nConfidence: ${confidence}\nArti: ${arti}\nSaran: ${saran}`
        );
        // Immediately update history when diagnosis result appears
        try {
          const newDiagnosis = await DiagnosisAPI.createDiagnosis({
            symptoms: [],
            diagnosis: label,
            confidence: confidence.toString(),
            recommendations: saran ? [saran] : [],
          });
          // Append new diagnosis directly to local history state for instant responsiveness
          setHistory((prev) => [
            {
              id: newDiagnosis.id,
              diagnosis: label,
              confidence: confidence.toString(),
              recommendations: saran ? [saran] : [],
            },
            ...prev,
          ]);
        } catch (err) {
          // Handle error silently or set error state if needed
          console.error("Failed to save diagnosis history:", err);
        }
      } catch (err) {
        setDiagnosis("");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: { exact: facingMode } },
      };
      // Fallback jika facingMode tidak didukung
      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch {
        // Coba tanpa facingMode jika gagal
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      }
      setStream(mediaStream);
      streamRef.current = mediaStream;
      setCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraOn(false);
    }
  };

  // Flip kamera (toggle facingMode)
  const flipCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Restart camera jika facingMode berubah dan kamera sedang aktif
  useEffect(() => {
    if (cameraOn) {
      // Stop current stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setStream(null);
      }
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
    }
    setCameraOn(false);
  };

  // Capture photo from video stream
  const takePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Convert canvas to blob for upload
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      setLoading(true);
      setError("");
      setImage(canvas.toDataURL("image/png"));
      try {
        const file = new File([blob], "photo.png", { type: "image/png" });
        const result = await DiagnosisAPI.diagnoseImage(file);
        // Support both {label, confidence, ...} and {data: {label, ...}}
        const label =
          result.label || (result.data && result.data.label) || "undefined";
        const confidence =
          result.confidence ||
          (result.data && result.data.confidence) ||
          "undefined";
        const arti =
          result.arti || (result.data && result.data.arti) || "undefined";
        const saran =
          result.saran || (result.data && result.data.saran) || "undefined";
        setDiagnosis(
          `Diagnosis: ${label}\nConfidence: ${confidence}\nArti: ${arti}\nSaran: ${saran}`
        );
        // Fetch updated history after diagnosis
        await fetchHistory();
      } catch (err) {
        setDiagnosis("");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, "image/png");
  };

  // Reset scan to allow new upload or photo
  const resetScan = () => {
    setImage(null);
    setDiagnosis("");
    setError("");
    setLoading(false);
  };

  // Update video element srcObject when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    // Stop camera on page unload or refresh
    const handleBeforeUnload = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setStream(null);
        setCameraOn(false);
      }
    };

    // Stop camera when page is hidden (e.g., tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          setStream(null);
          setCameraOn(false);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setStream(null);
        setCameraOn(false);
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // useEffect untuk cek notifikasi setelah reload
  useEffect(() => {
    const checkFlag = localStorage.getItem("checkHistoryAfterReload");
    if (checkFlag) {
      const { prevHistoryLength } = JSON.parse(checkFlag);
      localStorage.removeItem("checkHistoryAfterReload");
      if (history.length === prevHistoryLength) {
        alert("History belum berubah, silakan tekan tombol update history.");
      }
    }
  }, [history]);

  return children({
    image,
    diagnosis,
    loading,
    error,
    history,
    historyLoading,
    historyError,
    handleImageChange,
    cameraOn,
    startCamera,
    stopCamera,
    takePhoto,
    resetScan,
    fetchHistory,
    deleteHistoryItem,
    clearHistory,
    videoRef,
    flipCamera,
    facingMode,
  });
}
