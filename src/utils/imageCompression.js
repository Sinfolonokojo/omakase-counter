import imageCompression from 'browser-image-compression';
import { PHOTO } from './constants';

export const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: PHOTO.maxSizeMB,
      maxWidthOrHeight: PHOTO.maxWidthOrHeight,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const base64ToBlob = async (base64) => {
  const response = await fetch(base64);
  return response.blob();
};
