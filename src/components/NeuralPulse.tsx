import { motion } from 'framer-motion';

export const NeuralPulse = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-32 h-32 border-2 border-primary rounded-full" />
    </motion.div>
  );
};
