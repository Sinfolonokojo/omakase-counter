import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const FloatingSushi = ({ trigger, position }) => {
  const [sushis, setSushis] = useState([]);

  const sushiEmojis = ['🍣', '🍱', '🍙', '🍘', '🍢', '🥟'];

  useEffect(() => {
    if (trigger > 0) {
      // Create 3-5 random sushi pieces
      const count = Math.floor(Math.random() * 3) + 3;
      const newSushis = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        emoji: sushiEmojis[Math.floor(Math.random() * sushiEmojis.length)],
        x: position?.x || window.innerWidth / 2,
        y: position?.y || window.innerHeight / 2,
        offsetX: (Math.random() - 0.5) * 100,
        rotation: Math.random() * 360,
      }));

      setSushis(prev => [...prev, ...newSushis]);

      // Clean up after animation
      setTimeout(() => {
        setSushis(prev => prev.filter(s => !newSushis.find(ns => ns.id === s.id)));
      }, 2000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {sushis.map((sushi) => (
          <motion.div
            key={sushi.id}
            initial={{
              x: sushi.x,
              y: sushi.y,
              opacity: 1,
              scale: 0,
              rotate: sushi.rotation,
            }}
            animate={{
              x: sushi.x + sushi.offsetX,
              y: sushi.y - 200,
              opacity: 0,
              scale: [0, 1.5, 1],
              rotate: sushi.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
            }}
            className="absolute text-4xl"
            style={{
              left: -20,
              top: -20,
            }}
          >
            {sushi.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
