import { motion } from 'framer-motion';

export const GeometricCube = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ rotateX: 0, rotateY: 0, scale: 0.5, opacity: 0 }}
        animate={{ 
          rotateX: [0, 360], 
          rotateY: [0, 360], 
          scale: [0.5, 1, 0.5],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-24 h-24 border-2 border-secondary"
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      />
    </div>
  );
};
