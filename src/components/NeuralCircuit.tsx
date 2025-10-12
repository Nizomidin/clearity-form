import { motion } from 'framer-motion';

export const NeuralCircuit = () => {
  const lines = [
    { x1: 0, y1: 50, x2: 100, y2: 50 },
    { x1: 50, y1: 0, x2: 50, y2: 100 },
    { x1: 20, y1: 20, x2: 80, y2: 80 },
    { x1: 80, y1: 20, x2: 20, y2: 80 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="w-64 h-64" viewBox="0 0 100 100">
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
};
