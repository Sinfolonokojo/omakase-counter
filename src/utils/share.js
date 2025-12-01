import { base64ToBlob } from './imageCompression';

export const shareRecord = async ({ count, photoUrl, appUrl, restaurantName }) => {
  const restaurantText = restaurantName ? ` at ${restaurantName}` : '';
  const text = `🍣 New personal record! I just ate ${count} pieces of sushi${restaurantText}! #OmakaseCounter #SushiChallenge`;

  try {
    // Check if Web Share API is supported
    if (navigator.share) {
      const shareData = {
        title: 'Omakase Counter',
        text: text,
        url: appUrl || window.location.href
      };

      // Add photo if available
      if (photoUrl) {
        try {
          const blob = await base64ToBlob(photoUrl);
          const file = new File([blob], 'sushi-record.jpg', { type: 'image/jpeg' });
          shareData.files = [file];
        } catch (error) {
          console.error('Error adding photo to share:', error);
          // Continue without photo
        }
      }

      await navigator.share(shareData);
      return { success: true };
    } else {
      // Fallback: copy to clipboard
      const shareText = text + '\n' + (appUrl || window.location.href);
      await navigator.clipboard.writeText(shareText);
      return { success: true, fallback: true };
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      // User cancelled the share
      return { success: false, cancelled: true };
    }
    console.error('Share failed:', error);
    return { success: false, error };
  }
};

export const canShare = () => {
  return 'share' in navigator;
};

export const canShareFiles = () => {
  return 'share' in navigator && 'canShare' in navigator && navigator.canShare({ files: [] });
};
