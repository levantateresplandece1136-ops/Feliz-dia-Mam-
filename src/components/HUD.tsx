import { motion } from 'motion/react';

interface HUDProps {
  currentIdx: number;
  total: number;
  visitedCount: number;
}

export const HUD = ({ currentIdx, total, visitedCount }: HUDProps) => {
  const progress = (currentIdx / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-5 py-3 bg-[#0f0520]/85 backdrop-blur-md border-b border-[rgba(240,192,96,0.25)]">
      <span className="font-orbitron text-[10px] text-rose uppercase tracking-[3px]">
        BENDICIÓN {String(currentIdx + 1).padStart(2, '0')}/{total}
      </span>
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-rose via-violet to-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
      <span className="font-mono text-[10px] text-gold uppercase tracking-[2px]">
        ♥ {visitedCount} BENDICIONES
      </span>
    </div>
  );
};
