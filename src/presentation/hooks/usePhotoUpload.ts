import { useState } from 'react';

export const usePhotoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadPhoto = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTimeout(() => {
            setIsUploading(false);
            resolve(reader.result as string);
          }, 1000);
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  return { uploadPhoto, isUploading };
};