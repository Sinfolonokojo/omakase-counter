import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Confetti = () => {
  const [particles, setParticles] = useState([]);

  const sushiEmojis = ['🍣', '🍱', '🍙', '🍘', '🍢', '🥟', '🦐', '🐟', '💖', '✨', '💕', '🎀', '👑'];

  useEffect(() => {
    // Generate random confetti particles (mix of colored circles and sushi emojis)
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: ['#FF1493', '#FF69B4', '#FFD700', '#E91E8C', '#FFC1DC'][
        Math.floor(Math.random() * 5)
      ],
      size: 8 + Math.random() * 8,
      rotation: Math.random() * 360,
      isSushi: Math.random() > 0.5,
      emoji: sushiEmojis[Math.floor(Math.random() * sushiEmojis.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            top: '-10%',
            left: `${particle.left}%`,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            top: '110%',
            rotate: particle.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            fontSize: particle.isSushi ? '24px' : undefined,
            width: particle.isSushi ? 'auto' : particle.size,
            height: particle.isSushi ? 'auto' : particle.size,
            backgroundColor: particle.isSushi ? 'transparent' : particle.color,
            borderRadius: particle.isSushi ? '0' : '50%',
          }}
        >
          {particle.isSushi && particle.emoji}
        </motion.div>
      ))}
    </div>
  );
};
