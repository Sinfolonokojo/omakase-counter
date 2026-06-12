import { motion } from 'framer-motion';
import { ANIMATION } from '../../utils/constants';

export const CounterDisplay = ({ count, isNewRecord }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        key={count}
        initial={{ scale: 1, y: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: ANIMATION.counterIncrement / 1000,
          ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
        }}
        className={`text-8xl font-bold font-heading relative ${
          isNewRecord ? 'text-glam-gold' : 'text-glam-gradient'
        }`}
        style={{
          filter: isNewRecord
            ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 30px rgba(255, 20, 147, 0.4))'
            : 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.35))',
        }}
      >
        {count}
      </motion.div>
      <motion.p
        key={`pieces-${count}`}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl text-charcoal/70 mt-2"
      >
        pieces
      </motion.p>
    </div>
  );
};
