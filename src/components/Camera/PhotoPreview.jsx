import { motion } from 'framer-motion';
import { Check, X, RotateCcw } from 'lucide-react';

export const PhotoPreview = ({ photoData, onSave, onRetake, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      <div className="flex justify-between items-center p-4 bg-black/50">
        <button
          onClick={onCancel}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Cancel"
        >
          <X size={24} />
        </button>
        <h2 className="text-white font-medium">Preview</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
        <img
          src={photoData}
          alt="Captured photo"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>

      <div className="p-8 flex justify-center gap-4">
        <button
          onClick={onRetake}
          className="flex items-center gap-2 py-3 px-6 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          <RotateCcw size={20} />
          Retake
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 py-3 px-8 bg-white text-charcoal rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          <Check size={20} />
          Save
        </button>
      </div>
    </motion.div>
  );
};
