import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AnimatedBackground = () => {
  const [sushis, setSushis] = useState([]);

  useEffect(() => {
    // Create floating background sushi elements
    const backgroundSushis = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: ['🍣', '🍱', '🍙', '🥢', '🍘'][Math.floor(Math.random() * 5)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      scale: 0.3 + Math.random() * 0.4,
    }));
    setSushis(backgroundSushis);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {sushis.map((sushi) => (
        <motion.div
          key={sushi.id}
          initial={{
            left: `${sushi.left}%`,
            top: `${sushi.top}%`,
            scale: sushi.scale,
            rotate: 0,
            opacity: 0.5,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: sushi.duration,
            delay: sushi.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute text-6xl"
        >
          {sushi.emoji}
        </motion.div>
      ))}
    </div>
  );
};
