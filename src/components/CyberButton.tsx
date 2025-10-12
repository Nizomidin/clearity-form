import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const CyberButton = ({ children, onClick, variant = 'primary', className }: CyberButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'px-8 py-3 border terminal-text transition-all duration-300',
        variant === 'primary' 
          ? 'border-primary bg-primary/10 text-primary hover:bg-primary/20 cyber-glow' 
          : 'border-secondary bg-secondary/10 text-secondary hover:bg-secondary/20',
        'hover:shadow-[0_0_30px_hsl(var(--cyber-glow)/0.4)]',
        className
      )}
    >
      {children}
    </motion.button>
  );
};
