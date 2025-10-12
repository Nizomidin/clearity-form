import { motion } from 'framer-motion';

export const DigitalRainTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px"
          style={{ left: `${(i / 20) * 100}%` }}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 0.8,
            ease: 'linear',
            delay: i * 0.02
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      ))}
    </div>
  );
};
