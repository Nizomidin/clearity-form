import { motion } from 'framer-motion';

export const FullScreenTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Digital rain effect */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px"
            style={{ left: `${(i / 30) * 100}%` }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: ['0%', '100%', '0%'],
              opacity: [0, 1, 0],
              y: ['0%', '100%']
            }}
            transition={{
              duration: 1.5,
              ease: 'linear',
              delay: i * 0.02
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-primary to-primary" />
          </motion.div>
        ))}
      </div>

      {/* Expanding circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-primary rounded-full"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{
              width: ['0px', '800px', '1600px'],
              height: ['0px', '800px', '1600px'],
              opacity: [1, 0.5, 0]
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Horizontal scan */}
      <motion.div
        className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
        initial={{ top: 0, opacity: 0 }}
        animate={{
          top: ['0%', '100%'],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          ease: 'linear'
        }}
      />

      {/* Vertical grid lines */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-primary"
          style={{ left: `${(i / 10) * 100}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleY: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.05
          }}
        />
      ))}

      {/* Hexagon particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              ease: 'easeInOut'
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30">
              <polygon
                points="15,2 27,8 27,22 15,28 3,22 3,8"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Corner brackets animation */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: [0, 1, 0], x: 0, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polyline points="40,0 0,0 0,40" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8"
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={{ opacity: [0, 1, 0], x: 0, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polyline points="20,0 60,0 60,40" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8"
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: [0, 1, 0], x: 0, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polyline points="40,60 0,60 0,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8"
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: [0, 1, 0], x: 0, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polyline points="20,60 60,60 60,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Center burst */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 1 }}
      >
        <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_100px_50px_hsl(var(--primary)/0.5)]" />
      </motion.div>
    </div>
  );
};
