import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export const RecordIndicator = ({ personalRecord, isNewRecord }) => {
  if (personalRecord === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">Start your first session!</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center gap-2 py-4 px-6 rounded-lg ${
        isNewRecord ? 'bg-salmon/10 text-salmon' : 'bg-gray-100 text-gray-600'
      }`}
    >
      <Trophy size={20} className={isNewRecord ? 'text-salmon' : 'text-gray-500'} />
      <span className="text-sm font-medium">
        {isNewRecord ? 'New Record!' : `Personal Best: ${personalRecord} pieces`}
      </span>
    </motion.div>
  );
};
