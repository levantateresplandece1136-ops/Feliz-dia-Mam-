import { motion } from 'motion/react';
import { Blessing } from '../constants';

interface BlessingScreenProps {
  blessing: Blessing;
  currentIdx: number;
  total: number;
  onNext: () => void;
}

export const BlessingScreen = ({ blessing, currentIdx, total, onNext }: BlessingScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center pt-20 px-5 pb-16 overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[620px] w-full mt-8">
        {/* Progress Dots */}
        <div className="flex gap-1.5 flex-wrap mb-6 justify-center">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                i < currentIdx
                  ? 'bg-rose'
                  : i === currentIdx
                  ? 'bg-gold animate-pulse'
                  : 'bg-white/15'
              }`}
            />
          ))}
        </div>

        <div className="relative mb-2">
          {/* Large Number Watermark */}
          <div className="absolute -top-5 -left-3 font-orbitron font-black text-8xl md:text-9xl leading-none text-rose/[0.07] tracking-tighter pointer-events-none select-none">
            {blessing.num}
          </div>

          <div className="relative mb-7">
            <p className="font-mono text-[9px] tracking-[4px] text-violet uppercase mb-1.5">
              ♥ {blessing.tag}
            </p>
            <span className="text-4xl mb-2.5 block">{blessing.icon}</span>
            <h2
              className="font-orbitron font-bold text-2xl md:text-4xl leading-tight"
              style={{ color: blessing.color }}
            >
              {blessing.name}
            </h2>
          </div>
        </div>

        <div className="font-mono text-[10px] tracking-[3px] text-violet uppercase mb-4 text-center px-5 py-3 bg-violet/10 rounded">
          — {blessing.verse} —
        </div>

        <div className="border-l-4 border-rose p-4 md:p-5 bg-rose/[0.06] rounded-r-lg italic text-cream mb-6 text-lg md:text-xl leading-relaxed">
          {blessing.quote}
        </div>

        <div className="bg-[rgba(15,5,32,0.92)] backdrop-blur-md border border-[rgba(240,192,96,0.25)] rounded-lg p-5 md:p-6 mb-8 text-lg text-[rgba(240,236,224,0.55)] leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: blessing.lore }} />
        </div>

        <div className="flex gap-3 mb-8">
          <button
            className="font-orbitron text-[10px] font-bold tracking-[2px] uppercase px-7 py-3 border border-rose text-rose rounded-sm cursor-pointer transition-all hover:bg-rose hover:text-[#0f0520]"
            onClick={onNext}
          >
            {currentIdx < total - 1 ? '⊳ SIGUIENTE BENDICIÓN' : '⊳ COMPLETAR MISIÓN'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
