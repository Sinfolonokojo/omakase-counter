import { motion } from 'framer-motion';
import { Trophy, Calendar, Share2 } from 'lucide-react';

export const SessionCard = ({ session, onShare }) => {
  const date = new Date(session.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden border-2 hover:shadow-xl transition-shadow ${
        session.isRecord ? 'border-salmon' : 'border-transparent'
      }`}
    >
      {session.photoUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={session.photoUrl}
            alt="Session photo"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2">
              {session.isRecord && <Trophy size={20} className="text-salmon" />}
              <h3 className="text-2xl font-bold font-heading text-charcoal">
                {session.count} pieces
              </h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <Calendar size={14} />
              <span>{formattedDate}</span>
              <span className="mx-1">•</span>
              <span>{formattedTime}</span>
            </div>
          </div>

          <button
            onClick={() => onShare(session)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Share session"
          >
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>

        {session.sushiTypes && session.sushiTypes.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Types eaten:</p>
            <div className="flex flex-wrap gap-1">
              {session.sushiTypes.slice(0, 5).map((typeId) => (
                <span
                  key={typeId}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  {typeId}
                </span>
              ))}
              {session.sushiTypes.length > 5 && (
                <span className="text-xs px-2 py-1 text-gray-500">
                  +{session.sushiTypes.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        {session.duration && (
          <p className="text-xs text-gray-500 mt-2">
            Duration: {session.duration} minutes
          </p>
        )}
      </div>
    </motion.div>
  );
};
