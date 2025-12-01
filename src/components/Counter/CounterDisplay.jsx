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
          isNewRecord ? 'text-salmon' : 'text-charcoal'
        }`}
        style={{
          filter: isNewRecord ? 'drop-shadow(0 0 20px rgba(255, 107, 107, 0.6))' : 'none',
        }}
      >
        {count}
      </motion.div>
      <motion.p
        key={`pieces-${count}`}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl text-gray-600 mt-2"
      >
        pieces
      </motion.p>
    </div>
  );
};
