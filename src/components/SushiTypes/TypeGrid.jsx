import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const TypeGrid = ({ types, selectedTypes, onToggle }) => {
  const categories = {
    nigiri: 'Nigiri',
    maki: 'Maki Rolls',
    sashimi: 'Sashimi',
    other: 'Other',
  };

  const groupedTypes = types.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedTypes).map(([category, categoryTypes]) => (
        <div key={category}>
          <h3 className="text-lg font-heading font-semibold text-charcoal mb-3">
            {categories[category]}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {categoryTypes.map((type) => {
              const isSelected = selectedTypes.includes(type.id);

              return (
                <motion.button
                  key={type.id}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  onClick={() => onToggle(type.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left shadow-sm ${
                    isSelected
                      ? 'border-charcoal bg-charcoal text-white shadow-md'
                      : 'border-border-gray hover:border-charcoal hover:shadow-xl bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {type.emoji && (
                        <motion.span
                          animate={{
                            rotate: isSelected ? [0, 10, -10, 0] : 0,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: 'easeInOut',
                          }}
                          className="text-xl mb-1 block inline-block"
                        >
                          {type.emoji}
                        </motion.span>
                      )}
                      <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-charcoal'}`}>
                        {type.name}
                      </p>
                      {type.timesEaten > 0 && (
                        <p className={`text-xs mt-1 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                          Eaten {type.timesEaten} times
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <Check size={16} className="text-charcoal" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
