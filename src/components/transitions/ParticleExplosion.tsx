import { motion } from 'framer-motion';

export const ParticleExplosion = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const distance = 150;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
          />
        );
      })}
    </div>
  );
};
