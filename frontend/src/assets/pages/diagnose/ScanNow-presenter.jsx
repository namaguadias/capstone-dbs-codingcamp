import React, { useState, useEffect, useRef } from "react";

export default function ScanNowPresenter({ children }) {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);

  // Camera related states
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setImage(URL.createObjectURL(file));
      // Simulate diagnosis result for demonstration with delay
      setTimeout(() => {
        setDiagnosis("Hasil diagnosa awal: Kemungkinan dermatitis atau eksim.");
        setLoading(false);
      }, 1500);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraOn(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraOn(false);
  };

  // Capture photo from video stream
  const takePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoDataUrl = canvas.toDataURL("image/png");

    setLoading(true);
    setImage(photoDataUrl);
    setDiagnosis("");
    setTimeout(() => {
      setDiagnosis("Hasil diagnosa awal: Kemungkinan dermatitis atau eksim.");
      setLoading(false);
    }, 1500);
  };

  // Reset scan to allow new upload or photo
  const resetScan = () => {
    setImage(null);
    setDiagnosis("");
    setLoading(false);
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return children({
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
  });
}
