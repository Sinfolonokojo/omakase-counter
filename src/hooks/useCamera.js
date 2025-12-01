import { useState, useRef, useCallback } from 'react';
import { compressImage, fileToBase64 } from '../utils/imageCompression';
import { PHOTO } from '../utils/constants';

export const useCamera = () => {
  const [stream, setStream] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('Camera access denied. Please enable camera permissions.');
      setIsLoading(false);
    }
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Convert to blob
    canvas.toBlob(async (blob) => {
      try {
        // Compress image
        const compressed = await compressImage(blob);

        // Convert to base64 for storage
        const base64 = await fileToBase64(compressed);
        setPhotoData(base64);
      } catch (error) {
        console.error('Error processing photo:', error);
        setError('Failed to process photo. Please try again.');
      }
    }, 'image/jpeg', PHOTO.quality);
  }, []);

  const retakePhoto = useCallback(() => {
    setPhotoData(null);
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const handleFileInput = useCallback(async (file) => {
    try {
      setIsLoading(true);
      const compressed = await compressImage(file);
      const base64 = await fileToBase64(compressed);
      setPhotoData(base64);
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Failed to process image. Please try again.');
      setIsLoading(false);
    }
  }, []);

  return {
    videoRef,
    photoData,
    isLoading,
    error,
    stream,
    startCamera,
    capturePhoto,
    retakePhoto,
    stopCamera,
    handleFileInput
  };
};
