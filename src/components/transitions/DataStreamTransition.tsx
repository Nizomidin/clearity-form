import { motion } from 'framer-motion';

export const DataStreamTransition = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none bg-black/80">
      {/* Binary streams */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary font-mono text-xs opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10%'
          }}
          initial={{ y: 0 }}
          animate={{ y: '120vh' }}
          transition={{
            duration: 1.5,
            delay: i * 0.02,
            ease: 'linear'
          }}
        >
          {Array.from({ length: 20 }, () => Math.round(Math.random())).join('')}
        </motion.div>
      ))}
      
      {/* Horizontal scan bars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ top: `${i * 20}%`, opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0, 1, 0]
          }}
          transition={{
            duration: 1,
            delay: i * 0.1
          }}
        />
      ))}
      
      {/* Center burst */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 1 }}
      >
        <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_150px_80px_hsl(var(--primary)/0.6)]" />
      </motion.div>
    </div>
  );
};
