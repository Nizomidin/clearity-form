import { motion } from 'framer-motion';

export const DataParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: 0, x: particle.x, opacity: 1, scale: 1 }}
          animate={{ y: -200, x: particle.x, opacity: 0, scale: 0 }}
          transition={{ duration: 2, delay: particle.delay, ease: "easeOut" }}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{ left: '50%', top: '50%' }}
        />
      ))}
    </div>
  );
};
