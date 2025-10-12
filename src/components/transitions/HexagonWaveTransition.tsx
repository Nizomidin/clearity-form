import { motion } from 'framer-motion';

export const HexagonWaveTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none bg-black/70">
      {/* Hexagon grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{
              scale: [0, 2 + i * 0.3, 3 + i * 0.5],
              rotate: [0, 180],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.05,
              ease: 'easeOut'
            }}
          >
            <svg width="200" height="200" viewBox="0 0 100 100">
              <polygon
                points="50,5 90,25 90,65 50,85 10,65 10,25"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Radial scan */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-1/2 origin-top"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--primary)), transparent)',
            transform: `rotate(${(i / 8) * 360}deg)`
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 1], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 1.5,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
};
