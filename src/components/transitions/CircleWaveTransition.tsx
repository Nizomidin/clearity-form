import { motion } from 'framer-motion';

export const CircleWaveTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-primary rounded-full"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: '120vw',
            height: '120vw',
            opacity: 0
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
            delay: i * 0.15
          }}
        />
      ))}
    </div>
  );
};
