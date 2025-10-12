import { motion } from 'framer-motion';

export const ScanLine = () => {
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: '100vh' }}
      transition={{ duration: 2, ease: "linear" }}
      className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 pointer-events-none"
    />
  );
};
