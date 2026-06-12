import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export const EndSessionModal = ({
  isOpen,
  count,
  onTakePhoto,
  onSaveWithoutPhoto,
  onClose,
}) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-glam-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-bubblegum hover:text-salmon"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="text-6xl mb-4"
              >
                🍣💖
              </motion.div>

              <h2 className="text-2xl font-heading font-bold mb-2">
                <span className="text-glam-gradient">{t('endSessionTitle')}</span>
              </h2>

              <div className="text-5xl font-bold font-heading text-glam-gradient my-4">
                {count}
              </div>
              <p className="text-charcoal/70 mb-6">{t('pieces')}</p>

              <div className="flex items-center justify-center gap-2 text-charcoal mb-6">
                <Camera size={24} />
                <p className="text-lg font-medium">{t('captureMoment')}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onSaveWithoutPhoto}
                  className="flex-1 py-3 px-6 rounded-full border-2 border-border-gray text-bubblegum font-medium hover:bg-rice transition-colors"
                >
                  {t('saveWithoutPhoto')}
                </button>
                <button
                  onClick={onTakePhoto}
                  className="flex-1 py-3 px-6 rounded-full bg-glam-pill text-white font-medium shadow-glam hover:shadow-glam-lg transition-shadow"
                >
                  {t('addPhoto')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
