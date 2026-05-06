import { motion } from 'motion/react';
import { Blessing } from '../constants';

interface TransitScreenProps {
  nextBlessing: Blessing | null;
  isFinal?: boolean;
}

export const TransitScreen = ({ nextBlessing, isFinal }: TransitScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-[#0f0520]/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="text-7xl mb-4 animate-warp">💫</span>
      <p className="font-orbitron text-xs tracking-[4px] text-rose uppercase mb-2">
        {isFinal
          ? '💝 MISIÓN COMPLETADA — TODAS LAS BENDICIONES REVELADAS'
          : `VIAJANDO A: ${nextBlessing?.name || 'DESTINO FINAL'}`}
      </p>
      <p className="italic text-[rgba(240,236,224,0.55)] text-lg">
        {isFinal
          ? 'Compilando las 10 razones bíblicas...'
          : `Dimensión: ${nextBlessing?.tag || 'Celestial'}`}
      </p>
    </motion.div>
  );
};
