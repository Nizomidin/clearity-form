import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingThinkingProps {
  lines: string[];
  onComplete: () => void;
  speed?: number;
}

export const TypingThinking = ({ lines, onComplete, speed = 30 }: TypingThinkingProps) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = lines[currentLineIndex];

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentLine[charIndex]);
        setCharIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Current line finished, move to next after delay
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setDisplayedText('');
        setCharIndex(0);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLine, currentLineIndex, lines.length, speed, onComplete]);

  if (currentLineIndex >= lines.length) {
    return null;
  }

  return (
    <div className="min-h-[100px] flex items-center justify-center">
      <motion.div
        key={currentLineIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal-text text-muted-foreground text-sm"
      >
        {displayedText}
        {charIndex < currentLine.length && (
          <span className="inline-block w-1.5 h-3 ml-1 bg-primary animate-pulse" />
        )}
      </motion.div>
    </div>
  );
};
