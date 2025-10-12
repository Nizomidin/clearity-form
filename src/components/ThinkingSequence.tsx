import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThinkingSequenceProps {
  lines: string[];
  onComplete: () => void;
  speed?: number;
}

export const ThinkingSequence = ({ lines, onComplete, speed = 1500 }: ThinkingSequenceProps) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(onComplete, 500);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentLine, lines.length, speed, onComplete]);

  return (
    <div className="min-h-[100px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {currentLine < lines.length && (
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="terminal-text text-muted-foreground text-sm"
          >
            {lines[currentLine]}
            <span className="inline-block w-1.5 h-3 ml-1 bg-primary animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
