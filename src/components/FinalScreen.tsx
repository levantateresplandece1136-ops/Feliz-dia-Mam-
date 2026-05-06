import { motion } from 'motion/react';
import { BLESSINGS } from '../constants';
import { useEffect, useState } from 'react';

interface FinalScreenProps {
  onRestart: () => void;
}

export const FinalScreen = ({ onRestart }: FinalScreenProps) => {
  const [sparks, setSparks] = useState<{ id: number; cx: number; cy: number; angle: number; dist: number; size: number; color: string; delay: number; duration: number; tx: number; ty: number }[]>([]);

  useEffect(() => {
    const colors = ['#f0c060', '#f06080', '#50e8d8', '#9060f0', '#50e890', '#ffffff'];
    const newSparks = [];
    let id = 0;

    for (let b = 0; b < 12; b++) {
      const cx = 15 + Math.random() * 70;
      const cy = 5 + Math.random() * 60;
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const dist = 50 + Math.random() * 130;
        const size = 4 + Math.random() * 5;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        newSparks.push({
          id: id++,
          cx,
          cy,
          angle,
          dist,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: b * 0.2 + Math.random() * 0.1,
          duration: 0.6 + Math.random() * 0.9,
          tx,
          ty,
        });
      }
    }
    setSparks(newSparks);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center pt-20 px-5 pb-20 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Fireworks Container */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute rounded-full"
            style={{
              left: `${spark.cx}%`,
              top: `${spark.cy}%`,
              width: spark.size,
              height: spark.size,
              backgroundColor: spark.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: spark.tx, y: spark.ty, opacity: 0, scale: 0 }}
            transition={{
              delay: spark.delay,
              duration: spark.duration,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-[660px] w-full text-center relative z-10">
        <motion.p
          className="font-mono text-[10px] tracking-[5px] text-rose uppercase mb-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          ♥ Misión Completada — 10/10 Bendiciones ♥
        </motion.p>
        <motion.div
          className="text-7xl mb-6 animate-pulse-heart"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          ❤️
        </motion.div>
        <motion.h2
          className="font-orbitron font-black text-2xl md:text-5xl leading-tight bg-gradient-to-br from-rose via-violet to-gold bg-clip-text text-transparent mb-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          FELIZ DÍA DE LAS MADRES
        </motion.h2>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-10" />

        <div className="bg-[rgba(15,5,32,0.92)] backdrop-blur-md border border-[rgba(240,192,96,0.25)] rounded-lg p-7 text-left mb-5">
          <h3 className="font-orbitron text-[11px] tracking-[4px] text-rose uppercase mb-4">
            💝 Las 10 Bendiciones Descubiertas
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {BLESSINGS.map((b) => (
              <div
                key={b.num}
                className="bg-white/5 border border-rose/30 rounded p-2 text-[9px] font-mono tracking-wider text-rose text-center uppercase"
              >
                {b.icon} {b.name}
              </div>
            ))}
          </div>
          <p className="text-lg text-[rgba(240,236,224,0.55)] leading-relaxed mb-4">
            Acabas de recorrer 10 dimensiones celestiales, y en cada una descubriste una verdad eterna:
            <strong className="text-cream ml-1">las madres son un regalo directo del corazón de Dios</strong>.<br /><br />
            No son bendiciones por accidente. Son <strong className="text-cream">diseñadas, ordenadas y ungidas</strong> para ser instrumentos de amor, formación, protección y gracia en este mundo.
          </p>
        </div>

        <div className="bg-gradient-to-br from-rose/10 to-violet/5 border border-[rgba(240,192,96,0.25)] rounded-lg p-7 text-left mb-10">
          <p className="text-lg text-[rgba(240,236,224,0.55)] leading-relaxed mb-3">
            Si tienes una madre, <strong className="text-rose">tienes un tesoro terrenal que refleja el amor celestial</strong>.
          </p>
          <p className="text-lg text-[rgba(240,236,224,0.55)] leading-relaxed">
            Hoy celebramos no solo un día — celebramos <strong className="text-rose">una vocación divina, un amor que construye generaciones</strong>.
          </p>
        </div>

        <div className="py-5 text-center mb-10">
          <p className="italic text-2xl text-gold leading-relaxed">
            "Levántense sus hijos y la llamen bienaventurada;<br />
            Y su marido también la alaba."
          </p>
          <span className="block mt-2 font-mono text-[9px] tracking-[3px] text-violet">
            — PROVERBIOS 31:28 —
          </span>
        </div>

        <button
          className="font-orbitron text-[10px] font-bold tracking-[2px] uppercase px-7 py-3 border border-rose text-rose rounded-sm cursor-pointer transition-all hover:bg-rose hover:text-[#0f0520]"
          onClick={onRestart}
        >
          ↺ REINICIAR MISIÓN
        </button>
      </div>
    </motion.div>
  );
};
