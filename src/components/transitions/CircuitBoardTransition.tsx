import { motion } from 'framer-motion';

export const CircuitBoardTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none bg-black/70">
      {/* Circuit lines */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(20)].map((_, i) => {
          const isHorizontal = i % 2 === 0;
          return (
            <motion.line
              key={i}
              x1={isHorizontal ? '0%' : `${(i / 20) * 100}%`}
              y1={isHorizontal ? `${(i / 20) * 100}%` : '0%'}
              x2={isHorizontal ? '100%' : `${(i / 20) * 100}%`}
              y2={isHorizontal ? `${(i / 20) * 100}%` : '100%'}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.03,
                ease: 'easeInOut'
              }}
            />
          );
        })}
      </svg>
      
      {/* Circuit nodes */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 border-2 border-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.02
          }}
        />
      ))}
      
      {/* Flash overlay */}
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
};
