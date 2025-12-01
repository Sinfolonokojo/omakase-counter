import { motion } from 'framer-motion';
import { SessionCard } from './SessionCard';
import { Loader2 } from 'lucide-react';

export const SessionList = ({ sessions, loading, onShare }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-4"
        >
          🍣
        </motion.div>
        <p className="text-gray-500 text-lg mb-2">No sessions yet</p>
        <p className="text-gray-400 text-sm">Start tracking your sushi eating!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session, index) => (
        <motion.div
          key={session.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        >
          <SessionCard session={session} onShare={onShare} />
        </motion.div>
      ))}
    </div>
  );
};
