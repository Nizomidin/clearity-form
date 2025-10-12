import { motion } from 'framer-motion';

export const MatrixRainTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none bg-black/80">
      {/* Digital rain columns */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px overflow-hidden"
          style={{ left: `${(i / 40) * 100}%`, height: '100vh' }}
        >
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{
              duration: 2,
              ease: 'linear',
              delay: i * 0.03,
            }}
            className="w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent opacity-60"
          />
        </motion.div>
      ))}
      
      {/* Center flash */}
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Expanding grid */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.3, 0], scale: 1.2 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
};
