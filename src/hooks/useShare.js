import { useState, useCallback } from 'react';
import { shareRecord, canShare } from '../utils/share';

export const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const share = useCallback(async ({ count, photoUrl, restaurantName }) => {
    setIsSharing(true);
    setShareError(null);
    setShareSuccess(false);

    try {
      const result = await shareRecord({
        count,
        photoUrl,
        appUrl: window.location.href,
        restaurantName
      });

      if (result.success) {
        setShareSuccess(true);

        if (result.fallback) {
          // Show message that link was copied to clipboard
          return { success: true, fallback: true };
        }

        return { success: true };
      } else if (result.cancelled) {
        return { success: false, cancelled: true };
      } else {
        throw new Error('Share failed');
      }
    } catch (error) {
      console.error('Share error:', error);
      setShareError(error.message);
      return { success: false, error };
    } finally {
      setIsSharing(false);
    }
  }, []);

  const isShareSupported = canShare();

  return {
    share,
    isSharing,
    shareError,
    shareSuccess,
    isShareSupported
  };
};
