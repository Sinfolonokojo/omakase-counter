import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';
import { Confetti } from './Confetti';

export const RecordBreakModal = ({
  isOpen,
  count,
  previousRecord,
  onTakePhoto,
  onSkip,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  💖🎉
                </motion.div>

                <h2 className="text-3xl font-heading font-bold mb-2">
                  <span className="text-glam-gradient">✨ New Record! ✨</span>
                </h2>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-6xl font-bold font-heading text-glam-gold my-6"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))' }}
                >
                  {count}
                </motion.div>

                <p className="text-gray-600 mb-2">pieces of sushi!</p>

                {previousRecord > 0 && (
                  <p className="text-sm text-gray-500 mb-6">
                    Previous best: {previousRecord} pieces
                  </p>
                )}

                <div className="flex items-center justify-center gap-2 text-charcoal mb-6">
                  <Camera size={24} />
                  <p className="text-lg font-medium">Capture this moment?</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onSkip}
                    className="flex-1 py-3 px-6 rounded-full border-2 border-border-gray text-bubblegum font-medium hover:bg-rice transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={onTakePhoto}
                    className="flex-1 py-3 px-6 rounded-full bg-glam-pill text-white font-medium shadow-glam hover:shadow-glam-lg transition-shadow"
                  >
                    Take Photo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
