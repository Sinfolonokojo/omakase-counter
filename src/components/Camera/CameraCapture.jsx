import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, Upload } from 'lucide-react';

export const CameraCapture = ({
  videoRef,
  onCapture,
  onClose,
  onFileSelect,
  error
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      <div className="flex justify-between items-center p-4 bg-black/50">
        <button
          onClick={onClose}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close camera"
        >
          <X size={24} />
        </button>

        <label className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
          <Upload size={24} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onFileSelect(file);
              }
            }}
          />
        </label>
      </div>

      {error ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-white mb-4">{error}</p>
            <label className="inline-block py-3 px-6 bg-white text-charcoal rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors">
              Choose from Gallery
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onFileSelect(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 flex justify-center">
            <button
              onClick={onCapture}
              className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 transition-colors flex items-center justify-center shadow-xl border-4 border-gray-300"
              aria-label="Capture photo"
            >
              <Camera size={32} className="text-charcoal" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};
