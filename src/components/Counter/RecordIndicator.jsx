import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';


export const RecordIndicator = ({ personalRecord, isNewRecord }) => {
  const { t } = useLanguage();

  if (personalRecord === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-bubblegum text-sm">{t('startFirstSession')} 💖</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center gap-2 py-4 px-6 rounded-full ${
        isNewRecord
          ? 'bg-gradient-to-r from-salmon/15 to-glam-gold/20 text-salmon shadow-glam'
          : 'bg-white/70 text-charcoal border border-border-gray'
      }`}
    >
      <Trophy size={20} className={isNewRecord ? 'text-glam-gold' : 'text-bubblegum'} />
      <span className="text-sm font-medium">
        {isNewRecord ? `✨ ${t('newRecord')} ✨` : `${t('personalBest')}: ${personalRecord} ${t('pieces')}`}
      </span>
    </motion.div>
  );
};
