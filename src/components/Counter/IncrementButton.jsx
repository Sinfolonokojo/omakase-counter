import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export const IncrementButton = ({ onIncrement, onDecrement, count }) => {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Decrement Button */}
      {count > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDecrement}
          className="w-16 h-16 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors flex items-center justify-center text-white shadow-lg"
          aria-label="Decrease count"
        >
          <Minus size={32} strokeWidth={3} />
        </motion.button>
      )}

      {/* Increment Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onIncrement}
        className="w-24 h-24 rounded-full bg-charcoal hover:bg-gray-800 transition-colors flex items-center justify-center text-white shadow-xl"
        aria-label="Increase count"
      >
        <Plus size={48} strokeWidth={3} />
      </motion.button>
    </div>
  );
};
