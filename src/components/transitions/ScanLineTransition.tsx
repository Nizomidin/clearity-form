import { motion } from 'framer-motion';

export const ScanLineTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <motion.div
        className="absolute left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_hsl(var(--primary))]"
        initial={{ top: 0, opacity: 0 }}
        animate={{
          top: '100%',
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1,
          ease: 'linear'
        }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-primary"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 0.5
        }}
      />
    </div>
  );
};
