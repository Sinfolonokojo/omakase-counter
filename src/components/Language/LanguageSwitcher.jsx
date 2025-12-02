import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-border-gray rounded-lg hover:border-charcoal hover:shadow-md transition-all"
      aria-label="Switch language"
    >
      <Languages size={20} className="text-charcoal" />
      <span className="text-sm font-medium text-charcoal">
        {language === 'en' ? 'EN' : 'ES'}
      </span>
    </motion.button>
  );
};
