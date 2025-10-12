import { motion } from 'framer-motion';

export const GridPulseTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Vertical lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-primary"
          style={{ left: `${(i / 8) * 100}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleY: [0, 1, 1]
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.05
          }}
        />
      ))}
      {/* Horizontal lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-primary"
          style={{ top: `${(i / 6) * 100}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 1]
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.05
          }}
        />
      ))}
    </div>
  );
};
